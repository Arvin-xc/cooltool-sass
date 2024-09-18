<script setup lang="ts">
import Nav from "~/components/Nav.vue";
const routes = useNestedRouteTree();
</script>

<template>
  <div class="flex min-h-screen w-full bg-muted/40">
    <aside
      class="inset-y-0 left-0 w-16 lg:w-40 flex-col border-r bg-background flex"
    >
      <NuxtLink to="/">
        <nav class="flex flex-col items-center px-2 py-5 border-b">
          <div class="flex items-center gap-1">
            <div
              class="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground"
            >
              <img src="/logo_border.svg" class="w-full h-full" />
            </div>
            <span class="hidden font-bold lg:block">酷兔工具</span>
          </div>
          <div class="text-xs">永久免费的办公小助手</div>
        </nav>
      </NuxtLink>
      <Nav
        :links="tool.children"
        :key="tool.name"
        v-for="tool in routes.find((item: RouteNode) => item.path === '/tools')?.children"
        :is-collapsed="false"
        :title="tool.name"
      />
      <nav class="mt-auto flex flex-col items-center gap-1 px-4 sm:py-5">
        <UserNav />
      </nav>
    </aside>
    <div class="flex flex-col flex-1">
      <Header />
      <ElectronWrapper>
        <main class="grid flex-1 items-start gap-4 p-6 h-full">
          <div class="h-full rounded border rounded overflow-hidden">
            <slot />
          </div>
        </main>
      </ElectronWrapper>
    </div>
  </div>
</template>
