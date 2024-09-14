<script setup lang="ts">
const props = defineProps<{
  srcObject: MediaStream;
  playInPicture?: boolean;
}>();
const propsRef = toRefs(props);
const { srcObject, playInPicture } = props;
const previewVideoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  if (previewVideoRef.value) {
    previewVideoRef.value.srcObject = srcObject;

    if (playInPicture) {
      previewVideoRef.value.addEventListener("loadedmetadata", () => {
        previewVideoRef.value?.requestPictureInPicture();
      });
    }
  }
});

watch(propsRef.srcObject, (srcObject) => {
  if (playInPicture && !srcObject) {
    document.exitPictureInPicture();
  }
});
</script>
<template>
  <video
    ref="previewVideoRef"
    playsinline
    autoplay
    :class="{
      'fixed z-[10] w-0 h-0 left-0 top-0 opacity-0': playInPicture,
    }"
  />
</template>
