---
title: Stagger From Edges
description: Text that resolves inward from both ends, one ring at a time.
navigation:
  icon: i-lucide-align-justify
---

# Stagger From Edges

A string arrives as a whole: every character sits blurred, transparent and
lowered, then they resolve in order of their distance to the *nearest edge* of
the string. The first and last characters land together and the resolve
converges on the middle, which reads as the text closing in around a point.

The ordering is arithmetic, not curated — `Math.min(index, length - 1 - index)` —
so both ends always resolve simultaneously and every ring is a symmetric pair.
That is deliberate. It means any string works without you choosing a starting
character, and it means the last thing to resolve is always the visual centre of
the word.

This is the mirror of [Stagger From Center](/components/stagger-from-center),
which uses `|index - (length - 1) / 2|` and fans outward instead. Same motion,
same constants, opposite reading — pick whichever direction suits the entrance.

Useful for a hero headline, a nav brand, or a statement that should feel like it
is being bracketed rather than typed.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="stagger-from-edges-basic" />
  :::
#code
```vue
<template>
  <MStaggerFromEdges
    class="text-3xl font-bold"
    text="Edges in"
  />
</template>
```
::

## The ring order

Each character's delay is `delay + distanceFromEdge × stagger`, where distance is
measured in *characters*, not pixels, and is clamped to the nearer side. On a
ten-character string the centre characters wait three times the stagger of the
outer ones — half the string's length, not all of it, because the nearest edge
always wins.

Each character also travels only `3px` of blur and `12px` of rise, over `620ms`.
Those are small numbers for a reason: the stagger is doing the sequencing work,
and if the per-character motion were larger the rings would smear into each
other instead of reading as distinct.

The ease is `(0.22, 1, 0.36, 1)` — hard out, long settle. A character that
lingers mid-flight gets overtaken by the next ring and the ordering stops being
legible.

Because the two ends share a distance, they also share a transition. If you
sample the blur of each character mid-flight you get a profile that mirrors
around the centre — the exact inverse of the same measurement on
[Stagger From Center](/components/stagger-from-center).

## Props

::field-group
  ::field{name="text" type="string" required}
  The string to resolve. Split into one span per character, so a string prop is
  required; a slot would hand back VNodes that cannot be split.
  ::

  ::field{name="stagger" type="number" default="22"}
  Milliseconds added per step inward from the nearest edge. `0` resolves every
  character at once, which is a valid look and not the same component
  behaviour. Above roughly `60` a long string takes seconds to finish.
  ::

  ::field{name="delay" type="number" default="0"}
  Milliseconds to wait before the first characters resolve. Useful when several
  components should not all begin on the same frame.
  ::

  ::field{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before resolving. Ignored under
  reduced motion, which always resolves immediately — see below.
  ::

  ::field{name="class" type="string"}
  Classes for the root span, which is also the element carrying the
  `aria-label`. Type styles set here are inherited by every character.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"` and every character span is
`aria-hidden="true"`. Announcing the individual characters would mean hearing
the string spelled out, one letter per announcement, while the effect plays out
over the same letters.

Under `prefers-reduced-motion` the resolve is not skipped — it is run with
`duration: 0`, which lands every character at its resolved value within a frame.
Dropping the animation instead would leave the hidden styles stranded, because
motion-v treats "nothing to animate" as "write nothing", and the blurred,
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
    <component-example name="stagger-from-edges-stagger" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MStaggerFromEdges
      class="text-2xl font-semibold"
      :stagger="0"
      text="Without stagger"
    />
    <MStaggerFromEdges
      class="text-2xl font-semibold"
      :stagger="22"
      text="Default stagger"
    />
    <MStaggerFromEdges
      class="text-2xl font-semibold"
      :stagger="60"
      text="Wide fan"
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
    <component-example name="stagger-from-edges-on-scroll" />
  :::
#code
```vue
<template>
  <div class="max-w-md text-center">
    <MStaggerFromEdges
      class="text-3xl font-bold"
      text="Appears on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Each character resolves once, inward from the nearest edge of the string.
    </p>
  </div>
</template>
```
::

## Notes

- The component resolves once. `triggerOnView` observes with `once`, and there
  is no replay prop — remount with a changing `:key` to run it again.
- `stagger` counts characters, so the same value looks completely different on
  a five-character word and a thirty-character sentence. The centre character
  waits `⌊(length - 1) / 2⌋ × stagger` milliseconds — half what the same string
  would wait on [Stagger From Center](/components/stagger-from-center).
- On an even-length string there is no single centre character, so the innermost
  ring is a pair. Both resolve simultaneously. This is a property of taking the
  minimum, not a special case.
- Character spans are `white-space: pre`, which keeps runs of spaces in the
  string from collapsing. Leading and trailing whitespace in `text` is
  therefore visible as space, which is usually what you want but not always.
- The root span is `display: inline-block`, so the component participates in
  surrounding layout as a single inline box. It will not stretch to fill a
  block-level slot on its own.