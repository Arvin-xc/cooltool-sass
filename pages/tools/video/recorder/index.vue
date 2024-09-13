<script setup lang="ts">
import {
  type DevicesInfo,
  type DisplaySurfaceType,
} from "~/lib/video/recorder.d";
import RecordingTypes from "./components/recording-types.vue";
import RecordingInputs from "./components/recording-inputs.vue";
import Preview from "./components/preview.vue";
import RecordingResult from "./components/recording-result.vue";
import ElectronMediaSelectDialog from "./components/electron-media-select-dialog.vue";
import CountdownMask from "./components/countdown-mask.vue";

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
const recording = ref<boolean>(false);
const recordingCountDown = ref<number>(0);

const onReset = () => {
  recordingFile.value = undefined;
  selectedDevicesInfo.value = {};
  previewSrcObject.value = undefined;
  playInPictureSrcObject.value = undefined;
  selectedRecordingType.value = undefined;
};
</script>

<template>
  <div class="p-6 h-full">
    <h2 class="font-bold flex gap-2 items-center">
      <Button v-if="selectedRecordingType" @click="onReset"> 返回 </Button>
      {{ $route.name?.toString() }}
    </h2>
    <div
      class="h-full overflow-auto flex flex-col gap-8 items-center justify-center relative pb-6"
    >
      <RecordingResult v-if="recordingFile" :recording-file="recordingFile" />
      <template v-else>
        <RecordingTypes
          v-if="!selectedRecordingType"
          :selected-recording-type="selectedRecordingType"
          @select="(type) => (selectedRecordingType = type)"
        />
        <template v-if="previewSrcObject">
          <div class="max-w-xl relative">
            <CountdownMask
              v-if="recordingCountDown > 0"
              :recordingCountDown="recordingCountDown"
            />
            <Preview
              :key="previewSrcObject.id"
              :src-object="previewSrcObject"
            />
            <Preview
              v-if="playInPictureSrcObject"
              :key="playInPictureSrcObject.id"
              :src-object="playInPictureSrcObject"
              :play-in-picture="true"
            />
          </div>
        </template>
      </template>
      <template v-if="selectedRecordingType">
        <RecordingInputs
          v-if="!recordingFile"
          :recording="recording"
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
        <ClientOnly>
          <Recording
            :key="selectedRecordingType"
            :recording="recording"
            :recordingCountDown="recordingCountDown"
            :devicesInfo="selectedDevicesInfo"
            :recordingType="selectedRecordingType"
            :recordingFile="recordingFile"
            @update-src-object="(srcObject) => (previewSrcObject = srcObject)"
            @update-play-in-picture-src-object="
              (srcObject) => (playInPictureSrcObject = srcObject)
            "
            @update-recording-file="(file) => (recordingFile = file)"
            @reset="onReset"
            @update-recording-state="(state) => (recording = state)"
            @update-recording-countdown="
              (value) => (recordingCountDown = value)
            "
          />
        </ClientOnly>
      </template>
    </div>
  </div>
</template>
