<script setup lang="ts">
const landing = ref<boolean>(true);

definePageMeta({
  name: "思维导图",
});

const MindMapping = defineAsyncComponent(
  () => import("./components/mind-mapping.vue")
);
</script>

<template>
  <div class="p-6 h-full font-bold bg-white">
    <h2 class="font-bold">{{ $route.name }}</h2>

    <div class="flex flex-col justify-center items-center h-full gap-6">
      <img class="w-[20vw] h-[20vw]" src="/assets/text/mind-mapping/banner.png" />
      <h3 class="text-gray-400">
        是一个思维导图库，同时也是一个思维导图软件，免费、强大...
      </h3>
      <div class="flex items-center justify-center">
        <Button :loading="!landing" @click="landing = false"> 开始 </Button>
      </div>
    </div>
  </div>
  <ClientOnly v-if="!landing" class="z-10 relative">
    <MindMapping @close="landing = true" />
  </ClientOnly>
</template>
