---
title: Basic Dropdown
description: A styled select dropdown with animated chevron and custom item rendering.
navigation:
  icon: i-lucide-chevron-down-square
---

# Basic Dropdown

A dropdown component built on Nuxt UI's `USelect` and Reka UI primitives, with a rotating chevron animation and custom item rendering that includes icons and a checkmark indicator. It supports both controlled (`v-model`) and uncontrolled modes, with motion-v powered animations. Ported from smoothui's basic-dropdown.

## Usage

Provide an array of `items` with `id`, `label`, and optional `icon`. Use `v-model` for controlled selection, or listen to `@change` for uncontrolled mode.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="basic-dropdown-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md justify-center">
    <MBasicDropdown :items="items" label="Select option" @change="onChange" />
  </div>
</template>

<script setup lang="ts">
const items = [
  { id: '1', label: 'Option 1', icon: 'i-lucide-circle' },
  { id: '2', label: 'Option 2', icon: 'i-lucide-square' },
  { id: '3', label: 'Option 3', icon: 'i-lucide-triangle' },
]

const onChange = (item) => {
  // handle selection
}
</script>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="undefined"}
  Additional CSS classes applied to the trigger.
  ::
  ::field{name="items" type="DropdownItem[]" default="required"}
  Array of dropdown items to display.
  ::
  ::field{name="modelValue" type="DropdownItem | null | undefined" default="undefined"}
  Controlled selected item. When undefined, component is uncontrolled.
  ::
  ::field{name="label" type="string" default="''"}
  Label shown in the trigger when no item is selected.
  ::
::

## Events

::field-group
  ::field{name="change" type="(item: DropdownItem) => void"}
  Emitted when an item is selected in uncontrolled mode.
  ::
  ::field{name="update:modelValue" type="(value: DropdownItem | null) => void"}
  Emitted when selection changes in controlled mode.
  ::
::

## Slots

::field-group
  ::field{name="item" type="(props: { item: DropdownItem }) => void"}
  Custom item rendering slot. By default, renders icon, label, and checkmark for selected item.
  ::
  ::field{name="trailing" type="(props: { open: boolean }) => void"}
  Custom trailing slot. By default, renders an animated chevron.
  ::
::

## Types

::field-group
  ::field{name="DropdownItem" type="{ id: string | number, icon?: string, label: string }"}
  Interface for dropdown items.
  ::
::

## Accessibility

The dropdown uses Nuxt UI's `USelect` which provides proper ARIA semantics (`role="combobox"`, `role="listbox"`, `aria-haspopup`, `aria-expanded`, `aria-selected`). The custom checkmark SVG includes a `<title>Selected</title>` for screen readers. Focus is managed by Reka UI primitives with keyboard support (Arrow keys, Enter, Space, Escape). The trigger has `aria-label` that combines the label and selected item. Focus-visible rings are styled for keyboard navigation.

## Performance

- Chevron rotation is animated with motion-v (`duration: 0.2s`) and respects `prefers-reduced-motion` (falls back to instant rotation when reduced motion is preferred).
- Content animations are handled by Reka UI's SelectContent with CSS keyframe animations scoped via data attributes.
- Custom item rendering reuses Reka UI's `SelectItemText` to preserve proper ARIA relationships (labeling the option correctly).
- Collision padding (8px) is applied to prevent panel from going off-screen without heavy repositioning.
- The component avoids unnecessary re-renders by using computed properties and proper controlled/uncontrolled state management.

::tip
The dropdown accepts any standard HTML attributes via `v-bind="$attrs"`, which are forwarded to the underlying SelectTrigger (since USelect forwards attrs appropriately).
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.basicDropdown` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `base` | `m-basic-dropdown__trigger min-h-[44px] w-full justify-between gap-2 rounded-lg px-4 text-left` |
| `trailing` | `pe-4` |
| `content` | `m-basic-dropdown__content rounded-lg` |
| `group` | `m-basic-dropdown__group` |
| `item` | `m-basic-dropdown__item` |
| `itemLabel` | `m-basic-dropdown__item-label` |
| `viewport` | `m-basic-dropdown__viewport` |
| `itemLeadingIcon` | `size-5 shrink-0` |
| `itemWrapper` | `m-basic-dropdown__item-wrapper` |
| `itemTrailing` | `m-basic-dropdown__item-trailing` |
| `itemTrailingIcon` | `m-basic-dropdown__check` |
| `checkIcon` | `h-4 w-4 text-primary` |
| `chevronIcon` | `h-4 w-4` |
