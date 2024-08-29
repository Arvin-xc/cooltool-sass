<template>
  <div v-if="transcribedData && !transcribedData.isBusy">
    <div class="w-full text-right mt-4">
      <Button
        variant="outline"
        class="inline-flex items-center"
        @click="exportTXT"
      >
        导出文本
      </Button>
      <Button
        variant="outline"
        class="inline-flex items-center ml-4"
        @click="exportJSON"
      >
        导出为JSON文件
      </Button>
    </div>
    <div
      ref="divRef"
      class="w-full flex flex-col my-2 mt-4 p-4 max-h-[20rem] overflow-y-auto ring-1 rounded-md ring-green"
    >
      <div
        v-for="(chunk, i) in transcribedData?.chunks ?? []"
        :key="`${i}-${chunk.text}`"
        class="w-full flex flex-row mb-2 bg-white rounded-lg p-4 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
      >
        <div class="mr-5">
          {{ formatAudioTimestamp(chunk.timestamp[0]) }}
        </div>
        {{ chunk.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { formatAudioTimestamp } from "../utils/AudioUtils";

const props = defineProps<{ transcribedData: any }>();

const divRef = ref<HTMLDivElement | null>(null);

// Save Blob
const saveBlob = (blob: Blob | MediaSource, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

// Export TXT
const exportTXT = () => {
  const chunks = props.transcribedData?.chunks ?? [];
  const text = chunks
    .map((chunk: { text: any }) => chunk.text)
    .join("")
    .trim();
  const blob = new Blob([text], { type: "text/plain" });
  saveBlob(blob, "transcript.txt");
};

// Export JSON
const exportJSON = () => {
  let jsonData = JSON.stringify(props.transcribedData?.chunks ?? [], null, 2);
  const regex = /( {4}"timestamp": )\[\s+(\S+)\s+(\S+)\s+\]/gm;
  jsonData = jsonData.replace(regex, "$1[$2 $3]");
  const blob = new Blob([jsonData], { type: "application/json" });
  saveBlob(blob, "transcript.json");
};

// Watch for changes in transcribedData
watch(
  () => props.transcribedData,
  () => {
    if (divRef.value) {
      const diff = Math.abs(
        divRef.value.offsetHeight +
          divRef.value.scrollTop -
          divRef.value.scrollHeight
      );

      if (diff <= 64) {
        divRef.value.scrollTop = divRef.value.scrollHeight;
      }
    }
  }
);
</script>
