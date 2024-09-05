<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/toast";

const supabaeClient = useSupabaseClient();
const isLoading = ref(false);

const { toast } = useToast();
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}
const token = ref<string>();
const email = ref<string>();
const onLogin = async () => {
  if (email.value && token.value) {
    const res = await supabaeClient.auth.verifyOtp({
      email: email.value,
      token: token.value,
      type: "email",
    });
    if (res.error) {
      toast({
        title: res.error.message,
      });
    } else {
      toast({
        title: "登录成功",
      });
      navigateTo("/");
    }
    // res.error?.message
  } else {
    toast({
      title: !email.value ? "请输入邮箱！" : "请输入验证码！",
    });
  }
};
const onSendEmail = async () => {
  if (email.value) {
    supabaeClient.auth;
    await supabaeClient.auth
      .signInWithOtp({
        email: email.value,
      })
      .finally(() => {
        isLoading.value = false;
      });
    toast({
      title: "邮件发送成功，请前往邮箱查收登录链接！",
    });
  }
};
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid grid-cols-4 gap-2">
          <div class="grid col-span-3 gap-2">
            <Label class="sr-only" for="email"> 邮箱 </Label>
            <Input
              id="email"
              placeholder="请输入邮箱"
              type="email"
              auto-capitalize="none"
              auto-complete="email"
              auto-correct="off"
              required
              :disabled="isLoading"
              v-model="email"
            />
          </div>
          <Button :disabled="isLoading" @click="onSendEmail"> 发送邮件 </Button>
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
            v-model="token"
          />
        </div>
        <Button :disabled="isLoading" @click="onLogin"> 登录/注册 </Button>
      </div>
    </form>
    <!-- <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
      <GitHubLogo v-else class="mr-2 h-4 w-4" />
      {{ isLoading }}
      GitHub
    </Button> -->
  </div>
</template>
