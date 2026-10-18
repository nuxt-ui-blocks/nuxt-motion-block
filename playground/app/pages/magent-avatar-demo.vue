<script setup lang="ts">
import { computed, ref } from 'vue'

const seed = ref('nuxt-motion-block')
const size = ref(220)
const animated = ref(true)

const presets = ['nuxt-motion-block', 'aurora', 'design-system', 'flux capacitor']

const frames = computed(() => size.value * 2)
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AgentAvatar"
      description="A generative avatar. A seeded PRNG decides the grid once, so the same seed always produces the same face — the animation is decoration on a stable identity, not a randomiser on every frame."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Seeded identity
        </p>
        <p class="text-muted">
          Four overlaid motions compose per cell: an independent pulse, a shared
          breath, a diagonal travelling wave, and sparse sparkles. Turn
          <code>animated</code> off to see the resting grid for the same seed.
        </p>
      </template>

      <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <MAgentAvatar
          :animated="animated"
          :seed="seed"
          :size="size"
        />
        <MAgentAvatar
          :animated="animated"
          :seed="seed"
          :size="Math.round(size * 0.66)"
        />
        <MAgentAvatar
          :animated="animated"
          :seed="seed"
          :size="Math.round(size * 0.4)"
        />
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Seed
          </p>
          <UInput
            v-model="seed"
            class="w-full"
          />
          <div class="flex flex-wrap gap-2 pt-1">
            <UButton
              v-for="preset in presets"
              :key="preset"
              :label="preset"
              :color="seed === preset ? 'primary' : 'neutral'"
              :variant="seed === preset ? 'soft' : 'outline'"
              size="xs"
              @click="seed = preset"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Size — {{ size }}px
          </p>
          <USlider
            v-model="size"
            :max="420"
            :min="96"
            :step="4"
          />
          <USwitch
            v-model="animated"
            class="pt-2"
            label="Animated"
          />
        </div>
      </div>

      <p class="text-muted mt-4 text-sm">
        Backing store is {{ frames }}px square, capped at a device pixel ratio of
        2 so a large avatar does not quietly cost four times the fill rate.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Different seeds
        </p>
        <p class="text-muted">
          Each seed hashes to a hue window and its own random field, so these are
          four different identities rather than four timings of one.
        </p>
      </template>

      <div class="flex flex-wrap items-center justify-center gap-6">
        <MAgentAvatar
          v-for="preset in presets"
          :key="preset"
          :animated="animated"
          :seed="preset"
          :size="160"
        />
      </div>
    </UCard>
  </div>
</template>
