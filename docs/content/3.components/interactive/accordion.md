---
title: Accordion
description: A vertical stack of collapsible panels that spring their height open and closed.
---

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
      <template #default="{ item }">
        <span class="text-sm font-medium text-highlighted">{{ item.label }}</span>
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
    value: '1', // optional; falls back to the item index
    icon: 'i-lucide-circle', // optional leading icon
    disabled: true, // optional — triggers become inert
  },
]
```

Pass `defaultValue` instead of `v-model` to leave the accordion uncontrolled,
and `type="multiple"` to let several panels stay open at once.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
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
      <template #default="{ item }">
        <span class="text-sm font-medium text-highlighted">{{ item.label }}</span>
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

## Multiple panels

Open several panels at once by binding an array with `type="multiple"` — each
item's leading `icon` is rendered by Nuxt UI, and any external control can
mutate the bound array:

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="accordion-multiple" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <div class="flex items-center gap-2">
      <UButton
        size="sm"
        variant="soft"
        @click="expandAll"
      >
        Expand all
      </UButton>
      <UButton
        size="sm"
        variant="soft"
        color="neutral"
        @click="open = []"
      >
        Collapse all
      </UButton>
      <span class="ml-auto text-xs text-dimmed">{{ open.length }} / {{ features.length }} open</span>
    </div>

    <MAccordion
      v-model="open"
      type="multiple"
      :items="features"
    />

    <p class="text-xs text-dimmed">
      With <code>type="multiple"</code> every panel springs open independently and the bound array stays in sync.
    </p>
  </div>
</template>

<script setup lang="ts">
const features: { label: string, value: string, icon: string, content: string }[] = [
  {
    label: 'Sortable panels',
    value: 'panels',
    icon: 'i-lucide-layers',
    content: 'Each trigger is a real button carrying aria-expanded, so keyboard and screen readers work without any extra wiring.',
  },
  {
    label: 'Spring height',
    value: 'spring',
    icon: 'i-lucide-waves',
    content: 'The panel height is measured with scrollHeight and driven 0 → px by a motion-v spring, then restored to auto once it lands.',
  },
  {
    label: 'Open several at once',
    value: 'multiple',
    icon: 'i-lucide-git-branch',
    content: 'Binding an array with type="multiple" lets panels open independently — drive it from buttons, routes, or search.',
  },
]

const open = ref<string[]>(['panels'])

function expandAll() {
  open.value = features.map(feature => feature.value)
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
    <component-example name="accordion-custom" />
  :::
#code
  <PlaygroundCode name="Accordion" />
::

## Props

::component-props
  ::component-prop{name="items" type="AccordionItem[]"}
  The panels. One `MAccordionItem` per panel, read from `label`, `content`,
  `value`, `icon`, `disabled` and so on. See the Nuxt UI Accordion docs for the
  full item shape, including `slot` to pick a per-item trigger slot and `ui` for
  per-item overrides.
  ::
  ::component-prop{name="modelValue" type="string | string[]" default="undefined"}
  The controlled open `value`(s). Bindable with `v-model`. In single mode the
  collapsed value is `''`.
  ::
  ::component-prop{name="defaultValue" type="string | string[]" default="undefined"}
  The initial open `value`(s) when uncontrolled.
  ::
  ::component-prop{name="type" type="'single' | 'multiple'" default="'single'"}
  Whether one or several panels can be open at a time.
  ::
  ::component-prop{name="collapsible" type="boolean" default="true"}
  When `type="single"`, whether clicking an open trigger close it again.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Prevents interaction with the accordion and all its items.
  ::
  ::component-prop{name="unmountOnHide" type="boolean" default="false"}
  When `false` (default) the panel stays mounted while closed so its height can
  spring back down; the collapsed content is `inert`. `true` unmounts a closed
  panel entirely — the classic "no exit motion" trade.
  ::
  ::component-prop{name="trailingIcon" type="IconifyIcon"}
  The icon on the right of every trigger. Defaults to Nuxt UI's chevron index.
  ::
  ::component-prop{name="valueKey" / "labelKey" type="string" default="'value' / 'label'"}
  Dot-path keys for reading each item's value and label.
  ::
  ::component-prop{name="expandedValue" type="string | number | null" default="undefined"}
  Deprecated alias for `modelValue`, kept for parity with the pre-Nuxt-UI API.
  `null` maps to the collapsed `''`. Prefer `v-model`.
  ::
  ::component-prop{name="onValueChange" type="(value: string | number | null | string[]) => void" default="undefined"}
  Deprecated. Called with the newly open `value`, or `null` when the open panel
  is toggled shut. Prefer `@update:model-value` / `v-model`.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the accordion root.
  ::
  ::component-prop{name="ui" type="object"}
  Nuxt UI `::ui` theme overrides — the same shape as `UAccordion`. The available
  slots are `root`, `item`, `header`, `trigger`, `content`, `body`, `leadingIcon`,
  `trailingIcon` and `label`.
  ::
::

## Slots

All slots are forwarded to the underlying `UAccordion`.

::component-slots
  ::component-slot-row{name="default" type="{ item, index, open }"}
  The trigger content for every item. Slot in a label, chevron, or button —
  the surrounding element is the trigger, so it stays a real button.
  ::
  ::component-slot-row{name="content" type="{ item, index, open, ui }"}
  The open panel body.
  ::
  ::component-slot-row{name="body" type="{ item, index, open, ui }"}
  Same as `content`, but the inner body wrapper — useful with
  `unmountOnHide="false"` to keep padding stable.
  ::
  ::component-slot-row{name="leading" / "trailing" type="{ item, index, open, ui }"}
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