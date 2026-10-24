---
title: Hover Image List
description: A list of links that reveals a preview image next to the pointer, with a slight skew driven by pointer speed.
---

A link list where each row owns an image that only appears while the row is
active. By default the preview follows the pointer with a spring and leans into
the direction of travel; the row itself stays plain text.

The preview is decorative. It is `aria-hidden`, it is never focusable, and the
row's meaning lives in its title, its optional meta line and its real link. That
is also why the list works on touch: there is no hover, so the preview is pinned
to the right edge and focus handles the rest.

## Usage

Rows with an `href` render as links, rows without one render as buttons. The
`alt` is used by the preview image even though the image is hidden from
assistive technology, which keeps the markup valid.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="hover-image-list-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-4">
    <MHoverImageList :items="items" class="max-w-xl" />
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    id: 'nuxt',
    title: 'Nuxt',
    meta: 'The full-stack Vue framework',
    href: 'https://nuxt.com',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop',
    alt: 'Code on a dark screen',
  },
  {
    id: 'motion',
    title: 'Motion for Vue',
    meta: 'A production-ready animation library',
    href: 'https://motion.dev',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop',
    alt: 'Retro computer hardware',
  },
  {
    id: 'nuxt-ui',
    title: 'Nuxt UI',
    meta: 'A UI library for Nuxt applications',
    href: 'https://ui.nuxt.com',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=600&fit=crop',
    alt: 'A designer working on an interface',
  },
  {
    id: 'docus',
    title: 'Docus',
    meta: 'Documentation that writes itself',
    href: 'https://docus.dev',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=600&fit=crop',
    alt: 'An open notebook and pen',
  },
]
</script>
```

::

The first pointer move sets the position; moving between rows crossfades the
image with a short scale. Leaving the list clears both.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="hover-image-list-custom" />
  :::
#code
  <PlaygroundCode name="HoverImageList" />
::

`revealMode="fixed"` pins the preview to the right edge instead of following the
pointer, which is the better choice for long lists near the page edge.
`:follow="false"` keeps the pointer position but drops the spring, and
`imageSize` changes the square edge.

## Props

::component-props
  ::component-prop{name="items" type="HoverImageListItem[]" required}
  Rows to render. Each entry needs `id`, `title`, `image` and `alt`; `href` turns
  the row into a link and `meta` adds a second line.
  ::
  ::component-prop{name="revealMode" type="'cursor' | 'fixed'" default="'cursor'"}
  Follow the pointer or pin the preview to the right edge. Touch devices and
  keyboard focus always use the fixed position.
  ::
  ::component-prop{name="follow" type="boolean" default="true"}
  Let the preview spring toward the pointer. When `false` it jumps to the new
  position.
  ::
  ::component-prop{name="imageSize" type="number" default="240"}
  Edge length of the preview in pixels.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the list wrapper, which is already `relative`.
  ::
::

## Accessibility

- Rows are real `<a>` or `<button>` elements, in a `<ul>` with one `<li>` each,
  so the list keeps its semantics and its place in the tab order.
- The preview lives in an `aria-hidden` wrapper and has `pointer-events-none`, so
  it never intercepts the pointer and is never announced as content.
- Keyboard focus activates the preview but switches it to the fixed position,
  which keeps the image out of the pointer's way and off the focused row.
- The arrow icon is `aria-hidden` and only fades in on hover or focus, so it
  never adds noise for a screen reader.
- The title colour shift on hover is accompanied by the arrow, so the hover state
  is not conveyed by colour alone.
- Under `prefers-reduced-motion` the preview stops following the pointer and
  becomes a plain fixed image with a zero-duration fade and no skew.

## Performance

- Pointer movement is coalesced into one `requestAnimationFrame` per frame, and
  only the latest position is read. The handler does not touch reactive state.
- The preview position and skew are Motion values, so following the pointer does
  not re-render the rows or the image element.
- The image is mounted only while a row is active and unmounted on leave, so a
  long list hosts one preview image at a time.
- The velocity used for the skew is clamped per frame and capped at 50ms, which
  prevents a tab switch from producing an enormous, one-off lean.
