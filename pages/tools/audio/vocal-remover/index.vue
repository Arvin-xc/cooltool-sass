<script lang="ts" setup>
import { useEventSource } from "@vueuse/core";
import dayjs from "dayjs";
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";

useSeoMeta({
  title: "人声分离",
  description:
    "将任意音视频中的人声和背景音乐分离开来。此项能力使用了先进的AI技术，提取的人生高清纯净。",
});
definePageMeta({
  name: "人声分离",
  freeForever: true,
  electron: true,
});
const accept = "audio/*";
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
    class: "w-[20%]",
    label: "处理进度",
    key: "percent",
  },
];
const port = ref<number>();
const filepath = ref<string>();
const targetFile = ref<RcFile>();
const outputDir = ref<string>();
const eventSourceURI = computed(
  () =>
    `http://localhost:${
      port.value
    }/vocal-remover?file_path=${encodeURIComponent(
      filepath.value || ""
    )}&output_dir=${encodeURIComponent(outputDir.value || "")}`
);
const { data, open, status, close } = useEventSource(
  eventSourceURI,
  ["notice", "update"],
  {
    immediate: false,
  }
);

const convertFn = async (file: RcFile, output: string) => {
  outputDir.value = output;
  targetFile.value = file;
  filepath.value = await window.electronAPI?.getPathForFile(file.file);
  const meta = await window.__electron_preload__getMediaDuration(
    filepath.value!
  );
  file.duration = meta.duration;
  open();
  file.response = `${outputDir.value}/hdemucs_mmi/${file.file.name.replace(
    /\.\w+$/,
    ""
  )}`;
  return file;
};
watch(data, () => {
  if (Number(data.value) === 100) {
    close();
  }
  if (targetFile.value) {
    targetFile.value.percent = Number(data.value);
  }
});
onMounted(async () => {
  port.value = await window.electronAPI?.getUVR5Prot();
});
</script>
<template>
  <TablePage
    :concurrency="1"
    :headers="headers"
    :multiple="false"
    :accept="accept"
    :title="$route.name?.toString()!"
    :convert-fn="convertFn"
    subtitle="使用AI技术，分离音视频的伴奏和人声。适用于提取伴奏或纯净的人声。"
  >
    <template #filename="{ data }">
      <div class="truncate">
        {{ data.file.name }}
      </div>
    </template>
    <template #duration="{ data }">
      {{
        data.duration
          ? dayjs.duration(data.duration, "seconds").format("HH:mm:ss")
          : "--:--:--"
      }}
    </template>
    <template #percent="{ data }">
      <Progress
        class="h-2.5"
        label
        :model-value="data.percent"
        :indeterminate="!data.percent"
        :variant="data.variant"
      />
    </template>
  </TablePage>
</template>
