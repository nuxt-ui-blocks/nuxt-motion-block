<template>
  <div class="flex w-full flex-col items-center gap-5">
    <div class="w-full max-w-lg overflow-hidden rounded-2xl border border-default bg-elevated/30 px-4 py-8 sm:px-8 sm:py-10">
      <MVideoAmbient
        alt="Jellyfish drifting through dark blue water"
        :blur="44"
        :gain="1.9"
        :glow="glow"
        :intensity="1"
        :rounded="28"
        :saturation="2.4"
        :scale="1.45"
        class="aspect-video w-full"
        controls
        src="https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4"
      />
    </div>

    <div class="flex items-center gap-3">
      <UButton
        :label="glow ? 'Hide glow' : 'Show glow'"
        :icon="glow ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        color="neutral"
        variant="outline"
        size="sm"
        @click="glow = !glow"
      />
      <span class="text-xs text-muted">
        The glow is sampled from the current frame, never read back.
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const glow = ref(true)
</script>
