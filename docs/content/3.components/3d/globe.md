---
title: Globe
description: An autorotating, interactive globe rendered in WebGL.
---

Globe wraps [`cobe`](https://github.com/shuding/cobe) in a small, declarative component: hand it a list of coordinates and it pins them on a dotted sphere, with a soft glow around the rim and a subtle tilt.

It turns on its own and can be dragged to spin, with the motion spring-damped so it settles naturally. Rendering pauses while the globe is scrolled out of view, and the auto-rotation stops when the visitor has asked for reduced motion.

::note{icon="i-lucide-package"}
Globe is the one component in this library with an optional dependency. Install it in your app before using the component:

```bash
pnpm add cobe
```

It is loaded lazily, so nothing is pulled into your bundle until a `MGlobe` actually mounts. Without it the component renders an install hint instead of breaking the page.
::

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="globe-example" />
  :::
#code
```vue
<script setup lang="ts">
const markers = [
  { lat: 14.5995, lng: 120.9842, size: 0.03, label: 'Manila' },
  { lat: 19.076, lng: 72.8777, size: 0.1, label: 'Mumbai' },
  { lat: 40.7128, lng: -74.006, size: 0.1, label: 'New York' },
]
</script>

<template>
  <MGlobe :data="markers" />
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
  Markers pinned to the globe, each `{ lat, lng, size?, label?, color? }`. `lat` and `lng` are degrees; `size` is the marker's radius, from `0` to `1`.
  ::

  ::component-prop{name="autoRotate" type="boolean" default="true"}
  Turn the globe on its own. Dragging pauses the spin while the pointer is down.
  ::

  ::component-prop{name="rotateSpeed" type="number" default="0.3"}
  Radians per second the globe turns on its own.
  ::

  ::component-prop{name="theta" type="number" default="0.3"}
  Tilt of the globe, in radians. `0` looks at it head on.
  ::

  ::component-prop{name="phi" type="number" default="0"}
  Starting rotation around the vertical axis, in radians.
  ::

  ::component-prop{name="dark" type="number" default="0"}
  `0` renders a light globe, `1` a dark one.
  ::

  ::component-prop{name="diffuse" type="number" default="0.4"}
  Sharpness of the light falling across the sphere.
  ::

  ::component-prop{name="mapSamples" type="number" default="16000"}
  Number of samples used to build the landmass texture. Higher is more detailed and slower.
  ::

  ::component-prop{name="mapBrightness" type="number" default="1.2"}
  Brightness of the landmass texture.
  ::

  ::component-prop{name="mapBaseBrightness" type="number" default="0"}
  Brightness of the flat base layer beneath the landmass texture. Raise it to fill the ocean.
  ::

  ::component-prop{name="baseColor" type="[number, number, number]" default="[1, 1, 1]"}
  Colour of the landmass, as `[r, g, b]` from `0` to `1`.
  ::

  ::component-prop{name="markerColor" type="[number, number, number]" default="[0.984, 0.392, 0.082]"}
  Colour of the markers, as `[r, g, b]` from `0` to `1`.
  ::

  ::component-prop{name="glowColor" type="[number, number, number]" default="[1, 1, 1]"}
  Colour of the atmosphere glow around the rim.
  ::

  ::component-prop{name="markerElevation" type="number" default="0.05"}
  Height of every marker above the surface.
  ::

  ::component-prop{name="arcs" type="GlobeArc[]" default="[]"}
  Great-circle arcs between two coordinates, each `{ from, to, color?, id? }`. `from` and `to` are either `[lat, lng]` or `{ lat, lng }`.
  ::

  ::component-prop{name="arcColor" type="[number, number, number]" default="[0.3, 0.6, 1]"}
  Colour of the arcs, as `[r, g, b]` from `0` to `1`. An arc's own `color` wins over it.
  ::

  ::component-prop{name="arcWidth" type="number" default="1"}
  Width of the arcs.
  ::

  ::component-prop{name="arcHeight" type="number" default="0.2"}
  Thickness of the arcs above the surface.
  ::

  ::component-prop{name="offset" type="[number, number]" default="[0, 0]"}
  Shift of the sphere inside the canvas, as a fraction of its size.
  ::

  ::component-prop{name="devicePixelRatio" type="number" default="2"}
  Pixel ratio of the render target. Higher is sharper and slower.
  ::

  ::component-prop{name="opacity" type="number" default="1"}
  Opacity of the whole globe.
  ::

  ::component-prop{name="scale" type="number" default="1"}
  Scale of the sphere inside the canvas.
  ::

  ::component-prop{name="ariaLabel" type="string" default="'Interactive globe'"}
  Accessible description of the canvas.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container. The container is square and caps at `600px`, so give the parent enough room.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="fallback"}
  Rendered instead of the canvas when `cobe` is missing. Defaults to an install hint.
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
  `relative mx-auto aspect-square w-full max-w-150 overflow-hidden`
  ::
  ::component-slot-row{name="canvas"}
  `size-full cursor-grab touch-none transition-opacity duration-500 contain-[layout_paint_size] active:cursor-grabbing`
  ::
  ::component-slot-row{name="fallback"}
  `flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted`
  ::
::
