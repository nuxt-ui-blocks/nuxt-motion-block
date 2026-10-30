---
title: Android
description: A CSS phone frame with a punch-hole camera instead of a dynamic island.
---

Android is the same idea as the iPhone mock with a different body: a wider bezel, a punch-hole camera in the top centre and a screen that keeps a 9:19 aspect ratio.

Use whichever frame matches the audience you are showing the layout to. Both clip their slot to the screen's rounding and both scale from a single `width` prop.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="android-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-6">
    <MAndroid>
      <div class="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-neutral-900 to-neutral-800 p-6 text-center text-white">
        <p class="text-lg font-semibold">
          Same slot, different frame
        </p>
      </div>
    </MAndroid>
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
    <component-example name="android-custom" />
  :::
#code
  <PlaygroundCode name="Android" />
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
  Screen content, clipped to the screen's rounding.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.android` in `app.config.ts`.

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
  `relative rounded-[2.6rem] border-[8px] border-neutral-900 bg-neutral-950 p-1 shadow-2xl ring-1 ring-white/10 dark:border-neutral-700 dark:bg-neutral-800`
  ::
  ::component-slot-row{name="screen"}
  `relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-background`
  ::
  ::component-slot-row{name="camera"}
  `pointer-events-none absolute left-1/2 top-2 z-10 size-2.5 -translate-x-1/2 rounded-full bg-neutral-950`
  ::
::

## Accessibility

The camera is `aria-hidden` and `pointer-events-none`; the screen is a plain container. Content keeps its own semantics, so add headings or labels inside the slot when the layout needs them.
