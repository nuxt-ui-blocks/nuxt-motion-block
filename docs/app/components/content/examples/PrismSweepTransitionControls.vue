<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MPrismSweepTransition
      :direction="direction"
      :tone="tone"
      :transition-key="transitionKey"
      class="h-44 rounded-2xl"
    >
      <div class="grid h-full place-items-center bg-gradient-to-br from-slate-900 to-indigo-950 text-center text-white">
        <div class="space-y-1">
          <p class="text-xs uppercase tracking-widest text-white/50">
            {{ direction }} · {{ tone }}
          </p>
          <p class="text-2xl font-semibold">
            Prism sweep
          </p>
        </div>
      </div>
    </MPrismSweepTransition>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="direction"
        :items="directions"
      />
      <USelect
        v-model="tone"
        :items="tones"
      />
    </div>

    <UButton
      label="Replay"
      icon="i-lucide-rotate-ccw"
      variant="outline"
      @click="transitionKey++"
    />
  </div>
</template>

<script setup lang="ts">
const direction = ref('left')
const tone = ref('prism')
const transitionKey = ref(0)

const directions = ['left', 'right', 'up', 'down']
const tones = ['aperture', 'beam', 'chroma', 'prism']
</script>
