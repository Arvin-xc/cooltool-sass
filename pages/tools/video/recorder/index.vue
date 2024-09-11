<script setup lang="ts">
import {
  type DevicesInfo,
  type DisplaySurfaceType,
} from "~/lib/video/recorder.d";
import RecordingTypes from "./components/recording-types.vue";
import RecordingInputs from "./components/recording-inputs.vue";
import Preview from "./components/preview.vue";
import RecordingResult from "./components/recording-result.vue";

const Recording = defineAsyncComponent(
  () => import("./components/recording.vue")
);

definePageMeta({
  name: "录屏工具",
});

const selectedRecordingType = ref<DisplaySurfaceType>();
const selectedDevicesInfo = ref<DevicesInfo>({});
const previewSrcObject = ref<MediaStream>();
const playInPictureSrcObject = ref<MediaStream>();
const recordingFile = ref<File>();

const onReset = () => {
  recordingFile.value = undefined;
  previewSrcObject.value = undefined;
  playInPictureSrcObject.value = undefined;
  selectedRecordingType.value = undefined;
};
</script>

<template>
  <div
    class="mx-12 h-full overflow-auto flex flex-col gap-8 items-center justify-center pb-8"
  >
    <RecordingResult v-if="recordingFile" :recording-file="recordingFile" />
    <template v-else>
      <RecordingTypes
        :selected-recording-type="selectedRecordingType"
        @select="(type) => (selectedRecordingType = type)"
      />
      <div v-if="previewSrcObject" class="max-w-xl">
        <Preview :key="previewSrcObject.id" :src-object="previewSrcObject" />
        <Preview
          v-if="playInPictureSrcObject"
          :key="playInPictureSrcObject.id"
          :src-object="playInPictureSrcObject"
          :playInPicture="true"
        />
      </div>
      <RecordingInputs
        :key="selectedRecordingType"
        :devicesInfo="selectedDevicesInfo"
        :selected-recording-type="selectedRecordingType"
        @select:audio="
          (deviceId) => (selectedDevicesInfo.selectedAudioDeviceId = deviceId)
        "
        @select:video="
          (deviceId) => (selectedDevicesInfo.selectedVideoDeviceId = deviceId)
        "
      />
    </template>
    <template v-if="selectedRecordingType">
      <ClientOnly>
        <Recording
          :key="selectedRecordingType"
          :devicesInfo="selectedDevicesInfo"
          :recordingType="selectedRecordingType"
          :recordingFile="recordingFile"
          @update-src-object="(srcObject) => (previewSrcObject = srcObject)"
          @update-play-in-picture-src-object="
            (srcObject) => (playInPictureSrcObject = srcObject)
          "
          @update-recording-file="(file) => (recordingFile = file)"
          @reset="onReset"
        />
      </ClientOnly>
    </template>
  </div>
</template>
