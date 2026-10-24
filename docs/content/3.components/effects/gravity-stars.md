---
title: Gravity Stars
description: A drifting starfield whose stars fall towards the pointer, swirl past it and settle back into ambient parallax.
---

A canvas starfield with depth. Every star gets a seeded position, a drift
vector and a tint step, and the pool is drawn from a small atlas of radial
gradient sprites: one `drawImage` per star instead of a gradient or a shadow
blur per particle.

Nearer stars are larger, brighter and drift faster, which is the parallax that
makes the field read as a sky rather than flat noise. Moving the pointer opens a
softened gravity well, so stars accelerate in, curve around it and are flung back
out carrying momentum before the damping settles them.

## Usage

The wrapper fills whatever size you give it, so set a height. Anything in the
default slot is painted above the field.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="gravity-stars-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center px-6 py-10">
    <MGravityStars
      class="h-[380px] w-full max-w-2xl rounded-2xl bg-[#070b16] ring-1 ring-white/10"
      color="#e8eaf0"
    >
      <div class="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <span class="rounded-full border border-white/15 px-3 py-1 text-[11px] tracking-[0.2em] text-white/50 uppercase">
          Interactive
        </span>
        <h2 class="text-2xl font-semibold text-white">
          Move your cursor
        </h2>
        <p class="max-w-xs text-sm leading-relaxed text-white/60">
          Stars fall towards the pointer, swirl past it and settle back into
          their drift.
        </p>
      </div>
    </MGravityStars>
  </div>
</template>
```
::

The starfield is decorative: the slot is where real content belongs.

## Customize

`count` sets the pool size, `starSize` the base radius and `glow` the halo
multiplier. `tint` spreads stars between a cool blue-white and a warm amber, and
`twinkle` sets how strongly each star's brightness oscillates.

`connect` draws thin links between stars that are closer than
`connectDistance`, with alpha falling off by distance and depth. `gravity`
strengthens the pointer well, `drag` is the per-frame velocity damping, and
`speed` multiplies the ambient drift. `paused` freezes the current frame.

`color` accepts any CSS colour, a `var(--token)` expression, or a bare custom
property name such as `--ui-text-highlighted`. Theme tokens are resolved against
the live element, so the field follows light and dark mode.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="gravity-stars-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 px-6 py-10">
    <MGravityStars
      class="h-[360px] w-full max-w-2xl rounded-2xl bg-[#060a14] ring-1 ring-white/10"
      :connect="connect"
      :connect-distance="80"
      :count="260"
      color="#dbeafe"
      :glow="6"
      :paused="paused"
      :tint="0.8"
      :twinkle="0.35"
    >
      <div class="flex h-full flex-col items-center justify-center gap-2 text-center">
        <p class="text-lg font-medium text-white">
          {{ paused ? 'Frozen' : 'Drifting' }}
        </p>
        <p class="text-xs text-white/50">
          {{ connect ? 'Constellations on' : 'Constellations off' }} · 260 stars
        </p>
      </div>
    </MGravityStars>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <UButton
        :label="paused ? 'Resume' : 'Pause'"
        :icon="paused ? 'i-lucide-play' : 'i-lucide-pause'"
        color="neutral"
        variant="outline"
        size="sm"
        @click="paused = !paused"
      />
      <UButton
        :label="connect ? 'Hide links' : 'Show links'"
        icon="i-lucide-share-2"
        color="neutral"
        variant="outline"
        size="sm"
        @click="connect = !connect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paused = ref(false)
const connect = ref(true)
</script>
```
::

## Props

::component-props
  ::component-prop{name="color" type="string" default="'var(--ui-text-highlighted)'"}
  Base star colour. Accepts any CSS colour, a `var()` expression, or a bare custom property name.
  ::
  ::component-prop{name="count" type="number" default="220"}
  Number of stars in the pool, clamped between 8 and 600.
  ::
  ::component-prop{name="starSize" type="number" default="1.5"}
  Base star radius in CSS pixels, before the depth multiplier.
  ::
  ::component-prop{name="glow" type="number" default="5.5"}
  Halo radius multiplier for the sprite. 1 is a bare dot, 8 is a bloom.
  ::
  ::component-prop{name="tint" type="number" default="0.5"}
  How far stars are tinted towards cool blue-white and warm amber, from 0 to 1.
  ::
  ::component-prop{name="twinkle" type="number" default="0.55"}
  Brightness oscillation amount, from 0 (steady) to 1 (strong).
  ::
  ::component-prop{name="connect" type="boolean" default="true"}
  Draw distance-faded links between nearby stars.
  ::
  ::component-prop{name="connectDistance" type="number" default="130"}
  Maximum distance in CSS pixels at which two stars are linked.
  ::
  ::component-prop{name="gravity" type="number" default="1"}
  Strength of the pointer gravity well.
  ::
  ::component-prop{name="drag" type="number" default="0.03"}
  Velocity damping per frame, from 0 (frictionless) to 1 (frozen).
  ::
  ::component-prop{name="speed" type="number" default="1"}
  Ambient drift speed multiplier.
  ::
  ::component-prop{name="paused" type="boolean" default="false"}
  Freezes the animation on the current frame.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the positioned wrapper.
  ::
::

## Slots

::component-props
  ::component-prop{name="default" type="slot"}
  Foreground content, painted above the starfield. The field itself is
  `aria-hidden`.
  ::
::

## Accessibility

- The canvas and the fallback texture are `aria-hidden` and `pointer-events-none`.
  The slot is the only content assistive technology reads, so put real text
  there instead of relying on the stars.
- Nothing here needs the pointer. The gravity well is an enhancement; the
  ambient drift is the baseline and the slot stays fully readable either way.
- Under `prefers-reduced-motion: reduce` the loop never starts: the component
  paints one static frame and stops, and the pointer well is never sampled.
  Setting `paused` does the same on demand.
- The field never encodes state or meaning, so the tint and brightness spread
  are decoration rather than a signal.

## Performance

- Stars live in typed arrays. A frame updates positions and velocities in place,
  so there is no per-star object allocation and no reactive state per particle.
- One 128px sprite atlas is painted per tint step and blitted once per star,
  which is cheaper than a gradient or `shadowBlur` per particle.
- Links come from a uniform-grid counting sort. Only forward neighbours are
  tested, so each pair is compared once, and segments are batched into one
  `stroke` call per alpha bucket instead of one per pair.
- The backing store is capped at 2x device pixel ratio and resized through a
  `ResizeObserver`. Positions are scaled rather than reseeded when the size
  changes.
- The frame loop only runs while the wrapper is on screen and the tab is
  visible. Off screen, hidden, paused or reduced motion all fall back to a
  single static paint, and narrow containers reduce the pool automatically.
