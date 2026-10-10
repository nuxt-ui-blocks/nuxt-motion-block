---
title: Dither Chart
description: Renders series data as a canvas chart dithered through an ordered Bayer matrix, with a draw-in animation.
navigation:
  icon: i-lucide-chart-spline
---

# Dither Chart

Draws a chart onto a canvas at low resolution, thresholds every pixel against an
ordered Bayer matrix, then scales the result back up with smoothing off. The
pixels become a dot grid ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a monochrome dithered chart ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â instead of antialiased
lines.

Eight variants share the same pipeline: `line`, `bar`, `stacked`, `bubbles`,
`heatmap`, `donut`, `gauge` and `funnel`. They differ only in how they paint
into the low-resolution buffer; the dithering pass runs on top of whatever they
produced, so the characteristic dot texture is identical across all of them.

The chart animates once over 900ms with an ease-out, driven by an
`IntersectionObserver` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it starts when the canvas scrolls into view and pauses
when it leaves.

::note
The variants are a closed union in the source (`DITHER_CHART_VARIANTS`). An
unrecognised `variant` looks the painter up in a lookup table, and a miss makes
`draw` return early ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the canvas stays blank rather than throwing.
::

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dither-chart-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MDitherChart
      :key="run"
      :data="data"
      variant="line"
      label="Sessions per day"
      caption="Two weeks of traffic, dithered through a 4ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â4 Bayer matrix."
      :width="320"
      :height="160"
    />

    <UButton
      label="Replay draw-in"
      icon="i-lucide-rotate-ccw"
      variant="outline"
      class="justify-center"
      @click="run++"
    />
  </div>
</template>

<script setup lang="ts">
const run = ref(0)

const data = [
  {
    name: 'Mon',
    points: [
      { label: '6am', value: 42 },
      { label: 'Noon', value: 118 },
      { label: '6pm', value: 96 },
      { label: 'Midnight', value: 31 },
    ],
  },
  {
    name: 'Tue',
    points: [
      { label: '6am', value: 58 },
      { label: 'Noon', value: 142 },
      { label: '6pm', value: 121 },
      { label: 'Midnight', value: 47 },
    ],
  },
]
</script>
```
::

Data is a list of series, each with a `name` and a list of `points`. Only
`points[].value` drives geometry; `label` is what the screen-reader description
reads out, so it is worth filling in even though it is not drawn. `width` and
`height` are CSS pixels ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the canvas backing store is scaled by
`devicePixelRatio` internally.

## Props

::field-group
  ::field{name="data" type="DitherChartSeries[]" required}
  The series to draw. Each entry is `{ name?, color?, points: { label?, value }[] }`.
  A per-series `color` overrides the palette for `line`, `bar`, `stacked` and
  `bubbles`, but the `donut`, `gauge`, `funnel` and `heatmap` painters ignore it
  and use the palette only. An empty array renders nothing.
  ::
  ::field{name="variant" type="'donut' | 'line' | 'bar' | 'stacked' | 'gauge' | 'funnel' | 'heatmap' | 'bubbles'" default="'line'"}
  Which painter runs into the low-resolution buffer.
  ::
  ::field{name="matrix" type="2 | 4 | 8" default="4"}
  Order of the Bayer threshold matrix. Only 2, 4 and 8 are prebuilt; a higher
  order means a sparser dot pattern.
  ::
  ::field{name="pixelSize" type="number" default="3"}
  Size in CSS pixels of one low-resolution pixel. This is the dither dot pitch
  and the coarseness control: the buffer is `width / pixelSize` by
  `height / pixelSize`, so raising it makes the chart blockier and cheaper.
  ::
  ::field{name="width" type="number" default="320"}
  CSS width of the canvas. Also used for the buffer width.
  ::
  ::field{name="height" type="number" default="180"}
  CSS height of the canvas. Also used for the buffer height.
  ::
  ::field{name="animate" type="boolean" default="true"}
  Whether to run the 900ms draw-in. When `false` the chart draws immediately at
  full progress and no `IntersectionObserver` is created.
  ::
  ::field{name="palette" type="string[]" default="undefined"}
  Colours cycled across series. When omitted or empty, the source falls back to
  reading `--ui-primary` and the element's computed `color` from the DOM ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â so
  the chart follows your theme only if it inherits from a themed ancestor.
  ::
  ::field{name="label" type="string" default="undefined"}
  Visible title above the canvas, and the first word of the generated
  screen-reader description.
  ::
  ::field{name="caption" type="string" default="undefined"}
  Optional visible caption rendered in a `figcaption` below the chart.
  ::
::

## Accessibility

The component builds its own text alternative: a `sr-only` span containing a
generated summary of every series and point, formatted from `label`, `variant`
and the data (`"Sessions per day, line variant. Mon ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â 6am: 42, Noon: 118. ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦"`).
The canvas itself is `aria-hidden="true"` and `tabindex="-1"`, so it never
becomes a focus trap or a duplicated announcement. That makes the chart
readable without any work from you, provided the data has meaningful labels.

There is no role on the wrapping `figure` beyond the implicit one, and no
keyboard interaction ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a chart is not operable. There is no
`prefers-reduced-motion` handling, so the 900ms draw-in plays regardless; pass
`animate="false"` to render it statically.

## Performance

- Each frame paints a buffer canvas of `width / pixelSize` ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â `height / pixelSize`
  and runs a per-pixel threshold pass over it, so work scales with the buffer
  area, not the display size. `pixelSize` is the cheapest lever.
- The draw-in is driven by `requestAnimationFrame` and only while the canvas
  intersects the viewport; leaving the viewport cancels the frame, and the
  elapsed time is preserved so it resumes rather than restarting.
- The visible canvas is only resized inside `draw`, and its backing store is set
  to `width * devicePixelRatio`, with `imageSmoothingEnabled = false` so the
  upscale stays hard-edged.
- The `data`/`variant`/`matrix`/`pixelSize`/`width`/`height`/`palette` watcher is
  `deep: true`, so mutating a point's `value` in place triggers a full redraw
  rather than a partial update.
- The observer and the pending animation frame are both released in
  `onUnmounted`.

::tip
With `animate` on (the default), the deep watcher redraws at progress `0` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the
pre-animation state ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and the 900ms tween does not restart, because it already
ran on mount. Changing `variant` or `data` after the chart has drawn therefore
blanks it. Either mount with a changing `:key` to replay, or pass
`animate="false"` if you plan to swap variants live.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.ditherChart` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'inline-flex flex-col gap-2 text-default'` |
| `label` | `'font-medium text-sm'` |
| `canvas` | `'block'` |
| `description` | `'sr-only'` |
| `caption` | `'text-muted text-xs'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.ditherChart` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex flex-col gap-2 text-default` |
| `label` | `font-medium text-sm` |
| `canvas` | `block` |
| `description` | `sr-only` |
| `caption` | `text-muted text-xs` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.ditherChart` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex flex-col gap-2 text-default` |
| `label` | `font-medium text-sm` |
| `canvas` | `block` |
| `description` | `sr-only` |
| `caption` | `text-muted text-xs` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.ditherChart` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex flex-col gap-2 text-default` |
| `label` | `font-medium text-sm` |
| `canvas` | `block` |
| `description` | `sr-only` |
| `caption` | `text-muted text-xs` |
