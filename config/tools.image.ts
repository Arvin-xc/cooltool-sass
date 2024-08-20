export const imageFormats = [
  "png",
  "ico",
  "jpg",
  "webp",
  "bmp",
  "cur",
  "gif",
  "jpe",
  "xbm",
  "xpm",
  "tga",
  "tif",
  "rgb",
  "jp2",
  "pcx",
  "pbm",
  "pgm",
  "ppm",
  "exr",
  "hdr",
] as const;

export type ImageFormat = (typeof imageFormats)[number];

export const imageConverterOptions: Record<
  ImageFormat,
  { outputOptions: string[] }
> = {
  png: {
    outputOptions: ["-c:v", "png"],
  },
  ico: {
    outputOptions: [
      "-vf",
      "scale='min(256,iw)':'min(256,ih)':force_original_aspect_ratio=decrease",
    ],
  },
  jpg: {
    outputOptions: [
      "-c:v",
      "mjpeg",
      "-q:v",
      "2", // 高质量设置
    ],
  },
  webp: {
    outputOptions: [
      "-c:v",
      "libwebp",
      "-q:v",
      "80", // 压缩质量设置
    ],
  },
  bmp: {
    outputOptions: ["-c:v", "bmp"],
  },
  cur: {
    outputOptions: ["-c:v", "cur"],
  },
  gif: {
    outputOptions: ["-c:v", "gif"],
  },
  jpe: {
    outputOptions: ["-c:v", "mjpeg"],
  },
  xbm: {
    outputOptions: ["-c:v", "xbm"],
  },
  xpm: {
    outputOptions: ["-c:v", "xpm"],
  },
  tga: {
    outputOptions: ["-c:v", "targa"],
  },
  tif: {
    outputOptions: ["-c:v", "tiff"],
  },
  rgb: {
    outputOptions: ["-c:v", "rgb24"],
  },
  jp2: {
    outputOptions: ["-c:v", "jpeg2000"],
  },
  pcx: {
    outputOptions: ["-c:v", "pcx"],
  },
  pbm: {
    outputOptions: ["-c:v", "pbm"],
  },
  pgm: {
    outputOptions: ["-c:v", "pgm"],
  },
  ppm: {
    outputOptions: ["-c:v", "ppm"],
  },
  exr: {
    outputOptions: ["-c:v", "exr"],
  },
  hdr: {
    outputOptions: ["-c:v", "hdr"],
  },
};
