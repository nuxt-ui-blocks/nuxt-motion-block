<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <div class="rounded-2xl border border-default bg-default p-6">
      <MTextEffect
        :key="run"
        :children="copy"
        per="line"
        preset="fade-in-blur"
        as="h2"
        class="text-2xl font-semibold leading-snug text-default"
        :delay="0.4"
        :speed-reveal="3"
        :speed-segment="0.5"
        :trigger="playing"
      />
    </div>

    <div class="flex items-center justify-center gap-3">
      <UButton
        label="Replay"
        icon="i-lucide-rotate-ccw"
        variant="outline"
        @click="run++"
      />
      <UButton
        :label="playing ? 'Hide' : 'Show'"
        :icon="playing ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        variant="outline"
        @click="playing = !playing"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const run = ref(0)
const playing = ref(true)
const copy = 'Build faster.\nShip sooner.\nSleep better.'
</script>
