import { defineStore } from "pinia";

export const usePricingDialogStore = defineStore("pricingDialogStore", {
  state: () => {
    return {
      open: false,
    };
  },

  actions: {
    updateOpenState(open: boolean) {
      this.open = open;
    },
  },
});
