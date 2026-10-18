---
title: Drawing Cursor
description: Turns pointer movement over its own bounds into a fading, speed-tapered ink stroke on a canvas overlay.
---

A decorative ink layer over its children. Move the pointer across the component
and it paints a stroke that thins as you accelerate and fades out on a timer —
the effect of a brush that lifts when you stop.

The stroke is not a polyline of your pointer positions. Each sample's width is
derived from the distance travelled since the previous sample divided by the
elapsed time, and each segment is drawn as a quadratic curve whose endpoints are
pulled toward the neighbouring midpoints. The result has no visible kinks at the
sample boundaries, which is what a naive `lineTo` loop produces.

Your content goes in the default slot. The canvas is an absolutely positioned,
`pointer-events-none` overlay on top of it, so nothing about your layout changes
and clicks still land on your content.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="drawing-cursor-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MDrawingCursor
      ref="cursor"
      :key="run"
      :color="color"
      :line-width="lineWidth"
      :decay="decay"
      :taper="taper"
      class="h-56 rounded-2xl border-2 border-dashed border-primary/40 bg-default"
    >
      <div class="flex h-full flex-col items-center justify-center gap-1 p-6 text-center">
        <span class="text-sm font-medium text-default">Draw across this box</span>
        <span class="text-xs text-muted">
          Strokes taper with speed and fade out on their own.
        </span>
      </div>
    </MDrawingCursor>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="color"
        :items="colorItems"
      />
      <USelect
        v-model="decay"
        :items="decayItems"
      />
    </div>

    <div class="flex items-center justify-between gap-4">
      <UCheckbox
        v-model="taper"
        label="Taper"
      />
      <div class="flex gap-2">
        <UButton
          label="Clear"
          icon="i-lucide-eraser"
          size="xs"
          variant="outline"
          @click="cursor?.clear()"
        />
        <UButton
          label="Apply"
          icon="i-lucide-rotate-ccw"
          size="xs"
          variant="outline"
          @click="run++"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cursor = ref<{ clear: () => void } | null>(null)
const run = ref(0)
const color = ref('primary')
const lineWidth = ref(3)
const decay = ref(1200)
const taper = ref(true)

