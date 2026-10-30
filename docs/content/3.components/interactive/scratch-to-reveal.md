---
title: Scratch to Reveal
description: A cover you scratch off with the pointer to uncover whatever sits underneath.
---

Scratch to Reveal paints a gradient over its slot and then erases that paint where the pointer moves, using the canvas destination-out composite. Scratching is a real stroke rather than a trail of dots, so a fast drag still leaves a continuous line.

The component measures how much of the cover is gone when the pointer lifts, and once that share passes `threshold` it fades the whole cover out and emits `complete`. Nothing else is animated, which is why the reveal stays crisp while you drag.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scratch-to-reveal-example" />
  :::
#code
```vue
<template>
  <MScratchToReveal
    :width="320"
    :height="200"
    :threshold="45"
    class="border border-default"
    @complete="revealed = true"
  >
    <div class="flex flex-col items-center gap-1 text-center">
      <p class="text-xs uppercase tracking-widest text-muted">
        You won
      </p>
      <p class="text-3xl font-bold text-highlighted">
        20% off
      </p>
      <p class="text-xs text-muted">
        Code SCRATCH20
      </p>
    </div>
  </MScratchToReveal>
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
    <component-example name="scratch-to-reveal-custom" />
  :::
#code
  <PlaygroundCode name="ScratchToReveal" />
::

## Props

::component-props
  ::component-prop{name="width" type="number" default="undefined"}
  Width of the frame, in pixels. Left out, the frame fills its parent and the slot decides the height.
  ::

  ::component-prop{name="height" type="number" default="undefined"}
  Height of the frame, in pixels. Left out, the slot's content sets it.
  ::

  ::component-prop{name="brushSize" type="number" default="24"}
  Radius of the scratch stroke, in pixels. It stays the same size at any display scale.
  ::

  ::component-prop{name="threshold" type="number" default="50"}
  Share of the cover, from `0` to `100`, that has to be gone before the rest fades away.
  ::

  ::component-prop{name="gradientColors" type="string[]" default="['#a97cf8', '#f38cb8', '#fdcc92']"}
  Colours the cover fades through, corner to corner.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the frame.
  ::
::

## Events

::component-events
  ::component-event{name="complete"}
  Fired once the scratched area passes `threshold`. It does not fire again until `reset()` is called.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Content under the cover. It is always in the document, so a screen reader can read it before anyone scratches anything.
  ::
::

## Methods

::component-props
  ::component-prop{name="reset" type="() => void"}
  Paints the cover back and clears the revealed state, ready to be scratched again.
  ::
::

```vue
<template>
  <MScratchToReveal ref="scratch">
    <p>Under the cover</p>
  </MScratchToReveal>
  <UButton @click="scratch?.reset()">
    Play again
  </UButton>
</template>
```

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.scratchToReveal` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative w-full select-none overflow-hidden rounded-xl`
  ::
  ::component-slot-row{name="content"}
  `flex size-full items-center justify-center`
  ::
  ::component-slot-row{name="canvas"}
  `absolute inset-0 size-full cursor-crosshair touch-none transition-opacity duration-500`
  ::
::

## Accessibility

The cover is a canvas with `aria-hidden`, and the content underneath is ordinary DOM that is never removed, so nothing has to be uncovered to be read or found by search. Scratching is pointer-only, which is why the prize should not be a secret that only appears on success: the reveal is a flourish on top of information that is already in the page. On touch screens the canvas sets `touch-action: none`, so a drag scratches instead of scrolling the page.
