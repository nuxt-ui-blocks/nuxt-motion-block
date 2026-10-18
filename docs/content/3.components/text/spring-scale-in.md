---
title: Spring Scale In
description: A headline that pops in word by word, with an overshoot on every word.
---

Each word starts at `70%` scale and eases up to full size. The easing curve
overshoots before it settles, so every word arrives slightly too big and then
pulls back — a back-out curve, not a spring simulation. Word *i* starts `95ms`
after word *i - 1*.

The stagger is deliberately wide. At `95ms` the pop travels *across* the line
rather than landing on every word at once, which is what turns five separate
scale animations into one gesture.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="spring-scale-in-basic" />
  :::
#code
```vue
<template>
  <MSpringScaleIn
    class="text-3xl font-bold"
    text="Springy word scale"
  />
</template>
```
::

## Examples

### Pop in on scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="spring-scale-in-on-scroll" />
  :::
#code
```vue
<template>
  <div class="text-center">
    <MSpringScaleIn
      class="text-3xl font-bold"
      text="Springs in on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      The overshoot is only visible once the line is on screen.
    </p>
  </div>
</template>
```
::

Set `trigger-on-view` to hold the pop until the line enters the viewport.
Observation stops after the first intersection, so the effect never replays on the
way back up.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="spring-scale-in-custom" />
  :::
#code
  <PlaygroundCode name="SpringScaleIn" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The string to reveal. Split into one animated element per word.
  ::

  ::component-prop{name="stagger" type="number" default="95"}
  Milliseconds added per word. `0` pops every word at once, which throws away the
  travelling gesture. Below roughly `40` the words read as one block.
  ::

  ::component-prop{name="delay" type="number" default="0"}
  Milliseconds to wait before the first word starts.
  ::

  ::component-prop{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before playing. Ignored under reduced
  motion.
  ::

  ::component-prop{name="class" type="string"}
  Classes for the root span, which is also the element carrying the `aria-label`.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"`; every animated word span and every
space separator is `aria-hidden="true"`.

A scale animation that overshoots briefly renders text *larger* than its final
size. Under `prefers-reduced-motion` the pop is run with `duration: 0` instead of
skipped — motion-v treats "nothing to animate" as "write nothing", so skipping it
would leave every word stuck at `70%` scale permanently. Collapsing the duration
lands each word at full size within a frame.

`triggerOnView` is ignored under reduced motion. A visitor who has asked for less
movement should not have to scroll a headline into view to be allowed to read it.

## Performance

- Each word animates `opacity` and `scale` only, both of which the browser can run
  on the compositor without touching layout or paint.
- The root is a single inline span and the per-word spans are `inline-block`, so
  the reveal adds one element per word — cheap even for a headline, though it is
  not intended for long paragraphs.
- `triggerOnView` uses a single `useInView` observer registered with `once: true`;
  there is no scroll listener and nothing is scheduled after the last word lands.

## It is not a spring

Worth being explicit, since the component name invites the opposite assumption:
the transition is a plain cubic-bezier, `(0.34, 1.56, 0.64, 1)`.

The second control point — `1.56` — sits above `1`, so the interpolated scale
overshoots past its target and returns. That is the whole effect.

It is a cubic-bezier rather than a `type: 'spring'` because a curve gives every
word **identical** settle behaviour, whereas a real spring settles according to the
velocity it arrives with. Identical settles are the point here: the words read as
one coordinated gesture instead of a ripple of slightly different wobbles.

If you want velocity-aware settling, that is a different component. For a spring
you can hold still while a value tracks input, see
[Perspective Text 3D](/components/text/perspective-text-3d), which uses
`{ type: 'spring', duration: 0.25, bounce: 0.1 }` for its pointer and scroll
drivers.

## How the timing works

Word *i* waits `delay + i × stagger` milliseconds, then animates for `360ms`.

The run is short on purpose. An overshoot ease is only legible inside a single
beat — stretch it and the overshoot stops reading as a settle and starts reading
as a wobble. Three words at the `95ms` default finish in about `550ms`; six words
take about `835ms`, which is as long as you should let this run.

Because the overshoot is the effect, cutting the duration shortens the settle
along with it. `duration: 150` is not a faster version of the same motion, it is a
clipped one.

## It wraps like prose

The root span sets **no `display` style** — it computes to `display: inline` — and
each word is an `inline-block` span. A long string wraps at the width of its
*parent*, breaking across as many lines as it needs.

`max-width` therefore has no effect on the component itself, since a non-replaced
inline box ignores it. Constrain a parent instead:

```vue
<div class="max-w-sm">
  <MSpringScaleIn text="A headline long enough to wrap." />
</div>
```

The same trade [Blur Out Up](/components/text/blur-out-up) makes. If you need the
component to control its own display and respect its own `max-width`, use
[Mask Reveal Up](/components/text/mask-reveal-up), which is `display: block` and takes
lines explicitly.

## Notes

- The component plays once. `triggerOnView` observes with `once`, and there is no
  replay prop — remount with a changing `:key` to run it again.
- Splitting is on a **single** space, so a run of two spaces produces an empty word
  that renders nothing but still consumes a stagger step. Space separators are
  emitted between every pair of words rather than reconstructed from the original
  spacing.
- Word spans and space separators are both `white-space: pre`, which keeps a
  wrapped sentence from losing its inter-word spacing at a line break.
- If you want the overshoot to carry a blur instead of a scale, see
  [Soft Blur In](/components/text/soft-blur-in) or
  [Blur Out Up](/components/text/blur-out-up).
