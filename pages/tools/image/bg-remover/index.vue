<script setup lang="ts">
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";
import type { TransactionData } from "~/lib/image/matting";

definePageMeta({
  name: "在线抠图",
});

const progress = ref<number | undefined>(0);
const loading = ref<boolean>(true);

const onLoadingModel = (data: TransactionData) => {
  if (data.status === "progress") {
    progress.value = data.progress;
  } else if (data.status === "done") {
    loading.value = false;
    progress.value = 100;
  }
};
const accept = "image/*";
const headers = [
  {
    class: "w-[20%]",
    label: "文件名",
    key: "filename",
  },
  {
    class: "w-[10%]",
    label: "预览",
    key: "preview",
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
const convertFn = async (file: RcFile) => {
  const { maskToImage } = await import("~/lib/image/matting");

  const newFilename = file.file.name.replace(/\.\w+$/, ".png");
  const res = await maskToImage(URL.createObjectURL(file.file), onLoadingModel);
  if (res) {
    file.response = new File([res], newFilename, { type: "image/png" });
    file.percent = 100;
    file.variant = "success";
  } else {
    file.error = true;
  }

  return file;
};
const fileToUrl = (file?: File | string) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
};
</script>
<template>
  <TablePage
    :headers="headers"
    :accept="accept"
    :title="$route.name?.toString()!"
    :convert-fn="convertFn"
  >
    <template #filename="{ data }">
      <div class="truncate">
        {{ data.file.name }}
      </div>
    </template>
    <template #size="{ data }">{{ filesize(data.file.size) }}</template>
    <template #preview="{ data }">
      <!-- {{ data.file.type.split("/")[1].toUpperCase() }} -->
      <img :src="fileToUrl(data.response)" class="h-full" />
    </template>
    <template #percent="{ data }">
      <Progress
        class="h-2.5"
        :model-value="data.percent"
        :indeterminate="true"
        :variant="data.variant"
      />
    </template>
  </TablePage>
</template>
