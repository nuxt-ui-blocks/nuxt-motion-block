---
title: AI Context Meter
description: A ring that shows how full the context window is, changing hue at the thresholds and never changing size.
---

How much of the window is left is a number that only matters near the end. A
progress bar that creeps forward for the whole conversation teaches the reader to
ignore it, and by the time it matters they have stopped looking.

So the ring does not grow. It tracks the fraction the whole way through, and the
only thing that changes at 80% and 95% is the hue — muted, then amber, then red.
The geometry is fixed because a ring that swells at the warning point reads as
progress, which is exactly the wrong story.

Hover or focus the trigger and it expands into the breakdown: what is actually
filling the window. Without a `breakdown` there is nothing to open, and the
component renders a `span` rather than a disabled button, so the number is still
announced instead of dropping out of the tab order.

## Usage

Give it `used` and `limit` in tokens; it formats both itself. Both are clamped
into the window, so a stale `used` that overshoots the limit cannot draw an arc
past full.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-context-meter-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <div
      v-for="meter in meters"
      :key="meter.note"
      class="flex items-center gap-3"
    >
      <MAiContextMeter
        :used="meter.used"
        :limit="meter.limit"
        :breakdown="breakdownFor(meter.used)"
      />
      <span class="text-xs text-muted">{{ meter.note }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Three windows at increasing pressure. The fractions are what matter, not the
 * exact numbers: 33% is quiet, 84% is amber, 98% is red.
 */
const meters = [
  { note: 'A fresh conversation', used: 42_000, limit: 128_000 },
  { note: 'A long document', used: 108_000, limit: 128_000 },
  { note: 'A long document, still open', used: 126_000, limit: 128_000 },
]

/**
 * The split is illustrative, but it has to add up to `used` - a breakdown that
 * contradicts its own ring is the kind of detail that quietly teaches the wrong
 * thing.
 */
const breakdownFor = (used: number) => [
  { label: 'Conversation', tokens: Math.round(used * 0.55) },
  { label: 'Retrieved documents', tokens: Math.round(used * 0.3) },
  { label: 'System prompt', tokens: used - Math.round(used * 0.55) - Math.round(used * 0.3) },
]
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="ai-context-meter-custom" />
  :::
#code
  <PlaygroundCode name="AiContextMeter" />
::

## Props

::component-props
  ::component-prop{name="used" type="number"}
  Tokens currently in the window. Clamped to `0..limit`.
  ::
  ::component-prop{name="limit" type="number"}
  Total size of the window, in tokens. Zero renders an empty ring rather than a
  full one - there is no window to be full of.
  ::
  ::component-prop{name="breakdown" type="AiContextBreakdownItem[]"}
  `{ label, tokens }` rows shown in the popover. Supplying it is what makes the
  trigger a button.
  ::
  ::component-prop{name="warningAt" type="number" default="0.8"}
  Fraction at which the ring turns amber.
  ::
  ::component-prop{name="dangerAt" type="number" default="0.95"}
  Fraction at which the ring turns red.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the outer wrapper.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiContextMeter` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block`
  ::
  ::component-slot-row{name="trigger"}
  The clickable row: ring and readout, with the full sentence as its label.
  ::
  ::component-slot-row{name="ring"}
  The SVG box, including its `-rotate-90` so the arc starts at twelve o'clock.
  ::
  ::component-slot-row{name="track"}
  The full circle underneath, at 20% opacity.
  ::
  ::component-slot-row{name="progress"}
  The arc itself. Carries the colour transition and the `text-warning` /
  `text-error` hue swap.
  ::
  ::component-slot-row{name="text"}
  The `used/limit` readout, in tabular numerals so the digits do not shuffle
  sideways as the number grows.
  ::
  ::component-slot-row{name="popover"}
  The breakdown card, anchored above the trigger.
  ::
  ::component-slot-row{name="list"}
  ::
  ::component-slot-row{name="item"}
  ::
  ::component-slot-row{name="itemLabel"}
  ::
  ::component-slot-row{name="itemValue"}
  ::
::

## Accessibility

- The trigger carries a full sentence — "Context window 84% used, 108k of 128k
  tokens" — rather than leaving the ratio to be assembled from the two visible
  halves.
- Without a breakdown it is a `span` with `role="img"`, not a disabled button. A
  disabled control is skipped by the keyboard and its label is never read, which
  would make the quiet state the one state a screen reader cannot find.
- Hue is never the only signal. The readout is always visible and the arc length
  already carries the same number; colour is the third encoding, not the first.
- Focus opens the popover and Escape closes it, so the breakdown is reachable
  without a pointer.
- Under `prefers-reduced-motion: reduce` the arc jumps to its new fraction, the
  popover fades without scaling, and the colour transition is removed.

## Performance

- The arc is a CSS transition on `stroke-dasharray` and `color`, both of which
  interpolate natively. Driving it through Motion would mean a spring object per
  meter per render to move two numbers the compositor already knows how to
  tween.
- `pathLength="1"` normalises the circle, so the arc is the fraction and its
  complement with no circumference arithmetic and no re-measure on resize.
- The breakdown mounts only while open, and `AnimatePresence` keeps the exit
  short enough that it never overlaps a second open.
- `formatTokens` runs inside a computed, so a meter fed a token per frame
  re-formats its string once per frame rather than once per render of the list.
