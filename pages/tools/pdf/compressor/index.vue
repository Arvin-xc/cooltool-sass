<script setup lang="ts">
import { filesize } from "filesize";
import type { RcFile } from "~/components/TablePage.vue";

definePageMeta({
  name: "PDF压缩",
  icon: "bxs:file-pdf",
});
useSeoMeta({
  title: "PDF压缩",
  description: "免费的PDF压缩工具，可批量压缩PDF。",
});
const accept = "application/pdf";
const optimizeLevel = ref<string>("2");
const optimizeLevelOptions = [
  {
    label: "1（高质量）",
    value: "1",
  },
  {
    label: "2（推荐）",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4（低质量）",
    value: "4",
  },
];

const convertFn = async (file: RcFile) => {
  const formData = new FormData();
  formData.append("fileInput", file.file);
  formData.append("optimizeLevel", optimizeLevel.value);
  try {
    const res = await fetch(
      "https://pdf.cooltool.app/api/v1/misc/compress-pdf",
      {
        method: "POST",
        body: formData,
      }
    );
    const blob = await res.blob();
    const response = new File([blob], file.file.name, {
      type: "application/pdf",
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
    <template #default>
      <!-- <Input :modelValue="optimizeLevel" /> -->
      <div class="flex justify-center items-center gap-4">
        <Label for="optimizeLevel" class="shrink-0">压缩等级：</Label>
        <Select @update:model-value="(value:string) => (optimizeLevel = value)">
          <SelectTrigger id="optimizeLevel">
            {{
              optimizeLevelOptions.find(
                (option) => option.value === optimizeLevel
              )?.label
            }}
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              :value="option.value"
              v-for="option in optimizeLevelOptions"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </template>
  </TablePage>
</template>
