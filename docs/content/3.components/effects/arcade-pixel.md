---
title: Arcade Pixel
description: Text or sprites drawn through a 5x7 pixel font on a canvas, with phosphor glow and an optional CRT overlay.
---

An arcade display built from square cells. Text is rendered through a bundled 5x7
pixel font, and a `sprite` grid can take over when you need art instead of
letters: both are painted one `fillRect` per lit cell, with a single blurred
self-composite underneath for the phosphor bleed.

Every cell has a palette index, so a sprite can carry more than one colour. Index
`0` is treated as background and skipped, which means the unlit dot matrix shows
through where the artwork is empty.

## Usage

Pass `text` or `sprite`. The defaults are 8px cells with a 1px gap, a single
theme-primary ink and no animation.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="arcade-pixel-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center px-6 py-10">
    <MArcadePixel
      animate="type"
      class="rounded-lg bg-zinc-950 p-6 ring-1 ring-white/10"
      :glow="0.55"
      loop
      :pixel-size="12"
      text="PLAY"
    />
  </div>
</template>
```
::

The wrapper is `inline-block` and sized from the grid, so it hugs the message
without needing a fixed width.

## Customize

`animate` picks the reveal: `type` lands the message a character at a time with a
white flash on each new column, `wipe` sweeps the full grid in, `blink` toggles
the display twice a second, and `marquee` scrolls the grid forever. `speed`
multiplies any of them, and `loop` repeats the finite ones.

`palette` is indexed by cell value, `pixelSize` and `gap` control the grid, and
`columns` clamps how many columns are visible at once. `glow` adds phosphor
bleed, `scanlines` overlays a scanline pattern, and `crt` adds a rolling band,
chromatic fringing, a vignette and a faint flicker.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="arcade-pixel-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-5 px-6 py-10">
    <MArcadePixel
      animate="blink"
      class="rounded-lg bg-zinc-950 p-8 ring-1 ring-white/10"
      crt
      :glow="0.75"
      loop
      :palette="['transparent', 'var(--ui-error)', 'var(--ui-warning)']"
      :pixel-size="18"
      scanlines
      :sprite="heart"
    />

    <p class="text-xs text-muted">
      A sprite grid, a two-colour palette, scanlines and the CRT overlay.
    </p>
  </div>
</template>

<script setup lang="ts">
const heart = [
  [0, 1, 1, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 2, 1, 1, 1, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
]
</script>
```
::

## Props

::component-props
  ::component-prop{name="text" type="string"}
  Text rendered through the built-in 5x7 pixel font. Ignored when `sprite` is set.
  ::
  ::component-prop{name="sprite" type="number[][]"}
  Grid of palette indices. Takes precedence over `text` when both are set.
  ::
  ::component-prop{name="palette" type="string[]" default="['transparent', 'var(--ui-primary)']"}
  Colours indexed by cell value. Index `0` is background.
  ::
  ::component-prop{name="animate" type="'none' | 'type' | 'wipe' | 'blink' | 'marquee'" default="'none'"}
  Reveal animation played on mount.
  ::
  ::component-prop{name="speed" type="number" default="1"}
  Animation speed multiplier. Higher plays faster.
  ::
  ::component-prop{name="loop" type="boolean" default="false"}
  Whether the reveal animation repeats indefinitely.
  ::
  ::component-prop{name="pixelSize" type="number" default="8"}
  Size of a single pixel cell, in CSS pixels.
  ::
  ::component-prop{name="gap" type="number" default="1"}
  Gap between pixel cells, in CSS pixels.
  ::
  ::component-prop{name="columns" type="number"}
  Fixed display width in cells. Defaults to the content width.
  ::
  ::component-prop{name="glow" type="boolean | number" default="false"}
  Phosphor bloom bleeding out of lit pixels. `true` uses `0.65`.
  ::
  ::component-prop{name="scanlines" type="boolean" default="false"}
  Overlays a CRT-style scanline pattern.
  ::
  ::component-prop{name="crt" type="boolean" default="false"}
  Adds a rolling band, chromatic fringing, a vignette and a faint flicker.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the positioned wrapper.
  ::
::

## Accessibility

- The canvas is `aria-hidden` and `pointer-events-none`; the message is also
  rendered as `sr-only` text so a screen reader announces the words rather than
  an empty box.
- Every non-text value has a text equivalent: a sprite without `text` announces
  itself as "pixel art", so pass `text` alongside a sprite when the artwork
  carries meaning.
- A `prefers-reduced-motion` preference paints the finished frame immediately
  and never starts the loop. The scanline drift, rolling band and flicker are
  CSS animations that stop under the same media query, so nothing moves without
  the reader's consent.
- The display is decorative by default: the palette and glow never encode state,
  and colour is never the only signal.

## Performance

- One `fillRect` per lit cell, batched by colour, plus a single blurred
  self-composite for the glow. The glow costs one draw call, where a per-cell
  `shadowBlur` would cost one blur per pixel.
- The backing store is capped at 2x device pixel ratio and resized through a
  `ResizeObserver`, so a wider container repaints at the right resolution
  without a re-render of the Vue tree.
- The loop only repaints when the computed frame actually changes — a blinking
  display updates twice a second instead of sixty times.
- Scrolling out of view or hiding the tab cancels the animation frame, and the
  elapsed clock only advances while the loop is running, so a returning tab
  resumes instead of skipping ahead.
