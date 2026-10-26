---
title: Cursor Image Trail
description: Photos that drop in behind the pointer as it travels across a surface.
---

A pointer-driven gallery: every time the pointer has moved far enough, the next
image in the list is spawned at its position, rotated a little and scaled by how
fast the pointer was moving. Each one fades in, holds, then shrinks away, so a
short gesture leaves a trail of frames rather than a single follower.

The pool is fixed. A handful of `<img>` nodes are created once and reused; a spawn
only swaps `src` and writes a transform, so dragging across a large surface never
allocates new elements.

## Usage

Pass the images and wrap the surface that should catch the pointer. The component
keeps its own children, so it works as a section background as well as a card.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="cursor-image-trail-basic" />
  :::
#code
```vue
<template>
  <div class="w-full">
    <MCursorImageTrail
      :images="images"
      class="rounded-2xl border border-default bg-elevated/40"
    >
      <div class="flex min-h-[320px] items-center justify-center p-10">
        <div class="max-w-sm text-center">
          <UIcon
            class="mx-auto size-8 text-primary"
            name="i-lucide-mouse-pointer-2"
          />
          <p class="mt-4 text-lg font-medium text-highlighted">
            Move the pointer across this panel
          </p>
          <p class="mt-2 text-sm text-muted">
            A new portrait drops into the trail every 90 pixels of travel.
          </p>
        </div>
      </div>
    </MCursorImageTrail>
  </div>
</template>

<script setup lang="ts">
const images = [
  { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Ana Ruiz' },
  { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Ben Osei' },
  { src: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Cleo Park' },
  { src: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Dmitri Ilves' },
  { src: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Elin Haugen' },
  { src: 'https://randomuser.me/api/portraits/men/11.jpg', alt: 'Farid Nazari' },
]
</script>
```

::

The effect only starts on a device with a fine pointer that can hover. On a
touch screen the surface renders as ordinary content, because there is no
pointer to follow.

## Customize

`distance` controls how much travel is needed before the next frame spawns, and
`lifetime` controls how long it stays. Lower both for a dense, snappy trail;
raise them for a sparse, slow one. `imageSize`, `rotate` and `velocityScale` shape
each frame, while `poolSize` caps how many can be alive at once.

The frame itself is a theme slot, so a different silhouette is a class override
rather than a new prop.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="cursor-image-trail-custom" />
  :::
#code
```vue
<template>
  <div class="w-full">
    <MCursorImageTrail
      :distance="48"
      :image-size="64"
      :images="images"
      :lifetime="520"
      :pool-size="8"
      :rotate="26"
      :velocity-scale="0.9"
      class="rounded-2xl border border-default bg-inverted"
      :ui="{ image: 'rounded-full ring-2 ring-primary/60' }"
    >
      <div class="flex min-h-[320px] items-center justify-center p-10">
        <p class="max-w-xs text-center text-sm text-inverted/60">
          Smaller frames, a shorter distance and a stronger speed response make
          the trail feel faster and denser.
        </p>
      </div>
    </MCursorImageTrail>
  </div>
</template>

<script setup lang="ts">
const images = [
  { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Ana Ruiz' },
  { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Ben Osei' },
  { src: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Cleo Park' },
  { src: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Dmitri Ilves' },
  { src: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Elin Haugen' },
  { src: 'https://randomuser.me/api/portraits/men/11.jpg', alt: 'Farid Nazari' },
]
</script>
```

::

## Props

::component-props
  ::component-prop{name="images" type="array" required}
  Images cycled through as the pointer moves. Each entry needs a `src` and an
  `alt`.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the tracking surface.
  ::
  ::component-prop{name="distance" type="number" default="90"}
  Pointer travel, in pixels, between two spawned images.
  ::
  ::component-prop{name="imageSize" type="number" default="96"}
  Width and height of each trailing image, in pixels.
  ::
  ::component-prop{name="lifetime" type="number" default="700"}
  Base lifetime of a spawned image, in milliseconds.
  ::
  ::component-prop{name="poolSize" type="number" default="12"}
  How many images can be on screen at once.
  ::
  ::component-prop{name="rotate" type="number" default="12"}
  Maximum random rotation applied to a spawned image, in degrees.
  ::
  ::component-prop{name="velocityScale" type="number" default="0.5"}
  How strongly pointer speed scales the image size.
  ::
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The content the pointer travels across.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.cursorImageTrail` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative overflow-hidden`
  ::
  ::component-slot-row{name="pool"}
  `pointer-events-none absolute inset-0 select-none`
  ::
  ::component-slot-row{name="image"}
  `absolute top-0 left-0 rounded-xl object-cover opacity-0 shadow-lg will-change-transform`
  ::
::

## Accessibility

- The trail is decoration. The pool is `aria-hidden` and `pointer-events-none`,
  every frame is rendered with an empty `alt`, and the surface's own content stays
  the accessible target.
- Nothing is keyboard-triggered, because there is nothing to reach: the effect
  never carries information that the surrounding text does not already provide.
- Under `prefers-reduced-motion: reduce` the pointer listeners and the animation
  loop are never attached. The frames stay at zero opacity, so the surface looks
  exactly like its children.
- Devices without a fine pointer skip the effect for the same reason: there is no
  cursor to trail.

## Performance

- One `requestAnimationFrame` loop drives every frame. It is cancelled on unmount
  and whenever the effect turns off.
- The container rect is read once per pointer move, never inside the loop, so the
  animation cannot force a layout pass.
- Frames are written straight to `style.transform` and `style.opacity`; no
  reactive state changes per frame, so Vue does not re-render while the pointer
  moves.
- The `<img>` nodes are created once per pool size and reused. A spawn only swaps
  `src`, `alt` and the transform, so there is no element churn.
- `will-change-transform` is scoped to the pool frames, so the compositor hint is
  not spread across the page.
