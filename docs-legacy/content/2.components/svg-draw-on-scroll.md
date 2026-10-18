---
title: SVG Draw on Scroll
description: Strokes one or more SVG paths as a scroll container moves through them, with an optional marker riding the line.
navigation:
  icon: i-lucide-route
---

# SVG Draw on Scroll

Hands you a `d` attribute and draws it as the user scrolls. Give it an outline,
a signature, a chart frame — anything you would otherwise animate by hand on a
scroll listener — and it tracks the progress for you.

The stroke is revealed with `stroke-dasharray` rather than by animating the `d`
itself. Each `<path>` carries `pathLength="1"`, which normalises the dash units so
that `stroke-dashoffset: 1` hides the line completely and `0` reveals all of it,
whatever the real length of the path. That means no measuring, and one numeric
range for every path.

With `paths` (plural) each entry gets its own slice of the scroll range: path *i*
draws between `i / n` and `(i + 1) / n`, so a three-path diagram completes in
sequence across the same scroll distance rather than all at once.

The progress is smoothed by a spring, which is why a fast flick still resolves
into a clean line instead of a jump.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="svg-draw-on-scroll-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <p class="text-sm text-muted">
      Scroll the panel — the four paths are drawn in sequence as it moves.
    </p>

    <div
      ref="panel"
      class="relative h-64 overflow-y-auto overscroll-contain rounded-2xl border border-default bg-default"
    >
      <div class="h-48" />

      <MSvgDrawOnScroll
        :container="() => panel"
        :offset="['start 0.75', 'end 0.25']"
        :paths="paths"
        viewBox="0 0 100 100"
        :stroke-width="1.4"
        stroke="var(--ui-primary)"
        class="mx-auto h-40 w-40"
      >
        <template #marker>
          <span class="block size-3 rounded-full bg-primary ring-4 ring-primary/20" />
        </template>
      </MSvgDrawOnScroll>

      <div class="h-48" />
    </div>
  </div>
</template>

<script setup lang="ts">
const panel = ref<HTMLElement | null>(null)

