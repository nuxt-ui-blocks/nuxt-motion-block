---
title: Theme Toggle
description: A button that advances Nuxt UI's colour mode through light, dark and system, crossfading the glyph that names the current one.
navigation:
  icon: i-lucide-sun-moon
---

# Theme Toggle

A button that steps Nuxt UI's colour mode through `light ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ dark ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ system`, swapping the
glyph to match the preference it just wrote: a sun, a moon, a monitor.

It owns no state. Everything comes from `useColorMode()`, the same global the rest of
your app reads, so a toggle in a header and one in a sidebar stay in step without any
props. That also means it emits nothing and takes no `v-model` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â there is nothing to
bind, because there is nothing local.

The glyph is chosen from the *preference*, not from the resolved mode. On a machine set
to dark, clicking through to `system` shows the monitor, which is the honest answer:
that is what the user just chose, whatever it currently resolves to.

## Usage

Drop it in and click it. Pass `size` to match a surrounding toolbar, and `aria-label` to
name the action ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the component has no label of its own.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="theme-toggle-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex items-center gap-3">
      <MThemeToggle aria-label="Cycle colour mode" />
      <span class="text-sm text-muted">
        preference: <code class="font-mono">{{ colorMode.preference }}</code>
      </span>
    </div>

    <div class="flex w-full items-center justify-between gap-3 rounded-xl border border-default px-4 py-3">
      <span class="text-sm font-medium text-highlighted">
        Northwind docs
      </span>
      <MThemeToggle size="sm" />
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      Every click advances light ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ dark ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ system and writes Nuxt UI's global colour mode, so the whole
      page ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â not just this button ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â follows. The icon is chosen from the preference itself, which is
      why the monitor appears in system mode rather than the resolved one.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()
</script>

```
::

## Props

::field-group
  ::field{name="size" type="ButtonProps['size']" default="'md'"}
  Forwarded to the inner `UButton`. Bound explicitly, so a caller attribute of the same
  name is consumed rather than merged.
  ::
::

The component declares no slots and emits no events. Other attributes fall through to
the root `UButton`, which is what makes `aria-label`, `class` and the native `type` work
as usual. The button is hard-coded to the `ghost` variant, and `variant` is not exposed
as a prop.

## Accessibility

The root is a real `UButton`, so it is a `<button type="button">` with keyboard
activation and Nuxt UI's focus ring.

Nothing labels it out of the box. The single `UIcon` carries no accessible name, so an
unlabelled toggle is announced as just "button" ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â pass `aria-label` describing the
action. The label does not track the current mode, and it cannot: the component cycles
three preferences, so "Toggle dark mode" would be wrong one click in three. If you need
that, label it from your own `useColorMode()` state instead.

The mode change is visual only ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â no live region announces it, so a screen-reader user
gets no confirmation that the click did anything.

Reduced motion is not consulted. The swap runs at a fixed `0.2s` for every visitor,
including the exit half, which rotates the outgoing glyph a quarter turn.

## Performance

- `colorMode.preference` is the only reactive input, and it belongs to Nuxt UI rather
  than to this component. A mode change re-renders one `motion.span` and its `UIcon`.
- One icon is rendered per state. The `motion.span` is keyed on `colorMode.preference`,
  so a mode change tears the old element down and mounts a new one, which is what
  re-runs `:initial`. Nothing is carried between preferences.
- Everything animated is `opacity`, `scale` and `rotate`, so there is no layout work.
  The transition object is a fresh inline literal per render, which is cheap for a
  single element.
- `useColorMode()` writes to the document's class list and local storage; that cost
  belongs to Nuxt UI, not here.

::tip
The icon swap is wrapped in `<AnimatePresence mode="wait">`, but motion-v does not
implement that mode, so the outgoing glyph is not guaranteed to be gone before the
incoming one appears ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â expect a brief crossfade with two icons visible rather than a
clean hand-off. Keep the pair visually close: sun to moon reads well, sun to a filled
square does not.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.themeToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |
| `iconWrapper` | `'inline-flex items-center justify-center'` |
| `icon` | `'w-5 h-5'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.themeToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `iconWrapper` | `inline-flex items-center justify-center` |
| `icon` | `w-5 h-5` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.themeToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `iconWrapper` | `inline-flex items-center justify-center` |
| `icon` | `w-5 h-5` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.themeToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `iconWrapper` | `inline-flex items-center justify-center` |
| `icon` | `w-5 h-5` |
