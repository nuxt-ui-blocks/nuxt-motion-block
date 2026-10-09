---
title: Pinned List
description: A pinnable list where pinned items animate to the top and keyboard shortcuts let you move focus and pin/unpin.
navigation:
  icon: i-lucide-pin
---

# Pinned List

Pinned List renders items grouped into pinned and unpinned sections. Pinned items animate to the top (with layout transitions), get a left accent bar, and show a rotated pin icon; unpinned items can be pinned until `maxPinned` is reached. It supports controlled/uncontrolled `pinnedIds`, exposes keyboard shortcuts (ArrowUp/Down, Home/End, P), emits `update:pinned`, and can be accessed via template ref (`togglePin`, `focusedIndex`, etc.). Ported from smoothui's pinned-list.

## Usage

Provide `items` with `id`, `title`, optional `meta`, `icon`, `pinned`. Control pinned state with `v-model:pinned` or `pinned-ids` + `@update:pinned`. Use the example to click items or try keyboard shortcuts (focus the list and press P/Arrows/Home/End).

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="pinned-list-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-sm">
    <MPinnedList
      :items="items"
      :pinned-ids="pinnedIds"
      @update:pinned="pinnedIds = $event"
    />
  </div>
</template>

<script setup lang="ts">
const pinnedIds = ref(['nuxt', 'ui'])
const items = [
  { id: 'nuxt', title: 'Nuxt', meta: 'The Intuitive Vue Framework', icon: 'i-lucide-nuxt' },
  { id: 'ui', title: 'Nuxt UI', meta: 'A UI Library for Modern Web Apps', icon: 'i-lucide-layout-grid' },
  { id: 'content', title: 'Nuxt Content', meta: 'File-based CMS', icon: 'i-lucide-file-text' },
  { id: 'devtools', title: 'Nuxt DevTools', meta: 'Enhance your development experience', icon: 'i-lucide-wrench' },
  { id: 'image', title: 'Nuxt Image', meta: 'Optimized images for Nuxt', icon: 'i-lucide-image' }
]
</script>
```
::

## Props

::field-group
  ::field{name="items" type="PinnedListItem[]" required}
  List of items. Each `PinnedListItem` has `id` (string), `title` (string), optional `meta` (string), `icon` (string, Nuxt UI icon name), optional `pinned` (boolean) — initial pinned state used when uncontrolled.
  ::
  ::field{name="pinnedIds" type="string[]" default="undefined"}
  Controlled pinned ids. When undefined, internal state initialized from `items.filter(i=>i.pinned).map(i=>i.id)`.
  ::
  ::field{name="maxPinned" type="number" default="5"}
  Maximum number of pinned items allowed. Attempting to pin beyond this is ignored (button disabled for unpinned items when cap reached).
  ::
  ::field{name="emptyPinnedMessage" type="string" default="'Pin an item to keep it at the top.'"}
  Message shown when no items are pinned (rendered in a dashed `UBadge`).
  ::
  ::field{name="label" type="string" default="'Pinnable items'"}
  `aria-label` for the `<ul>`.
  ::
  ::field{name="showDivider" type="boolean" default="true"}
  Whether to show divider between pinned and unpinned sections when both non-empty.
  ::
::

## Events

::field-group
  ::field{name="update:pinned" type="(ids: string[]) => void"}
  Emitted when pinned set changes (via toggle or keyboard).
  ::
::

## Slots

::field-group
  ::field{name="default"}
  No default slot is used.
  ::
::

## Accessibility

The list is a `<ul>` with `aria-label`. Each item is rendered as an `<li>`. Pinned items use `UButton` with `aria-pressed="true"`, `aria-label="Unpin <title>"`; unpinned use `aria-pressed="false"`, `aria-label="Pin <title>"`. When `pinDisabled` is true (cap reached), unpinned buttons are `disabled`. The accent bar on pinned items is decorative (absolute span) with no ARIA. Focus tracking is internal (`focusedIndex`) and visually indicated by `ring-2 ring-primary` on the focused item's button; however, buttons are not programmatically focused when `focusedIndex` changes (no `:ref`/focus calls) — keyboard shortcuts move the conceptual focus but do not move actual DOM focus, which may be confusing for screen readers. The divider is `aria-hidden="true"`. No `prefers-reduced-motion` handling is present in source; all animations (layout, scale pulse on just-pinned, spring rotations/transitions) run as specified.

## Performance

- Computes `pinnedItems`, `unpinnedItems`, `orderedItems` via `filter` (O(n) per recompute; n small). `isControlled`/derived computed values are cheap.
- Layout animations use `AnimatePresence` with `:initial="false"`, `layout`, and per-group `delay` based on group index. Springs configured with `type:'spring', bounce:0.3, duration:0.4`.
- "Just pinned" pulse animates `scale: [1,0.985,0.997,1]` over 0.34s with timeout 420ms to clear `justPinnedId`.
- Accent bar animates `opacity`/`scaleY` with spring (`bounce:0.32,duration:0.2`). Pin icon rotates 45° with same spring when pinned.
- Keyboard shortcuts registered via `defineShortcuts` (ArrowUp/Down/Home/End move focus by index modulo total; P toggles focused item). Focus changes are index-based only.
- `togglePin` does Set-like operations on arrays (filter/spread). `defineExpose` exposes internal state for programmatic access.
- No WebGL, RAF loops, or heavy allocations.

::tip
To make keyboard navigation accessible, ensure buttons can receive focus (they do by default) and consider syncing DOM focus when `focusedIndex` changes. Also note `maxPinned` defaults to 5.
::