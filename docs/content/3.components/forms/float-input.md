---
title: Float Input
description: A text field whose label floats up into the border when the field is focused or filled.
---

A field with one label doing two jobs. At rest the label sits inside the input
and acts as the placeholder; on focus, or as soon as there is a value, it rises
into the top border, shrinks and takes the accent colour. Nothing jumps: the
label keeps its position in the DOM, so the input never reflows and the caret
never moves.

The floating position is absolute, driven by a `y` transform instead of a class
swap. That keeps the transition interruptible, which matters when a user tabs
through a form quickly: a half-floated label reverses from wherever it is
rather than snapping back to the start.

## Usage

The value is controlled with `v-model`. `defaultValue` covers the uncontrolled
case, and the floating state is derived from the value plus focus, so a field
prefilled from a server renders with the label already up.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="float-input-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-6">
    <MFloatInput
      v-model="email"
      icon="i-lucide-mail"
      label="Email address"
      placeholder="you@example.com"
    />

    <MFloatInput
      v-model="name"
      label="Full name"
      placeholder="Ada Lovelace"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const name = ref('Ada Lovelace')
</script>
```

::

`icon` accepts any Iconify name and is rendered inside the field; the slot of
the same name lets you pass an SVG or another component instead.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="float-input-custom" />
  :::
#code
  <PlaygroundCode name="FloatInput" />
::

## Props

::component-props
  ::component-prop{name="modelValue" type="string"}
  Controlled value. Leave it out to let the component keep its own.
  ::
  ::component-prop{name="defaultValue" type="string" default="''"}
  Starting value in uncontrolled usage.
  ::
  ::component-prop{name="label" type="string"}
  Visible label, also used as the accessible name. Required.
  ::
  ::component-prop{name="placeholder" type="string" default="''"}
  Placeholder shown only after the label has floated out of the field.
  ::
  ::component-prop{name="icon" type="string"}
  Iconify name rendered at the start of the field.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Disable the input and fade it out.
  ::
  ::component-prop{name="inputClass" type="string"}
  Extra classes for the input element.
  ::
  ::component-prop{name="labelClass" type="string"}
  Extra classes for the floating label.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: string) => void"}
  Fired on every keystroke with the raw input value. Pair it with `modelValue`
  for controlled usage.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="icon"}
  Replaces the default icon render. The wrapper is `aria-hidden`, so the slot
  should stay decorative; the label carries the meaning.
  ::
::

## Accessibility

- The label is a real `<label>` with a `for` pointing at the input's generated
  `id`, so clicking it focuses the field and screen readers announce it once.
- The input also carries `aria-label`, which keeps the accessible name intact
  if the label is restyled or moved outside the visual flow.
- The placeholder is empty until the label floats, so the visible text is never
  duplicated by a placeholder at the same time.
- Focus is shown with a two-pixel ring offset from the border, not by the label
  colour alone.
- The floating transform is purely visual and does not affect layout, focus or
  hit testing.
- Under `prefers-reduced-motion` the label changes position instantly instead of
  animating.

## Performance

- The field keeps no animation loop and no timers; motion only runs while the
  label transitions.
- Only `transform`, `color` and `scale` are animated, all of which the compositor
  can handle without layout.
- The wrapper is a single flex container with the label absolutely positioned,
  so showing or hiding the icon does not cause a reflow of the input.
- `inputClass` and `labelClass` are plain class merges; no styles are generated
  per instance.
