<script setup lang="ts">
const props = defineProps<{
  recordingFile: File;
}>();
const { recordingFile } = toRefs(props);

const recordingFileURL = computed(() =>
  recordingFile.value ? URL.createObjectURL(recordingFile.value) : ""
);
</script>
<template>
  <div
    v-if="recordingFileURL && recordingFile"
    class="max-w-xl space-y-2 text-center"
  >
    <h2>{{ recordingFile.name }}</h2>
    <video :src="recordingFileURL" controls></video>
  </div>
</template>
