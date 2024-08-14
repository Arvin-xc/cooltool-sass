import { defineStore } from "pinia";

export const useVIPStore = defineStore("user", {
  state: () => {
    return {
      vip: false,
    };
  },
  actions: {
    updateVIP(vip: boolean | null) {
      this.vip = !!vip;
    },
  },
});
