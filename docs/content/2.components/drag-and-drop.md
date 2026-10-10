---
title: Drag and Drop
description: A sortable list, grid or masonry of items that reorder on drag and report the new order.
navigation:
  icon: i-lucide-grip-vertical
---

# Drag and Drop

A drag-and-drop container for an array of items. Drag one onto another and it
takes that one's place, animating the rest of the list into their new positions
along the way. Three layouts are built in ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â list, grid and masonry ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â plus two
extra behaviours for `move` and `copy` modes, where three drop zones appear below
the container.

The container keeps its own copy of your items and reorders that. Your array is
never mutated; the new order is handed back through the `change` event, so the
source of truth stays yours. If you do not write it back, the container resets on
the next `items` change ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â which is why the example writes it straight back.

It is built on the native HTML drag-and-drop API, not on pointer events. That
gives keyboard and touch behaviour from the platform for free on browsers that
implement it, and it means the drag ghost is the browser's own.

The default slot replaces each item's whole appearance. Without a slot you get a
plain bordered card showing `label`, `name` or `id`.

## Usage

Pass `items` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â objects with an `id`, plus anything else your slot needs ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and
handle `change` to adopt the new order. `layout` picks the arrangement; with
`grid`, `columns` and `gap` shape it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="drag-and-drop-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MDragAndDrop
      :items="items"
      item-class="cursor-grab"
      class="rounded-xl border border-dashed border-default p-3"
      @change="onChange"
    >
      <template #default="{ item, isDragging }">
        <div
          class="flex items-center gap-3 rounded-lg border border-default bg-default px-3 py-2.5"
          :class="isDragging ? 'opacity-60' : ''"
        >
          <UIcon
            name="i-lucide-grip-vertical"
            class="size-4 shrink-0 text-dimmed"
          />
          <span class="flex-1 text-sm font-medium">
            {{ item.label }}
          </span>
          <UBadge
            size="sm"
            variant="subtle"
          >
            {{ item.owner }}
          </UBadge>
        </div>
      </template>
    </MDragAndDrop>

    <p class="text-xs text-muted">
      Drag a row onto another to reorder it ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the new order is emitted, not applied
      to your source array.
    </p>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  { id: 'design-tokens', label: 'Design tokens', owner: 'Ana' },
  { id: 'component-audit', label: 'Component audit', owner: 'Ben' },
  { id: 'motion-guidelines', label: 'Motion guidelines', owner: 'Chidi' },
  { id: 'accessibility-pass', label: 'Accessibility pass', owner: 'Dara' },
  { id: 'docs-rewrite', label: 'Docs rewrite', owner: 'Eli' },
])

