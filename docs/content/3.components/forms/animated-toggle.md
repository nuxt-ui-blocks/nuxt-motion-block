---
title: Animated Toggle
description: A switch that plays a quick scale pop when toggled on.
---

A toggle switch built on Nuxt UI's `USwitch`. When the switch is turned on, the whole control plays a quick `1 → 1.2 → 1` scale pop, giving the flip a tactile feel.

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


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-toggle-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedToggle" />
::

## Props

::component-props
  ::component-prop{name="modelValue" type="boolean" default="false"}
  The current checked state of the switch. Use with `v-model` to control the toggle.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: boolean) => void"}
  Emitted when the toggle state changes.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The default slot is not used by this component. All content is rendered internally.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedToggle` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-flex`
  ::
::

## Accessibility

The component renders Nuxt UI's `USwitch` (built on Reka UI's `SwitchRoot`), which provides `role="switch"`, `aria-checked`, and keyboard navigation (Space/Enter to toggle), plus a visible focus ring.

## Performance

- The pop uses `motion.div` with a fixed `0.35s` tween that replays the keyframes `[1, 1.2, 1]` on every off → on transition.
- Only the control's `scale` changes (a transform), so nothing reflows.
- No timers, listeners, or DOM mutation beyond standard switch behavior.

::tip
The scale pop replays each time the switch is turned on, so the toggle feels tactile and responsive.
::

