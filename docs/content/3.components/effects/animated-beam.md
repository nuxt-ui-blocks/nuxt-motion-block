---
title: Animated Beam
description: A gradient comet that travels between two elements.
---

The Animated Beam draws a path between two elements and sends a gradient comet along it. Point it at any two nodes with template refs and it measures their positions itself, so the beam survives resizes, theme changes and layout shifts.

Give it a `curvature` and the path bows along the perpendicular of the line between the two refs, which means a vertical beam curves sideways and a diagonal one curves diagonally.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-beam-example" />
  :::
#code
```vue
<template>
  <div
    ref="container"
    class="relative flex h-64 w-full items-center justify-between rounded-xl border border-default bg-default px-10"
  >
    <div
      ref="from"
      class="z-10 flex size-12 items-center justify-center rounded-full border border-default bg-elevated"
    >
      <UIcon
        name="i-lucide-user"
        class="size-5 text-highlighted"
      />
    </div>

    <div
      ref="to"
      class="z-10 flex size-12 items-center justify-center rounded-full border border-default bg-elevated"
    >
      <UIcon
        name="i-lucide-database"
        class="size-5 text-highlighted"
      />
    </div>

    <MAnimatedBeam
      :container-ref="container"
      :from-ref="from"
      :to-ref="to"
      :curvature="-40"
    />
  </div>
</template>

<script setup lang="ts">
const container = ref<HTMLElement | null>(null)
const from = ref<HTMLElement | null>(null)
const to = ref<HTMLElement | null>(null)
</script>
```
::

## Examples

### Reverse sweep

The beam always measures the elements you hand it, so there is nothing to
configure in the playground — the three refs are the configuration. Here the
same beam runs bottom to top through a wider curve.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-beam-custom" />
  :::
#code
```vue
<template>
  <div
    ref="container"
    class="relative flex h-72 w-full flex-col items-center justify-between rounded-xl border border-default bg-default py-8"
  >
    <div
      ref="from"
      class="z-10 flex size-12 items-center justify-center rounded-full border border-default bg-elevated"
    >
      <UIcon
        name="i-lucide-cloud"
        class="size-5 text-highlighted"
      />
    </div>

    <div
      ref="to"
      class="z-10 flex size-12 items-center justify-center rounded-full border border-default bg-elevated"
    >
      <UIcon
        name="i-lucide-server"
        class="size-5 text-highlighted"
      />
    </div>

    <MAnimatedBeam
      :container-ref="container"
      :from-ref="from"
      :to-ref="to"
      :curvature="70"
      :duration="3"
      reverse
    />
  </div>
</template>

<script setup lang="ts">
const container = ref<HTMLElement | null>(null)
const from = ref<HTMLElement | null>(null)
const to = ref<HTMLElement | null>(null)
</script>
```
::

## Props

::component-props
  ::component-prop{name="containerRef" type="HTMLElement | null" default="null"}
  The positioned element the beam is drawn inside. The `<svg>` overlay is sized to it. Required: the beam renders nothing without it.
  ::

  ::component-prop{name="fromRef" type="HTMLElement | null" default="null"}
  The element the beam leaves from. Its centre is the start of the path. Required.
  ::

  ::component-prop{name="toRef" type="HTMLElement | null" default="null"}
  The element the beam arrives at. Its centre is the end of the path. Required.
  ::

  ::component-prop{name="curvature" type="number" default="0"}
  How far the path bows away from the straight line, in pixels. Negative values bow the other way.
  ::

  ::component-prop{name="duration" type="number" default="4"}
  Seconds for one sweep.
  ::

  ::component-prop{name="delay" type="number" default="0"}
  Seconds to wait before the first sweep.
  ::

  ::component-prop{name="size" type="number" default="72"}
  Arc length of the travelling comet, in pixels. It is clamped so the comet can never fill the whole path.
  ::

  ::component-prop{name="reverse" type="boolean" default="false"}
  Sweep from `toRef` back towards `fromRef`.
  ::

  ::component-prop{name="pathWidth" type="number" default="2"}
  Thickness of both the static path and the comet, in pixels.
  ::

  ::component-prop{name="pathColor" type="string" default="'var(--ui-border)'"}
  Colour of the static path the comet rides along.
  ::

  ::component-prop{name="pathOpacity" type="number" default="1"}
  Opacity of the static path.
  ::

  ::component-prop{name="gradientStartColor" type="string" default="'var(--ui-primary)'"}
  Colour the comet's tail fades from, at zero opacity.
  ::

  ::component-prop{name="gradientStopColor" type="string" default="'var(--ui-secondary)'"}
  Colour the comet's head fades up to.
  ::

  ::component-prop{name="startXOffset" type="number" default="0"}
  Nudge the start point along the x axis.
  ::

  ::component-prop{name="startYOffset" type="number" default="0"}
  Nudge the start point along the y axis.
  ::

  ::component-prop{name="endXOffset" type="number" default="0"}
  Nudge the end point along the x axis.
  ::

  ::component-prop{name="endYOffset" type="number" default="0"}
  Nudge the end point along the y axis.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the `<svg>` overlay.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedBeam` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="svg"}
  `pointer-events-none absolute inset-0 h-full w-full overflow-visible`
  ::
::
