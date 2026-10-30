---
title: Text Highlighter
description: A marker swipe that paints itself behind a phrase as it scrolls into view.
---

Text Highlighter lays a skewed block behind the words and scales it out from the left edge the first time the phrase is on screen. It is one `Motion` element with a `scaleX`, so the swipe costs a single composited transform rather than a paint.

The block is drawn behind the text, not over it: the text keeps its own colour and stays selectable, and the swipe is `aria-hidden`. Under reduced motion the block is simply already there, so the phrase never sits half-highlighted.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-highlighter-example" />
  :::
#code
```vue
<template>
  <p class="text-2xl font-semibold text-highlighted">
    Build interfaces that
    <MTextHighlighter text="move with intent" />
    instead of fading in on every scroll.
  </p>
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
    <component-example name="text-highlighter-custom" />
  :::
#code
  <PlaygroundCode name="TextHighlighter" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  Text to highlight. The default slot wins when it is filled.
  ::

  ::component-prop{name="highlightColor" type="string" default="undefined"}
  Colour of the swipe. Left out, the theme's `bg-primary/30` is used, which follows your brand colour.
  ::

  ::component-prop{name="duration" type="number" default="0.7"}
  Seconds for the swipe. It runs once, when the phrase first comes into view.
  ::

  ::component-prop{name="delay" type="number" default="0.1"}
  Wait before the swipe starts, in seconds. Useful when several phrases share a line.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the wrapper.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The phrase to highlight. Anything inline works, including links and `<code>`.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textHighlighter` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block`
  ::
  ::component-slot-row{name="highlight"}
  `pointer-events-none absolute inset-x-[-0.18em] inset-y-[0.06em] origin-left rounded-[0.2em] bg-primary/30`
  ::
  ::component-slot-row{name="text"}
  `relative z-10`
  ::
::

## Accessibility

The swipe is decorative and `aria-hidden`, so a screen reader reads the sentence once and hears no extra content. The phrase itself is ordinary text: it can be selected, searched and copied, and the highlight never covers a glyph. Because the animation is a `transform` that runs once on entry, it cannot trap a reader mid-state — with reduced motion the block is rendered at full width from the first frame.
