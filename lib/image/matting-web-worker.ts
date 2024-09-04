import {
  AutoModel,
  AutoProcessor,
  RawImage,
  env,
} from "../transformers/transformers.min.js";

env.remoteHost = "https://hf-mirror.com";
env.allowLocalModels = false;
const globalFetch = fetch;
globalThis.fetch = (input, init) =>
  globalFetch(input, {
    ...init,
    referrerPolicy: "no-referrer",
  });
export async function predict(url: string) {
  const model = await AutoModel.from_pretrained("briaai/RMBG-1.4", {
    config: { model_type: "custom" },
    dtype: "fp32",
    device: "auto",
    progress_callback: (event: unknown) => {
      self.postMessage(event);
    },
  });

  const processor = await AutoProcessor.from_pretrained("briaai/RMBG-1.4", {
    config: {
      do_normalize: true,
      do_pad: false,
      do_rescale: true,
      do_resize: true,
      image_mean: [0.5, 0.5, 0.5],
      feature_extractor_type: "ImageFeatureExtractor",
      image_std: [1, 1, 1],
      resample: 2,
      rescale_factor: 0.00392156862745098,
      size: { width: 1024, height: 1024 },
    },
  });

  if (url) {
    const image = await RawImage.fromURL(url);
    const { pixel_values } = await processor(image);
    const { output } = await model({ input: pixel_values });

    const mask = await RawImage.fromTensor(
      output[0].mul(255).to("uint8")
    ).resize(image.width, image.height);

    return mask;
  }
}

self.addEventListener("message", async (event) => {
  const mask = await predict(event.data);
  self.postMessage({
    type: "complete",
    mask,
  });
});
