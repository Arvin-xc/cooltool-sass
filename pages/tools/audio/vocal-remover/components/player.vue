<script setup lang="ts">
// @ts-ignore
import WaveformPlaylist from "waveform-playlist";

const props = defineProps<{
  duration: number;
  files: string[];
}>();

const eventEmitter = ref();
const container = ref<HTMLDivElement>();
const playlist = ref<WaveformPlaylist>();
const play = () => {
  eventEmitter.value.emit("play");
};
const pause = () => {
  eventEmitter.value.emit("pause");
};

onMounted(() => {
  playlist.value = WaveformPlaylist({
    container: container.value,
    samplesPerPixel: 128,
    zoomLevels: [128, 256, 512],
    controls: {
      show: true,
    },
  });
  playlist.value
    .load(props.files.map((file) => ({ src: file })).slice(0, 1))
    .then(() => {
      eventEmitter.value = playlist.value.getEventEmitter();
    });
});
</script>
<template>
  <div ref="container"></div>
  <button @click="pause">pause</button>
  <button
    @click="
      playlist.isPlaying()
        ? eventEmitter.emit('pause')
        : eventEmitter.emit('play')
    "
  >
    Play
  </button>
</template>
