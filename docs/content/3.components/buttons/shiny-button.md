---
title: Shiny Button
description: A bordered button with a light sweep that crosses it on hover.
---

Shiny Button keeps a quiet outline at rest and slides a diagonal light band across its face when the pointer enters. The band starts fully outside the left edge and travels past the right one, so the button reads as polished rather than as a permanent gradient.

Everything is CSS: the sweep is a `transform` transition driven by the `group-hover` state, so it costs one composited layer and nothing per frame.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shiny-button-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 py-6">
    <MShinyButton>
      Hover for the shine
    </MShinyButton>
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
    <component-example name="shiny-button-custom" />
  :::
#code
  <PlaygroundCode name="ShinyButton" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the button itself.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button's label.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.shinyButton` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-default bg-default px-6 py-3 text-sm font-medium text-highlighted transition hover:border-accented active:scale-[0.98]`
  ::
  ::component-slot-row{name="shine"}
  `pointer-events-none absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]`
  ::
  ::component-slot-row{name="label"}
  `relative z-10`
  ::
::

## Accessibility

The root is a real `<button type="button">`, so keyboard activation and the focus ring come from the browser. The sweep is decorative and marked `aria-hidden`. Hover is the only trigger, so a keyboard or touch user simply sees the resting outline — nothing is hidden behind the effect.
