---
title: Top Down Letters
description: Letters that drop onto their own baseline, one after another.
---

Each letter starts `46px` *above* its resting position and fully transparent,
then drops into place and fades up. The letters arrive in sequence, each waiting
a fixed stagger behind the one before it, so the string reads as settling down
into existence from left to right.

The travel is short on purpose. `46px` is roughly the height of a large line of
text, which means each letter starts just above where it belongs rather than
somewhere off-screen — the effect is a letter dropping onto a mark, not a letter
flying in from elsewhere.

This is the mirror of [Bottom Up Letters](/components/text/bottom-up-letters). Same
`400ms` duration, same `88ms` stagger, same `(0.18, 1, 0.32, 1)` ease — the only
difference is the sign of the offset. Read one directly after the other and the
pair looks like a single line of text being alternately lifted and pressed down.

Useful for a headline that should feel weighted, a stat label, or any short
string where the entrance is the point.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="top-down-letters-basic" />
  :::
#code
```vue
<template>
  <MTopDownLetters
    class="text-3xl font-bold"
    text="Fall down"
  />
</template>
```
::

## Examples

### Both directions

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="top-down-letters-mirror" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MBottomUpLetters
      class="text-2xl font-semibold"
      text="Bottom up letters"
    />
    <MTopDownLetters
      class="text-2xl font-semibold"
      text="Top down letters"
    />
    <p class="mt-2 max-w-sm text-center text-sm text-muted">
      Identical duration, stagger and ease. The only difference is which side of
      the resting position each letter starts on.
    </p>
  </div>
</template>
```
::

### On scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="top-down-letters-on-scroll" />
  :::
#code
```vue
<template>
  <div class="text-center">
    <MTopDownLetters
      class="text-3xl font-bold"
      text="Drops in on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      88ms per letter, once the headline is on screen.
    </p>
  </div>
</template>
```
::

Set `trigger-on-view` to hold the drop until the element enters the viewport.
Observation stops after the first intersection, so the effect never replays on the
way back up.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="top-down-letters-custom" />
  :::
#code
  <PlaygroundCode name="TopDownLetters" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The string to reveal. Split into one span per character, so a string prop is
  required; a slot would hand back VNodes that cannot be split.
  ::

  ::component-prop{name="stagger" type="number" default="88"}
  Milliseconds added per letter. `0` reveals every letter at once. Above roughly
  `200` a long string takes seconds to finish.
  ::

  ::component-prop{name="delay" type="number" default="0"}
  Milliseconds to wait before the first letter drops. Useful when several
  components should not all begin on the same frame.
  ::

  ::component-prop{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before revealing. Ignored under
  reduced motion, which always reveals immediately — see below.
  ::

  ::component-prop{name="class" type="string"}
  Classes for the root span, which is also the element carrying the
  `aria-label`. Type styles set here are inherited by every letter.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"` and every letter span is
`aria-hidden="true"`. Announcing the individual letters would mean hearing the
word spelled out, one letter per announcement, while the effect plays out over
the same letters.

Under `prefers-reduced-motion` the drop is not skipped — it is run with
`duration: 0`, which lands every letter at its resting value within a frame.
Dropping the animation instead would leave the hidden styles stranded, because
motion-v treats "nothing to animate" as "write nothing", and the raised,
transparent initial state would never be replaced.

`triggerOnView` is also ignored under reduced motion. A reduced-motion visitor
should not have to scroll a headline into view to be allowed to read it.

The initial state is identical on the server and on the client for the same
reason the transition is suppressed rather than the animation: the server cannot
know the motion preference, so deriving it there would ship hidden styles to
everyone.

## Performance

- Each letter animates `opacity` and `y` only, both of which the browser can run
  on the compositor without touching layout or paint.
- One span is created per character, so a long string adds one transformed box
  per letter. Keep it to a short word or headline.
- `triggerOnView` uses a single `useInView` observer registered with `once: true`;
  there is no scroll listener. The split is `Array.from`, so surrogate pairs are
  not torn apart.

## How the timing works

Letter *i* waits `delay + i × stagger` milliseconds, then animates for `400ms`.
Each letter is independent, so the string is finished when the *last* letter's
`400ms` is over — on a seven-letter word, `6 × 88 + 400 = 928ms`.

The ease is `(0.18, 1, 0.32, 1)`: almost no time on the way out, then a long
settle. A letter leaves its starting offset quickly and spends most of its
`400ms` creeping the last few pixels. Because the offset is negative, that
creep reads as a letter coming down under its own weight rather than being
guided to a stop.

Set `stagger` to `0` and the letters move as one object — a valid look, but a
different component behaviour. The per-letter split is still there; only the
sequencing is gone.

## Notes

- The component reveals once. `triggerOnView` observes with `once`, and there is
  no replay prop — remount with a changing `:key` to run it again.
- The `46px` offset is in unscaled CSS pixels, so it will look proportionally
  smaller on a `text-xs` label than on a `text-6xl` headline. That is usually
  what you want — a fixed travel reads as a fixed gesture — but it does mean the
  component is tuned for display sizes.
- Letter spans are `white-space: pre`, which keeps runs of spaces in the string
  from collapsing. Leading and trailing whitespace in `text` is therefore visible
  as space, which is usually what you want but not always.
- The root span is `display: inline-block`, so the component participates in
  surrounding layout as a single inline box. It will not stretch to fill a
  block-level slot on its own.
