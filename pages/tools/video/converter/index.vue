<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { Icon } from "@iconify/vue";
import dayjs from "dayjs";
import { filesize } from "filesize";
import { getVideoDuration, openFile } from "~/lib/utils";
import {
  useConverterSettingStore,
  type VideoConverterOptions,
} from "~/stores/video/useConverterSettings";
import pLimit from "p-limit";
import type { ProgressVariants } from "~/components/ui/progress";
import {
  videoConverterOptions,
  videoFormats,
  type VideoFormat,
} from "~/config/tools.video";

definePageMeta({
  name: "视频格式转换",
  electron: true,
});

console.log(useRoute())
const accept = "video/*";
const limit = ref<ReturnType<typeof pLimit>>();
const uploadRef = ref<{ onClick: () => void }>();
const tableRef = ref<HTMLTableElement | null>(null);
const targetVideoFormat = ref<VideoFormat>("mp4");
type RcFile = {
  file: File;
  response?: string;
  duration: number;
  error: boolean;
  percent: number;
  variant: ProgressVariants["variant"];
  timemark: string;
  id: string;
};
const videos = ref<RcFile[]>([]);
const outputDir = ref<string>("");
const converterSettingStore = useConverterSettingStore();

const convertFn = async (newFile: RcFile) => {
  const today = dayjs().format("YYYY-MM-DD_HH-mm-ss");
  const newFilename = newFile.file.name.replace(
    /\.\w+$/,
    "." + targetVideoFormat.value
  );
  const outputPath = `${outputDir.value}/${today}_${newFilename}`;

  await new Promise((resolve, reject) => {
    window.__electron_preload__invokeFFmpeg?.({
      // @ts-ignore electron内存在file.path，浏览器内使用URL.createObjectURL
      input: newFile.file.path || URL.createObjectURL(newFile.file),
      inputOptions: [],
      outputOptions:
        videoConverterOptions[targetVideoFormat.value].outputOptions,
      output: outputPath,
      onFinish() {
        newFile.percent = 100;
        newFile.response = outputPath;
        newFile.variant = "success";
        resolve(true);
      },
      onError(err) {
        console.error(err);
        newFile.variant = "error";
        reject(err);
      },
      onProgress(progress) {
        console.log("processing", progress);
        newFile.timemark = progress.timemark;
        newFile.percent =
          progress.percent && progress.percent > 0 ? progress.percent : 0;
      },
    });
  });
};
const onSelectFiles = (files: File[]) => {
  tableRef.value?.scrollTo({ top: 0, behavior: "smooth" });
  const newFiles = files.map((item, index) => {
    return {
      file: item,
      id: uuid(),
      duration: 0,
      error: false,
      variant: "default" as ProgressVariants["variant"],
      timemark: "--",
      percent: 0,
    };
  });

  videos.value.unshift(...newFiles);

  videos.value.slice(0, newFiles.length).map((newFile) => {
    getVideoDuration(newFile.file).then((duration) => {
      newFile.duration = duration;
    });

    if (limit.value) {
      console.log("limit.value", limit.value);
      limit.value(() => convertFn(newFile));
    } else {
      convertFn(newFile);
    }
  });
};
const onRemove = (videoId: string) => {
  videos.value = videos.value.filter((video) => video.id !== videoId);
};

const onSettingChange = (settings: VideoConverterOptions) => {
  converterSettingStore.updateDefaultSettings(settings);
};

onMounted(() => {
  limit.value = pLimit(navigator.hardwareConcurrency || 2);
});
</script>
<template>
  <div class="h-full bg-white p-6">
    <h2 class="font-bold">视频格式转换</h2>
    <template v-if="videos.length">
      <div class="flex justify-end gap-4">
        <Button size="sm" @click="uploadRef?.onClick()">
          <Icon icon="mdi:add" width="20" height="auto" />
          <span>添加视频</span>
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button variant="danger" size="sm">清除</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认要清除所有视频？</DialogTitle>
              <DialogDescription>
                仅会清除列表，已转换的文件仍然在输出目录内。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter class="space-x-2">
              <DialogClose as-child>
                <Button variant="outline" size="sm">取消</Button>
              </DialogClose>
              <DialogClose as-child>
                <Button
                  variant="danger"
                  @click="videos.splice(0, videos.length)"
                  size="sm"
                >
                  确认
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div class="h-4"></div>
      <div
        class="overflow-scroll border"
        style="height: calc(100vh - 174px)"
        ref="tableRef"
      >
        <div class="rounded">
          <Table class="table-fixed">
            <TableHeader class="sticky top-0 bg-secondary z-10">
              <TableRow>
                <TableHead class="w-[25%] border-top">文件名</TableHead>
                <TableHead class="w-[10%]">时长</TableHead>
                <TableHead class="w-[10%]">件大小</TableHead>
                <TableHead class="w-[30%]">处理进度</TableHead>
                <TableHead class="w-[15%]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="video in videos" :key="video.id">
                <TableCell class="truncate">{{ video.file.name }}</TableCell>
                <TableCell>
                  {{
                    video.duration
                      ? dayjs
                          .duration(video.duration, "seconds")
                          .format("HH:mm:ss")
                      : "--:--:--"
                  }}
                </TableCell>
                <TableCell>
                  {{ filesize(video.file.size) }}
                </TableCell>
                <TableCell>
                  <Progress
                    label
                    class="h-2.5"
                    :variant="video.variant"
                    :model-value="video.percent"
                  />
                </TableCell>
                <TableCell class="flex gap-4">
                  <Button
                    :disabled="video.percent !== 100"
                    size="xs"
                    @click="() => openFile(video.response)"
                    >打开文件</Button
                  >
                  <Button
                    @click="() => onRemove(video.id)"
                    :disabled="video.percent !== 100"
                    size="xs"
                    variant="destructive"
                  >
                    移除
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </template>
    <Upload
      :accept="accept"
      multiple
      ref="uploadRef"
      @change="onSelectFiles"
      title="视频格式转换"
      label="选择视频"
      subtitle="拖入、粘贴或点击下方按钮添加视频"
      :hidden="videos.length"
    >
      <div class="flex gap-4 justify-center items-center p-2 mt-4">
        <div class="flex items-center gap-2">
          <Label for="area" class="shrink-0">目标格式：</Label>
          <Select
            :model-value="targetVideoFormat"
            @update:model-value="(value) => (targetVideoFormat = value as VideoFormat)"
          >
            <SelectTrigger class="py-2 min-w-20 h-9" id="area">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                :key="option"
                :value="option"
                v-for="option in videoFormats"
              >
                {{ option.toUpperCase() }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <OurDirSetting
        :output-dir="outputDir"
        @change="(dir) => (outputDir = dir)"
      />
    </Upload>
    <VideoOptionsDialog @change="onSettingChange" />
  </div>
</template>
