<script setup lang="ts">
import UserAuthForm from "@/components/UserAuthForm.vue";
import { Icon } from "@iconify/vue";
definePageMeta({
  layout: "blank",
});
const onBack = () => {
  window.history.back();
};
</script>

<template>
  <div
    class="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
    >
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="flex items-center gap-2 relative z-20">
        <Button @click="onBack" class="w-14" size="sm" variant="ghost">
          <Icon icon="mdi:arrow-back" height="auto" />
        </Button>
        <div class="flex items-center text-lg font-medium">
          <div class="p-1 bg-white rounded-full w-8 h-8 mr-2">
            <img src="/logo.svg" class="" />
          </div>
          <div>酷兔工具</div>
        </div>
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">方便安全的工具箱</p>
          <footer class="text-sm">酷兔(CoolTool)</footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            登录/创建酷兔账号
          </h1>
          <p class="text-sm text-muted-foreground">
            第一次登录将自动创建酷兔账号
          </p>
        </div>
        <UserAuthForm />
        <p class="text-center text-sm text-muted-foreground">
          创建账号即视为您已阅读并同意
          <a href="/" class="underline underline-offset-4 hover:text-primary">
            服务协议
          </a>
          和
          <a href="/" class="underline underline-offset-4 hover:text-primary">
            隐私政策
          </a>
          .
        </p>
      </div>
    </div>
  </div>
</template>
