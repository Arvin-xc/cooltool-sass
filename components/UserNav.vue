<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePricingDialogStore } from "~/stores/pricing-dialog";
import { useToast } from "./ui/toast";
const supabase = useSupabaseClient();

const { data: user, refresh } = useAsyncData(
  "user",
  () => supabase.auth.getUser(),
  {
    transform: (data) => data.data.user,
  }
);
const vipStore = useVIPStore();
const { toast } = useToast();
const pricingDialogStore = usePricingDialogStore();
const supabaseClient = useSupabaseClient();
const onLogout = async () => {
  const { error } = await supabaseClient.auth.signOut({ scope: "global" });
  if (error) {
    toast({
      title: error.message,
    });
  } else {
    refresh();
    toast({
      title: "退出成功!",
    });
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <ContactDialog />

    <template v-if="user">
      <!-- <Button
        v-if="!vipStore.vip"
        @click="pricingDialogStore.updateOpenState(true)"
      >
        开通会员
      </Button> -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            class="relative rounded-full px-0 gap-2 py-6 w-full flex"
          >
            <Avatar class="h-8 w-8 relative overflow-visible">
              <div class="absolute right-[-6px] top-[-6px]" v-if="vipStore.vip">
                <IconsVIP size="18" />
              </div>
              <AvatarImage
                class="rounded-full overflow-hidden"
                :src="user.user_metadata.avatar"
              />
              <AvatarFallback>
                {{ user.user_metadata.username || user.email?.slice(0, 1) }}
              </AvatarFallback>
            </Avatar>
            <p class="text-xs">
              {{ user.user_metadata.username || user.email }}
            </p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="start">
          <DropdownMenuLabel class="font-normal flex">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">
                {{ user.user_metadata.username ?? user.id }}
              </p>
              <p class="text-xs leading-none text-muted-foreground">
                {{ user.email }}
              </p>
              <div
                class="text-xs leading-none text-muted-foreground flex items-center gap-1"
                v-if="vipStore.vip"
              >
                <!-- <p>到期时间:{{ vipStore.endDate }}</p> -->
                <!-- <IconsVIP v-if="vipStore.vip" size="18" /> -->
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <!-- <DropdownMenuItem>
              个人中心
            </DropdownMenuItem> -->
            <!-- <NuxtLink to="/orders">
              <DropdownMenuItem> 订单明细 </DropdownMenuItem>
            </NuxtLink>
            <DropdownMenuItem @click="pricingDialogStore.updateOpenState(true)">
              {{ vipStore.vip ? "续费" : "开通" }}会员
            </DropdownMenuItem> -->
            <NuxtLink to="/settings">
              <DropdownMenuItem> 个人中心 </DropdownMenuItem>
            </NuxtLink>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="onLogout"> 退出 </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>

    <NuxtLink class="flex-1" href="/login" v-else>
      <Button class="w-full"> 登录</Button>
    </NuxtLink>
  </div>
</template>
