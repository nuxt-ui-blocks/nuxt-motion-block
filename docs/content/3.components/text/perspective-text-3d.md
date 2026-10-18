---
title: Perspective Text 3D
description: Words spread through a Z stack on a tilted plane, driven by nothing, the pointer, or scroll.
---

The copy is broken into segments and each one is pushed along the Z axis by
`40px` more than its neighbour, so the words sit at different depths inside a
single tilted plane. The whole plane carries a CSS `perspective` of `800px` and a
resting tilt of `8°` on X and `10°` on Y.

The depth stack is the point. A tilt alone gives you flat text at an angle; the
`translateZ` steps are what make the words visibly recede and come forward, and
`preserve-3d` on the plane is what stops the browser flattening them back into a
single bitmap.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="perspective-text-3d-static" />
  :::
#code
```vue
<template>
  <MPerspectiveText3D
    class="text-4xl font-bold"
    text="Depth in the letterforms"
  />
</template>
```
::

## Examples

### Scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="perspective-text-3d-scroll" />
  :::
#code
```vue
<template>
  <div
    ref="scrollContainer"
    class="relative h-44 overflow-y-auto rounded-xl border border-default p-6"
  >
    <div class="flex min-h-80 flex-col justify-between">
      <p class="text-sm text-muted">
        Scroll inside this box
      </p>
      <MPerspectiveText3D
        :container="() => scrollContainer"
        class="text-center text-3xl font-bold"
        driver="scroll"
        text="Scroll drives the tilt"
      />
      <p class="text-sm text-muted">
        The plane rotates from one edge of the range to the other, sprung so it
        trails the scroll instead of snapping to it.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// `container` is passed as a getter. A bare `:container="scrollContainer"` is
// unwrapped by the template to `null` during `setup`, so it would be captured
// and never re-read, and `useScroll` would silently fall back to the window.
//
// The container also carries `relative` above. Motion finds the headline by
// walking `offsetParent` from it up to the container, and a static container is
// skipped by that walk, leaving the offsets measured in page space where
// scrolling the box cannot move them.
const scrollContainer = ref<HTMLElement | null>(null)
</script>
```
::

### Pointer

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="perspective-text-3d-pointer" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MPerspectiveText3D
      class="text-4xl font-bold"
      driver="pointer"
      text="Move your cursor"
    />
    <p class="max-w-sm text-center text-sm text-muted">
      The plane follows the pointer across the wrapper and springs back to flat
      when the cursor leaves.
    </p>
  </div>
</template>
```
::

The pointer's normalised position runs from `-0.5` to `0.5` and is multiplied by
`2`, so the full sweep of the wrapper maps to the full sweep of the tilt: the
corners reach the configured `rotateX`/`rotateY` angles and the centre is flat.

### Lines

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="perspective-text-3d-lines" />
  :::
#code
```vue
<template>
  <MPerspectiveText3D
    class="text-3xl font-bold leading-snug"
    :text="'One plane per line\nstacked in depth'"
    split="lines"
  />
