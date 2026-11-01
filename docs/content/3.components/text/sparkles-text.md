---
title: Sparkles Text
description: Text with a scatter of stars that keep twinkling around it.
---

Sparkles Text pins a handful of four-point stars around a word and gives each one its own scale-and-fade loop. Every star gets a different duration, delay, size and position, so the group never pulses in unison and reads as ambient rather than as a spinner.

Positions come from a seeded pseudo-random function rather than `Math.random`, so the server and the client place the same stars and hydration does not jump. With reduced motion each star simply sits at a fixed opacity.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="sparkles-text-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-10">
    <MSparklesText text="Magical UI" :count="12" :size="16" />
  </div>
</template>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="sparkles-text-custom" />
  :::
#code
  <PlaygroundCode name="SparklesText" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  Text to draw. Ignored when the default slot is filled, so you can pass styled markup instead.
  ::

  ::component-prop{name="count" type="number" default="10"}
  How many stars to scatter around the text.
  ::

  ::component-prop{name="size" type="number" default="14"}
  Base size of a star, in pixels. Each one is drawn somewhere between 55% and 125% of this.
  ::

  ::component-prop{name="colors" type="string[]" default="[]"}
  Colours the stars cycle through. Empty means every star inherits the theme's `text-primary`.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the wrapper.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Content drawn under the stars. Use it when the text needs its own markup, like a gradient fill.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.sparklesText` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block`
  ::
  ::component-slot-row{name="text"}
  `relative z-10`
  ::
  ::component-slot-row{name="sparkle"}
  `pointer-events-none absolute z-20 text-primary`
  ::
::

## Accessibility

Every star is `aria-hidden` and `pointer-events-none`, so the text is read exactly once and the stars never sit between a pointer and the words. The stars are decorative by definition — nothing about the meaning of the sentence depends on them — which is also why they hold still under reduced motion instead of disappearing.
