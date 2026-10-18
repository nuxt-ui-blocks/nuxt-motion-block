---
title: Line By Line Slide
description: A block of copy that slides in one line at a time, from the left.
---

Each line of a block of copy starts `48px` to the left and fully transparent, then
slides into place and fades up. Lines arrive in order, each waiting `120ms` behind
the one before it, so a multi-line statement resolves as a sequence rather than
appearing whole.

This is the largest offset and the longest duration in the text tier — `900ms` per
line against `400ms` for a letter. That scaling is the design decision: a whole
line has far more visual mass than a single character, so it needs to travel
further and settle more slowly to read as the same gesture. Pull the numbers down
to letter scale and the lines arrive as a smear.

Because every line is its own block box, the component stacks them exactly where
the text would have been. It does not animate a *paragraph*; it animates a list
of lines that happen to contain your copy.

Useful for a two- or three-line statement, an intro, or a quote whose lines
should resolve in reading order.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="line-by-line-slide-basic" />
  :::
#code
```vue
<template>
  <MLineByLineSlide
    class="text-center text-2xl font-bold"
    :text="statement"
  />
</template>

<script setup>
const statement = 'Two lines arrive\none stagger at a time'
</script>
```
::

## Examples

### Passing an array

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="line-by-line-slide-lines-prop" />
  :::
#code
```vue
<template>
  <MLineByLineSlide
    class="text-center text-xl font-bold"
    :lines="lines"
    text="unused"
  />
</template>

<script setup>
const lines = ['Copy that already', 'lives as an array', 'slides in on its own offset']
</script>
```
::

This is the shape to reach for when the copy already lives as an array — from a
CMS, a loop, or a list of testable claims. `text` is still required so the
accessible name can never come back empty; pass a placeholder for it.

### On scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="line-by-line-slide-on-scroll" />
  :::
#code
```vue
<template>
  <div class="text-center">
    <MLineByLineSlide
      class="text-xl font-bold"
      :delay="150"
      :stagger="200"
      :text="'A statement that waits\nuntil you reach it\nbefore sliding in'"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Waits 150ms after the block enters view, then 200ms per line.
    </p>
  </div>
</template>
```
::

`trigger-on-view` holds the reveal until the block enters the viewport, `delay`
waits a further 150ms, and `stagger` widens the gap to 200ms per line so the
statement resolves slowly enough to read as it arrives.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="line-by-line-slide-custom" />
  :::
#code
  <PlaygroundCode name="LineByLineSlide" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The copy to reveal. Split on `"\n"`. Required even when `lines` is supplied,
  because the root's `aria-label` is derived from the resolved lines and must
  never be empty.
  ::

  ::component-prop{name="lines" type="string[]"}
  Explicit line array. Takes precedence over `text`.
  ::

  ::component-prop{name="stagger" type="number" default="120"}
  Milliseconds added per line. `0` slides every line in at once.
  ::

  ::component-prop{name="delay" type="number" default="0"}
  Milliseconds to wait before the first line slides in.
  ::

  ::component-prop{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before revealing. Ignored under
  reduced motion, which always reveals immediately — see below.
  ::

  ::component-prop{name="class" type="string"}
  Classes for the root span, which is also the element carrying the
  `aria-label`. Type styles set here are inherited by every line.
  ::
::

## Accessibility

The root span carries `aria-label="<resolved lines joined by a space>"` and every
line span is `aria-hidden="true"`. Announcing the lines individually would insert
a pause at every visual line break, which is not where the sentence's punctuation
says the breaks are.

Under `prefers-reduced-motion` the slide is not skipped — it is run with
`duration: 0`, which lands every line at its resting position within a frame.
Dropping the animation instead would leave the hidden styles stranded, because
motion-v treats "nothing to animate" as "write nothing", and the offset,
transparent initial state would never be replaced.

`triggerOnView` is also ignored under reduced motion. A reduced-motion visitor
should not have to scroll a statement into view to be allowed to read it.

The initial state is identical on the server and on the client for the same
reason the transition is suppressed rather than the animation: the server cannot
know the motion preference, so deriving it there would ship hidden styles to
everyone.

## Performance

- Each line animates `opacity` and `x` only, so the reveal runs on the
  compositor and never touches layout.
- The cost scales with the number of *supplied* lines, not with the length of
  the copy. A three-line statement is three animated block boxes however long
  each line is.
- The block is a single `once` `IntersectionObserver` for `trigger-on-view`;
  nothing runs after the last line lands and there is no scroll listener.

## Two ways to supply the lines

`text` is split on `"\n"`. When the copy already lives as an array — from a CMS, a
loop, a list of testable claims — pass `lines` instead and the split is skipped.

`lines` takes precedence over `text` when both are given. `text` is still
**required**, which looks redundant and is not: the root's `aria-label` is derived
from whichever source resolves, so making one of the two required guarantees the
label can never come back empty. Pass a placeholder string for the one you are not
using, as in the array example above.

That is also why the accessible name joins the lines with a **space** rather than
a newline or a hyphen. A newline would be announced as a pause; a hyphen would be
announced as punctuation that is not on screen.

## Notes

- The component reveals once. `triggerOnView` observes with `once`, and there is
  no replay prop — remount with a changing `:key` to run it again.
- The root span and every line span are `display: block`. Lines therefore stack
  vertically and each one occupies its own line box; a long line still wraps
  inside its own block, but the stagger is per *supplied* line, not per *visual*
  line. If the container is too narrow, one logical line can still occupy three
  visual lines and all three move together.
- Compare [Per Word Crossfade](/components/text/per-word-crossfade), which sets no
  display on its root so that running prose wraps freely. This component makes the
  opposite trade: predictable blocks, in exchange for not wrapping across lines.
- Line spans are not `white-space: pre`, so a trailing space on a line is
  collapsed. Each line is a block box, so there is no inter-word spacing to
  preserve at the boundary anyway.
