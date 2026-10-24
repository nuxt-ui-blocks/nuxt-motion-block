---
title: Morph Toggle
description: A switch whose thumb rolls across the track and squares off while it is off.
---

A switch with three faces. The default variant is a clean track and a round
thumb. `morph` adds a second idea: the thumb is a rounded square while off and
turns into a circle as it travels, so the shape itself says which state you are
looking at. `icon` keeps the circle and cross-fades a pair of icons inside it,
rotating the outgoing one away.

A short transition only ever touches the thumb's offset and radius, so the track
never reflows and the switch keeps a stable footprint in a form row.

## Usage

The state is controlled with `v-model`. `defaultChecked` covers the uncontrolled
case, and `disabled` removes both the pointer and the keyboard path in one
attribute.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="morph-toggle-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-start gap-6 py-8">
    <div class="flex items-center gap-3">
      <MMorphToggle
        v-model="email"
        label="Email notifications"
      />
      <span class="text-sm text-muted">Email notifications</span>
    </div>

    <div class="flex items-center gap-3">
      <MMorphToggle
        v-model="morph"
        label="Weekly digest"
        variant="morph"
      />
      <span class="text-sm text-muted">Weekly digest (morph)</span>
    </div>

    <div class="flex items-center gap-3">
      <MMorphToggle
        v-model="dark"
        label="Dark mode"
        size="lg"
        variant="icon"
      >
        <template #icon-on>
          <UIcon
            class="size-3.5"
            name="i-lucide-moon"
          />
        </template>
        <template #icon-off>
          <UIcon
            class="size-3.5"
            name="i-lucide-sun"
          />
        </template>
      </MMorphToggle>
      <span class="text-sm text-muted">Dark mode (icon)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref(true)
const morph = ref(false)
const dark = ref(true)
</script>
```

::

The `icon` variant falls back to a check and a cross when no slots are passed,
so it is usable before you have icon assets wired up.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="morph-toggle-custom" />
  :::
#code
  <PlaygroundCode name="MorphToggle" />
::

## Props

::component-props
  ::component-prop{name="modelValue" type="boolean"}
  Controlled state. Leave it out to let the component keep its own.
  ::
  ::component-prop{name="defaultChecked" type="boolean" default="false"}
  Initial state in uncontrolled usage.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Disable the switch.
  ::
  ::component-prop{name="label" type="string"}
  Accessible name for the switch. Pass it whenever no visible label is
  associated with the control.
  ::
  ::component-prop{name="size" type="'sm' | 'md' | 'lg'" default="'md'"}
  Size of the track and thumb.
  ::
  ::component-prop{name="variant" type="'default' | 'morph' | 'icon'" default="'default'"}
  Visual treatment.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the button.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: boolean) => void"}
  Fired with the next state on click, Space or Enter. Pair it with `modelValue`
  for controlled usage.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="icon-on"}
  Icon shown inside the thumb while checked. Only used by the `icon` variant.
  ::
  ::component-slot-row{name="icon-off"}
  Icon shown inside the thumb while unchecked. Only used by the `icon` variant.
  ::
::

## Accessibility

- The control is a native `<button role="switch">` with `aria-checked`, so
  screen readers announce both the role and the current state.
- Space and Enter work through native button activation rather than a custom key
  handler, which keeps the browser's default behaviour intact.
- `disabled` sets the button's `disabled` attribute, removing it from pointer and
  keyboard interaction and announcing the state.
- The thumb position and shape are never the only signal: `aria-checked` carries
  the state for assistive technology.
- Focus is a two-pixel ring offset from the track, independent of the checked
  colour.
- Under `prefers-reduced-motion` the thumb jumps straight to its new offset and
  shape, and the icon cross-fade becomes an instant swap.

## Performance

- Only the thumb animates, and only on `transform` and `border-radius`; the track
  changes colour through the same CSS transition.
- The transition runs on the compositor with no JavaScript per frame, so
  toggling does not force a synchronous reflow.
- Icons swap through a Vue transition with two keys, so no hidden pair is kept
  alive.
- The component holds no timers and no observers.
