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
      d="M2 11L28 11V6C28 4.89543 27.1046 4 26 4L4 4C2.89543 4 2 4.89543 2 6V11ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55229 4.44772 9 5 9C5.55228 9 6 8.55229 6 8C6 7.44772 5.55228 7 5 7ZM8 8C8 7.44772 8.44772 7 9 7C9.55228 7 10 7.44772 10 8C10 8.55229 9.55228 9 9 9C8.44772 9 8 8.55229 8 8ZM13 7C12.4477 7 12 7.44772 12 8C12 8.55229 12.4477 9 13 9C13.5523 9 14 8.55229 14 8C14 7.44772 13.5523 7 13 7Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 12H2V24C2 25.1046 2.89543 26 4 26H26C27.1046 26 28 25.1046 28 24V12H26V24H4V12Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ size: number }>()
</script>
