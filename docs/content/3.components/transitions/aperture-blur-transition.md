---
title: Aperture Blur Transition
description: An iris ring that opens from the centre of the panel and swaps the content behind its glow.
---

A content-swap transition drawn as an iris. A thin ring opens from the centre of
the panel until it passes the edges, and the content changes behind it. The ring
is not a filled disc: it is a narrow gaussian band whose radius is displaced by
two slow sine waves, so the edge wobbles like a diaphragm rather than growing as
a clean circle.

The glow inside the ring lags the radius, and a fine grain is hashed from screen
space, so the sweep reads as light passing through glass instead of as a mask
being scaled up.

Vue slots have no midpoint, so the slot already holds the new content on the
first frame. The component hides that behind a cover painted from the warm side
of the ring's own palette: fully opaque on frame one, cleared over the first
fifth of the sweep.

## Usage

Change the content and bump `transitionKey` on the same tick.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="aperture-blur-transition-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MApertureBlurTransition
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="relative flex h-44 flex-col justify-end gap-1 overflow-hidden p-6"
        :class="open
          ? 'bg-gradient-to-br from-amber-200 via-rose-300 to-sky-400'
          : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800'"
      >
        <span
          aria-hidden="true"
          class="absolute -top-8 -right-8 size-32 rounded-full border"
          :class="open ? 'border-black/20' : 'border-white/20'"
        />
        <span
          class="text-xs font-medium tracking-widest"
          :class="open ? 'text-black/60' : 'text-white/60'"
        >
          {{ open ? 'f/1.4' : 'f/16' }}
        </span>
        <span
          class="text-xl font-semibold"
          :class="open ? 'text-black' : 'text-white'"
        >
          {{ open ? 'Wide open, everything soft' : 'Stopped down, everything sharp' }}
        </span>
      </div>
    </MApertureBlurTransition>

    <div class="flex items-center gap-3">
      <UButton
        :label="open ? 'Stop down' : 'Open up'"
        icon="i-lucide-aperture"
        @click="swap"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
const transitionKey = ref(0)
const rested = ref(false)

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? 'rested' : 'sweeping…'
})

function swap() {
  // The slot updates immediately; the cover that opens the sweep is fully
  // opaque on the first frame, so content and key change on the same tick.
  open.value = !open.value
  rested.value = false
  transitionKey.value++
}
</script>
```
::

`rest` fires once the ring has crossed the frame and the closing fade has
finished, so a caller that needs to know the swap has settled can wait on it.

## Customize

`duration` is the whole sweep in milliseconds — 760 by default. The custom
example replays three frames at three speeds so the difference is visible
without a stopwatch.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="aperture-blur-transition-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MApertureBlurTransition
      :duration="duration"
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="relative flex h-44 flex-col justify-end gap-1 p-6"
        :style="{ backgroundImage: frame.gradient }"
      >
        <span class="text-xs font-medium tracking-widest text-white/70">
          {{ frame.stop }}
        </span>
        <span class="text-xl font-semibold text-white">{{ frame.label }}</span>
      </div>
    </MApertureBlurTransition>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        label="Next frame"
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
        @click="replay"
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
const frames = [
  {
    gradient: 'linear-gradient(135deg, #fb7185, #7c3aed 55%, #1e1b4b)',
    label: 'Wide open',
    stop: 'f/1.4',
  },
  {
    gradient: 'linear-gradient(135deg, #fbbf24, #f97316 50%, #7f1d1d)',
    label: 'Mid stop',
    stop: 'f/5.6',
  },
  {
    gradient: 'linear-gradient(135deg, #34d399, #0f766e 55%, #022c22)',
    label: 'Stopped down',
    stop: 'f/16',
  },
] as const

const presets = [
  { label: '280 ms', value: 280 },
  { label: '760 ms', value: 760 },
  { label: '1400 ms', value: 1400 },
]

const index = ref(0)
const duration = ref(760)
const transitionKey = ref(0)
const rested = ref(false)

const frame = computed(() => frames[index.value] ?? frames[0])

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? `rested · ${duration.value} ms` : 'sweeping…'
})

function play() {
  rested.value = false
  transitionKey.value++
}

function next() {
  index.value = (index.value + 1) % frames.length
  play()
}

function replay() {
  play()
}

function setDuration(value: number) {
  duration.value = value
  play()
}
</script>
```
::

The ring's radius is tied to progress, so a longer duration widens the ring more
slowly rather than changing its shape. The cover clears on the same progress
curve, which keeps the swap hidden for the same fraction of the sweep at any
speed.

## Props

::component-props
  ::component-prop{name="duration" type="number" default="760"}
  Total sweep time in milliseconds, eased with `easeOutCubic`. Clamped up to
  `80` — below that a sweep finishes inside a single frame and reads as a jump
  cut rather than as motion.
  ::
  ::component-prop{name="transitionKey" type="string | number" default="0"}
  Change it to play the transition. Bump it on the same tick as your content
  swap; the cover that opens the sweep is what hides the jump.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root, which is `relative isolate overflow-hidden` — the ring,
  the cover and the canvas all clip to it.
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

The ring, the cover and the canvas are `aria-hidden="true"` — the transition
contributes nothing to the accessibility tree beyond your own slot content.
Announce a content swap yourself if the new state is meaningful.

Under `prefers-reduced-motion` the sweep does not run: the content swaps
immediately and `rest` fires synchronously.

## Performance

- One compiled WebGL1 program, no variants and no recompiles. `duration` only
  changes the driver's clock.
- The ring is a thin band (`exp(-d * d * 210)`), so most fragments write almost
  no alpha. The expensive part of the shader is the two `sin` calls on the
  angle, which do not depend on the pixel radius.
- The overlay caps at `0.88` alpha and fades out from 58% of the sweep, so the
  final third is a ring clearing rather than a panel dissolving over the new
  content.
- The cover is a plain absolutely-positioned `div`, not a second canvas, and it
  clears on the driver's progress rather than on a parallel timer — the two
  cannot drift apart at any duration.
- Replaying mid-sweep restarts cleanly: the previous playback is cancelled and
  its frame callback released before the new one begins.
- If the browser refuses a WebGL context, a radial band scales outward on the
  same timing and `rest` still fires — the noisy edge cannot be reproduced in
  CSS, but the timing and the answer are preserved.
