<script setup lang="ts">
import dayjs from "dayjs";
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";
import {
  imageConverterOptions,
  imageFormats,
  type ImageFormat,
} from "~/config/tools.image";

useSeoMeta({
  title: "图片格式转换",
  description: "免费的图片格式转换工具，可将图片转为任意格式的图片。",
});
definePageMeta({
  name: "图片格式转换",
  electron: true,
});

const accept = "image/*";
const targetImageType = ref<ImageFormat>("png");
const globalStore = useGlobalStore();

const convertFn = async (newFile: RcFile, outputDir: string) => {
  const today = dayjs().format("YYYY-MM-DD_HH-mm-ss");
  const newFilename = newFile.file.name.replace(
    /\.\w+$/,
    "." + targetImageType.value
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
          imageConverterOptions[targetImageType.value].outputOptions,
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
    label: "原格式",
    key: "format",
  },
  {
    class: "w-[10%]",
    label: "文件大小",
    key: "size",
  },
  {
    class: "w-[20%]",
    label: "处理进度",
    key: "percent",
  },
  {
    class: "w-[10%]",
    label: "目标格式",
    key: "targetFormat",
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
    <template #format="{ data }">
      {{ data.file.type.split("/")[1].toUpperCase() }}
    </template>
    <template #percent="{ data }">
      <Progress
        label
        class="h-2.5"
        :variant="data.variant"
        :model-value="data.percent"
      />
    </template>
    <template #targetFormat>
      {{ targetImageType.toUpperCase() }}
    </template>

    <template #default>
      <div class="flex gap-4 justify-center items-center p-2 mt-4">
        <div class="flex items-center gap-2">
          <Label for="area" class="shrink-0">目标格式：</Label>
          <Select
            :model-value="targetImageType"
            @update:model-value="(value) => (targetImageType = value as ImageFormat)"
          >
            <SelectTrigger class="py-2 min-w-20 h-9" id="area">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                :key="option"
                :value="option"
                v-for="option in imageFormats"
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
