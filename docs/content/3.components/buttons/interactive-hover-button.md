---
title: Interactive Hover Button
description: A pill with a dot that blooms into a full fill while the label slides over.
---

Interactive Hover Button starts as an outlined pill with a small dot at its left edge. On hover the dot grows to cover the whole button, the label shifts over to make room, and an arrow fades in at the trailing edge.

All three moves are CSS transitions on the `group-hover` state, so the effect works on touch devices as a `:hover` no-op and never runs a frame of JavaScript.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="interactive-hover-button-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 py-6">
    <MInteractiveHoverButton>
      Get started
    </MInteractiveHoverButton>
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
    <component-example name="interactive-hover-button-custom" />
  :::
#code
  <PlaygroundCode name="InteractiveHoverButton" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the button itself. The pill's `w-36` lives in the theme, so widen it here when the label is longer.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button's label, rendered between the dot and the arrow.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.interactiveHoverButton` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group relative inline-flex h-10 w-36 items-center justify-center overflow-hidden rounded-full border border-default bg-background text-sm font-medium text-highlighted transition-colors duration-300 hover:border-primary`
  ::
  ::component-slot-row{name="dot"}
  `absolute left-3 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ease-out group-hover:left-0 group-hover:top-0 group-hover:size-full group-hover:translate-y-0 group-hover:rounded-none`
  ::
  ::component-slot-row{name="label"}
  `relative z-10 flex items-center gap-1 transition-all duration-300 group-hover:translate-x-2 group-hover:text-inverted`
  ::
  ::component-slot-row{name="arrow"}
  `relative z-10 size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-inverted`
  ::
::

## Accessibility

The root is a real `<button type="button">` and the arrow is `aria-hidden`. The fill and the arrow only appear on hover, so the resting state still carries the full label and the label never disappears behind the fill — it just changes colour.
