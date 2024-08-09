<script setup lang="ts">
import { Package2 } from "lucide-vue-next";
import Toaster from "@/components/ui/toast/Toaster.vue";
import Nav from "~/components/Nav.vue";
const routes = useNestedRouteTree();
console.log(routes)
</script>

<template>
  <div class="flex min-h-screen w-full bg-muted/40">
    <aside
      class="inset-y-0 left-0 z-10 w-16 lg:w-40 flex-col border-r bg-background flex"
    >
      <nav class="flex flex-col items-center gap-2 px-2 py-5">
        <NuxtLink to="/">
          <div class="flex items-center gap-2">
            <div
              class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground lg:h-8 lg:w-8 md:text-base"
            >
              <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
            </div>
            <span class="hidden font-bold lg:block">CoolTool</span>
          </div>
        </NuxtLink>
        <div class="text-xs">安全便捷的工具箱</div>
      </nav>
      <Nav
        :links="tool.children"
        :key="tool.name"
        v-for="tool in routes.find((item) => item.path === '/tools')?.children"
        :is-collapsed="false"
        :title="tool.name"
      />
      <nav class="mt-auto flex flex-col items-center gap-1 px-4 sm:py-5">
        <UserNav />
      </nav>
    </aside>
    <div class="flex flex-col flex-1">
      <Header />
      <main class="grid flex-1 items-start gap-4 p-6">
        <slot />
      </main>
    </div>
  </div>
  <Toaster />
</template>
