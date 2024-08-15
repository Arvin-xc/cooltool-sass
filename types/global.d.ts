export {};
type Progress = {
  frames: number;
  currentFps: number;
  currentKbps: number;
  targetSize: number;
  timemark: string;
  percent?: number | undefined;
};
declare global {
  interface Window {
    __electron_preload__invokeFFmpeg?: (args: {
      input: string;
      inputOptions?: string[];
      outputOptions?: string[];
      output: string;
      onFinish?: () => void;
      onProgress?: (progress: Progress) => void;
      onError?: (error: Error) => void;
    }) => Promise<void>;
  }
}
