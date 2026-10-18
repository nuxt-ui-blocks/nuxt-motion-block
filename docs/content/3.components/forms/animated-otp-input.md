---
title: Animated OTP Input
description: A one-time-code input whose digits flip and scale in as each cell is filled.
---

A one-time-code field. Each cell's digit flips in on `rotateY` with a small
scale and vertical offset, the filled cell settles at `scale(1.05)`, and a
blinking caret marks the focused empty cell. Group separators are drawn every
three cells, so a six-digit code reads as two groups of three.

Underneath is a real `UPinInput` with its text, caret, background and shadow all
made transparent. The visible cells are a painted overlay positioned on top, so
the digits you see are not the digits the inputs hold.

When every cell is filled the component emits `complete` and flashes its
`successColor` as a `boxShadow` around the whole field for 1500ms.

## Usage

Bind `v-model` to the digit string and listen for `complete`. `length` is the
number of cells. Paste works: non-digits are stripped before they reach state.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-otp-input-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium text-highlighted">
        Verification code
      </p>
      <MAnimatedOTPInput
        v-model="code"
        :length="6"
        @complete="onComplete"
      />
    </div>

    <div class="flex items-center gap-3">
      <UButton
        size="sm"
        label="Autofill"
        icon="i-lucide-wand-sparkles"
        @click="code = '424242'"
      />
      <UButton
        size="sm"
        label="Clear"
        variant="outline"
        color="neutral"
        @click="code = ''"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const code = ref('')
const status = ref('Waiting for 6 digits')

