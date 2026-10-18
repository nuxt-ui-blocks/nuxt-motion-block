---
title: Border Beam
description: A comet of light that travels around a box's border as a stroked dash.
---

A glow that runs around the edge of a box. Wrap any content in it and a comet of
light laps the border on its own.

The comet is not a sprite moving along a track — it is the border path itself,
stroked as a dash. Four dashes of the same gradient stack into a tapered tail and
accumulate into a bright head, and one wider, blurred dash behind them is the
halo. Only `stroke-dashoffset` moves, and because the dashes are stroked along
the same `d` as the border, the light bends through the corners by construction
and can never leave the outline.

The border itself is a separate hairline path, deliberately kept off the beam
gradient. That is what lets `colorFrom` and `colorTo` be as bright as a glow needs
without turning the resting border into a coloured stripe. The halo goes further
and mixes both stops 68% towards white before using them, because blurring a dark
stroke darkens its fringe — a glow is light by definition, and a dark blur reads
as a shadow.

The element is measured, not assumed. A `ResizeObserver` keeps the path in step
with the box, and the real perimeter from `getTotalLength()` is what normalises
`size` from pixels into the path's own units.

## Usage

Wrap content and set `radius` to match the corner radius you put on `class` — the
root gets its radius from the prop when it is a number, so the beam's path and
your CSS agree. `colorFrom` and `colorTo` are plain CSS colours.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-beam-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-5">
    <MBorderBeam
      class="rounded-2xl p-6"
      :beams="3"
      :duration="7"
      :size="90"
      color-from="#a5b4fc"
      color-to="#f0abfc"
    >
      <div class="flex flex-col gap-1">
        <p class="text-xs uppercase tracking-widest text-muted">
          Three beams, seven seconds
        </p>
        <p class="text-xl font-semibold">
          Phase-offset around the loop
        </p>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl p-6"
      radius="squircle"
      :size="140"
      :duration="4"
      reverse
      pause-on-hover
      color-from="#fde68a"
      color-to="#fdba74"
    >
      <div class="flex flex-col gap-1">
        <p class="text-xs uppercase tracking-widest text-muted">
          Squircle corners, reversed, pauses on hover
        </p>
        <p class="text-xl font-semibold">
          Corners included
        </p>
      </div>
    </MBorderBeam>
  </div>
</template>
```
::


## Examples

### Corner geometry

`radius` accepts a number — clamped to half the shorter side — or `'squircle'` for
cubic corners. A numeric value also sets the root's CSS `border-radius`, so any fill
inside the beam stays rounded with it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-beam-corners" />
  :::
#code
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-2xl">
    <MBorderBeam
      class="flex min-h-28 items-center justify-center rounded-lg bg-elevated/40 p-6"
      :radius="8"
      :size="72"
      :duration="4"
      color-from="#7dd3fc"
      color-to="#0ea5e9"
    >
      <div class="text-center">
        <p class="text-sm font-semibold text-highlighted">
          radius 8
        </p>
        <p class="text-xs text-muted">
          Tight corners
        </p>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="flex min-h-28 items-center justify-center rounded-full bg-elevated/40 p-6"
      :radius="999"
      :size="96"
      :duration="4.5"
      color-from="#c4b5fd"
      color-to="#8b5cf6"
    >
      <div class="text-center">
        <p class="text-sm font-semibold text-highlighted">
          radius 999
        </p>
        <p class="text-xs text-muted">
          Pill ends
        </p>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="flex min-h-28 items-center justify-center p-6"
      radius="squircle"
      :size="96"
      :duration="6"
      color-from="#fda4af"
      color-to="#f43f5e"
    >
      <div class="text-center">
        <p class="text-sm font-semibold text-highlighted">
          squircle
        </p>
        <p class="text-xs text-muted">
          Cubic corners
        </p>
      </div>
    </MBorderBeam>
  </div>
</template>
```
::

### Multiple beams

`beams` phase-offsets comets evenly around the loop — each one starts a fraction of
a lap after the last, so a fresh beam never overlaps the one ahead of it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-beam-beams" />
  :::
#code
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-2xl">
    <MBorderBeam
      class="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl bg-elevated/40 p-6"
      :beams="1"
      :size="88"
      :duration="5"
      color-from="#5eead4"
      color-to="#14b8a6"
    >
      <p class="text-3xl font-semibold text-highlighted">
        1
      </p>
      <p class="text-xs uppercase tracking-wide text-muted">
        beam
      </p>
    </MBorderBeam>

    <MBorderBeam
      class="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl bg-elevated/40 p-6"
      :beams="2"
      :size="88"
      :duration="5"
      color-from="#93c5fd"
      color-to="#3b82f6"
    >
      <p class="text-3xl font-semibold text-highlighted">
        2
      </p>
      <p class="text-xs uppercase tracking-wide text-muted">
        beams
      </p>
    </MBorderBeam>

    <MBorderBeam
      class="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl bg-elevated/40 p-6"
      :beams="3"
      :size="88"
      :duration="5"
      color-from="#d8b4fe"
      color-to="#a855f7"
    >
      <p class="text-3xl font-semibold text-highlighted">
        3
      </p>
      <p class="text-xs uppercase tracking-wide text-muted">
        beams
      </p>
    </MBorderBeam>
  </div>