function onChange(next: { id: string, label: string, owner: string }[]) {
  items.value = [...next]
}
</script>
```
::

## Modes and layouts

`mode` decides what a drop means; `layout` decides how the items sit.

| Mode | Drop zones | What dropping on another item does |
| --- | --- | --- |
| `sort` *(default)* | none | Reorders ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the dragged item takes the target's index. |
| `move` | three | Reorders as above, and dropping on a zone removes the item from the list. |
| `copy` | three | Reorders, and dropping on a zone emits `drop` without removing ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the copy is yours to place. |

| Layout | Arrangement |
| --- | --- |
| `list` *(default)* | Vertical stack with `space-y-2`. |
| `grid` | CSS grid at `columns` columns with a gap derived from `gap`. |
| `masonry` | CSS multi-column at 2/3/4 columns by breakpoint, with `break-inside: avoid` per item. |

Grid and masonry use Tailwind classes assembled at runtime (`grid-cols-${columns}`,
`gap-${gap / 4}`), which means those exact class names must exist in your
stylesheet for the layout to apply. `gap` also means different things in the two:
in `grid` it is a Tailwind step divided by four, while in `masonry` it is a pixel
value applied as an inline `margin-bottom` on each item ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the column gap itself
is a hardcoded `gap-4`.

## Props

::field-group
  ::field{name="items" type="DragItem[]"}
  The items to render. Each needs an `id` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â used as the `layout-id` and the
  selection key ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and may carry anything else your slot reads. The type allows
  `string | number`, but `id` is bound straight to `layout-id`, so prefer a
  string: a numeric id reaches `layout-id` unchanged and logs a Vue prop-type
  warning on every item. Changes are watched deeply and reset the component's
  internal copy, so writing a new array back from `change` is safe.
  ::
  ::field{name="layout" type="'list' | 'grid' | 'masonry'" default="'list'"}
  How the items are arranged. See the table above.
  ::
  ::field{name="mode" type="'sort' | 'move' | 'copy'" default="'sort'"}
  What a drop means, and whether three drop zones are rendered beneath the
  container. In `copy` mode the drag operation is announced to the platform as
  `copy` rather than `move`.
  ::
  ::field{name="disabled" type="boolean" default="false"}
  Blocks dragging ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the container ignores `dragstart` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and dims every item with
  a `cursor-not-allowed` and reduced opacity. Drop handling is not separately
  gated.
  ::
  ::field{name="showHandle" type="boolean" default="false"}
  Renders a grip icon in the item's top-right corner, revealed on hover. It is
  presentation only: dragging still works from anywhere on the item.
  ::
  ::field{name="columns" type="number" default="3"}
  Column count for `layout="grid"`, used to build the `grid-cols-*` class.
  Ignored by the other layouts.
  ::
  ::field{name="gap" type="number" default="16"}
  Spacing, interpreted per layout: a Tailwind step in `grid` (divided by four),
  pixels of `margin-bottom` in `masonry`, unused in `list`.
  ::
  ::field{name="allowMultiSelect" type="boolean" default="false"}
  Turns on click and ctrl/cmd-click selection, tracked in a `Set` of ids and
  reflected with a blue ring. Exposed methods cover the rest ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â see below.
  ::
  ::field{name="animationDuration" type="number" default="0.3"}
  Duration of the spring that settles items into place after a reorder. Read as
  a spring duration, not milliseconds.
  ::
  ::field{name="class" type="string"}
  Appended to the container's own layout classes.
  ::
  ::field{name="itemClass" type="string"}
  Appended to each item's state-derived classes.
  ::
  ::field{name="snapToGrid" type="boolean" default="true"}
  Declared but not wired: nothing in the component reads it, so it has no effect.
  ::
::

## Events

::field-group
  ::field{name="change" type="(items: DragItem[]) => void"}
  The full reordered array, fired after a reorder on an item and ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â in `move` mode
  ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â after a removal via a drop zone. This is the only way the new order gets out;
  your own array is never touched.
  ::
  ::field{name="dragStart" type="(item: DragItem, index: number) => void"}
  Fired when a drag begins, with the item and the index it started from.
  ::
  ::field{name="dragEnd" type="(item: DragItem, oldIndex: number, newIndex: number) => void"}
  Fired after a successful reorder, with where the item came from and where it
  landed. Not fired when the drag ends without a valid target.
  ::
  ::field{name="drop" type="(item: DragItem, zone: number) => void"}
  Fired when an item is dropped on one of the three drop zones, with the zero-based
  zone index. Only meaningful when `mode` is `move` or `copy`.
  ::
  ::field{name="select" type="(item: DragItem, selected: boolean) => void"}
  Fired on every selection toggle, with the item and whether it is now selected.
  Requires `allowMultiSelect`.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  Replaces each item's content, scoped with `{ item, index, isDragging, isOver,
  isSelected }` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the three booleans reflect live drag state, so a slot can react
  to a drag without tracking it itself. The slot's wrapper is the `motion`
  element that carries the drag handlers; put a real element inside it.
  ::
::

## Accessibility

There is no ARIA on the container or on the items, and no keyboard alternative to
dragging. Items are plain `motion.div` elements with `draggable` set ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â not
focusable, no role, no live region. A keyboard user cannot reorder anything; the
click-to-select path needs a pointer too, since it is bound to `click` and
`mousedown`.

The default card in the fallback slot is a `div`, so when you use the default slot
your items are not buttons or list items either. If the order is meaningful data,
supply a real interactive element in your slot and manage focus and announcements
yourself.

The grip handle revealed by `showHandle` is a decorative `div` with an icon and no
accessible name.

Motion is not reduced: the settle spring runs at `animationDuration` regardless of
`prefers-reduced-motion`. The dragged item's `scale-105` and `rotate` are CSS
transitions on the same terms.

## Performance

- Each item is a `motion` element with a stable `layout-id` and `:initial="false"`,
  so the reorder animation is a layout transition on already-mounted nodes rather
  than a mount/unmount cycle.
- All state is local: `sortedItems` is a ref, `selectedItems` a `Set`, and drag
  state a single `reactive` object. Nothing is emitted per frame.
- `items` is watched with `deep: true`, so in-place mutations to your array do
  reset the internal copy ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â at the cost of a full traversal of the array on change.
- `getItemStyles` returns an empty object for every layout except `masonry`, so
  the style binding is a no-op write in the common case.
- `dragleave` clears the drop target through a 10ms `setTimeout` so that moving
  onto a child element does not clear it mid-drag ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the one timer in the
  component.

::tip
Reordering is all-or-nothing on `dragend`: the target index is whatever was last
under the pointer, so a drag released over empty space does nothing and a drag
released mid-transition commits immediately. If you need a dedicated drop
affordance between rows, `mode: 'move'` or `'copy'` with the built-in zones is
the more predictable path.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dragAndDrop` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'drag-drop-container relative min-h-32'` |
| `item` | `'drag-item group relative cursor-pointer transition-all duration-200'` |
| `itemDefault` | `'p-4 bg-default rounded-lg border border-default'` |
| `itemHandle` | `'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab'` |
| `itemHandleIcon` | `'w-4 h-4 text-dimmed'` |
| `dropZone` | `'drop-zone min-h-24 border-2 border-dashed border-default dark:border-default rounded-lg flex items-center justify-center transition-all duration-200'` |
| `dropZoneContent` | `'text-center text-muted'` |
| `dropZoneIcon` | `'w-6 h-6 mx-auto mb-2'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.dragAndDrop` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `drag-drop-container relative min-h-32` |
| `item` | `drag-item group relative cursor-pointer transition-all duration-200` |
| `itemDefault` | `p-4 bg-default rounded-lg border border-default` |
| `itemHandle` | `absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab` |
| `itemHandleIcon` | `w-4 h-4 text-dimmed` |
| `dropZone` | `drop-zone min-h-24 border-2 border-dashed border-default dark:border-default rounded-lg flex items-center justify-center transition-all duration-200` |
| `dropZoneContent` | `text-center text-muted` |
| `dropZoneIcon` | `w-6 h-6 mx-auto mb-2` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.dragAndDrop` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `drag-drop-container relative min-h-32` |
| `item` | `drag-item group relative cursor-pointer transition-all duration-200` |
| `itemDefault` | `p-4 bg-default rounded-lg border border-default` |
| `itemHandle` | `absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab` |
| `itemHandleIcon` | `w-4 h-4 text-dimmed` |
| `dropZone` | `drop-zone min-h-24 border-2 border-dashed border-default dark:border-default rounded-lg flex items-center justify-center transition-all duration-200` |
| `dropZoneContent` | `text-center text-muted` |
| `dropZoneIcon` | `w-6 h-6 mx-auto mb-2` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dragAndDrop` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `drag-drop-container relative min-h-32` |
| `item` | `drag-item group relative cursor-pointer transition-all duration-200` |
| `itemDefault` | `p-4 bg-default rounded-lg border border-default` |
| `itemHandle` | `absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab` |
| `itemHandleIcon` | `w-4 h-4 text-dimmed` |
| `dropZone` | `drop-zone min-h-24 border-2 border-dashed border-default dark:border-default rounded-lg flex items-center justify-center transition-all duration-200` |
| `dropZoneContent` | `text-center text-muted` |
| `dropZoneIcon` | `w-6 h-6 mx-auto mb-2` |
