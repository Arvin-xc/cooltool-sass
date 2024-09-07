<script setup lang="ts">
import { useToast } from "~/components/ui/toast";
import { Icon } from "@iconify/vue";
definePageMeta({
  layout: "blank",
});
const { toast } = useToast();
const router = useRouter();

const onDownload = (link: string) => {
  if (!link) {
    toast({
      title: "开发中，敬请期待",
    });
  } else {
    window.open(link, "_blank");
  }
};
const apps = [
  {
    title: "Mac",
    icon: "mdi:apple",
    class: "text-[#000000]",
    buttons: [
      {
        label: "免费下载(ARM)",
        link: "",
      },
      {
        label: "免费下载(x64)",
        link: "",
      },
    ],
  },
  {
    title: "Windows",
    icon: "mdi:windows",
    class: "text-[#05a8e8]",
    buttons: [
      {
        label: "免费下载(x64)",
        link: "",
      },
    ],
  },
  {
    title: "Linux",
    icon: "uil:linux",
    class: "text-[#000000]",
    buttons: [
      {
        label: "免费下载",
        link: "",
      },
    ],
  },
];
</script>

<template>
  <div class="w-full bg-background h-full">
    <section class="container mx-auto py-12 md:py-20 lg:py-28">
      <div class="mx-4 md:mx-6 space-y-6 text-center">
        <h1 class="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          下载中心
        </h1>
        <p
          class="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed py-8"
        >
          集多种工具与一身的全能型工具箱，助力您创作或学习，包含视频、音频、图片、文档、图表生成、办公辅助等等。适用于macOS、Windows
          和 Linux。
        </p>
      </div>
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="app in apps">
          <CardHeader>
            <CardTitle>{{ app.title }}</CardTitle>
          </CardHeader>
          <CardContent class="flex justify-center">
            <Icon
              :icon="app.icon"
              :class="app.class"
              width="120"
              height="120"
            />
          </CardContent>
          <CardFooter class="flex justify-around px-4 mt-6">
            <Button
              v-for="button in app.buttons"
              @click="onDownload(button.link)"
            >
              {{ button.label }}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  </div>
</template>
