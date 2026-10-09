---
title: Radio Group
description: A Nuxt UI radio group with a staggered entrance, a hover scale, and a dot that pops in.
navigation:
  icon: i-lucide-circle-dot
---

# Radio Group

A thin motion layer over Nuxt UI's `URadioGroup`. It declares one prop of its
own — `ui` — and forwards everything else to `URadioGroup` through `$attrs`, so
the whole `URadioGroup` API (`items`, `legend`, `orientation`, `size`, `variant`,
`color`, `disabled`, `loop`, `valueKey`, …) is available and documented in the
[Nuxt UI docs](https://ui.nuxt.com/components/radio-group).

The animation is CSS, not JavaScript. Items fade and lift in on a per-item
stagger, the unselected ring scales on hover, and the indicator's dot pops from
`scale(0)` when an item becomes checked.

Because the component is a single `URadioGroup` element with no `<slot>` of its
own, **named slots are not forwarded**. Pass `legend` as a prop and supply item
labels through `items`; a `legend`, `label` or `description` slot placed on
`MRadioGroup` will be silently dropped.

## Usage

Bind `v-model` to the selected item's value and hand the options to `items`.
Use `ui` to restyle, and it is merged over the motion classes rather than
replacing them.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="radio-group-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MRadioGroup
      v-model="plan"
      :items="plans"
      legend="Deployment target"
      :ui="{ label: 'font-medium' }"
    />

    <div class="flex items-center justify-between rounded-lg bg-elevated px-4 py-3 text-sm">
      <span class="text-muted">Selected</span>
      <span class="font-semibold capitalize text-highlighted">{{ plan }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const plan = ref('edge')

const plans = [
  { value: 'edge', label: 'Edge', description: 'Closest to your visitors' },
  { value: 'regional', label: 'Regional', description: 'Single data centre' },
  { value: 'self', label: 'Self-hosted', description: 'Your own hardware' },
]
</script>
```
::

## Props

::field-group
  ::field{name="ui" type="Record<string, any>" default="{}"}
  Merged into the `ui` object handed to `URadioGroup`. `root` and `indicator`
  additionally receive `m-radio-group` and `m-radio-indicator`, the class names
  the component's own CSS hooks onto — your values come first, so you can layer
  utilities on top without losing them.
  ::
  ::field{name="items" type="RadioGroupItem[]"}
  Forwarded from `URadioGroup`. Plain strings and numbers are normalised into
  `{ value, label }` pairs; objects are read through `valueKey`, `labelKey` and
  `descriptionKey`, and may also carry `disabled`, `icon` and their own `ui`.
  ::
  ::field{name="legend" type="string"}
  Forwarded from `URadioGroup`. Rendered inside a `<legend>`, which is the only
  way to name the group — `MRadioGroup` does not forward the `legend` slot.
  ::
  ::field{name="modelValue" type="string | number | null"}
  Forwarded from `URadioGroup` and the value behind `v-model`.
  ::
  ::field{name="color" type="string"}
  Forwarded from `URadioGroup`. Sets the checked ring and dot colour. Falls back
  to the surrounding `FormField` colour when the group sits inside a form field.
  ::
  ::field{name="orientation" type="'vertical' | 'horizontal'" default="'vertical'"}
  Forwarded from `URadioGroup`. Affects layout and arrow-key direction; the
  entrance stagger still counts items in DOM order.
  ::
  ::field{name="disabled" type="boolean" default="false"}
  Forwarded from `URadioGroup`, and applies to the whole group as well as any
  individual item.
  ::
::

## Events

::field-group
  ::field{name="update:modelValue" type="(value: string | number) => void"}
  Forwarded from `URadioGroup` through `$attrs`. Powers `v-model`.
  ::
  ::field{name="change" type="(event: Event) => void"}
  Forwarded from `URadioGroup`. `URadioGroup` builds a synthetic `Event` whose
  `target.value` is the newly selected value.
  ::
::

## Accessibility

The wrapper contributes no ARIA of its own. Everything comes from
`URadioGroup`, which renders a Reka UI `RadioGroupRoot` (`role="radiogroup"`)
wrapping a `<fieldset>` and `<legend>`, with each option a `<label>` bound to its
own radio input via `for`. Arrow-key traversal between options, roving focus and
`aria-checked` are Reka UI's, not this component's.

Reduced motion is handled properly and in CSS. A `prefers-reduced-motion:
reduce` block sets `animation: none` on the item entrance and on the checked
dot's pop, and removes both the base's `transform` transition and its hover
`scale(1.1)`. Nothing is left to check on the JavaScript side.

`class` and all ARIA attributes reach the root through `$attrs` and
`inheritAttrs: false`, so passing `aria-label` or a class to `MRadioGroup`
behaves as it does on `URadioGroup`.

## Performance

- The whole effect is one unscoped `<style>` block of CSS keyframes and
  transitions. No timers, no listeners, no `requestAnimationFrame`, and no
  per-render work.
- The entrance stagger is 40ms per item via `:nth-of-type()` rules, capped at
  360ms for the tenth item and everything after. It is a CSS animation with
  `both` fill mode, so it costs nothing in JS and finishes on its own.
- The hover scale and the dot pop animate `transform` only, so neither triggers
  layout.
- The style block is **not scoped**. `[data-slot="item"]` and `[data-slot="base"]`
  are the same attribute names `UCheckbox`, `USwitch` and other Nuxt UI form
  components use, so every radio group on the page picks up the entrance
  animation — including plain `URadioGroup` instances you did not wrap.
- The checked-state pop is bound to `.m-radio-indicator[data-state="checked"]`,
  which Reka UI sets on the indicator. The class is applied through `ui`, so it
  is present as soon as `URadioGroup` renders.

::tip
The `both` fill mode means the entrance keyframes hold their `to` state
permanently after finishing, but they also run once on every remount. Putting a
radio group inside a `<Transition>` or a tab panel will replay the stagger each
time the panel is revealed.
::
