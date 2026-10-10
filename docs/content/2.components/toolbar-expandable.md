---
title: Toolbar Expandable
description: A vertical toolbar where each icon button expands a panel of content above it.
navigation:
  icon: i-lucide-panels-top-left
---

# Toolbar Expandable

A vertical icon rail where pressing a button opens a panel above the rail —
animated with `height: 0 → auto` plus a slight scale, so it unfolds out of the
button rather than appearing in place. Ported from smoothui's toolbar-expandable.

Pressing the active button again closes the panel, and a `mousedown` on
`document` outside the toolbar dismisses it. The panel is keyed by item `id`, so
switching between two items cross-animates rather than snapping.

## Usage

Declare your items as objects with `id`, `label`, an optional `icon` and
optional `content`. Use the `item-content` slot to render the open panel and the
`item-icon` slot to customise a button's contents; both receive the item.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="toolbar-expandable-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md justify-center py-4">
    <MToolbarExpandable
      :items="items"
      @select="selected = $event.label"
    >
      <template #item-icon="{ item }">
        <UIcon
          :name="item.icon"
          class="size-5"
        />
      </template>
      <template #item-content="{ item }">
        <div class="flex items-center gap-3">
          <img
            :src="`https://picsum.photos/seed/${item.id}/80/80`"
            :alt="item.label"
            class="size-12 rounded-xl object-cover"
          >
          <div class="space-y-0.5">
            <p class="text-sm font-semibold">
              {{ item.label }}
            </p>
            <p class="text-xs text-muted">
              {{ item.content }}
            </p>
          </div>
        </div>
      </template>
    </MToolbarExpandable>
  </div>
</template>

<script setup lang="ts">
const selected = ref('none')

const items = [
  { id: 'ada', label: 'Ada', icon: 'i-lucide-user', content: 'Analytical engine notes' },
  { id: 'linus', label: 'Linus', icon: 'i-lucide-terminal', content: 'Kernel patch series' },
  { id: 'grace', label: 'Grace', icon: 'i-lucide-ship', content: 'Compiler design notes' },
]
</script>
```
::

## Props

::field-group
  ::field{name="items" type="ToolbarItem[]" default="[]"}
  The buttons to render. `id` is required and doubles as the identity used to
  open, close and re-key the panel — two items sharing an `id` will fight over
  the same panel. `label` is passed to the `item-icon` and `item-content` slots
  but is not used for any accessible name on the button itself. `icon` is applied
  as the button's `icon` prop, and `content` is only used as the panel's
  fallback when no `item-content` slot is provided.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the outer wrapper that holds both the rail and the panel, after its
  own `relative inline-flex flex-col-reverse` classes.
  ::
::

## Events

::field-group
  ::field{name="select" type="(item: ToolbarItem) => void"}
  Emitted with the full item when a button opens its panel. Pressing the already
  active button closes it and does **not** emit, as does dismissing with an
  outside click — so `select` means "opened", not "toggled".
  ::
::

## Slots

::field-group
  ::field{name="item-icon" type="{ item: ToolbarItem, isActive: boolean }"}
  Rendered inside each button, so it sits next to whatever `icon` produced rather
  than replacing it — use it for badges or counts, not for the glyph itself.
  `isActive` reflects the current open state.
  ::
  ::field{name="item-content" type="{ item: ToolbarItem }"}
  The open panel's contents, receiving the active item. Falls back to rendering
  the active item's `content` string when the slot is empty.
  ::
::

## Accessibility

Each button is a `UButton` with an `icon` and no `label`, so it has **no
accessible name** unless you supply one through the `item-icon` slot or your own
attributes. The active item is only distinguished visually, by a
`bg-black/10 dark:bg-white/10` class — there is no `aria-pressed`,
`aria-expanded` or `aria-controls` on the button, and the panel has no `role`,
no heading and no `id` to reference.

Because `item.label` never reaches an ARIA attribute, the practical fix is to
give every item an icon that reads unambiguously and add your own label in the
slot markup.

Dismissal is a `mousedown` listener on `document`: there is no Escape handler
and no focus management, so a keyboard user can open a panel but not close it
with the keyboard.

There is no `prefers-reduced-motion` branch — the unfold spring plays regardless.

## Performance

- `activeItem` is a `computed` that finds the open item by `id`, so the panel
  renders from a single source of truth and the `v-if` is a plain truthiness
  check rather than a per-render search.
- The panel is keyed by `activeItem.id` inside an `AnimatePresence`, which is
  what lets one panel exit and the next enter as two separate animations.
- Animating `height: 0 → auto` is a layout-affecting property. `AnimatePresence`
  is given `:initial="false"` so the first panel opened does not animate in from
  nothing — only subsequent opens do.
- One `mousedown` listener, attached on mount and removed on unmount. No
  observers, no timers, no animation frames owned by the component.

::tip
The root is `flex-col-reverse`, which is why the panel appears *above* the rail
rather than below it — reversing the column keeps the rail's DOM position (and
therefore its natural place in tab order) below a panel that is painted first.
That also means the rail sits at the visual bottom of the component's box, so
give the wrapper bottom padding if the panel would otherwise collide with the
viewport edge.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.toolbarExpandable` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-flex flex-col-reverse items-center gap-2` |
| `bar` | `flex items-center gap-1 h-12 px-2 rounded-2xl bg-default/80 dark:bg-default/80 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20` |
| `button` | `flex items-center justify-center w-10 h-10 rounded-xl` |
| `panel` | `w-full rounded-2xl bg-default/90 dark:bg-default/90 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20 overflow-hidden` |
| `panelContent` | `p-4` |
| `content` | `text-sm text-muted dark:text-muted` |
