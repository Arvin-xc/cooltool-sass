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
      d="M4 4C2.89543 4 2 4.89543 2 6V24C2 25.1046 2.89543 26 4 26H26C27.1046 26 28 25.1046 28 24V6C28 4.89543 27.1046 4 26 4H4ZM26 6H4V24H26V6Z"
      fill="currentColor"
    />
    <path
      d="M14.8625 15.3748C16.8831 15.3748 18.5272 13.721 18.5271 11.6874C18.5271 9.65392 16.8831 8 14.8625 8C12.842 8 11.198 9.6545 11.198 11.6874C11.198 13.7204 12.842 15.3748 14.8625 15.3748ZM16.3727 15.7298H13.6269C11.0754 15.7298 9 17.8167 9 20.3825V20.6587C9 22 11.0421 22 13.6269 22H16.3727C18.8558 22 21 22 21 20.6587V20.3825C21 17.8172 18.9243 15.7298 16.3727 15.7298Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ size: number }>()
</script>
