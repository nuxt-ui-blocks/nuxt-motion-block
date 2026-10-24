---
title: Number Flow
description: A three-cell counter whose digits roll in the direction of the change.
---

An odometer for dashboards: three fixed cells, one digit each, and the digits
that change slide vertically in the direction the value moved. Increasing sends
the old digit up, decreasing sends it down, and untouched places stay put, so
`128` to `129` animates a single cell.

The readout is deliberately fixed-width. Values below one hundred show a leading
zero, which keeps the cells from reflowing as the number grows and gives a
counter the steady face of an instrument rather than the ragged edge of a
sentence. The value itself is exposed to assistive technology separately, so the
leading zeros are never read out.

## Usage

The buttons are the only input. They disable themselves at `min` and `max`, and
the component emits `update:modelValue` so it can be controlled from anywhere.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="number-flow-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-3 py-6">
    <p class="text-sm text-muted">
      Orders shipped
    </p>
    <MNumberFlow
      v-model="count"
      :max="999"
      :min="0"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(128)
</script>
```

::

Rapid clicks are safe: the component keeps its own cursor of the committed value,
so two clicks in the same tick count twice even when a parent has not re-rendered
yet.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="number-flow-custom" />
  :::
#code
  <PlaygroundCode name="NumberFlow" />
::

`buttonClass` styles both stepper buttons and `digitClass` restyles the row of
cells without touching the readout logic.

## Props

::component-props
  ::component-prop{name="modelValue" type="number"}
  Controlled value. Leave it out to let the component keep its own, starting at
  zero.
  ::
  ::component-prop{name="min" type="number" default="0"}
  Smallest allowed value.
  ::
  ::component-prop{name="max" type="number" default="999"}
  Largest allowed value.
  ::
  ::component-prop{name="digitClass" type="string"}
  Extra classes for the row of digit cells.
  ::
  ::component-prop{name="buttonClass" type="string"}
  Extra classes for each stepper button.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the outer wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: number) => void"}
  Fired on every step. Pair it with `modelValue` for controlled usage.
  ::
::

## Accessibility

- The numeric value is rendered in a visually hidden `<output>` with an
  accessible name, while the digit cells are `aria-hidden`. A screen reader gets
  one exact number instead of three decorative glyphs.
- Both buttons are real `<button>` elements with `aria-label`s, so their purpose
  does not depend on the plus and minus icons.
- The buttons become disabled at the bounds, which is announced and also stops
  the value from drifting outside `min`/`max`.
- Nothing is conveyed by colour alone; the value is always in text.
- Under `prefers-reduced-motion` the digits swap instantly rather than rolling.

## Performance

- Each place is keyed by its own digit, so only the cells whose digit changed
  remount and animate. Unchanged places keep their DOM node.
- The counter has no timer, no interval and no animation loop. Work happens on a
  button press and then stops.
- There is no text measurement, no resize observer and no layout read; the three
  cells are fixed width by design.
- The transition is a 300ms tween on `transform` and `opacity`, both of which
  stay off the main thread.
