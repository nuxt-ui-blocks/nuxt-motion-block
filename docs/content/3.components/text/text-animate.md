---
title: Text Animate
description: Animate text in word by word, character by character or line by line.
---

Text Animate splits a string into segments and staggers a preset animation across them. Words, characters and lines are all supported, and the split keeps its whitespace intact so the line never reflows mid-animation.

The animation starts when the text scrolls into view, and is skipped entirely for visitors who have asked for reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-animate-example" />
  :::
#code
```vue
<template>
  <div class="flex h-40 w-full items-center justify-center rounded-xl border border-default bg-default px-6">
    <MTextAnimate
      as="h2"
      text="Interfaces that move with intent."
      by="words"
      preset="blurInUp"
      class="max-w-md text-center text-2xl font-semibold text-highlighted"
    />
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
    <component-example name="text-animate-custom" />
  :::
#code
  <PlaygroundCode name="TextAnimate" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  Text to animate. The default slot wins if both are given.
  ::

  ::component-prop{name="by" type="'words' | 'characters' | 'lines'" default="'words'"}
  Split the text by words, characters or lines.
  ::

  ::component-prop{name="preset" type="TextAnimatePreset" default="'fadeIn'"}
  Animation to play: `fadeIn`, `blurIn`, `blurInUp`, `blurInDown`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scaleUp`, `scaleDown` or `spinIn`.
  ::

  ::component-prop{name="delay" type="number" default="0.1"}
  Seconds between one segment starting and the next.
  ::

  ::component-prop{name="duration" type="number" default="0.3"}
  Seconds each segment takes to settle.
  ::

  ::component-prop{name="startOnView" type="boolean" default="true"}
  Hold the animation until the text scrolls into view.
  ::

  ::component-prop{name="once" type="boolean" default="false"}
  Only play once when `startOnView` is on. With `false` the text replays every time it re-enters the viewport.
  ::

  ::component-prop{name="as" type="string" default="'p'"}
  Element to render the text as.
  ::

  ::component-prop{name="segmentClass" type="string" default="''"}
  CSS classes to apply to each animated segment.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the root element.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textAnimate` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-block`
  ::
  ::component-slot-row{name="segment"}
  `inline-block whitespace-pre`
  ::
  ::component-slot-row{name="space"}
  `whitespace-pre`
  ::
::
