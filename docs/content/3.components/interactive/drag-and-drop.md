---
title: Drag and Drop
description: A sortable list, grid or masonry of items that reorder on drag and report the new order.
---

A drag-and-drop container for an array of items. Drag one row onto another and it
drops into the gap you are hovering — before or after the item under the pointer,
chosen from which half of it you are over — with a primary-coloured indicator
marking where it will land. The split follows the layout: list and masonry read
the vertical half, while grid reads the diagonal, so a card dropped past an item's
bottom-right corner lands after it and anywhere else lands before. The indicator
is drawn as an overlay, so the list itself never reflows mid-drag. Three layouts
are built in — list, grid and masonry — plus two extra behaviours for `move` and
`copy` modes, where three drop zones appear below the container.

The container keeps its own copy of your items and reorders that. Your array is
never mutated; the new order is handed back through the `change` event, so the
source of truth stays yours. If you do not write it back, the container resets on
the next `items` change — which is why the example writes it straight back.

It is built on the native HTML drag-and-drop API, not on pointer events. That
gives keyboard and touch behaviour from the platform for free on browsers that
implement it, and it means the drag ghost is the browser's own.

The default slot replaces each item's whole appearance. Without a slot you get a
plain bordered card showing `label`, `name` or `id`.

## Usage

Pass `items` — objects with an `id`, plus anything else your slot needs — and
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
      Drag a row onto another to reorder it — the new order is emitted, not applied
      to your source array.
    </p>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  { id: 'design-tokens', label: 'Style tokens', owner: 'Ana' },
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


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="drag-and-drop-custom" />
  :::
#code
  <PlaygroundCode name="DragAndDrop" />
::

## Modes and layouts

`mode` decides what a drop means; `layout` decides how the items sit.

| Mode | Drop zones | What dropping on another item does |
| --- | --- | --- |
| `sort` *(default)* | none | Reorders — the item lands in the gap above or below the row under the pointer, marked by an inline indicator. |
| `move` | three | Reorders as above, and dropping on a zone removes the item from the list. |
| `copy` | three | Reorders, and dropping on a zone emits `drop` without removing — the copy is yours to place. |

| Layout | Arrangement |
| --- | --- |
| `list` *(default)* | Vertical stack with `space-y-2`. |
| `grid` | CSS grid at `columns` columns with a gap derived from `gap`. |
| `masonry` | CSS multi-column at 2/3/4 columns by breakpoint, with `break-inside: avoid` per item. |

Grid and masonry use Tailwind classes assembled at runtime (`grid-cols-${columns}`,
`gap-${gap / 4}`), which means those exact class names must exist in your
stylesheet for the layout to apply. `gap` also means different things in the two:
in `grid` it is a Tailwind step divided by four, while in `masonry` it is a pixel
value applied as an inline `margin-bottom` on each item — the column gap itself
is a hardcoded `gap-4`.

Switch both at runtime to compare them:

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="drag-and-drop-modes" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <div class="flex gap-1 rounded-lg bg-elevated p-1">
        <UButton
          v-for="option in modes"
          :key="option"
          size="xs"
          :color="mode === option ? 'primary' : 'neutral'"
          :variant="mode === option ? 'solid' : 'ghost'"
          @click="mode = option"
        >
          {{ option }}
        </UButton>
      </div>

      <div class="flex gap-1 rounded-lg bg-elevated p-1">
        <UButton
          v-for="option in layouts"
          :key="option"
          size="xs"
          :color="layout === option ? 'primary' : 'neutral'"
          :variant="layout === option ? 'solid' : 'ghost'"
          @click="layout = option"
        >
          {{ option }}
        </UButton>
      </div>
    </div>

    <MDragAndDrop
      :items="items"
      :layout="layout"
      :mode="mode"
      :columns="3"
      :gap="16"
      class="min-h-40"
      @change="onChange"
    >
      <template #default="{ item, isDragging }">
        <div
          class="flex h-full flex-col justify-between gap-2 rounded-lg border border-default bg-default p-3"
          :class="isDragging ? 'opacity-60' : ''"
        >
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-grip-vertical"
              class="size-4 shrink-0 text-dimmed"
            />
            <span class="text-sm font-medium text-highlighted">{{ item.label }}</span>
          </div>
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
      <code>mode</code> = {{ mode }} · <code>layout</code> = {{ layout }}
      <template v-if="mode !== 'sort'">
        — drag onto one of the three zones to {{ mode === 'move' ? 'remove' : 'copy' }} the item.
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
type Mode = 'sort' | 'move' | 'copy'
type Layout = 'list' | 'grid' | 'masonry'

