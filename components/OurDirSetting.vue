<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";

defineProps<{ outputDir?: string }>();

const emit = defineEmits(["change"]);
const dir = useLocalStorage("output-dir", "");

const onSelectFolder = async () => {
  const folder = await window.electronAPI?.selectFolder();
  if (folder) {
    emit("change", folder);
    dir.value = folder;
  }
};

onMounted(async () => {
  dir.value = useLocalStorage("output-dir", "").value;

  if (!dir.value) {
    dir.value = (await window.electronAPI?.getPath("desktop")) || "";
  }
  emit("change", dir.value);
});
</script>
<template>
  <div
    class="flex justify-center items-center mt-2 text-sm text-gray-500 cursor-pointer"
    @click="onSelectFolder"
  >
    <span>输出目录：</span>
    <div
      class="rounded border text-left w-max px-2 py-1 text-xs hover:border-primary h-[26px]"
    >
      {{ outputDir }}
    </div>
  </div>
</template>
