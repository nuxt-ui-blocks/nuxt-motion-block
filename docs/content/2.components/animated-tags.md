---
title: Animated Tags
description: A tags input whose chips blur in, settle with a layout shift, and fall away when removed.
navigation:
  icon: i-lucide-tags
---

# Animated Tags

A `UInputTags` whose chips are animated. Entering chips rise 20px while un-blurring
from `blur(4px)`, and because every chip carries `layout`, the ones already on
screen slide into their new positions when a chip is added or removed — the row
reflows as a spring rather than a jump.

Removal works from either side. The painted chip is clickable, and the real
`UInputTags` item underneath still carries its own delete button, so a pointer and
a keyboard both work. Both paths go through the same update, and the emit is
skipped when the value is unchanged, so removing and re-adding a tag does not
generate a duplicate `update:modelValue`.

The active chip — the one the input is currently on — is tracked with a
`MutationObserver` and highlighted with `data-[state=active]:bg-accented`.

## Usage

Bind `v-model` to a `string[]`. Everything else is `UInputTags`: pass `max`,
`placeholder`, `disabled`, `name`, and the rest, unchanged. Click a chip to remove
it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-tags-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MAnimatedTags
      v-model="tags"
      :max="6"
      placeholder="Add a skill and press Enter"
      class="w-full"
    />

    <p class="text-xs text-muted">
      {{ tags.length }} of 6 tags — click a chip to remove it
    </p>
  </div>
</template>

<script setup lang="ts">
const tags = ref(['Motion', 'Nuxt UI', 'TypeScript'])
</script>
```
::

## Props

::field-group
  ::field{name="modelValue" type="string[]"}
  The list of tags. This is the only value prop — there is no `defaultValue`,
  because `UInputTags` seeds its own default and the component mirrors whatever
  arrives. Seed an initial list by passing a `ref` array, as in the example.
  ::
  ::field{name="ui" type="Record<string, any>"}
  Forwarded to `UInputTags`, then augmented. Your `ui.item` is merged *before*
  the component's `absolute start-0 top-0 size-px overflow-hidden border-0 p-0
  opacity-0`, and your `ui.input` before `order-last min-w-0`, so those two keys
  cannot be overridden — they are what makes the real items invisible while
  leaving room for the painted chips. Every other key is yours.
  ::
::

Every other `UInputTags` prop and listener — `max`, `placeholder`, `disabled`,
`name`, `id`, `maxLength`, `size`, `variant`, `@blur`, `@focus`, `@update` — is
forwarded through `$attrs`. The component sets `inheritAttrs: false`, and
`UInputTags` in turn spreads its own `$attrs` onto the inner text input, so
`placeholder` and `maxlength` land where you would expect.

## Events

::field-group
  ::field{name="update:modelValue" type="(value: string[]) => void"}
  Emitted with a **copy** of the next list — typed, pasted, or removed by
  clicking a chip. Guarded by a comparison against `props.modelValue`, so a
  click-driven removal that lands on the value already in props is skipped
  rather than emitted twice. Powers `v-model`.
  ::
::

## Slots

The `default` slot is **not** forwarded — it is consumed by the painted chip
overlay. A `<template #default>` on this component is silently ignored. Every
other slot is forwarded verbatim to `UInputTags`.

::field-group
  ::field{name="item-text" type="{ item, index, ui }"}
  Replaces the text inside a real tag item. This renders inside the collapsed
  1px item, so it does **not** change the painted chip — restyle the chip through
  `ui` instead.
  ::
  ::field{name="item-delete" type="{ item, index, ui }"}
  Replaces the delete icon inside a real tag item. Same caveat: it lives in the
  invisible item and never appears in the painted overlay, whose close glyph is a
  hardcoded `i-lucide-circle-x`.
  ::
  ::field{name="leading" type="{ ui }"}
  Forwarded to `UInputTags`, rendered before the input.
  ::
  ::field{name="trailing" type="{ ui }"}
  Forwarded to `UInputTags`, rendered after the input.
  ::
::

## Accessibility

Every tag is a real `TagsInputItem` from Reka UI, containing a real
`TagsInputItemDelete` button, so each tag is reachable by keyboard and each has
a genuine delete control with the platform's button semantics. Backspace on an
empty input removes the last tag, and arrow keys move through the list — all of
that comes from `UInputTags` and is untouched.

The painted overlay is `aria-hidden="true"`, so the chips you see are not
announced. The real items behind them carry the semantics, and `UInputTags` binds
its own ARIA attributes onto the text input.

The cost of that arrangement is focus feedback. Each real item is collapsed to
`size-px` with `opacity-0`, which also collapses its own box-shadow and outline —
so **the browser's focus ring on a tag's delete button is invisible**. Tabbing
through the tags moves focus with no visible indicator. If that matters, restore
a focus style through `ui.itemDelete` by replacing the collapsed item's
`opacity-0` rather than styling the delete button itself.

Under `prefers-reduced-motion` chips still enter and exit, but instantly: initial
and animate both become `{ opacity: 1 }`, exit becomes `{ opacity: 0 }` with a
zero-duration transition, and the shared transition object is replaced with
`{ duration: 0 }`, so the layout shifts are instant too. The reduce flag is gated
behind an `onMounted` check so the server-rendered and first client frame agree.

## Performance

- One `motion.div` per chip inside a single `AnimatePresence`, keyed by the tag's
  own text. Adding or removing one chip mounts or unmounts only that chip.
- The `layout` prop on every chip is what reflows the row, and it is handled by
  the library's FLIP pass — measure, invert, play — with no layout reads in your
  code and no `ResizeObserver`.
- Enter and exit animate `y` and `filter`. `y` is a transform, but `blur(4px)` is
  a paint-heavy filter, so this is the most expensive transition in the set. It
  lasts 0.25s on a `bounce: 0` spring.
- `SPRING`, `REDUCED_TRANSITION`, `INITIAL`, `ANIMATE`, `EXIT` and their reduced
  counterparts are module-level constants, so no transition object is allocated
  per render or per chip.
- The active-chip index comes from one `MutationObserver` on the field root,
  filtered to `data-state` attributes and scoped to `childList` + `subtree`, so it
  fires on chip add, remove and selection but not on unrelated attribute changes.
  It disconnects on unmount, and is also driven once synchronously on mount.
- `handleUpdate` compares against `props.modelValue` before emitting, so a
  click-driven removal that lands on the value already in props is a no-op rather
  than a redundant emit and a second render.
- `renderedTags` is copied rather than aliased, so the animation keys stay stable
  and the prop's array is never mutated in place.
- No timers and no `requestAnimationFrame`.

::tip
Chips are keyed by `String(tag)`, and `removeTag` resolves a click with
`indexOf` — the first match. If duplicate strings ever reach the list, they
share a key and clicking one removes the first, which is almost certainly not the
one under the pointer. Deduplicate before the value reaches this component, for
example with `UInputTags`' own duplicate handling or by guarding at the point you
build the array.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedTags` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `chips` | `contents` |
| `chip` | `group inline-flex cursor-pointer items-center gap-0.5 rounded-sm px-1.5 py-0.5 font-medium ring ring-inset ring-accented bg-elevated text-default transition-colors data-[state=active]:bg-accented` |
| `chipIcon` | `inline-flex size-3.5 shrink-0 items-center justify-center rounded-xs text-dimmed transition-colors duration-200 hover:bg-accented/75 hover:text-default` |
