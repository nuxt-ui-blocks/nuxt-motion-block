---
title: Power Off Slide
description: A destructive action behind a handle that has to be dragged the length of the track.
---

Some actions should cost a gesture. A confirm dialog asks the reader to read a
sentence and click a button they have clicked a thousand times, so the reading is
skipped and the click is muscle memory. A handle that has to travel across the
track is a different kind of cost: it takes a moment, and it cannot be done by
reflex.

The track is a fixed 224 px and the handle covers 48 of them, so the thumb
travels 168 px - enough that the pointer has to be held and aimed. Four fifths of
the way counts as arrival, so the gesture does not fail on the last few pixels,
and the thumb springs back if it is released early.

When it lands, the label cross-fades to "Shutting down…" and a sheen sweeps
across it. The track then returns after `duration`, so the control is usable
again without a remount.

## Usage

Bind `power-off` and let the surrounding page decide what shutting down means.
The control owns the gesture and the announcement, not the side effect.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="power-off-slide-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4">
    <MPowerOffSlide @power-off="handlePowerOff" />
    <p class="text-xs text-muted">
      {{ count === 0
        ? 'Drag the handle, or focus it and press Enter.'
        : `Powered off ${count} ${count === 1 ? 'time' : 'times'}.` }}
    </p>
  </div>
</template>

<script setup lang="ts">
const count = ref(0)

function handlePowerOff() {
  count.value += 1
}
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="power-off-slide-custom" />
  :::
#code
  <PlaygroundCode name="PowerOffSlide" />
::

## Props

::component-props
  ::component-prop{name="label" type="string" default="'Slide to power off'"}
  Printed on the track, and used as the handle's accessible name. Keep it an
  instruction rather than a state - the handle is a verb.
  ::
  ::component-prop{name="duration" type="number" default="2000"}
  How long the shutting-down state is held before the handle returns, in
  milliseconds. Long enough to read the label, short enough that the control does
  not feel stuck.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Disables the button and the drag. The track keeps its shape instead of
  disappearing, so a layout that depends on it does not reflow.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="powerOff" payload="[]"}
  The gesture completed - by drag past the threshold, by click, or by Enter or
  Space. Emitted once per completion; the handle ignores further input until it
  resets.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.powerOffSlide` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The centring wrapper.
  ::
  ::component-slot-row{name="track"}
  The fixed 224 × 56 rail. It is also what the handle is allowed to travel
  inside.
  ::
  ::component-slot-row{name="label"}
  The text that cross-fades to "Shutting down…". `pointer-events-none` keeps it
  from swallowing the start of a drag, and the `pl-8` offset keeps it clear of the
  resting handle.
  ::
  ::component-slot-row{name="handle"}
  The thumb. `touch-none` and `cursor-grab` belong here rather than on the
  wrapper, so a drag anywhere else does not fight the page scroll.
  ::
  ::component-slot-row{name="icon"}
  The power glyph, `text-error` by default.
  ::
::

## Accessibility

- The handle is a real `<button type="button">`, so it is in the tab order and
  announced as a button. Its `aria-label` is the track label rather than the
  icon.
- Enter and Space complete the action, so the destructive path is never
  drag-only. A gesture that can only be performed by dragging would fail anyone
  navigating with a keyboard.
- Clicking the handle completes it as well. The drag is the expressive path, not
  the only one.
- While the track is shutting down, `aria-disabled` is set and the handle refuses
  further input until it returns, so a double gesture cannot emit twice.
- A visually hidden `role="status"` announces "Shutting down…". The visible label
  is not in a live region, so the message is heard once rather than twice.
- `disabled` disables the button itself, not just the styling, so it is skipped
  by keyboard navigation and by assistive technology.
- Under `prefers-reduced-motion: reduce` dragging is turned off entirely and the
  thumb jumps to the end; the track still works by click or by key. The label
  cross-fade loses its duration instead of its text.

## Performance

- The drag has no momentum and no elasticity, so there is no inertial simulation
  to settle and no overshoot past the end of the track.
- Arrival and reset are two calls on the same motion value, and the reset timer
  is cleared before the arrival animation starts, so there are never two
  animations writing to one value.
- Both timers are cleared on unmount. A fast route change cannot leave a pending
  "powered off" state behind.
- The sheen is a scoped CSS animation rather than a Motion loop, so it runs on the
  compositor and stops when the rule stops matching.
- Nothing is laid out per frame. The handle moves by `x`, the label by opacity and
  `y`, and the track is a fixed box.
