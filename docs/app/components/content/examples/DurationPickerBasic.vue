<template>
  <div class="flex w-full max-w-md justify-center">
    <MDurationPicker
      v-model="duration"
      label="Duration"
    />
  </div>
</template>

<script setup lang="ts">
const duration = ref(90)
</script>
