---
title: Globe
description: A textured 3D globe with pins, atmosphere and drag-to-spin.
---

Globe wraps [`three-globe`](https://github.com/vasturiano/three-globe) in a small, declarative component: hand it a list of coordinates and it pins them on a sphere wrapped in a blue-marble texture, lit by a single directional light, with a soft atmosphere glow around the rim.

It turns on its own and can be dragged to spin, with the tilt clamped so it never rolls over its poles. Rendering pauses while the globe is scrolled out of view, and the auto-rotation stops when the visitor has asked for reduced motion.

::note{icon="i-lucide-package"}
Globe is the one component in this library with optional dependencies. Install both packages in your app before using it:

```bash
pnpm add three three-globe
```

They are loaded lazily, so nothing is pulled into your bundle until a `MGlobe` actually mounts. Without them the component renders an install hint instead of breaking the page.
::

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="globe-example" />
  :::
#code
```vue
<script setup lang="ts">
const markers = [
  { lat: 40.71, lng: -74.01, size: 0.06, label: 'New York' },
  { lat: 51.51, lng: -0.13, size: 0.06, label: 'London' },
  { lat: 35.68, lng: 139.69, size: 0.06, label: 'Tokyo' },
]
</script>

<template>
  <div class="relative h-80 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MGlobe
      class="h-full w-full"
      :data="markers"
      :rotate-speed="0.4"
      atmosphere-color="#3a228a"
      :show-graticules="true"
    />
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
    <component-example name="globe-custom" />
  :::
#code
  <PlaygroundCode name="Globe" />
::

## Props

::component-props
  ::component-prop{name="data" type="GlobePoint[]" default="[]"}
  Markers pinned to the globe, each `{ lat, lng, size?, label? }`. `lat` and `lng` are degrees; `size` is the marker's height above the surface, from `0` to `1`.
  ::

  ::component-prop{name="autoRotate" type="boolean" default="true"}
  Turn the globe on its own. Dragging pauses the spin while the pointer is down.
  ::

  ::component-prop{name="rotateSpeed" type="number" default="0.35"}
  Radians per second the globe turns on its own.
  ::

  ::component-prop{name="globeImageUrl" type="string" default="blue marble on unpkg"}
  Image wrapped around the sphere. Any equirectangular texture works.
  ::

  ::component-prop{name="bumpImageUrl" type="string" default="topology on unpkg"}
  Bump map that gives the surface relief.
  ::

  ::component-prop{name="showAtmosphere" type="boolean" default="true"}
  Draw the atmosphere glow around the rim.
  ::

  ::component-prop{name="atmosphereColor" type="string" default="'#3a228a'"}
  Colour of the atmosphere glow.
  ::

  ::component-prop{name="atmosphereAltitude" type="number" default="0.15"}
  Thickness of the glow, relative to the globe radius.
  ::

  ::component-prop{name="showGraticules" type="boolean" default="false"}
  Draw the latitude and longitude grid.
  ::

  ::component-prop{name="pointColor" type="string" default="'#ffffff'"}
  Colour of every marker.
  ::

  ::component-prop{name="ariaLabel" type="string" default="'Interactive globe'"}
  Accessible description of the canvas.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container. The container fills its parent, so give the parent a height.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="fallback"}
  Rendered instead of the canvas when `three` or `three-globe` is missing. Defaults to an install hint.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.globe` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative flex h-full w-full items-center justify-center overflow-hidden`
  ::
  ::component-slot-row{name="canvas"}
  `size-full cursor-grab touch-none active:cursor-grabbing`
  ::
  ::component-slot-row{name="fallback"}
  `flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted`
  ::
::
