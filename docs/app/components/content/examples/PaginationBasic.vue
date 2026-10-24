<template>
  <div class="flex w-full flex-col items-center gap-4 py-10">
    <MPagination
      v-model:page="page"
      :total-pages="24"
    />
    <p class="text-sm text-muted">
      Page {{ page }} of 24
    </p>
  </div>
</template>

<script setup lang="ts">
const page = ref(1)
</script>
