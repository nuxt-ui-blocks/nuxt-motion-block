---
title: App Download Stack
description: An expandable macOS-style app selector that fanned-stack animates icons and drives a multi-app download flow.
navigation:
  icon: i-lucide-download
---

# App Download Stack

App Download Stack starts as a collapsed fan of app icons. Clicking expands a selectable grid; you can toggle apps (up to `maxPinned`-like cap implied by selection), then trigger a download sequence that shows a downloading state with a shine sweep and finally a completion state before auto-resetting. It respects `prefers-reduced-motion`, supports controlled `expanded`/`selectedApps`, and emits lifecycle events. Ported from smoothui's app-download-stack.

## Usage

Provide `apps` with `id`, `name`, `icon`. The trigger is a plain button that expands the selector. Use `v-model:expanded` and `v-model:selectedApps` to control state, or listen to `expand-change`, `change`, `download` events.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="app-download-stack-basic" />
  :::
#code
```vue
<template>
  <div class="flex h-80 w-full items-center justify-center">
    <MAppDownloadStack
      title="My Apps"
      :apps="apps"
    />
  </div>
</template>

<script setup lang="ts">
const apps = [
  { id: 1, name: 'Safari', icon: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=128&h=128&fit=crop&auto=format' },
  { id: 2, name: 'Photos', icon: 'https://images.unsplash.com/photo-1504812445817-cb3d4f235a14?w=128&h=128&fit=crop&auto=format' },
  { id: 3, name: 'Podcasts', icon: 'https://images.unsplash.com/photo-1593697820826-2e76c9720a99?w=128&h=128&fit=crop&auto=format' },
  { id: 4, name: 'Calendar', icon: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=128&h=128&fit=crop&auto=format' }
]
</script>
```
::

## Props

::field-group
  ::field{name="apps" type="AppDownloadStackApp[]" default="undefined"}
  List of apps to render. Defaults to built-in placeholder macOS list if undefined. Each `AppDownloadStackApp` has `id` (number), `name` (string), `icon` (string, URL or data URI).
  ::
  ::field{name="title" type="string" default="'Starter Mac'"}
  Selector header text shown when expanded.
  ::
  ::field{name="selectedApps" type="number[]" default="undefined"}
  Controlled selection of app ids. Leave undefined for uncontrolled.
  ::
  ::field{name="expanded" type="boolean" default="undefined"}
  Controlled expansion. Leave undefined for uncontrolled.
  ::
  ::field{name="class" type="string" default="undefined"}
  Merged onto the outer column wrapper.
  ::
::

## Events

::field-group
  ::field{name="change" type="(selected: number[]) => void"}
  Emitted when selection changes.
  ::
  ::field{name="download" type="(selected: number[]) => void"}
  Emitted when Download Selected is clicked with the current selected ids.
  ::
  ::field{name="expand-change" type="(expanded: boolean) => void"}
  Emitted when expansion toggles.
  ::
  ::field{name="update:expanded" type="(expanded: boolean) => void"}
  v-model update for expansion.
  ::
  ::field{name="update:selectedApps" type="(selected: number[]) => void"}
  v-model update for selection.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  No default slot is used.
  ::
::

## Accessibility

The collapsed trigger is a plain `<button>` with `aria-label="Expand app selection"`. When expanded, the header is also a button (collapses on click) and each app tile is a button with `:aria-pressed="isSelected(app.id)"`. Checkmark uses a decorative SVG with `<title>Checkmark</title>`. The download button is disabled when nothing selected. The stack of icons uses `alt` text per app. No ARIA live regions announce download state changes; focus is not managed between states. `prefers-reduced-motion` replaces all motion with near-zero duration variants (floats/rotations become flat). Layout transitions are disabled when reduced motion is preferred (`:layout="!shouldReduceMotion"`).

## Performance

- Icon motion is expressed via `variants` callbacks (reading `custom` index) and computed per state; when reduced motion, all variants collapse to `rest`/flat forms.
- The shine sweep uses `useAnimationControls().start()` called after `nextTick()` so the target node exists; sweep runs infinitely during download with linear easing and is stopped on completion.
- Download sequence uses two `setTimeout`s: one for `DOWNLOAD_DURATION_MS` (3000) to complete, one `RESET_DELAY_MS` (1000) to collapse/reset. Timers are cleared on unmount.
- `layoutId` is only applied when motion is not reduced (prevents layout animation noise under reduced motion).
- Panel transitions use `AnimatePresence` with scale/opacity; reduced motion uses opacity-only or zero-duration variants.
- No WebGL, heavy loops, or per-frame state churn beyond timers and the small computed maps.

::tip
Pass custom `apps` with optimized image URLs (small, square). The default placeholder icons use ImageKit URLs; replace them to avoid external requests if self-hosting.
::