---
title: Animated List
description: A windowed, recede-style list where new entries slide in and older ones fade and shrink as they age.
navigation:
  icon: i-lucide-list-ordered
---

# Animated List

A list that keeps a fixed number of rows on screen, animates new rows in, and
visually demotes the rows above them. It reads like a live activity feed or a
notification stack.

Two ideas do the work. **Windowing**: only the last `maxVisible` items render, so
the list height stays fixed no matter how long the array gets. **Receding**: each
row's opacity and scale are derived from its `position` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â how far down the visible
window it is ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â rather than from a single variant, so the top row is full size and
each row below steps down by a fixed amount until it hits a floor.

`maxVisible` truncates by *count*, so items scroll off the top and are discarded
from the DOM entirely. If you need them back, they are still in your array ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
nothing is removed. Use the exposed `remove` or the `update:items` event to
actually delete them.

`direction="down"` renders newest-first, which is what makes the windowing feel
like a feed. `direction="up"` appends at the bottom instead and reads like a
chat log.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-list-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MAnimatedList
      ref="list"
      v-model:items="items"
      :max-visible="4"
      animation="slide"
      direction="down"
      class="w-full"
    >
      <template #default="{ item, index, remove }">
        <div class="flex items-center justify-between gap-3 rounded-xl border border-default bg-default px-3 py-2">
          <div class="flex min-w-0 items-center gap-2">
            <UBadge
              :label="item.label"
              color="primary"
              variant="subtle"
            />
            <span class="truncate text-sm text-default">{{ item.text }}</span>
          </div>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            :aria-label="`Dismiss ${item.text}`"
            @click.stop="remove(index)"
          />
        </div>
      </template>
    </MAnimatedList>

    <div class="flex items-center gap-3">
      <UButton
        label="Add alert"
        icon="i-lucide-bell"
        variant="outline"
        class="justify-center"
        @click="add"
      />
      <UButton
        label="Clear"
        icon="i-lucide-trash-2"
        color="neutral"
        variant="ghost"
        class="justify-center"
        @click="clear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Alert {
  id: number
  label: string
  text: string
}

let counter = 4

const list = ref<{ clear: () => void } | null>(null)
const items = ref<Alert[]>([
  { id: 1, label: 'Deploy', text: 'api-gateway rolled out to eu-west' },
  { id: 2, label: 'Warn', text: 'p95 latency above 400ms' },
  { id: 3, label: 'Info', text: 'cache warmed for 12k keys' },
  { id: 4, label: 'Deploy', text: 'web-frontend bundle dropped 84kb' },
])

function add() {
  counter += 1
  items.value = [
    ...items.value,
    { id: counter, label: 'Info', text: `event ${counter} received on worker 3` },
  ]
}

