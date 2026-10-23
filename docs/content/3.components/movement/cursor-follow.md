---
title: Cursor Follow
description: A custom cursor bubble that grows into a label when it passes over anything marked with data-cursor-text.
---

A cursor replacement for a contained surface: a small dot trails the pointer on a
spring, and when the pointer enters an element with `data-cursor-text` the dot
morphs into a pill showing that label. Focus does the same, so the labels are
reachable without a mouse.

The label is measured before it is shown, not during the animation. A hidden
span renders the pending text at the same font size and padding; its width
becomes the target width of the pill, so the morph has a real destination
instead of growing frame by frame.

## Usage

Wrap any content in `MCursorFollow` and mark the elements that should have a
label. The attribute value is the text that appears in the bubble.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="cursor-follow-basic" />
  :::
#code
```vue
<template>
  <div class="w-full">
    <MCursorFollow class="rounded-2xl border border-default">
      <div class="flex min-h-[320px] flex-wrap items-center justify-center gap-4 p-10">
        <button
          v-for="tile in tiles"
          :key="tile.label"
          :data-cursor-text="tile.label"
          class="rounded-xl border border-default bg-elevated px-6 py-4 text-sm font-medium text-highlighted transition-colors hover:bg-muted"
          type="button"
        >
          {{ tile.title }}
        </button>
      </div>
    </MCursorFollow>
  </div>
</template>

<script setup lang="ts">
const tiles = [
  { label: 'Open', title: 'Open project' },
  { label: 'Duplicate', title: 'Duplicate' },
  { label: 'Archive', title: 'Archive' },
  { label: 'Delete', title: 'Delete' },
]
</script>
```

::

The surface hides the native cursor with `cursor: none` and gives itself a
minimum height, so the effect is never invisible on an empty section.

## Customize

`data-cursor-text` is plain data, so the same surface can label links, swatches
or an illustration. Anything without the attribute clears the bubble.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="cursor-follow-custom" />
  :::
#code
```vue
<template>
  <div class="w-full">
    <MCursorFollow class="rounded-2xl border border-default bg-elevated/40">
      <div class="flex min-h-[320px] items-center justify-center p-10">
        <div class="grid max-w-md grid-cols-4 gap-3">
          <div
            v-for="swatch in swatches"
            :key="swatch.label"
            :data-cursor-text="swatch.label"
            class="aspect-square rounded-xl border border-default"
            :style="{ backgroundColor: swatch.color }"
          />
          <a
            class="col-span-4 mt-2 text-center text-sm font-medium text-primary underline-offset-4 hover:underline"
            data-cursor-text="Read the guide"
            href="https://nuxt.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the guide
          </a>
        </div>
      </div>
    </MCursorFollow>
  </div>
</template>

<script setup lang="ts">
const swatches = [
  { label: 'Copy hex', color: '#6366f1' },
  { label: 'Copy hex', color: '#0ea5e9' },
  { label: 'Copy hex', color: '#14b8a6' },
  { label: 'Copy hex', color: '#84cc16' },
  { label: 'Copy hex', color: '#f59e0b' },
  { label: 'Copy hex', color: '#ef4444' },
  { label: 'Copy hex', color: '#ec4899' },
  { label: 'Copy hex', color: '#8b5cf6' },
]
</script>
```

::

Style the surface, not the bubble, when you need a different shape: the bubble
takes its colour from the primary token so it matches the rest of the theme.

## Props

::component-props
  ::component-prop{name="class" type="string"}
  Extra classes for the tracking surface. The component already sets `relative`,
  `h-full`, `w-full` and `cursor-none`.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The content inside the surface. Mark any element with `data-cursor-text` to
  give it a bubble label.
  ::
::

## Accessibility

- The surface is focusable and listens to `focusin`/`focusout`, so the same
  labels appear as a keyboard user moves through the controls.
- The bubble is `aria-hidden` and `pointer-events-none`. It repeats the control's
  own label instead of replacing it, so nothing is announced twice and the
  original control remains the accessible target.
- `cursor: none` is applied only on the surface, and the bubble sits at
  `z-50`; the rest of the page keeps its normal cursor.
- The text is measured from a hidden span that uses the same font, weight and
  horizontal padding as the pill, so a long label never clips after the morph.
- Under `prefers-reduced-motion` the spring is bypassed entirely: the bubble
  jumps to the pointer and the size and opacity changes complete in zero time.

## Performance

- A single `mousemove` listener on `window` writes two Motion values. There is no
  reactive state per move, so Vue does not re-render on pointer movement.
- The spring runs on Motion's own loop, not on a component watcher, and stops
  when the values settle.
- The hidden measuring span only exists while a label is pending or showing, and
  its width is read once per label rather than on every frame.
- The bubble animates width, height, padding and `scale`; the position comes from
  `x`/`y` transforms, which stay on the compositor while the pointer moves.
