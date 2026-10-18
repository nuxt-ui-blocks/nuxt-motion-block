---
title: Micro Scale Fade
description: A whole string that settles in as one object, at 96% scale.
navigation:
  icon: i-lucide-minimize-2
---

# Micro Scale Fade

The string arrives as one object: it starts at `0.96` scale and fully transparent,
then fades up and grows the last four percent into place over `600ms`. Nothing is
split, nothing is staggered, and there is exactly one animated element in the DOM
however long the string is.

That makes it the cheap one. A forty-character sentence costs the same single
transition here that a single word costs — one element, one `animate` target, no
per-child bookkeeping. Reach for it when a string needs to arrive but the arrival
should not be the interesting part.

The `4%` scale delta is deliberately too small to read as a zoom. It is closer to
the difference between a thing being *not quite there* and being there, which is
what a fade is trying to do anyway — the scale just removes the hard edge that a
pure opacity ramp leaves behind.

Useful for a supporting line under an animated headline, a caption, a table
cell, or anywhere the per-character components in this catalog would cost more
than they are worth.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="micro-scale-fade-basic" />
  :::
#code
```vue
<template>
  <MMicroScaleFade
    class="text-3xl font-bold"
    text="Settle in"
  />
</template>
```
::

## One element, not many

This is the component to reach for when the string is a *string* rather than a
sequence of words or characters. [Bottom Up
Letters](/components/bottom-up-letters) on the same copy emits one animated
element per character and staggers them; [Per Word
Crossfade](/components/per-word-crossfade) does the same per word. Both are
better when the sequencing is the point, and both are the wrong tool when it is
not.

The cost difference is not hypothetical. Each animated span is a real DOM node
with its own `transition` object and its own animation frame bookkeeping, and
those multiply by the length of the text.

Unlike the split components, this one has **no** `aria-hidden` anywhere. There is
only the wrapper and the single animated child, and the child holds the text
itself, so marking it hidden would remove the only copy of the string from the
accessibility tree.

## Props

::field-group
  ::field{name="text" type="string" required}
  The string to reveal. It is rendered as-is — no splitting, no escaping, no
  per-character markup.
  ::

  ::field{name="delay" type="number" default="0"}
  Milliseconds to wait before the reveal starts. Useful when the string should
  land after a headline that is animating letter by letter.
  ::

  ::field{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before revealing. Ignored under
  reduced motion, which always reveals immediately — see below.
  ::

  ::field{name="class" type="string"}
  Classes for the root span, which is also the element carrying the
  `aria-label`.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"` while the animated inner span holds
the same text and is *not* hidden. That redundancy is deliberate and harmless: it
means the accessible name is unaffected if the inner element is ever swapped for
a different tag, and a name that matches the visible text is never wrong.

Under `prefers-reduced-motion` the settle is not skipped — it is run with
`duration: 0`, which lands the final state within a frame. Dropping the animation
instead would leave the hidden styles stranded, because motion-v treats "nothing
to animate" as "write nothing", and the scaled-down, transparent initial state
would never be replaced.

`triggerOnView` is also ignored under reduced motion. A reduced-motion visitor
should not have to scroll a caption into view to be allowed to read it.

The initial state is identical on the server and on the client for the same
reason the transition is suppressed rather than the animation: the server cannot
know the motion preference, so deriving it there would ship hidden styles to
everyone.

## Examples

### One block against many

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="micro-scale-fade-block-vs-chars" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-8">
    <div class="flex flex-col items-center gap-2">
      <MMicroScaleFade
        class="text-2xl font-semibold"
        text="One block"
      />
      <p class="text-xs text-muted">
        One animated element for the whole string.
      </p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <MBottomUpLetters
        class="text-2xl font-semibold"
        text="Eleven letters"
      />
      <p class="text-xs text-muted">
        One animated element per character, 88ms apart.
      </p>
    </div>
  </div>
</template>
```
::

## Notes

- The component reveals once. `triggerOnView` observes with `once`, and there is
  no replay prop — remount with a changing `:key` to run it again.
- The ease is `(0.32, 0.72, 0, 1)` — front-loaded, with a long flat tail. It
  commits most of the movement in the first third of the `600ms` and then drifts
  the last fraction into place, which is why the string reads as having *settled*
  rather than as having grown.
- The root span is `display: inline-block`. Unlike [Per Word
  Crossfade](/components/per-word-crossfade) it does set a display, so it will
  hold its own line box, but it still participates in surrounding layout as an
  inline box rather than filling a block-level slot.
- There is no per-character control of any kind — no stagger, no direction, no
  start offset. If you need any of those, this is the wrong component.