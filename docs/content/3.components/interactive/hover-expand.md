---
title: Hover Expand
description: A row of image panels where the one under the pointer grows and the rest collapse to thin strips.
---

An accordion laid on its side: every panel is a button, and the active one takes
`expandedFlex` units of the row while the others fall back to `collapsedFlex`.
The title on a collapsed panel rotates ninety degrees and sits along the bottom
edge, so the strip still says what it holds.

This is a flex layout, not a set of measured widths. Nothing reads the DOM to
decide how wide a panel should be, which means the component works the same in a
row, in a column, and at any container width.

## Usage

Give every item an `id` and a `title`, then an `image` and an optional
`description`. Pointing at a panel activates it; on touch devices a click does
the same, because there is no hover to wait for.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="hover-expand-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-4">
    <MHoverExpand :items="items" class="max-w-3xl" />
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    id: 'lakeside',
    title: 'Lakeside',
    description: 'Still water at first light',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=700&fit=crop',
    alt: 'A lake between mountains at sunrise',
  },
  {
    id: 'desert',
    title: 'Desert',
    description: 'Dunes after the wind',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=700&fit=crop',
    alt: 'Rippled sand dunes',
  },
  {
    id: 'forest',
    title: 'Forest',
    description: 'Fog between the trunks',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=700&fit=crop',
    alt: 'Sunlight through a dense forest',
  },
  {
    id: 'coast',
    title: 'Coast',
    description: 'Low tide on black rock',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&fit=crop',
    alt: 'A sandy beach meeting turquoise water',
  },
]
</script>
```

::

Focus follows the pointer: focusing a panel with the keyboard also expands it,
and the arrow keys walk the row and move focus with the selection.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="hover-expand-custom" />
  :::
#code
  <PlaygroundCode name="HoverExpand" />
::

`orientation="vertical"` turns the same component into a column, where the active
panel grows in height and the labels stay upright. `showLabelsWhenCollapsed`
hides the rotated labels entirely, and the two flex values trade how much of the
row the active panel takes.

## Props

::component-props
  ::component-prop{name="items" type="HoverExpandItem[]" required}
  Panels to render. Each entry needs `id` and `title`; `image`, `alt` and
  `description` are optional.
  ::
  ::component-prop{name="orientation" type="'horizontal' | 'vertical'" default="'horizontal'"}
  Lays the panels in a row or a column.
  ::
  ::component-prop{name="activeIndex" type="number"}
  Controlled active panel. Leave it out to let the component keep its own.
  ::
  ::component-prop{name="expandedFlex" type="number" default="4"}
  Flex grow value applied to the active panel.
  ::
  ::component-prop{name="collapsedFlex" type="number" default="1"}
  Flex grow value applied to the rest.
  ::
  ::component-prop{name="showLabelsWhenCollapsed" type="boolean" default="true"}
  Keep the title on a collapsed panel, rotated ninety degrees on horizontal
  layouts.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the group wrapper, which already sets a fixed height and
  `flex`.
  ::
::

## Events

::component-events
  ::component-event{name="update:activeIndex" type="(index: number) => void"}
  Fired when a panel is activated by hover, click or keyboard. Use it with
  `activeIndex` for controlled usage.
  ::
::

## Accessibility

- The wrapper is a `role="group"` with a label, and each panel is a real
  `<button>` with `aria-pressed`, so the set reads as a group of toggles rather
  than a list of images.
- Arrow keys follow the orientation: Left and Right on a row, Up and Down on a
  column. The handler moves focus to the newly active panel, so the keyboard
  never leaves the group.
- Focus also activates a panel. That keeps the keyboard and pointer paths
  identical and means the description is never visible without its panel being
  active.
- Titles are always rendered as text, including when the panel is collapsed, so
  a screen reader announces the panel without relying on the `alt`.
- The gradient scrim over each image is `aria-hidden`, and the image falls back
  to the title when no `alt` is given.
- Under `prefers-reduced-motion` the flex spring becomes a zero-duration
  transition and the label rotation is dropped; the active panel still grows.

## Performance

- Only `flexGrow` and the label's `opacity` and `rotate` animate. There is no
  width measurement, no resize observer and no layout read per frame.
- Images are plain `<img>` elements with `draggable="false"`; the panels never
  re-render on pointer movement because activation only writes an index.
- The hover check is a single `(hover: hover) and (pointer: fine)` media query,
  so touch devices use click instead of receiving a stream of hover events.
- Nothing animates while a panel is at rest, including the scrim and the label
  wrapper.
