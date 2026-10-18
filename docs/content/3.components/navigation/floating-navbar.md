---
title: Floating Navbar
description: A floating header that hides on downward scroll and reappears on upward scroll.
---

A compact floating navbar that sits anchored to the top-center of the area it
tracks. It reads scroll position with `useScroll` from `motion-v` and uses a
`spring` animation to slide up and down. By default it is `fixed` to the
viewport; pass a `container` to anchor it inside a scrollable element instead.

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
  <div
    ref="box"
    class="relative h-72 w-full max-w-lg overflow-y-auto rounded-2xl border border-default bg-muted/20"
  >
    <MFloatingNavbar
      :container="box"
      position="inline"
      :links="links"
      brand="Motion"
      class="mx-auto mt-4 w-fit"
    >
      <template #right>
        <UButton
          size="xs"
          label="Get Started"
        />
      </template>
    </MFloatingNavbar>

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
        class="h-16 rounded-xl bg-default/80 shadow-sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const box = ref<HTMLElement | null>(null)

const links = [
  { label: 'Features', to: '#' },
  { label: 'Pricing', to: '#' },
  { label: 'Docs', to: '#' },
]
</script>
```
::

## Examples

### Solid background

With `blur` disabled the navbar uses an opaque surface instead of a translucent,
blurred one.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="floating-navbar-solid" />
  :::
#code
```vue
<template>
  <div
    ref="box"
    class="relative h-72 w-full max-w-md overflow-y-auto rounded-2xl border border-default bg-muted/20"
  >
    <MFloatingNavbar
      :container="box"
      position="inline"
      :links="links"
      brand="Motion"
      :blur="false"
      class="mx-auto mt-4 w-fit"
    />

    <div class="space-y-4 p-6">
      <h3 class="text-lg font-semibold">
        Solid background
      </h3>
      <p class="text-muted text-sm">
        With <code>blur</code> disabled the navbar uses an opaque surface instead of a
        translucent, blurred one.
      </p>
      <div
        v-for="i in 8"
        :key="i"
        class="h-16 rounded-xl bg-default/80 shadow-sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const box = ref<HTMLElement | null>(null)

const links = [
  { label: 'Features', to: '#' },
  { label: 'Pricing', to: '#' },
  { label: 'Docs', to: '#' },
]
</script>
```
::

### Custom threshold

`scrollThreshold` controls how far you must scroll down before the navbar hides.
The default is `80`px.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="floating-navbar-threshold" />
  :::
#code
```vue
<template>
  <div
    ref="box"
    class="relative h-72 w-full max-w-md overflow-y-auto rounded-2xl border border-default bg-muted/20"
  >
    <MFloatingNavbar
      :container="box"
      position="inline"
      :links="links"
      brand="Motion"
      :scroll-threshold="240"
      class="mx-auto mt-4 w-fit"
    />

    <div class="space-y-4 p-6">
      <h3 class="text-lg font-semibold">
        Custom threshold
      </h3>
      <p class="text-muted text-sm">
        With <code>:scroll-threshold="240"</code> the navbar stays visible until you
        have scrolled 240px down, then hides on the next downward scroll.
      </p>
      <div
        v-for="i in 8"
        :key="i"
        class="h-16 rounded-xl bg-default/80 shadow-sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const box = ref<HTMLElement | null>(null)

const links = [
  { label: 'Features', to: '#' },
  { label: 'Pricing', to: '#' },
  { label: 'Docs', to: '#' },
]
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="floating-navbar-custom" />
  :::
#code
  <PlaygroundCode name="FloatingNavbar" />
::

## Props

::component-props
  ::component-prop{name="links" type="NavLink[]" default="[]"}
  Array of navigation links, each with `label` and `to` used to render anchor
  tags in the desktop nav.
  ::
  ::component-prop{name="brand" type="string" default="''"}
  Text shown on the left side of the navbar.
  ::
  ::component-prop{name="blur" type="boolean" default="true"}
  If true, applies `bg-default/70 backdrop-blur-xl`; otherwise `bg-default`.
  ::
  ::component-prop{name="container" type="HTMLElement" default="undefined"}
  Scroll container to track. When provided, the navbar is `sticky` inside the
  container and reacts to its scroll instead of the window's.
  ::
  ::component-prop{name="position" type="'fixed' | 'inline'" default="fixed"}
  Positioning mode. Defaults to `inline` automatically when a `container` is
  passed. `fixed` pins the navbar to the viewport; `inline` sticks it to the top
  of its scroll container.
  ::
  ::component-prop{name="hideOnScroll" type="boolean" default="true"}
  When false the navbar stays visible regardless of scroll direction.
  ::
  ::component-prop{name="scrollThreshold" type="number" default="80"}
  Pixels of downward scroll required before the navbar hides.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Additional classes merged onto the root motion header.
  ::
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="right"}
  Content rendered on the right side of the navbar, aligned with the brand and
  links.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.floatingNavbar` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `top-4 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-default shadow-lg`
  ::
  ::component-slot-row{name="brand"}
  `font-bold text-lg whitespace-nowrap`
  ::
  ::component-slot-row{name="nav"}
  `hidden md:flex items-center gap-1`
  ::
  ::component-slot-row{name="link"}
  `px-3 py-1.5 rounded-full text-sm font-medium hover:bg-muted transition-colors`
  ::
::

## Accessibility

The navbar is a `<motion.header>` element with an internal `<nav>` for the link
list. Links are standard anchors. Visibility is animated purely for presentation
and the element is never removed from the accessibility tree, so links remain
reachable with a keyboard. Consumers should ensure link text is meaningful.

## Performance

- Tracks `scrollY` from `useScroll` and reacts only on `change` via
  `useMotionValueEvent`, avoiding unnecessary re-renders.
- Compares current scroll to the last stored value and hides only after
  scrolling down past `scrollThreshold`, reducing flicker near the top.
- Uses a spring transition on opacity and vertical position (centered via
  `x: '-50%'` in `fixed` mode) for smooth motion without layout thrash.
- Classes are computed once per prop change; no timers created beyond the
  scroll subscription managed by `motion-v`.
