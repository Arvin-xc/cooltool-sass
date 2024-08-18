import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import duration from "dayjs/plugin/duration.js";
import timezone from "dayjs/plugin/timezone.js";
import { twMerge } from "tailwind-merge";
import { useToast } from "~/components/ui/toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export function getVideoDuration(file: File): Promise<number> {
  const fileURL = URL.createObjectURL(file);

  const videoElement = document.createElement("video");

  return new Promise((resolve, reject) => {
    videoElement.src = fileURL;
    videoElement.addEventListener("loadedmetadata", () => {
      resolve(videoElement.duration);
      URL.revokeObjectURL(fileURL);
    });
    videoElement.addEventListener("error", reject);
  });
}

export async function openFile(filepath?: string) {
  const { toast } = useToast();
  if (filepath) {
    try {
      await window.electronAPI?.openFile(filepath);
    } catch (error) {
      toast({
        title: "打开文件失败",
        description: '文件已删除或没有权限访问！'
      });
      console.error("打开文件失败", error);
    }
  } else {
    toast({
      title: "文件不存在",
    });
  }
}
