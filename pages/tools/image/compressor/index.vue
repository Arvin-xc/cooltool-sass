<script setup lang="ts">
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";

definePageMeta({
  name: "图片压缩",
});

const accept = "image/png,image/jpg,image/jpeg,image/webp,image/xml+svg";
const headers = [
  {
    class: "w-[20%]",
    label: "文件名",
    key: "filename",
  },
  {
    class: "w-[10%]",
    label: "格式",
    key: "format",
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
const convertFn = async (newFile: RcFile) => {
  const { compressImage } = await import("./squoosh");
  const file = await compressImage(newFile.file);
  if (file) {
    newFile.response = file;
    newFile.percent = 100;
    newFile.variant = "success";
  } else {
    newFile.error = true;
  }

  return newFile;
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
    <template #format="{ data }">
      {{ data.file.type.split("/")[1].toUpperCase() }}
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
