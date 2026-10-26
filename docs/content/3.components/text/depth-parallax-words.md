---
title: Depth Parallax Words
description: Words that resolve out of focal depth, one after another.
---

Blur alone reads as a fade and scale alone reads as a pop. Together with a small
downward offset they read as depth: the word is further away while it is soft and
small, and arrives at the reader's focal plane as it sharpens.

The effect is per word rather than per character, which keeps a sentence readable
while it is still resolving. This is the paragraph-sized sibling of
[Blur Out Up](/components/text/blur-out-up): more travel, less blur per word, and
a wider stagger default because the words are moving on three properties at once.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="depth-parallax-words-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-10">
    <MDepthParallaxWords
      class="max-w-md text-center text-3xl font-bold text-highlighted"
      :stagger="60"
      text="Every word arrives from further back"
    />
  </div>
</template>
```
::

The root is a plain inline span, so the sentence wraps at the width of its
parent. Wrap it in a `max-w-*` container to control the measure — a `max-width`
on the component itself has no effect on an inline box.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="depth-parallax-words-custom" />
  :::
#code
  <PlaygroundCode name="DepthParallaxWords" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The copy to reveal. Split on single spaces, one animated word per element.
  ::
  ::component-prop{name="stagger" type="number" default="70"}
  Per-word stagger, in milliseconds. At `0` every word lands together.
  ::
  ::component-prop{name="delay" type="number" default="0"}
  Delay before the first word starts, in milliseconds.
  ::
  ::component-prop{name="triggerOnView" type="boolean" default="false"}
  Hold the reveal until the element scrolls into view. Observation stops after
  the first intersection, so it never replays.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element.
  ::
::

## Accessibility

The readable sentence lives in an `sr-only` span and every animated word is
`aria-hidden`, so assistive technology reads the sentence once, in order. An
`aria-label` on the root would be ignored: a plain span has no role and therefore
no accessible name.

Under `prefers-reduced-motion` the transition duration collapses to zero rather
than the animation being skipped. motion-v treats "nothing to animate" as "write
nothing", which would leave the blurred, transparent start state stranded; a
zero-length transition commits the resting values within one frame.

`trigger-on-view` also stops waiting under reduced motion. Deferring a
zero-duration reveal until a scroll the reader may never make would hide the copy
for no reason.

## Performance

- Each word animates `opacity`, `transform` and `filter`. Transform and opacity
  run on the compositor; `filter` is the expensive one, and it is bounded by the
  painted area of a single word rather than a whole block of copy.
- `will-change` is scoped to the word spans and to the three properties that
  actually change, so the layer hint is not applied to the root.
- The reveal is a single `IntersectionObserver` with `once`. Nothing polls and no
  scroll handler is registered.
