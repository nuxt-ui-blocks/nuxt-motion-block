<template>
  <div class="flex w-full flex-col items-center gap-4">
    <MAuroraCurtain
      :bands="2"
      :blur="0.85"
      :colors="colors"
      :intensity="0.9"
      :noise="0.45"
      :paused="paused"
      :speed="0.6"
      direction="down"
      class="w-full rounded-2xl border border-default"
    >
      <div class="flex min-h-[340px] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <span
          class="rounded-full border border-default bg-default/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm"
        >
          {{ paused ? 'Paused' : 'Live' }}
        </span>
        <h3 class="max-w-sm text-2xl font-semibold text-balance text-highlighted">
          Two ribbons, heavier grain
        </h3>
        <p class="max-w-sm text-sm text-balance text-muted">
          Light falls from the top edge, the blur softens every ribbon and the
          grain moves even where there is no light.
        </p>
        <UButton
          :label="paused ? 'Resume' : 'Pause'"
          :icon="paused ? 'i-lucide-play' : 'i-lucide-pause'"
          color="neutral"
          variant="outline"
          size="sm"
          @click="paused = !paused"
        />
      </div>
    </MAuroraCurtain>

    <p class="text-xs text-muted">
      The gradient underneath is a CSS fallback for browsers without WebGL2.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paused = ref(false)
const colors = ['var(--ui-info)', 'var(--ui-primary)']
</script>
