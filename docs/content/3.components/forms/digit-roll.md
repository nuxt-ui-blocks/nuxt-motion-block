---
title: Digit Roll
description: A numeric field whose digits roll vertically on change, with horizontal scrubbing and keyboard stepping.
---

A number field with a typographic face. The value is rendered as a row of fixed
width slots, each one tall enough for a single line, and only the characters
that change roll out and in. Typing still works: a transparent input sits over
the whole field, so the digits you see are decorative and the value you edit is
the real control underneath.

The rolling direction follows the value. Increasing sends the old digit up and
the new one in from below; decreasing does the opposite, and a digit that does
not change stays still. That detail is what makes a multi-digit number read as
one counter instead of several independent animations.

## Usage

`prefix` and `suffix` are rendered inside the field and are stripped when a typed
value is parsed. `precision` rounds both typed and stepped values, and `step`
drives the arrow keys, the stepper buttons and the scrub distance.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="digit-roll-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-6">
    <MDigitRoll
      class="w-52"
      :default-value="12"
      label="Tip"
      :max="100"
      :min="0"
      :precision="2"
      prefix="$"
      :step="0.5"
      stepper
    />
  </div>
</template>
```

::

Drag horizontally anywhere on the field to scrub the value. The gesture only
starts after a few pixels of movement, so a click still places the caret.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="digit-roll-custom" />
  :::
#code
  <PlaygroundCode name="DigitRoll" />
::

## Props

::component-props
  ::component-prop{name="modelValue" type="number"}
  Controlled value. Leave it out to let the component keep its own.
  ::
  ::component-prop{name="defaultValue" type="number" default="0"}
  Starting value in uncontrolled usage.
  ::
  ::component-prop{name="min" type="number" default="-Infinity"}
  Smallest allowed value. Also the target of the Home key.
  ::
  ::component-prop{name="max" type="number" default="Infinity"}
  Largest allowed value. Also the target of the End key.
  ::
  ::component-prop{name="step" type="number" default="1"}
  Increment used by the arrow keys, the stepper buttons and scrubbing.
  ::
  ::component-prop{name="precision" type="number"}
  Decimal places the value is rounded to, and the digits shown after the
  decimal separator.
  ::
  ::component-prop{name="format" type="Intl.NumberFormatOptions"}
  Formatting options merged over the precision defaults, for currency, percent
  or unit suffixes.
  ::
  ::component-prop{name="prefix" type="string" default="''"}
  Static text before the value.
  ::
  ::component-prop{name="suffix" type="string" default="''"}
  Static text after the value.
  ::
  ::component-prop{name="label" type="string"}
  Visible label, also used as the accessible name.
  ::
  ::component-prop{name="stepper" type="boolean" default="false"}
  Render the minus and plus buttons inside the field.
  ::
  ::component-prop{name="scrub" type="boolean" default="true"}
  Allow horizontal dragging to change the value.
  ::
  ::component-prop{name="clampOnBlur" type="boolean" default="true"}
  Clamp a typed out-of-range value instead of rejecting it on commit.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Disable typing, stepping and scrubbing.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the outer wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: number) => void"}
  Fired whenever the committed value changes, whether it came from typing,
  keys, the stepper or a scrub. Pair it with `modelValue` for controlled usage.
  ::
::

## Accessibility

- The real element is an `<input>` with `role="spinbutton"`, `aria-valuenow`,
  `aria-valuemin`, `aria-valuemax` and a formatted `aria-valuetext`, so the
  spoken value matches what is on screen.
- The visible digits are `aria-hidden`; they are a rendering of the value, not a
  second source of truth.
- Up and Down step, Page Up and Page Down jump ten steps, Shift multiplies the
  step by ten, Alt divides it, and Home and End jump to the finite bounds.
- The label is tied to the input with `for`/`id`; without a label the input falls
  back to the accessible name `Number input`.
- An invalid commit sets `aria-invalid` and shakes the field, so the error is not
  conveyed by the red border alone. Under reduced motion the shake is skipped.
- The stepper buttons are real buttons with `aria-label`s and become disabled at
  the bounds instead of silently doing nothing.

## Performance

- Only the characters that changed are mounted and animated. Unchanged digits
  keep their node, so a value like `1.10` to `1.11` animates one slot.
- `Intl.NumberFormat` is built once per precision and format options, not on
  every render or keypress.
- Scrubbing quantises the pointer to eight-pixel steps and only commits when the
  quantised value changes, so a drag does not fire a cascade of identical
  updates.
- The roll itself is a short spring on `y` and `opacity`; there is no layout
  measurement and no per-frame JavaScript.
