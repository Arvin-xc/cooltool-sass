<script setup lang="ts">
import { useDropZone, useEventListener } from "@vueuse/core";

const {
  subtitle,
  label,
  accept = "*",
  percent,
  multiple,
} = defineProps<{
  subtitle: string;
  multiple?: boolean;
  percent?: number;
  percentTip?: string;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  accept?: string;
}>();

const dropZoneRef = ref<HTMLDivElement>();
const inputRef = ref<HTMLInputElement | null>(null);
const emit = defineEmits(["change"]);
const onchange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files?.length >= 1) {
    emit("change", [...target.files]);
    if (inputRef.value) {
      inputRef.value.value = "";
    }
  }
};

const filterAcceptFiles = (files: File[]) => {
  if (accept === "*") {
    return files;
  }
  const [mainType, subType] = accept?.split("/") || [];
  if (subType === "*") {
    return files.filter((file) => file.type.split("/")[0] === mainType);
  } else {
    return files.filter((file) => accept?.split(",").includes(file.type));
  }
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop(files) {
    emit("change", files);
  },
  multiple,
  preventDefaultForUnhandled: true,
  dataTypes: accept.split(","),
});

onMounted(() => {
  useEventListener("paste", (event) => {
    const files = event.clipboardData?.files;
    if (files) {
      const acceptFiles = filterAcceptFiles([...files] || []);
      if (acceptFiles) {
        emit("change", acceptFiles);
      }
      return;
    }
  });
});
const onClick = () => inputRef.value?.click();

defineExpose({
  onClick,
});
</script>

<template>
  <div class="h-full">
    <div class="flex flex-1 w-full flex-col gap-4 lg:gap-6 h-full">
      <div
        ref="dropZoneRef"
        :class="[
          'flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm',
          {
            'border-primary': isOverDropZone,
          },
        ]"
      >
        <div class="flex flex-col w-full items-center gap-1 text-center">
          <h3 class="text-2xl font-bold tracking-tight">{{ $route.name }}</h3>
          <p class="text-sm text-muted-foreground">
            {{ subtitle }}
          </p>
          <div
            v-if="typeof percent === 'number' && percent < 100"
            class="w-full min-h-10 mt-4 px-12"
          >
            <Progress class="h-2.5" :model-value="percent" />
            <div class="flex gap-2 items-center justify-center mt-2">
              <div class="text-sm text-muted-foreground leading-[24px]">
                <p>{{ percentTip ?? "加载必要文件中！" }}</p>
              </div>
              <div class="text-primary">{{ percent.toFixed(2) }}%</div>
            </div>
            <p class="text-sm text-muted-foreground leading-[24px]">
              首次使用会下载必要依赖，请稍等...
            </p>
          </div>
          <Button
            @click="onClick"
            class="mt-4"
            :disabled="disabled"
            :loading="loading"
            v-else
          >
            {{ label || "添加文件" }}
          </Button>
          <div class="mt-6">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <input
      :multiple="multiple || false"
      @change="onchange"
      ref="inputRef"
      :accept="accept || '*'"
      type="file"
      hidden
    />
  </div>
</template>
