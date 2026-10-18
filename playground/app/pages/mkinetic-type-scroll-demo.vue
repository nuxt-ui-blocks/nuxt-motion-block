<script setup lang="ts">
import { ref } from 'vue'
import type { KineticTypeScrollAlign } from '../../../src/runtime/components/KineticTypeScroll.vue'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,200..900&display=swap',
    },
  ],
})

const align = ref<KineticTypeScrollAlign>('center')
const stagger = ref(0.12)

const phrase = [
  'Motion',
  'that',
  'answers',
  'to',
  'the',
  'scrollbar',
  'instead',
  'of',
  'ignoring',
  'it',
]

const short = ['Scroll', 'to', 'animate']
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="KineticTypeScroll"
      description="Type whose weight, tracking, scale and opacity are all driven by one scroll progress. Each word owns a window of the scroll, so the emphasis travels through the line rather than scaling the whole block at once."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Scroll through the wave
        </p>
        <p class="text-muted">
          This needs a variable font with a
          <code>wght</code> axis, otherwise the weight axis is animated but
          nothing moves. The demo loads Inter, whose weight axis runs 200–900.
        </p>
      </template>

      <p class="mb-8 text-muted text-sm">
        ↓ keep scrolling
      </p>

      <div
        class="font-['Inter']"
        style="font-optical-sizing: auto"
      >
        <MKineticTypeScroll
          :align="align"
          class="text-4xl leading-tight font-semibold sm:text-5xl"
          :stagger="stagger"
          :words="phrase"
        />
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Alignment
          </p>
          <div class="flex gap-2">
            <UButton
              v-for="option in (['start', 'center', 'end'] as const)"
              :key="option"
              :label="option"
              :color="align === option ? 'primary' : 'neutral'"
              :variant="align === option ? 'solid' : 'outline'"
              size="sm"
              capitalize
              @click="align = option"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Word stagger — {{ stagger.toFixed(2) }}
          </p>
          <USlider
            v-model="stagger"
            :max="0.4"
            :min="0"
            :step="0.01"
          />
        </div>
      </div>
    </UCard>

    <div class="h-40" />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Short line
        </p>
        <p class="text-muted">
          The offset range is <code>['start 0.9', 'end 0.45']</code> rather than
          Motion's <code>['start start', 'end end']</code>, because on a short
          element the default collapses to a single scroll position and the
          whole line animates at once.
        </p>
      </template>

      <div
        class="font-['Inter']"
        style="font-optical-sizing: auto"
      >
        <MKineticTypeScroll
          class="text-6xl leading-none font-semibold"
          :words="short"
        />
      </div>
    </UCard>

    <div class="h-40" />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Verifying it is live
        </p>
        <p class="text-muted">
          Inspect any word: <code>fontVariationSettings</code> tracks
          <code>wght</code> between 380 and 800 as its window opens and closes.
        </p>
      </template>

      <div
        class="font-['Inter']"
        style="font-optical-sizing: auto"
      >
        <MKineticTypeScroll
          align="start"
          class="text-3xl leading-snug font-medium"
          :words="['Every', 'word', 'here', 'has', 'its', 'own', 'window']"
        />
      </div>
    </UCard>

    <div class="h-[60vh]" />
  </div>
</template>
