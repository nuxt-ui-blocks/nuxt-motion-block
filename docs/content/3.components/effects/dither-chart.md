---
title: Dither Chart
description: Renders series data as a canvas chart dithered through an ordered Bayer matrix, with a draw-in animation.
---

Draws a chart onto a canvas at low resolution, thresholds every pixel against an
ordered Bayer matrix, then scales the result back up with smoothing off. The
pixels become a dot grid — a monochrome dithered chart — instead of antialiased
lines.

Eight variants share the same pipeline: `line`, `bar`, `stacked`, `bubbles`,
`heatmap`, `donut`, `gauge` and `funnel`. They differ only in how they paint
into the low-resolution buffer; the dithering pass runs on top of whatever they
produced, so the characteristic dot texture is identical across all of them.

The chart animates once over 900ms with an ease-out, driven by an
`IntersectionObserver` — it starts when the canvas scrolls into view and pauses
when it leaves.

::note
The variants are a closed union in the source (`DITHER_CHART_VARIANTS`). An
unrecognised `variant` looks the painter up in a lookup table, and a miss makes
`draw` return early — the canvas stays blank rather than throwing.
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
      caption="Two weeks of traffic, dithered through a 4×4 Bayer matrix."
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
`height` are CSS pixels — the canvas backing store is scaled by
`devicePixelRatio` internally.

## Examples

### Variants

All eight painters share the same dithering pass, so only the geometry changes when you swap `variant`. The example cycles them across a single dataset — `line`, `bar`, `stacked`, `bubbles`, `heatmap`, `donut`, `gauge` and `funnel`.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="dither-chart-variants" />
  :::
#code
```vue
<template>
  <div class="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
    <MDitherChart
      v-for="item in variants"
      :key="item.variant"
      :data="series"
      :variant="item.variant"
      :label="item.label"
      :width="220"
      :height="140"
    />
  </div>
</template>

<script setup lang="ts">
const series = [
  {
    name: 'This week',
    points: [
      { label: 'Mon', value: 88 },
      { label: 'Tue', value: 64 },
      { label: 'Wed', value: 47 },
      { label: 'Thu', value: 29 },
    ],
  },
  {
    name: 'Last week',
    points: [
      { label: 'Mon', value: 55 },
      { label: 'Tue', value: 79 },
      { label: 'Wed', value: 38 },
      { label: 'Thu', value: 61 },
    ],
  },
]

const variants = [
  { variant: 'line', label: 'Line' },
  { variant: 'bar', label: 'Bar' },
  { variant: 'stacked', label: 'Stacked' },
  { variant: 'bubbles', label: 'Bubbles' },
  { variant: 'heatmap', label: 'Heatmap' },
  { variant: 'donut', label: 'Donut' },
  { variant: 'gauge', label: 'Gauge' },
  { variant: 'funnel', label: 'Funnel' },
] as const
</script>
```
::

### Matrix order

`matrix` is the order of the Bayer threshold grid. A higher order spreads the same coverage across more distinct levels, so the dot pattern gets sparser and the tone ramp smoother. Compare 2×2, 4×4 and 8×8.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="dither-chart-matrix" />
  :::
#code
```vue
<template>
  <div class="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
    <MDitherChart
      v-for="order in orders"
      :key="order"
      :data="series"
      variant="line"
      :matrix="order"
      :label="`${order}×${order} Bayer`"
      :width="200"
      :height="130"
    />
  </div>
</template>

<script setup lang="ts">
const orders = [2, 4, 8] as const

const series = [
  {
    name: 'Sessions',
    points: [
      { label: 'Mon', value: 42 },
      { label: 'Tue', value: 118 },
      { label: 'Wed', value: 96 },
      { label: 'Thu', value: 61 },
      { label: 'Fri', value: 132 },
    ],
  },
]
</script>
```
::

### Pixel size

`pixelSize` is the dither dot pitch in CSS pixels — the buffer is `width / pixelSize` by `height / pixelSize`, so raising it makes every mark blockier and cheaper to draw. This is the main lever when a chart feels expensive.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="dither-chart-pixel" />
  :::
#code
```vue
<template>
  <div class="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
    <MDitherChart
      v-for="size in sizes"
      :key="size"
      :data="series"
      variant="heatmap"
      :pixel-size="size"
      :label="`${size}px pitch`"
      :width="200"
      :height="130"
    />
  </div>
</template>

<script setup lang="ts">
const sizes = [1, 3, 6] as const

const series = [
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
  {
    name: 'Wed',
    points: [
      { label: '6am', value: 74 },
      { label: 'Noon', value: 101 },
      { label: '6pm', value: 138 },
      { label: 'Midnight', value: 52 },
    ],
  },
]
</script>
```
::

### Palette

Pass a `palette` of CSS colours to dye the series. A per-series `color` overrides the palette for the painters that read it; the example anchors three colours on a `stacked` chart.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="dither-chart-palette" />
  :::