function clear() {
  list.value?.clear()
}
</script>
```
::

With no slot the component renders a `UCard` per row. If you set `onItemClick`,
that fallback becomes clickable; otherwise it includes a remove button already
wired to `remove(row.sourceIndex)`.

The three exposed methods ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `add`, `remove` and `clear` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â all emit
`update:items` rather than mutating anything, so `v-model:items` is the intended
wiring and the array stays owned by the parent. In the example the Clear button
goes through the exposed `clear()` rather than assigning `items.value = []`
directly; both work, and the first keeps the exit animation.

## Props

::field-group
  ::field{name="items" type="AnimatedListItem[]" default="[]"}
  The full array. Only the last `maxVisible` entries are rendered. An item is
    `{ id?, label?, ...any }`, a string, or a number; the index passed to the
    slot and to `remove` is the index into *this* array, not into the visible
    window.
  ::
  ::field{name="animation" type="'slide' | 'fade' | 'scale'" default="'slide'"}
  The entry animation. `slide` fades in from 0.95 scale, starting 14px above for
    `direction="down"` and 14px below for `up`. `fade` fades opacity only,
    `scale` comes from 0.8.
  ::
  ::field{name="maxVisible" type="number" default="5"}
  How many rows stay in the DOM. Everything older is not rendered at all.
  ::
  ::field{name="direction" type="'up' | 'down'" default="'down'"}
  `down` reverses the window so the newest item is first and recedes downward.
    `up` keeps source order and recedes upward.
  ::
  ::field{name="stagger" type="number" default="0.05"}
  Seconds of delay per position, so rows settle in sequence rather than all at
    once. Capped at 0.3s total.
  ::
  ::field{name="recede" type="boolean" default="true"}
    Fade and shrink rows by position ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â opacity steps down 0.18 per row to a floor
    of 0.35, scale steps down 0.05 to a floor of 0.85. Set `false` for a flat
    list that only animates entries.
  ::
  ::field{name="feed" type="boolean" default="false"}
  Reveal items progressively, one per `feedInterval` ms, instead of showing
    everything at once. Useful for demos; the count only ever grows to
    `items.length`.
  ::
  ::field{name="feedInterval" type="number" default="2000"}
  Milliseconds between feed reveals.
  ::
  ::field{name="pauseOnHover" type="boolean" default="true"}
  Suspend the feed timer while the pointer is over the list, so a row cannot
    appear under the cursor. Has no effect unless `feed` is on.
  ::
  ::field{name="onItemClick" type="(item, index) => void"}
  Callback for the default fallback card. It is a prop, not an event, and it is
    only consulted when you have not provided a slot.
  ::
  ::field{name="ui" type="Record<string, any>" default="{}"}
  Merged into the fallback card's `ui.body` prop. Ignored when a slot is
    supplied.
  ::
::

## Events

::field-group
  ::field{name="update:items" type="AnimatedListItem[]"}
  Emitted by `add`, `remove` and `clear` with the next array. Bind it with
    `v-model:items`.
  ::
::

## Slots

::field-group
  ::field{name="default" type="{ item: AnimatedListItem, index: number, position: number, remove: (index: number) => void }"}
  Renders one row. `position` is the row's slot in the visible window (0 is the
    newest for `direction="down"`) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â use it to mirror the recede effect with your
    own opacity. `remove` takes an index and is the same function the exposed
    `remove` uses.
  ::
::

## Accessibility

The root is a real `<ul aria-live="polite">` and each row is a `<li>`, so the
structure is announced correctly. `inheritAttrs` is disabled and `$attrs` are
re-bound manually, so `class`, `aria-*` and listeners land on the `<ul>` as you'd
expect.

The `aria-live` region is a problem on a fast feed. Any add, remove or recede
re-inserts elements inside a polite live region, and screen readers will read the
new row out ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â which is usually what you want, but it means the region stays
"noisy" for as long as the list is changing. If your rows are not announcements,
set `aria-live="off"` yourself (or manage focus in a `role="log"` region) rather
than leaving the default on.

The list does not move focus, and it should not: rows are not interactive unless
you make them so. If a row contains a button, note that rows are removed from the
DOM as they age out of the window ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â moving focus to a button that is about to be
unmounted sends focus back to `body`.

Reduced motion is fully respected. `useReducedMotion()` short-circuits every
variant: entries appear at their final values, the stagger delay becomes `0`, and
exits fade with `duration: 0`. The list still updates, it just doesn't travel.

## Performance

- Rendering is bounded by `maxVisible`, so the DOM size does not grow with the
  array. A 10,000-item array costs the same as a 5-item one.
- Every row sets `layout`, so Motion measures positions before and after each
  change. That is a forced reflow per update and is the dominant cost ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it is
  what makes the neighbouring rows slide instead of jump.
- Stagger is capped at `0.3`s (`MAX_STAGGER_DELAY`), so a large `maxVisible`
  cannot stretch a single update into a long, janky sequence.
- Recede clamps at `MIN_RECEDE_OPACITY` / `MIN_RECEDE_SCALE`, so old rows never
  become invisible or invert ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â you never lose a row to rounding.
- `AnimatePresence` uses `mode="popLayout"`, which removes a leaving row from
  flow immediately so the remaining rows start moving straight away rather than
  waiting for the exit to finish.
- The feed timer is a single `setTimeout` that reschedules itself, and it is
  cleared and re-armed by a watcher on `feed`, `feedInterval`, `items.length` and
  the pause state ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â so changing any of them mid-flight cannot leave a stale timer
  running.

::tip
Row keys come from `item.id` when present. Without an `id`, objects fall back to
`m-list-${index}`, which means inserting at the top makes every row look new to
Vue ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the whole list re-animates and the recede states are recomputed. Primitives
key off their own value instead, so a list of strings is fine as long as they are
unique.
::

::warning
`direction` is `'up' | 'down'`. The older `'left'`/`'right'` values some snippets
pass are not part of the type and will silently render in the `down` order, since
the check is a strict equality against `'down'`.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedList` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'flex flex-col gap-2 m-animated-list'` |
| `row` | `'list-none'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedList` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `flex flex-col gap-2 m-animated-list` |
| `row` | `list-none` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedList` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `flex flex-col gap-2 m-animated-list` |
| `row` | `list-none` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedList` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `flex flex-col gap-2 m-animated-list` |
| `row` | `list-none` |
