<template>
  <div
    ref="cardRef"
    class="mx-6 max-w-xl rounded-xl border border-default bg-elevated p-8"
    style="font-family: 'Inter var', 'Inter', sans-serif;"
  >
    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <p class="mb-6 text-sm text-muted">
      The pointer is tracked across the whole card, not just the headline —
      the ref is passed through `containerRef`.
    </p>
    <MVariableProximity
      label="Design is a conversation"
      :container-ref="cardRef"
      class="text-3xl font-semibold text-highlighted"
      :radius="180"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cardRef = ref<HTMLElement | null>(null)
</script>
