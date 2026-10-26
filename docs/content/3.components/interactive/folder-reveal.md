---
title: Folder Reveal
description: A folder with a tab, a front flap and cards that fan out of the gap when it opens.
---

A folder is a physical object, and its silhouette is most of the recognition: the
tab on the back panel, the front flap, the way that flap tilts toward you instead
of sliding away. Cards that fan out of that gap read as contents. A grid with a
folder icon in the corner does not.

The back panel is one SVG path, so the tab is part of the shape rather than a
second element that has to stay aligned at every size. The flap sits above the
cards, which is what sells the illusion: the sheets emerge from behind it instead
of sliding over the front.

The default trigger is `hover`, because reaching for a folder is a hover gesture.
A touch screen has no hover, so a tap toggles instead of leaving the folder
permanently shut.

## Usage

`items` are what fans out. The `card` slot receives the item and its index, so a
sheet can render a title, a date, a diff - anything with the card's own box as its
frame.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="folder-reveal-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-6 py-4">
    <MFolderReveal
      label="Releases"
      :items="items"
    >
      <template #card="{ item }">
        <div class="flex h-full w-full flex-col gap-0.5 p-2">
          <span class="truncate text-[11px] font-semibold text-highlighted">{{ item.label }}</span>
          <span class="truncate text-[10px] leading-tight text-muted">{{ item.detail }}</span>
        </div>
      </template>
    </MFolderReveal>

    <p class="text-xs text-muted">
      Hover the folder, or Tab to it and press Enter.
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * Release notes are a natural fit: four sheets you would otherwise see as four
 * rows in a table, stacked into the object they actually belong to.
 */
const items = [
  { id: '2-4', label: 'v2.4', detail: 'Streams' },
  { id: '2-3', label: 'v2.3', detail: 'Rings' },
  { id: '2-2', label: 'v2.2', detail: 'Meter' },
  { id: '2-1', label: 'v2.1', detail: 'Branch' },
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
    <component-example name="folder-reveal-custom" />
  :::
#code
  <PlaygroundCode name="FolderReveal" />
::

## Props

::component-props
  ::component-prop{name="items" type="FolderRevealItem[]"}
  Required. `{ id, label, color? }` sheets. The `id` keys each card, so reordering
  the list re-fans without remounting the surfaces.
  ::
  ::component-prop{name="label" type="string" default="'Folder'"}
  Printed on the tab, and used as the flap's accessible name.
  ::
  ::component-prop{name="color" type="'manila' | 'rose' | 'blue' | 'green' | 'slate'" default="'manila'"}
  The paper skin: six `oklch` stops for the back panel, the flap, the edge and the
  tab text, rather than one background colour. The cards stay `bg-default` unless
  an item sets its own `color`.
  ::
  ::component-prop{name="trigger" type="'hover' | 'click'" default="'hover'"}
  `hover` opens under a mouse and toggles on tap for touch. `click` needs a click
  everywhere, which is the right choice inside an editor where hover is already
  overloaded.
  ::
  ::component-prop{name="size" type="number" default="260"}
  Folder width in pixels. Height, card width and every offset are derived from it,
  so one number resizes the whole object.
  ::
  ::component-prop{name="spread" type="number" default="62"}
  Horizontal distance between fanned cards, in pixels.
  ::
  ::component-prop{name="rotation" type="number" default="7"}
  Degrees each card turns as the fan opens. Alternating signs are applied
  internally, so a positive value always means "spread outward".
  ::
  ::component-prop{name="defaultOpen" type="boolean" default="false"}
  Start open. Ignored once `open` is bound.
  ::
  ::component-prop{name="open" type="boolean"}
  Controlled open state. Leave undefined to let the component own it.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper that establishes the folder's box.
  ::
::

## Events

::component-events
  ::component-event{name="update:open" payload="[open: boolean]"}
  The folder opened or closed, by hover, tap, click, Enter or Space. Emitted
  whether or not `open` is bound.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="card" props="[index: number, item: FolderRevealItem]"}
  The contents of one sheet. It replaces the default `label` text but not the
  card's box, position or motion - those stay with the component, so a custom
  card cannot fall out of the fan.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.folderReveal` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The folder's box, sized from `size`.
  ::
  ::component-slot-row{name="shadow"}
  The contact shadow under the folder. It softens and widens as the folder opens,
  which is what lifts the object off the page.
  ::
  ::component-slot-row{name="back"}
  The SVG back panel and its tab, filled with the skin's gradient.
  ::
  ::component-slot-row{name="tabLabel"}
  The text on the tab. `aria-hidden`; the flap's `aria-label` already names the
  folder.
  ::
  ::component-slot-row{name="well"}
  The inner shadow the sheets sit in. It is the difference between a folder and a
  coloured rectangle.
  ::
  ::component-slot-row{name="cards"}
  The fan's container. `aria-hidden` while the folder is shut, so the hidden
  sheets are not read out.
  ::
  ::component-slot-row{name="card"}
  One sheet. Its own surface colour, ring and shadow.
  ::
  ::component-slot-row{name="cardLabel"}
  The default card content: the item's `label`, centred.
  ::
  ::component-slot-row{name="flap"}
  The front panel, which is also the button.
  ::
::

## Accessibility

- The flap is a real `<button type="button">` with `aria-expanded` and
  `aria-controls` pointing at the card container, so the open state is announced
  rather than inferred from the animation.
- The cards are `aria-hidden` while the folder is shut: they are behind the flap
  and should not be reachable in the reading order.
- In `hover` mode, Enter and Space toggle explicitly, and the key event is
  prevented so the button's native click does not toggle the folder straight
  back. In `click` mode the button's own activation does the work.
- Focus opens the folder only when the flap matches `:focus-visible`, so clicking
  with a mouse does not leave the folder open after the pointer has moved on.
- Tapping toggles in `hover` mode as well. A touch screen never fires hover, and
  without the fallback the folder would be permanently shut on a phone.
- The back panel, the shadow, the tab label and the inner well are `aria-hidden`:
  they are the drawing, not the content.
- The silhouette is not the only state signal - `aria-expanded` carries it, and
  the flap keeps a visible focus ring.
- Under `prefers-reduced-motion: reduce` the cards appear in place with no fan
  travel and no rotation.

## Performance

- The fan only animates transform properties - `x`, `y`, `rotate`, `scale` - plus
  opacity, so the sheets never trigger layout.
- The back panel is a single SVG path with the tab included. There is no second
  element to position, and nothing to keep aligned as `size` changes.
- `size` derives the height, card width and vertical offsets, so resizing is one
  recomputation instead of a set of props that can disagree.
- Cards are keyed by item id, so sorting the items re-fans without remounting the
  sheets.
- The stagger is a per-index delay on one shared spring, not a timeline, so a
  slow device does not fall behind a queue of scheduled animations.
