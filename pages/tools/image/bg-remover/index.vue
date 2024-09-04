<script setup lang="ts">
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";

type TransactionData = {
  status: "progress" | "done";
  progress?: number;
  type: string;
  mask: ImageData;
};
const ONNX_MODEL_NAME = "RMBG_1.4";
definePageMeta({
  name: "在线抠图",
  client: true,
});

const matting = ref();
const percent = ref<number | undefined>(0);
const loading = ref<boolean>(true);
onMounted(async () => {
  matting.value = await import("~/lib/image/matting");
});

const onLoadingModel = (data: TransactionData) => {
  if (data.status === "progress" && data.progress) {
    percent.value = Number(data.progress.toFixed(2));
  } else if (data.status === "done") {
    loading.value = false;
    percent.value = 100;
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
  const newFilename = file.file.name.replace(/\.\w+$/, ".png");
  const res = await matting.value.maskToImage(URL.createObjectURL(file.file), onLoadingModel);
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
onMounted(async () => {
  if (localStorage.getItem(ONNX_MODEL_NAME)) {
    percent.value = 100;
  } else {
    matting.value.loadModule((data:TransactionData) => {
      if (typeof data.progress === "number") {
        percent.value = data.progress;
      }
      if (data.status === "done") {
        localStorage.setItem(ONNX_MODEL_NAME, "true");
      }
    });
  }
});
</script>
<template>
  <TablePage
    :percent="percent"
    :concurrency="1"
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
      <img :src="fileToUrl(data.response)" class="h-12" />
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