function onComplete(value: string) {
  status.value = `Complete: ${value}`
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
    <component-example name="animated-otp-input-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedOTPInput" />
::

## Props

::component-props
  ::component-prop{name="modelValue" type="string" default="''"}
  The code as one string, without separators. It is sanitised on the way in:
  every non-digit is dropped and the result is truncated to `length`, so a
  prefilled `"42 42 42"` arrives as `"424242"`.
  ::
  ::component-prop{name="length" type="number" default="6"}
  How many cells to draw and accept. The internal cell array is built once from
  this at setup; it is only rebuilt to the new length when `modelValue` next
  changes, so changing `length` on its own will not resize the field.
  ::
  ::component-prop{name="successColor" type="string" default="'var(--ui-success)'"}
  The glow colour flashed around the field when the code completes. Accepts any
  CSS colour, including a `var()` reference. Not a prop of `UPinInput` — this one
  belongs to the component.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Forwarded to `UPinInput`. The painted cells stay visible and keep showing their
  digits; only the inputs become unfocusable.
  ::
  ::component-prop{name="placeholder" type="string"}
  Forwarded to `UPinInput`, so it shows through the transparent input layer.
  ::
  ::component-prop{name="name" type="string"}
  Forwarded, for native form submission.
  ::
  ::component-prop{name="required" type="boolean" default="false"}
  Forwarded to `UPinInput`.
  ::
  ::component-prop{name="autofocus" type="boolean" default="false"}
  Forwarded to `UPinInput`, which focuses the first input after a
  `autofocusDelay` timeout.
  ::
  ::component-prop{name="autofocusDelay" type="number" default="0"}
  Milliseconds to wait before the autofocus fires. Lets you defer the focus until
  after an entrance animation.
  ::
  ::component-prop{name="variant" type="PinInputProps['variant']" default="'outline'"}
  Forwarded to `UPinInput`. Its styling is hidden behind the transparent layer,
  so this mainly affects focus and error styling of the real inputs.
  ::
  ::component-prop{name="size" type="PinInputProps['size']" default="'lg'"}
  Forwarded to `UPinInput`. Also drives the group separator positions — see the
  tip, because the painted cells do not follow it.
  ::
  ::component-prop{name="color" type="PinInputProps['color']" default="'primary'"}
  Forwarded to `UPinInput` and used for the focused cell's border and ring.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: string) => void"}
  Emitted on every change to the underlay, with the joined cell values and no
  separators.
  ::
  ::component-event{name="complete" type="(value: string) => void"}
  Emitted whenever a change leaves all `length` cells filled. Because it is
  driven by a watcher rather than by a transition edge, editing one digit of an
  already-complete code emits it again. A code supplied through `modelValue` on
  mount does **not** emit it.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedOTPInput` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block rounded-md`
  ::
  ::component-slot-row{name="underlay"}
  `an-otp inline-flex`
  ::
  ::component-slot-row{name="overlay"}
  `pointer-events-none absolute left-0 top-0 flex h-full items-center gap-1.5`
  ::
  ::component-slot-row{name="cell"}
  `relative flex size-9 items-center justify-center rounded-md border border-accented bg-elevated shadow-xs transition-[border-color,box-shadow] duration-150`
  ::
  ::component-slot-row{name="cellText"}
  `font-medium text-highlighted`
  ::
  ::component-slot-row{name="glyph"}
  `block`
  ::
  ::component-slot-row{name="caret"}
  `pointer-events-none absolute inset-0 flex items-center justify-center`
  ::
  ::component-slot-row{name="caretBar"}
  `h-4 w-px bg-inverted`
  ::
  ::component-slot-row{name="separator"}
  `text-dimmed absolute`
  ::
  ::component-slot-row{name="separatorLine"}
  `block h-px w-2 bg-dimmed`
  ::
::

## Accessibility

Every cell is a real, focusable input from Reka UI's `PinInput`, so digit entry,
arrow movement between cells and Backspace all behave natively, and `disabled`
blocks them properly. The component does not add ARIA of its own — and it depends
on Reka UI's per-cell `aria-label` of `pin input N`, both to find the focused cell
and as the input's accessible name.

There is one duplication to be aware of. Unlike the number input, the painted
overlay is **not** `aria-hidden`; it is only `pointer-events-none`, which stops
the pointer but leaves it in the accessibility tree. A filled code is therefore
exposed twice — once by the inputs and once by the overlay spans. If the exact
announcement matters, set the field inside a container you can mark
`aria-hidden`, or read the value from your own `v-model`.

Focus is still visible: the focused empty cell gains `border-primary` and a 3px
primary ring. Under `prefers-reduced-motion` that ring is the *only* cue for a
focused empty cell, because the blinking caret is not rendered at all.

## Performance

- The real inputs are stripped of `color`, `caret-color`, `background`,
  `box-shadow` and `outline` by a scoped `:deep()` rule, and the visible digit is
  a separate `AnimatePresence` span. Typing therefore never reflows the painted
  cell, and the input's own text layer costs nothing to update.
- Focus tracking is delegated to the wrapper: one `focusin` and one `focusout`,
  each doing a single `querySelectorAll('input[aria-label^="pin input"]')` and an
  `indexOf(document.activeElement)` — not a listener or an index per cell.
- `sanitize` strips non-digits and right-trims empty trailing cells before they
  reach state, so pasting `12-34 56` completes normally and a short paste never
  leaves a gap in the middle of the array.
- Cell entrances are staggered by `index * 50ms`, computed arithmetically in the
  transition rather than by nested timers.
- The success glow is a single `boxShadow` animation on the root element, held
  for 1500ms by one `setTimeout`. That timeout is not cancelled on unmount.
- The caret is one `motion.span` running a 1s infinite opacity keyframe, mounted
  only while an empty cell is focused, and not rendered at all under reduced
  motion.
- No `ResizeObserver`, no `MutationObserver`, no layout reads.

::tip
The painted cells are a hardcoded `size-9` — 36px — while the group separators are
positioned from a `size`-to-pixel table whose default (`lg`) also resolves to
36px. The overlay therefore lines up with the real inputs only at the default
size. Set `size="sm"` or `size="xl"` and the drawn cells drift out of register
with the inputs they are representing.
::

