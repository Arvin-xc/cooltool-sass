<script setup lang="ts">
import dayjs from "dayjs";
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";

useSeoMeta({
  title: "视频压缩",
  description: "免费批量压缩视频。",
});
definePageMeta({
  name: "视频压缩",
  icon: "icon-park-outline:video-two",
  electron: true,
});

const accept = "video/*";
const globalStore = useGlobalStore();
const convertFn = async (newFile: RcFile, outputDir: string) => {
  const today = dayjs().format("YYYY-MM-DD_HH-mm-ss");

  const outputPath = `${outputDir}/${today}_${newFile.file.name}`;
  const inputFilepath =
    globalStore.runtime === "electron"
      ? window.electronAPI?.getPathForFile(newFile.file)
      : URL.createObjectURL(newFile.file);

  if (inputFilepath) {
    await new Promise((resolve, reject) => {
      window.__electron_preload__invokeFFmpeg?.({
        input: inputFilepath,
        inputOptions: [],
        outputOptions: ["-crf 51", "-preset veryslow", "-c:a copy"],
        output: outputPath,
        async onFinish() {
          const stats = await window.__electron_preload__getFileInfo?.(
            outputPath
          );
          newFile.percent = 100;
          newFile.response = outputPath;
          newFile.variant = "success";
          newFile.size = stats?.size;
          resolve(true);
        },
        onError(err) {
          console.error(err);
          newFile.variant = "error";
          reject(err);
        },
        onProgress(progress) {
          console.log("processing", progress);
          newFile.timemark = progress.timemark;
          newFile.percent =
            progress.percent && progress.percent > 0
              ? Math.min(progress.percent, 99) // onProgress 100%时还有一小会儿才会回调onFinish。因此强制最多99%，在onFinish里再更新为100%
              : 0;
        },
      });
    });
  }

  return newFile;
};
const headers = [
  {
    class: "w-[20%]",
    label: "文件名",
    key: "filename",
  },
  {
    class: "w-[10%]",
    label: "时长",
    key: "duration",
  },
  {
    class: "w-[10%]",
    label: "件大小",
    key: "size",
  },
  {
    class: "w-[20%]",
    label: "处理进度",
    key: "percent",
  },
  {
    class: "w-[10%]",
    label: "压缩后",
    key: "compressed",
  },
];
</script>

<template>
  <TablePage :headers="headers" :accept="accept" :convert-fn="convertFn">
    <template #filename="{ data }">
      <div class="truncate">
        {{ data.file.name }}
      </div>
    </template>
    <template #size="{ data }">{{ filesize(data.file.size) }}</template>
    <template #duration="{ data }">
      {{
        data.duration
          ? dayjs.duration(data.duration, "seconds").format("HH:mm:ss")
          : "--:--:--"
      }}
    </template>
    <template #compressed="{ data }">
      <div v-if="data.response">
        {{ data.size ? filesize(data.size) : "--" }}
      </div>
    </template>
    <template #percent="{ data }">
      <Progress
        label
        class="h-2.5"
        :variant="data.variant"
        :model-value="data.percent"
      />
    </template>
  </TablePage>
</template>
