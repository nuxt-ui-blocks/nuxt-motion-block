---
title: Expandable Cards
description: An accordion-like stack that expands a single card at a time with smooth height and rotation animations.
navigation:
  icon: i-lucide-list-collapse
---

# Expandable Cards

Expandable Cards renders a vertical list of collapsible items. Only one card is open at a time by default; enable `multiple` to allow several open simultaneously. Each header animates its chevron on toggle, and the body expands with height/opacity via `AnimatePresence` and `motion-v`. Ported from smoothui's expandable-cards.

## Usage

Provide an array of `items` with `title` and `content`. You can also pass extra fields on each item and access them via the `item` slot. For multi-select, set `multiple` to `true`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="expandable-cards-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md">
    <MExpandableCards
      :items="items"
    />
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    title: 'What is Nuxt?',
    content: 'Nuxt is an open source framework that makes web development intuitive and powerful. Build performant and production-grade full-stack web apps and websites with confidence.'
  },
  {
    title: 'What is Nuxt Motion Block?',
    content: 'A collection of ready-to-use animated components built with motion-v and Nuxt. Copy, paste, and customize to add motion to your Nuxt apps.'
  },
  {
    title: 'Is it free to use?',
    content: 'Yes, Nuxt Motion Block is open source and free to use in your personal and commercial projects.'
  }
]
</script>
```
::

## Props

::field-group
  ::field{name="items" type="AccordionItem[]" required}
  Array of items to render. Each item must include `title` (string) and `content` (string). Additional arbitrary keys are allowed and exposed via the `item` slot.
  ::
  ::field{name="multiple" type="boolean" default="false"}
  When `true`, opening one item does not close others; when `false`, only one item remains open at a time.
  ::
  ::field{name="class" type="string"}
  Merged onto each `UCard` (`:class="props.class"`).
  ::
  ::field{name="ui" type="CardProps['ui']" default="{}"}
  UI configuration passed to each `UCard`.
  ::
::

## Events

No events are emitted by this component.

## Slots

::field-group
  ::field{name="item" type="({ item, index }: { item: AccordionItem, index: number }) => VNode"}
  Per-item slot rendered inside the expanded body (after the `content` text). Useful for adding actions, links, or richer markup per item.
  ::
::

## Accessibility

The header is a plain clickable `div` with `cursor-pointer` (no `button` role, `aria-expanded`, or `aria-controls`). The chevron uses an inline SVG with no accessible name. The expanded region uses `AnimatePresence` but has no ARIA attributes linking it to the trigger. Keyboard navigation (Enter/Space) is not handled. No `prefers-reduced-motion` awareness is present. Consumers should add their own accessible triggers if keyboard/screen-reader support is required.

## Performance

- Each item enters with a spring (`stiffness: 300, damping: 30`, `y: 20, opacity: 0`, `delay: index*0.05`).
- Chevron rotation uses a spring (`stiffness: 300, damping: 25`, `rotate: isOpen ? 180 : 0`).
- Expanded body animates height/opacity with `AnimatePresence` and spring (`stiffness: 300, damping: 30`) using `height: 'auto'` inside the motion wrapper.
- State is tracked in a `Set<number>` for O(1) membership checks; toggling clears the set when not `multiple`.
- No timers, heavy computations, or WebGL. Rendering scales linearly with `items.length`.

::tip
To keep animation smooth with variable-height content, the body uses `overflow-hidden` and `height: 'auto'` during the spring; very long content still animates but may feel slowerÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Âconsider truncating or splitting dense sections if needed.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.expandableCards` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'space-y-3'` |
| `cardRoot` | `''` |
| `cardBody` | `''` |
| `header` | `'flex items-start justify-between cursor-pointer'` |
| `headerContent` | `'flex-1 min-w-0'` |
| `title` | `'text-lg font-semibold text-highlighted'` |
| `chevron` | `'ml-2 flex-shrink-0 text-muted'` |
| `chevronIcon` | `'w-5 h-5'` |
| `collapsible` | `'overflow-hidden'` |
| `content` | `'pt-4'` |
| `contentText` | `'text-muted'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.expandableCards` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `space-y-3` |
| `cardRoot` |  |
| `cardBody` |  |
| `header` | `flex items-start justify-between cursor-pointer` |
| `headerContent` | `flex-1 min-w-0` |
| `title` | `text-lg font-semibold text-highlighted` |
| `chevron` | `ml-2 flex-shrink-0 text-muted` |
| `chevronIcon` | `w-5 h-5` |
| `collapsible` | `overflow-hidden` |
| `content` | `pt-4` |
| `contentText` | `text-muted` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.expandableCards` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `space-y-3` |
| `cardRoot` |  |
| `cardBody` |  |
| `header` | `flex items-start justify-between cursor-pointer` |
| `headerContent` | `flex-1 min-w-0` |
| `title` | `text-lg font-semibold text-highlighted` |
| `chevron` | `ml-2 flex-shrink-0 text-muted` |
| `chevronIcon` | `w-5 h-5` |
| `collapsible` | `overflow-hidden` |
| `content` | `pt-4` |
| `contentText` | `text-muted` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.expandableCards` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `space-y-3` |
| `cardRoot` |  |
| `cardBody` |  |
| `header` | `flex items-start justify-between cursor-pointer` |
| `headerContent` | `flex-1 min-w-0` |
| `title` | `text-lg font-semibold text-highlighted` |
| `chevron` | `ml-2 flex-shrink-0 text-muted` |
| `chevronIcon` | `w-5 h-5` |
| `collapsible` | `overflow-hidden` |
| `content` | `pt-4` |
| `contentText` | `text-muted` |
