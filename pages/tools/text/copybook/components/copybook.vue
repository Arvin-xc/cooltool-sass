<script setup lang="ts">
import cnchar from "cnchar";
import "cnchar-draw";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import { useToast } from "~/components/ui/toast";

export type PrintType = "normal" | "stroke";
const emits = defineEmits(["change"]);
const { toast } = useToast();
const { text, printType } = defineProps<{
  text: string;
  printType: PrintType;
}>();
const containerRef = ref<HTMLDivElement | null>(null);
const loading = ref<boolean>(false);

const character = ref<string>(text);
const lastCharacter = ref<string>(text);
const inputCharacter = ref<string>("");
const drawCopyBook = (text: string) => {
  loading.value = true;
  console.log(cnchar.draw.TYPE.STROKE);
  console.log("printType", printType);
  cnchar.draw(printType === "stroke" ? text : text.repeat(10), {
    el: containerRef.value!,
    clear: true,
    line: {
      lineCross: false,
    },
    // @ts-ignore
    type: printType,
    onComplete() {
      loading.value = false;
    },
  });
};
const onFocus = () => {
  lastCharacter.value = character.value;
  character.value = "";
};
const onBlur = () => {
  if (inputCharacter.value) {
    character.value = inputCharacter.value;
  } else {
    character.value = lastCharacter.value;
  }
};
const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const firstCharacter = target.value[0];
  if (cnchar.isCnChar(firstCharacter)) {
    inputCharacter.value = firstCharacter;
    drawCopyBook(firstCharacter);
  } else {
    toast({
      title: "请输入中文字符",
    });
  }
};
onMounted(() => {
  drawCopyBook(text);
});
</script>
<template>
  <div class="flex item-center gap-4 relative">
    <Input
      class="w-[60px] h-[60px] text-4xl text-center p-1"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      :model-value="character"
    />
    <div ref="containerRef" class="cnc-draw-container"></div>
    <Skeleton :hidden="!loading" class="absolute h-[60px] w-[677px] z-10" />
  </div>
</template>

<style lang="css">
.cnc-draw-container,
.cnc-draw-container div {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
}
</style>
