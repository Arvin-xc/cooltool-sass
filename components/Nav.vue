<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Accordion from "./ui/accordion/Accordion.vue";
import AccordionItem from "./ui/accordion/AccordionItem.vue";
import AccordionTrigger from "./ui/accordion/AccordionTrigger.vue";
import AccordionContent from "./ui/accordion/AccordionContent.vue";
import type { RouteNode } from "~/composables/useRouteTree";

interface NavProps {
  isCollapsed: boolean;
  links: RouteNode[];
  title: string;
}

defineProps<NavProps>();
const route = useRoute();
</script>

<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4 data-[collapsed=true]:py-2"
  >
    <nav
      class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger class="px-2.5">
            <h2 class="font-bold text-base">{{ title }}</h2>
          </AccordionTrigger>
          <AccordionContent class="flex items-center gap-2 flex-col">
            <template v-for="(link, index) of links">
              <Tooltip
                v-if="isCollapsed"
                :key="`1-${index}`"
                :delay-duration="0"
              >
                <TooltipTrigger as-child>
                  <NuxtLink :class="cn('h-9 w-full')">
                    <!-- <Icon :icon="link.icon" class="size-4" /> -->
                    <span class="sr-only">{{ link.name }}</span>
                  </NuxtLink>
                </TooltipTrigger>
                <TooltipContent side="right" class="flex items-center gap-4">
                  {{ link.name }}
                </TooltipContent>
              </Tooltip>

              <NuxtLink
                v-else
                :key="`2-${index}`"
                :to="link.path"
                :class="
                  cn(
                    buttonVariants({
                      variant:
                        route.fullPath === link.path ? 'default' : 'ghost',
                      size: 'sm',
                    }),

                    'w-full',
                    route.fullPath === link.path &&
                      'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                    'justify-start'
                  )
                "
              >
                <Icon :icon="link.name" class="mr-2 size-4" />
                {{ link.name }}
              </NuxtLink>
            </template>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  </div>
</template>
