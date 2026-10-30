---
title: Circular Progress
description: A ring that fills to a value and eases into every change.
---

Circular Progress draws a track and an indicator on an SVG circle, then animates the indicator's `stroke-dashoffset` from empty to the current value. Because the ring is one path rather than a clipped rectangle, it follows any diameter and thickness without extra layout.

Changing `value` animates from wherever the ring currently sits, so a stream of updates reads as a smooth climb rather than a series of jumps. The ring holds at its final value when the visitor has asked for reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="circular-progress-example" />
  :::
#code
```vue
<script setup lang="ts">
const rings = [
  { value: 72, size: 132, caption: 'Storage' },
  { value: 45, size: 108, caption: 'Memory' },
  { value: 91, size: 84, caption: 'CPU' },
]
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-center gap-8 py-6">
    <MCircularProgress
      v-for="ring in rings"
      :key="ring.caption"
      :value="ring.value"
      :size="ring.size"
      :caption="ring.caption"
    />
  </div>
</template>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="circular-progress-custom" />
  :::
#code
  <PlaygroundCode name="CircularProgress" />
::

## Props

::component-props
  ::component-prop{name="value" type="number" default="0"}
  Progress from `0` to `100`. Values outside that range are clamped.
  ::

  ::component-prop{name="size" type="number" default="140"}
  Diameter of the ring, in pixels. The stroke is drawn inside this box.
  ::

  ::component-prop{name="strokeWidth" type="number" default="10"}
  Thickness of the ring, in pixels.
  ::

  ::component-prop{name="duration" type="number" default="1.1"}
  Seconds the ring takes to reach a new value.
  ::

  ::component-prop{name="showLabel" type="boolean" default="true"}
  Draw the percentage in the middle of the ring. Turn it off when the ring is decoration.
  ::

  ::component-prop{name="caption" type="string" default="undefined"}
  Text under the percentage, for a short label like `Storage`.
  ::

  ::component-prop{name="label" type="string" default="undefined"}
  Accessible description of the ring. Defaults to the current percentage.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the wrapper.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Replaces the percentage and caption in the middle of the ring.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.circularProgress` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-flex items-center justify-center`
  ::
  ::component-slot-row{name="svg"}
  `-rotate-90`
  ::
  ::component-slot-row{name="track"}
  `stroke-current text-muted/20`
  ::
  ::component-slot-row{name="indicator"}
  `stroke-current text-primary`
  ::
  ::component-slot-row{name="label"}
  `absolute inset-0 flex flex-col items-center justify-center text-highlighted`
  ::
  ::component-slot-row{name="value"}
  `text-lg font-semibold tabular-nums`
  ::
  ::component-slot-row{name="caption"}
  `text-xs text-muted`
  ::
::

## Accessibility

The ring is a `role="img"` with a label that spells out the value, so a screen reader hears "72% complete" instead of nothing. The digits in the middle are inside that labelled image and stay legible without a second announcement. Because the value is also readable as text, the ring never has to carry the number on its own.
