---
title: Fade Through
description: Phrase cycling where the old line leaves before the new one arrives.
---

A crossfade and a fade-through look similar in a still, and very different in
motion. In a crossfade both strings are on screen at once for a few hundred
milliseconds, which at headline size looks like two lines fighting for the same
space. A fade-through closes that gap: the outgoing phrase finishes leaving, then
the incoming one starts.

The cost is time. One swap takes roughly `0.68s` end to end, so the interval has
to be long enough to leave the phrase readable in between.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="fade-through-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-12">
    <MFadeThrough
      class="text-center text-3xl font-semibold text-highlighted"
      :phrases="phrases"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * A fade-through is deliberately quieter than a slide: the old copy leaves
 * before the new one arrives, so the line never looks like two strings at once.
 */
const phrases = [
  'One line at a time.',
  'No overlap, no jitter.',
  'Quiet by default.',
]
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="fade-through-custom" />
  :::
#code
  <PlaygroundCode name="FadeThrough" />
::

## Props

::component-props
  ::component-prop{name="phrases" type="string[]" required}
  The phrases to cycle through. One phrase disables the timer.
  ::
  ::component-prop{name="interval" type="number" default="2500"}
  Milliseconds each phrase stays fully visible. Clamped to a `300ms` minimum so
  the exit can finish before the next swap is queued.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element, which is the `aria-live` region.
  ::
::

## Accessibility

- The root is `aria-live="polite"` with `aria-atomic="true"`; the new phrase is
  announced once, in full.
- Reduced motion stops the rotation entirely rather than making it instant. An
  instant swap would still re-announce the line on a timer with no visual cue that
  anything changed.
- Use it on decorative or marketing copy. A phrase the reader must act on should
  not change under them.

## Performance

- `AnimatePresence mode="wait"` keeps one phrase in the tree at a time.
- The enter animates `opacity`, `transform` and a small `filter`; the exit uses
  opacity and a few pixels of travel only, so leaving is cheaper than arriving.
- A single interval, cleared on unmount and restarted when the phrase count or
  interval changes. No scroll listeners.
