---
title: Duration Picker
description: A drag-and-keyboard friendly duration picker with animated digit transitions.
---

A time duration input that lets you adjust hours, minutes, and seconds by dragging vertically (or touching), using arrow keys, typing digits, or jumping with Page/Home/End. Digits animate with spring transitions as values change.

## Usage

Bind the total duration in seconds with `v-model`. You can customize which units are shown, the range, step, and label.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="duration-picker-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md justify-center">
    <MDurationPicker
      v-model="duration"
      label="Duration"
    />
  </div>
</template>

<script setup lang="ts">
const duration = ref(90)
</script>
```
::


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="duration-picker-custom" />
  :::
#code
  <PlaygroundCode name="DurationPicker" />
::

## Props

::component-props
  ::component-prop{name="modelValue" type="number" default="0"}
  The total duration in seconds. Use with `v-model` to control the value.
  ::
  ::component-prop{name="units" type="DurationUnit[]" default="['hours', 'minutes', 'seconds']"}
  Which units to display. Supported units are `'hours'`, `'minutes'`, and `'seconds'`.
  ::
  ::component-prop{name="min" type="number" default="0"}
  Minimum allowed duration in seconds.
  ::
  ::component-prop{name="max" type="number" default="359999"}
  Maximum allowed duration in seconds (default is 99:59:59).
  ::
  ::component-prop{name="step" type="number" default="1"}
  Step size in seconds used for arrow key and drag increments.
  ::
  ::component-prop{name="label" type="string" default="''"}
  Optional label displayed above the picker.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Whether the picker is disabled.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: number) => void"}
  Emitted when the duration value changes.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The default slot is not used by this component.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.durationPicker` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-flex flex-col gap-1.5`
  ::
  ::component-slot-row{name="label"}
  `text-xs font-medium text-muted`
  ::
  ::component-slot-row{name="group"}
  `inline-flex items-center gap-0.5 rounded-lg border border-default bg-default/40 px-2 py-1.5`
  ::
  ::component-slot-row{name="separator"}
  `mx-0.5 text-muted select-none`
  ::
  ::component-slot-row{name="segment"}
  `relative flex select-none items-center justify-center rounded-md px-1 py-0.5 font-medium text-highlighted tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-ns-resize`
  ::
  ::component-slot-row{name="digit"}
  `relative overflow-hidden text-center`
  ::
  ::component-slot-row{name="digitChar"}
  `absolute inset-0 flex items-center justify-center`
  ::
::

## Accessibility

The picker uses `role="group"` with an `aria-label="Duration"`, and each unit segment is a `role="spinbutton"` with `aria-label` (hours/minutes/seconds), `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`. Keyboard navigation is supported: ArrowUp/ArrowDown adjust values, ArrowLeft/ArrowRight move between segments, PageUp/PageDown adjust by larger steps, Home/End jump to min/max of current segment, and digits allow typing two-digit values with a timeout to commit. Focus management keeps the active segment focused. Drag/touch interactions use pointer events with `touch-action: none`.

## Performance

- Only the changing digit characters animate via `AnimatePresence` and spring physics, keeping layout stable.
- Drag scrubbing accumulates deltas and applies changes in step increments to avoid excessive updates.
- Touch/mouse listeners are added on interaction and cleaned up on unmount/drag end.
- Transform-based animations avoid layout reflow for digit transitions.
- Reduced motion considerations are handled by the animation library's spring behavior (not explicit `prefers-reduced-motion` check in source, but animations remain smooth).

::tip
Drag vertically on any digit segment to scrub the value quickly. Hold Shift while using Arrow keys to adjust by 10x the step size.
::

