export type RecordResultType = "audio" | "video" | "gif" | "canvas";
export type DisplaySurfaceType = "window" | "monitor" | "browser" | "camera";
export type RecordingType = "screen" | "camera";
export type DevicesInfo = {
  selectedAudioDeviceId?: string;
  selectedVideoDeviceId?: string;
};
export type Output = {
  video: File;
};
export type MimeType =
  | "audio/webm"
  | "audio/webm;codecs=pcm"
  | "video/mp4"
  | "video/webm"
  | "video/webm;codecs=vp9"
  | "video/webm;codecs=vp8"
  | "video/webm;codecs=h264"
  | "video/x-matroska;codecs=avc1"
  | "video/mpeg"
  | "audio/wav"
  | "audio/ogg"
  | undefined;
