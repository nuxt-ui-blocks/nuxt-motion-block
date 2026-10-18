---
title: Stagger From Center
description: Text that resolves outward from the middle character, one ring at a time.
---

A string arrives as a whole: every character sits blurred, transparent and
lowered, then they resolve in order of their distance from the centre of the
string. The middle lands first and the ends land last, which reads as the text
focusing rather than as text animating.

The ordering is arithmetic, not curated — `|index - (length - 1) / 2|` — so an
odd-length string has one true centre and an even-length string has two that
resolve simultaneously. That is deliberate. It means any string works without
you choosing a starting character, and it means the visual centre of a word
falls where the eye expects it.

Useful for a hero headline, a nav brand, or a statement that should feel like it
is being brought into focus rather than typed.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="stagger-from-center-basic" />
  :::
#code
```vue
<template>
  <MStaggerFromCenter
    class="text-3xl font-bold"
    text="Center out"
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
    <component-example name="stagger-from-center-stagger" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MStaggerFromCenter
      class="text-2xl font-semibold"
      :stagger="0"
      text="Without stagger"
    />
    <MStaggerFromCenter
      class="text-2xl font-semibold"
      :stagger="22"
      text="Default stagger"
    />
    <MStaggerFromCenter
      class="text-2xl font-semibold"
      :stagger="60"
      text="Wide fan"
    />
  </div>
</template>
```
::

`stagger` is the delay added per step away from the centre, so a wider value
spreads the rings further apart in time. `0` resolves every character at once.

### On scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="stagger-from-center-on-scroll" />
  :::
#code
```vue
<template>
  <div class="text-center">
    <MStaggerFromCenter
      class="text-3xl font-bold"
      text="Focuses on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      22ms per ring, once the headline is on screen.
    </p>
  </div>
</template>
```
::

Set `trigger-on-view` to hold the resolve until the element enters the viewport.
Observation stops after the first intersection, so the effect never replays on the
way back up.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="stagger-from-center-custom" />
  :::
#code
  <PlaygroundCode name="StaggerFromCenter" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The string to resolve. Split into one span per character, so a string prop is
  required; a slot would hand back VNodes that cannot be split.
  ::

  ::component-prop{name="stagger" type="number" default="22"}
  Milliseconds added per step away from the centre. `0` resolves every character
  at once, which is a valid look and not the same component behaviour. Above
  roughly `60` a long string takes seconds to finish.
  ::

  ::component-prop{name="delay" type="number" default="0"}
  Milliseconds to wait before the first character resolves. Useful when several
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

Each character's delay is `delay + distanceFromCenter × stagger`, where distance
is measured in *characters*, not pixels. On a ten-character string the far
characters wait nine times the stagger of the centre ones.

Each character also travels only `3px` of blur and `12px` of rise, over `620ms`.
Those are small numbers for a reason: the stagger is doing the sequencing work,
and if the per-character motion were larger the rings would smear into each
other instead of reading as distinct.

The ease is `(0.22, 1, 0.36, 1)` — hard out, long settle. A character that
lingers mid-flight gets overtaken by the next ring and the ordering stops being
legible.

## Notes

- The component resolves once. `triggerOnView` observes with `once`, and there
  is no replay prop — remount with a changing `:key` to run it again.
- `stagger` counts characters, so the same value looks completely different on
  a five-character word and a thirty-character sentence. The last character
  waits `length × stagger` milliseconds.
- Character spans are `white-space: pre`, which keeps runs of spaces in the
  string from collapsing. Leading and trailing whitespace in `text` is
  therefore visible as space, which is usually what you want but not always.
- The root span is `display: inline-block`, so the component participates in
  surrounding layout as a single inline box. It will not stretch to fill a
  block-level slot on its own.
