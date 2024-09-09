<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <input
    ref="inputRef"
    type="file"
    :accept="props.accept"
    :multiple="props.multiple"
    size="sm"
    icon="i-heroicons-folder"
    @change="onchange"
  />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

const inputRef = ref<{ input: HTMLInputElement }>();
const emit = defineEmits<{ change: [files: File[]] }>();
const props = defineProps<{ multiple: boolean; accept?: string }>();
defineExpose({
  inputRef: inputRef,
});
const checkValidFile = (accept: string, filetype: string) => {
  const accepts = accept.split("/");
  const filetypes = filetype.split("/");
  if (accepts[1] === "*") {
    return filetypes[0] === accepts[0];
  }
  return props.accept?.match(filetype);
};
const verifyFiletype = (filetype: string) => {
  const types = props.accept?.split(",");
  return types?.find((type) => checkValidFile(type, filetype));
};
const onPaste = (event) => {
  const items = event.clipboardData && event.clipboardData.items;
  const files: File[] = [];
  if (items?.length) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file" && verifyFiletype(items[i].type)) {
        const file = items[i].getAsFile() as File;
        files.push(file);
        break;
      }
    }
    emit("change", files);
  }
};
onMounted(() => {
  document.addEventListener("paste", onPaste);
});
onUnmounted(() => {
  document.removeEventListener("paste", onPaste);
});
const onchange = (files) => {
  if (files?.length && inputRef.value) {
    emit("change", [...files]);
    inputRef.value.input.value = "";
  }
};
</script>
