<script setup lang="ts">
import { ConfigProvider } from "radix-vue";
import { useVIPStore } from "~/stores/user";
import Toaster from "@/components/ui/toast/Toaster.vue";

useSeoMeta({
  titleTemplate: "%s - 酷兔工具(CoolTool)",
});
const { data: subscription } = useFetch("/api/subscription");
const useIdFunction = () => useId();
const vipStore = useVIPStore();
const pricingDialogStore = usePricingDialogStore();

vipStore.updateVIP({
  endDate: subscription.value?.endDate,
  vip: !!subscription.value,
});
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
    <PricingDialog v-if="pricingDialogStore.open" />
  </ConfigProvider>
</template>
