<script lang="ts" setup>
const { recordingCountDown } = defineProps<{
  recordingCountDown: number;
}>();
</script>

<template>
  <div
    class="absolute left-0 top-0 w-full h-full z-1 bg-black/50 flex items-center justify-center text-7xl text-white"
  >
    <div class="p-4 w-36 h-36 border rounded-full border-white border-4 flex items-center justify-center text-center">
      {{ recordingCountDown }}
    </div>
  </div>
</template>
