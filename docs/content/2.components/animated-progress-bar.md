---
title: Animated Progress Bar
description: A progress bar whose fill springs to the new value, with an optional shimmer sweep.
navigation:
  icon: i-lucide-chart-bar
---

# Animated Progress Bar

A progress bar that springs to its new value instead of tweening. The fill runs on
a `{ stiffness: 100, damping: 10, mass: 0.75 }` spring, so a value that changes
while it is still moving redirects rather than restarting. `shimmer` adds a
single gradient sweep that repeats every 1.5s, for the "something is happening
here" case where the value itself is not moving.

The bar you see is an overlay. A real `UProgress` sits underneath with its
indicator forced to `opacity-0`, and the component measures the track and the
hidden indicator at mount to copy their geometry and colour — which is why
`color` and `size` are forwarded to `UProgress` and then read back off it instead
of being applied twice.

Set `orientation="vertical"` and there is no animation at all: the overlay is
rendered only for horizontal bars, and a vertical bar gets the theme's own static
indicator.

## Usage

Drive it with `value`. Add `label` for visible text, `status` for a percentage,
and `shimmer` for an indeterminate-looking sweep on top of a known value.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-progress-bar-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <MAnimatedProgressBar
      :value="progress"
      :max="100"
      label="Uploading assets"
      status
      shimmer
      color="primary"
    />

    <div class="flex items-center gap-3">
      <UButton
        size="sm"
        label="Advance"
        icon="i-lucide-play"
        @click="advance"
      />
      <UButton
        size="sm"
        label="Reset"
        variant="outline"
        color="neutral"
        @click="progress = 0"
      />
      <span class="text-xs tabular-nums text-muted">{{ progress }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const progress = ref(18)

function advance() {
  progress.value = progress.value >= 100 ? 0 : Math.min(100, progress.value + 24)
}
</script>
```
::

## Props

::field-group
  ::field{name="value" type="number" default="0"}
  The fill percentage, clamped to `0`–`100` before anything else happens. This is
  a one-way input — the component never writes back, so it does not emit a model
  update.
  ::
  ::field{name="label" type="string"}
  Rendered in a `<div>` above the bar. It is visible text only; it is not wired
  to the progressbar's accessible name.
  ::
  ::field{name="status" type="boolean" default="false"}
  Forwarded to `UProgress`, which adds the percentage and makes the fill
  indeterminate past the end of the range. It also decides whether the `status`
  slot is rendered at all.
  ::
  ::field{name="shimmer" type="boolean" default="false"}
  Adds a white gradient sweeping across the filled portion on a 1.5s linear
  repeat. Driven by an infinite CSS-transform animation, not a timer.
  ::
  ::field{name="color" type="string" default="'primary'"}
  Forwarded to `UProgress`. The overlay's fill colour is read back from the
  resulting indicator's computed `background-color`, so this is what decides the
  bar's colour.
  ::
  ::field{name="size" type="'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'"}
  Forwarded to `UProgress`. The track's height and the fill's radius are measured
  off the result rather than hardcoded, so any size works and a re-measure is
  triggered on change.
  ::
  ::field{name="max" type="number | number[]"}
  Forwarded to `UProgress`, and additionally caps what the hidden progress
  reports. An array switches on stepped mode: the array's entries become step
  labels through the `step-N` slots, and the effective maximum is
  `length - 1`. See the tip — the visible bar does not follow this.
  ::
  ::field{name="orientation" type="'horizontal' | 'vertical'" default="'horizontal'"}
  Forwarded to `UProgress`. Only `'horizontal'` is animated; a vertical bar renders
  no overlay.
  ::
  ::field{name="inverted" type="boolean" default="false"}
  Forwarded to `UProgress`, which fills from the opposite end.
  ::
  ::field{name="animation" type="'carousel' | 'carousel-inverse' | 'swing' | 'elastic'"}
  Forwarded to `UProgress` for its status animation. Suppressed on the hidden
  indicator, so it applies to the underlying component rather than the overlay.
  ::
  ::field{name="className" type="string" default="''"}
  Extra classes for the outer wrapper, which is `relative w-full`.
  ::
  ::field{name="barClassName" type="string" default="''"}
  Extra classes for the animated fill. Merged after `h-full overflow-hidden`.
  ::
  ::field{name="labelClassName" type="string" default="''"}
  Extra classes for the label, merged after `mb-1 font-medium text-sm`.
  ::
  ::field{name="ui" type="Record<string, any>"}
  Forwarded to `UProgress`, with `opacity-0 transition-none` appended to
  `indicator`. That is deliberate: the real indicator must not be visible and must
  not animate, or it would fight the overlay.
  ::
::

## Slots

::field-group
  ::field{name="status" type="{ percent }"}
  Replaces the percentage readout. Only rendered when `status` is set or this slot
  is supplied. The fallback prints `{{ percent }}%`.
  ::
  ::field{name="step-N" type="{ step }"}
  One slot per entry in an array `max`, labelled `step-0`, `step-1`, and so on.
  Each renders under the bar. The fallback prints the entry itself.
  ::
::

## Accessibility

The real `UProgress` underneath supplies everything: Reka UI's `ProgressRoot`
carries `role="progressbar"` with `aria-valuenow`, `aria-valuemin`,
`aria-valuemax` and `aria-valuetext`. The animated overlay is a plain `<div>`
with no ARIA, so the number is exposed once and the bar's motion is invisible to
assistive technology.

The gap is the name. `label` is rendered in a sibling `<div>` and nothing links
it to the progressbar — there is no `aria-labelledby`, and because the component
does not set `inheritAttrs: false` any `aria-label` you add lands on the outer
wrapper rather than on the progressbar itself. If a name matters, put an
`aria-label` on a wrapping element with `role="region"`, or announce the value
from your own live region.

`prefers-reduced-motion` is read through `useReducedMotion()`. Both the fill
spring and the shimmer sweep collapse to `{ duration: 0 }`, so the bar jumps to
its value and the shimmer does not move. The value is still exposed correctly,
because it is read from the progressbar's ARIA and not from the animation.

## Performance

- The real indicator is neutralised through the `ui` merge rather than by an
  extra wrapper, so there is exactly one visible bar and no duplicated DOM
  fighting for the same track.
- `measure()` runs once on mount, from a `ResizeObserver` on the root, and again
  on the next tick whenever `status`, `label`, `shimmer`, `size`, `color` or `max`
  changes — the cases where the track can move. The observer disconnects on
  unmount.
- The overlay's colour and radius are read from `getComputedStyle` on the hidden
  indicator and the track, so the bar always matches the theme rather than
  restating its colours as props.
- `value` is clamped to `0`–`100` and then capped at `max`, so an out-of-range
  value cannot overflow the track.
- The shimmer is a `200%`-wide gradient child sweeping `x` from `-100%` to `100%`
  on a 1.5s linear repeat — one infinite transform animation, no `setInterval`.
- Unlike the rest of this set, the fill animates **`width`**, not a transform.
  That is a layout-animating property; the cost is contained to one absolutely
  positioned overlay inside a fixed-size track.
- No timers, no `requestAnimationFrame`, and nothing re-renders per frame.

::tip
`max` is applied to the hidden progress but not to the visible bar. The bar
animates `value` capped to `0`–`100` and used directly as a percentage of the
track, while `UProgress` receives `min(clampedValue, max)`. With `:max="50"` and
`value="50"` the bar stops at half the track while the progress underneath reports
100%; with `:max="200"` the bar is full at `value="150"` while the progress
reports 50%. An array `max` is worse — its effective maximum is `length - 1`, so
`[0, 25, 50, 75, 100]` with `value="4"` leaves the bar at 4% while the progress
reports 100%. Leave `max` unset when the bar is what the user should be reading.
::
