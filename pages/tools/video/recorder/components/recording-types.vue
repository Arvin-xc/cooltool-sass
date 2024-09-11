<script setup lang="ts">
import type { DevicesInfo, DisplaySurfaceType } from "~/lib/video/recorder.d";

const isElectron = useRoute().meta.electron;
const normalTypes = [
  {
    label: "整个屏幕",
    key: "monitor",
    icon: defineAsyncComponent(() => import("~/components/icons/Monitor.vue")),
  },
  {
    label: "摄像头",
    key: "camera",
    icon: defineAsyncComponent(() => import("~/components/icons/Camera.vue")),
  },
  {
    label: "应用窗口",
    key: "window",
    icon: defineAsyncComponent(() => import("~/components/icons/Window.vue")),
  },
];
const webTypes = [
  {
    label: "浏览器标签页",
    key: "browser",
    icon: defineAsyncComponent(() => import("~/components/icons/Tab.vue")),
  },
];
const types = computed(() =>
  isElectron ? normalTypes : normalTypes.concat(webTypes)
);

const emits = defineEmits<{
  select: [value: DisplaySurfaceType];
  start: [value?: DevicesInfo];
}>();

defineProps<{
  selectedRecordingType?: DisplaySurfaceType;
}>();
</script>
<template>
  <div class="w-full flex-wrap flex justify-between mt-8">
    <div
      v-for="item in types"
      :key="item.key"
      :class="`w-[200px] h-[160px] ${
        item.key === selectedRecordingType ? 'text-primary border-primary' : ''
      } text-center  cursor-pointer hover:text-primary border rounded-lg flex flex-col justify-center mb-4 mx-4`"
      @click="$emit('select', item.key as DisplaySurfaceType)"
    >
      <component :is="item.icon" :size="60" :key="item.key" class="mx-auto" />
      <p class="font-bold mt-3 w-full">
        {{ item.label }}
      </p>
    </div>
  </div>
</template>
