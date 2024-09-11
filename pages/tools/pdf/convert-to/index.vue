<script setup lang="ts">
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";
import { getFilenameFromHeader } from "~/lib/pdf";

definePageMeta({
  name: "从PDF转换",
});
const accept = "*/*";
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
    label: "目标格式",
    key: "targetFormat",
  },
];

const convertFn = async (file: RcFile) => {
  const formData = new FormData();
  formData.append("fileInput", file.file);
  try {
    const res = await fetch(
      "https://pdf.cooltool.app/api/v1/convert/file/pdf",
      {
        method: "POST",
        body: formData,
      }
    );
    const blob = await res.blob();
    const response = new File([blob], getFilenameFromHeader(res.headers), {
      type: res.headers.get("Content-Type") || "",
    });
    if (response) {
      file.response = response;
      file.percent = 100;
      file.variant = "success";
    } else {
      file.error = true;
    }
  } catch (error) {
    file.error = true;
  }

  return file;
};
</script>
<template>
  <TablePage
    :headers="headers"
    :accept="accept"
    :concurrency="1"
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
    <template #targetFormat="{ data }"> PDF </template>
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
