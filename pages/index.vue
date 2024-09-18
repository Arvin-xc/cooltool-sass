<template>
  <div class="p-6">
    <div class="grid grid-cols-2 gap-8">
      <Card v-for="item in topTools">
        <CardHeader>
          <h2 class="font-bold text-lg">{{ item.label }}</h2>
        </CardHeader>
        <CardContent class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <NuxtLink :to="tool.path" v-for="tool in item.tools">
            <Card class="hover:border-primary active:bg-secondary">
              <CardHeader>
                <h4 class="font-bold text-sm">{{ tool.name }}</h4>
              </CardHeader>
              <CardContent> </CardContent>
            </Card>
          </NuxtLink>
        </CardContent>
      </Card>
    </div>

    <Card class="mt-6">
      <CardHeader>
        <h2 class="font-bold text-lg">全部工具：</h2>
      </CardHeader>
      <CardContent
        class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1"
      >
        <NuxtLink v-for="tool in tools" :to="tool.path">
          <Card class="hover:border-primary active:bg-secondary">
            <CardHeader>
              <h4 class="font-bold text-sm">{{ tool.name }}</h4>
            </CardHeader>
            <CardContent>
              {{ tool.description }}
            </CardContent>
          </Card>
        </NuxtLink>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "酷兔工具(CoolTool) - 永久免费的办公小助手",
  titleTemplate: "",
  description:
    "酷兔工具(CoolTool)是一款整合多种小工具的办公小助手，目标是为职场人提供一站式的多媒体文件处理平台！我们致力于为大家提供免费便捷的在线工具，以提升工作和生活中的数据处理效率和速度，从而提高整体工作效率。",
  keywords: "酷兔工具,CoolTool,办公小助手,免费办公助手,免费工具箱",
});
const hotToolKeys = [
  "/video/recorder",
  "/video/converter",
  "/video/compressor",
  "/image/compressor",
];
const tools = useNestedRouteTree()
  .value.find((item: RouteNode) => item.path === "/tools")
  ?.children.map((item) => item.children || [])
  .flat(2);
const topTools = [
  {
    label: "最新工具",
    tools: tools?.slice(0, 4) || [],
  },
  {
    label: "最热工具",
    tools: tools?.filter((tool) =>
      hotToolKeys.includes(tool.path.replace("/tools", ""))
    ),
  },
];
</script>
