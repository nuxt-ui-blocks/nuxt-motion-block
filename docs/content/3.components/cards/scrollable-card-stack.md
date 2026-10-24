---
title: Scrollable Card Stack
description: A profile deck that moves one card per wheel, swipe or arrow key, with the cards behind it receding into depth.
---

A stack you move through rather than a row you scan. The active card sits flat;
each card behind it lifts, shrinks and blurs, so the deck reads as depth. One
wheel notch, one swipe or one arrow key advances exactly one card, and a short
lockout keeps a trackpad flick from skipping three at once.

The stack is a self-contained widget. It owns the active index, so there is no
controlled state to wire up: pass a list of profiles and the component handles
the gesture, the dots and the announcement.

## Usage

Each item needs a stable `id`, a cover `image` and the profile fields for the
footer. The cover takes whatever height is left after the footer, so a wide
image crops rather than stretches.

::code-preview
---
label: Preview
---
  :::div{class="flex w-full justify-center"}
    <component-example name="scrollable-card-stack-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center">
    <MScrollableCardStack :items="people" />
  </div>
</template>

<script setup lang="ts">
const people = [
  {
    id: 'ana',
    name: 'Ana Ruiz',
    handle: '@anaruiz',
    href: 'https://example.com/people/ana-ruiz',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop',
    imageAlt: 'A studio desk with a notebook and a warm lamp',
  },
  {
    id: 'ben',
    name: 'Ben Osei',
    handle: '@bosei',
    href: 'https://example.com/people/ben-osei',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
    imageAlt: 'A speaker on stage in front of a full auditorium',
  },
  {
    id: 'cleo',
    name: 'Cleo Park',
    handle: '@cleopark',
    href: 'https://example.com/people/cleo-park',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    imageAlt: 'A long communal table in a bright restaurant',
  },
  {
    id: 'dmitri',
    name: 'Dmitri Ilves',
    handle: '@dmitri',
    href: 'https://example.com/people/dmitri-ilves',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    imageAlt: 'A dark editor window filled with code',
  },
  {
    id: 'elin',
    name: 'Elin Haugen',
    handle: '@elin',
    href: 'https://example.com/people/elin-haugen',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=500&fit=crop',
    imageAlt: 'Mist drifting through a stand of tall pine trees',
  },
]
</script>
```
::

The footer link is the card's only action. It opens the profile in a new tab and
carries an accessible name that says so.

## Customize

Lower `cardHeight` for a denser deck, raise `perspective` for a flatter stack, or
slow `transitionDuration` for a more deliberate move. All three are live in the
playground.

::code-preview
---
label: Preview
---
  :::div{class="flex w-full justify-center"}
    <component-example name="scrollable-card-stack-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4">
    <MScrollableCardStack
      :items="people"
      :card-height="320"
      :perspective="1400"
      :transition-duration="260"
    />

    <p class="max-w-sm text-center text-xs text-muted">
      A shallower card, a deeper perspective and a slower transform. Scroll,
      swipe or use the arrow keys to move through the stack.
    </p>
  </div>
</template>

<script setup lang="ts">
const people = [
  {
    id: 'mira',
    name: 'Mira Sol',
    handle: '@mirasol',
    href: 'https://example.com/people/mira-sol',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    imageAlt: 'A laptop showing a brightly lit analytics dashboard',
  },
  {
    id: 'tomas',
    name: 'Tomás Vega',
    handle: '@tomasvega',
    href: 'https://example.com/people/tomas-vega',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=500&fit=crop',
    imageAlt: 'A sculpture gallery with tall white walls',
  },
  {
    id: 'ines',
    name: 'Inês Duarte',
    handle: '@inesduarte',
    href: 'https://example.com/people/ines-duarte',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=500&fit=crop',
    imageAlt: 'A quiet reading room with books and soft daylight',
  },
  {
    id: 'noor',
    name: 'Noor Haddad',
    handle: '@noorhaddad',
    href: 'https://example.com/people/noor-haddad',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=500&fit=crop',
    imageAlt: 'A plant-filled office with a long shared desk',
  },
]
</script>
```
::

## Props

::component-props
  ::component-prop{name="items" type="ScrollableCardItem[]" required}
  Profiles in stack order, front card first. Every item needs a unique `id`,
  plus `name`, `handle`, `href`, `avatar` and `image`. `imageAlt` overrides the
  generated cover description.
  ::
  ::component-prop{name="cardHeight" type="number" default="384"}
  Height of each card in pixels. The cover flexes to fill the space above the
  footer.
  ::
  ::component-prop{name="perspective" type="number" default="1000"}
  CSS perspective applied to the stack container, in pixels. Larger values
  flatten the depth of the receding cards.
  ::
  ::component-prop{name="transitionDuration" type="number" default="180"}
  Transform time in milliseconds. The same value plus a short buffer is used as
  the gesture lockout, so a wheel flick cannot skip cards.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the outer section. The card itself keeps its fixed width and
  the height you set through `cardHeight`.
  ::
::

## Accessibility

- The stack is a focusable `role="application"` labelled "Scrollable card stack"
  and described by the keyboard instructions, so the interaction is announced
  before it is used.
- <kbd>Arrow Up</kbd> and <kbd>Arrow Left</kbd> move back one card;
  <kbd>Arrow Down</kbd> and <kbd>Arrow Right</kbd> move forward.
  <kbd>Home</kbd> and <kbd>End</kbd> jump to the first and last card.
- The dots are buttons with `aria-current`, not a tab list: they select a card
  directly and stay reachable with <kbd>Tab</kbd>.
- Only the active card is in the accessibility tree. The cards behind it are
  `aria-hidden` and `inert`, so their cover images and profile links cannot be
  focused while they are covered.
- A visually hidden live region announces the selected card after every move.
  The wheel is only captured while the stack can still move in that direction;
  at either end the page scrolls normally.
- Links open in a new tab and their accessible names include "opens in a new
  tab". Under `prefers-reduced-motion: reduce`, the scale, offset and blur are
  removed along with the transitions; navigation still works.

## Performance

- The stack is moved with CSS `transform`, `opacity` and `filter` on the
  compositor. There is no animation frame loop and no render per wheel tick.
- `will-change` is limited to `transform`, `opacity` and `filter`, and is reset
  under reduced motion. Cards are not remounted as the index changes.
- One timeout drives the lockout. It is cleared before a new move and on
  unmount, so a rapid sequence cannot leave the stack stuck in its moving state.
- Cover images use `decoding="async"`; avatars are lazy. The component reads no
  layout during render and makes no network requests of its own.
