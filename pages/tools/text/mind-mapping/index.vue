<script setup lang="ts">
const landing = ref<boolean>(true);

useSeoMeta({
  title: "思维导图",
  description: "强大且免费的思维导图工具，操作简单，可导出Xmind等其他格式。",
});
definePageMeta({
  name: "思维导图",
  icon: "icon-park-outline:mind-mapping",
});

const MindMapping = defineAsyncComponent(
  () => import("./components/mind-mapping.vue")
);
</script>

<template>
  <div class="p-6 h-full font-bold ">
    <h2 class="font-bold">{{ $route.name }}</h2>

    <div class="flex flex-col justify-center items-center h-full gap-6">
      <img
        class="w-[20vw] h-[20vw]"
        src="/assets/text/mind-mapping/banner.png"
      />
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
