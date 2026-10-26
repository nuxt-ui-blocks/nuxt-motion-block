<template>
  <ComponentPlayground
    name="Pagination"
    :defaults="{
      page: 4,
      totalPages: 24,
      siblings: 1,
    }"
    :handlers="{ 'update:page': handlePage }"
    :controls="{
      page: { label: 'Page', kind: 'number', min: 1, max: 24, step: 1 },
      totalPages: { label: 'Total pages', kind: 'number', min: 1, max: 40, step: 1 },
      siblings: { label: 'Siblings', kind: 'number', min: 0, max: 3, step: 1 },
    }"
  />
</template>

<script setup lang="ts">
function handlePage({ args, model }: { args: unknown[], model: Record<string, any> }) {
  model.page = args[0]
}
</script>
