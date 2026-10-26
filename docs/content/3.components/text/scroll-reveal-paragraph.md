---
title: Scroll Reveal Paragraph
description: A paragraph that fills in word by word as it travels through the viewport.
---

The paragraph is rendered twice in the same box: once dim, once bright. The dim
copy holds the line breaks; the bright copy is painted over it and its opacity is
driven by scroll progress. Words light up in reading order without ever moving,
so the text block never reflows and the reader can still skim ahead.

The progress window is tied to the paragraph's own travel through the viewport —
top at 90% of the screen down to 25% — instead of to the page. A page-level
progress bar would leave a short paragraph permanently half-lit.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="scroll-reveal-paragraph-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-10">
    <MScrollRevealParagraph
      class="max-w-xl"
      paragraph="A paragraph that fills in as it travels up the viewport, one word at a time, so the reader always has the next word to reach for and never a wall of text."
    />
  </div>
</template>
```
::

Scroll the page to drive it. The example is placed low enough that it enters the
window while you are reading the page above it.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="scroll-reveal-paragraph-custom" />
  :::
#code
  <PlaygroundCode name="ScrollRevealParagraph" />
::

## Props

::component-props
  ::component-prop{name="paragraph" type="string" required}
  The copy to reveal. Split on whitespace; every word gets an equal slice of the
  same progress range.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the `<p>`. The component already sets `text-lg
  leading-relaxed`; override the size here if needed.
  ::
::

## Accessibility

- The bright copy is the readable one; the dim copy is `aria-hidden` so the
  paragraph is not announced twice.
- Opacity zero does not remove text from the accessibility tree, so the whole
  paragraph is available to a screen reader from the first frame. The reveal is
  purely visual.
- Under `prefers-reduced-motion` a media query pins the bright copy at full
  opacity. It lives in CSS rather than in the scroll calculation, so it also
  holds before hydration: a reader who never scrolls sees the complete
  paragraph, not a row of dim words.
- Text selection and search see both copies. The dim copy sits underneath at
  `15%` opacity, which is why the revealed words look like they change colour
  rather than fade in over a placeholder.

## Performance

- Each word owns one `useTransform` on the paragraph's shared progress value.
  Those run outside Vue's render loop, so scrolling does not re-render the
  paragraph or its words.
- Only `opacity` changes per frame. The line boxes are measured once and stay
  fixed, so there is no layout work while scrolling.
- The dim copy is static paint; it costs one extra text node per word and no
  animation work.
