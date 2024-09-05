<script setup lang="ts">
import { useDropZone, useEventListener } from "@vueuse/core";

const { subtitle, label, accept, percent } = defineProps<{
  subtitle: string;
  multiple?: boolean;
  percent?: number;
  isBusy?: boolean;
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

function onDrop(files: File[] | null) {
  const acceptFiles = filterAcceptFiles(files || []);
  if (acceptFiles) {
    emit("change", acceptFiles);
  }
}
const filterAcceptFiles = (files: File[]) => {
  if (computedAccept.value === "*") {
    return files;
  }
  const [mainType, subType] = accept?.split("/") || [];
  if (subType === "*") {
    return files.filter((file) => file.type.split("/")[0] === mainType);
  } else {
    return files.filter((file) => accept?.split(",").includes(file.type));
  }
};

const computedAccept = computed(() => accept || "*");

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes(types) {
    const [mainType, subType] = accept?.split("/") || [];

    if (computedAccept.value === "*") {
      return true;
    }

    if (subType === "*") {
      return types.some((type) => type.split("/")[0] === mainType);
    } else {
      return types.includes(computedAccept.value);
    }
  },
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
    <div class="flex flex-1 w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full">
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
            class="w-full h-10 mt-4 px-12"
          >
            <Progress :model-value="percent" />
            <div class="flex gap-2 items-center justify-center mt-2">
              <div class="text-sm text-muted-foreground">
                加载必要文件中，请稍等...
              </div>
              <div class="text-primary">{{ percent.toFixed(2) }}%</div>
            </div>
          </div>
          <Button @click="onClick" class="mt-4" :loading="isBusy" v-else>
            {{ label || "添加文件" }}
          </Button>
          <div class="mt-4">
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
