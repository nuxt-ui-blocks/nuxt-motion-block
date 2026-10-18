<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex items-center gap-3">
      <MThemeToggle aria-label="Cycle colour mode" />
      <span class="text-sm text-muted">
        preference: <code class="font-mono">{{ colorMode.preference }}</code>
      </span>
    </div>

    <div class="flex w-full items-center justify-between gap-3 rounded-xl border border-default px-4 py-3">
      <span class="text-sm font-medium text-highlighted">
        Northwind docs
      </span>
      <MThemeToggle size="sm" />
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      Every click advances light → dark → system and writes Nuxt UI's global colour mode, so the whole
      page — not just this button — follows. The icon is chosen from the preference itself, which is
      why the monitor appears in system mode rather than the resolved one.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()
</script>
