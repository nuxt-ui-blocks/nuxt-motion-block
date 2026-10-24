---
title: Pixel Brush Canvas
description: A pixel-art canvas with pencil, eraser, fill, line and rectangle tools, a keyboard cursor and an undo stack.
---

A small drawing surface made of square cells. The artwork lives in a single
`Uint8Array` of palette indices, and every stroke writes into that buffer before
repainting only the cells it touched, so a drag costs one small `drawRegion`
call per cell rather than a full canvas repaint.

Five tools cover the usual pixel-editor moves: pencil, eraser, flood fill, and
line and rectangle outlines that preview from the cell where the drag started.
The built-in palette below the canvas can be hidden when the drawing is meant to
be read-only chrome in a larger editor.

## Usage

Pass nothing for a 16x16 grid at 20px cells, with the colour and brush palettes
shown. `initial` seeds the buffer with artwork, as rows of palette indices;
negative values mean empty.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="pixel-brush-canvas-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 px-6 py-10">
    <MPixelBrushCanvas :initial="heart" />

    <p class="max-w-sm text-center text-xs text-muted">
      Pick a colour, then drag on the canvas. Arrow keys move the cursor and
      Space paints.
    </p>
  </div>
</template>

<script setup lang="ts">
const heart = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1],
  [-1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1],
  [1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1],
  [-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1],
  [-1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1],
  [-1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
]
</script>
```
::

The grid size is counted in cells, not CSS pixels: `width` and `height` describe
the artwork, and `pixelSize` decides how large each cell is drawn.

## Customize

`palette` accepts any CSS colour string, including theme tokens such as
`var(--ui-primary)`, which are resolved against the live element before the
first paint. `grid` draws a hairline between cells, `showTools` hides the
palette and tool picker, and `pixelSize` scales the whole surface.

`brush` and `color` can be left uncontrolled or bound with `v-model`. The
component also exposes a handle for the surrounding editor:

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface PixelBrushHandle {
  clear: () => void
  getPixels: () => Uint8Array
  toDataURL: () => string
  undo: () => void
}

const canvas = ref<PixelBrushHandle | null>(null)
</script>

<template>
  <MPixelBrushCanvas ref="canvas" :width="32" :height="32" />
  <UButton @click="canvas?.undo()">Undo</UButton>
</template>
```

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="pixel-brush-canvas-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-5 px-6 py-10">
    <MPixelBrushCanvas
      ref="canvas"
      v-model:brush="brush"
      v-model:color="color"
      :grid="true"
      :height="18"
      :palette="palette"
      :pixel-size="14"
      :width="24"
    />

    <div class="flex flex-wrap items-center justify-center gap-3">
      <span class="rounded-full bg-elevated px-3 py-1 text-xs text-muted">
        {{ brush }} · colour {{ color + 1 }}
      </span>
      <UButton
        label="Undo"
        icon="i-lucide-undo-2"
        color="neutral"
        variant="outline"
        size="sm"
        @click="canvas?.undo()"
      />
      <UButton
        label="Clear"
        icon="i-lucide-trash-2"
        color="neutral"
        variant="outline"
        size="sm"
        @click="canvas?.clear()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PixelBrushHandle {
  clear: () => void
  undo: () => void
}

const canvas = ref<PixelBrushHandle | null>(null)
const brush = ref<'pencil' | 'eraser' | 'fill' | 'line' | 'rect'>('pencil')
const color = ref(0)
const palette = [
  'var(--ui-primary)',
  'var(--ui-error)',
  'var(--ui-warning)',
  'var(--ui-success)',
  'var(--ui-info)',
  '#111827',
]
</script>
```
::

## Props

::component-props
  ::component-prop{name="width" type="number" default="16"}
  Width of the art grid, in pixel cells.
  ::
  ::component-prop{name="height" type="number" default="16"}
  Height of the art grid, in pixel cells.
  ::
  ::component-prop{name="pixelSize" type="number" default="20"}
  Size of a single cell, in CSS pixels.
  ::
  ::component-prop{name="palette" type="string[]" default="nine-colour default"}
  Available paint colours, as any CSS colour string.
  ::
  ::component-prop{name="brush" type="'pencil' | 'eraser' | 'fill' | 'line' | 'rect'"}
  Active tool. Uncontrolled when omitted.
  ::
  ::component-prop{name="color" type="number"}
  Index into `palette` for the active paint colour. Uncontrolled when omitted.
  ::
  ::component-prop{name="grid" type="boolean" default="false"}
  Draw a hairline between pixel cells.
  ::
  ::component-prop{name="initial" type="number[][]"}
  Initial artwork as rows of palette indices. Negative values mean empty.
  ::
  ::component-prop{name="showTools" type="boolean" default="true"}
  Render the colour and brush palettes below the canvas.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root wrapper.
  ::
::

## Events

::component-props
  ::component-prop{name="change" type="(pixels: Uint8Array) => void"}
  Fires with a copy of the pixel buffer after every committed mutation.
  ::
  ::component-prop{name="update:brush" type="(brush: PixelBrushCanvasBrush) => void"}
  Fires when a tool is chosen, whether or not `brush` is bound.
  ::
  ::component-prop{name="update:color" type="(color: number) => void"}
  Fires when a swatch is chosen, whether or not `color` is bound.
  ::
::

## Accessibility

- The drawing area is a focusable `role="application"` labelled "Pixel art
  drawing canvas", because no semantic element models two-dimensional arrow-key
  navigation.
- <kbd>Arrow</kbd> keys move a visible cursor cell, <kbd>Space</kbd> paints at
  it, and <kbd>Ctrl</kbd> or <kbd>Cmd</kbd> + <kbd>Z</kbd> undoes. The single
  key shortcuts are <kbd>B</kbd> for pencil, <kbd>E</kbd> for eraser and
  <kbd>G</kbd> for fill.
- For the line and rectangle tools, the first <kbd>Space</kbd> sets an anchor and
  the second commits the shape, so the whole tool works without a pointer.
- A visually hidden `aria-live="polite"` region announces the column, row and
  colour of the focused cell, and the anchor and commit steps.
- Swatches and tools are real buttons with `aria-pressed`, so the active choice
  is exposed to assistive technology and not only by the ring or chip.
- The canvas has a visible focus ring. Under `prefers-reduced-motion: reduce`
  the swatch ring and tool chip appear without their scale animation; drawing
  itself never animates.

## Performance

- Cells are written in place in a `Uint8Array`; a stroke repaints only the
  bounding box it changed, so dragging across a corner does not redraw the grid.
- The component keeps no per-cell reactive state, so painting never triggers a
  Vue render. The only reactive updates are the cursor cell and the live-region
  text.
- Flood fill is iterative and stack-based, so a full-canvas fill cannot overflow
  the call stack. Line and rectangle cells come from bounded Bresenham and
  outline loops.
- The undo stack stores at most 50 buffer snapshots. A snapshot is pushed when a
  mutation is about to happen and popped again if nothing actually changed.
- The canvas backing store is capped at 2x device pixel ratio and only resized
  when the grid or cell size changes, not on every stroke.
- Pointer capture keeps a drag alive when the pointer leaves the canvas, and no
  animation frame or timer runs while the canvas is idle.
