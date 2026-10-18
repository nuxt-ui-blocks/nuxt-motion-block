---
title: Kinetic Type Scroll
description: A phrase where each word scales, tracks and lifts on its own window of scroll progress, forming a travelling crest.
---

A phrase whose words each animate on their own slice of a shared scroll progress
value. As you scroll, a soft wave travels through the line: each word scales up,
gains letter-spacing and optical weight, lifts off the baseline and comes back
to full opacity at its peak, then returns to rest.

Every word receives the same `scrollYProgress` and derives its own window from
its index. The windows deliberately **overlap** (`WINDOW_OVERLAP = 1.2`), and
each word's intensity is a triangle that peaks at the centre of its window and
falls to zero at both edges. That overlap is the whole trick: it is what turns a
row of independent pulses into one crest moving through the phrase.

## Usage

Pass `words` as an array and let the phrase sit inside a scrollable container
taller than the phrase itself. If you want to drive the effect from a specific
scroller rather than the window, pass `container` **as a getter** —
`:container="() => panelRef"`, never `:container="panelRef"`. A plain binding is
unwrapped by the template and captured as `null` during setup, after which
nothing re-reads it and `useScroll` silently falls back to the document.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="kinetic-type-scroll-basic" />
  :::
#code
```vue
<template>
  <div
    ref="panelRef"
    class="h-72 w-full max-w-md overflow-y-auto rounded-2xl border border-default bg-muted/20"
  >
    <div class="flex h-96 items-center">
      <MKineticTypeScroll
        :container="() => panelRef"
        :words="words"
        class="px-6 text-3xl font-semibold"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const panelRef = ref<HTMLElement | null>(null)
const words = ['Scroll', 'to', 'set', 'the', 'phrase', 'in', 'motion']
</script>
```
::

## Examples

### Aligned to the start, centre or end

The `align` prop maps to a `justify-*` class on the wrapper, positioning the
phrase within its container. It is most visible when the container is wider than
the phrase.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="kinetic-type-scroll-align" />
  :::
#code
```vue
<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div
      v-for="sample in samples"
      :key="sample.align"
      class="rounded-xl border border-default p-4"
    >
      <p class="mb-2 text-xs uppercase tracking-wide text-dimmed">
        align="{{ sample.align }}"
      </p>
      <MKineticTypeScroll
        :words="sample.words"
        :align="sample.align"
        class="text-2xl font-semibold"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const samples = [
  { align: 'start' as const, words: ['Left', 'aligned', 'wave'] },
  { align: 'center' as const, words: ['Centre', 'aligned', 'wave'] },
  { align: 'end' as const, words: ['Right', 'aligned', 'wave'] },
]
</script>
```
::

### Tuning the wave values

Every range prop is a `[rest, peak]` tuple. Widen the tuples and tighten `stagger`
for a dramatic crest, or narrow them for a subtle one. The second example also
sets an explicit `offset` so the wave plays across a different part of the scroll.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="kinetic-type-scroll-tuning" />
  :::
#code
```vue
<template>
  <div class="space-y-6">
    <div class="rounded-xl border border-default p-6">
      <p class="mb-3 text-sm font-medium text-highlighted">
        Gentle
      </p>
      <MKineticTypeScroll
        :words="['Gentle', 'crest', 'values']"
        :stagger="0.2"
        :scale-range="[1, 1.08]"
        :lift-range="[0, -6]"
        :tracking-range="[0, 1]"
        :dim-range="[0.75, 1]"
        class="text-3xl font-semibold"
      />
    </div>

    <div class="rounded-xl border border-default p-6">
      <p class="mb-3 text-sm font-medium text-highlighted">
        Dramatic
      </p>
      <MKineticTypeScroll
        :words="['Dramatic', 'crest', 'values']"
        :stagger="0.08"
        :offset="['start 0.95', 'end 0.4']"
        :scale-range="[0.85, 1.3]"
        :lift-range="[0, -20]"
        :tracking-range="[-1, 4]"
        :dim-range="[0.25, 1]"
        :weight-range="[300, 900]"
        class="text-3xl font-semibold"
      />
    </div>
  </div>
</template>
```
::

## Customize

Adjust `words`, `align`, `stagger` and the range tuples live in the playground
below.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="kinetic-type-scroll-custom" />
  :::
#code
  <PlaygroundCode name="KineticTypeScroll" />
::

## Props

