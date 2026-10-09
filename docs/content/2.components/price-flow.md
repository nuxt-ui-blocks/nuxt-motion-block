---
title: Price Flow
description: A rolling price counter where each digit animates independently with spring physics when the value changes.
navigation:
  icon: i-lucide-dollar-sign
---

# Price Flow

Price Flow displays a numeric amount and rolls individual digits when the value changes. It rounds to nearest integer for display, preserves a stable width by growing slots to the widest value seen (never shrinking), and animates each changing digit with its own spring. A small requestAnimationFrame stepper updates values in 8 discrete steps over 600ms so glyphs don't overlap; the per-digit spring provides the easing. Ported from smoothui's price-flow.

## Usage

Bind `value` to a reactive number. Optionally set `currency` (default `$`) and `prefix`. Click/toggle the example below to see the digit roll in action.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="price-flow-basic" />
  :::
#code
```vue
<template>
  <div class="flex h-24 w-full items-center justify-center">
    <MPriceFlow
      :value="price"
      prefix="Total:"
      @click="price = price === 29.99 ? 49.99 : 29.99"
      class="cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
const price = ref(29.99)
</script>
```
::

## Props

::field-group
  ::field{name="value" type="number" required}
  Numeric amount to display. The component rounds with `Math.round` internally and animates to the new rounded value.
  ::
  ::field{name="currency" type="string" default="'$'"}
  Currency symbol shown before digits.
  ::
  ::field{name="prefix" type="string" default="undefined"}
  Optional label shown before currency (e.g. "Total:").
  ::
  ::field{name="class" type="string" default="undefined"}
  Merged onto root container.
  ::
::

## Events

No events are emitted by this component.

## Slots

::field-group
  ::field{name="default"}
  No default slot is used.
  ::
::

## Accessibility

The root uses `role="img"` with `aria-label` computed as `prefix + currency + roundedAmount` (e.g. "Total:$29" or "$29" if no prefix). Individual digit spans are `aria-hidden="true"` inside a decorative wrapper; the meaningful value is conveyed via the aria-label. No focus handling or keyboard interactions are added. Animations run continuously during the roll but there is no `prefers-reduced-motion` override in source.

## Performance

- Rounds values with `Math.round` for stable digit sequences.
- Maintains `slots` (number of digit positions) as `max(slots, next.length)` and pads with non-breaking space (`\u00A0`) to prevent width reflow when numbers shrink.
- Uses `requestAnimationFrame` stepper: 8 steps over 600ms, linear quantization of time (not eased on steps) so steps remain spaced; per-digit spring (`stiffness:300, damping:30`) provides visual easing.
- `AnimatePresence` with `mode="popLayout"` and spring on enter (`y:20,opacity:0 → y:0,opacity:1`) and quick tween exit (`y:-20,opacity:0, duration:0.07`) for each changing digit key (`${index}-${digit}`).
- Only one RAF loop active at a time; cancelled on value change and on unmount. No WebGL or heavy allocations.
- Watch on `value` triggers `animateToValue` which computes start/diff and runs the stepper.

::tip
If you need to display decimals precisely, note the component rounds to nearest integer. For fractional cents that must roll smoothly, consider formatting to integer cents or adjust the display logic externally.
::