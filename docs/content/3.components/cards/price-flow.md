---
title: Price Flow
description: A price counter that slides each changed digit into place with a single, gently staggered transition when the value updates.
---

Price Flow displays a numeric amount and slides individual digits when the value changes. Only the positions that actually changed animate, and each swaps its glyph with a single eased transition — staggered a few milliseconds apart so the change reads left-to-right instead of all at once. It rounds to nearest integer for display and preserves a stable width by growing slots to the widest value seen (never shrinking).

## Usage

Bind `value` to a reactive number. Optionally set `currency` (default `$`) and `prefix`. Click the buttons below to step the value by one and watch a single digit roll in place.

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
  <div class="flex w-full flex-col items-center gap-6">
    <MPriceFlow
      :value="total"
      prefix="Total:"
    />

    <div class="flex items-center gap-2">
      <UButton
        icon="i-lucide-minus"
        color="neutral"
        variant="outline"
        size="sm"
        aria-label="Decrease total"
        :disabled="step === 0"
        @click="step = step - 1"
      />
      <UButton
        icon="i-lucide-plus"
        color="neutral"
        variant="outline"
        size="sm"
        aria-label="Increase total"
        @click="step = step + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const base = 24
const step = ref(0)
const total = computed(() => base + step.value)
</script>
```
::

## Examples

### Billing toggle

The value can roll between any two numbers. Here a segment switch rolls a plan price from its monthly to its annual figure, and the extra digit slides in as the slot count grows:

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="price-flow-billing" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4">
    <UButtonGroup size="sm">
      <UButton
        label="Monthly"
        :color="yearly ? 'neutral' : 'primary'"
        :variant="yearly ? 'outline' : 'solid'"
        @click="yearly = false"
      />
      <UButton
        label="Yearly"
        :color="yearly ? 'primary' : 'neutral'"
        :variant="yearly ? 'solid' : 'outline'"
        @click="yearly = true"
      />
    </UButtonGroup>

    <div class="flex flex-col items-center gap-1">
      <MPriceFlow :value="yearly ? 229 : 19" />
      <p class="text-xs text-muted">
        Pro plan · billed {{ yearly ? 'annually' : 'monthly' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const yearly = ref(false)
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="price-flow-custom" />
  :::
#code
  <PlaygroundCode name="PriceFlow" />
::

## Props

::component-props
  ::component-prop{name="value" type="number" required}
  Numeric amount to display. The component rounds with `Math.round` internally and animates to the new rounded value.
  ::
  ::component-prop{name="currency" type="string" default="'$'"}
  Currency symbol shown before digits.
  ::
  ::component-prop{name="prefix" type="string" default="undefined"}
  Optional label shown before currency (e.g. "Total:").
  ::
  ::component-prop{name="class" type="string" default="undefined"}
  Merged onto root container.
  ::
::

## Events

No events are emitted by this component.

## Slots

::component-slots
  ::component-slot-row{name="default"}
  No default slot is used.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.priceFlow` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `flex items-center gap-0.5 font-mono`
  ::
  ::component-slot-row{name="inner"}
  `relative flex items-center gap-0.5`
  ::
  ::component-slot-row{name="prefix"}
  `text-lg text-muted mr-0.5`
  ::
  ::component-slot-row{name="currency"}
  `text-3xl font-bold text-highlighted`
  ::
  ::component-slot-row{name="digit"}
  `inline-block text-3xl font-bold text-highlighted`
  ::
::

## Accessibility

The root uses `role="img"` with `aria-label` computed as `prefix + currency + roundedAmount` (e.g. "Total:$29" or "$29" if no prefix). Individual digit spans are `aria-hidden="true"` inside a decorative wrapper; the meaningful value is conveyed via the aria-label. No focus handling or keyboard interactions are added. Each digit plays a single eased transition when its value changes; there is no `prefers-reduced-motion` override in source.

## Performance

- Rounds values with `Math.round` for stable digit sequences.
- Maintains `slots` (number of digit positions) as `max(slots, next.length)` and pads with non-breaking space (`\u00A0`) to prevent width reflow when numbers shrink.
- `AnimatePresence` with `mode="popLayout"`: each changed digit re-keys (`${index}-${digit}`) and swaps with a single `y:16, opacity:0 → y:0, opacity:1` tween (`duration:0.3`, `ease:[0.22, 1, 0.32, 1]`) whose `delay` scales with the digit position (`index * 0.04`) for a left-to-right stagger.
- Exiting digits are absolutely positioned by `popLayout`, so no layout shift occurs while the old glyph leaves.
- No `requestAnimationFrame` loop, timers or listeners: the transition is driven entirely by the key change. No WebGL or heavy allocations.

::tip
If you need to display decimals precisely, note the component rounds to nearest integer. For fractional cents that must roll smoothly, consider formatting to integer cents or adjust the display logic externally.
::

