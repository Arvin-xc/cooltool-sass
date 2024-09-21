<script lang="ts" setup>
import { useEventSource } from "@vueuse/core";
import dayjs from "dayjs";
import type { RcFile } from "~/components/TablePage.vue";
import { useToast } from "~/components/ui/toast";

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
const { toast } = useToast();
const progress = ref<number>();
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
const modelList = [
  {
    id: "UVR-MDX-NET-Inst_Main.onnx",
    dim_f: 2048,
    name: "MDX-NET-Inst_Main",
  },
  {
    id: "UVR-MDX-NET-Inst_HQ_4.onnx",
    dim_f: 2560,
    name: "MDX-NET-Inst_HQ_4",
  },
  {
    id: "UVR-MDX-NET-Inst_HQ_3.onnx",
    dim_f: 3072,
    name: "MDX-NET-Inst_HQ_3",
  },
  {
    id: "UVR-MDX-NET_Crowd_HQ_1.onnx",
    dim_f: 2560,
    name: "MDX-NET_Crowd_HQ_1",
  },
  {
    id: "UVR_MDXNET_KARA_2.onnx",
    dim_f: 2048,
    name: "UVR_MDXNET_KARA_2.onnx",
  },
];
const selectedModel = computed(() =>
  modelList.find((model) => model.id === selectedModelId.value)
);

const selectedModelId = ref<string>(modelList[2].id);

const modelPath = ref<string>();
const eventSourceURI = computed(
  () =>
    `http://localhost:${
      port.value
    }/vocal-remover?file_path=${encodeURIComponent(
      filepath.value || ""
    )}&output_dir=${encodeURIComponent(
      outputDir.value || ""
    )}&model_path=${encodeURIComponent(modelPath.value || "")}&dim_f=${
      selectedModel.value?.dim_f
    }`
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
  file.response = `${outputDir.value}/${file.file.name.replace(
    /\.\w+$/,
    "_背景.wav"
  )}`;
  return file;
};
const downloadModelIfNeed = async (modelId: string) => {
  const filepath = await window.__electron_preload__getModelPathByName?.(
    modelId
  );
  if (filepath) {
    modelPath.value = filepath;
  } else {
    try {
      modelPath.value = await window.__electron_preload__downloadModelByName?.(
        modelId,
        (value: number) => {
          progress.value = value;
        }
      );
      if (modelPath.value) {
        toast({
          title: "下载成功！",
        });
      }
    } catch (e: any) {
      toast({
        title: "下载模型失败！",
        description: e.message,
      });
      console.error(e); // console.error会自动上报到sentry
    }
  }
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
  port.value = await window.electronAPI?.getUVR5Prot((value) => {
    progress.value = value;
    console.log("value", value);
  });
  progress.value = 100;
  downloadModelIfNeed(selectedModelId.value);
  console.log("获取UVR5端口", port.value);
});
</script>
<template>
  <TablePage
    :concurrency="1"
    :headers="headers"
    :multiple="false"
    :percent="progress"
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
    <template #default>
      <p class="text-xs text-gray-400">分离模型：{{ selectedModel?.name }}</p>
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
