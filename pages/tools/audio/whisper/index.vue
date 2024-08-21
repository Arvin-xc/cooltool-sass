<script setup lang="ts">
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";

definePageMeta({
  name: "文本提取",
});

const accept = "video/";
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
    <template #compressed="{ data }">
      {{ data.response ? filesize((data.response as File)?.size) : "--" }}
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
