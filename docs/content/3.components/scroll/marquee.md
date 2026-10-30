---
title: Marquee
description: An endless row or column of content that can reverse, run vertically and pause on hover.
---

Marquee repeats the default slot enough times to fill the loop and then slides the whole row by exactly one copy, so the seam never shows. Two copies are enough for a short row; more keep the track wider than the viewport when the items are small.

Three things separate it from [`InfiniteSlider`](/components/scroll/infinite-slider): it can run the other way, it can stack vertically, and it can stop while the pointer is over it. Duration is the time for one pass, so the speed follows from the content width rather than from a fixed number of pixels per second.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="marquee-example" />
  :::
#code
```vue
<script setup lang="ts">
const items = ['Motion', 'Nuxt UI', 'Tailwind', 'TypeScript', 'Vite', 'VueUse', 'Pinia']
</script>

<template>
  <MMarquee
    :duration="22"
    :gap="12"
    pause-on-hover
  >
    <div
      v-for="item in items"
      :key="item"
      class="flex h-12 shrink-0 items-center gap-2 rounded-lg border border-default bg-elevated px-5 text-sm font-medium text-muted"
    >
      <span class="size-1.5 rounded-full bg-primary" />
      {{ item }}
    </div>
  </MMarquee>
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
    <component-example name="marquee-custom" />
  :::
#code
  <PlaygroundCode name="Marquee" />
::

## Props

::component-props
  ::component-prop{name="duration" type="number" default="40"}
  Seconds for one full pass. Halve it to double the speed.
  ::

  ::component-prop{name="gap" type="number" default="16"}
  Space between two items, in pixels. The same gap is used between the copies, so the loop stays even.
  ::

  ::component-prop{name="repeat" type="number" default="4"}
  How many copies of the slot to render. Raise it when the items are narrower than the container.
  ::

  ::component-prop{name="reverse" type="boolean" default="false"}
  Slide the content the other way. The keyframes are played backwards, so the timing stays the same.
  ::

  ::component-prop{name="vertical" type="boolean" default="false"}
  Stack the items in a column and scroll from bottom to top.
  ::

  ::component-prop{name="pauseOnHover" type="boolean" default="false"}
  Freeze the track while the pointer is over it, so a link inside the row stays reachable.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the viewport. It clips the track, so it needs a width, or a parent that gives it one.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The content to repeat. It is rendered once per copy, so keep it free of ids and event handlers that must stay unique.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.marquee` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group flex overflow-hidden`
  ::
  ::component-slot-row{name="track"}
  `mb-marquee-x flex w-max shrink-0`
  ::
  ::component-slot-row{name="trackVertical"}
  `mb-marquee-y flex h-max shrink-0 flex-col`
  ::
::

## Accessibility

Every copy after the first is `aria-hidden`, so a screen reader reads the row once instead of four times. Under reduced motion the track is paused at the first copy rather than left mid-slide, and the content is still in the document and still focusable. `pauseOnHover` is not a substitute for keyboard access: if the row holds links, either keep it paused by default or leave the same links somewhere static on the page.
