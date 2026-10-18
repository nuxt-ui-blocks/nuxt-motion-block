<template>
  <div class="flex w-full max-w-md justify-center">
    <MAnimatedToggle v-model="enabled" />
  </div>
</template>

<script setup lang="ts">
const enabled = ref(false)
</script>
