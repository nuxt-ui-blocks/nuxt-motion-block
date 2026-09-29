<script setup lang="ts">
import { computed, ref } from 'vue'

const scene = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0ea5e9"/>
        <stop offset="45%" stop-color="#6366f1"/>
        <stop offset="100%" stop-color="#1e1b4b"/>
      </linearGradient>
      <radialGradient id="sun" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fef3c7"/>
        <stop offset="100%" stop-color="#f59e0b"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="900" fill="url(#sky)"/>
    <circle cx="880" cy="210" r="120" fill="url(#sun)"/>
    <path d="M0 640 L220 400 L420 620 L640 380 L860 660 L1050 480 L1200 660 L1200 900 L0 900 Z" fill="#1e293b"/>
    <path d="M0 760 L260 560 L500 780 L780 540 L1010 790 L1200 640 L1200 900 L0 900 Z" fill="#0f172a"/>
    <g fill="#f8fafc" opacity="0.85">
      <circle cx="140" cy="120" r="4"/><circle cx="260" cy="80" r="3"/>
      <circle cx="380" cy="150" r="5"/><circle cx="520" cy="70" r="3"/>
      <circle cx="660" cy="130" r="4"/><circle cx="780" cy="90" r="3"/>
      <circle cx="1040" cy="150" r="4"/><circle cx="1140" cy="100" r="3"/>
    </g>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
})

type Mask = 'wipe' | 'curtain' | 'circle' | 'blinds' | 'scale'

const mask = ref<Mask>('wipe')
const direction = ref<'left' | 'right' | 'up' | 'down'>('left')
const parallax = ref(60)
const once = ref(false)

const masks: { label: string, value: Mask }[] = [
  { label: 'Wipe', value: 'wipe' },
  { label: 'Curtain', value: 'curtain' },
  { label: 'Circle', value: 'circle' },
  { label: 'Blinds', value: 'blinds' },
  { label: 'Scale', value: 'scale' },
]

const directions = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Up', value: 'up' },
  { label: 'Down', value: 'down' },
]
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="ScrollImageReveal"
      description="An image revealed by a moving mask, with the image itself counter-parallaxed behind it. The mask lives on the frame, not the image, because the image is deliberately taller than the frame."
    />

    <div class="h-[25vh]" />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Five masks, four directions
        </p>
        <p class="text-muted">
          <code>blinds</code> is a
          <code>repeating-linear-gradient</code> used as a
          <code>mask-image</code> — the only way to get N discrete slats out of
          a single animated value.
        </p>
      </template>

      <div class="flex justify-center">
        <MScrollImageReveal
          alt="A stylised mountain range at dusk under a starry gradient sky"
          class="h-[26rem] w-full max-w-2xl"
          :direction="direction"
          :mask="mask"
          :offset="['start 0.95', 'end 0.55']"
          :once="once"
          :parallax="parallax"
          :src="scene"
        />
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Mask
          </p>
          <USelectMenu
            v-model="mask"
            :items="masks"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Direction
          </p>
          <USelectMenu
            v-model="direction"
            :items="directions"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Parallax — {{ parallax }}px
          </p>
          <USlider
            v-model="parallax"
            :max="200"
            :min="0"
            :step="10"
          />
        </div>

        <div class="space-y-2 pt-6">
          <USwitch
            v-model="once"
            label="Once"
          />
        </div>
      </div>

      <p class="text-muted mt-4 text-sm">
        The image is inset by twice the parallax on each axis, so the
        counter-parallax can never expose the background past the mask edge.
      </p>
    </UCard>

    <div class="h-[50vh]" />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          All five at once
        </p>
        <p class="text-muted">
          Same source, same scroll range, five different readings of the same
          motion.
        </p>
      </template>

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="entry in masks"
          :key="entry.value"
          class="space-y-2"
        >
          <p class="text-sm font-medium">
            {{ entry.label }}
          </p>
          <MScrollImageReveal
            alt="A stylised mountain range at dusk"
            class="h-48 w-full"
            :direction="direction"
            :mask="entry.value"
            :offset="['start 0.98', 'end 0.6']"
            rounded="rounded-xl"
            :src="scene"
          />
        </div>
      </div>
    </UCard>

    <div class="h-[40vh]" />
  </div>
</template>
