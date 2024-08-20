import {
  defaultProcessorState,
  encoderMap,
  type EncoderState,
  type PreprocessorState,
  type ProcessorState,
} from "./feature-meta";
import {
  abortable,
  assertSignal,
  blobToImg,
  blobToText,
  builtinDecode,
  canDecodeImageType,
  sniffMimeType,
  type ImageMimeTypes,
} from "./util";
import WorkerBridge from "./worker-bridge";
import { resize } from "./features/processors/resize/client";
import { compress as compressSVG } from "./codecs/svg";
import { drawableToImageData } from "./util/canvas";

export interface SourceImage {
  file: File;
  decoded: ImageData;
  preprocessed: ImageData;
  vectorImage?: HTMLImageElement;
}

export const imageTypeToEncoderTypeMap = {
  avif: {
    type: "avif",
    options: encoderMap.avif.meta.defaultOptions,
  },
  png: {
    type: "oxiPNG",
    options: encoderMap.oxiPNG.meta.defaultOptions,
  },
  jpg: {
    type: "mozJPEG",
    options: encoderMap.mozJPEG.meta.defaultOptions,
  },
  jpeg: {
    type: "mozJPEG",
    options: encoderMap.mozJPEG.meta.defaultOptions,
  },
  gif: {
    type: "browserGIF",
    options: encoderMap.browserGIF.meta.defaultOptions,
  },
  webp: {
    type: "webP",
    options: encoderMap.webP.meta.defaultOptions,
  },
};

async function decodeImage(
  signal: AbortSignal,
  blob: Blob,
  workerBridge: WorkerBridge
): Promise<ImageData> {
  assertSignal(signal);
  const mimeType = await abortable(signal, sniffMimeType(blob));
  const canDecode = await abortable(signal, canDecodeImageType(mimeType));

  try {
    if (!canDecode) {
      if (mimeType === "image/avif") {
        return await workerBridge.avifDecode(signal, blob);
      }
      if (mimeType === "image/webp") {
        return await workerBridge.webpDecode(signal, blob);
      }
      if (mimeType === "image/jxl") {
        return await workerBridge.jxlDecode(signal, blob);
      }
      if (mimeType === "image/webp2") {
        return await workerBridge.wp2Decode(signal, blob);
      }
      if (mimeType === "image/qoi") {
        return await workerBridge.qoiDecode(signal, blob);
      }
    }
    // Otherwise fall through and try built-in decoding for a laugh.
    return await builtinDecode(signal, blob);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw err;
    console.log(err);
    throw Error("Couldn't decode image");
  }
}

async function preprocessImage(
  signal: AbortSignal,
  data: ImageData,
  preprocessorState: PreprocessorState,
  workerBridge: WorkerBridge
): Promise<ImageData> {
  assertSignal(signal);
  let processedData = data;

  if (preprocessorState.rotate.rotate !== 0) {
    processedData = await workerBridge.rotate(
      signal,
      processedData,
      preprocessorState.rotate
    );
  }

  return processedData;
}

export async function getCompressOptionsByFileType(file: File) {
  const mimetype = await sniffMimeType(file);
  const fileType = mimetype.split("/")[1];

  return imageTypeToEncoderTypeMap[fileType];
}

export async function getFileType(file: File) {
  if (file.type === "image/svg+xml") {
    return "svg";
  }
  const mimetype = await sniffMimeType(file);
  const fileType = mimetype.split("/")[1];
  return fileType;
}

async function processImage(
  signal: AbortSignal,
  source: SourceImage,
  processorState: ProcessorState,
  workerBridge: WorkerBridge
): Promise<ImageData> {
  assertSignal(signal);
  let result = source.preprocessed;

  if (processorState.resize.enabled) {
    result = await resize(signal, source, processorState.resize, workerBridge);
  }
  if (processorState.quantize.enabled) {
    result = await workerBridge.quantize(
      signal,
      result,
      processorState.quantize
    );
  }
  return result;
}

async function encodeImage(
  signal: AbortSignal,
  image: ImageData,
  encodeData: EncoderState,
  sourceFilename: string,
  workerBridge: WorkerBridge
): Promise<File> {
  assertSignal(signal);

  const encoder = encoderMap[encodeData.type];
  const compressedData = await encoder.encode(
    signal,
    workerBridge,
    image,
    // The type of encodeData.options is enforced via the previous line
    encodeData.options as any
  );

  // This type ensures the image mimetype is consistent with our mimetype sniffer
  const type: ImageMimeTypes = encoder.meta.mimeType;

  return new File(
    [compressedData],
    sourceFilename.replace(/.[^.]*$/, `.${encoder.meta.extension}`),
    { type }
  );
}

async function processSvg(
  signal: AbortSignal,
  blob: Blob
): Promise<HTMLImageElement> {
  assertSignal(signal);
  // Firefox throws if you try to draw an SVG to canvas that doesn't have width/height.
  // In Chrome it loads, but drawImage behaves weirdly.
  // This function sets width/height if it isn't already set.
  const parser = new DOMParser();
  const text = await abortable(signal, blobToText(blob));
  const document = parser.parseFromString(text, "image/svg+xml");
  const svg = document.documentElement!;

  if (svg.hasAttribute("width") && svg.hasAttribute("height")) {
    return blobToImg(blob);
  }

  const viewBox = svg.getAttribute("viewBox");
  if (viewBox === null) throw Error("SVG must have width/height or viewBox");

  const viewboxParts = viewBox.split(/\s+/);
  svg.setAttribute("width", viewboxParts[2]);
  svg.setAttribute("height", viewboxParts[3]);

  const serializer = new XMLSerializer();
  const newSource = serializer.serializeToString(document);
  return abortable(
    signal,
    blobToImg(new Blob([newSource], { type: "image/svg+xml" }))
  );
}

export async function compressImage(
  file: File,
  targetType?: keyof typeof imageTypeToEncoderTypeMap
) {
  const { signal } = new AbortController();
  const workerBridge = new WorkerBridge();

  let decodeData: ImageData;
  if (file.type.startsWith("image/svg+xml")) {
    if (!targetType) {
      const svgText = await blobToText(file);
      const newSvgText = await compressSVG(svgText);
      return new File([newSvgText], file.name, { type: "image/xml+svg" });
    }
    const vectorImage = await processSvg(signal, file);
    decodeData = drawableToImageData(vectorImage);
  } else {
    decodeData = await decodeImage(signal, file, workerBridge);
  }

  let imageData = await preprocessImage(
    signal,
    decodeData,
    {
      rotate: { rotate: 0 },
    },
    workerBridge
  );

  imageData = await processImage(
    signal,
    {
      file,
      decoded: decodeData,
      preprocessed: imageData,
    },
    {
      ...defaultProcessorState,
      quantize: {
        enabled: true,
        zx: 0,
        maxNumColors: 256,
        dither: 1.0,
      },
    },
    workerBridge
  );

  const encodeState = targetType
    ? imageTypeToEncoderTypeMap[targetType]
    : await getCompressOptionsByFileType(file);

  const outputFile = await encodeImage(
    signal,
    imageData,
    encodeState,
    file.name,
    workerBridge
  );
  return outputFile;
}