const colorItems = [
  { label: 'Primary', value: 'primary' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
]

const decayItems = [
  { label: 'Ink that lingers', value: 0 },
  { label: 'Slow fade', value: 1200 },
  { label: 'Quick fade', value: 400 },
]
</script>
```
::

Two methods are exposed on the instance. `clear()` empties the stroke buffer and
wipes the canvas. `toDataURL(type?, quality?)` returns a PNG data URL of the
current canvas — useful for a "save my drawing" button. Note that
`toDataURL` returns `''` before the canvas has mounted, which is the case on
every device where the effect is disabled.

::warning
The geometry props — `decay`, `lineWidth`, `smoothing`, `taper` and `blend` — are
captured once, when the renderer starts. Changing them after mount has no effect
until you remount the component (a changing `:key`, as in the example). `color` is
the exception: it is read on every frame, so switching theme tokens recolours
in-progress strokes immediately.
::


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="drawing-cursor-custom" />
  :::
#code
  <PlaygroundCode name="DrawingCursor" />
::

## Props

::component-props
  ::component-prop{name="color" type="string" default="'primary'"}
  Stroke colour. Pass a theme token (`'primary'`, `'success'`, `'warning'`,
  `'error'`, or any surface token) to follow the active theme, or any CSS colour.
  A token becomes `var(--ui-*)` on the server before upgrading to the concrete
  computed colour on the client; canvas `strokeStyle` silently ignores raw
  `var(--x)` values, so this resolution is what makes theme tokens usable here.
  ::
  ::component-prop{name="decay" type="number" default="800"}
  Milliseconds for a point to fade to zero. A stroke's alpha is derived per point
  from `1 - age / decay`, so a stroke shortens and fades from its tail rather than
  dimming uniformly. `0` disables fading entirely and the ink persists until
  cleared.
  ::
  ::component-prop{name="lineWidth" type="number" default="3"}
  Stroke width in CSS pixels before taper. With `taper` on, actual width ranges
  from 35% of this value (at speed) up to the full value.
  ::
  ::component-prop{name="taper" type="boolean" default="true"}
  Thin the stroke as the pointer moves faster. Width is
  `lineWidth * (1 - speed * 0.12)`, clamped to `[0.35, 1]`.
  ::
  ::component-prop{name="smoothing" type="number" default="0.5"}
  How far each segment's endpoints are pulled toward the neighbouring midpoints.
  `0` gives you the raw polyline, `1` gives fully smoothed curves.
  ::
  ::component-prop{name="blend" type="GlobalCompositeOperation" default="'source-over'"}
  Canvas composite operation applied to every stroke, re-set on each frame.
  `'multiply'` is the interesting one for ink over a light background.
  ::
  ::component-prop{name="clearOnLeave" type="boolean" default="true"}
  Wipe the canvas when the pointer leaves the component. Set it to `false` to let
  drawings accumulate across visits.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper alongside its own `relative`. This is where you set the
  size and shape — the canvas fills whatever box the wrapper is.
  ::
  ::component-prop{name="paused" type="boolean" default="false"}
  Stop the render loop, freezing the current frame. Unlike the other drawing
    props this one *is* read on every frame, so flipping it to `true` stops a
    running loop. Nothing re-arms it, though: the only watcher drives
    pointer capability and reduced motion, not `paused`. So it behaves as a
    one-way switch — to resume, remount with a changing `:key`.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Your content. The canvas is layered over it, so anything you render here stays
  visible and interactive underneath the ink.
  ::
::

## Accessibility

The canvas wrapper is `aria-hidden="true"` and `pointer-events-none`, so the ink
is invisible to assistive technology and never intercepts a click. The component
adds no roles and no keyboard behaviour — which is correct, because there is no
keyboard equivalent of "draw with a pointer". Do not make a form field's value
depend on a drawing.

There is no `aria-live` announcement when a stroke is completed, so if the
drawing is the user's actual submission, confirm it some other way.

Reduced motion is handled twice over. The canvas only mounts when
`useReducedMotion()` is false *and* `(hover: hover) and (pointer: fine)` matches,
so a touch device or a reduced-motion user gets no canvas and no listeners at
all — not a static drawing, nothing. Both are reactive: plugging in a mouse or
changing the OS setting mid-session builds or tears the renderer down.

## Performance

- Pointer samples come from `getCoalescedEvents()`, so fast strokes record every
  position the browser batched rather than one per frame. That is what removes
  faceting on quick movements, at the cost of more points to draw.
- Strokes are capped at 40 (`MAX_STROKES`, oldest dropped) and each stroke at 600
  points (oldest dropped), so memory is bounded regardless of session length.
- A gap longer than 120ms between samples starts a new stroke instead of drawing
  a straight line across it — which is why a slow deliberate drag and a fast one
  both look correct.
- One `requestAnimationFrame` loop clears and repaints the whole canvas every
  frame. Cost therefore scales with stroke complexity, and `decay: 0` with many
  accumulated strokes is the worst case.
- The canvas backing store is `rect × min(devicePixelRatio, 2)` and a
  `ResizeObserver` re-sizes it when the wrapper changes, so it stays sharp on
  retina without paying for a 3× buffer.
- Both listeners are registered `passive: true` and are removed in the renderer's
  teardown, along with the `ResizeObserver` and the pending frame.

::tip
A stroke whose decay has fully elapsed still occupies a slot in the buffer until
the next frame prunes it, and pruning only happens inside the render loop. With
`paused` on from the start, the loop never runs, so nothing is ever pruned — which
is another reason to treat `paused` as a mount-time flag rather than something to
toggle.
::