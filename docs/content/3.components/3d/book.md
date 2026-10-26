---
title: Book
description: A 3D book cover built from CSS perspective transforms, with a spine, page block and a hover tilt.
---

A book cover drawn as a physical object: a front jacket, a printed spine, a block
of page edges on the right and a back cover sitting behind it. The depth comes
from CSS 3D transforms only — no canvas, no 3D library — so the whole thing is
three positioned `div`s inside a `perspective` container.

There are two jackets. `stripe` keeps a colour band across the top and leaves the
body of the cover on the page background, the classic technical-book look. `simple`
paints the entire cover in `color` and is meant for a single-tone jacket with a
light `text-color`.

Hovering or focusing the cover rotates it `-20deg` around the vertical axis and
lifts it slightly toward the reader. The rotation is a CSS transition, so it also
works before hydration.

## Usage

Give the book a `title` and, optionally, an `illustration` for the stripe area and
a `logo` for the bottom of the cover. `width` sets the whole object; every internal
measurement is relative to it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="book-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-wrap items-end justify-center gap-10 py-8">
    <MBook
      title="The Shape of Motion"
      color="#e5a00d"
      :width="196"
    >
      <template #illustration>
        <div class="flex h-full items-end justify-end p-3">
          <UIcon
            name="i-lucide-orbit"
            class="size-9 text-black/35"
          />
        </div>
      </template>
      <template #logo>
        <span class="text-[9px] font-semibold tracking-[0.2em] text-muted uppercase">
          Vol. 02 · 2026
        </span>
      </template>
    </MBook>

    <MBook
      title="Interaction Design"
      variant="simple"
      color="#2f4a6d"
      text-color="#eef2f7"
      :width="168"
    >
      <template #logo>
        <span class="text-[9px] font-medium tracking-[0.2em] text-white/60 uppercase">
          Field notes
        </span>
      </template>
    </MBook>
  </div>
</template>
```
::

The cover is focusable, and focusing it performs the same tilt as hovering. That
keeps the 3D preview reachable without a pointer; it is not a button and has no
activation action.

## Customize

`variant` swaps the jacket, `color` is the accent, and `width` scales the cover
while the title reflows in container-query units. `text-color` is only needed when
the default highlighted text does not have enough contrast on your colour.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="book-custom" />
  :::
#code
  <PlaygroundCode name="Book" />
::

## Props

::component-props
  ::component-prop{name="title" type="string" required}
  The text on the cover. It is set in container-query units, so it stays in
  proportion when `width` changes.
  ::
  ::component-prop{name="variant" type="'stripe' | 'simple'" default="'stripe'"}
  `stripe` renders a colour band above a page-coloured body; `simple` paints the
  whole jacket in `color`.
  ::
  ::component-prop{name="color" type="string" default="'#e5a00d'"}
  Accent colour, as any CSS colour. It fills the stripe in `stripe` mode and the
  entire front and back cover in `simple` mode.
  ::
  ::component-prop{name="textColor" type="string"}
  Title colour override. Defaults to `var(--ui-text-highlighted)` when omitted.
  ::
  ::component-prop{name="width" type="number" default="196"}
  Cover width in pixels. Height follows the `49 / 60` ratio and the depth is
  calculated from the width, so the proportions hold at any size.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root wrapper, which is `inline-block w-fit` and carries the
  perspective.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="illustration"}
  Content for the coloured stripe area in the `stripe` variant. It does not render
  in `simple` mode.
  ::
  ::component-slot-row{name="logo"}
  Mark or small text pinned to the bottom of the cover. Rendered in both variants.
  ::
::

## Accessibility

The root is a labelled `role="img"` with `tabindex="0"`, so a keyboard user can
reach the cover and trigger the same tilt as a pointer user through
`group-focus-visible`. The visible title is the accessible name, which also means
the duplicate text inside the cover is not announced twice. The page edges, back
cover, spine gradients and border overlay are all `aria-hidden="true"`.

Because the root is an image, content inside `illustration` and `logo` is
presentational. Keep links and buttons out of those slots; put them next to the
book instead.

`prefers-reduced-motion` removes the transition and both transform states: the
book renders upright, still focusable, with the focus ring but without the tilt.

## Performance

- Every layer is a `div` with a background, a border radius and one transform. The
  depth is a single `translateZ`, and the page block is one rotated rectangle.
- The hover and focus tilt is a CSS transition on `transform`, so it composites and
  never enters Vue's render loop.
- The title uses `cqw` units inside a container-query context, which means changing
  `width` reflows text without any resize listener or measurement pass.
- Nothing animates while the book is at rest; there is no `requestAnimationFrame`
  loop and no pointer tracking.
