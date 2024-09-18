<script setup lang="ts">
import { useToast } from "~/components/ui/toast";
import Transcript from "./components/transcript.vue";
import { useTranscriber } from "./hooks/use-transcriber";
import Constants, { LANGUAGES, LANGUAGES_FOR_RENDER } from "./utils/Constants";

definePageMeta({
  name: "音视频转文字",
});
useSeoMeta({
  title: "音视频转文字",
  description: "免费的AI提取文字工具，可将任意音视频中的语音转为文本。",
});
const accept = "audio/*";
const transcriber = useTranscriber();
const language = ref<keyof typeof LANGUAGES>("zh");
const isLoading = ref<boolean>(false);
const { toast } = useToast();

const onUpload = (files: File[]) => {
  isLoading.value = true;
  const file = files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    const arrayBuffer = reader.result as ArrayBuffer;
    if (!arrayBuffer) return;

    const audioCTX = new AudioContext({
      sampleRate: Constants.SAMPLING_RATE,
    });
    try {
      const decoded = await audioCTX.decodeAudioData(arrayBuffer);
      transcriber.onInputChange();
      transcriber.start(decoded, language.value);
    } catch (error: any) {
      toast({
        title: "转换失败！",
        description: error?.message,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
  reader.readAsArrayBuffer(file);
};
</script>

<template>
  <Transcript
    :transcribed-data="transcriber.output"
    v-if="transcriber.output"
  />
  <Upload
    v-else
    subtitle="识别音视频中的语音，并转为文字。"
    @change="onUpload"
    :accept="accept"
    :percent="transcriber.progressItems[0]?.progress"
    :percentTip="`加载${transcriber.progressItems[0]?.name}中...`"
    :loading="isLoading || transcriber.isBusy"
  >
    <div class="flex items-center gap-2 w-max mt-4">
      <Label for="language" class="shrink-0">音视频语言：</Label>
      <Select
        :model-value="language"
        @update:model-value="(value:any) => (language = value)"
      >
        <SelectTrigger id="language">
          <SelectValue placeholder="请选择语言" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            :key="option"
            :value="option"
            v-for="option in Object.keys(LANGUAGES)"
          >
            {{
              LANGUAGES_FOR_RENDER[
                LANGUAGES[
                  option as keyof typeof LANGUAGES
                ] as keyof typeof LANGUAGES_FOR_RENDER
              ]
            }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </Upload>
</template>
