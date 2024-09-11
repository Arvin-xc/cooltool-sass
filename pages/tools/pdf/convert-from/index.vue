<script setup lang="ts">
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";
import { getFilenameFromHeader } from "~/lib/pdf";

definePageMeta({
  name: "从PDF转换",
});
const accept = "application/pdf";
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

const acceptToTypes = {
  PPT: {
    apiPrefix: "presentation",
    types: [".ppt", ".pptx", ".odt"],
  },
  Word: {
    apiPrefix: "word",
    types: [".doc", ".docx", ".odt"],
  },
  Image: {
    // singleOrMultiple: multiple
    // colorType: color
    // dpi: 300
    apiPrefix: "img",
    types: [".png", ".jpg", ".gif", ".tiff", ".bmp"],
  },
  RTF: {
    apiPrefix: "text",
    types: [".rtf", ".txt"],
  },
  HTML: {
    apiPrefix: "html",
    types: [".html"],
  },
  XML: {
    apiPrefix: "xml",
    types: [".xml"],
  },
  CSV: {
    apiPrefix: "csv",
    types: [".csv"],
  },
} as const;
const convertType = ref<keyof typeof acceptToTypes>("Word");
const convertSubType = ref(acceptToTypes[convertType.value].types[0]);
const subOptions = computed(() => acceptToTypes[convertType.value].types);

const convertFn = async (file: RcFile) => {
  const formData = new FormData();
  formData.append("fileInput", file.file);
  formData.append("outputFormat", convertSubType.value.replace(".", ""));
  try {
    const res = await fetch(
      `https://pdf.cooltool.app/api/v1/convert/pdf/${
        acceptToTypes[convertType.value].apiPrefix
      }`,
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
const onConvertTypeChange = (type: keyof typeof acceptToTypes) => {
  convertType.value = type;
  convertSubType.value = acceptToTypes[type].types[0];
};
</script>
<template>
  <TablePage
    :headers="headers"
    :accept="accept"
    :concurrency="1"
    :disabled="!convertSubType"
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
    <template #targetFormat="{ data }">
      {{ convertSubType.replace(".", "").toUpperCase() }}
    </template>
    <template #percent="{ data }">
      <Progress
        class="h-2.5"
        :model-value="data.percent"
        :indeterminate="true"
        :variant="data.variant"
      />
    </template>
    <template #default>
      <!-- <Input :modelValue="optimizeLevel" /> -->
      <div class="flex justify-center items-center gap-4">
        <Label for="optimizeLevel" class="shrink-0">转换为</Label>
        <Select
          @update:model-value="(value)=>onConvertTypeChange(value as keyof typeof acceptToTypes)"
        >
          <SelectTrigger id="optimizeLevel"> {{ convertType }} </SelectTrigger>
          <SelectContent>
            <SelectItem
              :value="option"
              v-for="option in Object.keys(acceptToTypes)"
            >
              {{ option }}
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          @update:model-value="(value) => (convertSubType = value as any)"
          v-if="subOptions.length"
        >
          <SelectTrigger id="optimizeLevel">
            {{ convertSubType }}
          </SelectTrigger>
          <SelectContent>
            <SelectItem :value="option" v-for="option in subOptions">
              {{ option }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </template>
  </TablePage>
</template>
