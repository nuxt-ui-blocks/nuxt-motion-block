---
title: Chroma Blur Transition
description: A diagonal curtain with a split colour fringe that sweeps across the panel.
---

A content-swap transition drawn as a curtain. One gaussian band travels along a
diagonal field, and a second copy of the same band is sampled slightly either
side of the centre — that offset pair is what makes the edge read as a lens with
colour fringing rather than as a blurred line.

The band's leading edge is displaced by low-frequency noise and a slow sine
wave, so it never arrives as a straight edge, and a fine grain is hashed over the
whole panel so the light on the curtain has texture.

Vue slots have no midpoint, so the slot already holds the new content on the
first frame. The component hides that behind a cover painted from the warm side
of the curtain's palette. The cover clears over the first third of the sweep
rather than the shared fifth: the curtain enters from a corner, and the swap
should stay hidden until the band is properly inside the panel.

## Usage

Change the content and bump `transitionKey` on the same tick.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="chroma-blur-transition-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MChromaBlurTransition
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="flex h-44 flex-col justify-between p-6"
        :style="{ backgroundImage: grade.background }"
      >
        <div class="flex items-center gap-2">
          <span
            v-for="swatch in grade.swatches"
            :key="swatch"
            aria-hidden="true"
            class="size-4 rounded-full ring-1 ring-white/50"
            :style="{ backgroundColor: swatch }"
          />
        </div>
        <div>
          <p class="text-xs font-medium tracking-widest text-white/70 uppercase">
            {{ grade.temperature }}
          </p>
          <p class="text-xl font-semibold text-white">
            {{ grade.label }}
          </p>
        </div>
      </div>
    </MChromaBlurTransition>

    <div class="flex items-center gap-3">
      <UButton
        :label="warm ? 'Cool the grade' : 'Warm the grade'"
        icon="i-lucide-palette"
        @click="swap"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const grades = [
  {
    background: 'linear-gradient(135deg, #f43f5e, #c026d3 55%, #f59e0b)',
    label: 'Rose, fuchsia, amber',
    swatches: ['#f43f5e', '#c026d3', '#f59e0b'],
    temperature: 'Warm grade',
  },
  {
    background: 'linear-gradient(135deg, #14b8a6, #0891b2 55%, #6ee7b7)',
    label: 'Teal, cyan, seafoam',
    swatches: ['#14b8a6', '#0891b2', '#6ee7b7'],
    temperature: 'Cool grade',
  },
] as const

const warm = ref(true)
const transitionKey = ref(0)
const rested = ref(false)

const grade = computed(() => (warm.value ? grades[0] : grades[1]))

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? 'rested' : 'sweeping…'
})

