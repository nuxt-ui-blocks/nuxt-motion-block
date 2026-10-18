---
title: useThemeColor
description: Resolve a Nuxt UI theme token to the colour the browser actually paints, reactively.
---

`useThemeColor` turns a Nuxt UI theme token — `primary`, `text-muted`, `border`, or any `--ui-*` variable — into the concrete colour the browser paints, and keeps it in sync as the user switches between light and dark.

Reach for it when you need a real colour string instead of the `var(--ui-*)` reference the DOM would normally carry — for a canvas, an inline style, or any place that will not accept a variable. You can also pass a plain colour directly and it is returned unchanged.

## Usage

```vue
<script setup lang="ts">
import { useThemeColor } from '#imports'

const primary = useThemeColor('primary')
</script>

<template>
  <span :style="{ color: primary ?? 'var(--ui-primary)' }">
    tinted by your theme's primary colour
  </span>
</template>
```

On the server `primary` is `null`, so the fallback renders during SSR and the exact colour appears once the client mounts. Pass `fallback` to render something else on the server instead of an empty value:

```ts
const brand = useThemeColor('primary', { fallback: '#10b981' })
```

## Parameters

::field-group
  ::field{name="token" type="string"}
  A Nuxt UI token (`'primary'`, `'text-muted'`), a variable (`'--ui-primary'`), or any CSS colour string. A literal colour (`'#10b981'`, `'oklch(...)'`) is returned as-is.
  ::

  ::field{name="options" type="object" default="{}"}
  Configuration options.
  ::

  ::field{type="HTMLElement" name="options.target" default="document.documentElement"}
  Resolve the colour scoped to a subtree instead of the document root — useful inside a themed container that overrides `--ui-*`.
  ::

  ::field{type="string" name="options.fallback" default="null"}
  Value to return on the server and when resolution fails.
  ::
::

## Returns

::field-group
  ::field{name="color" type="Ref<string | null>"}
  The resolved colour (e.g. `rgb(0, 220, 130)`), or `fallback`/`null` before the client resolves it.
  ::
::

## Reactivity

The ref updates on two occasions:

- **On mount** — client-only, because resolving a `var()` needs a live document.
- **Whenever the colour mode changes**, via [`useColorMode`](https://ui.nuxt.com/composables/use-color-mode). Switching from light to dark re-resolves the token, so a colour captured once is never stale.

Because resolution reads back what the browser computed, `oklch()`, `color-mix()` and plain hex values all come back as painted — no manual colour parsing on your side.

## Where it helps

The resolved string is an ordinary CSS colour, so it drops straight into anything CSS accepts:

```ts
const primary = useThemeColor('primary')

ctx.fillStyle = primary.value ?? 'var(--ui-primary)'
ctx.fillRect(0, 0, 100, 100)
```

For components that already paint to a canvas, you rarely need this: they accept a Nuxt UI token in their colour props and resolve it for you.
