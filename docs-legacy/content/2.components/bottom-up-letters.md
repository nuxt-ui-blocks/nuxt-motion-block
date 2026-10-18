---
title: Bottom Up Letters
description: Letters that rise out of their own baseline, one after another.
navigation:
  icon: i-lucide-arrow-up
---

# Bottom Up Letters

Each letter starts `46px` below its resting position and fully transparent, then
rises into place and fades up. The letters do not move together: every one waits
a fixed stagger behind the one before it, so the string reads as being lifted
into existence from left to right.

The travel is short on purpose. `46px` is roughly the height of a large line of
text, which means each letter starts just below where it belongs rather than
sometime off-screen — the effect is a letter rising to a mark, not a letter
flying in from elsewhere.

The stagger does most of the work. At the default `88ms` the whole word takes
about `1s` to finish, and the last letter is still moving when the first has
already settled. That overlap is what makes it read as a cascade rather than a
queue.

Useful for a headline that should feel physical, a nav brand, or any short
string where the entrance is the point.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="bottom-up-letters-basic" />
  :::
#code
```vue
<template>
  <MBottomUpLetters
    class="text-3xl font-bold"
    text="Rise up"
  />
</template>
```
::

## How the timing works

Letter *i* waits `delay + i × stagger` milliseconds, then animates for `400ms`.
Each letter is independent, so the total time is not the sum of anything — the
string is finished when the *last* letter's `400ms` is over, which on a
seven-letter word is `6 × 88 + 400 = 928ms`.

The ease is `(0.18, 1, 0.32, 1)`: almost no time on the way out, then a long
settle. A letter leaves its starting offset quickly and spends most of its
`400ms` creeping the last few pixels, which is why the letters appear to *arrive*
rather than to glide.

Set `stagger` to `0` and the letters move as one object — a valid look, but a
different component behaviour. The per-letter split is still there; only the
sequencing is gone.

## Props

::field-group
  ::field{name="text" type="string" required}
  The string to reveal. Split into one span per character, so a string prop is
  required; a slot would hand back VNodes that cannot be split.
  ::

  ::field{name="stagger" type="number" default="88"}
  Milliseconds added per letter. `0` reveals every letter at once. Above roughly
  `200` a long string takes seconds to finish.
  ::

  ::field{name="delay" type="number" default="0"}
  Milliseconds to wait before the first letter rises. Useful when several
  components should not all begin on the same frame.
  ::

  ::field{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before revealing. Ignored under
  reduced motion, which always reveals immediately — see below.
  ::

  ::field{name="class" type="string"}
  Classes for the root span, which is also the element carrying the
  `aria-label`. Type styles set here are inherited by every letter.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"` and every letter span is
`aria-hidden="true"`. Announcing the individual letters would mean hearing the
word spelled out, one letter per announcement, while the effect plays out over
the same letters.

Under `prefers-reduced-motion` the rise is not skipped — it is run with
`duration: 0`, which lands every letter at its resting value within a frame.
Dropping the animation instead would leave the hidden styles stranded, because
motion-v treats "nothing to animate" as "write nothing", and the lowered,
transparent initial state would never be replaced.

`triggerOnView` is also ignored under reduced motion. A reduced-motion visitor
should not have to scroll a headline into view to be allowed to read it.

The initial state is identical on the server and on the client for the same
reason the transition is suppressed rather than the animation: the server cannot
know the motion preference, so deriving it there would ship hidden styles to
everyone.

## Examples

### Stagger width

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="bottom-up-letters-stagger" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MBottomUpLetters
      class="text-2xl font-semibold"
      :stagger="0"
      text="No stagger"
    />
    <MBottomUpLetters
      class="text-2xl font-semibold"
      :stagger="88"
      text="Default stagger"
    />
    <MBottomUpLetters
      class="text-2xl font-semibold"
      :stagger="220"
      text="Slow cascade"
    />
  </div>
</template>
```
::

### Resolve on scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="bottom-up-letters-on-scroll" />
  :::
#code
```vue
<template>
  <div class="max-w-md text-center">
    <MBottomUpLetters
      class="text-3xl font-bold"
      text="Appears on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Each letter rises once, bottom to top, 88ms after the one before it.
    </p>
  </div>
</template>
```
::

## Notes

- The component reveals once. `triggerOnView` observes with `once`, and there is
  no replay prop — remount with a changing `:key` to run it again.
- This is the mirror of [Top Down Letters](/components/top-down-letters), which
  starts each letter the same distance *above* its resting position. Same
  duration, same stagger, same ease, opposite direction.
- For a whole string that moves as one object rather than per letter, see
  [Micro Scale Fade](/components/micro-scale-fade).
- Letter spans are `white-space: pre`, which keeps runs of spaces in the string
  from collapsing. Leading and trailing whitespace in `text` is therefore visible
  as space, which is usually what you want but not always.
- The root span is `display: inline-block`, so the component participates in
  surrounding layout as a single inline box. It will not stretch to fill a
  block-level slot on its own.