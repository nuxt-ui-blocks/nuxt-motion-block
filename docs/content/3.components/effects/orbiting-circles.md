---
title: Orbiting Circles
description: Place items on one or more rings that orbit a shared centre.
---

Orbiting Circles puts an item on a circular path around a shared centre. Render one instance per item and give each its own `radius`, `duration` and `startAngle`; the layers stack, so several rings can share a single centre.

Each layer rotates about the container's centre and pushes its child out by `radius`. The child is counter-rotated by the same angle, which keeps an icon upright even at the bottom of the orbit.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="orbiting-circles-example" />
  :::
#code
```vue
<template>
  <div class="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-xl border border-default bg-default">
    <div class="z-10 flex size-16 items-center justify-center rounded-full border border-default bg-elevated shadow-sm">
      <UIcon
        name="i-lucide-sparkles"
        class="size-6 text-primary"
      />
    </div>

    <MOrbitingCircles
      :radius="110"
      :duration="20"
    >
      <div class="flex size-10 items-center justify-center rounded-full border border-default bg-elevated">
        <UIcon
          name="i-lucide-github"
          class="size-4"
        />
      </div>
    </MOrbitingCircles>

    <MOrbitingCircles
      :radius="110"
      :duration="20"
      :start-angle="180"
    >
      <div class="flex size-10 items-center justify-center rounded-full border border-default bg-elevated">
        <UIcon
          name="i-lucide-twitter"
          class="size-4"
        />
      </div>
    </MOrbitingCircles>

    <MOrbitingCircles
      :radius="170"
      :duration="30"
      :reverse="true"
      :start-angle="90"
    >
      <div class="flex size-10 items-center justify-center rounded-full border border-default bg-elevated">
        <UIcon
          name="i-lucide-figma"
          class="size-4"
        />
      </div>
    </MOrbitingCircles>
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
    <component-example name="orbiting-circles-custom" />
  :::
#code
  <PlaygroundCode name="OrbitingCircles" />
::

## Props

::component-props
  ::component-prop{name="radius" type="number" default="50"}
  Radius of the orbit, in pixels. Measure it against the container: an item at `110` sits 110px from the centre.
  ::

  ::component-prop{name="duration" type="number" default="20"}
  Seconds for one full revolution at `speed` 1.
  ::

  ::component-prop{name="speed" type="number" default="1"}
  Multiplier on `duration`. `2` orbits twice as fast; `0.5` half as fast.
  ::

  ::component-prop{name="delay" type="number" default="0"}
  Seconds to wait before the orbit starts.
  ::

  ::component-prop{name="reverse" type="boolean" default="false"}
  Travel counter-clockwise.
  ::

  ::component-prop{name="startAngle" type="number" default="0"}
  Where on the circle the item starts, in degrees. `0` is the top, `180` the bottom.
  ::

  ::component-prop{name="path" type="boolean" default="true"}
  Draw the faint circle the items travel along. Set it on one instance per radius, otherwise the circles are drawn on top of each other.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the orbit layer.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.orbitingCircles` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `absolute inset-0 flex items-center justify-center`
  ::
  ::component-slot-row{name="path"}
  `pointer-events-none absolute inset-0 h-full w-full`
  ::
  ::component-slot-row{name="pathCircle"}
  `stroke-black/10 dark:stroke-white/10`
  ::
  ::component-slot-row{name="orbit"}
  `orbit absolute flex size-full items-center justify-center rounded-full`
  ::
::
