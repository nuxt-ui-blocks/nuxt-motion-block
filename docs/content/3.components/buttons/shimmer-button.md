---
title: Shimmer Button
description: A dark button with a highlight that keeps sweeping across its face.
---

Shimmer Button puts a narrow white gradient on top of a solid button and slides it from left to right on a loop. The gradient is a sibling of the label rather than a background image, so the text stays crisp and the sweep is clipped by the button's own rounding.

The loop runs on the compositor through a `transform`, and it stops entirely when the visitor has asked for reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shimmer-button-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 py-6">
    <MShimmerButton>
      Ship it
    </MShimmerButton>
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
    <component-example name="shimmer-button-custom" />
  :::
#code
  <PlaygroundCode name="ShimmerButton" />
::

## Props

::component-props
  ::component-prop{name="duration" type="number" default="2.4"}
  Seconds one sweep takes, from fully off the left edge to fully off the right one.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the button itself.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button's label. Rendered above the shimmer so the sweep never washes it out.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.shimmerButton` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 py-3 text-sm font-medium text-white shadow-lg transition active:scale-[0.98] dark:bg-neutral-900`
  ::
  ::component-slot-row{name="shimmer"}
  `pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent`
  ::
  ::component-slot-row{name="label"}
  `relative z-10`
  ::
::

## Accessibility

The root is a real `<button type="button">`, so Enter and Space activate it and the browser supplies the focus ring. The shimmer is an empty `aria-hidden` span, so it never reaches the accessibility tree. With reduced motion the sweep is dropped and the button renders as a plain solid button.
