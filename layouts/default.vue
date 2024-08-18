<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import Nav from "~/components/Nav.vue";
import { useVIPStore } from "~/stores/user";
const routes = useNestedRouteTree();
const vipStore = useVIPStore();

const { data: subscription } = useFetch("/api/subscription");
const pricingDialogStore = usePricingDialogStore();

vipStore.updateVIP({
  endDate: subscription.value?.endDate,
  vip: !!subscription.value,
});
</script>

<template>
  <div class="flex min-h-screen w-full bg-muted/40">
    <aside
      class="inset-y-0 left-0 z-10 w-16 lg:w-40 flex-col border-r bg-background flex"
    >
      <nav class="flex flex-col items-center px-2 py-5 border-b">
        <NuxtLink to="/">
          <div class="flex items-center gap-1">
            <div
              class="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground"
            >
              <img src="/logo_border.svg" class="w-full h-full" />
            </div>
            <span class="hidden font-bold lg:block">酷兔工具</span>
          </div>
        </NuxtLink>
        <div class="text-xs">认真生活、快乐工作</div>
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
        <div class="h-full rounded border rounded overflow-hidden">
          <slot />
        </div>
      </main>
    </div>
    <Toaster />
    <PricingDialog v-if="pricingDialogStore.open" />
  </div>
</template>
