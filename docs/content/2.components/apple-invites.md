---
title: Apple Invites
description: A stacked carousel of Apple-style invite cards that auto-advances with 3D-like slide transitions.
navigation:
  icon: i-lucide-mail
---

# Apple Invites

Apple Invites renders a small stack of overlapping cards that cycle through a list of events. At any time it shows up to three slots (left, center, right) with scaled/rotated transforms for the side cards and a blur-masked gradient underlay for depth. It auto-advances at `interval` ms (when mounted client-side), can be controlled via `activeIndex`, and emits `update:activeIndex` when the internal page changes. Responsive card sizing is supported via `cardWidth`/`cardHeight`/`aspectRatio`. Ported from smoothui's apple-invites.

## Usage

Pass an array of `events`. Each event needs an `id` and at least `location`; `title`, `subtitle`, `badge`, `image` or `backgroundClassName`, and `participants` (array of `{ avatar }`) are optional. The carousel tracks its own page when `activeIndex` is undefined.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="apple-invites-basic" />
  :::
#code
```vue
<template>
  <div class="h-64 w-full max-w-sm">
    <MAppleInvites
      :events="events"
      :interval="2500"
    />
  </div>
</template>

<script setup lang="ts">
const events = [
  {
    id: 1,
    title: 'Product Launch',
    subtitle: 'Announcing our latest release',
    location: 'Online',
    badge: 'Invite',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop'
  },
  {
    id: 2,
    title: 'Design Meetup',
    subtitle: 'Share ideas with the community',
    location: 'San Francisco, CA',
    badge: 'Group',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
    participants: [
      { avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }
    ]
  },
  {
    id: 3,
    title: 'Team Dinner',
    subtitle: 'Celebrating a great quarter',
    location: 'New York, NY',
    badge: 'Social',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    participants: [
      { avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
    ]
  }
]
</script>
```
::

## Props

::field-group
  ::field{name="events" type="Event[]" required}
  Invitation cards to cycle through. Each `Event` has `id` (number), `location` (string), optional `title`, `subtitle`, `badge`, `image`, `backgroundClassName`, `participants: { avatar: string }[]`.
  ::
  ::field{name="activeIndex" type="number" default="undefined"}
  Controlled active card. When undefined, the component tracks `internalPage` and auto-advances.
  ::
  ::field{name="interval" type="number" default="3000"}
  Milliseconds between automatic advances. Set to `<= 0` to disable auto-advance. Timer runs only in the browser (`import.meta.client`).
  ::
  ::field{name="cardWidth" type="number | string | ResponsiveSize" default="240"}
  Card width. Pass `ResponsiveSize` to scale by viewport breakpoints (`sm/md/lg/xl/2xl/base`).
  ::
  ::field{name="cardHeight" type="number | string | ResponsiveSize" default="undefined"}
  Explicit card height. Falls back to `cardWidth / aspectRatio` when undefined.
  ::
  ::field{name="aspectRatio" type="number" default="1.5625"}
  Used when `cardHeight` omitted: `height = width * aspectRatio` (5:8 ratio by default).
  ::
  ::field{name="cardClassName" type="string" default="undefined"}
  Merged onto each card wrapper.
  ::
  ::field{name="class" type="string" default="undefined"}
  Merged onto the outer centering wrapper.
  ::
::

## Events

::field-group
  ::field{name="update:activeIndex" type="(index: number) => void"}
  Emitted when the internal page changes (auto-advance or programmatic next) while not controlled. The payload is the wrapped index.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  No default slot is used by the component; content is rendered from `events` data.
  ::
::

## Accessibility

All three visible cards are absolutely positioned `motion.div` elements with no `role` or `aria-label` describing their state; decorative blur layers use `aria-hidden` not set but are non-interactive. Images use `alt` text (title or generic "Participant N"). The carousel advances automatically with no pause-on-hover/focus behavior declared. No keyboard controls are exposed. `useReducedMotion` is respected for transitions (swaps to zero-duration or reduced transitions), but focus management and ARIA live region for slide changes are not implemented. Consumers should provide their own controls/announcements if needed.

## Performance

- Uses `AnimatePresence` with `custom="direction"` and `variants` for `center/left/right/hidden`. Side cards are scaled down (`0.9`) and rotated (±12°) with `z-index` layering.
- Responsive sizing computes `metrics` (font sizes, padding, avatar sizes, badge position) from resolved card width; initial size uses `base` or first available value, client-only re-resolves on viewport width.
- Auto-advance uses `setInterval` (only `import.meta.client`, restarted on page/interval/events change). Clears timer on unmount.
- Blurred underlay uses five stacked layers (`BLUR_LAYERS = [1,2,3,6,12]`) with `backdrop-filter`/`mask-image` for a gradient fade.
- When `prefers-reduced-motion`, transitions become near-zero duration (`REDUCED_TRANSITION`) and glass fade is shortened; variants still apply.
- For lists with < 3 events, the same event id may appear twice in `visibleEvents` (distinguished by `key = id + "-" + slot`) so Vue's keyed transitions don't collapse copies.

::tip
To keep the stack visually stable, ensure `events` has stable `id` values. If you need manual control, bind `v-model:activeIndex` (or `:activeIndex` + `@update:activeIndex`) and consider disabling `interval` by setting it to `0`.
::