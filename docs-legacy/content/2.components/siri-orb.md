---
title: Siri Orb
description: A Siri-style ambient orb that reacts to audio amplitude and assistant state.
navigation:
  icon: i-lucide-circle-dot
---

# Siri Orb

An assistant orb: a slowly rotating conic gradient that blooms, saturates and
scales with the assistant's state, and — when you give it a live audio level —
ripples to the sound.

SiriOrb takes no children and no slots. It is a fixed-size ambient visual that
expects to sit next to your own copy, rather than a container for it.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="siri-orb-basic" />
  :::
#code
```vue
<template>
  <div class="flex items-center justify-center py-6">
    <MSiriOrb size="160px" />
  </div>
</template>
```
::

::tip
The orb is `aria-hidden="true"` and exposes no role. Announce state changes
yourself if they are meaningful — an assistive-tech user gets nothing from the
animation, so pair it with a live region or visible label.
::

## Props

::field-group
  ::field{name="size" type="string" default="DEFAULT_SIRI_ORB_SIZE"}
  Diameter of the disc. Every internal value derives from it — the ambient blur,
  the gradient contrast, the dot size, the rim width and the mask radius are all
  expressed as a fraction of the size, so there is no second scale prop to keep
  in sync.
  ::
  ::field{name="state" type="AIState" default="'idle'"}
  Assistant state. Drives the bloom, the gradient saturation, the base scale and
  how far the amplitude is allowed to move anything. One of `idle`, `listening`,
  `thinking`, `speaking`, `error`.
  ::
  ::field{name="amplitude" type="number | MotionValue<number>"}
  Live audio level in `0..1`. Pass a `MotionValue` for real microphone input or a
  plain number for a static level. When omitted the orb falls back to its
  ambient animation alone.
  ::
  ::field{name="colors" type="{ bg?, c1?, c2?, c3?, c4? }"}
  Partial palette merged over the defaults. Channels you leave out keep their
  default, so `{ c2: '#ff4d2e' }` recolours the orb without touching the rest.
  ::
  ::field{name="animationDuration" type="number" default="20"}
  Seconds for one full ambient gradient rotation. `thinking` runs it 2.4× faster
  than `idle`; every other state uses this value as-is.
  ::
  ::field{name="class" type="string"}
  Merged onto the outer wrapper.
  ::
::

## States

`state` is the whole visual vocabulary — each one reads differently at a glance,
which is why the states are distinguished by bloom, saturation, scale and shake
rather than by swapping colours alone.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="siri-orb-states" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex min-h-32 items-center justify-center rounded-xl bg-black/5 p-6 dark:bg-white/5">
      <MSiriOrb :state="state" size="120px" />
    </div>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="value in states"
        :key="value"
        :label="value"
        :variant="state === value ? 'solid' : 'outline'"
        :color="state === value ? 'primary' : 'neutral'"
        @click="state = value"
      />
    </div>

    <p class="text-xs text-muted">
      state = <span class="font-medium">{{ state }}</span> · rotation period
      {{ period }}s
    </p>
  </div>
</template>

<script setup lang="ts">
const state = ref('idle')
const states = ['idle', 'listening', 'thinking', 'speaking', 'error']

// `thinking` runs the ambient gradient 2.4x faster than `idle`; every other
// state uses animationDuration as-is.
const period = computed(() =>
  state.value === 'thinking' ? (20 / 2.4).toFixed(1) : '20',
)
</script>
```
::

## Audio amplitude

Pass `amplitude` to make the disc ripple to sound. A plain number is fine for a
static level; for real microphone input pass the `MotionValue` from
`useAudioAmplitude` so the animation runs on the motion thread rather than
re-rendering your component sixty times a second.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="siri-orb-amplitude" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex min-h-40 items-center justify-center">
      <MSiriOrb
        :amplitude="amplitude"
        :size="'140px'"
        :state="state"
      />
    </div>

    <div class="flex flex-col gap-3">
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-16">amplitude</span>
        <USlider
          v-model="amplitude"
          :min="0"
          :max="1"
          :step="0.01"
          class="flex-1"
        />
      </label>
      <USelect v-model="state" :items="states" class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
const amplitude = ref(0)
const state = ref('idle')

const states = [
  { label: 'idle', value: 'idle' },
  { label: 'listening', value: 'listening' },
  { label: 'thinking', value: 'thinking' },
  { label: 'speaking', value: 'speaking' },
  { label: 'error', value: 'error' },
]

// A slow synthetic level, standing in for a real microphone. Feed
// `amplitude` a MotionValue from `useAudioAmplitude` for live input.
let raf = 0
let t = 0
const tick = () => {
  t += 0.02
  amplitude.value = 0.5 + 0.5 * Math.sin(t) * Math.sin(t * 0.37)
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>
```
::

