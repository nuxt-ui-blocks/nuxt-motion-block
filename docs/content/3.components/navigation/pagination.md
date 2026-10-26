---
title: Pagination
description: A page switcher with a fixed-width range and a shared pill that springs between pages.
---

A page switcher built from real buttons under a `<nav>`. The range is computed
from the current page and a `siblings` count, so the control keeps a stable
width while the numbers in the middle slide over instead of pushing the layout
around.

The active page is marked twice: `aria-current="page"` on its button for
assistive technology, and a shared-layout pill that travels from the old page to
the new one. Because the pill is one element with a fixed `layout-id` rather
than a background on each button, the movement is continuous even when the
middle of the range renumbers.

## Usage

Pass `totalPages`, then bind `v-model:page` to keep the parent in charge. Leave
`page` off and the component keeps its own copy; `update:page` fires either way,
so it also works as a plain event source.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="pagination-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 py-10">
    <MPagination
      v-model:page="page"
      :total-pages="24"
    />
    <p class="text-sm text-muted">
      Page {{ page }} of 24
    </p>
  </div>
</template>

<script setup lang="ts">
const page = ref(1)
</script>
```
::

## Customize

`siblings` sets how many pages sit on each side of the current one before the
range gives up and inserts an ellipsis. At `0` you get the first page, the
current page and the last page; at `2` the middle window is wider and the
control can go longer between jumps. `totalPages` drives the whole range, and the
Previous and Next labels drop away below `sm` while the chevrons stay.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="pagination-custom" />
  :::
#code
  <PlaygroundCode name="Pagination" />
::

## Props

::component-props
  ::component-prop{name="page" type="number"}
  Current page, 1-indexed. Leave it out to let the component own the value. The
  displayed page is clamped to the `1..totalPages` range, so an out-of-range
  prop cannot put the control in an impossible state.
  ::
  ::component-prop{name="totalPages" type="number" required}
  Total number of pages. Values below `1` are treated as `1`.
  ::
  ::component-prop{name="siblings" type="number" default="1"}
  Pages shown on each side of the current one before an ellipsis replaces the
  gap. Fractional values are floored.
  ::
  ::component-prop{name="ariaLabel" type="string" default="'Pagination'"}
  Accessible name for the `<nav>` landmark. Set it when a page has more than one
  paginated region.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root `<nav>`.
  ::
  ::component-prop{name="ui" type="Record<string, any>"}
  Per-slot classes merged over the theme defaults. See [UI](#ui) for the slot
  list.
  ::
::

## Events

::component-events
  ::component-event{name="update:page" type="(page: number) => void"}
  The next page, clamped to the valid range. It is skipped when the target
  equals the current page, so clicking the active number or a disabled arrow
  does not emit. Powers `v-model:page`.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.pagination` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The `<nav>` wrapper.
  ::
  ::component-slot-row{name="list"}
  The horizontal `<ul>`.
  ::
  ::component-slot-row{name="item"}
  One `<li>`, shared by the arrows and the numbers.
  ::
  ::component-slot-row{name="navButton"}
  The Previous and Next buttons.
  ::
  ::component-slot-row{name="navLabel"}
  The `Previous` / `Next` text, hidden below `sm`.
  ::
  ::component-slot-row{name="icon"}
  The chevron inside an arrow button.
  ::
  ::component-slot-row{name="ellipsis"}
  The non-interactive `...` cell.
  ::
  ::component-slot-row{name="pageButton"}
  A numbered page button.
  ::
  ::component-slot-row{name="indicator"}
  The shared pill behind the active number.
  ::
  ::component-slot-row{name="pageLabel"}
  The number inside a page button, layered above the pill.
  ::
::

## Accessibility

- The control is a `<nav>` with a configurable accessible name, containing a
  `<ul>` of `<li>` entries. Every interactive part is a native
  `<button type="button">`, so Enter and Space work without custom key handling.
- The current page carries `aria-current="page"` and is still focusable, so a
  keyboard user can land on it and read where they are.
- Each number is labelled `Go to page N`; the arrows are labelled `Go to
  previous page` and `Go to next page` rather than relying on the chevron. The
  ellipsis is `aria-hidden`.
- Disabled arrows use the native `disabled` attribute, which removes them from
  the tab order and dims them through the theme's `disabled:opacity-50`.
- Under `prefers-reduced-motion` the rows and the pill keep their hidden initial
  state but every transition collapses to `{ duration: 0 }`. The pill still
  lands on the new page; it simply does not travel.

## Performance

- `buildPageRange` runs inside a `computed` keyed on page, total and siblings.
  It walks at most `siblings * 2 + 5` slots, so a change costs the same whether
  there are 20 pages or 2,000.
- The active pill is a single shared-layout element. Moving it is a FLIP pass
  that writes `transform`; no layout is read in your code and no observer is
  attached.
- Every visible page is its own `motion.li` keyed by its number, so changing the
  page updates a handful of nodes rather than remounting the list. The stagger
  is `index * 0.03` with no timers.
- The spring is a module-level constant, and the reduced-motion branch returns a
  shared frozen `{ duration: 0 }`. The stagger is a shallow copy adding `delay`,
  rebuilt on list re-render rather than per frame.
- There are no watchers, intervals or `requestAnimationFrame` loops.
