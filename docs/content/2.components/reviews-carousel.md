---
title: Reviews Carousel
description: A snap-scrolling review strip that drifts forward on its own and holds still while hovered.
navigation:
  icon: i-lucide-message-square-quote
---

# Reviews Carousel

A horizontal strip of review cards. It scrolls ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â by trackpad, by drag, by the two
arrows, or on its own ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â with each card snapping to the start of the container as
it lands. Cards animate in once on mount, staggered by their position in the list.

It is a native scroll container, not a scripted carousel. That is the whole
design: the browser already handles momentum, snapping and touch inertia, and the
component's job is to move the scroll position and to step out of the way. Cards
are a fixed `w-80` with `snap-start`, so the strip lines up on card boundaries
rather than on whatever fraction of a pixel the scroll happened to land on.

Auto-advance steps one card every four seconds and wraps to the start at the
end, so it cycles forever. Hovering pauses it.

## Usage

Pass `reviews`, each with an `author`, a numeric `rating` out of five and the
body `content`; `avatar` is optional. Card width is fixed at `w-80` inside the
component ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â size it with `class` on the wrapper rather than trying to pass a card
width.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="reviews-carousel-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <MReviewsCarousel :reviews="reviews" />

    <p class="text-center text-xs text-muted">
      Hover the strip to hold the auto-advance, or drag it and use the arrows
    </p>
  </div>
</template>

<script setup lang="ts">
const reviews = [
  {
    author: 'Amara Osei',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'We replaced three tools with this one. The onboarding alone paid for the migration in the first month.',
  },
  {
    author: 'Tomas Lindqvist',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'The transitions are the part nobody asked for and everybody mentions. Nothing feels sluggish, even on a laptop.',
  },
  {
    author: 'Priya Raman',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'Docs are honest about the limits, which is rare. Took an afternoon to get a production feel out of it.',
  },
  {
    author: 'Diego Ferreiro',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    content: 'Support answered inside the hour with an actual patch, not a workaround. We have not looked back.',
  },
]
</script>
```
::

## Props

::field-group
  ::field{name="reviews" type="Review[]"}
  The reviews to render. Each needs `author`, `rating` and `content`; `avatar` is
  optional and the row falls back to text-only when it is absent.
  ::
  ::field{name="class" type="string"}
  Declared but not wired: the component sets `inheritAttrs: false` and does not
  read `class` anywhere, so this prop has no effect.
  ::
  ::field{name="ui" type="CardProps['ui']"}
  Declared but not wired ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the inner `UCard` is rendered without a `ui` override,
  so this prop has no effect.
  ::
::

## Accessibility

The component adds no ARIA of its own. The scroll container is a plain div with
`overflow-x-auto`, the scrollbar is hidden with both the modern
`scrollbar-width` and the legacy `-ms-overflow-style` properties, and the two
arrows are `<button>` elements with no accessible name ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â an icon-only button
announces as "button" and nothing else. If you need the arrows labelled, that is
a change to the component rather than something you can pass in.

Snapping uses `snap-mandatory`, so a keyboard user tabbing to the arrows and
pressing one lands on a card boundary every time.

There is no `prefers-reduced-motion` handling. Cards animate in with a spring
(staggered 100ms apart) on mount, and the auto-advance scrolls smoothly on a
timer, regardless of the user's motion preference.

The star row is five inline SVGs coloured by `star <= review.rating` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â a visual
rating only. The rating is not exposed as text, so a screen reader gets the
review body with no indication of how it was scored.

## Performance

- One `setInterval` at 4000ms, cleared on unmount. It reads a ref to decide
  whether to step, and bails before touching the DOM when paused.
- Cards animate in once on mount with a per-index delay; there is no scroll or
  intersection listener, so scrolling does no component work at all.
- Motion is `scrollBy` / `scrollTo` with `behavior: 'smooth'` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the compositor
  does the moving, and Vue never re-renders to scroll.
- Auto-advance detects the end by comparing `scrollLeft + clientWidth` to
  `scrollWidth` with a 10px tolerance, then wraps to zero.
- The container's fixed `w-80` card width is what both the arrow step distance
  (320px) and the wrap detection are calibrated to.

::tip
Hovering pauses the auto-advance but not the entrance animation ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the mount
spring runs regardless. If the strip feels busy on a page that also wants the
reader's attention, render it below the fold; nothing here reacts to viewport
position.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.reviewsCarousel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `scroller` | `flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide` |
| `card` | `snap-start shrink-0 w-80` |
| `cardHeader` | `flex items-center gap-3 mb-3` |
| `avatar` | `w-10 h-10 rounded-full object-cover` |
| `authorInfo` |  |
| `authorName` | `font-semibold text-highlighted` |
| `stars` | `flex gap-0.5` |
| `star` | `w-4 h-4` |
| `content` | `text-sm text-muted leading-relaxed` |
| `prevButton` | `absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-8 h-8 rounded-full bg-default border border-default shadow-md flex items-center justify-center hover:bg-muted transition-colors` |
| `nextButton` | `absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-8 h-8 rounded-full bg-default border border-default shadow-md flex items-center justify-center hover:bg-muted transition-colors` |
| `chevron` | `w-4 h-4 text-inverted` |
