---
title: Pulsating Button
description: A primary button with a halo that keeps expanding behind it.
---

Pulsating Button renders a second copy of itself behind the real one and grows it from `1` to `1.35` while fading it to nothing, then starts again. The result is a radar ping that pulls the eye without moving the label or the hit area.

The halo is `pointer-events-none` and sits behind the button, so it never intercepts a click. It is dropped entirely for visitors who have asked for reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="pulsating-button-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 py-6">
    <MPulsatingButton>
      Live now
    </MPulsatingButton>
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="pulsating-button-custom" />
  :::
#code
  <PlaygroundCode name="PulsatingButton" />
::

## Props

::component-props
  ::component-prop{name="duration" type="number" default="1.6"}
  Seconds one pulse takes to expand and fade.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the button itself. The halo inherits the button's rounding through `rounded-[inherit]`.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button's label.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.pulsatingButton` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group relative inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-inverted active:scale-[0.98]`
  ::
  ::component-slot-row{name="pulse"}
  `pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-primary`
  ::
  ::component-slot-row{name="label"}
  `relative`
  ::
::

## Accessibility

The root is a real `<button type="button">`. The halo is decorative and marked `aria-hidden`, so it contributes nothing to the accessibility tree. A looping pulse can be distracting for some visitors, which is why it is skipped entirely under reduced motion.
