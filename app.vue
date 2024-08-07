<script setup lang="ts">
import { Package2 } from "lucide-vue-next";
</script>

<template>
  <div class="flex min-h-screen w-full bg-muted/40">
    <aside
      class="inset-y-0 left-0 z-10 w-16 lg:w-40 flex-col border-r bg-background flex"
    >
      <nav class="flex flex-col items-center gap-4 px-2 py-5">
        <div class="flex items-center gap-2">
          <a
            class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground lg:h-8 lg:w-8 md:text-base"
          >
            <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
          </a>
          <span class="hidden lg:block">CoolTool</span>
        </div>
      </nav>
      <nav class="mt-auto flex flex-col items-start gap-1 px-4 sm:py-5">
        <UserNav />
      </nav>
    </aside>
    <div class="flex flex-col flex-1">
      <Header />
      <main
        class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
      >
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
