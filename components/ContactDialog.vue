<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// @ts-ignore
import qqGroupQRCode from "~/assets/img/qq-group-qrcode.jpg";

const onJoinQQGroup = () => {
  window.open("https://qm.qq.com/q/1dGoup6rwU", "__blank");
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">客服</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>加入群聊</DialogTitle>
        <DialogDescription>
          请使用QQ扫描二维码加入群聊联系客服
        </DialogDescription>
        <div
          class="w-full flex justify-center mt-6 cursor-pointer"
          @click="onJoinQQGroup"
        >
          <img :src="qqGroupQRCode" class="w-[70%]" />
        </div>
      </DialogHeader>

      <DialogFooter>
        <DialogClose>
          <Button type="button" size="sm"> 确认 </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
