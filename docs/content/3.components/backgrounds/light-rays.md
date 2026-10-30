---
title: Light Rays
description: A fan of soft light beams sweeping out of one corner or edge.
---

Light Rays draws a set of tapered wedges from a single source, blends them additively and fades each one with a radial gradient, so overlapping beams brighten instead of flattening. Every beam has its own length, width, brightness and phase, which is what keeps the fan from looking like a striped cone.

It is a canvas, not a DOM stack: one element, one draw call per beam, and nothing to lay out. The loop pauses when the frame scrolls out of view, and reduced motion paints a single still frame.

Whatever you put in the default slot is drawn above the beams, so the component is the frame as well as the light.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="light-rays-example" />
  :::
#code
```vue
<template>
  <div class="relative h-72 w-full overflow-hidden rounded-xl bg-neutral-950">
    <MLightRays
      color="#7dd3fc"
      :count="22"
      :spread="0.9"
      :speed="0.8"
    >
      <div class="flex h-full flex-col items-center justify-center gap-2 text-center">
        <p class="text-xs uppercase tracking-[0.3em] text-white/50">
          Stage light
        </p>
        <p class="text-3xl font-semibold text-white">
          Shine from above
        </p>
      </div>
    </MLightRays>
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
    <component-example name="light-rays-custom" />
  :::
#code
  <PlaygroundCode name="LightRays" />
::

## Props

::component-props
  ::component-prop{name="origin" type="'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right'" default="'top-center'"}
  Edge or corner the beams come from. The fan always points into the frame.
  ::

  ::component-prop{name="color" type="string" default="'#ffffff'"}
  Colour of the beams. Any hex or `rgb()` value works.
  ::

  ::component-prop{name="count" type="number" default="24"}
  How many beams to draw. More beams overlap into a smoother fan, at the cost of one more fill each.
  ::

  ::component-prop{name="spread" type="number" default="0.85"}
  Half-angle of the fan, in radians. `1.5` is close to a half circle.
  ::

  ::component-prop{name="length" type="number" default="1.15"}
  How far the beams reach, as a multiple of the frame's larger side. Below `1` they stop inside the frame.
  ::

  ::component-prop{name="fade" type="number" default="0.55"}
  Where the beams start dimming, from `0` to `1` of their length. Lower fades out sooner.
  ::

  ::component-prop{name="speed" type="number" default="1"}
  Seconds for one cycle of the sweep. Lower is faster.
  ::

  ::component-prop{name="pulsate" type="boolean" default="true"}
  Breathe the beams in and out instead of holding them at a fixed brightness.
  ::

  ::component-prop{name="followMouse" type="boolean" default="false"}
  Pull the source toward the pointer, which makes the fan lean as the pointer moves.
  ::

  ::component-prop{name="mouseInfluence" type="number" default="0.15"}
  How far the pointer pulls the source, from `0` to `1`. Only used with `followMouse`.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the frame. The canvas fills it, so the frame needs a height.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Content drawn above the beams. It sits in a `relative z-10` layer, so a headline or a card lands on top of the light instead of under it.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.lightRays` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative size-full overflow-hidden`
  ::
  ::component-slot-row{name="canvas"}
  `absolute inset-0 size-full`
  ::
  ::component-slot-row{name="content"}
  `relative z-10 size-full`
  ::
::

## Accessibility

The canvas is `aria-hidden` and carries no information, so anything the beams are lighting still has to be in the DOM on top of them. There is no pointer capture and no focusable element, which means the effect never takes a click or a tab stop away from the content. With reduced motion the loop never starts and a single frame is painted, so the effect is still visible but nothing moves.
