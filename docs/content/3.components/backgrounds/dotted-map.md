---
title: Dotted Map
description: A flat world map traced in dots, with markers that can pulse.
---

Dotted Map samples the landmass into a cloud of dots and draws each one as a small circle. Because the map is a dot field rather than a coastline path, it scales down cleanly and reads as a diagram instead of a picture.

Rows are offset by half a step by default, so the dots interlock like a weave instead of stacking into visible columns. Markers are placed by latitude and longitude, share that same offset, and can each carry their own size, a pulse override and any extra fields you want to read back in the `marker` slot.

The landmass comes from the optional [`svg-dotted-map`](https://www.npmjs.com/package/svg-dotted-map) package. It is loaded on mount and never bundled with this library:

```bash
pnpm add svg-dotted-map
```

Without it the component renders a short install hint instead of breaking the page.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dotted-map-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MDottedMap
      :markers="markers"
      :pulse="true"
      :dot-radius="0.22"
      class="p-6"
    >
      <template #marker="{ marker, x, y, r }">
        <text
          :x="x + r * 2.2"
          :y="y + r * 0.4"
          :font-size="r * 1.2"
          fill="currentColor"
          class="font-medium"
        >
          {{ String(marker.label) }}
        </text>
      </template>
    </MDottedMap>
  </div>
</template>

<script setup lang="ts">
const markers = [
  { lat: 37.5665, lng: 126.978, size: 2.4, label: 'Seoul' },
  { lat: 40.7128, lng: -74.006, size: 2.4, label: 'New York' },
]
</script>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="dotted-map-custom" />
  :::
#code
  <PlaygroundCode name="DottedMap" />
::

## Props

::component-props
  ::component-prop{name="width" type="number" default="150"}
  Width of the map, in viewBox units. The rendered element still fills its parent.
  ::

  ::component-prop{name="height" type="number" default="75"}
  Height of the map, in viewBox units.
  ::

  ::component-prop{name="mapSamples" type="number" default="5000"}
  Points sampled from the landmass. More samples give a denser map and a slower first paint.
  ::

  ::component-prop{name="markers" type="object[]" default="[]"}
  Points to pin, each with `lat` and `lng`, plus optional `size` and `pulse`. Any other field is passed through to the `marker` slot.
  ::

  ::component-prop{name="dotColor" type="string" default="'currentColor'"}
  Colour of the map dots.
  ::

  ::component-prop{name="markerColor" type="string" default="'#FF6900'"}
  Colour of the markers and their pulse rings.
  ::

  ::component-prop{name="dotRadius" type="number" default="0.2"}
  Radius of a map dot, in viewBox units.
  ::

  ::component-prop{name="stagger" type="boolean" default="true"}
  Offset every other row by half a step so the dots interlock.
  ::

  ::component-prop{name="pulse" type="boolean" default="false"}
  Pulse every marker. With `pulse` off, only markers that set `pulse: true` animate.
  ::

  ::component-prop{name="ariaLabel" type="string" default="'World map'"}
  Accessible description of the map.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the wrapper.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="marker"}
  Draws over each marker, inside the marker's own `<g>`. Receives `marker`, `index`, `x`, `y` and `r`, all in viewBox units.
  ::
  ::component-slot-row{name="fallback"}
  Replaces the install hint shown when `svg-dotted-map` is not present.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dottedMap` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `size-full`
  ::
  ::component-slot-row{name="map"}
  `size-full text-muted`
  ::
  ::component-slot-row{name="fallback"}
  `flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted`
  ::
::

## Accessibility

The `<svg>` is exposed as an image with `aria-label`, so the map is announced as one unit instead of as hundreds of circles. Pulse rings are skipped entirely when the visitor has asked for reduced motion, since SMIL cannot be switched off by a media query the way CSS animations can.
