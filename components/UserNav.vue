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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const supabase = useSupabaseClient();

const { data: user } = useAsyncData("user", () => supabase.auth.getUser(), {
  transform: (data) => data.data.user,
});
</script>

<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative rounded-full px-0 gap-2 flex-col">
        <Avatar class="h-8 w-8">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>{{ user.email?.slice(0, 1) }}</AvatarFallback>
        </Avatar>
      </Button>
      <p class="text-xs">{{ user.email }}</p>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="start">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ user.user_metadata.name ?? user.id }}
          </p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ user.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          个人中心
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          账单
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          设置
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>New Team</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        退出
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <NuxtLink as="button" href="/login" v-else>登录</NuxtLink>
</template>
