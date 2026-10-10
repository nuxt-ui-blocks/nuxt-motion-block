---
title: Glow Hover Cards
description: A responsive grid of cards, each with a radial glow that follows the pointer inside it.
navigation:
  icon: i-lucide-layout-grid
---

# Glow Hover Cards

A responsive grid ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â one column, two from `sm`, three from `lg` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â of `UCard`s that each
track the pointer independently. Moving the cursor inside a card paints a 600px radial
gradient at that point, mixed from `glowColor` into the card's background; leaving
removes it.

Each slot is scoped with the item it is rendering, so one template can lay out every
card in the list.

## Usage

Pass `items` and let the default slot render `title` and `description` on its own.
Supply the default slot yourself ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â along with `header` or `footer` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the moment the
cards need anything the item does not carry.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-hover-cards-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg">
    <MGlowHoverCards
      :items="items"
      glow-color="var(--ui-primary)"
    >
      <template #header="{ card }">
        <UIcon
          :name="card.icon"
          class="size-5 text-primary"
        />
      </template>

      <template #default="{ card }">
        <div class="space-y-1">
          <h3 class="text-sm font-semibold text-highlighted">
            {{ card.title }}
          </h3>
          <p class="text-sm text-muted">
            {{ card.description }}
          </p>
        </div>
      </template>
    </MGlowHoverCards>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    title: 'Streaming ingest',
    description: 'Events land in the warehouse in under a second.',
    icon: 'i-lucide-zap',
  },
  {
    title: 'Columnar store',
    description: 'Point queries over a trillion rows stay sub-second.',
    icon: 'i-lucide-database',
  },
  {
    title: 'Row policies',
    description: 'One policy engine, enforced per request.',
    icon: 'i-lucide-shield-check',
  },
]
</script>
```
::

## Props

::field-group
  ::field{name="items" type="{ title: string, description?: string, [key: string]: any }[]"}
  Required. The cards to render, in order. Only `title` is relied on ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â `description` is
  used by the default slot ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â but the type carries an index signature, so extra keys
  like `icon` or `href` pass through and are available to your slot props.
  ::
  ::field{name="glowColor" type="string" default="'var(--ui-primary)'"}
  Any CSS colour. It is interpolated with `color-mix(in srgb, ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ 8%, transparent)` and
  composited into the radial gradient, so a raw hex, an `oklch()` value and a theme
  token all work, and the alpha is chosen by the component rather than by you.
  ::
  ::field{name="ui" type="CardProps['ui']" default="undefined"}
  Forwarded to every `UCard` in the grid, which is the way to change padding or the
  border across the whole set at once.
  ::
  ::field{name="class" type="string"}
  Merged onto every card, not just the first. Use it for the per-card hover treatment
  ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the component already supplies `relative overflow-hidden transition-shadow
  duration-300`, so appending is enough.
  ::
::

## Slots

::field-group
  ::field{name="default" scoped="{ card, index }"}
  The card body. Receives the item as `card` and its position as `index`. Falls back
  to a `title` heading and an optional `description` paragraph when the slot is not
  provided.
  ::
  ::field{name="header" scoped="{ card, index }"}
  Forwarded to `UCard`'s `header` slot when provided. Scoped with the same `card` and
  `index` props; skipped entirely when absent, so cards get no header padding.
  ::
  ::field{name="footer" scoped="{ card, index }"}
  Forwarded to `UCard`'s `footer` slot when provided, with the same `card` and `index`
  props.
  ::
::

## Accessibility

The component adds no roles, no ARIA attributes and no keyboard behaviour. The glow is
a pointer-only background: `mousemove` sets it, `mouseleave` clears it, and nothing
about the card changes for a keyboard or screen-reader user except that the card is a
plain card.

Two things are yours to supply. If a card is meant to be clickable, wrap it in an
anchor or button and put the interaction there ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â nothing in this component makes a
card focusable. And if a card's meaning depends on the image or icon a sighted user
sees, that needs a text equivalent in your slot; the fallback markup renders `title`
and `description` as plain text but nothing is added to it for you.

There is no `prefers-reduced-motion` handling. The glow is a static gradient at a new
position per move, not an animation, so there is nothing to suppress ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â but if your page
needs the guarantee, drive `glowColor` to a neutral value or keep the grid off
pointer devices.

## Performance

- Each `mousemove` replaces one entry in a plain record of positions and recomputes
  that card's `background`. Vue re-renders the card it is over, not the grid ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the
  other cards' glow positions are preserved across the update.
- `mouseleave` deletes the entry with a rest-spread, so leaving a card restores the
  remaining positions without mutating the object in place.
- The glow is a single `radial-gradient` on the card's own background, and the card
  already carries `overflow-hidden`, so it costs no extra DOM and no extra stacking
  context.
- `transition-shadow duration-300` is already on every card, which means the class you
  pass through `class` should change a shadow or nothing ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â changing background
  gradients will not animate.
- Grid columns are fixed at `sm` and `lg` breakpoints, so the layout reflows at the
  viewport and never measures the items.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glowHoverCards` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` |
| `card` | `relative overflow-hidden transition-shadow duration-300` |
| `content` | `space-y-2` |
| `title` | `text-lg font-semibold text-highlighted` |
| `description` | `text-sm text-muted` |