const modes: Mode[] = ['sort', 'move', 'copy']
const layouts: Layout[] = ['list', 'grid', 'masonry']

const mode = ref<Mode>('sort')
const layout = ref<Layout>('grid')

const items = ref([
  { id: 'design-tokens', label: 'Style tokens', owner: 'Ana' },
  { id: 'component-audit', label: 'Component audit', owner: 'Ben' },
  { id: 'motion-guidelines', label: 'Motion guidelines', owner: 'Chidi' },
  { id: 'accessibility-pass', label: 'Accessibility pass', owner: 'Dara' },
  { id: 'docs-rewrite', label: 'Docs rewrite', owner: 'Eli' },
  { id: 'release-notes', label: 'Release notes', owner: 'Fay' },
])

function onChange(next: { id: string, label: string, owner: string }[]) {
  items.value = [...next]
}
</script>
```
::

## Grid

`layout="grid"` with `columns` and `gap` arranges the items into a responsive grid. The cards reorder the same way, and `change` hands back the new order. Because a pointer can leave a card through any side, the drop position comes from the pointer's diagonal half: past the bottom-right corner inserts after the card, anywhere else inserts before it.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="drag-and-drop-grid" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col gap-4">
    <MDragAndDrop
      :items="items"
      layout="grid"
      :columns="3"
      :gap="16"
      @change="onChange"
    >
      <template #default="{ item, isDragging }">
        <div
          class="flex h-full flex-col items-center gap-1 rounded-lg border border-default bg-default p-4 text-center"
          :class="isDragging ? 'opacity-60' : ''"
        >
          <span class="text-sm font-medium text-highlighted">{{ item.name }}</span>
          <span class="text-xs text-muted">{{ item.category }}</span>
        </div>
      </template>
    </MDragAndDrop>

    <p class="text-xs text-muted">
      Drag a card onto another to reorder the grid.
    </p>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  { id: 'project-a', name: 'Project A', category: 'Development' },
  { id: 'project-beta', name: 'Project Beta', category: 'Design' },
  { id: 'project-gamma', name: 'Project Gamma', category: 'Marketing' },
  { id: 'project-d', name: 'Project D', category: 'Development' },
  { id: 'project-delta', name: 'Project Delta', category: 'Design' },
  { id: 'project-omega', name: 'Project Omega', category: 'Marketing' },
])

function onChange(next: { id: string, name: string, category: string }[]) {
  items.value = [...next]
}
</script>
```
::

## Multi-select