#code
```vue
<template>
  <MDitherChart
    :data="series"
    variant="stacked"
    :palette="palette"
    label="Sessions by channel"
    caption="Custom palette — each series dyed with its own anchor colour."
    :width="360"
    :height="180"
  />
</template>

<script setup lang="ts">
const palette = ['#f97316', '#22c55e', '#6366f1']

const series = [
  {
    name: 'Search',
    points: [
      { label: 'Mon', value: 48 },
      { label: 'Tue', value: 62 },
      { label: 'Wed', value: 39 },
      { label: 'Thu', value: 71 },
    ],
  },
  {
    name: 'Direct',
    points: [
      { label: 'Mon', value: 34 },
      { label: 'Tue', value: 28 },
      { label: 'Wed', value: 45 },
      { label: 'Thu', value: 22 },
    ],
  },
  {
    name: 'Social',
    points: [
      { label: 'Mon', value: 21 },
      { label: 'Tue', value: 37 },
      { label: 'Wed', value: 54 },
      { label: 'Thu', value: 43 },
    ],
  },
]
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="dither-chart-custom" />
  :::
#code
  <PlaygroundCode name="DitherChart" />
::

## Props

::component-props
  ::component-prop{name="data" type="DitherChartSeries[]" required}
  The series to draw. Each entry is `{ name?, color?, points: { label?, value }[] }`.
  A per-series `color` overrides the palette for `line`, `bar`, `stacked` and
  `bubbles`, but the `donut`, `gauge`, `funnel` and `heatmap` painters ignore it
  and use the palette only. An empty array renders nothing.
  ::
  ::component-prop{name="variant" type="'donut' | 'line' | 'bar' | 'stacked' | 'gauge' | 'funnel' | 'heatmap' | 'bubbles'" default="'line'"}
  Which painter runs into the low-resolution buffer.
  ::
  ::component-prop{name="matrix" type="2 | 4 | 8" default="4"}
  Order of the Bayer threshold matrix. Only 2, 4 and 8 are prebuilt; a higher
  order means a sparser dot pattern.
  ::
  ::component-prop{name="pixelSize" type="number" default="3"}
  Size in CSS pixels of one low-resolution pixel. This is the dither dot pitch
  and the coarseness control: the buffer is `width / pixelSize` by
  `height / pixelSize`, so raising it makes the chart blockier and cheaper.
  ::
  ::component-prop{name="width" type="number" default="320"}
  CSS width of the canvas. Also used for the buffer width.
  ::
  ::component-prop{name="height" type="number" default="180"}
  CSS height of the canvas. Also used for the buffer height.
  ::
  ::component-prop{name="animate" type="boolean" default="true"}
  Whether to run the 900ms draw-in. When `false` the chart draws immediately at
  full progress and no `IntersectionObserver` is created.
  ::
  ::component-prop{name="palette" type="string[]" default="undefined"}
  Colours cycled across series. When omitted or empty, the chart resolves the
  Nuxt UI `primary` token for the current theme and pairs it with the element's
  computed `color` — so it follows your brand in light and dark mode with no
  extra wiring. Any CSS colour string works here, including `var(--ui-*)`.
  ::
  ::component-prop{name="label" type="string" default="undefined"}
  Visible title above the canvas, and the first word of the generated
  screen-reader description.
  ::
  ::component-prop{name="caption" type="string" default="undefined"}
  Optional visible caption rendered in a `figcaption` below the chart.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.ditherChart` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-flex flex-col gap-2 text-default`
  ::
  ::component-slot-row{name="label"}
  `font-medium text-sm`
  ::
  ::component-slot-row{name="canvas"}
  `block`
  ::
  ::component-slot-row{name="description"}
  `sr-only`
  ::
  ::component-slot-row{name="caption"}
  `text-muted text-xs`
  ::
::

## Accessibility

The component builds its own text alternative: a `sr-only` span containing a
generated summary of every series and point, formatted from `label`, `variant`
and the data (`"Sessions per day, line variant. Mon — 6am: 42, Noon: 118. …"`).
The canvas itself is `aria-hidden="true"` and `tabindex="-1"`, so it never
becomes a focus trap or a duplicated announcement. That makes the chart
readable without any work from you, provided the data has meaningful labels.

There is no role on the wrapping `figure` beyond the implicit one, and no
keyboard interaction — a chart is not operable. There is no
`prefers-reduced-motion` handling, so the 900ms draw-in plays regardless; pass
`animate="false"` to render it statically.

## Performance

- Each frame paints a buffer canvas of `width / pixelSize` × `height / pixelSize`
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
With `animate` on (the default), the deep watcher redraws at progress `0` — the
pre-animation state — and the 900ms tween does not restart, because it already
ran on mount. Changing `variant` or `data` after the chart has drawn therefore
blanks it. Either mount with a changing `:key` to replay, or pass
`animate="false"` if you plan to swap variants live.
::

