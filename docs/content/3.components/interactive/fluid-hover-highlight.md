---
title: Fluid Hover Highlight
description: One plate that travels to whatever row the pointer or the keyboard lands on.
---

A list where every row lights up on its own reads as a flicker: five separate
plates appearing and vanishing as the pointer crosses them. One plate that moves
reads as a single object passing through the list, which is much closer to what
the pointer is actually doing.

Mark the rows with `data-fluid-item` and the component measures whichever one the
pointer or the keyboard lands on. Nothing is keyed by index, so reordering the
list does not desynchronise it, and nothing assumes equal heights, so rows of
different sizes work without a `size` prop.

## Usage

Wrap the rows in the component and mark each one. The wrapper is the coordinate
space: every `[data-fluid-item]` inside it is a target.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="fluid-hover-highlight-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-sm rounded-xl border border-default bg-default p-2">
    <MFluidHoverHighlight>
      <button
        v-for="action in actions"
        :key="action.label"
        type="button"
        data-fluid-item
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-default outline-none"
      >
        <UIcon
          :name="action.icon"
          class="size-4 shrink-0 text-muted"
        />
        <span class="flex-1">{{ action.label }}</span>
        <kbd class="font-sans text-[11px] text-muted">{{ action.shortcut }}</kbd>
      </button>
    </MFluidHoverHighlight>
  </div>
</template>

<script setup lang="ts">
/**
 * Five rows, one plate. The plate follows both the pointer and Tab - hover it,
 * then press Tab to watch it move without the mouse.
 */
const actions = [
  { label: 'New file', icon: 'i-lucide-file-plus', shortcut: '⌘N' },
  { label: 'Open project', icon: 'i-lucide-folder-open', shortcut: '⌘O' },
  { label: 'Search', icon: 'i-lucide-search', shortcut: '⌘K' },
  { label: 'Toggle theme', icon: 'i-lucide-sun-moon', shortcut: '⌘J' },
  { label: 'Settings', icon: 'i-lucide-settings', shortcut: '⌘,' },
]
</script>
```
::

## Customize

The custom example keeps the rows it is given and changes nothing else, which is
the point: the plate is not aware of rows, columns, or lists. A grid shows what a
row-only animation gets wrong - moving between two columns changes width and
height at the same time as position, and animating only the vertical axis would
snap.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="fluid-hover-highlight-custom" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md">
    <MFluidHoverHighlight class="grid grid-cols-3 gap-2">
      <div
        v-for="tile in tiles"
        :key="tile"
        data-fluid-item
        class="flex h-20 items-center justify-center rounded-lg border border-default bg-default px-2 text-center text-xs font-medium text-muted"
      >
        {{ tile }}
      </div>
    </MFluidHoverHighlight>
  </div>
</template>

<script setup lang="ts">
/**
 * Nothing about the component assumes a list. It measures whatever the pointer
 * lands on, so the same plate walks a grid - including across rows, where a
 * height-only animation would jump.
 */
const tiles = ['Overview', 'Traffic', 'Revenue', 'Audience', 'Retention', 'Settings']
</script>
```
::

## Props

::component-props
  ::component-prop{name="snap" type="boolean" default="false"}
  Move the plate instantly instead of springing it. Worth reaching for on a very
  long list, where a spring reads as lag on the way to the row.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper, which is the coordinate space. Position it, size it,
  or lay the rows out on it - `grid`, `space-y` and `divide-y` all work.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.fluidHoverHighlight` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The wrapper. It is `relative isolate`, so the rows own their own layout while
  the plate gets a stacking context to sit behind them.
  ::
  ::component-slot-row{name="highlight"}
  The plate. It is `absolute`, `pointer-events-none` and `-z-10`, so it can sit
  under the rows without intercepting the hover that moved it.
  ::
::

## Accessibility

- The plate follows focus as well as the pointer. A highlight that only moves
  under the mouse is a lie for anyone navigating with Tab, and the two states
  end up looking like different components.
- The plate is `aria-hidden`. It carries no text and no state; the rows are the
  controls and keep their own accessible names.
- Hover comes from `pointerover` with the pointer type checked, so touch is
  ignored. A touch screen fires hover on contact that never ends, and the plate
  would stick to the last row the finger crossed.
- Focus is tracked with `focusin`/`focusout` rather than `focus`/`blur` so a row
  that contains a link or a button still counts as one target.
- Under `prefers-reduced-motion: reduce` the plate moves with a zero-duration
  transition. The 80 ms fade is kept: an opacity change is not travel, and
  removing it makes the plate blink into existence.
- The plate never carries the meaning on its own. Each row keeps whatever hover
  colour and focus ring it already had, so the moving plate is reinforcement
  rather than the only signal.

## Performance

- One element moves, not one per row. Ten rows cost exactly what one row costs.
- Position and size are read once when the plate is summoned, not per frame. A
  `ResizeObserver` re-measures only while a row is active, so a breakpoint
  change does not leave the plate at a stale size.
- `x` and `y` are transform properties, and `width`/`height` are not. The plate
  is a single absolutely positioned element inside a `relative` wrapper, so the
  layout work of animating its size is confined to that element and never
  reaches the rows.
- Nothing is keyed by index, so inserting or sorting a row keeps the plate on
  the row the pointer is actually over rather than on its old position.
- The highlight is rendered only while a row is active, so a list that is not
  being touched has no extra node in the tree.
