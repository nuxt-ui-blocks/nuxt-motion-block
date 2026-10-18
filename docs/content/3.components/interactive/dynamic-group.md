---
title: Dynamic Group
description: Lays out a reactive array of items as a grid, row or column and animates entries, exits and reflow.
---

A container for a list that changes while the user is looking at it. Items enter
by scaling up from 0.8 and rising 20px, exit by scaling down and rising out, and
everything else slides to its new position via a layout animation.

The container picks its own layout from `direction`: `grid` (the default) for a
`columns`-wide grid, `row` for a wrapping flex row, `column` for a vertical
stack. All three add a 4-unit gap.

Items are keyed by `keyField`, which is what lets the component tell "this item
moved" from "this item is new". Without a stable key it falls back to
`JSON.stringify(item)`, which is correct but means any change to an item's
contents looks like a removal plus an insertion, and you get two animations
instead of one.

The default slot renders each item; with no slot the component falls back to a
`UCard` containing `{{ item }}`, which is only sensible for arrays of primitives.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dynamic-group-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MDynamicGroup
      :items="items"
      direction="grid"
      :columns="3"
      key-field="name"
      @remove="onRemove"
    >
      <template #default="{ item, remove }">
        <div class="flex items-center justify-between gap-2 rounded-xl border border-default bg-default px-3 py-2">
          <div class="flex min-w-0 items-center gap-2">
            <UAvatar
              size="xs"
              :src="item.src"
              :alt="item.name"
            />
            <span class="truncate text-sm text-default">{{ item.name }}</span>
          </div>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            :aria-label="`Remove ${item.name}`"
            @click.stop="remove()"
          />
        </div>
      </template>
    </MDynamicGroup>

    <UButton
      label="Add member"
      icon="i-lucide-user-plus"
      variant="outline"
      class="justify-center"
      @click="addMember"
    />
  </div>
</template>

<script setup lang="ts">
interface Member {
  id: number
  name: string
  src: string
}