</template>
```
::

### Colors

`colorFrom` is the tail, `colorTo` is the head. Both are plain CSS colors, so theme
tokens and CSS variables work as well as hex values.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-beam-colors" />
  :::
#code
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
    <MBorderBeam
      class="rounded-2xl bg-elevated/40 p-5"
      :size="80"
      :duration="5"
      color-from="#fca5a5"
      color-to="#ef4444"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm font-semibold text-highlighted">
          Sunset
        </p>
        <div class="flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#fca5a5]" />
          <span class="size-3 rounded-full bg-[#ef4444]" />
        </div>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl bg-elevated/40 p-5"
      :size="80"
      :duration="5.5"
      color-from="#6ee7b7"
      color-to="#10b981"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm font-semibold text-highlighted">
          Emerald
        </p>
        <div class="flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#6ee7b7]" />
          <span class="size-3 rounded-full bg-[#10b981]" />
        </div>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl bg-elevated/40 p-5"
      :size="80"
      :duration="4.8"
      color-from="#67e8f9"
      color-to="#0ea5e9"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm font-semibold text-highlighted">
          Lagoon
        </p>
        <div class="flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#67e8f9]" />
          <span class="size-3 rounded-full bg-[#0ea5e9]" />
        </div>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl bg-elevated/40 p-5"
      :size="80"
      :duration="5.2"
      color-from="#f0abfc"
      color-to="#c026d3"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm font-semibold text-highlighted">
          Orchid
        </p>
        <div class="flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#f0abfc]" />
          <span class="size-3 rounded-full bg-[#c026d3]" />
        </div>
      </div>
    </MBorderBeam>
  </div>
</template>
```
::

### Reverse and pause

`reverse` sends the comet counter-clockwise; `pauseOnHover` freezes it under a fine
pointer. Toggling `active` removes the comet entirely and leaves the resting border.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-beam-reverse" />
  :::
#code
```vue
<template>
  <MBorderBeam
    class="w-full max-w-sm rounded-2xl bg-elevated/50 p-6"
    :active="isActive"
    reverse
    pause-on-hover
    :size="100"
    :duration="5"
    color-from="#6ee7b7"
    color-to="#10b981"
  >
    <div class="flex flex-col items-center gap-3 text-center">
      <p class="text-sm text-muted">
        Travels counter-clockwise and freezes while you hover.
      </p>
      <UButton
        :icon="isActive ? 'i-lucide-pause' : 'i-lucide-play'"
        color="neutral"
        variant="outline"
        size="sm"
        :aria-pressed="isActive"
        @click="isActive = !isActive"
      >
        {{ isActive ? 'Stop' : 'Start' }}
      </UButton>
    </div>
  </MBorderBeam>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(true)
</script>
```
::

### In a card

The beam is happy on real content. Here it dresses a plan panel, with `size` and
`duration` tuned so the comet reads as slow and deliberate rather than urgent.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-beam-card" />
  :::
