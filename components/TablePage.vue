<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { Icon } from "@iconify/vue";
import { getVideoDuration, openFile } from "~/lib/utils";
import {
  useConverterSettingStore,
  type VideoConverterOptions,
} from "~/stores/video/useConverterSettings";
import pLimit from "p-limit";
import type { ProgressVariants } from "~/components/ui/progress";
import { downloadFiles } from "~/lib/file";
import { useToast } from "./ui/toast";
import type { string } from "zod";

const { accept, convertFn, percent, concurrency } = defineProps<{
  accept: string;
  disabled?: boolean;
  concurrency?: number;
  multiple?: boolean;
  percent?: number;
  label?: string;
  subtitle?: string;
  headers: { label: string; class: string; key: string }[];
  buttons?: { add: string };
  convertFn: (file: RcFile, outputDir: string) => Promise<RcFile>;
}>();
const { toast } = useToast();

const limit = ref<ReturnType<typeof pLimit>>();
const uploadRef = ref<{ onClick: () => void }>();
const tableRef = ref<HTMLTableElement | null>(null);
export type RcFile = {
  file: File;
  response?: string | File;
  duration?: number;
  error: boolean;
  percent: number;
  variant: ProgressVariants["variant"];
  timemark?: string;
  size?: number;
  id: string;
};
const tableList = ref<RcFile[]>([]);
const outputDir = ref<string>("");
const converterSettingStore = useConverterSettingStore();

const onSelectFiles = (files: File[]) => {
  tableRef.value?.scrollTo({ top: 0, behavior: "smooth" });
  const newFiles = files.map((item, index) => {
    return {
      file: item,
      id: uuid(),
      error: false,
      variant: "default" as ProgressVariants["variant"],
      percent: 0,
    };
  });

  tableList.value.unshift(...newFiles);

  tableList.value.slice(0, newFiles.length).map((newFile) => {
    if (accept.startsWith("video")) {
      getVideoDuration(newFile.file).then((duration) => {
        newFile.duration = duration;
      });
    }

    if (limit.value) {
      console.log("limit.value", limit.value);
      limit.value(() => convertFn(newFile, outputDir.value));
    } else {
      convertFn(newFile, outputDir.value);
    }
  });
};

const onRemove = (videoId: string) => {
  tableList.value = tableList.value.filter((video) => video.id !== videoId);
};

const onSettingChange = (settings: VideoConverterOptions) => {
  converterSettingStore.updateDefaultSettings(settings);
};

onMounted(() => {
  limit.value = pLimit(concurrency || navigator.hardwareConcurrency || 2);
});
const onSaveAll = async () => {
  const files = tableList.value
    .map((item) => item.response)
    .filter((item) => item instanceof File);

  if (!files.length) {
    toast({
      title: "暂无可保存文件!",
    });
    return;
  }
  await downloadFiles(files);
};
</script>
<template>
  <div class="h-full bg-white p-6">
    <h2 class="font-bold text-lg flex items-center gap-2">
      {{ $route.name?.toString() }}
      <Badge variant="tertiary" v-if="$route.meta.freeForever">永久免费</Badge>
    </h2>
    <template v-if="tableList.length">
      <div class="flex items-center justify-between mt-4">
        <div class="flex justify-end gap-4">
          <Button size="sm" @click="uploadRef?.onClick()" variant="outline">
            <Icon icon="mdi:add" width="20" height="auto" />
            <span>{{ buttons?.add || "添加文件" }}</span>
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button variant="danger" size="sm">清除</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>确认要清除所有文件？</DialogTitle>
                <DialogDescription>
                  {{
                    $route.meta.electron
                      ? "仅会清除列表，已转换的文件仍然在输出目录内。"
                      : "清除后无法找回文件，确认要清除全部文件吗？"
                  }}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="space-x-2">
                <DialogClose as-child>
                  <Button variant="outline" size="sm">取消</Button>
                </DialogClose>
                <DialogClose as-child>
                  <Button
                    variant="danger"
                    @click="tableList.splice(0, tableList.length)"
                    size="sm"
                  >
                    确认
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Button v-if="$route.meta.electron" @click="openFile(outputDir)">
          打开目录
        </Button>
        <Button v-else @click="onSaveAll">保存全部</Button>
      </div>
      <div class="h-4"></div>
      <div
        class="overflow-scroll border"
        style="height: calc(100vh - 194px)"
        ref="tableRef"
      >
        <div class="rounded">
          <Table class="table-fixed">
            <TableHeader class="sticky top-0 bg-secondary z-10">
              <TableRow>
                <TableHead v-for="header in headers" :class="header.class">
                  {{ header.label }}</TableHead
                >
                <TableHead class="w-[15%]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(file, index) in tableList" :key="file.id">
                <TableCell v-for="item in headers">
                  <slot :name="item.key" :data="file" />
                </TableCell>
                <TableCell>
                  <div class="flex gap-4 items-center">
                    <Button
                      :disabled="file.percent !== 100"
                      size="xs"
                      @click="() => openFile(file.response)"
                    >
                      {{ $route.meta.electron ? "打开文件" : "保存文件" }}
                    </Button>
                    <Button
                      @click="() => onRemove(file.id)"
                      :disabled="file.percent !== 100"
                      size="xs"
                      variant="destructive"
                    >
                      移除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </template>
    <Upload
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :percent="percent"
      ref="uploadRef"
      @change="onSelectFiles"
      :label="label || '选择文件'"
      :subtitle="subtitle || '拖入、粘贴或点击下方按钮添加文件'"
      :hidden="tableList.length"
    >
      <slot />
      <OurDirSetting
        v-if="$route.meta.electron"
        :output-dir="outputDir"
        @change="(dir:string) => (outputDir = dir)"
      />
    </Upload>
    <VideoOptionsDialog @change="onSettingChange" />
  </div>
</template>
