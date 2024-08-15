<template>
  <Dialog v-model:open="pricingDialogStore.open">
    <DialogContent class="max-w-4xl">
      <DialogHeader>
        <DialogTitle class="text-center">开通会员</DialogTitle>
        <DialogDescription>
          <div class="flex gap-6 justify-between">
            <Card
              v-for="item in pricing"
              :class="`w-[180px] shrink-0 border rounded-lg ${
                item.id === selectedPricing?.id ? 'border-primary' : ''
              }`"
              @click="selectedPricing = item"
            >
              <CardHeader>
                <CardTitle>￥{{ item.price / 100 }}</CardTitle>
                <CardDescription>{{ item.title }}</CardDescription>
              </CardHeader>
              <CardContent> {{ item.subtitle }} </CardContent>
            </Card>
          </div>
          <Card class="mt-6 overflow-hidden">
            <CardContent class="relative p-0 flex gap-4">
              <div
                class="relative w-[180px] h-[180px] border border-red flex justify-center items-center m-4"
              >
                <div
                  v-if="createOrderStatus === 'pending'"
                  class="absolute left-0 top-0 bottom-0 right-0 bg-white/80 z-1 flex justify-center items-center"
                >
                  <div class="flex space-x-2">
                    <div class="w-4 h-4 bg-blue-500 rounded-full dot"></div>
                    <div class="w-4 h-4 bg-blue-500 rounded-full dot"></div>
                    <div class="w-4 h-4 bg-blue-500 rounded-full dot"></div>
                  </div>
                </div>
                <canvas id="canvas" class=""></canvas>
              </div>
              <div class="flex flex-col justify-between p-6">
                <div class="text-base font-bold">
                  <span>微信扫码 支付￥</span>
                  <span class="text-[#ff0000]">
                    {{ (orders?.[0].amount || 0) / 100 }}
                  </span>
                </div>
                <div class="flex flex-col gap-2">
                  <div>开通邮箱：{{ user.email }}</div>
                  <div class="flex items-center gap-1">
                    <Checkbox></Checkbox>
                    <span>开通前需阅读并同意《工具权益卡协议》</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import QRCode from "qrcode";
import CryptoJS from "crypto-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tryOnScopeDispose, useIntervalFn } from "@vueuse/core";
import { useToast } from "./ui/toast";
import { useVIPStore } from "~/stores/user";
import { usePricingDialogStore } from "~/stores/pricing-dialog";

const pricingDialogStore = usePricingDialogStore();
const vipStore = useVIPStore();
const toast = useToast();
const { data: pricing } = useFetch("/api/pricing");

type Pricing = typeof pricing.value;
type PricingItem = Pricing extends null ? null : NonNullable<Pricing>[number];

const selectedPricing = ref<PricingItem | null>();
const user = useSupabaseUser();
const isSuccessful = ref(false);

const { data: orders, status: createOrderStatus } = useFetch("/api/order", {
  method: "post",
  body: selectedPricing,
  immediate: false,
  onRequest() {
    stopPolling();
  },
  onResponse(res) {
    if (res.response.status === 200) {
      checkOrderStatus();
    }
  },
  watch: [selectedPricing],
});

watch(pricingDialogStore, () => {
  if (!pricingDialogStore.open) {
    stopPolling();
    return;
  }
});

watch(pricing, () => {
  if (pricing.value) {
    selectedPricing.value = pricing.value[0];
  }
});

const {
  execute,
  data,
  error,
  status: queryOrderStatus,
} = useFetch("/api/order/", {
  method: "get",
  onRequest(context) {
    context.options.params = {
      id: orders.value?.[0].id,
    };
  },
  watch: [orders],
  immediate: false, // 不立即执行，在轮询中手动触发
});

const checkStatus = () => {
  execute()
    .then(() => {
      const status = data.value?.[0].status;
      if (status === "PAID") {
        pricingDialogStore.updateOpenState(false);
        isSuccessful.value = true;
        vipStore.updateVIP({ vip: true });
        stopPolling(); // 成功后停止轮询
      } else if (status === "CANCELED") {
        toast.toast({
          title: "订单超时",
        });
        isSuccessful.value = true;
        stopPolling(); // 成功后停止轮询
      }
    })
    .catch((err) => {
      console.error("请求出错:", err || error.value);
    });
};

const {
  pause,
  isActive,
  resume: checkOrderStatus,
} = useIntervalFn(
  () => {
    if (!isSuccessful.value && queryOrderStatus.value !== "pending") {
      checkStatus();
    }
  },
  2000,
  {
    immediate: false,
  }
); // 每5秒查询一次

const stopPolling = () => {
  if (isActive.value) {
    pause();
  }
};

// 组件卸载时停止轮询
tryOnScopeDispose(() => {
  stopPolling();
});

watch(orders, () => {
  const order = orders.value?.[0];

  if (!order) return;

  nextTick(() => {
    const canvas = document.getElementById("canvas");
    const encryptedStr = [order.id, user.value.id, order.subscriptionType].join(
      "_"
    );
    const encryptedToken = CryptoJS.AES.encrypt(
      encryptedStr,
      CryptoJS.enc.Hex.parse(
        "ab7502a91c0da76b7b0e3594b437ee1c2afde5444478490712781b60426d950d"
      ),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();
    const paymentUrl = `https://www.wentubang.com/payment-url?token=${encodeURIComponent(
      encryptedToken
    )}`;

    QRCode.toCanvas(
      canvas,
      paymentUrl,
      {
        width: 170,
      },
      function (error) {
        if (error) {
          console.error("支付二维码生成失败！", error);
        }
      }
    );
  });
});
</script>
<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-15px);
    opacity: 0.5;
  }
}
.dot {
  animation: bounce 1.5s infinite;
}
.dot:nth-child(2) {
  animation-delay: 0.3s;
}
.dot:nth-child(3) {
  animation-delay: 0.6s;
}
</style>
