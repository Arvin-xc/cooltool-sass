<script setup lang="ts">
const Client = defineAsyncComponent(() => import("./client.vue"));

useSeoMeta({
  title: "图片压缩",
  description: "永久的免费图片压缩工具，批量导出，快速压缩。",
});
definePageMeta({
  name: "图片压缩",
});
</script>

<template>
  <ClientOnly>
    <Client />
  </ClientOnly>
</template>
