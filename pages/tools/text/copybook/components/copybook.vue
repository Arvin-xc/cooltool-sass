<script setup lang="ts">
import cnchar from "cnchar";
import "cnchar-draw";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import { useToast } from "~/components/ui/toast";

const emits = defineEmits(["change"]);
const { toast } = useToast();
const { text } = defineProps<{ text: string }>();
const containerRef = ref<HTMLDivElement | null>(null);
const loading = ref<boolean>(false);

const character = ref<string>(text);
const lastCharacter = ref<string>(text);
const inputCharacter = ref<string>("");
const drawCopyBook = (text: string) => {
  loading.value = true;
  cnchar.draw(text, {
    el: containerRef.value!,
    clear: true,
    line: {
      lineCross: false,
    },
    type: cnchar.draw.TYPE.STROKE,
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
  <div class="flex item-center gap-4">
    <Input
      class="w-[60px] h-[60px] text-4xl text-center p-1"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      :model-value="character"
    />
    <Skeleton :hidden="!loading" class="h-[60px] w-full" />
    <div ref="containerRef" class="cnc-draw-container"></div>
  </div>
</template>

<style lang="css">
.cnc-draw-container div {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
}
</style>
