<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";

useSeoMeta({
  title: "设置中心",
});
const { toast } = useToast();

const runtimeConfig = useRuntimeConfig();
const user = useSupabaseUser();
const supabaseClient = useSupabaseClient();
const avatarUploadRef = ref<HTMLInputElement>();

const profileFormSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, {
        message: "昵称至少需要2个字符",
      })
      .max(12, {
        message: "昵称最大12个字符",
      }),
    bio: z
      .string()
      .max(160, { message: "个人简介最长160个字符" })
      .min(4, { message: "个人简介至少需要4个字符" })
      .optional(),
  })
);
const avatar = ref<string>(user.value?.user_metadata?.avatar);

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    bio: user.value?.user_metadata?.bio,
    username: user.value?.user_metadata?.username,
  },
});

const onSubmit = handleSubmit(async (values) => {
  await supabaseClient.auth.updateUser({
    data: {
      avatar: avatar.value,
      username: values.username,
      bio: values.bio,
    },
  });
  toast({
    title: "更新信息成功",
  });
});

const onUploadAvatar = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  if (file.size / 1000 / 1000 >= 1) {
    toast({
      title: "图片太大啦，请上传1M以内的图片",
    });
    return;
  }

  const { data, error } = await supabaseClient.storage
    .from("avatar")
    .upload(`${user.value.id}/${file.name}`, file, {
      upsert: true,
    });

  if (error) {
    toast({
      title: error.message,
    });
  }
  if (data?.fullPath) {
    avatar.value = `${runtimeConfig.public.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
  }
};
</script>

<template>
  <div class="p-5">
    <div>
      <h3 class="text-lg font-medium">个人设置</h3>
    </div>
    <div class="mt-5"></div>
    <form class="space-y-8 mt" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>昵称:</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="请输入昵称"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="avatar">
        <FormItem class="flex items-center gap-4">
          <FormLabel class="h-1">头像:</FormLabel>
          <Avatar
            size="base"
            class="cursor-pointer"
            @click="avatarUploadRef?.click()"
          >
            <AvatarImage :src="avatar || ''" alt="@radix-vue" />
            <AvatarFallback>
              {{ user?.user_metadata.name?.[0] || user?.email?.[0] || "" }}
            </AvatarFallback>
          </Avatar>
          <input
            @change="onUploadAvatar"
            class="fixed left-[-100vw] top-[-100vh]"
            type="file"
            hidden
            ref="avatarUploadRef"
          />
        </FormItem>
      </FormField>

      <FormField name="email">
        <FormItem>
          <FormLabel>邮箱:</FormLabel>
          <Input :default-value="user?.email" disabled />
          <FormDescription>
            邮箱作为账号唯一认证信息，不支持在线修改。如需修改请联系客服。
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="bio">
        <FormItem>
          <FormLabel>个人简介:</FormLabel>
          <FormControl>
            <Textarea placeholder="让我们更了解你" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex gap-2 justify-start">
        <Button type="submit"> 更新信息 </Button>

        <Button type="button" variant="outline" @click="resetForm">
          重置
        </Button>
      </div>
    </form>
    <!-- <CropperDialog :dialog-open="true" :selected-file="''" /> -->
  </div>
</template>
