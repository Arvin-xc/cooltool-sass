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
      indeterminate?: boolean;
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

const indeterminate = computed(
  () => props.indeterminate && (!props.modelValue || props.modelValue < 100)
);
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
            'h-full flex-1 transition-all relative',
            indeterminate ? 'indeterminate-progress' : 'w-full'
          )
        "
        v-if="!indeterminate"
        :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
      />
      <ProgressIndicator
        v-if="indeterminate"
        class="h-full w-full flex-1 indeterminate-progress"
      />
    </ProgressRoot>
    <div v-if="label && !indeterminate">
      {{ Math.ceil(props.modelValue || 0) }}%
    </div>
  </div>
</template>

<style scoped>
@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.indeterminate-progress {
  animation: indeterminate 1s infinite linear;
  background-color: var(
    --indeterminate-color,
    #007bff
  ); /* 可以根据需要自定义颜色 */
}
</style>
