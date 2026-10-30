---
title: Rainbow Button
description: A button whose one-pixel border carries a rotating conic gradient.
---

Rainbow Button draws a conic gradient on a layer one pixel larger than its own box, then covers the middle with the button face. Only the edge shows, so the border shifts through purple, blue and back as the gradient turns.

The turn is a `rotate` on the compositor and stops when the visitor has asked for reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="rainbow-button-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 py-6">
    <MRainbowButton>
      Gradient border
    </MRainbowButton>
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
    <component-example name="rainbow-button-custom" />
  :::
#code
  <PlaygroundCode name="RainbowButton" />
::

## Props

::component-props
  ::component-prop{name="duration" type="number" default="4"}
  Seconds one full turn of the gradient takes. Lower values make the edge shimmer faster.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the button itself.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button's label. Rendered on the face layer, above the gradient.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.rainbowButton` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-px text-sm font-medium active:scale-[0.98]`
  ::
  ::component-slot-row{name="gradient"}
  `pointer-events-none absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#e2cbff_0%,#393bb2_50%,#e2cbff_100%)]`
  ::
  ::component-slot-row{name="label"}
  `relative z-10 inline-flex w-full items-center justify-center rounded-[inherit] bg-background px-6 py-3 text-highlighted`
  ::
::

## Accessibility

The root is a real `<button type="button">`. The gradient layer is decorative and `aria-hidden`; the label sits on an opaque face above it, so contrast comes from `text-highlighted` on `bg-background` and never from the moving gradient.