With `allowMultiSelect`, a click toggles an item and ctrl/cmd-click extends the selection; the component rings the selected items itself and reports each toggle through `select`. Dragging any selected item moves the whole selection as one block, in its current order, and a lone unselected item still drags on its own. The exposed `selectAll`, `clearSelection` and `getSelected` methods drive the rest.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="drag-and-drop-multi-select" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex items-center gap-2">
      <UButton
        size="sm"
        color="neutral"
        variant="subtle"
        @click="selectAll"
      >
        Select all
      </UButton>
      <UButton
        size="sm"
        color="neutral"
        variant="subtle"
        @click="clearSelection"
      >
        Clear
      </UButton>
      <span class="text-xs text-muted">{{ selected.length }} selected</span>
    </div>

    <MDragAndDrop
      ref="dragDropRef"
      :items="items"
      :allow-multi-select="true"
      @select="onSelect"
    >
      <template #default="{ item, isSelected, isDragging }">
        <div
          class="flex items-center gap-3 rounded-lg border border-default bg-default px-3 py-2.5"
          :class="isDragging ? 'opacity-60' : ''"
        >
          <span
            class="flex size-4 shrink-0 items-center justify-center rounded border transition-colors"
            :class="isSelected ? 'border-primary bg-primary text-inverted' : 'border-accented'"
          >
            <UIcon
              v-if="isSelected"
              name="i-lucide-check"
              class="size-3"
            />
          </span>
          <UIcon
            name="i-lucide-grip-vertical"
            class="size-4 shrink-0 text-dimmed"
          />
          <div class="min-w-0">
            <div class="text-sm font-medium text-highlighted">
              {{ item.name }}
            </div>
            <div class="text-xs text-muted">
              {{ item.status }}
            </div>
          </div>
        </div>
      </template>
    </MDragAndDrop>

    <p class="text-xs text-muted">
      Click a row to toggle it; ctrl/cmd-click to select several. The exposed
      <code>selectAll</code> and <code>clearSelection</code> methods drive the buttons.
    </p>
  </div>
</template>

<script setup lang="ts">
const dragDropRef = ref<{ clearSelection: () => void, selectAll: () => void }>()

const items = ref([
  { id: 'stage-1', name: 'Stage 1', status: 'In Progress' },
  { id: 'stage-2', name: 'Stage 2', status: 'Completed' },
  { id: 'stage-3', name: 'Stage 3', status: 'Pending' },
  { id: 'stage-4', name: 'Stage 4', status: 'In Progress' },
])

const selected = ref<string[]>([])

function onSelect(item: { id: string, name: string, status: string }, isSelected: boolean) {
  selected.value = isSelected
    ? [...selected.value, item.id]
    : selected.value.filter(id => id !== item.id)
}

function clearSelection() {
  dragDropRef.value?.clearSelection()
  selected.value = []
}

