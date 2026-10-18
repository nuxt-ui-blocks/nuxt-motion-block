---
title: Animated Number Input
description: A number input whose digits roll up and down as the value changes.
---

A number input whose digits roll. Each character of the displayed value sits in
its own cell, and when a character changes it enters and exits with a vertical
offset in the direction of the change — up when the number grew, down when it
shrank.

The visible digits are not the input's text. A real `UInputNumber` sits underneath
with its text made transparent and only its caret left visible, and a
`aria-hidden`, `pointer-events-none` overlay draws the formatted, animated value
on top. That is what lets a `$12,480.00` be formatted and animated while the
field underneath stays a plain editable text input.

The input keeps a raw copy of what you are typing and shows that instead of the
formatted value while the field has focus, so a partially typed number is never
reformatted under the caret.

## Usage

Bind `v-model` to a number. Use `formatOptions` for anything `Intl.NumberFormat`
accepts — currency, compact notation, locale grouping — and `min`/`max` to clamp
the field. Setting `decrement="false"` moves the number left so it clears the
increment button on its own.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-number-input-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <MAnimatedNumberInput
      v-model="seats"
      label="Seats"
      :min="1"
      :max="12"
      :step="1"
    />

    <MAnimatedNumberInput
      v-model="budget"
      label="Monthly budget"
      :decrement="false"
      :min="0"
      :step="500"
      :format-options="currency"
    />

    <div class="flex items-center justify-between rounded-lg bg-elevated px-4 py-3 text-sm">
      <span class="text-muted">Projected monthly total</span>
      <span class="font-semibold tabular-nums text-highlighted">{{ total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const seats = ref(4)
const budget = ref(2500)

const currency = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }

const total = computed(() => new Intl.NumberFormat('en-US', currency).format(seats.value * budget.value))
</script>
```
::


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-number-input-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedNumberInput" />
::

## Props

::component-props
  ::component-prop{name="modelValue" type="number"}
  The current value. While `undefined` the component uses its internal copy
  seeded from `defaultValue`; passing a value switches it to controlled mode.
  The digit direction is derived from this number's changes.
  ::
  ::component-prop{name="defaultValue" type="number" default="0"}
  Seeds the uncontrolled value, and is also forwarded to `UInputNumber` as its
  own `default-value`. Only read during setup.
  ::
  ::component-prop{name="label" type="string" default="''"}
  Rendered as a real `<label :for>` above the field, and only rendered at all
  when non-empty — there is no floating or in-field label here.
  ::
  ::component-prop{name="formatOptions" type="Intl.NumberFormatOptions"}
  Forwarded into `new Intl.NumberFormat`. Accepts anything `Intl` does, so
  `{ style: 'currency', currency: 'USD' }` and
  `{ notation: 'compact' }` both work. The formatter is rebuilt when this
  object's identity changes.
  ::
  ::component-prop{name="min" type="number" default="-Infinity"}
  Lower bound. An infinite value is passed to `UInputNumber` as `undefined`, so
  the default really is unbounded rather than a literal `Infinity`.
  ::
  ::component-prop{name="max" type="number" default="Infinity"}
  Upper bound, with the same infinite-value handling as `min`.
  ::
  ::component-prop{name="step" type="number" default="1"}
  Increment applied by the stepper buttons and by arrow keys.
  ::
  ::component-prop{name="increment" type="boolean | object" default="true"}
  Forwarded to `UInputNumber`. `false` removes the increment button; an object is
  spread onto the button, so `{ class: 'text-primary' }` works. When `decrement`
  is `false` the number left-aligns to clear this button.
  ::
  ::component-prop{name="decrement" type="boolean | object" default="true"}
  Forwarded to `UInputNumber`, with the same object form as `increment`. Setting
  it to `false` switches the overlay from centred to left-aligned padding.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Forwarded to `UInputNumber`, which disables the input and both stepper buttons.
  The overlay stays visible and keeps showing the current value.
  ::
  ::component-prop{name="id" type="string"}
  Forwarded as the field's `id`. When omitted the component derives one from
  `useId()`, and the rendered `<label>` points at it.
  ::
  ::component-prop{name="name" type="string"}
  Forwarded, so the field participates in native form submission.
  ::
  ::component-prop{name="placeholder" type="string"}
  Forwarded to the underlying input, and therefore visible through the transparent
  text layer.
  ::
  ::component-prop{name="required" type="boolean" default="false"}
  Forwarded to `UInputNumber`.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: number) => void"}
  Emitted whenever `UInputNumber` reports a new value. Also clears the editing
  flag, so a change made with the stepper buttons reformats the display
  immediately.
  ::
  ::component-event{name="blur" type="(event: FocusEvent) => void"}
  Forwarded from `UInputNumber`'s input blur.
  ::
  ::component-event{name="change" type="(event: Event) => void"}
  Forwarded from `UInputNumber`. A synthetic `Event` whose `target.value` is the
  formatted value.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedNumberInput` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-flex flex-col gap-1.5`
  ::
  ::component-slot-row{name="label"}
  `text-sm font-medium text-highlighted`
  ::
  ::component-slot-row{name="field"}
  `animated-number-input-hide relative`
  ::
  ::component-slot-row{name="input"}
  `w-full`
  ::
  ::component-slot-row{name="overlay"}
  `pointer-events-none absolute inset-0 flex select-none items-center text-base/5 text-highlighted md:text-sm`
  ::
  ::component-slot-row{name="digit"}
  `relative inline-block h-[1.2em] w-[0.62em] overflow-hidden text-center align-bottom tabular-nums`
  ::
  ::component-slot-row{name="char"}
  `absolute inset-0 flex items-center justify-center`
  ::
::

## Accessibility

The component renders a genuine `<label :for>` bound to a generated id, so the
label is associated by the platform rather than by `aria-label`. Below it,
`UInputNumber` supplies the spinbutton semantics, `aria-valuemin`,
`aria-valuemax`, `aria-valuenow`, and `aria-label`ed increment and decrement
buttons.

The overlay that draws the visible digits is `aria-hidden` and
`pointer-events-none`, so the number is announced once, from the real input. The
input's `color` is forced transparent while its `caret-color` is set to the
highlighted foreground, which is why the caret is still visible while the digits
appear to be painted by the component.

Two consequences of that arrangement are worth stating plainly. Because the
overlay is `select-none` and the underlying text is transparent, **the displayed
value cannot be selected or copied** by dragging over it. And since the real
input is a text field rather than `type="number"`, the digits the user sees are
the unformatted raw text — in-page find, autofill and password managers all see
the raw value, not the currency-formatted one.

`useReducedMotion()` is honoured. Under reduce the spring collapses to
`{ duration: 0 }` and the enter/exit states drop their `y` offset, so digits
swap in place instead of rolling.

## Performance

- The overlay renders one cell per character and each cell holds a single
  `motion.span` inside `AnimatePresence mode="popLayout"`. A long currency value
  is a handful of absolutely-positioned spans, and only the characters that
  actually changed are mounted and unmounted.
- Movement is `y`, a transform, so the roll never triggers layout. The only
  layout-adjacent work is the per-character wrapper sizing, which is static.
- Four listeners are attached: capture-phase `input` and `pointerdown` on the
  field, and `pointerup` and `pointercancel` on `window`. All four are removed on
  unmount. No timers and no `requestAnimationFrame`.
- A `pressFirstUpdate` guard means a held stepper button registers only its first
  update. Without it, key repeat would push a stream of values and roll the digits
  faster than they can animate.
- A watcher on the value sets the roll direction, so the offset is correct on the
  first frame of the change rather than being corrected a frame later.
- While the field has focus, the overlay shows the raw input text captured by the
  capture-phase `input` listener, which is what stops a partially typed number
  from being reformatted mid-keystroke.
- The `Intl.NumberFormat` instance is held in a computed, so it is only
  reconstructed when `formatOptions` changes identity.

::tip
Each character's cell is keyed by its **index** and the animated span inside is
keyed by the **character**, so `AnimatePresence` diffs per position. Going from
`2500` to `3000` rolls only the leading digit and leaves the rest of the number
perfectly still — the animation is local to the characters that changed, not to
the value as a whole.
::

