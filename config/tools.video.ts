export const videoFormats = [
  "mp4",
  "3gp",
  "mov",
  "webm",
  "avi",
  "mpeg",
  "wav",
  "m4v",
  "flv",
  "mkv",
  "ts",
] as const;
export type VideoFormat = (typeof videoFormats)[number];

export const videoConverterOptions: Record<
  VideoFormat,
  { outputOptions: string[] }
> = {
  mp4: {
    outputOptions: [
      "-c:v libx264",
      "-c:a aac",
      "-movflags +faststart",
      "-strict experimental",
    ],
  },
  "3gp": {
    outputOptions: [
      "-c:v",
      "libx264",
      "-c:a",
      "aac",
      "-ar",
      "44100",
      "-ac",
      "1",
      "-movflags",
      "+faststart",
      "-strict",
      "experimental",
      "-f",
      "3gp",
    ],
  },
  mov: {
    outputOptions: [
      "-c:v",
      "libx264",
      "-c:a",
      "aac",
      "-movflags",
      "+faststart",
      "-strict",
      "experimental",
      "-f",
      "mov",
    ],
  },
  webm: {
    outputOptions: [
      "-c:v",
      "libvpx", // 使用 VP8/VP9 编码
      "-c:a",
      "libvorbis", // 使用 Vorbis 音频编码
      "-f",
      "webm", // 输出格式为 WebM
    ],
  },
  avi: {
    outputOptions: [
      "-c:v",
      "mpeg4", // 设置为 Xvid 编码
      "-c:a",
      "libmp3lame", // 设置为 MP3 音频编码
      "-b:v",
      "1M", // 设置视频比特率
      "-f",
      "avi",
    ],
  },
  mpeg: {
    outputOptions: [
      "-c:v",
      "mpeg2video", // 使用 MPEG-2 视频编码
      "-c:a",
      "mp2", // 使用 MPEG 音频编码
      "-q:v",
      "2", // 设置视频质量
      "-f",
      "mpeg", // 输出格式为 MPEG
    ],
  },
  wav: {
    outputOptions: [
      "-c:a",
      "pcm_s16le", // 使用 PCM 音频编码 (16位 小端序)
      "-f",
      "wav", // 输出格式为 WAV
    ],
  },
  m4v: {
    outputOptions: [
      "-c:v",
      "libx264", // 使用 H.264 视频编码
      "-c:a",
      "aac", // 使用 AAC 音频编码
      "-movflags",
      "+faststart",
      "-strict",
      "experimental",
      "-f",
      "mp4", // m4v 是 mp4 的变体
    ],
  },
  flv: {
    outputOptions: [
      "-c:v",
      "libx264", // 使用 H.264 视频编码
      "-c:a",
      "aac", // 使用 AAC 音频编码
      "-f",
      "flv", // 输出格式为 FLV
    ],
  },
  mkv: {
    outputOptions: [
      "-c:v",
      "libx264", // 使用 H.264 视频编码
      "-c:a",
      "aac", // 使用 AAC 音频编码
      "-f",
      "matroska", // 输出格式为 MKV
    ],
  },
  ts: {
    outputOptions: [
      "-c:v",
      "libx264", // 使用 H.264 视频编码
      "-c:a",
      "aac", // 使用 AAC 音频编码
      "-f",
      "mpegts", // 输出格式为 MPEG-TS
    ],
  },
};

export const videoFormatEncoder = {
  mp4: {
    encode: {
      type: "list",
      label: "编码格式",
      options: [
        { label: "不重新编码 (从输入文件复制视频)", value: "-c:v copy" },
        { label: "AV1 (AOMedia Video 1)", value: "-c:v libaom-av1" },
        { label: "H.264 (AVC)", value: "-c:v libx264" },
        { label: "H.265 (HEVC)", value: "-c:v libx265" },
        { label: "MPEG-1", value: "-c:v mpeg1video" },
        { label: "MPEG-2", value: "-c:v mpeg2video" },
        { label: "MPEG-4", value: "-c:v mpeg4" },
        { label: "VP9", value: "-c:v libvpx-vp9" },
        { label: "XVID", value: "-c:v libxvid" },
      ],
    },
    quality: [
      {
        type: "range",
        min: 1,
      },
    ],
  },
};
