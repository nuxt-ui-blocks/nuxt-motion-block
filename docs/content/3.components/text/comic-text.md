---
title: Comic Text
description: Chunky comic lettering where every letter springs in from its own angle.
---

Comic Text draws each character as its own span, gives it a thick outline and a hard offset shadow, then springs it in one letter at a time. The stagger is what sells the effect: the word lands like a stamp rather than fading in as a block.

The tilt of each letter is derived from its index instead of drawn at random, so the server and the client render the same thing and hydration never flickers. With reduced motion the word is drawn in place with no entrance at all.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="comic-text-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center justify-center gap-4 py-10">
    <MComicText text="Pow!" />
    <p class="text-xs text-muted">
      Every letter springs in from its own angle, staggered a few hundredths of a second apart.
    </p>
  </div>
</template>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="comic-text-custom" />
  :::
#code
  <PlaygroundCode name="ComicText" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="'Boom!'"}
  Text to draw. Each character gets its own span, and a space becomes a non-breaking gap.
  ::

  ::component-prop{name="stagger" type="number" default="0.05"}
  Seconds between two letters arriving.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the wrapper. Size and weight live in the theme, so override `text-4xl` here for a bigger word.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.comicText` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-flex flex-wrap justify-center gap-x-1 text-4xl font-black uppercase tracking-tight`
  ::
  ::component-slot-row{name="char"}
  `inline-block text-primary [-webkit-text-stroke:2px_var(--ui-bg)] [text-shadow:4px_4px_0_var(--ui-text-dimmed)]`
  ::
::

## Accessibility

The wrapper carries the whole word as its `aria-label`, and each letter span is `aria-hidden`. Without that, a screen reader would read the word one character at a time. The outline is a `-webkit-text-stroke` on the fill colour, so the letterforms stay the same shape at any size and the contrast comes from the fill against the page rather than the stroke.
