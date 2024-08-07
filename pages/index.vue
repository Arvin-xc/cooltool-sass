<template>
  order: {{ order }}
  <Button @click="createOrder">Click me</Button>
</template>

<script setup lang="ts">
const { execute: createOrder, data: order } = useFetch("/api/order", {
  method: "POST",
  immediate: false,
  body: {
    subscriptionType: "QUARTERLY",
  },
});
</script>
