---
title: Animated Toggle
description: A spring-animated switch that scales and slides its thumb on toggle.
navigation:
  icon: i-lucide-toggle-left
---

# Animated Toggle

An animated toggle switch built on Reka UI's `SwitchRoot` and `SwitchThumb`. When toggled, the thumb scales slightly and slides with a spring transition.

## Usage

Use `v-model` to bind the toggle state.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-toggle-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md justify-center">
    <MAnimatedToggle v-model="enabled" />
  </div>
</template>

<script setup lang="ts">
const enabled = ref(false)
</script>
```
::

## Props

::field-group
  ::field{name="modelValue" type="boolean" default="false"}
  The current checked state of the switch. Use with `v-model` to control the toggle.
  ::
::

## Events

::field-group
  ::field{name="update:modelValue" type="(value: boolean) => void"}
  Emitted when the toggle state changes.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The default slot is not used by this component. All content is rendered internally.
  ::
::

## Accessibility

The component relies on Reka UI's `SwitchRoot` for accessibility semantics, including proper `role="switch"`, `aria-checked`, and keyboard navigation (Space/Enter to toggle). Focus is visible via the focus ring styles applied by the root element.

## Performance

- The thumb animation uses `motion.div` with spring physics (`stiffness: 500`, `damping: 25`) for smooth, physics-based movement.
- Only the thumb scales and translates (transform properties), avoiding layout thrashing.
- No timers, listeners, or DOM mutation beyond standard switch behavior.

::tip
The spring animation creates a subtle bounce effect on check state, making the toggle feel tactile and responsive.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex` |
