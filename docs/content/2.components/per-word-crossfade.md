---
title: Per Word Crossfade
description: A sentence that assembles itself one word at a time.
navigation:
  icon: i-lucide-align-justify
---

# Per Word Crossfade

The string is split on spaces and each word fades up from `8px` below its resting
position. Words arrive in reading order, each waiting `70ms` behind the one before
it, so a sentence builds the way it is read — a few words at a time rather than
all at once.

The offset is small, which is the point. At `8px` a word is barely displaced from
where it belongs, so the effect is a fade with a hint of lift rather than a
bounce. Words that travel far enough to notice stop reading as words; they read
as separate objects that happen to be near each other.

Splitting per word rather than per character is what makes it usable on running
prose. A twenty-character word takes `20 × 88 ≈ 1.8s` to finish arriving on
[Bottom Up Letters](/components/bottom-up-letters) — well past the point where the
sentence is legible but the last word is still moving. The same sentence as five
words finishes in about `1s`.

Useful for a sub-headline, an intro paragraph, or a sentence that should arrive
just behind a headline rather than with it.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="per-word-crossfade-basic" />
  :::
#code
```vue
<template>
  <MPerWordCrossfade
    class="text-3xl font-bold"
    text="Every word finds its place"
  />
</template>
```
::

## How the timing works

Word *i* waits `delay + i × stagger` milliseconds, then animates for `700ms`.
Words are independent, so the string is finished when the *last* word's `700ms`
is over.

The ease is `(0.16, 1, 0.3, 1)` — an even harder out than the letter components,
followed by a long settle. Combined with the `8px` offset that means each word is
fully opaque within about a fifth of its `700ms` and spends the rest creeping the
last few pixels. Words therefore *land* and then continue to nudge, and the nudge
is short enough that the next word has already started moving before it finishes.

Set `stagger` to `0` and the words crossfade together as one block. Lowering it
below roughly `30` starts to look like a single animation again; the `70ms` default
is where consecutive words are visibly independent without the sentence losing its
shape.

## It wraps like prose

Unlike every other component in this catalog, this one sets **no `display` style
on its root**. The root span computes to `display: inline`, and each word is
wrapped in an `inline-block` span. That is deliberate: it means a long sentence
wraps at the width of its *parent*, breaking across as many lines as it needs,
with the words still arriving in reading order.

The consequence is that `max-width` has no effect on the component itself — a
non-replaced inline box ignores it. Put the constraint on a parent:

```vue
<div class="max-w-sm">
  <MPerWordCrossfade text="A long sentence that wraps." />
</div>
```

A per-word animation that could not wrap would be useless on prose, so the
component gives up the convenience of controlling its own display to keep that
behaviour. See [Line By Line Slide](/components/line-by-line-slide) if you need
the opposite trade.

## Props

::field-group
  ::field{name="text" type="string" required}
  The string to reveal. Split on a single space — see Notes for what happens with
  runs of spaces.
  ::

  ::field{name="stagger" type="number" default="70"}
  Milliseconds added per word. `0` crossfades every word at once. Above roughly
  `150` a sentence takes seconds to finish.
  ::

  ::field{name="delay" type="number" default="0"}
  Milliseconds to wait before the first word fades in. Useful when a headline is
  animating letter by letter and this should follow it rather than overlap.
  ::

  ::field{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before revealing. Ignored under
  reduced motion, which always reveals immediately — see below.
  ::

  ::field{name="class" type="string"}
  Classes for the root span, which is also the element carrying the
  `aria-label`. Type styles set here are inherited by every word.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"` and every animated word span — plus
the space separators between them — is `aria-hidden="true"`. Announcing the words
individually would mean hearing the sentence read out word by word, interleaved
with the effect that is already showing it.

Under `prefers-reduced-motion` the crossfade is not skipped — it is run with
`duration: 0`, which lands every word at its resting value within a frame.
Dropping the animation instead would leave the hidden styles stranded, because
motion-v treats "nothing to animate" as "write nothing", and the lowered,
transparent initial state would never be replaced.

`triggerOnView` is also ignored under reduced motion. A reduced-motion visitor
should not have to scroll a paragraph into view to be allowed to read it.

The initial state is identical on the server and on the client for the same
reason the transition is suppressed rather than the animation: the server cannot
know the motion preference, so deriving it there would ship hidden styles to
everyone.

## Examples

### On running prose

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="per-word-crossfade-paragraph" />
  :::
#code
```vue
<template>
  <div class="max-w-sm">
    <MPerWordCrossfade
      class="text-lg leading-relaxed"
      :stagger="40"
      text="Reading is a sequence of small arrivals. Each word lands a beat after the one before it, so the paragraph assembles itself at the speed you read rather than appearing all at once."
    />
  </div>
</template>
```
::

The narrower `stagger` matters here. At the `70ms` default a nineteen-word
sentence takes over a second to finish arriving, which reads as deliberate on a
headline and as sluggish on a paragraph.

### Resolve on scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="per-word-crossfade-on-scroll" />
  :::
#code
```vue
<template>
  <div class="max-w-md text-center">
    <MPerWordCrossfade
      class="text-3xl font-bold"
      text="Appears on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Word by word, 70ms apart, once the sentence is on screen.
    </p>
  </div>
</template>
```
::

## Notes

- The component reveals once. `triggerOnView` observes with `once`, and there is
  no replay prop — remount with a changing `:key` to run it again.
- Splitting is on a **single** space. A run of two spaces therefore produces an
  empty word, which renders nothing but still consumes a stagger step — harmless
  for prose, and the reason the space separators are emitted between every pair
  of words rather than being reconstructed from the original spacing. If you need
  runs of spaces preserved exactly, this is not the component.
- Word spans are `white-space: pre`, and so are the separators, which is what
  keeps a wrapped sentence from losing its inter-word spacing at a line break.
- A word that happens to be a single character is animated like any other, so
  articles and prepositions get the same `8px` travel as the nouns around them.
  That is what "per word" means; it is not "per significant word".