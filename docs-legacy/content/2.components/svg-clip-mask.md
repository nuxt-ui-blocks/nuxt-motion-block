---
title: SVG Clip Mask
description: Masks its content with a real SVG clipPath that can morph, step on scroll, or swap on hover.
navigation:
  icon: i-lucide-scan
---

# SVG Clip Mask

A mask that clips its content to a real SVG `<clipPath>` — and animates that
path. Four presets (`blob`, `arch`, `diamond`, `wave`) each ship with a partner
outline so they can morph, and you can supply your own in
`objectBoundingBox` (0..1) coordinates.

The path is declared with `clipPathUnits="objectBoundingBox"`, which is why
every preset is authored in `0..1` and reuses at any size without scaling. There
are four animation modes: `none`, `morph` (a continuous loop), `scroll` (a
discrete step as the frame scrolls) and `hover` (a swap on hover).

## Usage

Give the component a height — the root is `relative` with no intrinsic size, and
the clipped child is `h-full w-full`, so without one the mask collapses. Choose
a `shape`, and add `animate="morph"` for the continuous version.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="svg-clip-mask-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md">
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="shape in shapes"
        :key="shape"
        class="h-48"
      >
        <MSvgClipMask
          :shape="shape"
          animate="morph"
          :duration="6"
          class="h-full w-full"
        >
          <img
            :src="`https://picsum.photos/seed/${shape}/400/400`"
            :alt="`${shape} masked photo`"
            class="h-full w-full object-cover"
          >
        </MSvgClipMask>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const shapes = ['blob', 'arch', 'diamond', 'wave'] as const
</script>
```
::

## Authoring morph paths

`morphPaths` is how you supply your own outlines, and it has one hard
requirement: **every path must share the same command structure** — the same
sequence of `M`/`L`/`C`/`Z` and the same number of coordinates.

The interpolation is positional. Paths are split on numbers and lerped by index,
so `M0.5,0 L1,0.5` against `M0.5,0.1 L0.9,0.5` blends cleanly, but a path with
an extra `C` segment would have its coordinate lerped against a missing one and
read as `0` — the mask bends into nonsense rather than failing loudly.

Every preset already satisfies this internally: each ships a partner that repeats
its command structure number for number.

## Animation modes

| Mode | Behaviour | `duration` used? | Needs |
| --- | --- | --- | --- |
| `none` *(default)* | Static clip on `paths[0]` | No | — |
| `morph` | Loops continuously through every path | Yes — one full cycle | 2+ paths |
| `scroll` | Steps through the paths as the frame scrolls | No | 2+ paths |
| `hover` | Swaps to `paths[1]` while hovered | No | 2+ paths and a fine pointer |

`morph` cycles through the whole list and wraps to the first path, so more than
two paths produce a longer choreography rather than a faster ping-pong. `scroll`
discrete-steps — `Math.floor(progress × paths.length)` — so with four paths each
quarter of the scroll window holds one shape. `hover` only swaps on devices
matching `(hover: hover) and (pointer: fine)`; on touch it stays static.

Discrete swaps (scroll steps, hover) are not applied instantly. Each is eased
over 0.3s on the same cubic-bezier the morph uses, which is what makes a stepped
progression read as deliberate motion rather than a stutter. Only `duration`
(the morph loop length) is configurable — the 0.3s swap tween is fixed.

## Props

::field-group
  ::field{name="shape" type="'blob' | 'arch' | 'diamond' | 'wave' | 'custom'" default="'blob'"}
  Which preset path to use. `custom` switches to `path` (falling back to the blob
  preset if `path` is missing). An unrecognised value also falls back to the blob
  preset rather than rendering nothing.
  ::
  ::field{name="path" type="string"}
  Custom path data, required when `shape` is `custom`. Author it in
  `objectBoundingBox` (`0..1`) coordinates to match the clip path's units.
  ::
  ::field{name="morphPaths" type="string[]"}
  Paths to cycle between, overriding the shape's built-in pair. Used when it has
  more than one entry. All entries must share the same command structure — see
  the section above. With one entry or none, the preset pair is used instead.
  ::
  ::field{name="animate" type="'none' | 'morph' | 'scroll' | 'hover'" default="'none'"}
  Animation mode. Modes other than `none` are silently inert with fewer than two
  available paths.
  ::
  ::field{name="duration" type="number" default="4"}
  Seconds for one full `morph` loop. Floored at `0.1`. Has no effect on `scroll`,
  `hover` or `none`.
  ::
  ::field{name="container" type="MaybeComputedElementRef"}
  Scrollable ancestor that drives `scroll` mode, instead of the window. Pass it
  as a **getter** — `:container="() => panelRef"` — not as the element. A plain
  binding is unwrapped by the template and captured as `null` during setup, after
  which nothing re-reads it and `useScroll` quietly falls back to the window,
  which never leaves the `0..1` band for a container that scrolls internally.
  Only relevant when `animate="scroll"`.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the root frame after `relative`. Set the frame's size here (or on a
  parent) — the clipped child is `h-full w-full`, so the frame is what gives the
  mask its box.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The content to clip. It is wrapped in a full-size `h-full w-full` div that
  carries the `clip-path`, so the mask applies to everything you pass at once.
  ::
::

## Accessibility

The `<svg>` holding the `<defs>` is `aria-hidden="true"` and `focusable="false"`,
so the mask contributes nothing to the accessibility tree — the clipped content
is read exactly as it would be unmasked. The component adds no roles, no states
and no live regions.

For `animate="hover"` there is no keyboard equivalent: the swap is bound to
`pointerenter` / `pointerleave`, so the second path is reachable only with a
pointer, and only on devices that report fine-pointer hover. Treat `hover` as
decoration, and expose the state yourself if it carries meaning.

Under `prefers-reduced-motion` — read via `useReducedMotion` — every mode
collapses to the static `paths[0]`. The `scroll` listener returns early, the
morph loop is disabled, and the hover swap resolves to the resting path.

## Performance

- The `<path>` inside the `<clipPath>` is a **plain** `<path>`, not a `Motion`
  element, and the `d` string is interpolated in JS. Motion renders a `div` by
  default and does not resolve `as` to an SVG element, so a `Motion` child inside
  a `<clipPath>` produces invalid markup and the clip is silently dropped.
- One `useRafFn` loop drives both the morph and the swap tween, and it is
  paused the moment neither is needed. `watch` on `[isMorphing, isVisible,
  isTweening]` resumes it only when there is something to animate.
- An `IntersectionObserver` on the frame gates morphing on visibility, so
  off-screen masks cost nothing per frame.
- The scroll subscription is a `useMotionValueEvent` on `scrollYProgress` with
  an early return for non-`scroll` modes — hover and morph never touch it.
- The hover-capability check uses `matchMedia` with a `change` listener, and it
  is only set up when `animate === 'hover'`.
- Both the SVG id and the `clip-path` reference are derived from Vue's `useId`,
  so they are stable across SSR and safe with multiple instances on a page.
- The easing is a hand-rolled cubic-bezier evaluator (Newton-Raphson on x, then
  evaluate y) rather than a library call, capped at 8 iterations. Values that are
  not a plain ease-in/out have no closed form, which is why this exists.

::tip
The reference easing is deliberately **not** a symmetric ease-in-out: its control
points sit at `x = 0.645` / `x = 0.355` with very shallow `y`, and that
asymmetry is the "settle into place" feel. A generic `2t²` ease reads as
mechanical next to it. If you ever find yourself swapping the easing, keep the
asymmetry — the mask's character lives in it.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.svgClipMask` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `svg` | `absolute h-0 w-0` |
| `content` | `h-full w-full` |
