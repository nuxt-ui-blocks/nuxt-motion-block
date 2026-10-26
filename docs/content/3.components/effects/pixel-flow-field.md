---
title: Pixel Flow Field
description: A word or image rasterised into a grid of cells and set adrift by a noise flow field, with a pointer wake that scatters cells as you move.
---

A canvas grid where every cell carries a coverage value sampled from a source:
`text` is rasterised into the grid once, or an image is fitted and sampled the
same way. Coverage decides the cell's colour and size, so a heavy word survives
the grid and a thin one fades into the background.

Motion comes from a coarse noise lattice, one sample per 4x4 block of cells,
bilinearly filtered per cell. That keeps the field organic and continuous while
the per-frame cost stays proportional to the cell count rather than the lattice.
Moving the pointer stamps a decaying impulse along the travelled segment, so a
fast flick leaves a trail and the grid settles back into its flow.

## Usage

Pass `text` or `src`, and give the wrapper a height. Anything in the default slot
is painted above the field.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="pixel-flow-field-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-3 px-6 py-10">
    <MPixelFlowField
      class="h-[360px] w-full max-w-2xl rounded-2xl border border-default bg-elevated"
    />
    <p class="text-xs text-muted">
      Move the pointer across the field.
    </p>
  </div>
</template>
```
::

The grid densifies on narrow surfaces so the word stays legible instead of
collapsing into too few cells per glyph.

## Customize

`cellSize` and `gap` set the grid rhythm. `shape` draws each cell as a square, a
circle or a cross. `colors` is a three-stop ramp from dim to bright: cells the
source does not cover sit on the first stop, fully covered cells on the last,
and the accent sits between them.

`speed` multiplies the flow, `pointerRadius` and `pointerStrength` tune the
wake, and `paused` freezes the current frame. Bumping `scatter` blows the grid
apart and lets it re-form with a fresh deterministic seed.

`colors` accepts CSS colours, `var(--token)` expressions, or bare custom property
names. Tokens are resolved against the live element, so the field follows light
and dark mode.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="pixel-flow-field-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 px-6 py-10">
    <MPixelFlowField
      class="h-[340px] w-full max-w-2xl rounded-2xl border border-default bg-elevated"
      :paused="paused"
      :scatter="seed"
      :shape="shape"
      :speed="0.8"
      :text="word"
    />

    <div class="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2">
      <UButton
        v-for="option in words"
        :key="option"
        :label="option"
        :color="option === word ? 'primary' : 'neutral'"
        :variant="option === word ? 'solid' : 'outline'"
        size="sm"
        @click="word = option"
      />
    </div>

    <div class="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2">
      <UButton
        v-for="option in shapes"
        :key="option.value"
        :label="option.label"
        :color="option.value === shape ? 'primary' : 'neutral'"
        :variant="option.value === shape ? 'solid' : 'outline'"
        size="sm"
        @click="shape = option.value"
      />
    </div>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <UButton
        label="Re-scatter"
        icon="i-lucide-sparkles"
        color="neutral"
        variant="outline"
        size="sm"
        @click="seed += 1"
      />
      <UButton
        :label="paused ? 'Resume' : 'Pause'"
        :icon="paused ? 'i-lucide-play' : 'i-lucide-pause'"
        color="neutral"
        variant="outline"
        size="sm"
        @click="paused = !paused"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Shape = 'square' | 'circle' | 'cross'

const words = ['motion', 'flow', 'pixel']
const shapes: { label: string, value: Shape }[] = [
  { label: 'Square', value: 'square' },
  { label: 'Circle', value: 'circle' },
  { label: 'Cross', value: 'cross' },
]

const word = ref('motion')
const shape = ref<Shape>('square')
const paused = ref(false)
const seed = ref(0)
</script>
```
::

`text` is re-rasterised whenever the word, weight or grid size changes, and an
image that cannot be read because of CORS falls back to the text path.

## Props

::component-props
  ::component-prop{name="text" type="string" default="'motion'"}
  Word sampled into the grid. Short words read best.
  ::
  ::component-prop{name="src" type="string"}
  Image URL sampled instead of `text`. Needs to be CORS-readable.
  ::
  ::component-prop{name="cellSize" type="number" default="8"}
  Cell size in CSS pixels. Smaller cells read the source more sharply.
  ::
  ::component-prop{name="gap" type="number" default="3"}
  Gap between cells in CSS pixels.
  ::
  ::component-prop{name="shape" type="'square' | 'circle' | 'cross'" default="'square'"}
  Shape drawn for every cell.
  ::
  ::component-prop{name="colors" type="string[]" default="['var(--ui-text-dimmed)', 'var(--ui-primary)', 'var(--ui-text-highlighted)']"}
  Three ramp stops, dim to bright: `[field, accent, ink]`.
  ::
  ::component-prop{name="speed" type="number" default="1"}
  Flow speed multiplier. 1 is the calibrated default.
  ::
  ::component-prop{name="pointerRadius" type="number" default="130"}
  Radius in CSS pixels within which the pointer disturbs cells.
  ::
  ::component-prop{name="pointerStrength" type="number" default="1"}
  How hard the pointer shoves cells, from 0 to 1.
  ::
  ::component-prop{name="scatter" type="number" default="0"}
  Increment to blow the field apart and let it re-form with a fresh seed.
  ::
  ::component-prop{name="paused" type="boolean" default="false"}
  Freezes the field on its current frame.
  ::
  ::component-prop{name="weight" type="number" default="800"}
  Font weight used when rasterising `text`. Heavy weights survive better.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the positioned wrapper.
  ::
::

## Slots

::component-props
  ::component-prop{name="default" type="slot"}
  Foreground content, painted above the field. The canvas itself is
  `aria-hidden`.
  ::
::

## Accessibility

- The canvas and the dotted fallback are `aria-hidden` and `pointer-events-none`.
  The slot is the only content assistive technology reads, so keep any real
  message there.
- The field is decorative and encodes nothing: the word is the same text passed
  through `text`, and the wake is an enhancement. Nothing needs the pointer.
- Under `prefers-reduced-motion: reduce` the loop never starts. The component
  paints one still frame with every cell at rest and the word fully legible, and
  the pointer is never sampled. `paused` does the same on demand.
- The source word is re-rasterised at grid resolution, so it stays crisp at any
  size without shipping an image.

## Performance

- Cells live in typed arrays. A frame reads the flow lattice, updates the wake in
  place and traces each cell into one path per brightness tier, so the whole grid
  costs one `fill()` per tier instead of one per cell.
- The source is rasterised into a `cols × rows` sampler canvas only when the grid,
  word, weight, family or image changes. It is never sampled from the frame loop.
- The flow field is refreshed on a lattice four cells wide, so each frame costs
  one pass over the lattice instead of one per cell. Bilinear interpolation gives
  every cell a smooth vector for free.
- The grid is coarsened rather than truncated when it would exceed 14,000 cells,
  and the backing store is capped at 2x device pixel ratio.
- The frame loop only runs while the wrapper is on screen and the tab is
  visible. Off screen, hidden, paused or reduced motion all fall back to a single
  static paint, and the reveal is deferred until the field first becomes visible.
