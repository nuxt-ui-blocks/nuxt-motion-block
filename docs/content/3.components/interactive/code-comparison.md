---
title: Code Comparison
description: Two code panes with a divider you can drag to reveal either side.
---

Code Comparison stacks two code blocks in the same grid cell and clips the top one at the divider, so the panes always line up regardless of how long either snippet is. Dragging the divider wipes from one version to the other, which makes a refactor readable in place instead of in two separate blocks.

The divider is a real range input: pointer drag, click-to-jump and arrow keys all work, and the value is exposed through `v-model`. Each pane can be filled from a prop or from its own slot when you want to drop a syntax-highlighted block inside.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="code-comparison-example" />
  :::
#code
```vue
<script setup lang="ts">
const before = `const total = items.filter(item => item.active).map(item => item.price)
const tax = total.reduce((sum, price) => sum + price * 0.2, 0)
const receipt = { total, tax, paid: total + tax, currency: 'USD' }`

const after = `const total = items.filter(({ active }) => active).map(({ price }) => price)
const tax = total.reduce((sum, price) => sum + price * 0.2, 0)
const receipt = { total, tax, paid: total + tax, currency: 'USD' }`
</script>

<template>
  <MCodeComparison
    before-label="Before"
    after-label="After"
    :before="before"
    :after="after"
  />
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
    <component-example name="code-comparison-custom" />
  :::
#code
  <PlaygroundCode name="CodeComparison" />
::

## Props

::component-props
  ::component-prop{name="before" type="string" default="''"}
  Text for the left-hand pane. Ignored when the `before` slot is filled.
  ::

  ::component-prop{name="after" type="string" default="''"}
  Text for the right-hand pane. Ignored when the `after` slot is filled.
  ::

  ::component-prop{name="beforeLabel" type="string" default="undefined"}
  Label shown in a header above the left-hand pane. Leave it out for no header.
  ::

  ::component-prop{name="afterLabel" type="string" default="undefined"}
  Label shown in a header above the right-hand pane.
  ::

  ::component-prop{name="modelValue" type="number" default="50"}
  Where the divider sits, from `0` to `100`. Pair it with `v-model` to read the position back.
  ::

  ::component-prop{name="ariaLabel" type="string" default="'Reveal amount'"}
  Accessible name of the divider's range input.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the frame.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="before"}
  Content of the left-hand pane. Use it to nest a highlighted code block instead of plain text.
  ::
  ::component-slot-row{name="after"}
  Content of the right-hand pane.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.codeComparison` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative grid overflow-hidden rounded-xl border border-default bg-elevated`
  ::
  ::component-slot-row{name="pane"}
  `col-start-1 row-start-1 min-w-0 overflow-hidden`
  ::
  ::component-slot-row{name="header"}
  `flex items-center justify-between gap-2 border-b border-default px-4 py-2 text-xs font-medium text-muted`
  ::
  ::component-slot-row{name="code"}
  `block overflow-x-auto p-4 font-mono text-xs leading-relaxed text-highlighted`
  ::
  ::component-slot-row{name="divider"}
  `pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-primary`
  ::
  ::component-slot-row{name="handle"}
  `absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-default bg-default text-muted shadow-md`
  ::
  ::component-slot-row{name="slider"}
  `absolute inset-0 z-20 size-full cursor-ew-resize appearance-none bg-transparent opacity-0`
  ::
::

## Accessibility

The divider is an `<input type="range">` with a label, not a decorative handle. A keyboard user reaches it with Tab and moves it with the arrow keys, and assistive technology announces it as a slider with a value between `0` and `100`. The visible divider and grip are `aria-hidden` so the input is the only thing announced, and both panes stay in the document, so their text is readable by a screen reader and selectable by a search engine either way.
