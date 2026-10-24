<template>
  <div class="flex w-full flex-col items-center gap-4 px-6 py-10">
    <MGravityStars
      class="h-[360px] w-full max-w-2xl rounded-2xl bg-[#060a14] ring-1 ring-white/10"
      :connect="connect"
      :connect-distance="80"
      :count="260"
      color="#dbeafe"
      :glow="6"
      :paused="paused"
      :tint="0.8"
      :twinkle="0.35"
    >
      <div class="flex h-full flex-col items-center justify-center gap-2 text-center">
        <p class="text-lg font-medium text-white">
          {{ paused ? 'Frozen' : 'Drifting' }}
        </p>
        <p class="text-xs text-white/50">
          {{ connect ? 'Constellations on' : 'Constellations off' }} · 260 stars
        </p>
      </div>
    </MGravityStars>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <UButton
        :label="paused ? 'Resume' : 'Pause'"
        :icon="paused ? 'i-lucide-play' : 'i-lucide-pause'"
        color="neutral"
        variant="outline"
        size="sm"
        @click="paused = !paused"
      />
      <UButton
        :label="connect ? 'Hide links' : 'Show links'"
        icon="i-lucide-share-2"
        color="neutral"
        variant="outline"
        size="sm"
        @click="connect = !connect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paused = ref(false)
const connect = ref(true)
</script>
