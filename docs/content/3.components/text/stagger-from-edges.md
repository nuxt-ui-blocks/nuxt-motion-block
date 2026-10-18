---
title: Stagger From Edges
description: Text that closes inward from both ends, meeting in the middle.
---

A string arrives as a whole: every character sits blurred, transparent and
lowered, then the characters at each end resolve first and the reveal converges
toward the centre. The final characters to land are the ones in the middle,
which reads as the text closing rather than opening.

The ordering is arithmetic, not curated — `min(index, lastIndex - index)` — so
both ends always start on the same frame and no character is left behind. It is
the mirror of [Stagger From Center](/components/text/stagger-from-center): same
duration, same blur, same travel, same ease, with the delay measured from the
edges instead of the centre.

Useful for a bracketed headline, a quoted line, or a nav brand where the two
outer letters should anchor the reveal.

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

`stagger` is the delay added per step away from the nearest edge, so a wider
value spreads the rings further apart in time. `0` resolves every character at
once. Because the two ends share a distance of zero, the first and last
characters always resolve together regardless of the value.

### On scroll

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
  <div class="text-center">
    <MStaggerFromEdges
      class="text-3xl font-bold"
      text="Closes in on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      22ms per ring, once the headline is on screen.
    </p>
  </div>
</template>
```
::

Set `trigger-on-view` to hold the reveal until the element enters the viewport.
Observation stops after the first intersection, so the effect never replays on the
way back up.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="stagger-from-edges-custom" />
  :::
#code
  <PlaygroundCode name="StaggerFromEdges" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The string to resolve. Split into one span per character, so a string prop is
  required; a slot would hand back VNodes that cannot be split.
  ::

  ::component-prop{name="stagger" type="number" default="22"}
  Milliseconds added per step away from the nearest edge. `0` resolves every
  character at once, which is a valid look and not the same component behaviour.
  Above roughly `60` a long string takes seconds to finish.
  ::

  ::component-prop{name="delay" type="number" default="0"}
  Milliseconds to wait before the first characters resolve. Useful when several
  components should not all begin on the same frame.
  ::

  ::component-prop{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before resolving. Ignored under
  reduced motion, which always resolves immediately — see below.
  ::

  ::component-prop{name="class" type="string"}
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

## Performance

- Each character animates `opacity`, `filter` and `y`, so the resolve never
  touches layout. The remaining cost is the `blur()`, a paint effect whose price
  is proportional to the painted area of every blurred element — and there is one
  element per character, so keep this to a short headline.
- `triggerOnView` uses a single `useInView` observer registered with `once: true`;
  there is no scroll listener and nothing is scheduled after the last ring lands.
- Character spans are `display: inline-block` with `white-space: pre`, which
  gives each one a transformable box that the browser can composite.

## The ring order

Each character's delay is `delay + distanceFromEdge × stagger`, where
`distanceFromEdge` is `min(index, lastIndex - index)` — the number of characters
between it and the nearer end. Both ends therefore start on the same frame, and
the last character to move is always the one closest to the centre, whether the
string has an odd or even length.

Each character travels `3px` of blur and `12px` of rise over `620ms`. Those are
small numbers for a reason: the stagger sequences the rings, and if the
per-character motion were larger the two converging waves would smear into each
other instead of reading as separate.

The ease is `(0.22, 1, 0.36, 1)` — hard out, long settle. A character that
lingers mid-flight gets overtaken by the next ring and the inward direction
stops being legible.

## Notes

- The component resolves once. `triggerOnView` observes with `once`, and there
  is no replay prop — remount with a changing `:key` to run it again.
- `stagger` counts characters, so the same value looks completely different on a
  five-character word and a thirty-character sentence. The centre character
  waits `⌊length / 2⌋ × stagger` milliseconds.
- The two ends share a distance of `0`, so with a non-zero `stagger` the first
  and last characters always animate together — there is no way to start from
  one end only.
- Character spans are `white-space: pre`, which keeps runs of spaces in the
  string from collapsing. Leading and trailing whitespace in `text` is therefore
  visible as space, which is usually what you want but not always.
- The root span is `display: inline-block`, so the component participates in
  surrounding layout as a single inline box. It will not stretch to fill a
  block-level slot on its own.