function swap() {
  // The slot updates immediately; the cover that opens the sweep is fully
  // opaque on the first frame, so content and key change on the same tick.
  warm.value = !warm.value
  rested.value = false
  transitionKey.value++
}
</script>
```
::

`rest` fires once the curtain has left the frame and the closing fade has
finished, so a caller that needs to know the swap has settled can wait on it.

## Customize

`duration` is the whole sweep in milliseconds — 1040 by default. The custom
example cycles three grades at three speeds.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="chroma-blur-transition-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MChromaBlurTransition
      :duration="duration"
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="relative flex h-44 flex-col justify-end gap-2 overflow-hidden p-6"
        :style="{ backgroundImage: stock.background }"
      >
        <span
          aria-hidden="true"
          class="absolute inset-0 opacity-30"
          :style="{ backgroundImage: stock.fringe }"
        />
        <div class="relative flex items-center gap-1.5">
          <span
            v-for="swatch in stock.swatches"
            :key="swatch"
            aria-hidden="true"
            class="size-3 rounded-full ring-1 ring-white/50"
            :style="{ backgroundColor: swatch }"
          />
        </div>
        <div class="relative">
          <p class="text-xs font-medium tracking-widest text-white/70 uppercase">
            Stock {{ index + 1 }} of {{ stocks.length }} · {{ duration }} ms
          </p>
          <p class="text-xl font-semibold text-white">
            {{ stock.label }}
          </p>
        </div>
      </div>
    </MChromaBlurTransition>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        label="Next stock"
        icon="i-lucide-arrow-right"
        size="sm"
        @click="next"
      />
      <UButton
        label="Replay"
        icon="i-lucide-rotate-ccw"
        size="sm"
        color="neutral"
        variant="outline"
        @click="play"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="preset in presets"
        :key="preset.value"
        :label="preset.label"
        size="sm"
        color="neutral"
        :variant="duration === preset.value ? 'solid' : 'outline'"
        @click="setDuration(preset.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const stocks = [
  {
    background: 'linear-gradient(135deg, #1e1b4b, #be185d 58%, #fbbf24)',
    fringe: 'linear-gradient(112deg, transparent 38%, #22d3ee 46%, transparent 54%)',
    label: 'Neon dusk',
    swatches: ['#1e1b4b', '#be185d', '#fbbf24'],
  },
  {
    background: 'linear-gradient(135deg, #042f2e, #0d9488 55%, #a7f3d0)',
    fringe: 'linear-gradient(112deg, transparent 38%, #f472b6 46%, transparent 54%)',
    label: 'Cold seafoam',
    swatches: ['#042f2e', '#0d9488', '#a7f3d0'],
  },
  {
    background: 'linear-gradient(135deg, #431407, #b45309 55%, #fde68a)',
    fringe: 'linear-gradient(112deg, transparent 38%, #818cf8 46%, transparent 54%)',
    label: 'Amber print',
    swatches: ['#431407', '#b45309', '#fde68a'],
  },
] as const

const presets = [
  { label: '320 ms', value: 320 },
  { label: '1040 ms', value: 1040 },
  { label: '1600 ms', value: 1600 },
]

const index = ref(0)
const duration = ref(1040)
const transitionKey = ref(0)
const rested = ref(false)

const stock = computed(() => stocks[index.value] ?? stocks[0])

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? `rested · ${duration.value} ms` : 'sweeping…'
})

function play() {
  rested.value = false
  transitionKey.value++
}

function next() {
  index.value = (index.value + 1) % stocks.length
  play()
}

function setDuration(value: number) {
  duration.value = value
  play()
}
</script>
```
::

The curtain's front is tied to progress, so a longer duration moves it across
the panel more slowly rather than changing the width of the band. The cover
clears on the same progress curve, which keeps the swap hidden for the same
fraction of the sweep at any speed.

## Props

::component-props
  ::component-prop{name="duration" type="number" default="1040"}
  Total sweep time in milliseconds, eased with `easeOutQuart`. Clamped up to
  `80` — below that a sweep finishes inside a single frame and reads as a jump
  cut rather than as motion.
  ::
  ::component-prop{name="transitionKey" type="string | number" default="0"}
  Change it to play the transition. Bump it on the same tick as your content
  swap; the cover that opens the sweep is what hides the jump.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root, which is `relative isolate overflow-hidden` — the
  curtain, the cover and the canvas all clip to it.
  ::
::

## Events

::component-events
  ::component-event{name="rest" type="() => void"}
  Fired once, after the sweep, the closing fade and the content swap have all
  settled. Under `prefers-reduced-motion` it fires immediately, because the
  swap still has to complete even though the sweep does not run.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The panel's content. Replaced while the cover is opaque.
  ::
::

## Accessibility

The curtain, the cover and the canvas are `aria-hidden="true"` — the transition
contributes nothing to the accessibility tree beyond your own slot content.
Announce a content swap yourself if the new state is meaningful.

Under `prefers-reduced-motion` the sweep does not run: the content swaps
immediately and `rest` fires synchronously.

## Performance

- One compiled WebGL1 program with four uniforms. `duration` only changes the
  driver's clock; nothing about the shader changes between sweeps.
- The band is a single gaussian per fragment plus two offset samples for the
  fringe, so the cost is a handful of `exp` calls over the panel rather than a
  full-screen blur pass.
- The overlay caps at `0.86` alpha and fades out from 74% of the sweep, so the
  curtain clears before the new content is left under a coloured wash.
- The cover is a plain absolutely-positioned `div`, not a second canvas, and it
  clears on the driver's progress rather than on a parallel timer — the two
  cannot drift apart at any duration.
- Replaying mid-sweep restarts cleanly: the previous playback is cancelled and
  its frame callback released before the new one begins.
- If the browser refuses a WebGL context, a diagonal gradient band travels on
  the same timing and `rest` still fires — the split fringe cannot be
  reproduced in CSS, but the timing and the answer are preserved.
