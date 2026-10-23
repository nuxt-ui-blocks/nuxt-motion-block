<template>
  <ComponentPlayground
    name="ContentSkeleton"
    :defaults="{
      loading: true,
      __slot: cardMarkup,
    }"
    :controls="{
      loading: { label: 'Loading', kind: 'boolean' },
    }"
  />
</template>

<script setup lang="ts">
const cardMarkup = '<div class="rounded-xl border border-default bg-elevated p-5"><h3 class="text-base font-semibold text-highlighted">Quarterly report</h3><p class="mt-2 text-sm text-muted">Revenue grew 18% against a flat headcount, and churn held below two percent.</p></div>'
</script>
