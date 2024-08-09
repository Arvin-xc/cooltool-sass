<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent class="max-w-4xl">
      <DialogHeader>
        <DialogTitle class="text-center">开通会员</DialogTitle>
        <DialogDescription>
          <div class="flex gap-6 justify-between">
            <Card v-for="item in pricing?.data" class="w-[180px] shrink-0">
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
                  v-if="creatingOrder"
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
const open = ref<boolean>(false);
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const { data: pricing } = useFetch("/api/pricing");
const selectedPricing = ref(pricing.value?.data?.[0]);
const user = useSupabaseUser();
const {
  data: orders,
  execute: createOrder,
  pending: creatingOrder,
} = useFetch("/api/order", {
  method: "POST",
  body: {
    subscriptionType: selectedPricing.value?.type,
  },
  immediate: false,
  watch: [selectedPricing],
});

watch(open, () => {
  if (!open.value) return;

  if (!selectedPricing.value) {
    console.error("不存在selectedPricing", selectedPricing.value);
    return;
  }
  createOrder();
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