const pool: Member[] = [
  { id: 1, name: 'Ana Ruiz', src: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Ben Osei', src: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Cleo Park', src: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 4, name: 'Dmitri Ilves', src: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { id: 5, name: 'Elin Haugen', src: 'https://randomuser.me/api/portraits/women/90.jpg' },
  { id: 6, name: 'Farid Nazari', src: 'https://randomuser.me/api/portraits/men/11.jpg' },
]

const items = ref<Member[]>(pool.slice(0, 4))

function onRemove(index: number) {
  items.value = items.value.filter((_, i) => i !== index)
}

function addMember() {
  const next = pool.find(member => !items.value.some(item => item.id === member.id))
  if (!next) return
  items.value = [...items.value, next]
}
</script>
```
::

The `remove` function in the slot scope emits `remove` with the item's index — it
does **not** mutate `items` for you. The parent owns the array, so it is the
parent that filters it, as `onRemove` does above.


## Direction

`direction` switches the layout between `grid`, `row` and `column` — the same
items are re-laid-out in place, so each one slides to its new spot rather than
remounting. `columns` only applies to the grid.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dynamic-group-direction" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="option in directions"
        :key="option"
        size="sm"
        :variant="direction === option ? 'solid' : 'soft'"
        :color="direction === option ? 'primary' : 'neutral'"
        class="capitalize"
        @click="direction = option"
      >
        {{ option }}
      </UButton>

      <UButton
        size="sm"
        variant="soft"
        color="neutral"
        icon="i-lucide-plus"
        class="ml-auto"
        @click="add"
      >
        Add
      </UButton>
    </div>

    <MDynamicGroup
      :items="items"
      :direction="direction"
      :columns="3"
      key-field="id"
    >
      <template #default="{ item, remove }">
        <div class="flex items-center justify-between gap-3 rounded-lg border border-default bg-default px-3 py-2">
          <span class="text-sm font-medium">{{ item.label }}</span>
          <button
            type="button"
            class="text-dimmed transition-colors hover:text-highlighted"
            :aria-label="`Remove ${item.label}`"
            @click="remove()"
          >
            <UIcon
              name="i-lucide-x"
              class="size-4"
            />
          </button>
        </div>
      </template>
    </MDynamicGroup>

    <p class="text-xs text-dimmed">
      Switching <code>direction</code> re-lays-out the same items in place — the layout animation slides each one to its new spot.
    </p>
  </div>
</template>

<script setup lang="ts">
type Direction = 'grid' | 'row' | 'column'

interface Chip {
  id: number
  label: string
}

const directions: Direction[] = ['grid', 'row', 'column']
const direction = ref<Direction>('grid')

const pool: Chip[] = [
  { id: 1, label: 'Design' },
  { id: 2, label: 'Engineering' },
  { id: 3, label: 'Marketing' },
  { id: 4, label: 'Research' },
  { id: 5, label: 'Support' },
  { id: 6, label: 'Sales' },
]

const items = ref<Chip[]>(pool.slice(0, 4))

function add() {
  const next = pool.find(chip => !items.value.some(item => item.id === chip.id))
  if (next) {
    items.value = [...items.value, next]
  }
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
    <component-example name="dynamic-group-custom" />
  :::
#code
  <PlaygroundCode name="DynamicGroup" />
::

## Props

::component-props
  ::component-prop{name="items" type="any[]" required}
  The list to render. Items are typed `any` — strings, numbers and objects all
    work, but the shape only matters to your slot and to `keyField`.
  ::
  ::component-prop{name="keyField" type="string" default="'id'"}
  The property read off each item to build its Vue key. If the property is
  missing, the component falls back to `JSON.stringify(item)`, and a primitive
  item is used directly as its own key.
  ::
  ::component-prop{name="layout" type="boolean" default="true"}
  Enables Motion's layout animation, which is what makes the remaining items
  slide into place when one leaves. Set it to `false` to skip reflow
  measurement — cheaper, but items will jump.
  ::
  ::component-prop{name="direction" type="'row' | 'column' | 'grid'" default="'grid'"}
  `grid` emits `grid grid-cols-N gap-4`, `row` emits `flex flex-wrap gap-4`, and
  `column` emits `space-y-4`. Any other value falls through to the column layout.
  ::
  ::component-prop{name="columns" type="number" default="3"}
  Grid column count, used only when `direction="grid"`. The class is built as
  `grid-cols-${columns}` at runtime, so Tailwind cannot see it in your source —
  see the tip below.
  ::
::

## Events

::component-events
  ::component-event{name="remove" type="(index: number) => void"}
  Emitted with the index of the item to remove, from the slot's `remove()`
  function. The array is not modified by the component.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default" type="{ item: any, index: number, remove: () => void }"}
  Renders one item. `remove` emits the `remove` event with `index` already bound.
    The fallback content — a `UCard` with the item interpolated as text — is
    used when the slot is omitted.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dynamicGroup` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative`
  ::
  ::component-slot-row{name="item"}
  `will-change-transform`
  ::
::

## Accessibility

The component renders a bare `div` with layout classes and no semantics, and the
items are plain `div`s. That is the right level of abstraction for a layout
primitive, but it means *you* own the meaning: give the container a `role="list"`
and each item `role="listitem"` if the content is a list, or leave both off if it
is a set of unrelated controls like the example above.

Nothing is focus-managed. When an item is removed while it holds focus, focus
falls back to `body`, so if your items are focusable, move focus deliberately in
your `remove` handler.

There is no reduced-motion handling. Layout animations and the scale/rise
transitions run regardless of `prefers-reduced-motion`, so guard the component
yourself if motion is a concern.

## Performance

- Layout animation requires the browser to measure positions before and after
  each change, which is a forced reflow per update. It is the reason `layout`
  exists as a prop — turning it off is the single cheapest win on a long list.
- The transition is a spring (`stiffness: 300`, `damping: 25`) with a per-index
  `delay: index * 0.03`. On a long list the last item's delay grows without
  bound, which both stretches the total time and keeps animations alive well
  after the list has settled.
- Every item carries `will-change-transform`, so the browser promotes all of them
  to their own layer up front. That is the right call for a handful of items and
  a memory cost for hundreds.
- Exit animations run inside `AnimatePresence`, so a removed item stays in the
  DOM until its exit finishes. Removing many items at once means many live
  elements during the exit.
- The container class is recomputed only when `direction` or `columns` changes;
  adding or removing items does not touch it.

::tip
`grid-cols-${columns}` is constructed at runtime, so Tailwind's scanner never sees
it. The class only exists in your stylesheet if something else in the build
happens to use the same literal — `grid-cols-3` is common enough that it usually
does, but `grid-cols-7` might not be there, and the grid would silently collapse
to one column. If you need an unusual count, either use `direction="row"` with
your own width constraints, or add a safelist entry for the literal.
::

