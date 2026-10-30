---
title: Magic Card
description: A card whose highlight tracks the pointer across its edge.
---

The Magic Card paints a radial gradient that follows the pointer. Two layers share the same gradient: one is masked down to the border so the edge reads as lit, and the other sits inside the card at low opacity so the surface picks up a tint of the same colour.

Everything is driven by the pointer's position in the card's own coordinate space, so the effect works wherever the card sits on the page.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magic-card-example" />
  :::
#code
```vue
<template>
  <MMagicCard class="h-56 w-full max-w-sm">
    <div class="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <UIcon
        name="i-lucide-sparkles"
        class="size-8 text-primary"
      />
      <h3 class="text-lg font-semibold text-highlighted">
        Magic Card
      </h3>
      <p class="text-sm text-muted">
        The highlight follows your pointer across the border
      </p>
    </div>
  </MMagicCard>
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
    <component-example name="magic-card-custom" />
  :::
#code
  <PlaygroundCode name="MagicCard" />
::

## Props

::component-props
  ::component-prop{name="gradientSize" type="number" default="200"}
  Diameter of the highlight, in pixels.
  ::

  ::component-prop{name="gradientFrom" type="string" default="'var(--ui-primary)'"}
  Colour the highlight fades in from.
  ::

  ::component-prop{name="gradientTo" type="string" default="'var(--ui-secondary)'"}
  Colour the highlight fades out to.
  ::

  ::component-prop{name="gradientOpacity" type="number" default="1"}
  Opacity of the highlight at its centre. The inner tint is a fraction of this value.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the card.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.magicCard` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group relative flex size-full rounded-xl border border-default bg-default`
  ::
  ::component-slot-row{name="gradient"}
  `magic-gradient pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100`
  ::
  ::component-slot-row{name="glow"}
  `magic-glow pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500`
  ::
  ::component-slot-row{name="content"}
  `relative z-10 flex size-full flex-col rounded-[inherit]`
  ::
::
