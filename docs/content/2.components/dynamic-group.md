---
title: Dynamic Group
description: Lays out a reactive array of items as a grid, row or column and animates entries, exits and reflow.
navigation:
  icon: i-lucide-layout-grid
---

# Dynamic Group

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

## Props

::field-group
  ::field{name="items" type="any[]" required}
  The list to render. Items are typed `any` — strings, numbers and objects all
    work, but the shape only matters to your slot and to `keyField`.
  ::
  ::field{name="keyField" type="string" default="'id'"}
  The property read off each item to build its Vue key. If the property is
  missing, the component falls back to `JSON.stringify(item)`, and a primitive
  item is used directly as its own key.
  ::
  ::field{name="layout" type="boolean" default="true"}
  Enables Motion's layout animation, which is what makes the remaining items
  slide into place when one leaves. Set it to `false` to skip reflow
  measurement — cheaper, but items will jump.
  ::
  ::field{name="direction" type="'row' | 'column' | 'grid'" default="'grid'"}
  `grid` emits `grid grid-cols-N gap-4`, `row` emits `flex flex-wrap gap-4`, and
  `column` emits `space-y-4`. Any other value falls through to the column layout.
  ::
  ::field{name="columns" type="number" default="3"}
  Grid column count, used only when `direction="grid"`. The class is built as
  `grid-cols-${columns}` at runtime, so Tailwind cannot see it in your source —
  see the tip below.
  ::
::

## Events

::field-group
  ::field{name="remove" type="(index: number) => void"}
  Emitted with the index of the item to remove, from the slot's `remove()`
  function. The array is not modified by the component.
  ::
::

## Slots

::field-group
  ::field{name="default" type="{ item: any, index: number, remove: () => void }"}
  Renders one item. `remove` emits the `remove` event with `index` already bound.
    The fallback content — a `UCard` with the item interpolated as text — is
    used when the slot is omitted.
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

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dynamicGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `item` | `will-change-transform` |
