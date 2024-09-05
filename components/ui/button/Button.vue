<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ReloadIcon } from '@radix-icons/vue'
import { Primitive, type PrimitiveProps } from "radix-vue";
import { type ButtonVariants, buttonVariants } from ".";
import { cn } from "@/lib/utils";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  loading?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="loading"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <ReloadIcon v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
    <slot />
  </Primitive>
</template>