In a chat row the orb is usually a small inline presence indicator:

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="siri-orb-voice-row" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md rounded-xl bg-black/5 p-6 dark:bg-white/5">
    <div class="flex items-center gap-4">
      <MSiriOrb :amplitude="level" :size="'56px'" state="listening" />
      <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-highlighted">
          Hey, how can I help?
        </span>
        <span class="text-xs text-muted">Listening…</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// In a real app, `level` is a MotionValue<number> from `useAudioAmplitude`.
// The orb reads it through `useTransform`, so a 60Hz audio stream animates on
// the motion thread instead of costing 60 component updates per second.
const level = ref(0)

let raf = 0
let t = 0
const tick = () => {
  t += 0.03
  level.value = 0.35 + 0.4 * Math.abs(Math.sin(t) * Math.cos(t * 0.6))
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>
```
::

## Sizes

`size` is the only scale control, and it is a CSS length string — so `'56px'`,
`'4rem'` and `'clamp(48px, 12vw, 160px)'` all work.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="siri-orb-sizes" />
  :::
#code
```vue
<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-center gap-8">
      <div
        v-for="size in sizes"
        :key="size"
        class="flex flex-col items-center gap-2"
      >
        <MSiriOrb :size="size" state="speaking" />
        <span class="text-xs text-muted">{{ size }}</span>
      </div>
    </div>

    <p class="text-center text-xs text-muted">
      Blur, contrast, dot size, rim and mask radius all derive from
      <code>size</code> — there is no separate scale prop to keep in sync.
    </p>
  </div>
</template>

<script setup lang="ts">
const sizes = ['72px', '120px', '200px']
</script>
```
::

## Colors

`colors` is merged, not replaced — pass only the channels you want to change.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="siri-orb-colors" />
  :::
#code
```vue
<template>
  <div class="flex flex-wrap items-center justify-center gap-8">
    <div
      v-for="preset in presets"
      :key="preset.name"
      class="flex flex-col items-center gap-2"
    >
      <MSiriOrb :colors="preset.colors" size="120px" />
      <span class="text-xs text-muted">{{ preset.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Partial palettes: any channel you leave out keeps the component default.
const presets = [
  { name: 'default', colors: undefined },
  { name: 'ember', colors: { c1: '#ff9d4d', c2: '#ff4d2e', c3: '#ffd18a' } },
  { name: 'mint', colors: { c1: '#6ee7c8', c2: '#22d3ee', c3: '#a7f3d0' } },
  { name: 'violet', colors: { c1: '#c4b5fd', c2: '#8b5cf6', c3: '#f0abfc' } },
]
</script>
```
::

The bloom is painted with the orb's own `c2` rather than a theme colour, so the
glow reads as light escaping the disc instead of a halo pasted behind it. Pass a
wildly darker `c2` and the orb loses its glow even though nothing about the disc
looks wrong — that channel is doing double duty.

## Accessibility

The orb is decorative and marked `aria-hidden="true"`, so it contributes nothing
to the accessibility tree. That is deliberate: a purely visual ambient element
should be skipped rather than announced as an unlabelled graphic.

If `state` changes mean something to a user — an assistant that failed, is
listening, is thinking — expose that yourself:

```vue
<p aria-live="polite" class="sr-only">{{ statusLabel }}</p>
```

::tip
`saturate()` and `hue-rotate()` are applied to the disc, not the wrapper, so the
`error` state keeps its red even when a parent sets a `filter` on the whole
tree. Scope filters to the wrapper and you lose the state signal.
::

## Performance

- The ambient rotation is a CSS `@property` angle on a conic gradient, animated
  by the compositor. It never triggers a Vue update.
- Amplitude-driven scale and blur come from `useTransform` over your `MotionValue`,
  so a 60Hz audio stream costs no component renders.
- The current state is mirrored into `useMotionValue`s (`stateScale`,
  `reactivity`, `blurBaseline`) rather than read inside the transformer. A
  `useTransform` only recomputes when one of its *inputs* changes, so reading a
  computed inside it would leave the disc on the previous state's scale and blur
  until the next amplitude tick — which, with a silent microphone, may never
  arrive.
- `reduced-motion` is re-read through a watcher, because the media query can
  flip while the page is open. When it flips, every ambient animation is
  disabled and the amplitude only changes the disc's blur.

## Notes

- `reduced-motion` support means the orb stops rotating and stops bloomed
  breathing, but the disc is still rendered. If your interface is nothing but
  this orb, hide it under `prefers-reduced-motion` instead.
- The disc is masked at `24px` from its edge. That is a hard geometry constant,
  not a prop — raising it changes the silhouette, which is not a look most
  callers want.
- The `AIState` and `colors` prop types are declared inline on the component
  rather than imported. The dev server resolves a component's props through the
  browser-side `compileScript` path, which cannot follow a filesystem import.