::component-props
  ::component-prop{name="words" type="string[]" required}
  The phrase, one string per word. Words are rendered as `inline-block`
  spans in a flex row, so the phrase wraps naturally on narrow containers — each
  word keeps its own index even after wrapping.
  ::
  ::component-prop{name="align" type="'start' | 'center' | 'end'" default="'center'"}
  Row alignment of the wrapped phrase, mapped to a `justify-*` class on the
  wrapper.
  ::
  ::component-prop{name="container" type="MaybeComputedElementRef"}
  Optional scrollable ancestor that drives the progress. Must be passed as a
  getter (`:container="() => panelRef"`) — see the note above. Left undefined,
  `useScroll` measures the nearest scrollable ancestor, which is the document.
  ::
  ::component-prop{name="offset" type="ScrollOffset" default="['start 0.9', 'end 0.45']"}
  Motion scroll-offset tuple forwarded to `useScroll`, deciding which part of
  the container the phrase animates across.
  ::
  ::component-prop{name="stagger" type="number" default="0.12"}
  Fractional offset between each word's active window. Capped internally so the
  wave always fits between the `WAVE_MARGIN` (0.14) head and tail room — a long
  phrase compresses its spacing rather than running off the end of the range.
  ::
  ::component-prop{name="scaleRange" type="[number, number]" default="[0.92, 1.18]"}
  Scale at rest vs. at each word's peak.
  ::
  ::component-prop{name="trackingRange" type="[number, number]" default="[-0.5, 2.5]"}
  Letter-spacing in px at rest vs. at peak. Converted to a `px` string at
  runtime, so the values are unitless numbers.
  ::
  ::component-prop{name="weightRange" type="[number, number]" default="[380, 800]"}
  `font-variation-settings` `"wght"` at rest vs. at peak, rounded to an integer.
  Silently does nothing unless the active font actually has a `wght` axis — the
  docs site runs Public Sans, which is not variable, so this prop is inert there.
  ::
  ::component-prop{name="liftRange" type="[number, number]" default="[0, -12]"}
  Vertical offset in px at rest vs. at peak.
  ::
  ::component-prop{name="dimRange" type="[number, number]" default="[0.45, 1]"}
  Opacity at rest vs. at peak.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper after the component's own flex, gap and alignment
  classes. This is where you set the type size and weight.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.kineticTypeScroll` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative flex flex-wrap gap-x-[0.4em] gap-y-[0.18em]`
  ::
  ::component-slot-row{name="srOnly"}
  `sr-only`
  ::
::

## Accessibility

The wrapper renders `<span class="sr-only">{{ words.join(' ') }}</span>` and
marks **every** animated word `aria-hidden="true"`. The effect therefore
contributes nothing but glyphs to the accessibility tree, and the phrase is read
once, as plain text, by a screen reader. This is deliberate: an
`aria-label` on the wrapper `div` would be dropped by assistive tech, which is
why the readable copy is a real element rather than an attribute.

Under `prefers-reduced-motion` — read via `useReducedMotion` — each word renders
as a plain `span` at the peak weight with no travel, no dimming and no spring.
The phrase is fully readable in its settled state.

## Performance

- One `useScroll` for the whole phrase. Each word's window is a `useTransform`
  slice of that single shared `MotionValue`, so scrolling costs one measurement
  rather than one per word.
- Four of the five animated values per word (`scale`, `tracking`, `weight`,
  `y`, `opacity`) run through `useSpring`, which smooths the scroll-linked values
  into a moving crest instead of snapping word by word. The spring transition is
  shared and near-critically damped (`bounce: 0`).
- Animated properties are `transform` (`scale`, `y`), `opacity` and text
  properties — `will-change-transform` is set on each word so the compositor
  keeps them on their own layer.
- Words are defined as an inline `defineComponent` with a render function rather
  than a sibling `.vue` file, specifically so they are not auto-registered with
  an `M` prefix alongside the public component set.
- Under reduced motion the branch returns a plain `span` with a static style —
  no `Motion` wrapper, no motion values, no springs instantiated at all.

::tip
Because the windows overlap, the peak-to-peak spacing is what decides whether
this reads as a wave or as a flicker. If your phrase is long enough that the
internal cap compresses the spacing below `MIN_WINDOW` (0.09), consecutive
windows no longer overlap and you lose the crest — shorten the phrase or split it
into two components rather than raising `stagger`.
::

## Tuning the wave

The wave's geometry is derived, not configured, but two props move it most.
`stagger` sets the fractional offset between consecutive word peaks, and `offset`
decides which part of the viewport the phrase animates across. The rest are
peak-vs-rest value pairs — every one is a `[rest, peak]` tuple.

| Prop | Rest | Peak | What moves |
| --- | --- | --- | --- |
| `scaleRange` | `0.92` | `1.18` | Word size, the most legible part of the effect |
| `trackingRange` | `-0.5px` | `2.5px` | Letter-spacing; the widest spread reads as motion |
| `weightRange` | `380` | `800` | `wght` axis — **only** if the active font is variable |
| `liftRange` | `0px` | `-12px` | Vertical offset; raise it for a stronger crest |
| `dimRange` | `0.45` | `1` | Opacity; the resting words stay legible at 0.45 |

The default `offset` is `['start 0.9', 'end 0.45']`, not Motion's own
`['start start', 'end end']`: on an element shorter than its scroller that
default collapses to a near-zero range and the effect sticks at the start. This
default opens the window as the phrase enters the lower part of the viewport
and closes it around the middle, leaving readable time on both sides.
