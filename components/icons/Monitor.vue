<template>
  <svg
    :width="size || 30"
    :height="size || 30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 4C2.89543 4 2 4.89543 2 6V17H4V6H26V17H28V6C28 4.89543 27.1046 4 26 4H4Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 18H28V21C28 22.1046 27.1046 23 26 23H16V25H21C21.5523 25 22 25.4477 22 26C22 26.5523 21.5523 27 21 27H15H9C8.44772 27 8 26.5523 8 26C8 25.4477 8.44772 25 9 25H14V23H4C2.89543 23 2 22.1046 2 21V18Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ size: number }>()
</script>
