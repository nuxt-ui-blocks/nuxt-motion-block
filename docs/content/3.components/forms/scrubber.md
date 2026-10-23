---
title: Scrubber
description: A compact slider with a fill, tick marks and a value readout, driven by pointer capture and the keyboard.
---

A scrubber is the small horizontal slider found in photo and audio editors: a
track with a filled portion, a capsule thumb and a monospaced value on the right.
Pressing anywhere on the track jumps to that point; dragging keeps the pointer
captured, so the value keeps following even when the pointer leaves the element.

The component is an input, not a display. It owns no form state and formats
nothing beyond the decimals you ask for, which makes it usable for exposure,
volume, opacity or any other bounded number.

## Usage

`defaultValue` sets the starting point for an uncontrolled scrubber; `min`, `max`
and `step` describe the range. `label` is both the visible caption and the
accessible name.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="scrubber-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-6">
    <div class="w-full max-w-md space-y-3">
      <MScrubber
        label="Volume"
        :default-value="0.65"
        @change="volume = $event"
      />
      <p class="text-xs text-muted">
        {{ volume.toFixed(2) }} — drag the track or use the arrow keys.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const volume = ref(0.65)
</script>
```

::

Arrow keys move by one `step`, Home and End jump to the bounds, and the pointer
position is rounded to the nearest step before it is emitted. Dragging never
selects text on the page because pointer capture and `touch-action: none` are
both set on the track.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="scrubber-custom" />
  :::
#code
  <PlaygroundCode name="Scrubber" />
::

`ticks` draws evenly spaced marks inside the track and `0` hides them. `decimals`
only changes the readout and `aria-valuetext`; the emitted value keeps its full
precision from the step.

## Props

::component-props
  ::component-prop{name="defaultValue" type="number" default="0"}
  Starting value when the component keeps its own state.
  ::
  ::component-prop{name="value" type="number"}
  Controlled value. Leave it out to let the component keep its own and listen to
  `update:value`.
  ::
  ::component-prop{name="min" type="number" default="0"}
  Lower bound. Home jumps here.
  ::
  ::component-prop{name="max" type="number" default="1"}
  Upper bound. End jumps here.
  ::
  ::component-prop{name="step" type="number" default="0.01"}
  Increment for the arrow keys and the rounding grid for pointer input.
  ::
  ::component-prop{name="decimals" type="number" default="2"}
  Decimal places in the readout and in `aria-valuetext`.
  ::
  ::component-prop{name="ticks" type="number" default="9"}
  Number of tick marks drawn in the track. `0` hides them.
  ::
  ::component-prop{name="label" type="string" default="'Value'"}
  Visible caption and accessible name.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="update:value" type="(value: number) => void"}
  Fired on every change, including each pointer move and each arrow key. Use it
  with `value` for controlled usage.
  ::
  ::component-event{name="change" type="(value: number) => void"}
  Fired once when the pointer is released or a key is pressed. Use it for work
  that should not run on every pixel, such as saving a preference.
  ::
::

## Accessibility

- The track is a `role="slider"` with `tabindex="0"`, `aria-valuemin`,
  `aria-valuemax`, `aria-valuenow` and a formatted `aria-valuetext`. The label is
  wired through `aria-label`.
- Arrow keys move by one step, Home and End reach the bounds. All of them call
  `preventDefault`, so the page does not scroll while the slider has focus.
- The track has a visible focus ring and the thumb dims and shrinks when idle, so
  the control reads as interactive before it is touched.
- The thumbnail is `aria-hidden`; the value is exposed once through the slider
  role rather than duplicated in the readout.
- Under `prefers-reduced-motion` the thumb's spring becomes a zero-duration
  transition and the fill and thumb stop interpolating, so the value still tracks
  the pointer instantly.

## Performance

- Pointer moves write one `ref` and emit one event; there is no
  `requestAnimationFrame` loop and no measurement on every move beyond the
  track's cached rectangle read.
- The fill width and thumb position are plain CSS transitions on `width` and
  `left`; the only Motion-driven part is the thumb's opacity and scale.
- Tick marks are static spans computed from `ticks`, so changing the value never
  re-renders them.
- The hover state is gated by a `(hover: hover) and (pointer: fine)` media query,
  which keeps the enlarged thumb off touch devices where it would never settle.
