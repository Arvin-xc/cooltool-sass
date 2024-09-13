import { defineStore } from "pinia";

type Runtime = "electron" | "web";
export const useGlobalStore = defineStore("globalStore", {
  state: (): {
    runtime: Runtime | "";
  } => {
    return {
      runtime: "",
    };
  },

  actions: {
    updateRuntime(runtime: Runtime) {
      this.runtime = runtime;
    },
  },
});
