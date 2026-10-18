---
title: Blur Out Up
description: A sentence that resolves out of focus, one word at a time.
navigation:
  icon: i-lucide-aperture
---

# Blur Out Up

The string is split on spaces and each word starts `6px` out of focus, `10px`
below its resting position and fully transparent, then eases to sharp, opaque and
in place. Word *i* starts `28ms` after word *i - 1*.

Same idea as [Soft Blur In](/components/soft-blur-in) at a larger unit and a
smaller amplitude: `6px` of blur and `10px` of travel rather than `12px` and
`16px`, because a word is a bigger object and a blurred word is already hard
enough to read.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="blur-out-up-basic" />
  :::
#code
```vue
<template>
  <MBlurOutUp
    class="text-3xl font-bold"
    text="Words lift out of focus"
  />
</template>
```
::

## How the timing works

Word *i* waits `delay + i × stagger` milliseconds, then animates for `560ms`. The
whole string is finished when the *last* word's `560ms` is over, which at the
`28ms` default is a five-word headline finishing in about `670ms`.

The ease is `(0.22, 1, 0.36, 1)` — the same curve as
[Soft Blur In](/components/soft-blur-in) and
[Mask Reveal Up](/components/mask-reveal-up), shared so that a headline built from
several of these components resolves with one consistent motion rather than three.

Splitting per word rather than per character is what makes it usable on prose. The
same sentence as characters would take over `1.4s`
(see [Soft Blur In](/components/soft-blur-in#how-the-timing-works)); as words it
finishes in well under a second and never reads as a typewriter.

## It wraps like prose

The root span sets **no `display` style**, so it computes to `display: inline`,
and each word is an `inline-block` span. A long sentence therefore wraps at the
width of its *parent*, breaking across as many lines as it needs, with words still
arriving in reading order.

The consequence is that `max-width` has no effect on the component itself — a
non-replaced inline box ignores it. Put the constraint on a parent:

```vue
<div class="max-w-sm">
  <MBlurOutUp text="A long sentence that wraps." />
</div>
```

This is the same trade [Per Word Crossfade](/components/per-word-crossfade) makes,
and for the same reason. If you need the component to control its own display and
respect its own `max-width`, use [Mask Reveal Up](/components/mask-reveal-up),
which is `display: block` and takes lines explicitly.

## Props

::field-group
  ::field{name="text" type="string" required}
  The string to reveal. Split into one animated element per word.
  ::

  ::field{name="stagger" type="number" default="28"}
  Milliseconds added per word. `0` resolves every word at once. Above roughly `120`
  a sentence takes seconds to finish.
  ::

  ::field{name="delay" type="number" default="0"}
  Milliseconds to wait before the first word resolves.
  ::

  ::field{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before playing. Ignored under reduced
  motion.
  ::

  ::field{name="class" type="string"}
  Classes for the root span, which is also the element carrying the `aria-label`.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"` and every animated word span — plus
the space separators between them — is `aria-hidden="true"`. Announcing the words
individually would mean hearing the sentence read out word by word, interleaved
with the effect already showing it.

Under `prefers-reduced-motion` the reveal is run with `duration: 0` rather than
skipped. motion-v treats "nothing to animate" as "write nothing", so skipping the
animation would leave the blurred, transparent, lowered starting state in place
forever. Collapsing the duration lands every word at its resting value within a
frame while keeping one identical server and client tree.

## Examples

### On running prose

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="blur-out-up-paragraph" />
  :::
#code
```vue
<template>
  <div class="max-w-sm">
    <MBlurOutUp
      class="text-lg leading-relaxed"
      :stagger="14"
      text="Running prose blurs up a word at a time, which keeps the paragraph readable while it is still arriving."
    />
  </div>
</template>
```
::

The narrower stagger matters here. At the `28ms` default a thirteen-word sentence
takes over `900ms` to finish arriving, which reads as deliberate on a headline and
as sluggish on a paragraph.

### Resolve on scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="blur-out-up-on-scroll" />
  :::
#code
```vue
<template>
  <div class="text-center">
    <MBlurOutUp
      class="text-3xl font-bold"
      text="Resolves on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Words arrive 28ms apart, once the line is on screen.
    </p>
  </div>
</template>
```
::

## Notes

- The component plays once. `triggerOnView` observes with `once`, and there is no
  replay prop — remount with a changing `:key` to run it again.
- Splitting is on a **single** space. A run of two spaces produces an empty word,
  which renders nothing but still consumes a stagger step. Harmless for prose, and
  the reason space separators are emitted between every pair of words rather than
  reconstructed from the original spacing.
- Word spans and space separators are both `white-space: pre`, which is what keeps
  a wrapped sentence from losing its inter-word spacing at a line break.
- Unlike [Ransom Note](/components/ransom-note), `stagger` here is in
  **milliseconds**, as it is everywhere else in this library.