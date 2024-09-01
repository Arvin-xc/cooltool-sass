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
const email = ref<string>();
const onSendEmail = async () => {
  if (email.value) {
    await supabaeClient.auth
      .signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: location.origin,
        },
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
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            placeholder="请输入邮箱"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
            v-model="email"
          />
        </div>
        <Button :disabled="isLoading" @click="onSendEmail"> 发送邮件 </Button>
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