#code
```vue
<template>
  <MBorderBeam
    class="w-full max-w-sm rounded-3xl bg-elevated/60 p-6 shadow-xl"
    :beams="1"
    :size="110"
    :duration="7"
    color-from="#a5b4fc"
    color-to="#f0abfc"
  >
    <div class="flex flex-col gap-4">
      <div class="flex items-baseline justify-between">
        <p class="text-sm font-medium text-muted">
          Pro
        </p>
        <p class="text-2xl font-semibold text-highlighted">
          $20<span class="text-sm font-normal text-muted">/mo</span>
        </p>
      </div>

      <ul class="flex flex-col gap-2 text-sm text-muted">
        <li class="flex items-center gap-2">
          <UIcon
            name="i-lucide-check"
            class="size-4 text-primary"
          />
          Unlimited projects
        </li>
        <li class="flex items-center gap-2">
          <UIcon
            name="i-lucide-check"
            class="size-4 text-primary"
          />
          Priority support
        </li>
        <li class="flex items-center gap-2">
          <UIcon
            name="i-lucide-check"
            class="size-4 text-primary"
          />
          Custom domains
        </li>
      </ul>

      <UButton
        color="primary"
        block
      >
        Upgrade
      </UButton>
    </div>
  </MBorderBeam>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="border-beam-custom" />
  :::
#code
  <PlaygroundCode name="BorderBeam" />
::

## Reading the geometry

A few numbers in the source are worth knowing, because they explain what you see
when you push the props around.

`size` is an arc length in pixels, but a small box has a small perimeter, so the
comet's share of the border is clamped between 2% and 45%. Below that it vanishes
into a dot; above it it wraps most of the way round and stops reading as a comet.

`beams` phase-offsets along the loop — each beam starts at `index / count` of a
lap, so `beams: 3` gives three comets evenly spaced with none of them overlapping.
Every beam costs four core dashes plus one halo, so the dash count grows linearly.

The core is four layers and not six on purpose: each dash is semi-opaque and
composites over the last, so every extra one costs a paint and buys less taper than
the one before. The alpha steps land at 0.14 / 0.48 / 0.82 / 0.98 towards the
head, which is where the falloff stops reading as visible steps.

## Props

::component-props
  ::component-prop{name="active" type="boolean" default="true"}
  Keep the beams travelling. Setting it to `false` cancels the loop and removes
  the comet entirely — you are left with a plain hairline border at full opacity.
  ::
  ::component-prop{name="beams" type="number" default="1"}
  How many comets ride the border, evenly phase-offset around the loop. Rounded
  and floored at one. Each one adds four core dashes and one halo path.
  ::
  ::component-prop{name="size" type="number" default="72"}
  Arc length of each comet in pixels, measured along the border. Normalised
  against the real perimeter and then clamped between 2% and 45% of the loop.
  ::
  ::component-prop{name="duration" type="number" default="6"}
  Seconds for one full lap. Floored at `0.1`, below which a lap would finish
  inside a single frame.
  ::
  ::component-prop{name="delay" type="number" default="0"}
  Seconds to wait before the first lap. Progress below zero simply is not drawn,
  so the beam sits still at its initial offset during the delay.
  ::
  ::component-prop{name="colorFrom" type="string" default="'var(--color-brand)'"}
  Trailing colour of the beam gradient. The halo uses the same value mixed 68%
  towards white.
  ::
  ::component-prop{name="colorTo" type="string" default="'var(--color-brand-light)'"}
  Leading colour of the beam gradient, at the head of the comet.
  ::
  ::component-prop{name="borderWidth" type="number" default="1"}
  Thickness of the resting hairline border, in pixels. It also sets the path's
  inset — the outline is drawn half a width in, so the beam sits on the inner
  edge of the box rather than straddling it.
  ::
  ::component-prop{name="radius" type="number | 'squircle'" default="16"}
  Corner geometry of both the border and the travel path. A number sets the root's
  CSS `border-radius` too; `'squircle'` builds the path from cubic curves and
  leaves the root radius alone. A numeric radius is clamped to half the shorter
  side, so it never self-intersects on a small box.
  ::
  ::component-prop{name="reverse" type="boolean" default="false"}
  Travel counter-clockwise. The dash offset is mirrored so the tail still trails
  behind the head in the new direction rather than leading it.
  ::
  ::component-prop{name="pauseOnHover" type="boolean" default="false"}
  Freeze the beams while a fine pointer hovers the element. Gated on
  `(hover: hover) and (pointer: fine)`, so touch devices never pause.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root alongside `relative isolate`. The root carries no radius of
  its own unless `radius` is a number.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The content. It sits under the SVG, which is absolutely positioned, pointer
  transparent and stacked above with `z-10`. Keep interactive elements inside
  clear of the very edge or they will compete with the beam for the pointer.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.borderBeam` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative isolate`
  ::
  ::component-slot-row{name="svg"}
  `pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible`
  ::
  ::component-slot-row{name="halo"}
  `dark:mix-blend-plus-lighter`
  ::
::

## Accessibility

The SVG is `aria-hidden="true"` and `pointer-events-none`, so the effect adds
nothing to the accessibility tree and never intercepts a click. Your slot content
is the only thing exposed.

There is no keyboard behaviour and no way to pause from the keyboard.
`pauseOnHover` is a pointer affordance only.

Under `prefers-reduced-motion` the comet does not run at all: `isTravelling` goes
false, the loop is stopped and the comet group is removed from the DOM. What is
left is the static border — and note it brightens from 70% opacity to full, since
the dimmer opacity only exists to sit behind a moving beam.

The gradient ids are namespaced with Vue's `useId` rather than a random string,
because they are in the rendered markup and a per-render value would differ
between server and client. Two instances on one page therefore get distinct
gradients without a hydration mismatch.

## Performance

- The loop writes `stroke-dashoffset` directly onto collected path nodes. No Vue
  re-render per frame; the dash nodes are found once per loop start by their
  `data-beam-index`, not through function refs — a function ref is re-created
  every render and a rAF tick landing between its `null` and element calls reads
  a cleared slot and silently stops the animation.
- An `IntersectionObserver` keeps a scrolled-away element's loop running but skips
  every style write, so an off-screen beam costs no paint and no layout.
- A `ResizeObserver` re-measures the box and rebuilds the path, so the comet stays
  correct through layout changes without a window resize listener.
- The loop restarts only on scalar props — `active`, `beams`, `size`, `reverse`,
  `duration`, `delay`. Watching the dash-plan arrays instead would restart on
  every scheduler flush, resetting elapsed time and pinning the comet at its
  initial offset.
- Only `stroke-dashoffset` and a one-shot group opacity are animated; nothing
  triggers layout, and the halo and core each render inside a single blur filter.

::tip
The halo composites additively only in dark mode (`dark:mix-blend-plus-lighter`).
On a light surface an additive glow has no darkness to add light to and washes out
to nothing, so there it composites normally and simply tints — which is the
correct look for a glow on white, but it means `colorFrom` and `colorTo` read
differently across themes.
::

