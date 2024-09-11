<script lang="ts" setup>
import { MediaRecorderManager } from "~/lib/video/recorder";
import type { DevicesInfo, DisplaySurfaceType } from "~/lib/video/recorder.d";
import { getAudioTracksByDeviceId } from "../utils";
import { downloadFile } from "~/lib/file";
import { useToast } from "~/components/ui/toast";

const emits = defineEmits<{
  updateSrcObject: [srcObject?: MediaStream];
  updatePlayInPictureSrcObject: [srcObject?: MediaStream];
  updateRecordingFile: [recording: File];
  reset: [];
}>();
const { devicesInfo, recordingType, recordingFile } = defineProps<{
  devicesInfo: DevicesInfo;
  recordingType: DisplaySurfaceType;
  recordingFile?: File;
}>();

const { toast } = useToast();
const recording = ref<boolean>(false);
const maxRecordingCountDown = 99;
const recordingCountDown = ref<number>(3); // 默认倒计时3秒开始录制
const playInPictureRecorderManager = ref<MediaRecorderManager>();
const mainRecorderManager = ref<MediaRecorderManager>(
  new MediaRecorderManager({
    displaySurface: recordingType,
    recordResultType: "video",
    onStopRecording: (manager) => {
      recording.value = false;
      if (manager.output?.video) {
        emits("updateRecordingFile", manager.output.video);
      }
    },
  })
);

const recordingCamera = async (selectedVideoDeviceId: string) => {
  // 录制全屏可开启画中画来捕捉摄像头（例如：录课右下角的摄像头）
  playInPictureRecorderManager.value = new MediaRecorderManager({
    displaySurface: "camera",
    recordResultType: "video",
    devicesInfo: {
      selectedVideoDeviceId,
    },
  });
  await playInPictureRecorderManager.value.startRecording();
  emits(
    "updatePlayInPictureSrcObject",
    playInPictureRecorderManager.value.stream
  );
};
const addAudioTracksIfNeed = async () => {
  //选择了麦克风，需要讲麦克风steam插入到录屏里
  if (devicesInfo.selectedAudioDeviceId) {
    const additionalAudioTracks = await getAudioTracksByDeviceId(
      devicesInfo.selectedAudioDeviceId
    );
    mainRecorderManager.value.addAudioTracks(additionalAudioTracks);
  }
};
const onStart = async () => {
  await addAudioTracksIfNeed();

  // 清除开始前的录制数据
  mainRecorderManager.value.resetRecording();
  // 恢复录制
  mainRecorderManager.value.resumeRecording();
  recording.value = true;
};

const onStop = async (saveRecording?: boolean) => {
  recording.value = false;

  const res = await mainRecorderManager.value.stopRecording();
  if (playInPictureRecorderManager.value) {
    // 结束时退出画中画
    document.exitPictureInPicture();
    await playInPictureRecorderManager.value?.stopRecording();
  }

  if (saveRecording && res.video) {
    emits("updateRecordingFile", res.video);
  }
};

const onPreview = async (devicesInfo?: DevicesInfo) => {
  try {
    await mainRecorderManager.value.startRecording(devicesInfo);
    emits("updateSrcObject", mainRecorderManager.value.stream);
  } catch (error: any) {
    if (error.code === 0) {
      emits("reset");
      toast({ title: "已取消录制" });
    } else {
      toast({ title: error.message });
    }
  }
};
watch(
  () => devicesInfo.selectedVideoDeviceId,
  (selectedVideoDeviceId, oldSelectedVideoDeviceId) => {
    if (
      recordingType === "monitor" &&
      selectedVideoDeviceId !== oldSelectedVideoDeviceId
    ) {
      //视频输入信号更新，且已经在播放画中画则需要重新插入画中画信号
      if (playInPictureRecorderManager.value) {
        playInPictureRecorderManager.value.stopRecording();
      }
      if (selectedVideoDeviceId) {
        recordingCamera(selectedVideoDeviceId);
      }
    }

    if (
      recordingType === "camera" &&
      selectedVideoDeviceId !== oldSelectedVideoDeviceId
    ) {
      onPreview(devicesInfo);
    }
  }
);

onMounted(async () => {
  if (recordingType !== "camera") {
    onPreview();
  }
});

onBeforeUnmount(() => {
  onStop();
});
</script>
<template>
  <div class="flex items-center justify-center gap-12" v-if="recordingFile">
    <Button variant="outline" class="mr-12" @click="$emit('reset')">
      重新开始
    </Button>

    <Button @click="downloadFile(recordingFile)"> 导出MP4 </Button>
    <Button variant="secondary" @click="downloadFile(recordingFile)">
      导出webm
    </Button>
  </div>
  <div class="flex flex-col gap-2" v-else>
    <div class="flex items-center justify-center gap-4 flex-1">
      <Label class="shrink-0">录制倒计时：</Label>
      <Input
        class="w-20"
        v-model="recordingCountDown"
        type="number"
        min="0"
        :max="maxRecordingCountDown"
      />
      <div>秒</div>
    </div>
    <div class="flex items-center justify-center gap-12">
      <Button :disabled="recording" @click="onStart"> 开始录屏 </Button>
      <Button :disabled="!recording" @click="() => onStop(true)">
        结束录屏
      </Button>
    </div>
  </div>
</template>
