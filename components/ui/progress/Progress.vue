<script setup lang="ts">
import { type ProgressVariants, progressVariants } from ".";
import { type HTMLAttributes, computed } from "vue";
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from "radix-vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes["class"];
      variant?: ProgressVariants["variant"];
      label?: boolean;
    }
  >(),
  {
    modelValue: 0,
  }
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <div class="flex items-center gap-1 items-center relative">
    <ProgressRoot
      v-bind="delegatedProps"
      :class="
        cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
          props.class
        )
      "
    >
      <ProgressIndicator
        :class="
          cn(
            progressVariants({ variant }),
            'h-full w-full flex-1 transition-all'
          )
        "
        :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
      />
    </ProgressRoot>
    <div v-if="label">{{ Math.ceil(props.modelValue || 0) }}%</div>
  </div>
</template>
