---
title: Motion Loader
description: Twelve hand-built looping spinners rendered from transforms, with a single size, colour and speed control.
navigation:
  icon: i-lucide-loader-circle
---

# Motion Loader

A spinner that is really a gallery. Twelve variants ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â `orbit`, `newton-cradle`,
`pendulum`, `hourglass`, `morph-ring`, `square-snake`, `comet`, `radar`,
`cube-flip`, `wave-bars`, `breathing-glow` and `dot-ring` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â each built from a
hand-tuned set of rotations, scales and staggered delays rather than a shared
skeleton.

Every variant draws with `currentColor` and inline pixel styles, so one `color`
prop themes the whole thing and `size` is the only geometry input: the root is
`size ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â size`, `shrink-0`, `relative`, and every sub-element is positioned
against it.

`variant` selects a `v-if` branch, so switching between loaders remounts the
subtree and restarts the animation from the first frame.

::note
`className` is declared in the source but never applied ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the root's class is
static. Use the normal `class` attribute, which falls through onto the root
`span`.
::

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="motion-loader-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <div class="flex items-center justify-center gap-6 rounded-2xl border border-default bg-default py-10">
      <MMotionLoader
        :variant="variant"
        :size="56"
        :speed="speed"
        color="var(--ui-primary)"
      />
      <span class="text-sm text-muted">
        {{ variant }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="variant"
        :items="variants"
      />
      <USelect
        v-model="speed"
        :items="speedItems"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const variant = ref('orbit')
const speed = ref(1)

const variants = [
  'orbit',
  'newton-cradle',
  'pendulum',
  'hourglass',
  'morph-ring',
  'square-snake',
  'comet',
  'radar',
  'cube-flip',
  'wave-bars',
  'breathing-glow',
  'dot-ring',
]

const speedItems = [
  { label: '0.5ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â', value: 0.5 },
  { label: '1ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â', value: 1 },
  { label: '2ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â', value: 2 },
]
</script>
```
::

`size` is a plain number in pixels ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â there is no named size scale, unlike
`GridLoader`. The loader is `inline-flex` and `shrink-0`, so it sits inside a
button or a flex row without being squeezed.

## Props

::field-group
  ::field{name="variant" type="'orbit' | 'newton-cradle' | 'pendulum' | 'hourglass' | 'morph-ring' | 'square-snake' | 'comet' | 'radar' | 'cube-flip' | 'wave-bars' | 'breathing-glow' | 'dot-ring'" default="'orbit'"}
  Which loader to render. `orbit` is a dot circling a faint track; `comet` and
  `radar` add a fading trail; `square-snake` walks a block around the corners of
  the square; `cube-flip` is a 3D rotateX/rotateY turn; `wave-bars` and
  `dot-ring` are the staggered multi-element ones. An unrecognised value renders
  an empty `size ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â size` box rather than falling back.
  ::
  ::field{name="size" type="number" default="40"}
  Width and height of the root in pixels. Also scales every sub-element: dot
  diameter is `size * 0.2`, `square-snake` travels `size - size * 0.38`, and the
  `dot-ring` radius is derived from `size`.
  ::
  ::field{name="color" type="string" default="''"}
  Any CSS colour. It is applied as inline `color` on the root, and every element
  inside uses `bg-current` or `border-current`, so one value themes the loader.
  Defaults to `currentColor`, which means it inherits from its parent.
  ::
  ::field{name="speed" type="number" default="1"}
  Multiplier on every loop duration. It is clamped to at least `1` when zero or
  negative ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â passing `0` gives you normal speed rather than an infinite duration.
  The base cycles are 1.1s and 1.4s, so `speed="2"` halves them.
  ::
  ::field{name="label" type="string" default="'Loading'"}
  The `aria-label` on the root status region. Set it to describe what is loading
  (`"Loading invoices"`) rather than leaving the generic default.
  ::
::

## Accessibility

The root is a `<span role="status" aria-live="polite">` with `aria-label` set
from `label`. Live regions announce on content *change*, and this loader's
content never changes ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the practical effect is that the label is exposed when
the loader enters the accessibility tree, and repeated mounts announce again.
That is the behaviour you want for a spinner: the user learns something is
happening without being interrupted mid-sentence.

Everything inside is a decorative `span` with no text, so nothing is announced
twice.

Reduced motion is fully handled. The component subscribes to
`(prefers-reduced-motion: reduce)` with `useMediaQuery` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â a reactive watcher, not
a one-shot read ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and every `animate` and `transition` binding becomes
`undefined` when it matches. The loader then renders its static first frame
rather than animating, and it updates if the user changes the setting while the
page is open. That is better than the check `GridLoader` does.

There is no keyboard interaction, which is correct for a non-interactive
indicator.

## Performance

- All twelve variants animate only `rotate`, `rotateX`, `rotateY`, `scale`,
  `scaleY`, `opacity` and `x`/`y` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â every one is a compositor property, and no
  variant triggers layout or paint.
- The multi-element variants mount a fixed number of spans: 5 for
  `newton-cradle`, 5 for `wave-bars`, 8 for `dot-ring`, 4 for `square-snake`,
  4 for the `comet` trail.
- Staggered variants (`wave-bars`, `dot-ring`) build a fixed `Array.from({ length })`
  once at module scope, then index it ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â no per-frame allocation.
- `snakePositions` and `snakeTravel` are computed from `size`, so changing the
  size recomputes four positions rather than restarting the loop.
- Every variant uses `repeat: Number.POSITIVE_INFINITY` with
  `repeatType: 'loop'`, so there is no teardown to manage ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the animations stop
  when the component unmounts.

::tip
The `newton-cradle` variant only assigns keyframes to the first and last of its
five bobs ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â `cradleKeyframes` returns `undefined` for the three in between, which
is what makes them animate as an in-phase group rather than five independent
swings. Editing `CRADLE_BALLS` changes the count but the visible swing stays
anchored to the outer two.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.motionLoader` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-flex shrink-0 items-center justify-center` |
| `srLabel` | `sr-only` |
| `orbitTrack` | `absolute inset-0 rounded-full border border-current` |
| `orbitSpin` | `absolute inset-0` |
| `orbitDot` | `absolute top-0 left-1/2 rounded-full bg-current` |
| `cradle` | `absolute inset-0 flex items-start justify-center` |
| `cradleBall` | `relative block` |
| `cradleRod` | `absolute top-0 bottom-0 left-1/2 w-px bg-current` |
| `cradleBob` | `absolute bottom-0 left-1/2 rounded-full bg-current` |
| `pendulumSwing` | `absolute inset-0` |
| `pendulumRod` | `absolute top-0 bottom-2 left-1/2 w-px bg-current` |
| `pendulumBob` | `absolute bottom-0 left-1/2 rounded-full bg-current` |
| `hourglass` | `absolute inset-0 fill-current` |
| `morphRing` | `absolute inset-0 stroke-current` |
| `snakeCell` | `absolute rounded-sm bg-current` |
| `snakeHead` | `absolute top-0 left-0 rounded-sm bg-current` |
| `cometSpin` | `absolute inset-0` |
| `cometTrail` | `absolute inset-0` |
| `cometDot` | `absolute top-0 left-1/2 rounded-full bg-current` |
| `radarTrack` | `absolute inset-0 rounded-full border border-current` |
| `radarWrapper` | `absolute inset-0 overflow-hidden rounded-full` |
| `radarSweep` | `absolute inset-0` |
| `radarDot` | `absolute top-1/2 left-1/2 rounded-full bg-current` |
| `cubePerspective` | `absolute inset-0` |
| `cube` | `absolute inset-0 rounded-md bg-current` |
| `waveWrapper` | `absolute inset-0 flex items-center justify-between` |
| `waveBar` | `flex-1 rounded-full bg-current` |
| `glowRing` | `absolute inset-0 rounded-full bg-current blur-md` |
| `glowCore` | `rounded-full bg-current` |
| `dotRingItem` | `absolute top-1/2 left-1/2 rounded-full bg-current` |
