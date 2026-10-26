<template>
  <div class="flex w-full justify-center py-10">
    <MBreadcrumb :items="items" />
  </div>
</template>

<script setup lang="ts">
const items = [
  { label: 'Docs', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Navigation', href: '#' },
  { label: 'Breadcrumb' },
]
</script>
