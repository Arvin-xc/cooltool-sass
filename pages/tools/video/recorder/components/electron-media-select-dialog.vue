<script lang="ts" setup>
import { useToast } from "~/components/ui/toast";
import type { DisplaySurfaceType } from "~/lib/video/recorder.d";

const props = defineProps<{ type?: DisplaySurfaceType }>();
const { type } = toRefs(props);
const screens = ref<DesktopCapturerSource[]>([]);
const selectedScreenId = ref<string>();
const loadMediaFail = ref<boolean>(false);
const emits = defineEmits<{
  select: [id: string];
  cancel: [];
}>();
const open = ref<boolean>(false);
const { toast } = useToast();
onMounted(() => {
  if (type.value === "screen" || type.value === "window") {
    window.electronAPI
      ?.getDesktopCapture?.([type.value])
      .then((res) => {
        loadMediaFail.value = false;
        screens.value = res;
        selectedScreenId.value = res[0].id;
      })
      .catch((err) => {
        loadMediaFail.value = true;
      });
  }
});
const onSelect = async () => {
  open.value = false;

  if (loadMediaFail.value) {
    emits("cancel");
    return;
  }

  if (selectedScreenId.value) {
    const videoDeviceId = selectedScreenId.value;
    console.log("use device", selectedScreenId.value);
    window.electronAPI?.selectDisplayMedia({
      videoDeviceId: selectedScreenId.value,
      audio: true,
    });
    emits("select", videoDeviceId);
  } else {
    toast({
      title: "请选择屏幕",
    });
  }
};
const onUpdateOpen = (state: boolean) => {
  open.value = state;
  if (!state) {
    emits("cancel");
  }
};

defineExpose({
  onUpdateOpen,
});
</script>
<template>
  <Dialog :open="open" @update:open="onUpdateOpen">
    <DialogContent class="max-w-4xl">
      <DialogHeader>
        <DialogTitle class="text-center w-full sm:text-center">
          请选择屏幕
        </DialogTitle>
      </DialogHeader>
      <div
        class="flex w-full items-center gap-8 justify-around flex-wrap py-8 min-h-[300px]"
      >
        <div v-if="loadMediaFail" class="text-gray-800 font-bold text-lg">
          获取媒体失败，请检查应用是否已授权访问屏幕和多媒体
        </div>
        <template v-else>
          <div v-for="screen in screens" class="text-center space-y-2">
            <div
              :class="[screen.id === selectedScreenId ? 'text-primary' : '']"
            >
              {{ screen.name }}
            </div>
            <div
              @click="selectedScreenId = screen.id"
              :class="[
                'border  border-[4px] hover:shadow-2xl shadow-slate-200 rounded-lg overflow-hidden cursor-pointer',
                screen.id === selectedScreenId
                  ? 'border-primary'
                  : 'border-transparent',
              ]"
            >
              <img :src="screen.thumbnail" class="h-[160px]" />
            </div>
          </div>
        </template>
      </div>
      <DialogFooter class="flex flex-end gap-4">
        <DialogClose>
          <Button @click="emits('cancel')" variant="outline">取消</Button>
        </DialogClose>

        <Button @click="onSelect">确认</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
