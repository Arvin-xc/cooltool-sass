<script setup lang="ts">
import { ConfigProvider } from "radix-vue";
const useIdFunction = () => useId();
onMounted(() => {
  const globalFetch = window.fetch;
  window.fetch = (input, init) =>
    globalFetch(input, {
      ...init,
      referrerPolicy: "no-referrer",
    });
});
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
