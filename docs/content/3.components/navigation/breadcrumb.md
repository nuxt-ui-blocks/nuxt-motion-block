---
title: Breadcrumb
description: A path trail whose crumbs spring in from the left with a short stagger.
---

A trail built from a plain `<nav>` and an ordered list. Each crumb is a
`motion.li` that starts 4px to the left at zero opacity and springs into place
with a 40ms stagger, so a longer path reads as a short cascade instead of a
block of text appearing at once.

The last item is always the current page. It renders as a `<span
aria-current="page">` even when it carries an `href`, because a link to the page
you are already on is noise. Everything before it becomes a link when `href` is
set and plain text otherwise.

## Usage

Pass an ordered `items` array of `{ label, href }`. The final entry is treated as
the current page; everything before it renders as a link when `href` is present.
The separator defaults to a chevron and can be changed with any icon name.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="breadcrumb-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-10">
    <MBreadcrumb :items="items" />
  </div>
</template>

<script setup lang="ts">
const items = [
  { label: 'Docs', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Navigation', href: '#' },
  { label: 'Breadcrumb' },
]
</script>
```
::

## Customize

`separator` takes a Nuxt UI icon name, so swapping a chevron for a slash or an
arrow is a one-word change. `ariaLabel` names the landmark; set it to something
specific when more than one trail can appear on a page. The JSON control edits
the `items` array in place, which is the quickest way to see how the stagger
scales with length.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="breadcrumb-custom" />
  :::
#code
  <PlaygroundCode name="Breadcrumb" />
::

## Props

::component-props
  ::component-prop{name="items" type="{ label: string, href?: string }[]" required}
  Ordered crumbs. The last entry is the current page and never renders as a link.
  Items are keyed by position and `href`, so appending a crumb mounts only the
  new one instead of replaying the whole trail.
  ::
  ::component-prop{name="separator" type="string" default="'i-lucide-chevron-right'"}
  Icon name for the glyph between crumbs. It is rendered inside an
  `aria-hidden` span, so the choice is purely visual.
  ::
  ::component-prop{name="ariaLabel" type="string" default="'Breadcrumb'"}
  Accessible name for the `<nav>` landmark.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root `<nav>`. The trail is `inline-flex`, so it sizes to
  its content.
  ::
  ::component-prop{name="ui" type="Record<string, any>"}
  Per-slot classes merged over the theme defaults. See [UI](#ui) for the slot
  list.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="separator"}
  Replaces the separator glyph. The wrapper keeps `aria-hidden="true"`, so this
  is the place for decorative markup such as a custom divider, not for text that
  carries meaning.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.breadcrumb` in `app.config.ts`.

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
  The `<ol>` that lays the crumbs out in a row.
  ::
  ::component-slot-row{name="item"}
  The `motion.li` around one crumb and its leading separator.
  ::
  ::component-slot-row{name="separator"}
  The `aria-hidden` span before a crumb.
  ::
  ::component-slot-row{name="link"}
  An anchor crumb with an `href`.
  ::
  ::component-slot-row{name="current"}
  The final crumb, marked with `aria-current="page"`.
  ::
  ::component-slot-row{name="plain"}
  A crumb without an `href` that is not the last one.
  ::
::

## Accessibility

- The trail is a `<nav>` with a configurable accessible name, wrapped around an
  `<ol>`, so a screen reader announces the number of steps and the position of
  each one.
- Only the final crumb carries `aria-current="page"`. A crumb without an `href`
  that is not last renders as text rather than a dead link.
- Separators are `aria-hidden`, so they are not read out between labels.
- The entrance animates `opacity` and `x` on the list items. No text is
  duplicated, hidden or split, so the accessible name of every crumb is exactly
  its label.
- Under `prefers-reduced-motion` the hidden `initial` state is kept and the
  transition collapses to `{ duration: 0 }`. The crumbs still land in their
  final position within one frame; only the travel and the stagger disappear.

## Performance

- The stagger is arithmetic on the index — one shared spring plus a
  `delay: index * 0.04`. There are no timers, watchers or per-item state.
- Only `opacity` and `x` are animated, both of which the compositor can handle
  without layout work, and the list never changes size during the entrance.
- Nothing is measured: no `ResizeObserver`, no `scrollHeight` reads and no
  pointer listeners. A static trail costs nothing after it settles.
- The spring is a module-level constant; each item's transition is a shallow
  copy that only adds `delay`, rebuilt on list re-render rather than per frame.
  Under reduced motion every item shares the same frozen zero-duration object.
