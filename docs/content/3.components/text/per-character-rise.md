---
title: Per Character Rise
description: Letters that lift into place one after another, sharp from the first frame.
---

No blur, no scale, no depth: each character starts below its baseline and rises
into place. The restraint is the point. Blur and scale draw attention to the
motion, while a short vertical rise reads as the type simply arriving.

At headline sizes the per-letter stagger is short enough to feel like one gesture.
On body-sized text the same effect reads as a typewriter, which is why the
default stagger is stated in milliseconds and left to the caller to lower.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="per-character-rise-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-10">
    <MPerCharacterRise
      class="text-center text-3xl font-bold text-highlighted"
      :stagger="22"
      text="Read it one letter at a time"
    />
  </div>
</template>
```
::

Splitting is by Unicode code point (`Array.from`), not by UTF-16 code unit, so an
emoji or a rare CJK character is not torn into two broken halves.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="per-character-rise-custom" />
  :::
#code
  <PlaygroundCode name="PerCharacterRise" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The copy to reveal, split into one element per character.
  ::
  ::component-prop{name="stagger" type="number" default="24"}
  Per-character stagger, in milliseconds.
  ::
  ::component-prop{name="delay" type="number" default="0"}
  Delay before the first character starts, in milliseconds.
  ::
  ::component-prop{name="triggerOnView" type="boolean" default="false"}
  Wait for the element to scroll into view before playing.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element.
  ::
::

## Accessibility

The sentence is announced once through an `sr-only` span; every rising glyph is
`aria-hidden`. Reading the string character by character would be unusable, and
an `aria-label` on the root would not be exposed because a span has no role.

Spaces become no-break spaces inside their own inline-block. A plain space would
collapse at the edge of the block and close the gap between words, while a
no-break space keeps the gap and still allows the parent to wrap between
characters.

Reduced motion collapses the transition duration instead of skipping the
animation. Removing the animation would leave every glyph at its hidden offset
forever, because motion-v only writes values that actually animate.

## Performance

- Only `opacity` and `transform` change, so the rise is compositor-only.
- One observer per component, not per character, and it unobserves after the
  first intersection.
- Long strings produce one element per character. That is fine for a headline and
  wasteful for a paragraph; use [Blur Out Up](/components/text/blur-out-up) or
  [Depth Parallax Words](/components/text/depth-parallax-words) for prose.