</template>
```
::

With `split="lines"` each segment is a block and the newlines in `text` are
respected, so a multi-line headline keeps its own line breaks and each line
receives its own depth step.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="perspective-text-3d-custom" />
  :::
#code
  <PlaygroundCode name="PerspectiveText3D" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The copy to break into segments. Segments are joined by a single space when
  `split` is `words`.
  ::

  ::component-prop{name="driver" type="'static' | 'pointer' | 'scroll'" default="'static'"}
  What drives the plane's rotation. See [Drivers](#drivers).
  ::

  ::component-prop{name="split" type="'words' | 'lines'" default="'words'"}
  How to break the copy up. `words` collapses all whitespace, so the headline
  always lays out on one line. `lines` respects `\n` and falls back to the whole
  string when there is no newline at all.
  ::

  ::component-prop{name="depth" type="number" default="40"}
  Z offset in pixels between neighbouring segments. `0` leaves every word in one
  plane — a plain tilt with no depth.
  ::

  ::component-prop{name="perspective" type="number" default="800"}
  CSS `perspective` on the wrapper, in pixels. Larger is a flatter, more
  telephoto look; smaller exaggerates the depth.
  ::

  ::component-prop{name="rotateX" type="number" default="8"}
  Resting tilt on the X axis, in degrees. Also the pointer driver's vertical
  range and the scroll driver's amplitude.
  ::

  ::component-prop{name="rotateY" type="number" default="10"}
  Resting tilt on the Y axis, in degrees. Same role on the pointer and scroll
  drivers.
  ::

  ::component-prop{name="container" type="MaybeComputedElementRef"}
  Scroll container to measure against. Pass a getter in templates —
  `:container="() => scrollContainer"` — not the ref on its own. The container must
  be positioned (`relative` is enough) or the tilt will not move; see
  [The container must be positioned](#the-container-must-be-positioned).
  Defaults to the window.
  ::

  ::component-prop{name="offset" type="ScrollOffset" default="['start 0.9', 'end 0.45']"}
  Motion scroll offset tuple for the `scroll` driver. Motion's own default
  (`['start start', 'end end']`) never completes its range for a headline shorter
  than its scroller, which leaves progress pinned. This default opens the window as
  the headline enters the lower part of the scroller and closes it around the middle.
  ::

  ::component-prop{name="class" type="string"}
  Classes for the wrapper, which also carries the CSS `perspective`.
  ::
::

## Accessibility

Every visual segment is `aria-hidden="true"`, and the readable copy lives in a
single `sr-only` span inside the wrapper.

An `aria-label` on the wrapper would be the obvious alternative, but a plain `div`
with no role carries no accessible name, so the label would be silently dropped
in favour of its (now meaningless) contents. The hidden copy is the only approach
that works on a role-less element, and it also guarantees the sentence is read as
one string rather than as a list of fragments.

Under `prefers-reduced-motion` the tree is **flattened rather than swapped**: both
rotations go to exactly `0` and the `translateZ` steps are dropped, leaving the
segments in one plane. A second element shape is not an option, because the server
cannot know the visitor's preference — it would always send the 3D tree and the
client would swap the DOM out from under a live one. Flattening keeps the same
elements in both, and `transition` collapses to `duration: 0` so they arrive at
rest within a frame.

Zero is exactly zero rather than "smaller", so the text reads as ordinary copy
rather than as a half-finished effect.

## Performance

- The rotation is `transform` only — both the scroll and pointer drivers animate
  `rotateX` and `rotateY` — and each segment's `translateZ` is static, so the
  plane animates entirely on the compositor and never triggers layout or paint.
- `useScroll` is registered on **every** mount regardless of `driver`, because
  hooks cannot be conditional without the hook order changing between renders. On
  the `static` and `pointer` drivers its result is simply never read, so the
  subscription is the only cost.
- The `pointer` driver attaches `pointermove`/`pointerleave` to the wrapper and
  reads `getBoundingClientRect()` once per move to normalise the cursor position;
  the tilt is a spring, so DOM writes are throttled to animation frames rather
  than to the raw pointer event rate.
- The `scroll` driver runs two individual springs directly on the plane's `style`
  instead of a composed template, so each frame writes transforms rather than
  reconciling a string, and there is no scroll listener beyond Motion's own.

## Drivers

`driver` picks what owns the plane's rotation. All three share the same spring.

### `static`

The default. The tilt is applied once, on mount, from `rotateX` and `rotateY`, and
never changes. That is the shape of a static headline — the depth is the whole
effect, and there is nothing to drive.

### `pointer`

The plane follows the cursor across the wrapper's own bounding box. The pointer's
normalised position runs from `-0.5` to `0.5` and is multiplied by **2**, so the
full sweep of the element maps to the full sweep of the tilt: the corners of the
wrapper reach the configured angles and the centre is flat.

Leaving the wrapper springs both axes back to zero. The tilt is **not** applied
while reduced motion is requested, and the pointer handlers return early in that
case, so the effect cannot be triggered by moving a mouse.

### `scroll`

The plane rotates across the element's scroll progress, from one edge of the range
to the other, on both axes in opposite directions. With no `container` it measures
against the window.

```vue
<div ref="scrollContainer" class="h-44 overflow-y-auto">
  <MPerspectiveText3D
    :container="() => scrollContainer"
    driver="scroll"
    text="Scroll drives the tilt"
  />
