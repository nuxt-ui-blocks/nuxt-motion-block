---
title: Accordion
description: A vertical stack of collapsible panels that spring their height open and closed.
navigation:
  icon: i-lucide-chevrons-up-down
---

# Accordion

A vertical stack of collapsible panels. `MAccordion` composes Nuxt UI's
`UAccordion` — the state (reka-ui), the real `<button>` triggers and the panel
regions are owned by Nuxt UI, while the open/close **height** runs on a
motion-v spring layered over the panel. `MAccordion` forwards the full
UAccordion API (`items`, `v-model`, `type`, `collapsible`, `defaultValue`,
`ui`, …) and keeps a thin mapping for the old `expandedValue` /
`onValueChange` props.

Panels stay mounted when closed by default (`unmountOnHide` defaults to `false`)
so the closing spring is visible; the collapsed content is kept out of the a11y
tree with `inert` instead of being removed.

The most common shape is a `v-model` bound to the currently open item's
`value`:

```ts
const expandedValue = ref<string | string[] | null>(null)

const faqs = [
  {
    label: 'How do I install the module?',
    value: 'install',
    content: 'Add nuxt-motion-block to your modules array, then drop any M-prefixed component straight into your template.',
  },
  {
    label: 'Does the animation survive SSR?',
    value: 'ssr',
    content: 'Yes. A panel only mounts once it is expanded.',
  },
]
```

```vue
<template>
  <MAccordion
    v-model="expandedValue"
    :items="faqs"
  />
</template>
```

Or bring your own trigger by slotting the default (label) content:

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="accordion-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <MAccordion
      v-model="expandedValue"
      :items="faqs"
    >
      <template #default="{ open, item }">
        <span class="flex items-center justify-between gap-4 text-sm font-medium text-highlighted">
          {{ item.label }}
          <UIcon
            name="i-lucide-chevron-down"
            class="size-4 shrink-0 text-dimmed transition-transform duration-200"
            :class="open ? 'rotate-180' : ''"
          />
        </span>
      </template>
    </MAccordion>

    <p class="text-xs text-dimmed">
      {{ expandedValue ? `Expanded: ${expandedValue}` : 'Nothing expanded' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const expandedValue = ref<string | string[] | null>(null)

const faqs = [
  {
    label: 'How do I install the module?',
    value: 'install',
    content: 'Add nuxt-motion-block to your modules array, then drop any M-prefixed component straight into your template.',
  },
  {
    label: 'Does the animation survive SSR?',
    value: 'ssr',
    content: 'Yes. Panels stay mounted when closed by default, so opening is a pure height spring and the content is preserved the whole time.',
  },
  {
    label: 'Can I change the open and close curve?',
    value: 'ui',
    content: 'The panel height runs on a motion-v spring (opening 500/40, closing 550/45). You can tune it or swap it for an easing through the accordion `ui` theme.',
  },
]
</script>
```
::

Panels are driven by a list of items. Each item maps to one
`MAccordionItem` the old API rendered manually:

```ts
const items = [
  {
    label: 'The trigger label',
    content: 'The panel body (renders as text; almost any markdown-ish string)',
    value: '1',             // optional; falls back to the item index
    icon: 'i-lucide-circle', // optional leading icon
    disabled: true,          // optional — triggers become inert
  },
]
```

Pass `defaultValue` instead of `v-model` to leave the accordion uncontrolled,
and `type="multiple"` to let several panels stay open at once.

## Props

::field-group
  ::field{name="items" type="AccordionItem[]"}
  The panels. One `MAccordionItem` per panel, read from `label`, `content`,
  `value`, `icon`, `disabled` and so on. See the Nuxt UI Accordion docs for the
  full item shape, including `slot` to pick a per-item trigger slot and `ui` for
  per-item overrides.
  ::
  ::field{name="modelValue" type="string | string[]" default="undefined"}
  The controlled open `value`(s). Bindable with `v-model`. In single mode the
  collapsed value is `''`.
  ::
  ::field{name="defaultValue" type="string | string[]" default="undefined"}
  The initial open `value`(s) when uncontrolled.
  ::
  ::field{name="type" type="'single' | 'multiple'" default="'single'"}
  Whether one or several panels can be open at a time.
  ::
  ::field{name="collapsible" type="boolean" default="true"}
  When `type="single"`, whether clicking an open trigger close it again.
  ::
  ::field{name="disabled" type="boolean" default="false"}
  Prevents interaction with the accordion and all its items.
  ::
  ::field{name="unmountOnHide" type="boolean" default="false"}
  When `false` (default) the panel stays mounted while closed so its height can
  spring back down; the collapsed content is `inert`. `true` unmounts a closed
  panel entirely — the classic "no exit motion" trade.
  ::
  ::field{name="trailingIcon" type="IconifyIcon"}
  The icon on the right of every trigger. Defaults to Nuxt UI's chevron index.
  ::
  ::field{name="valueKey" / "labelKey" type="string" default="'value' / 'label'"}
  Dot-path keys for reading each item's value and label.
  ::
  ::field{name="expandedValue" type="string | number | null" default="undefined"}
  Deprecated alias for `modelValue`, kept for parity with the pre-Nuxt-UI API.
  `null` maps to the collapsed `''`. Prefer `v-model`.
  ::
  ::field{name="onValueChange" type="(value: string | number | null | string[]) => void" default="undefined"}
  Deprecated. Called with the newly open `value`, or `null` when the open panel
  is toggled shut. Prefer `@update:model-value` / `v-model`.
  ::
  ::field{name="class" type="string"}
  Merged onto the accordion root.
  ::
  ::field{name="ui" type="{ root?, item?, header?, trigger?, content?, body?, leadingIcon?, trailingIcon?, label? }"}
  Nuxt UI `::ui` theme overrides — the same shape as `UAccordion`.
  ::
::

## Slots

All slots are forwarded to the underlying `UAccordion`.

::field-group
  ::field{name="default" type="{ item, index, open }"}
  The trigger content for every item. Slot in a label, chevron, or button —
  the surrounding element is the trigger, so it stays a real button.
  ::
  ::field{name="content" type="{ item, index, open, ui }"}
  The open panel body.
  ::
  ::field{name="body" type="{ item, index, open, ui }"}
  Same as `content`, but the inner body wrapper — useful with
  `unmountOnHide="false"` to keep padding stable.
  ::
  ::field{name="leading" / "trailing" type="{ item, index, open, ui }"}
  The leading/trailing icon slots of the trigger.
  ::
::

## Accessibility

Semantics come from reka-ui's accordion wrapped by Nuxt UI: every trigger is a
native `<button>` carrying `aria-expanded` and `aria-controls`, and Enter/Space
toggle for free. With the default `unmountOnHide: false` a closed panel stays
mounted but is removed from the accessibility tree and tab order via `inert`
and hidden from find-in-page via `hidden="until-found"`. With
`unmountOnHide: true` the panel unmounts instead.

## Performance

- The panel height is animated imperatively with motion-v springs: `scrollHeight`
  is measured and the spring runs `0 → px` to open and `px → 0` to close, then
  the height is restored to `auto` once the opening spring lands so the panel
  stays fluid.
- Only panels whose open state actually changed are animated — a second
  accordion sharing the same `v-model` does not re-run the opening spring on an
  already-open panel — and a rapid toggle lets only the latest animation write
  the end state.
- The motion is height-based (layout) with `overflow-hidden` during the
  transition; Nuxt UI's own CSS keyframe animation on the content wrapper is
  cancelled so only the spring runs.
- With `unmountOnHide: true` (legacy) a closed panel renders nothing.