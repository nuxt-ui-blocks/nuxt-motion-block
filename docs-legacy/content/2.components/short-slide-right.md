---
title: Short Slide Right
description: Rotating phrases that slide in from the left inside an inline slot, one word at a time.
navigation:
  icon: i-lucide-move-right
---

# Short Slide Right

A phrase slides in from `24px` to the left while unblurring, and its words fade up
`92ms` behind one another as it settles. It holds, blurs, drifts `12px` to the
right, and the next phrase takes its place.

The root is `inline-block` with `overflow: hidden`, which is the whole point: the
phrase travels *inside a slot* rather than across the page. Put it in the middle of a
sentence and the words beside it never get overrun by the animation. Everything
about this component follows from that decision — the fixed travel distances, the
`mode="wait"` swap, and the fact that the root is sized by whatever phrase it
currently holds.

Useful for a rotating status, a value proposition, or a headline qualifier that
belongs to a line of copy.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="short-slide-right-basic" />
  :::
#code
```vue
<template>
  <MShortSlideRight
    class="text-2xl font-bold"
    :phrases="phrases"
  />
</template>

<script setup>
const phrases = ['Ship it', 'Measure it', 'Ship it again']
</script>
```
::

## The word trail

The phrase wrapper and its words animate different properties on purpose. The
wrapper moves and unblurs over `520ms` on an ease-out curve; the words only change
opacity, each over `210ms`, delayed by `index × 92ms`.

So the phrase arrives as one object first — a blurred, offset block — and only
resolves into legible words as it comes to rest. Reversing the order (words first,
phrase second) would give away the answer before the object had arrived, and the
motion would read as two effects rather than one.

The exit is asymmetric with the enter in the same way. The enter eases out from
`24px` away with a `1.2px` blur; the exit eases *in* to `12px` away with a lighter
`1px` blur over `320ms`. The shorter distance and the heavier easing make leaving
feel lighter than arriving, which is the correct asymmetry for something that is
going away.

## The swap

`AnimatePresence mode="wait"` means the outgoing phrase finishes its exit before the
incoming one starts entering. No two phrases ever coexist and there is never a
cross-fade, which matters because the two would otherwise overlap into text that
was never written.

The cost is a seam: `320ms` of empty slot between the exit and the enter. The
component's timer does not account for it — swaps fire every `interval`
milliseconds regardless of how far through the enter or exit the component happens
to be. Keep `interval` comfortably above `840ms` (`520ms` of enter plus `320ms` of
exit) or a swap will cut an animation in half.

## Props

::field-group
  ::field{name="phrases" type="string[]" required}
  The phrases to cycle through, one per cycle. Each phrase is split on spaces into
  individually timed words.
  ::

  ::field{name="interval" type="number" default="2500"}
  Milliseconds between swaps, measured from the start of one cycle to the start of
  the next. Should stay above `840ms` — see above.
  ::

  ::field{name="class" type="string"}
  Classes for the root element, which is also the inline slot and the live region.
  Type styles set here are inherited by every word.
  ::
::

## Accessibility

The root is an `aria-live="polite"` region containing the words themselves. No
`aria-label`, no `aria-hidden` on any word — the phrase changes over time, so a
label describing a fixed string would be re-announced on every swap, and hiding the
words would leave the live region with nothing to announce. The polite region
announces each new phrase once, on arrival, without interrupting.

Under `prefers-reduced-motion` every transition collapses to `duration: 0`, so each
phrase simply appears in place. The rotation still runs: a frozen inline slot would
leave a gap in the middle of the sentence, so the phrases keep cycling — only
without the travel.

The initial state is identical on the server and the client. The server cannot know
the motion preference, and `initial` is only read when the visual element is first
created, so a client that changed its mind could never clear the server's hidden
attributes. Suppressing the *transition* keeps one identical tree instead of a
mismatched one.

## Examples

### Inside a sentence

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="short-slide-right-inline" />
  :::
#code
```vue
<template>
  <p class="max-w-md text-center text-lg leading-relaxed">
    Our current status is
    <MShortSlideRight
      class="font-bold"
      :phrases="phrases"
      :interval="3200"
    />
    and has been for three weeks running.
  </p>
</template>

<script setup>
const phrases = ['all green', 'mostly green', 'green enough']
</script>
```
::

Notice how the sentence closes up around the slot and reopens as the phrase
changes. That is the trade this component makes: inline placement is worth more
than a fixed reserved width.

## Notes

- The component starts on mount and rotates until it is unmounted. There is no
  `triggerOnView` and no replay prop — remount with a changing `:key` to restart it
  from the first phrase.
- The root is sized by the phrase it currently contains, and the size change is not
  animated. In the example above you can watch the words after the slot shift as the
  phrases have different lengths. Keep phrases of similar length, or give the root a
  fixed width, if that movement would be distracting.
- `interval` and the phrase count are both watched, so changing either re-arms the
  timer — a change takes effect immediately rather than at the end of the current
  period.
- Phrases are split on a **single** space. Words are `inline-block` with `0.25em`
  of gap, so an empty word from a double space would render as an invisible word
  occupying the gap.
- `overflow: hidden` is what keeps the travel masked. If you override it on the
  root, the incoming phrase will slide across the copy beside it.
- Compare [Short Lower in](/components/short-slide-down), which builds a centred
  stack downward instead and is a block-level box.