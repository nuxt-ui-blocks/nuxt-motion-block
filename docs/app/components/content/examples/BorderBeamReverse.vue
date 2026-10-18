<template>
  <MBorderBeam
    class="w-full max-w-sm rounded-2xl bg-elevated/50 p-6"
    :active="isActive"
    reverse
    pause-on-hover
    :size="100"
    :duration="5"
    color-from="#6ee7b7"
    color-to="#10b981"
  >
    <div class="flex flex-col items-center gap-3 text-center">
      <p class="text-sm text-muted">
        Travels counter-clockwise and freezes while you hover.
      </p>
      <UButton
        :icon="isActive ? 'i-lucide-pause' : 'i-lucide-play'"
        color="neutral"
        variant="outline"
        size="sm"
        :aria-pressed="isActive"
        @click="isActive = !isActive"
      >
        {{ isActive ? 'Stop' : 'Start' }}
      </UButton>
    </div>
  </MBorderBeam>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(true)
</script>
