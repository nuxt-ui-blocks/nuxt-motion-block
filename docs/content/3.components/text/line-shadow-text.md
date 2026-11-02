---
title: Line Shadow Text
description: Text whose shadow is a diagonal stripe pattern that slowly sweeps.
---

Line Shadow Text draws a second copy of the text in a pseudo-element, fills it with a 45° stripe gradient and clips that gradient to the glyphs. The stripes are drawn at `0.06em` so they scale with the type instead of turning into a solid band at large sizes.

The copy sits one twentieth of an em down and right of the original, which is what reads as an offset shadow. It is pushed behind the text with a negative `z-index`, so the original stays crisp on top.

The gradient's background position travels from `0 0` to `100% -100%` over fifteen seconds, which moves the stripes along their own diagonal. Under reduced motion the sweep stops and the shadow holds still.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="line-shadow-text-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-10">
    <h1 class="text-5xl font-semibold tracking-tighter sm:text-6xl">
      Ship
      <MLineShadowText
        text="Fast"
        class="italic"
        :shadow-color="colorMode.value === 'dark' ? 'white' : 'black'"
      />
    </h1>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()
</script>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="line-shadow-text-custom" />
  :::
#code
  <PlaygroundCode name="LineShadowText" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="undefined"}
  The text to draw. It is also written to `data-text`, which is what the shadow layer renders, so pass the copy here whenever you want a shadow.
  ::

  ::component-prop{name="shadowColor" type="string" default="'black'"}
  Colour of the striped shadow.
  ::

  ::component-prop{name="as" type="'span' | 'p' | 'h1' | ..." default="'span'"}
  Element the text renders as. Accepts `article`, `div`, `h1`–`h6`, `li`, `p`, `section` and `span`.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the root element.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Content to draw instead of `text`. The shadow is drawn from `data-text`, so filling only the slot leaves the text unstyled — pass `text` as well if you want the stripes.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.lineShadowText` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `mb-line-shadow relative z-0 inline-flex`
  ::
::

## Accessibility

The shadow is a pseudo-element, so it is never read out: the words are announced once, from the real text node. The sweep is a CSS animation and stops under `prefers-reduced-motion`, leaving the striped shadow in place as a still ornament.
