<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  settings,
  useConverterSettingStore,
  type ConvertOptionKey,
} from "~/stores/video/useConverterSettings";

const converterSettingStore = useConverterSettingStore();
defineEmits(["change"]);
defineProps<{
  videoId?: string;
}>();

const localSettings = ref(converterSettingStore.defaultSettings);
const onUpdated = (key: ConvertOptionKey, value: string) => {
  localSettings.value[key] = value;
};
const onConfirm = () => {
  converterSettingStore.updateDefaultSettings(localSettings.value);
  converterSettingStore.updateOpenState(false);
};
</script>

<template>
  <Dialog v-model:open="converterSettingStore.open">
    <DialogContent class="max-w-4xl">
      <DialogHeader>
        <DialogTitle class="text-center">视频参数设置</DialogTitle>
        <DialogDescription>
          <Card>
            <CardHeader>
              <CardDescription>
                默认值在绝大多数情况下都能满足需求
              </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6">
              <div class="grid grid-cols-2 gap-4">
                <div
                  class="grid gap-2"
                  v-for="setting in settings"
                  :key="setting.title"
                >
                  <Label for="area">{{ setting.title }}</Label>
                  <Select
                    :model-value="localSettings[setting.key]"
                    @update:model-value="
                      (value) => onUpdated(setting.key, value)
                    "
                  >
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        :key="option.value"
                        :value="option.value"
                        v-for="option in setting.options"
                      >
                        {{ option.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter class="justify-end space-x-2">
              <Button variant="ghost"> 取消 </Button>
              <div class="flex gap-2 items-center" v-if="videoId">
                <Button size="sm">应用到当前视频</Button>
                <Button>应用到所有视频</Button>
              </div>
              <Button v-else @click="onConfirm">确认</Button>
            </CardFooter>
          </Card>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
