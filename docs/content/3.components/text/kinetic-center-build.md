---
title: Kinetic Center Build
description: A phrase that assembles word by word, with the line staying centred as it grows.
---

The line starts as one word, centred. Each new word enters from the right and the
words already on screen slide left to keep the row centred, until the full phrase
is locked in the middle. The growth *is* the animation: nothing fades, nothing
scales, and the sentence is readable at every step.

This is the keynote build, and it only works when the container is centred. A
left-aligned build reads as words appearing at the end of a line, which is a
different effect entirely.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="kinetic-center-build-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-12">
    <MKineticCenterBuild
      class="max-w-lg text-center text-2xl font-semibold text-highlighted"
      :phrases="phrases"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * The line is built word by word from the right, and the words already on
 * screen slide left to make room. Centring the row is what makes the growth
 * read as the sentence assembling itself.
 */
const phrases = [
  'Built one word at a time.',
  'Centred, then locked.',
  'Never a layout jump.',
]
</script>
```
::

The component lays itself out as a wrapping flex row. Give it a `max-w-*` and the
longest phrase will wrap instead of overflowing.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="kinetic-center-build-custom" />
  :::
#code
  <PlaygroundCode name="KineticCenterBuild" />
::

## Props

::component-props
  ::component-prop{name="phrases" type="string[]" required}
  The phrases to build. Each is split on single spaces.
  ::
  ::component-prop{name="interval" type="number" default="2500"}
  How long the finished phrase holds before it exits, in milliseconds. The build
  itself takes `430ms` per additional word plus a `340ms` settle.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element, which is the `aria-live` region.
  ::
::

## Accessibility

- The root is `aria-live="polite"` with `aria-atomic="true"`. The phrase is
  announced when it completes rather than word by word, which is what the visual
  is already doing.
- Reduced motion shows the whole phrase from the first frame and still cycles on
  the interval. The build is the effect, so playing it word by word is exactly
  what the preference asks not to see.
- Words already on screen move via layout animation. Under reduced motion that
  movement is disabled along with everything else.

## Performance

- Each word animates `transform`, `opacity` and a small `filter`; layout
  animation moves the existing words, so the row re-centres without a reflow of
  the page.
- The build schedule is one timer per additional word plus a hold and an exit
  timer, all cleared on unmount and re-created when the phrase changes. There is
  no animation frame loop and no scroll listener.
- Keys are scoped to the phrase (`phraseIndex-index`), so words from the previous
  phrase are removed rather than morphed into the new ones.
