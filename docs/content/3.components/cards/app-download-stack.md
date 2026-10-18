---
title: App Download Stack
description: An expandable macOS-style app selector that fanned-stack animates icons and drives a multi-app download flow.
---

App Download Stack starts as a collapsed fan of app icons. Clicking expands a selectable grid; you can toggle apps (up to `maxPinned`-like cap implied by selection), then trigger a download sequence that shows a downloading state with a shine sweep and finally a completion state before auto-resetting. It respects `prefers-reduced-motion`, supports controlled `expanded`/`selectedApps`, and emits lifecycle events.

## Usage

Provide `apps` with `id`, `name`, `icon` (a Nuxt UI icon name). The trigger is a plain button that expands the selector. Use `v-model:expanded` and `v-model:selectedApps` to control state, or listen to `expand-change`, `change`, `download` events.

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
  { id: 1, name: 'Safari', icon: 'i-lucide-compass' },
  { id: 2, name: 'Photos', icon: 'i-lucide-image' },
  { id: 3, name: 'Podcasts', icon: 'i-lucide-mic' },
  { id: 4, name: 'Calendar', icon: 'i-lucide-calendar-days' },
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
    <component-example name="app-download-stack-custom" />
  :::
#code
  <PlaygroundCode name="AppDownloadStack" />
::

## Props

::component-props
  ::component-prop{name="apps" type="AppDownloadStackApp[]" default="undefined"}
  List of apps to render. Defaults to built-in placeholder macOS list if undefined. Each `AppDownloadStackApp` has `id` (number), `name` (string), `icon` (string, a Nuxt UI icon name such as `i-lucide-compass`).
  ::
  ::component-prop{name="title" type="string" default="'Starter Mac'"}
  Selector header text shown when expanded.
  ::
  ::component-prop{name="selectedApps" type="number[]" default="undefined"}
  Controlled selection of app ids. Leave undefined for uncontrolled.
  ::
  ::component-prop{name="expanded" type="boolean" default="undefined"}
  Controlled expansion. Leave undefined for uncontrolled.
  ::
  ::component-prop{name="class" type="string" default="undefined"}
  Merged onto the outer column wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="change" type="(selected: number[]) => void"}
  Emitted when selection changes.
  ::
  ::component-event{name="download" type="(selected: number[]) => void"}
  Emitted when Download Selected is clicked with the current selected ids.
  ::
  ::component-event{name="expand-change" type="(expanded: boolean) => void"}
  Emitted when expansion toggles.
  ::
  ::component-event{name="update:expanded" type="(expanded: boolean) => void"}
  v-model update for expansion.
  ::
  ::component-event{name="update:selectedApps" type="(selected: number[]) => void"}
  v-model update for selection.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  No default slot is used.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.appDownloadStack` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `flex h-auto flex-col items-center justify-center`
  ::
  ::component-slot-row{name="wrapper"}
  `flex flex-col items-center justify-center`
  ::
  ::component-slot-row{name="trigger"}
  `group relative isolate flex h-16 w-16 cursor-pointer items-center justify-center`
  ::
  ::component-slot-row{name="stackIcon"}
  `absolute inset-0 rounded-xl border-none`
  ::
  ::component-slot-row{name="selector"}
  `flex flex-col items-center gap-2`
  ::
  ::component-slot-row{name="selectorHeader"}
  `flex w-full cursor-pointer items-center justify-between px-0.5`
  ::
  ::component-slot-row{name="title"}
  `my-0 font-medium leading-none text-highlighted`
  ::
  ::component-slot-row{name="countWrap"}
  `flex items-center gap-1`
  ::
  ::component-slot-row{name="count"}
  `my-0 font-medium leading-none text-highlighted`
  ::
  ::component-slot-row{name="chevron"}
  `size-4 text-muted`
  ::
  ::component-slot-row{name="grid"}
  `grid grid-cols-2 gap-3`
  ::
  ::component-slot-row{name="tile"}
  `relative flex h-[80px] w-[80px]`
  ::
  ::component-slot-row{name="check"}
  `pointer-events-none absolute top-2 right-2 z-[1] flex h-4 w-4 items-center justify-center rounded-full border border-solid`
  ::
  ::component-slot-row{name="checkmark"}
  `z-[1] h-3 w-3`
  ::
  ::component-slot-row{name="app"}
  `group flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-transparent bg-default/80 p-2 transition-all duration-200 hover:border-primary`
  ::
  ::component-slot-row{name="appIcon"}
  `rounded-lg`
  ::
  ::component-slot-row{name="appName"}
  `font-medium text-highlighted text-xs`
  ::
  ::component-slot-row{name="download"}
  `mt-4 w-full cursor-pointer rounded-lg bg-primary px-4 py-2 font-semibold text-inverted shadow transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50`
  ::
  ::component-slot-row{name="downloading"}
  `flex flex-col items-center gap-4`
  ::
  ::component-slot-row{name="downloadingWrap"}
  `relative flex h-16 w-16 items-center justify-center`
  ::
  ::component-slot-row{name="shine"}
  `absolute inset-0 rounded-xl bg-primary/20`
  ::
  ::component-slot-row{name="downloadingIcon"}
  `absolute inset-0 rounded-xl border-none`
  ::
  ::component-slot-row{name="downloadingLabel"}
  `font-semibold text-primary`
  ::
  ::component-slot-row{name="complete"}
  `flex flex-col items-center gap-4`
  ::
  ::component-slot-row{name="completeLabel"}
  `font-semibold text-success`
  ::
::

## Accessibility

The collapsed trigger is a plain `<button>` with `aria-label="Expand app selection"`. When expanded, the header is also a button (collapses on click) and each app tile is a button with `:aria-pressed="isSelected(app.id)"`. Checkmark uses a decorative SVG with `<title>Checkmark</title>`. The download button is disabled when nothing selected. The stack and downloading icons carry `role="img"` with the app name as the accessible label; the grid tiles are labelled by their visible text. No ARIA live regions announce download state changes; focus is not managed between states. `prefers-reduced-motion` replaces all motion with near-zero duration variants (floats/rotations become flat). Layout transitions are disabled when reduced motion is preferred (`:layout="!shouldReduceMotion"`).

## Performance

- Icon motion is expressed via `variants` callbacks (reading `custom` index) and computed per state; when reduced motion, all variants collapse to `rest`/flat forms.
- The shine sweep uses `useAnimationControls().start()` called after `nextTick()` so the target node exists; sweep runs infinitely during download with linear easing and is stopped on completion.
- Download sequence uses two `setTimeout`s: one for `DOWNLOAD_DURATION_MS` (3000) to complete, one `RESET_DELAY_MS` (1000) to collapse/reset. Timers are cleared on unmount.
- `layoutId` is only applied when motion is not reduced (prevents layout animation noise under reduced motion).
- Panel transitions use `AnimatePresence` with scale/opacity; reduced motion uses opacity-only or zero-duration variants.
- No WebGL, heavy loops, or per-frame state churn beyond timers and the small computed maps.

::tip
Pass custom `apps` with Nuxt UI icon names (any `i-…` Iconify id). The default placeholder icons are Nuxt UI icons, so no external asset request is made.
::

