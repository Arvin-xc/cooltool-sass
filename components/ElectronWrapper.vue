<script setup lang="ts">
const userAgent = ref<string>(useRequestHeader("User-Agent") || "");
const isElectron = computed(() =>
  (userAgent.value || navigator.userAgent).includes("Electron")
);
const router = useRouter();
const routes = router.getRoutes();
const route = useRoute();
const page = computed(() => routes.find((item) => item.path === route.path));
const globalStore = useGlobalStore();
globalStore.updateRuntime(isElectron.value ? "electron" : "web");
</script>
<template>
  <div class="h-full" v-if="!isElectron && page?.meta.electron">
    <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full">
      <div :class="['flex flex-1 items-center justify-center rounded-lg ']">
        <div class="flex flex-col items-center gap-1 text-center">
          <h3 class="text-2xl font-bold tracking-tight">{{ page?.name }}</h3>
          <p class="text-sm text-muted-foreground">
            此功能仅在客户端可用，请点击下方按钮下载客户端
          </p>
          <Button
            @click="navigateTo('/download', { open: { target: '_blank' } })"
            class="mt-4"
          >
            下载客户端
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div class="h-full w-full" :hidden="!isElectron && !!page?.meta.electron">
    <slot />
  </div>
</template>