const paths = [
  'M12 78 C 26 40, 40 62, 50 38 C 60 14, 74 44, 88 22',
  'M14 22 L 50 50 L 86 22',
  'M50 8 L 50 92',
  'M10 50 L 90 50',
]
</script>```
::

The `viewBox` and the `d` values have to agree — the paths are authored in
viewBox units, and the SVG scales to fit whatever box the wrapper is given
(`preserveAspectRatio="xMidYMid meet"`). The wrapper needs a size: it renders the
`<svg>` at `h-full w-full`, so without a height the drawing has nothing to fill.

The default `offset` is `['start 0.9', 'end 0.6']`, which finishes the line while
the artwork is still in the middle of the viewport. The example widens it to
`['start 0.75', 'end 0.25']` so the whole sequence maps onto the panel's entire
scroll range: with `h-48` spacers around a `h-40` drawing in an `h-64` panel, the
first path stays hidden at `scrollTop` 0 and the last one completes exactly at the
bottom. Offsets are measured against the container, so pick them from the spacer
and artwork heights rather than copying the default — an offset range wider than
the panel's scrollable distance leaves the last path permanently unfinished.

## Props

::field-group
  ::field{name="path" type="string"}
    A single path's `d`. Ignored if `paths` is also provided and non-empty.
  ::
  ::field{name="paths" type="string[]"}
    Multiple paths drawn in sequence across the scroll range, each in its own
      equal slice.
  ::
  ::field{name="viewBox" type="string" default="'0 0 100 100'"}
    The SVG `viewBox`. Your `d` values are written in these units, so changing it
      without rewriting the paths will move the drawing.
  ::
  ::field{name="offset" type="ScrollOffset" default="['start 0.9', 'end 0.6']"}
    Motion's `useScroll` offset tuple — when drawing starts and ends, measured
      against the scroll container's edges. `["start end", "end start"]` draws
      while the element travels fully through the viewport; the default stops
      sooner so the finished stroke stays on screen.
  ::
  ::field{name="container" type="MaybeComputedElementRef"}
    The scrollable ancestor that drives the draw. Omit it and the window scrolls.
      See the warning below — the way you pass it matters.
  ::
  ::field{name="once" type="boolean" default="false"}
    Make progress monotonic, so the drawing stays complete instead of undoing
      itself when the user scrolls back up.
  ::
  ::field{name="stroke" type="string" default="'currentColor'"}
    Stroke colour. Inherits the text colour, so `text-primary` on a wrapper is
      enough.
  ::
  ::field{name="strokeWidth" type="number" default="2"}
    Stroke width in viewBox units, not pixels — it scales with the drawing.
  ::
  ::field{name="class" type="string" default="''"}
    Merged onto the wrapper alongside `relative`. This is where you set the size.
  ::
::

## Slots

::field-group
  ::field{name="marker" type="(none)"}
  An element positioned at the drawing head — a dot, a pin, a label. It is
    centred on the point and does not receive any props; position it with your own
    Tailwind classes.
  ::
::

## Accessibility

The `<svg>` is `aria-hidden="true"`, and the marker wrapper is `aria-hidden` and
`pointer-events-none`. The component contributes nothing to the accessibility
tree, which is right for a decorative reveal — but it means **the drawing is
invisible to assistive technology and there is no textual equivalent**. If the
shape conveys information, put that information in adjacent text, a caption or a
`figure`/`figcaption`.

Because the stroke is driven by scroll, it is also unreachable for keyboard users
in a short container: `Tab` cannot scroll a nested `overflow-y-auto` region
unless it is focusable, and even then the draw progress is not exposed. Set `once`
for content that must stay visible, and do not hide essential information behind
the un-drawn state.

The marker slot content sits inside an `aria-hidden` subtree, so a text marker
will not be announced. Treat it as decoration.

Reduced motion is handled by jumping to the end state: every path is reported at
full progress and the marker is placed at the end of the geometry, permanently.
The stroke is still there, it just does not animate. Note this is a full render,
not a fallback image — the reduced-motion user sees the finished drawing.

## Performance

- The draw is `stroke-dashoffset`, a paint-only property, so it never triggers
  layout. All the smoothness comes from a spring
  (`stiffness: 240`, `damping: 28`, `mass: 0.4`) rather than from animating path
  data.
- `pathLength="1"` avoids measuring every path. Without it, each path would need
  `getTotalLength()` and the dash maths would be per-path units.
- Multiple paths share a single spring. The mapping from progress to per-path
  offset is a plain function of one number, so adding paths costs arithmetic, not
  subscriptions.
- The marker is the expensive part: on every spring frame it calls
  `getPointAtLength()` and `getScreenCTM()` and allocates a `DOMPoint`. That is a
  forced layout read per frame while the marker is on screen. If you do not need
  a marker, drop the slot and none of it runs — `hasMarker` gates the whole
  path, including the extra measuring `<path>`.
- The marker is also re-synced by a `ResizeObserver` on the wrapper and once on
  mount, because the scroll value can sit still for the entire life of the
  component while the layout changes underneath it.
- Multiple `offset-path: path()` markers are avoided entirely: the marker is
  positioned from `getScreenCTM()`, so it lands correctly at any size or aspect
  ratio instead of drifting away from the stroke.

::warning
Pass `container` as a **getter**: `:container="() => panel"`. A plain
`:container="panel"` binding is unwrapped by the template and captured during
`setup`, when the ref is still `null` — nothing re-reads it afterwards and
`useScroll` silently falls back to the window. You then get no error and no
drawing progress tied to your panel, which is why several instances on one page
tend to look like only the last one works.
::

::tip
The container must be `position: relative`. Motion walks `offsetParent` from the
target up to the scroll container, so a `static` panel makes the offsets resolve
against an unrelated ancestor.
::

::tip
With `once`, progress is clamped to the high-water mark. The clamp lives in a
`useTransform` closure over a ref, so it is per-instance — several components on
one page each keep their own maximum and do not interfere.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.svgDrawOnScroll` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `svg` | `h-full w-full` |
| `marker` | `pointer-events-none absolute top-0 left-0` |
| `markerInner` | `-translate-x-1/2 -translate-y-1/2` |
