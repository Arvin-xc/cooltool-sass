<template>
  <div id="editor" />
</template>

<script setup lang="ts">
import { useScriptTag, useUrlSearchParams } from "@vueuse/core";
import { zh } from "../i18n";

const { imagePath } = defineProps({ imagePath: String });
const searchParams = useUrlSearchParams("history");
const defaultTool = searchParams.type || "filter";

onMounted(() => {
  window.onbeforeunload = function (event) {
    event.preventDefault();
    event.returnValue = "";
    return "你有未保存的更改，确定要离开此页面吗？";
  };
});

onUnmounted(() => {
  window.onbeforeunload = null;
  window.onpopstate = null;
});

const emit = defineEmits<{ close: any }>();
useScriptTag(
  "https://unpkg.com/react@16.13.1/umd/react.production.min.js",
  () => {},
  { async: false }
);
useScriptTag(
  "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js",
  () => {},
  { async: false }
);
useScriptTag(
  "https://unpkg.com/react-dom@16.13.1/umd/react-dom-server.browser.production.min.js",
  () => {},
  { async: false }
);
useScriptTag(
  "https://unpkg.com/styled-components@4.4.1/dist/styled-components.min.js",
  () => {},
  { async: false }
);
useScriptTag(
  "/assets/libs/photoeditorsdk.js",
  async () => {
    const languages = { zh };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const editor = await window.PhotoEditorSDK.PhotoEditorSDKUI.init({
      container: "#editor",
      license: "{}",
      defaultTool,
      displayCloseWarning: true,
      displayDiscardChangesWarning: true,
      image: imagePath,
      assetBaseUrl: "/assets-imgly",
      language: "zh",
      custom: {
        languages,
      },
    });
    editor.on("close", () => {
      emit("close");
    });
  },
  { async: false }
);
</script>

<style>
#editor {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vw;
  z-index: 10;
  background-color: aliceblue;
}
#editor &::before {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 24px;
  transform: translate(-50%, -50%);
  content: "loading...";
}
</style>
