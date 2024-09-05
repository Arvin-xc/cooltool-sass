<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/toast";

const supabaeClient = useSupabaseClient();
const isLoading = ref<boolean>(false);
const isSendingEmail = ref<boolean>(false);

const { toast } = useToast();

const emailInputRef = ref<HTMLFormElement | null>(null);
const onSubmit = async () => {
  const emailInput = document.querySelector("#email") as HTMLInputElement;
  const tokenInput = document.querySelector("#token") as HTMLInputElement;
  if (emailInput.checkValidity() && tokenInput.checkValidity()) {
    isLoading.value = true;

    const res = await supabaeClient.auth.verifyOtp({
      email: emailInput.value,
      token: tokenInput.value,
      type: "email",
    });
    if (res.error) {
      toast({
        title: res.error.message,
      });
    } else {
      toast({
        title: "登录成功",
        duration: 2000,
      });
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    }
    isLoading.value = false;
  }
};
const onSendEmail = async () => {
  const emailInput = document.querySelector("#email") as HTMLInputElement;
  if (emailInput?.checkValidity()) {
    isSendingEmail.value = true;
    const { error } = await supabaeClient.auth.signInWithOtp({
      email: emailInput.value,
    });

    if (error) {
      toast({
        title: error.message,
      });
    } else {
      toast({
        title: "邮件发送成功，请前往邮箱查收登录链接！",
      });
    }

    isSendingEmail.value = false;
  }
};
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit" ref="formRef">
      <div class="grid gap-2">
        <div class="grid grid-cols-4 gap-2">
          <div class="grid col-span-3 gap-2">
            <Label class="sr-only" for="email"> 邮箱 </Label>
            <Input
              ref="emailInputRef"
              id="email"
              placeholder="请输入邮箱"
              type="email"
              auto-capitalize="none"
              auto-complete="email"
              auto-correct="off"
              required
              :disabled="isLoading"
            />
          </div>
          <Button :disabled="isSendingEmail" @click="onSendEmail">
            发送邮件
          </Button>
        </div>
        <div class="grid gap-2">
          <Label class="sr-only" for="email"> 验证码 </Label>
          <Input
            id="token"
            placeholder="请输入验证码"
            type="text"
            auto-capitalize="none"
            auto-complete="token"
            auto-correct="off"
            required
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading" @click="onSubmit"> 登录/注册 </Button>
      </div>
    </form>
  </div>
</template>
