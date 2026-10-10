---
title: Expandable Navbar
description: A header whose links collapse into a mobile panel that staggers in when it opens.
navigation:
  icon: i-lucide-menu
---

# Expandable Navbar

A responsive header built on Nuxt UI's `UHeader`. Above `lg` it renders a
horizontal `UNavigationMenu`; below it, the same links collapse into the
header's body panel and each one fades in from the left on a staggered spring.
Ported from smoothui's expandable-navbar.

The interesting part is the mobile panel: every link is its own `motion.div`
with a `delay: i * 0.06`, so opening the menu reads as a short cascade rather
than a single block appearing.

## Usage

Pass a `title` and a flat list of `items` (`label`, `to`, optional `icon`).
Desktop navigation is built for you; use the `actions` slot for anything that
belongs on the right-hand side of the bar.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="expandable-navbar-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg overflow-hidden rounded-2xl border border-default">
    <MExpandableNavbar
      title="Motion"
      :items="items"
    >
      <template #actions>
        <UButton
          size="xs"
          variant="outline"
          label="Sign in"
        />
      </template>
    </MExpandableNavbar>
    <div class="space-y-2 bg-muted/20 p-6">
      <p class="text-sm text-muted">
        The nav links collapse into the mobile panel and stagger in one after the
        other.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { label: 'Products', to: '#', icon: 'i-lucide-box' },
  { label: 'Pricing', to: '#', icon: 'i-lucide-tag' },
  { label: 'Docs', to: '#', icon: 'i-lucide-book-open' },
]
</script>
```
::

## Props

::field-group
  ::field{name="title" type="string" default="''"}
  Text rendered in the header's `left` slot. The `left` slot UI is overridden to
  `flex items-center gap-2` so a plain span sits correctly beside the nav.
  ::
  ::field{name="items" type="NavItem[]" default="[]"}
  Flat list of `{ label, to, icon? }` entries. `label` and `to` are required;
  `icon` is optional and only used by the mobile panel's buttons. The array is
  reshaped into a single-group array for `UNavigationMenu`, which is why the
  desktop menu has no nested children ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â give it flat entries, not a tree.
  ::
::

## Slots

::field-group
  ::field{name="actions"}
  Rendered after the desktop navigation, on the right-hand side of the header.
  Buttons, colour-mode toggles and avatar menus go here.
  ::
::

## Accessibility

The component delegates all landmark and disclosure semantics to Nuxt UI's
`UHeader`, so the mobile toggle is a real button with `aria-expanded` state and
the body panel is wired to it. Inside the panel each item is a `UButton` with
`to`, which renders an anchor ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â meaning keyboard order and middle-click both
behave as expected.

The component adds no ARIA of its own. Note that `UNavigationMenu` in desktop
mode is hidden with `hidden lg:flex`, so at narrow widths those links are removed
from the accessibility tree rather than merely clipped.

There is no `prefers-reduced-motion` branch: the mobile cascade is a plain
spring and will still play for users who ask for reduced motion. Wrap the
component or override `transition` yourself if that matters.

## Performance

- `desktopItems` is a `computed`, so the reshaped navigation array is rebuilt
  only when `items` changes ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â not on every render.
- The staggered cascade lives entirely on mount of each `motion.div`; there are
  no timers, no `requestAnimationFrame` loops and no listeners owned by this
  component.
- Motion is limited to `opacity` and `x`, both compositor-friendly transforms, so
  the cascade does not trigger layout on each step.

::tip
The desktop array is wrapped in an outer array ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â `[[...items]]` rather than
`[...items]`. That single nesting level is what makes `UNavigationMenu` read it
as one navigation group instead of treating each item as a top-level list, so
the component takes a flat `items` prop and does the wrapping for you.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.expandableNavbar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `left` | `flex items-center gap-2` |
| `title` | `font-bold text-lg` |
| `menu` | `hidden lg:flex` |
| `body` | `lg:hidden p-4` |
| `button` | `w-full justify-start` |
