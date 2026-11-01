---
title: Confetti
description: A canvas burst of paper pieces, fired on demand.
---

Confetti draws its own paper pieces on a canvas, so a burst costs nothing until you ask for one. Mount the component once, then call `fire()` from a ref when something deserves celebrating.

Each piece gets its own launch angle, speed, colour and spin, then falls under gravity while it fades out. The animation loop shuts down as soon as the last piece lands, so an idle overlay burns no frames.

The overlay is fixed to the viewport and ignores pointer events by default. Override the `root` slot to park it inside a card instead.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="confetti-example" />
  :::
#code
```vue
<script setup lang="ts">
import { ref } from 'vue'

const confetti = ref<{ fire: (options?: Record<string, unknown>) => void } | null>(null)
</script>

<template>
  <div class="relative flex h-64 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-default bg-default">
    <MConfetti ref="confetti" :ui="{ root: 'absolute inset-0 z-10' }" />
    <button
      class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-inverted"
      @click="confetti?.fire({ particleCount: 120, spread: 70 })"
    >
      Celebrate
    </button>
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
    <component-example name="confetti-custom" />
  :::
#code
```vue
<script setup lang="ts">
import { ref } from 'vue'

const confetti = ref<{ fire: (options?: Record<string, unknown>) => void } | null>(null)

const presets = [
  { label: 'Wide spray', options: { particleCount: 140, spread: 80 } },
  { label: 'Tight fountain', options: { particleCount: 60, spread: 20, duration: 3 } },
  { label: 'Left corner', options: { particleCount: 70, spread: 55, x: 40, y: 220 } },
]
</script>

<template>
  <div class="relative flex h-64 w-full flex-wrap items-center justify-center gap-3 overflow-hidden rounded-xl border border-default bg-default">
    <MConfetti ref="confetti" :ui="{ root: 'absolute inset-0 z-10' }" />
    <button
      v-for="preset in presets"
      :key="preset.label"
      class="rounded-lg border border-default bg-elevated px-4 py-2 text-sm font-medium text-highlighted"
      @click="confetti?.fire(preset.options)"
    >
      {{ preset.label }}
    </button>
  </div>
</template>
```
::

## Methods

::component-props
  ::component-prop{name="fire" type="(options?: ConfettiFireOptions) => void"}
  Launches one burst. Safe to call while a previous burst is still falling, and a no-op when the visitor has asked for reduced motion.
  ::
::

### `fire()` options

::component-props
  ::component-prop{name="particleCount" type="number"}
  Pieces to launch. Defaults to the `particleCount` prop.
  ::

  ::component-prop{name="spread" type="number"}
  Half-angle of the launch cone, in degrees. `90` sprays a full circle. Defaults to the `spread` prop.
  ::

  ::component-prop{name="duration" type="number"}
  Seconds the burst lasts. Defaults to the `duration` prop.
  ::

  ::component-prop{name="colors" type="string[]"}
  Colours to draw from. Defaults to the `colors` prop.
  ::

  ::component-prop{name="x" type="number"}
  Horizontal launch point, in pixels from the canvas edge. Defaults to the centre.
  ::

  ::component-prop{name="y" type="number"}
  Vertical launch point, in pixels from the canvas edge. Defaults to the centre.
  ::
::

## Props

::component-props
  ::component-prop{name="particleCount" type="number" default="80"}
  Pieces launched per burst.
  ::

  ::component-prop{name="spread" type="number" default="60"}
  Half-angle of the launch cone, in degrees. `90` sprays a full circle.
  ::

  ::component-prop{name="duration" type="number" default="2.4"}
  Seconds a burst lasts. Each piece fades out somewhere between three quarters of this and the full value.
  ::

  ::component-prop{name="colors" type="string[]" default="['#22d3ee', '#a855f7', '#f97316', '#22c55e', '#facc15']"}
  Colours a burst picks from, cycled in order.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the overlay.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.confetti` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `pointer-events-none fixed inset-0 z-50`
  ::
  ::component-slot-row{name="canvas"}
  `size-full`
  ::
::
