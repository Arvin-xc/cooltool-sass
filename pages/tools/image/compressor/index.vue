<script setup lang="ts">
const Client = defineAsyncComponent(() => import("./client.vue"));

definePageMeta({
  name: "图片压缩",
});
</script>

<template>
  <ClientOnly>
    <Client />
  </ClientOnly>
</template>
