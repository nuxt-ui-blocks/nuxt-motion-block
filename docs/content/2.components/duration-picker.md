---
title: Duration Picker
description: A drag-and-keyboard friendly duration picker with animated digit transitions.
navigation:
  icon: i-lucide-timer
---

# Duration Picker

A time duration input that lets you adjust hours, minutes, and seconds by dragging vertically (or touching), using arrow keys, typing digits, or jumping with Page/Home/End. Digits animate with spring transitions as values change. Ported from smoothui's duration-picker.

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
    <MDurationPicker v-model="duration" label="Duration" />
  </div>
</template>

<script setup lang="ts">
const duration = ref(90)
</script>
```
::

## Props

::field-group
  ::field{name="modelValue" type="number" default="0"}
  The total duration in seconds. Use with `v-model` to control the value.
  ::
  ::field{name="units" type="DurationUnit[]" default="['hours', 'minutes', 'seconds']"}
  Which units to display. Supported units are `'hours'`, `'minutes'`, and `'seconds'`.
  ::
  ::field{name="min" type="number" default="0"}
  Minimum allowed duration in seconds.
  ::
  ::field{name="max" type="number" default="359999"}
  Maximum allowed duration in seconds (default is 99:59:59).
  ::
  ::field{name="step" type="number" default="1"}
  Step size in seconds used for arrow key and drag increments.
  ::
  ::field{name="label" type="string" default="''"}
  Optional label displayed above the picker.
  ::
  ::field{name="disabled" type="boolean" default="false"}
  Whether the picker is disabled.
  ::
::

## Events

::field-group
  ::field{name="update:modelValue" type="(value: number) => void"}
  Emitted when the duration value changes.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The default slot is not used by this component.
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
