<script setup lang="ts">
import Transcript from "./components/transcript.vue";
import { useTranscriber } from "./hooks/use-transcriber";
import Constants from "./utils/Constants";

definePageMeta({
  name: "文本提取",
});
const accept = "audio/*";
const transcriber = useTranscriber();

const ready = ref<boolean>(false)
const onUpload = (files: File[]) => {
  const file = files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    const arrayBuffer = reader.result as ArrayBuffer;
    if (!arrayBuffer) return;

    const audioCTX = new AudioContext({
      sampleRate: Constants.SAMPLING_RATE,
    });
    const decoded = await audioCTX.decodeAudioData(arrayBuffer);
    transcriber.onInputChange();
    transcriber.start(decoded);
  };
  reader.readAsArrayBuffer(file);
  ready.value = true
};
</script>

<template>
  <Upload subtitle="语音转文字" v-if="!ready" @change="onUpload" :accept="accept"></Upload>
  transcriber{{ transcriber }}
  <Transcript :transcribed-data="transcriber.output" />
</template>
