import { defineStore } from "pinia";

export const useVIPStore = defineStore("vipStore", {
  state: () => {
    return {
      vip: false,
      endDate: "",
    };
  },

  actions: {
    updateVIP({ endDate, vip }: { endDate?: string; vip: boolean }) {
      this.vip = !!vip;
      if (endDate) {
        this.endDate = new Date(endDate).toLocaleDateString();
      }
    },
  },
});
