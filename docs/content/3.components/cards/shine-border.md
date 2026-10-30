---
title: Shine Border
description: A single highlight that travels around the edge of a box.
---

The Shine Border paints a gradient over the whole box and then masks it down to the padding ring, which leaves a highlight running around the border. Because the mask is derived from the box itself, the ring follows whatever radius you give the wrapper.

It animates `background-position`, so the loop is pure CSS and costs nothing on the main thread.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shine-border-example" />
  :::
#code
```vue
<template>
  <MShineBorder
    class="w-full max-w-sm p-6"
    :border-width="2"
    :duration="8"
    color="#3b82f6"
  >
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-semibold text-highlighted">
        Shine Border
      </h3>
      <p class="text-sm text-muted">
        A single highlight travels around the edge of the box, forever.
      </p>
    </div>
  </MShineBorder>
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
    <component-example name="shine-border-custom" />
  :::
#code
  <PlaygroundCode name="ShineBorder" />
::

## Props

::component-props
  ::component-prop{name="color" type="string" default="'var(--ui-primary)'"}
  Colour of the travelling highlight. Any CSS colour works.
  ::

  ::component-prop{name="duration" type="number" default="14"}
  Seconds for one full loop of the highlight.
  ::

  ::component-prop{name="borderWidth" type="number" default="1"}
  Thickness of the lit ring, in pixels.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the wrapper.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.shineBorder` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative rounded-xl border border-default bg-default`
  ::
  ::component-slot-row{name="shine"}
  `shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]`
  ::
::
