<script setup lang="ts">
import dayjs from "dayjs";
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";
import {
  videoConverterOptions,
  videoFormats,
  type VideoFormat,
} from "~/config/tools.video";

definePageMeta({
  name: "视频格式转换",
  electron: true,
});

const accept = "video/*";
const targetVideoFormat = ref<VideoFormat>("mp4");
const globalStore = useGlobalStore();
const convertFn = async (newFile: RcFile, outputDir: string) => {
  const today = dayjs().format("YYYY-MM-DD_HH-mm-ss");
  const newFilename = newFile.file.name.replace(
    /\.\w+$/,
    "." + targetVideoFormat.value
  );
  const outputPath = `${outputDir}/${today}_${newFilename}`;

  const inputFilepath =
    globalStore.runtime === "electron"
      ? window.electronAPI?.getPathForFile(newFile.file)
      : URL.createObjectURL(newFile.file);

  if (inputFilepath) {
    await new Promise((resolve, reject) => {
      window.__electron_preload__invokeFFmpeg?.({
        input: inputFilepath,
        inputOptions: [],
        outputOptions:
          videoConverterOptions[targetVideoFormat.value].outputOptions,
        output: outputPath,
        onFinish() {
          newFile.percent = 100;
          newFile.response = outputPath;
          newFile.variant = "success";
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
    <template #percent="{ data }">
      <Progress
        label
        class="h-2.5"
        :variant="data.variant"
        :model-value="data.percent"
      />
    </template>

    <template #default>
      <div class="flex gap-4 justify-center items-center p-2 mt-4">
        <div class="flex items-center gap-2">
          <Label for="area" class="shrink-0">目标格式：</Label>
          <Select
            :model-value="targetVideoFormat"
            @update:model-value="(value) => (targetVideoFormat = value as VideoFormat)"
          >
            <SelectTrigger class="py-2 min-w-20 h-9" id="area">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                :key="option"
                :value="option"
                v-for="option in videoFormats"
              >
                {{ option.toUpperCase() }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </template>
  </TablePage>
</template>
