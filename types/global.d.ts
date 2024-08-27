export {};
type Progress = {
  frames: number;
  currentFps: number;
  currentKbps: number;
  targetSize: number;
  timemark: string;
  percent?: number | undefined;
};
export type FFmpegParams = {
  input: string;
  inputOptions?: string[];
  outputOptions?: string[];
  output: string;
  onFinish?: () => void;
  onProgress?: (progress: Progress) => void;
  onError?: (error: Error) => void;
};
declare global {
  interface Window {
    __electron_preload__invokeFFmpeg?: (args: FFmpegParams) => Promise<void>;
    __electron_preload__openExternal?: (url: string) => Promise<void>;
    electronAPI?: {
      selectFolder: () => Promise<string | null>;
      openFile: (filePath: string) => Promise<void>;
      getPath: (
        path:
          | "home"
          | "appData"
          | "userData"
          | "sessionData"
          | "temp"
          | "exe"
          | "module"
          | "desktop"
          | "documents"
          | "downloads"
          | "music"
          | "pictures"
          | "videos"
          | "recent"
          | "logs"
          | "crashDumps"
      ) => Promise<string>;
    };
  }
}
