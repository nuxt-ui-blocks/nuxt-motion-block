---
title: Dither Image
description: An image redrawn on a canvas with an ordered or error-diffused dithering algorithm.
---

A dithered image keeps the picture but throws away the smooth gradient. The
component downsamples the source to blocks the size of `pixelSize`, quantises
the luminance against a small ramp, then paints the result back at device
resolution with smoothing turned off. The original image sits underneath, so a
blocked cross-origin read or a canvas failure leaves the photo visible instead
of an empty frame.

Four kernels are available: `bayer` and `threshold` quantise each cell against
an ordered pattern, while `floyd-steinberg` and `atkinson` push the rounding
error into neighbouring cells for a softer, more organic texture.

## Usage

Pass `src` and a required `alt`. The defaults are a 480×320 frame, 4px cells and
two tones.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="dither-image-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center p-6">
    <MDitherImage
      alt="Sunlight falling through a green forest"
      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80&auto=format&fit=crop"
      :height="260"
      :width="420"
    />
  </div>
</template>
```

::

The image must be readable by the canvas, which means the response needs
`Access-Control-Allow-Origin`. Unsplash and most image CDNs send it; a host that
does not will fall back to the plain image.

## Customize

`palette` is a dark-to-light list of CSS colours. It is interpolated into
`levels` stops, so two colours and four levels give two extra tones between
them. `pixelSize` sets the block size; larger blocks read as chunkier grain.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="dither-image-custom" />
  :::
#code
```vue
<template>
  <div class="grid w-full gap-4 p-6 sm:grid-cols-2">
    <figure class="flex flex-col gap-2">
      <MDitherImage
        alt="Mountain ridges fading into mist"
        algorithm="floyd-steinberg"
        :height="180"
        :levels="4"
        :palette="warm"
        :pixel-size="3"
        progressive
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=700&q=80&auto=format&fit=crop"
        :width="240"
      />
      <figcaption class="text-xs text-muted">
        Floyd-Steinberg · 4 tones · 3px cells
      </figcaption>
    </figure>

    <figure class="flex flex-col gap-2">
      <MDitherImage
        alt="A still lake beneath snowy peaks"
        algorithm="atkinson"
        :height="180"
        :levels="3"
        :palette="cool"
        :pixel-size="5"
        progressive
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&q=80&auto=format&fit=crop"
        :width="240"
      />
      <figcaption class="text-xs text-muted">
        Atkinson · 3 tones · 5px cells
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
const warm = ['#101820', '#f2aa4c', '#fff8e7']
const cool = ['#0a1128', '#3b82f6', '#eaf2ff']
</script>
```
::

Add `progressive` to wipe the dithered pass in with a clip-path when the frame
scrolls into view. Without it the canvas simply fades in once the first pass is
ready. The wipe is skipped under `prefers-reduced-motion`.

## Props

::component-props
  ::component-prop{name="src" type="string"}
  Image URL. The response must allow cross-origin reads.
  ::
  ::component-prop{name="alt" type="string"}
  Alternative text for the image. Required.
  ::
  ::component-prop{name="algorithm" type="'bayer' | 'atkinson' | 'floyd-steinberg' | 'threshold'" default="bayer"}
  Dithering kernel. `bayer` and `threshold` are ordered; the other two diffuse
  their error into neighbours.
  ::
  ::component-prop{name="width" type="number" default="480"}
  Rendered width in CSS pixels.
  ::
  ::component-prop{name="height" type="number" default="320"}
  Rendered height in CSS pixels.
  ::
  ::component-prop{name="pixelSize" type="number" default="4"}
  Size of one dithered block in CSS pixels, clamped to at least 1.
  ::
  ::component-prop{name="levels" type="number" default="2"}
  Number of tones in the ramp, clamped to 2–8.
  ::
  ::component-prop{name="palette" type="string[]"}
  CSS colours from dark to light. Defaults to the foreground and background of
  the surrounding theme.
  ::
  ::component-prop{name="progressive" type="boolean" default="false"}
  Reveal the dithered pass with a scroll-triggered wipe.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the wrapper.
  ::
::

## Accessibility

- The canvas is `aria-hidden` and the original `<img>` underneath keeps the
  `alt` text, so assistive technology reads the photograph once and never the
  decorative dither pass.
- `alt` is required by the prop type rather than optional, because the image is
  the content and the effect does not change its meaning.
- The component has no controls and no pointer or keyboard interaction. There
  is nothing to focus and nothing that depends on hover.
- A cross-origin failure falls back to the plain image, so the content stays
  available rather than disappearing behind an empty canvas.
- `progressive` only affects presentation. Under `prefers-reduced-motion` the
  clip-path and opacity transitions are removed and the finished image appears
  immediately at full opacity.
- Tone and palette are aesthetic choices. No state is encoded in colour alone.

## Performance

- Quantisation runs on the downsampled grid, not on every display pixel: a
  420×260 frame with 4px cells is only 105×65 cells.
- The canvas drawing buffer is capped at 2× device pixel ratio and drawn with
  image smoothing disabled, so large screens do not multiply the work without
  bound.
- The dither pass runs once when the component mounts and again only when
  `src`, the algorithm, geometry, levels or palette change. There is no render
  loop.
- A generation counter ignores stale image loads, and the observer and canvas
  buffer are released on unmount.
- The reveal is a compositor-friendly `clip-path` and `opacity` transition in
  CSS; no layout is measured and no per-frame JavaScript runs.
- The original image is reused as the fallback, so there is no second network
  request when the canvas cannot read pixels.
