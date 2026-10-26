---
title: Shimmer Sweep
description: A headline that glides in from the left while dissolving out of blur.
---

The name is a little generous: there is no light travelling across the glyphs,
and no gradient. The "shimmer" is a slide plus a blur dissolve at headline scale,
which is enough to make the line feel like it is coming into focus rather than
being switched on.

That choice is deliberate. A real masked sweep would require the text to be a
background-clipped plane: it breaks inline wrapping, forced colours, and selection
painting. The dissolve reads the same at display sizes and leaves a plain text
node behind.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="shimmer-sweep-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-12">
    <MShimmerSweep
      class="text-center text-4xl font-semibold tracking-tight text-highlighted"
      text="Glides into focus"
    />
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="shimmer-sweep-custom" />
  :::
#code
  <PlaygroundCode name="ShimmerSweep" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The copy to sweep in. Animated as one element.
  ::
  ::component-prop{name="delay" type="number" default="0"}
  Delay before the sweep starts, in milliseconds.
  ::
  ::component-prop{name="triggerOnView" type="boolean" default="false"}
  Wait for the element to scroll into view before playing.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element.
  ::
::

## Accessibility

The animated text is `aria-hidden` and the readable copy sits in an `sr-only`
span, so the line is announced once and never mid-dissolve.

Reduced motion commits the resolved state with a zero-duration transition. The
hidden state is `blur(8px)` at zero opacity, so merely skipping the animation
would leave the headline unreadable.

## Performance

- The sweep animates `filter`, `opacity` and `transform`. Blur is the only
  expensive property, and only for the duration of the sweep.
- Only one element is involved, so the cost does not scale with the length of the
  copy.
- The scroll observer is a single `once` observer; nothing is left running after
  the line lands.
