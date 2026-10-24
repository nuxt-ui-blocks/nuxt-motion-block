---
title: Gooey Filter
description: An SVG goo filter that makes overlapping shapes melt into one another as they move.
---

A wrapper that merges its children into a single liquid silhouette. Under the
hood it is three SVG primitives: a Gaussian blur, a colour matrix that pushes
alpha past a threshold, and a composite that paints the original content back
over the result. Shapes that drift close enough share a neck before they touch.

The effect is a rendering trick, not a physics simulation. It only works on
opacity and edges, so it belongs on solid shapes and icons; applying it to body
text blurs the glyphs and makes them harder to read.

## Usage

Wrap the moving shapes and leave a little padding around them. The filter reads
`SourceGraphic`, so anything inside the wrapper contributes to the merge.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="gooey-filter-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-10">
    <MGooeyFilter
      class="flex items-center"
      :contrast="18"
      :strength="9"
    >
      <div class="flex -space-x-4">
        <button
          v-for="dot in dots"
          :key="dot.label"
          :aria-label="dot.label"
          class="size-16 rounded-full border-0 transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          :class="dot.color"
          type="button"
        />
      </div>
    </MGooeyFilter>
  </div>
</template>

<script setup lang="ts">
const dots = [
  { label: 'First blob', color: 'bg-primary' },
  { label: 'Second blob', color: 'bg-secondary' },
  { label: 'Third blob', color: 'bg-primary' },
  { label: 'Fourth blob', color: 'bg-secondary' },
]
</script>
```

::

Hover or focus a dot to pull it away from the group; the neck thins and snaps as
the gap opens.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="gooey-filter-custom" />
  :::
#code
  <PlaygroundCode name="GooeyFilter" />
::

`strength` is the blur radius, `contrast` is the alpha threshold, and `intensity`
sets both at once through a fixed 8:18 ratio. When you pass `strength` and
`intensity`, `strength` wins; when you pass only `intensity`, the contrast follows
it. `disabled` renders the wrapper without the SVG filter at all, which is the
cheapest way to switch the effect off at runtime.

## Props

::component-props
  ::component-prop{name="as" type="string | Component" default="'div'"}
  Wrapper element or component. The filter is applied to this node.
  ::
  ::component-prop{name="strength" type="number" default="8"}
  Blur radius in pixels used before the contrast pass.
  ::
  ::component-prop{name="contrast" type="number" default="18"}
  Alpha threshold. Higher values pull more of the blurred halo into the shape.
  ::
  ::component-prop{name="intensity" type="number"}
  Shorthand that derives both `strength` and `contrast` from one number.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Skip the filter and render the children untouched.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the wrapper.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The shapes to merge. They keep their own layout, events and semantics.
  ::
::

## Accessibility

- The SVG filter is `aria-hidden` and zero-sized, so it adds nothing to the
  accessibility tree or to layout.
- Filtering is purely visual: children keep their DOM order, their focus order
  and their own accessible names.
- The wrapper does not disable pointer events, so the shapes inside stay
  clickable even while the blur softens their edges.
- Because the filter changes appearance only, `disabled` is a safe fallback for
  users or devices where large filters are expensive.
- The demo buttons keep a focus-visible outline, so the gooey surface never
  replaces the keyboard indicator.

## Performance

- The filter is composited by the browser; no JavaScript runs per frame and the
  component has no animation loop of its own.
- Cost scales with the filtered area. Keep the wrapper tight around the shapes
  instead of wrapping a whole section.
- Animating transforms inside the wrapper is cheap; animating the filter's
  `strength` is not, because it re-rasterises the blur each time.
- `disabled` short-circuits before the SVG is rendered, so a page can switch the
  effect off without keeping the filter node around.
