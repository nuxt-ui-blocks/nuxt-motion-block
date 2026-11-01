---
title: Icon Cloud
description: A draggable sphere of logos that keeps turning on its own.
---

Icon Cloud places a list of images on a sphere, then projects them onto a canvas with a light perspective: icons near the front are drawn larger and fully opaque, icons near the back are smaller and faded. The cloud turns slowly by itself and can be dragged to spin it, with the tilt clamped so it never rolls past its poles.

Icons are distributed with a golden-angle spiral, which spaces them evenly instead of letting them clump at the poles. Images load in place, so the cloud fills in as each one arrives.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="icon-cloud-example" />
  :::
#code
```vue
<script setup lang="ts">
const icons = [
  'https://cdn.simpleicons.org/vuedotjs/42b883',
  'https://cdn.simpleicons.org/nuxt/00DC82',
  'https://cdn.simpleicons.org/typescript/3178C6',
  'https://cdn.simpleicons.org/tailwindcss/06B6D4',
]
</script>

<template>
  <div class="relative h-72 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MIconCloud class="h-full w-full" :images="icons" :icon-size="40" :speed="0.2" />
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
    <component-example name="icon-cloud-custom" />
  :::
#code
  <PlaygroundCode name="IconCloud" />
::

## Props

::component-props
  ::component-prop{name="images" type="string[]" default="[]"}
  Image URLs placed on the sphere. Square images work best; each one is drawn at `iconSize` square.
  ::

  ::component-prop{name="iconSize" type="number" default="42"}
  Side length of an icon at the front of the sphere, in pixels. Icons further back scale down with the perspective.
  ::

  ::component-prop{name="speed" type="number" default="0.15"}
  Radians per second the cloud turns on its own. `0` holds still until dragged.
  ::

  ::component-prop{name="ariaLabel" type="string" default="'Icon cloud'"}
  Accessible description of the canvas.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container. The container fills its parent, so give the parent a height.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.iconCloud` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative h-full w-full overflow-hidden`
  ::
  ::component-slot-row{name="canvas"}
  `absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing`
  ::
::
