---
title: iPhone 15 Pro
description: A CSS phone frame with a dynamic island, sized to hold any content.
---

iPhone 15 Pro is a frame, not a picture: a rounded body, a ten-pixel bezel and a dynamic island, with a screen that keeps a 9:19.5 aspect ratio and clips whatever you put inside it.

Use it to show a mobile layout at a believable scale in a landing page or a docs example. The frame is pure CSS, so it scales with the `width` prop and follows the colour mode through the theme.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="iphone-15-pro-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-6">
    <MIPhone15Pro>
      <div class="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-neutral-900 to-neutral-800 p-6 text-center text-white">
        <p class="text-lg font-semibold">
          Everything in your pocket
        </p>
      </div>
    </MIPhone15Pro>
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
    <component-example name="iphone-15-pro-custom" />
  :::
#code
  <PlaygroundCode name="IPhone15Pro" />
::

## Props

::component-props
  ::component-prop{name="width" type="number" default="280"}
  Width of the phone, in pixels. The screen keeps its aspect ratio, so the height follows.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the outer wrapper.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Screen content. It is clipped to the screen's rounding, so fill it edge to edge and give it a height if it is not naturally tall.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.iPhone15Pro` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative mx-auto`
  ::
  ::component-slot-row{name="frame"}
  `relative rounded-[3rem] border-[10px] border-neutral-900 bg-neutral-950 shadow-2xl ring-1 ring-white/10 dark:border-neutral-700 dark:bg-neutral-800`
  ::
  ::component-slot-row{name="screen"}
  `relative aspect-[9/19.5] overflow-hidden rounded-[2.35rem] bg-background`
  ::
  ::component-slot-row{name="island"}
  `pointer-events-none absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-neutral-950`
  ::
::

## Accessibility

The frame is decorative markup: the island is `aria-hidden` and `pointer-events-none`, and the screen is a plain `div`. Nothing is announced twice, and screen content keeps its own semantics — if it needs a label or a heading, add one inside the slot.
