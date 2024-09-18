<script setup lang="ts">
import { useUrlSearchParams } from "@vueuse/core";

definePageMeta({
  name: "图片编辑器",
});
useSeoMeta({
  title: "图片编辑器",
  description: "免费且强大的图片编辑器，包含滤镜、遮罩、尺寸修改等多种功能。",
});

const PhotoEditor = defineAsyncComponent(
  () => import("./components/PhotoEditor.vue")
);

const router = useRouter();

const uploadRef = ref();
const myLicense = '{"owner":"Imgly Inc.","version":"2.4", ...}';
const searchParams = useUrlSearchParams("history");
const imageUrl = useState("imageUrl", () => searchParams.url as string);
const filename = useState("filename", () => searchParams.filename);
const onUploadFiles = (files: File[]) => {
  const file = files[0];
  const url = URL.createObjectURL(files[0]);
  filename.value = file.name;
  imageUrl.value = url;
};
onMounted(() => {
  if (searchParams.type && !imageUrl.value) {
    uploadRef.value.inputRef.input.click();
  }
});
const onclose = () => {
  imageUrl.value = "";
  filename.value = "";
};
const onBrowserFiles = () => {
  uploadRef.value.inputRef.click();
};
const demos = [
  "/assets/cars-stunning-quality.jpg",
  "/assets/products-stunning-quality-v2.jpg",
  "/assets/animals-outstanding-quality-v2.jpg",
];
</script>
<template>
  <PhotoEditor
    v-if="imageUrl"
    id="editor"
    layout="advanced"
    :license="myLicense"
    assets-path="assets-imgly"
    :image-path="imageUrl"
    @close="onclose"
  />
  <Upload
    label="选择图片"
    v-else
    @change="onUploadFiles"
    subtitle="功能丰富的在线图片编辑器。完全免费，即用即走，方便快捷！"
  ></Upload>
</template>

<style scoped>
#editor {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
</style>
