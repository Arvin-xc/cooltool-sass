<script lang="ts" setup>
import { MediaRecorderManager } from "~/lib/video/recorder";
import type { DevicesInfo, DisplaySurfaceType } from "~/lib/video/recorder.d";
import { getAudioTracksByDeviceId } from "../utils";
import { downloadFile } from "~/lib/file";
import { useToast } from "~/components/ui/toast";
import ElectronMediaSelectDialog from "./electron-media-select-dialog.vue";
import { videoConverterOptions } from "~/config/tools.video";

const emits = defineEmits<{
  updateSrcObject: [srcObject?: MediaStream];
  updatePlayInPictureSrcObject: [srcObject?: MediaStream];
  updateRecordingFile: [recording: File];
  updateRecordingState: [state: boolean];
  updateRecordingCountdown: [value: number];
  reset: [];
}>();
const props = defineProps<{
  devicesInfo: DevicesInfo;
  recordingCountDown: number;
  recordingType: DisplaySurfaceType;
  recordingFile?: File;
  recording: boolean;
}>();
const { recordingCountDown, recordingFile, devicesInfo, recordingType } =
  toRefs(props);
const electronMediaSelectDialogRef = ref<{
  onUpdateOpen: (state: boolean) => void;
}>();

const { toast } = useToast();
const globalStore = useGlobalStore();

const maxRecordingCountDown = 99;
const exportProgress = ref<number>(0); // 导出为mp4需要转码
const recordingCountDownInput = ref<number>(3); // 默认倒计时3秒开始录制
const playInPictureRecorderManager = ref<MediaRecorderManager>();
const mainRecorderManager = ref<MediaRecorderManager>(
  new MediaRecorderManager({
    displaySurface: recordingType.value,
    recordResultType: "video",
    includeScreenAudio: true,
    onStopRecording: (manager) => {
      emits("updateRecordingState", false);
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
  });
  await playInPictureRecorderManager.value.startRecording({
    selectedVideoDeviceId,
  });
  emits(
    "updatePlayInPictureSrcObject",
    playInPictureRecorderManager.value.stream
  );
};
const updateAudioTracks = async () => {
  //选择了麦克风，需要讲麦克风steam插入到录屏里
  const additionalAudioTracks = await getAudioTracksByDeviceId(
    devicesInfo.value.selectedAudioDeviceId
  );
  mainRecorderManager.value.updateAudioTracks(additionalAudioTracks);
};
const recordingAfterCountingDown = () => {
  emits("updateRecordingCountdown", recordingCountDownInput.value);
};

const onStart = async () => {
  // 清除开始前的录制数据
  mainRecorderManager.value.resetRecording();
  recordingAfterCountingDown();
  // 恢复录制
};

const onStop = async (saveRecording?: boolean) => {
  emits("updateRecordingState", false);

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
const onExportMP4 = async (file: File) => {
  if (globalStore.runtime === "web") {
    // Web暂不支持转码
    toast({
      title: "Web版本暂不支持导出MP4!",
      description: "您可先导出为webm，然后下载客户端转换视频格式为MP4",
    });
  } else {
    exportProgress.value = 1;
    const inputFilepath = await window.electronAPI?.writeFile(file);
    const outputDir = await window.electronAPI?.getPath("desktop");
    const newFilename = file.name.replace(/\.\w+$/, ".mp4");
    const outputFilepath = `${outputDir}/${newFilename}`;
    if (inputFilepath && outputDir) {
      await window.__electron_preload__invokeFFmpeg?.({
        input: inputFilepath,
        inputOptions: [],
        onFinish() {
          toast({
            title: "导出成功！",
          });
          exportProgress.value = 0;
          window.electronAPI?.openFile(outputFilepath);
        },
        onError(e) {
          toast({
            title: "转码失败！" + e.message,
          });
        },
        onProgress(progress) {
          if (progress.percent) {
            exportProgress.value = progress.percent;
          }
        },
        outputOptions: videoConverterOptions.mp4.outputOptions,
        output: outputFilepath,
      });
    } else {
      toast({
        title: "导出失败！",
      });
    }
  }
  // downloadFile(recordingFile);
};
watch(
  () => devicesInfo.value.selectedVideoDeviceId,
  (selectedVideoDeviceId, oldSelectedVideoDeviceId) => {
    if (
      recordingType.value === "screen" &&
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
      recordingType.value === "camera" &&
      selectedVideoDeviceId !== oldSelectedVideoDeviceId
    ) {
      onPreview(devicesInfo.value);
    }
  },
  {
    immediate: true,
  }
);
watch(() => devicesInfo.value.selectedAudioDeviceId, updateAudioTracks);

watch(
  () => recordingCountDown.value,
  (value) => {
    if (value === 0) {
      mainRecorderManager.value.resumeRecording();
      emits("updateRecordingState", true);
    } else if (value > 0) {
      setTimeout(() => {
        emits("updateRecordingCountdown", value - 1);
      }, 1000);
    }
  }
);

onMounted(async () => {
  if (recordingType.value === "camera") return;

  if (globalStore.runtime === "electron") {
    electronMediaSelectDialogRef.value?.onUpdateOpen(true);
  } else {
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

    <Button
      variant="secondary"
      @click="onExportMP4(recordingFile)"
      :loading="exportProgress > 0"
    >
      导出MP4
    </Button>
    <Button @click="downloadFile(recordingFile)"> 导出webm </Button>
  </div>
  <div class="flex flex-col gap-2" v-else>
    <div
      class="flex items-center justify-center gap-4 flex-1"
      v-if="!recording"
    >
      <Label class="shrink-0">录制倒计时：</Label>
      <Input
        class="w-20"
        v-model="recordingCountDownInput"
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
  <ElectronMediaSelectDialog
    :type="recordingType"
    @select="onPreview()"
    @cancel="$emit('reset')"
    ref="electronMediaSelectDialogRef"
  />
</template>
