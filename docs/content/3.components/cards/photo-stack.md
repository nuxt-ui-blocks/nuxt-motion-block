---
title: Photo Stack
description: A draggable deck of photo cards. Drag or tap the top card to send it to the back and reveal the next.
---

A stack of photos drawn as physical cards: the front one is full size, the two
behind it step back and down and are dimmed by a white veil. Dragging the front
card in either direction throws it to the back of the deck; releasing or tapping
cycles the order with a spring.

The deck is a list of photos rather than a carousel. There is no index to keep in
sync, no autoplay and no transition between slides: each card simply animates to
the position its order implies, so a cycle moves every card at once and the
front card is always the first item in the order.

## Usage

Pass `photos` and the first item starts on top. Each photo needs an `id`, a
`src` and an `alt`; `name` and `role` add the caption over the front card. Listen
to `cycle` for the new order after every throw.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="photo-stack-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-6">
    <MPhotoStack :photos="photos" />
  </div>
</template>

<script setup lang="ts">
const photos = [
  {
    id: 'mara',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=520&fit=crop',
    alt: 'Mara Okonkwo',
    name: 'Mara Okonkwo',
    role: 'Design engineer',
  },
  {
    id: 'noa',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=520&fit=crop',
    alt: 'Noa Bergström',
    name: 'Noa Bergström',
    role: 'Frontend lead',
  },
  {
    id: 'ines',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=520&fit=crop',
    alt: 'Ines Duarte',
    name: 'Ines Duarte',
    role: 'Solo founder',
  },
]
</script>
```

::

Drag the top card or press Enter on it. A drag of any distance releases to the
next card, so the gesture does not need to clear a threshold; the spring and the
stacked offsets carry the sense of depth instead.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="photo-stack-custom" />
  :::
#code
  <PlaygroundCode name="PhotoStack" />
::

The deck is deliberately headless of any image source: swap `photos` for your
own objects and the component re-keys by `id`. Captions are optional and only
shown on the front card, so the back cards stay quiet while they wait.

## Props

::component-props
  ::component-prop{name="photos" type="PhotoStackPhoto[]" required}
  Cards to stack. The first item starts on top. Each entry needs `id`, `src` and
  `alt`; `name` and `role` enable the caption.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the stack wrapper. The component already sets `relative`,
  `h-72` and `w-56`, so override the size here if needed.
  ::
::

## Events

::component-events
  ::component-event{name="cycle" type="(order: string[]) => void"}
  Fired after the top card is sent to the back, with the new id order. The array
  contains every photo id, front first.
  ::
::

## Accessibility

- The front card is a `role="button"` with `tabindex="0"`; Enter and Space cycle
  the deck. Back cards are removed from the tab order and marked `aria-hidden`,
  so they are not announced or focusable.
- The front card's accessible name is the photo's `name` (or `alt`) followed by
  "next", which tells a screen reader what activating it does.
- A polite live region announces the photo that moved to the top, so the state
  change is not silent after a keyboard cycle.
- The dimming veil on the back cards is `aria-hidden`. Captions are hidden with
  `opacity` but stay in the accessibility tree only on the front card.
- Under `prefers-reduced-motion` dragging is disabled and the spring is replaced
  by a zero-duration transition. Tapping and the keyboard still cycle the deck,
  so the component keeps its function without the motion.

## Performance

- Cards animate only `x`, `y`, `scale` and `rotate`, all compositor-friendly
  properties. There is no layout animation and no measured height.
- The deck is a single `v-for` over an index array; cycling rotates that array
  and Vue reuses the keyed cards instead of recreating the images.
- No pointer tracking runs while the deck rests. The drag gesture is handed to
  Motion's own pointer handling and only becomes active on the front card.
- Images are plain `<img>` elements with `draggable="false"`, so the browser's
  native image drag cannot compete with the card gesture.