function selectAll() {
  dragDropRef.value?.selectAll()
  selected.value = items.value.map(item => item.id)
}
</script>
```
::

## Props

::component-props
  ::component-prop{name="items" type="DragItem[]"}
  The items to render. Each needs an `id` — used as the `layout-id` and the
  selection key — and may carry anything else your slot reads. The type allows
  `string | number`, but `id` is bound straight to `layout-id`, so prefer a
  string: a numeric id reaches `layout-id` unchanged and logs a Vue prop-type
  warning on every item. Changes are watched deeply and reset the component's
  internal copy, so writing a new array back from `change` is safe.
  ::
  ::component-prop{name="layout" type="'list' | 'grid' | 'masonry'" default="'list'"}
  How the items are arranged. See the table above.
  ::
  ::component-prop{name="mode" type="'sort' | 'move' | 'copy'" default="'sort'"}
  What a drop means, and whether three drop zones are rendered beneath the
  container. In `copy` mode the drag operation is announced to the platform as
  `copy` rather than `move`.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Blocks dragging — the container ignores `dragstart` — and dims every item with
  a `cursor-not-allowed` and reduced opacity. Drop handling is not separately
  gated.
  ::
  ::component-prop{name="showHandle" type="boolean" default="false"}
  Renders a grip icon in the item's top-right corner, revealed on hover. It is
  presentation only: dragging still works from anywhere on the item.
  ::
  ::component-prop{name="columns" type="number" default="3"}
  Column count for `layout="grid"`, used to build the `grid-cols-*` class.
  Ignored by the other layouts.
  ::
  ::component-prop{name="gap" type="number" default="16"}
  Spacing, interpreted per layout: a Tailwind step in `grid` (divided by four),
  pixels of `margin-bottom` in `masonry`, unused in `list`.
  ::
  ::component-prop{name="allowMultiSelect" type="boolean" default="false"}
  Turns on click and ctrl/cmd-click selection, tracked in a `Set` of ids and
  reflected with a blue ring. Exposed methods cover the rest — see below.
  ::
  ::component-prop{name="animationDuration" type="number" default="0.3"}
  Duration of the spring that settles items into place after a reorder. Read as
  a spring duration, not milliseconds.
  ::
  ::component-prop{name="class" type="string"}
  Appended to the container's own layout classes.
  ::
  ::component-prop{name="itemClass" type="string"}
  Appended to each item's state-derived classes.
  ::
  ::component-prop{name="snapToGrid" type="boolean" default="true"}
  Declared but not wired: nothing in the component reads it, so it has no effect.
  ::
::

## Events

::component-events
  ::component-event{name="change" type="(items: DragItem[]) => void"}
  The full reordered array, fired after a reorder on an item and — in `move` mode
  — after a removal via a drop zone. This is the only way the new order gets out;
  your own array is never touched.
  ::
  ::component-event{name="dragStart" type="(item: DragItem, index: number) => void"}
  Fired when a drag begins, with the item and the index it started from.
  ::
  ::component-event{name="dragEnd" type="(item: DragItem, oldIndex: number, newIndex: number) => void"}
  Fired after a successful reorder, with where the item came from and where it
  landed. Not fired when the drag ends without a valid target.
  ::
  ::component-event{name="drop" type="(item: DragItem, zone: number) => void"}
  Fired when an item is dropped on one of the three drop zones, with the zero-based
  zone index. Only meaningful when `mode` is `move` or `copy`.
  ::
  ::component-event{name="select" type="(item: DragItem, selected: boolean) => void"}
  Fired on every selection toggle, with the item and whether it is now selected.
  Requires `allowMultiSelect`.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Replaces each item's content, scoped with `{ item, index, isDragging, isOver,
  isSelected }` — the three booleans reflect live drag state, so a slot can react
  to a drag without tracking it itself. The slot's wrapper is the `motion`
  element that carries the drag handlers; put a real element inside it.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dragAndDrop` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `drag-drop-container relative min-h-32`
  ::
  ::component-slot-row{name="item"}
  `drag-item group relative cursor-pointer transition-all duration-200`
  ::
  ::component-slot-row{name="itemDefault"}
  `p-4 bg-default rounded-lg border border-default`
  ::
  ::component-slot-row{name="itemHandle"}
  `absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab`
  ::
  ::component-slot-row{name="itemHandleIcon"}
  `w-4 h-4 text-dimmed`
  ::
  ::component-slot-row{name="dropIndicator"}
  `h-1 shrink-0 rounded-full bg-primary shadow-[0_0_0_2px_var(--ui-bg)] animate-pulse`
  ::
  ::component-slot-row{name="dropZone"}
  `drop-zone min-h-24 border-2 border-dashed border-default dark:border-default rounded-lg flex items-center justify-center transition-all duration-200`
  ::
  ::component-slot-row{name="dropZoneContent"}
  `text-center text-muted`
  ::
  ::component-slot-row{name="dropZoneIcon"}
  `w-6 h-6 mx-auto mb-2`
  ::
::

## Accessibility

There is no ARIA on the container or on the items, and no keyboard alternative to
dragging. Items are plain `motion.div` elements with `draggable` set — not
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
  reset the internal copy — at the cost of a full traversal of the array on change.
- `getItemStyles` returns an empty object for every layout except `masonry`, so
  the style binding is a no-op write in the common case.
- The drop indicator is absolutely positioned, so revealing or moving it costs no
  layout and the list never shifts under the pointer. `dragover` writes nothing
  when the gap it resolves to has not changed, and `dragleave` clears the target
  only when the pointer actually leaves the container — checked against
  `relatedTarget` — rather than on every leave, which would blink the indicator.

::tip
Reordering commits on `dragend` using the gap recorded under the pointer, so the
row drops exactly where the inline indicator sat when you let go. A drag released
over empty space, back onto its own row, or anywhere inside a multi-selection that
is already moving is a no-op — the new order is only emitted when it actually
changes. The inline indicator is rendered for `layout="list"`; `grid` and
`masonry` fall back to a ring on the hovered row. For an explicit target outside
the row order itself, `mode: 'move'` or `'copy'` gives you the built-in zones
instead.
::

