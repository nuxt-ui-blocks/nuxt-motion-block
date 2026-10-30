---
title: Striped Pattern
description: A diagonal stripe backdrop drawn from a single repeating gradient.
---

Striped Pattern fills its container with one `repeating-linear-gradient`, so the whole backdrop is a single paint rather than a stack of elements. Stripe thickness, gap and angle are all independent, which is enough to go from hairline pinstripes to wide hazard bars.

It is a container, not a background image: the stripes sit behind the default slot, so you can put a headline or a card on top and the pattern keeps its own stacking.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="striped-pattern-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MStripedPattern :angle="45" :width="1" :gap="12">
      <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
        <h3 class="text-2xl font-bold text-highlighted">
          Striped Pattern
        </h3>
        <p class="max-w-xs text-sm text-muted">
          A single repeating gradient, so the whole backdrop costs one paint
        </p>
      </div>
    </MStripedPattern>
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
    <component-example name="striped-pattern-custom" />
  :::
#code
  <PlaygroundCode name="StripedPattern" />
::

## Props

::component-props
  ::component-prop{name="angle" type="number" default="45"}
  Angle of the stripes, in degrees. `0` draws them vertically and `90` horizontally.
  ::

  ::component-prop{name="width" type="number" default="1"}
  Thickness of one stripe, in pixels.
  ::

  ::component-prop{name="gap" type="number" default="10"}
  Space between two stripes, in pixels. The period is `width + gap`.
  ::

  ::component-prop{name="color" type="string" default="'var(--ui-border)'"}
  Colour of a stripe. Any CSS colour works, including a semi-transparent one.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the container. The container fills its parent, so give the parent a height.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Content drawn above the stripes. It needs its own `relative z-10` if the stripes would otherwise cover it.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.stripedPattern` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative size-full overflow-hidden`
  ::
  ::component-slot-row{name="pattern"}
  `pointer-events-none absolute inset-0`
  ::
::

## Accessibility

The stripe layer is `aria-hidden` and `pointer-events-none`, so it never reaches the accessibility tree and never intercepts a click meant for the content above it. It carries no information on its own, which is why the component ships no label — if the pattern is the only thing distinguishing two states, say so in text instead.
