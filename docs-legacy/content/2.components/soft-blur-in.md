---
title: Soft Blur In
description: A string that resolves out of focus, one character at a time.
navigation:
  icon: i-lucide-focus
---

# Soft Blur In

Every character starts `12px` out of focus, `16px` below its resting position, and
fully transparent. Each one eases to sharp, opaque and in place, and the character
after it starts `25ms` later.

The blur is what carries the effect. A per-character fade alone would read as a
typewriter; per-character fade *plus* blur reads as a lens finding focus. The two
channels are deliberately unequal — `16px` of travel against `12px` of blur —
so the characters drift as well as sharpen, which is what stops the motion
looking like a CSS filter transition.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="soft-blur-in-basic" />
  :::
#code
```vue
<template>
  <MSoftBlurIn
    class="text-3xl font-bold"
    text="Soft focus, one letter at a time"
  />
</template>
```
::

## How the timing works

Character *i* waits `delay + i × stagger` milliseconds, then animates for `900ms`.
Characters are independent, so the string is finished when the *last* character's
`900ms` is over.

That matters more here than in the per-word components. At the `25ms` default a
twenty-character string takes `19 × 25 + 900 ≈ 1.4s` to finish, and the first
characters have been settled for over half of that. Characters are the smallest
unit here, so the cost of the split is paid in full — see
[Notes](#notes) for when that stops being worth it.

The ease is `(0.22, 1, 0.36, 1)`, shared with [Blur Out Up](/components/blur-out-up)
and [Mask Reveal Up](/components/mask-reveal-up). It leaves slowly and arrives
fast, so a character is legible well before it stops moving.

## It is not display-aware

Each character is an `inline-block` span with `white-space: pre`, and the root span
computes to `display: inline`. A long string therefore wraps at the width of its
*parent*, but it wraps **mid-word** — there is no line-break opportunity between
characters, because every character is its own inline box.

That is fine for a headline of two or three words. On running prose, prefer
[Blur Out Up](/components/blur-out-up) or
[Per Word Crossfade](/components/per-word-crossfade), which split on whitespace
and wrap at real word boundaries.

## Props

::field-group
  ::field{name="text" type="string" required}
  The string to reveal. Split into one animated element per character, including
  spaces and punctuation.
  ::

  ::field{name="stagger" type="number" default="25"}
  Milliseconds added per character. `0` resolves the whole string as one block.
  Below roughly `8` the individual characters stop being readable as separate
  arrivals.
  ::

  ::field{name="delay" type="number" default="0"}
  Milliseconds to wait before the first character resolves. Useful when a headline
  is already animating and this should follow it.
  ::

  ::field{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before playing. Ignored under reduced
  motion, which always plays immediately — see [Accessibility](#accessibility).
  ::

  ::field{name="class" type="string"}
  Classes for the root span, which is also the element carrying the `aria-label`.
  Type styles set here are inherited by every character.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"` and every animated character span is
`aria-hidden="true"`. Without that, a screen reader would read the sentence one
character at a time, interleaved with the effect that is already showing it.

Under `prefers-reduced-motion` the animation is **not skipped** — it runs with
`duration: 0`, landing every character at its resting value within a frame.
Dropping the animation instead would strand the hidden styles, because motion-v
treats "nothing to animate" as "write nothing", and the blurred, transparent,
lowered starting state would never be replaced. Suppressing the transition instead
keeps one identical server and client tree, which is the other half of why the
hidden state is also what the server renders.

`triggerOnView` is ignored under reduced motion. A visitor who has asked for less
movement should not have to scroll a paragraph into view to be allowed to read it.

## Examples

### Tight stagger

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="soft-blur-in-tight" />
  :::
#code
```vue
<template>
  <div class="text-center">
    <MSoftBlurIn
      class="text-2xl font-semibold"
      :stagger="6"
      text="Tight stagger"
    />
    <p class="mt-3 text-sm text-muted">
      6ms between letters, so the sentence resolves almost as one object.
    </p>
  </div>
</template>
```
::

Dropping to `6ms` is how to keep the focus effect and lose the typewriter one. The
blur still reads clearly — it is the dominant channel — but the characters no
longer arrive as separate events.

### Resolve on scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="soft-blur-in-on-scroll" />
  :::
#code
```vue
<template>
  <div class="text-center">
    <MSoftBlurIn
      class="text-3xl font-bold"
      text="Plays once on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      25ms per letter, once the headline is on screen.
    </p>
  </div>
</template>
```
::

## Notes

- The component plays once. `triggerOnView` observes with `once`, and there is no
  replay prop — remount with a changing `:key` to run it again.
- Every character is animated, including spaces. A space is a character here, so it
  consumes a stagger step and travels with its neighbours rather than appearing
  instantly behind them.
- `text` is split with `Array.from`, not by string index, so surrogate pairs and
  other multi-code-unit characters are not torn apart.
- Deeply nested animation props are not read. Changing `depth`, `stagger` or
  `delay` updates subsequent renders, but characters already settled will not
  replay — the same is true of every component in this catalogue.