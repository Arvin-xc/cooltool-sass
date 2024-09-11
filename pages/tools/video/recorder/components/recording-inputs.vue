<script setup lang="ts">
import type { DevicesInfo, DisplaySurfaceType } from "~/lib/video/recorder.d";
import { useToast } from "~/components/ui/toast";
import { ref } from "vue";

const emits = defineEmits<{
  "select:audio": [value: string];
  "select:video": [value: string];
}>();
const { devicesInfo, selectedRecordingType } = defineProps<{
  devicesInfo: DevicesInfo;
  selectedRecordingType?: DisplaySurfaceType;
}>();

type LocalDevicesInfo = {
  videoInputDevices: MediaDeviceInfo[];
  audioInputDevices: MediaDeviceInfo[];
};
const LOCAL_STORAGE_DEVICES_INFO_KEY = "LOCAL_STORAGE_DEVICES_INFO_KEY";

const { toast } = useToast();
const audioInputDevices = ref<MediaDeviceInfo[]>([]);
const videoInputDevices = ref<MediaDeviceInfo[]>([]);
const selectedAudioInputDevice = computed(() =>
  audioInputDevices.value.find(
    (audio) => audio.deviceId === devicesInfo.selectedAudioDeviceId
  )
);
const selectedVideoInputDevice = computed(() =>
  videoInputDevices.value.find(
    (video) => video.deviceId === devicesInfo.selectedVideoDeviceId
  )
);
const storeInputDevices = (deviceInfo: LocalDevicesInfo) => {
  localStorage.setItem(
    LOCAL_STORAGE_DEVICES_INFO_KEY,
    JSON.stringify(deviceInfo)
  );
};
const setLocalInputDevices = () => {
  try {
    const localDevicesInfo = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_DEVICES_INFO_KEY) || ""
    ) as LocalDevicesInfo;

    audioInputDevices.value = localDevicesInfo.audioInputDevices;
    videoInputDevices.value = localDevicesInfo.videoInputDevices;
  } catch (error) {}
};

const onRequestDevices = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const devices = await navigator.mediaDevices.enumerateDevices();

    videoInputDevices.value = [];
    audioInputDevices.value = [];
    devices.forEach(function (device) {
      if (device.kind === "videoinput") {
        videoInputDevices.value.push(device);
      } else if (device.kind === "audioinput") {
        audioInputDevices.value.push(device);
      }
    });
    storeInputDevices({
      videoInputDevices: videoInputDevices.value || [],
      audioInputDevices: audioInputDevices.value || [],
    });

    stream.getTracks().forEach((track) => track.stop());
  } catch (e) {
    console.log(e);
    toast({
      title: "获取输入设备失败!",
    });
  }
};

onMounted(async () => {
  setLocalInputDevices();
  if (selectedRecordingType === "camera") {
    await onRequestDevices();
    const firstVideoDeviceId = videoInputDevices.value[0]?.deviceId;
    if (firstVideoDeviceId) {
      emits("select:video", firstVideoDeviceId);
    }
  }
});
</script>
<template>
  <div class="flex items-center justify-center gap-8">
    <div class="flex items-center justify-center gap-2">
      <Label for="audioInput" class="shrink-0">麦克风：</Label>
      <Select
        @update:open="(open) => open && onRequestDevices()"
        @update:model-value="(deviceId:string) => $emit('select:audio', deviceId)"
      >
        <SelectTrigger id="audioInput">
          {{ selectedAudioInputDevice?.label || "请选择麦克风" }}
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            :value="option.deviceId"
            v-for="option in audioInputDevices"
            class="gap-2"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div
      class="flex items-center gap-2"
      v-if="
        selectedRecordingType &&
        ['monitor', 'camera'].includes(selectedRecordingType)
      "
    >
      <Label for="videoInput" class="shrink-0">摄像头：</Label>
      <Select
        @update:open="(open) => open && onRequestDevices()"
        @update:model-value="(deviceId:string) => $emit('select:video', deviceId)"
      >
        <SelectTrigger id="videoInput">
          {{ selectedVideoInputDevice?.label || "请选择麦克风" }}
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            :value="option.deviceId"
            v-for="option in videoInputDevices"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
