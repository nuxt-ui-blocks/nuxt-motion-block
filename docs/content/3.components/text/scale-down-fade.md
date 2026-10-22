---
title: Scale Down Fade
description: Copy that enters a touch too large and settles to its natural size.
---

Most entrances start small and grow. This one starts *larger* than rest and
shrinks into place, which reads as an object losing a little energy rather than
arriving from somewhere else. The copy is already where it belongs on the first
frame; only the emphasis is settling.

It is the safe default for product copy that should feel polished without looking
animated: `4%` of scale and `8px` of travel are small enough to miss if you are
reading, and large enough to notice if you are watching.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="scale-down-fade-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-12">
    <MScaleDownFade
      class="text-center text-4xl font-semibold tracking-tight text-highlighted"
      text="Arrives at its own size"
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
    <component-example name="scale-down-fade-custom" />
  :::
#code
  <PlaygroundCode name="ScaleDownFade" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The copy to settle in. Animated as a single element.
  ::
  ::component-prop{name="delay" type="number" default="0"}
  Delay before the settle starts, in milliseconds.
  ::
  ::component-prop{name="triggerOnView" type="boolean" default="false"}
  Wait for the element to scroll into view before playing.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element.
  ::
::

## Accessibility

The animated text is `aria-hidden` and a duplicate in an `sr-only` span carries
the readable copy, so the string appears once in the accessibility tree.

Reduced motion collapses the duration to zero rather than skipping the animation.
The initial state is `opacity: 0`, so a skipped animation would leave the copy
invisible instead of still.

Because the whole element scales, a large `delay` combined with
`trigger-on-view` can leave the copy invisible below the fold on a slow page.
Keep delays under a few hundred milliseconds for content the reader needs
immediately.

## Performance

- One element animates `opacity` and `transform`. Both are compositor properties;
  nothing triggers layout or paint.
- `will-change` is set on that one element and only for the two properties that
  change.
- The scroll observer, when enabled, is a single `once` observer.
