<script setup lang="ts">
import cnchar from "cnchar";
import Copybook from "./components/copybook.vue";
import { Icon } from "@iconify/vue";
import Draggable from "vuedraggable";
import { v4 as uuid } from "uuid";

definePageMeta({
  name: "字帖生成",
});

const showPrintButton = ref<boolean>(false);
const printing = ref<boolean>(false);
const characters = ref<{ id: string; text: string }[]>([]);
const drag = ref<boolean>(false);
const input = ref<string>("");
const addon = ref<string>("");

const renderCharacters = (text: string) => {
  characters.value.push(
    ...text
      .split("")
      .filter((character) => cnchar.isCnChar(character))
      .map((value) => ({
        id: uuid(),
        text: value,
      }))
  );
};
const onAddCharacters = () => {
  renderCharacters(addon.value);
  addon.value = "";
};
const onPrint = () => {
  showPrintButton.value = false;
  printing.value = true;
  nextTick(() => {
    window.print();
  });
};
onMounted(() => {
  window.addEventListener("afterprint", () => {
    showPrintButton.value = true;
  });
});
const showCopyBook = computed(() => characters.value.length >= 1);
</script>
<template>
  <div class="p-6 h-full font-bold bg-white">
    <h2 class="font-bold">{{ $route.name }}</h2>
    <div v-if="showCopyBook" class="mt-6">
      <ClientOnly>
        <div
          :class="
            printing
              ? `absolute left-0 top-0  w-[100vw] !max-h-[100vh] h-[100vh]  z-10 bg-white`
              : ''
          "
        >
          <div class="flex gap-4 fixed right-8 bottom-8" v-if="showPrintButton">
            <Button @click="onPrint">
              <Icon height="20" icon="mdi:printer"> </Icon>
              打印
            </Button>
            <Button
              variant="outline"
              @click="
                showPrintButton = false;
                printing = false;
              "
            >
              返回
            </Button>
          </div>
          <Draggable
            :class="`flex flex-col gap-2 overflow-auto p-1`"
            :style="`max-height:calc(100vh - 200px)`"
            v-model="characters"
            group="people"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element }">
              <Copybook :text="element.text" :index="element.id" />
            </template>
          </Draggable>
        </div>
      </ClientOnly>
      <div class="flex items-center gap-4 mt-4">
        <Input class="w-max" v-model="addon" />
        <Button @click="onAddCharacters" variant="outline">
          <Icon height="20" icon="mdi:add"></Icon>
          添加
        </Button>
        <Button
          variant="secondary"
          class="flex gap-1"
          @click="
            characters = [];
            input = '';
          "
        >
          <Icon height="20" icon="mdi:reload"> </Icon>
          重置
        </Button>
        <Button class="flex gap-1" @click="onPrint()">
          <Icon height="20" icon="mdi:printer"> </Icon>
          打印
        </Button>
      </div>
    </div>

    <div class="flex items-center justify-center h-full" v-else>
      <div class="flex flex-col gap-4 md:gap-2 sm:gap-2">
        <Input
          type="text"
          placeholder="请输入汉字"
          class="md:w-[100px] lg:w-[300px] w-[200px]"
          v-model="input"
        />
        <Button :disabled="!input" @click="() => renderCharacters(input)">
          生成字帖
        </Button>
      </div>
    </div>
  </div>
</template>
