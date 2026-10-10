---
title: Floating Navbar
description: A floating header that hides on downward scroll and reappears on upward scroll.
navigation:
  icon: i-lucide-navigation
---

# Floating Navbar

A compact floating navbar that sits anchored to the top-center of the viewport.
It tracks scroll position with `useScroll` from `motion-v` and uses a `spring`
animation to slide up and down. Ported from smoothui's floating-navbar.

## Usage

Pass a list of links, a brand name, and optionally toggle background blur. The
`right` slot lets you place actions on the opposite side of the nav.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="floating-navbar-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-72 w-full max-w-md overflow-y-auto rounded-2xl border border-default bg-muted/20">
    <div class="space-y-4 p-6">
      <h3 class="text-lg font-semibold">
        Floating Navbar
      </h3>
      <p class="text-muted text-sm">
        Scroll down to see the navbar hide, scroll up to see it reappear.
      </p>
      <div
        v-for="i in 8"
        :key="i"
        class="h-16 rounded-xl bg-background/80 shadow-sm"
      />
    </div>

    <MFloatingNavbar
      :links="links"
      brand="Motion"
      blur
    >
      <template #right>
        <UButton
          size="xs"
          label="Get Started"
        />
      </template>
    </MFloatingNavbar>
  </div>
</template>

<script setup lang="ts">
const links = [
  { label: 'Features', to: '#' },
  { label: 'Pricing', to: '#' },
  { label: 'Docs', to: '#' },
]
</script>
```
::

## Props

::field-group
  ::field{name="links" type="NavLink[]" default="[]"}
  Array of navigation links, each with `label` and `to` used to render anchor
  tags in the desktop nav.
  ::
  ::field{name="brand" type="string" default="''"}
  Text shown on the left side of the navbar.
  ::
  ::field{name="blur" type="boolean" default="true"}
  If true, applies `bg-background/70 backdrop-blur-xl`; otherwise `bg-background`.
  ::
  ::field{name="class" type="string" default="''"}
  Additional classes merged onto the root motion header.
  ::
::

## Slots

::field-group
  ::field{name="right"}
  Content rendered on the right side of the navbar, aligned with the brand and
  links.
  ::
::

## Accessibility

The navbar is a `<motion.header>` element with an internal `<nav>` for the link
list. Links are standard anchors. There are no explicit ARIA roles beyond
semantics; consumers should ensure link text is meaningful.

## Performance

- Tracks `scrollY` from `useScroll` and reacts only on `change` via
  `useMotionValueEvent`, avoiding unnecessary re-renders.
- Compares current scroll to the last stored value and hides only after
  scrolling down past 80px, reducing flicker near the top.
- Uses a spring transition on opacity and vertical position (centered via
  `x: '-50%'`) for smooth motion without layout thrash.
- Classes are computed once per prop change; no timers created beyond the
  scroll subscription managed by `motion-v`.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.floatingNavbar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'fixed top-4 left-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-default shadow-lg'` |
| `brand` | `'font-bold text-lg whitespace-nowrap'` |
| `nav` | `'hidden md:flex items-center gap-1'` |
| `link` | `'px-3 py-1.5 rounded-full text-sm font-medium hover:bg-muted transition-colors'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.floatingNavbar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `fixed top-4 left-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-default shadow-lg` |
| `brand` | `font-bold text-lg whitespace-nowrap` |
| `nav` | `hidden md:flex items-center gap-1` |
| `link` | `px-3 py-1.5 rounded-full text-sm font-medium hover:bg-muted transition-colors` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.floatingNavbar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `fixed top-4 left-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-default shadow-lg` |
| `brand` | `font-bold text-lg whitespace-nowrap` |
| `nav` | `hidden md:flex items-center gap-1` |
| `link` | `px-3 py-1.5 rounded-full text-sm font-medium hover:bg-muted transition-colors` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.floatingNavbar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `fixed top-4 left-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-default shadow-lg` |
| `brand` | `font-bold text-lg whitespace-nowrap` |
| `nav` | `hidden md:flex items-center gap-1` |
| `link` | `px-3 py-1.5 rounded-full text-sm font-medium hover:bg-muted transition-colors` |
