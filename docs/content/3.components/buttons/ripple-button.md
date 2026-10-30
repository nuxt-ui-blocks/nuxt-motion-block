---
title: Ripple Button
description: A button that spawns a spreading circle wherever you press.
---

Ripple Button listens for `pointerdown`, measures where the press landed inside the button, and spawns a circle at that point. Each circle grows to six times its size while fading to nothing, then removes itself from the list.

Ripples are independent, so pressing quickly in several places leaves several circles spreading at once. Presses are ignored entirely when the visitor has asked for reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ripple-button-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 py-6">
    <MRippleButton>
      Click anywhere
    </MRippleButton>
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
    <component-example name="ripple-button-custom" />
  :::
#code
  <PlaygroundCode name="RippleButton" />
::

## Props

::component-props
  ::component-prop{name="duration" type="number" default="0.7"}
  Seconds a ripple takes to spread out and fade. The ripple is dropped from the list once this elapses.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the button itself.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button's label, drawn above the ripples.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.rippleButton` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-default bg-elevated px-6 py-3 text-sm font-medium text-highlighted transition active:scale-[0.98]`
  ::
  ::component-slot-row{name="ripple"}
  `pointer-events-none absolute size-8 rounded-full bg-primary/40`
  ::
  ::component-slot-row{name="label"}
  `relative z-10`
  ::
::

## Accessibility

The root is a real `<button type="button">`, so keyboard activation and the focus ring are unchanged. The ripple only reacts to `pointerdown`; a keyboard press gets the normal button feedback and no ripple, which is intentional — the ripple marks where a pointer landed, and a keyboard press has no such point.