</div>
```

Pass a **getter**, not the ref. See
[Passing a scroll container](#passing-a-scroll-container).

## How the depth stack is built

Segment *i* is offset by `(i - midIndex) × depth`, where `midIndex` is
`(length - 1) / 2`. An odd-length stack therefore has one segment exactly on the
plane with pairs either side of it; an even-length stack splits the difference
between its two middle segments. Either way the stack is centred, so the headline
as a whole does not drift in depth.

At the `40px` default, five words sit at `-80, -40, 0, 40, 80`.

## Passing a scroll container

`container` is typed as `MaybeComputedElementRef` and is handed straight to
`useScroll` **without unwrapping**:

```ts
// correct — hand over the getter
useScroll({ container: props.container, target: wrapperRef })
```

```ts
// wrong — hands over a plain element
useScroll({ container: props.container?.value, target: wrapperRef })
```

In a template, pass the **getter** — `:container="() => scrollContainer"` — not the
ref on its own. A bare `:container="scrollContainer"` is unwrapped by the template
to `null` during `setup`, so the component captures a value that is never re-read;
`useScroll` then falls back to measuring the window, which for a headline inside a
scrollable box means it never tilts. The getter is invoked inside Motion's
`flush: 'post'` effect, where your ref is a tracked dependency, so the container is
resolved once the element is mounted.

### The container must be positioned

A container that is left at `position: static` produces a headline that holds one
angle for the entire scroll. No amount of scrolling moves it, and there is no error
to explain why.

Motion locates the headline by walking `offsetParent` from the headline up to the
container, adding up `offsetTop` at each step (`calcInset` in
`framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs`). `offsetParent` only ever
returns a **positioned** ancestor, so a static container is stepped straight over: the
walk continues up to `<body>`, the accumulated offset is measured in page space, and it
never changes when the container scrolls. The headline appears to be at a fixed
distance from the top of the document, and progress stays pinned.

```html
<!-- wrong: static, so the walk skips it -->
<div ref="scrollContainer" class="h-64 overflow-y-auto">
  <MPerspectiveText3D :container="() => scrollContainer" driver="scroll" text="…" />
</div>
```

```html
<!-- correct -->
<div ref="scrollContainer" class="relative h-64 overflow-y-auto">
  <MPerspectiveText3D :container="() => scrollContainer" driver="scroll" text="…" />
</div>
```

The window needs nothing here — it is the `offsetParent` of everything, which is why
the static container only breaks the custom-scroller case. Motion's own development
build warns about this, but it is a `warnOnce` about `position`, not about progress,
so it reads as unrelated advice next to a headline that will not turn.

### Reading the sweep

The default `offset` window covers the headline's own travel through the scroller.
Past that point progress correctly rests at `1`: any further scroll is filler space
below the headline with nothing left to track. Give the box a trailing spacer and the
tilt inverts as the headline passes, then holds — which is the intended behaviour, not
a second freeze.

## Notes

- The spring is `{ type: 'spring', duration: 0.25, bounce: 0.1 }` on every
  driven rotation. `bounce: 0.1` is nearly critically damped — enough to feel
  physical, not enough to wobble past the target more than once.
- The scroll rotation travels as two individual springs on the plane's `style`. A
  composed `useMotionTemplate` string is resolved to plain text once when the
  visual element is created and then frozen at whatever it measured before the
  first scroll frame, and handing the springs to `animate` instead leaves the
  plane with no transform at all. `Motion` subscribes to each motion value placed
  directly in `style`.
- `useScroll` is registered on **every** mount regardless of driver, because hooks
  cannot be conditional without the order changing between renders. For `static`
  and `pointer` the result is simply never read.
- `depth` below `0` is not clamped — it inverts the stack, so the first word ends
  up furthest back. Useful occasionally, but almost never what you want.
- When `split` is `lines` each segment is a block; when it is `words` each is an
  `inline-block`. The wrapper is always `inline-block`, so the component sizes
  itself to its content rather than to its parent.
- Keys are segment indexes, so editing the copy reuses the existing elements in
  place rather than remounting them.
