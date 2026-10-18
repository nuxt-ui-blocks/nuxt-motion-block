---
title: Sliding Number
description: Number that slides in with animation effects.
---

The SlidingNumber component creates animated numbers that slide in with smooth animation effects. Each digit animates independently, creating a visually appealing counting experience.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="sliding-number-basic" />
  :::
#code
```vue
<template>
  <div class="p-8 max-w-lg mx-auto">
    <div class="text-center mb-12">
      <h3 class="text-3xl font-bold mb-3 text-highlighted">
        Performance Metrics
      </h3>
      <p class="text-muted text-lg">
        Real-time statistics with smooth sliding animations
      </p>
    </div>

    <div class="space-y-8">
      <div class="bg-default rounded-xl shadow-xl p-6 border border-default">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h4 class="font-bold text-highlighted">
              Response Time
            </h4>
            <p class="text-sm text-muted">
              Milliseconds
            </p>
          </div>
          <UBadge
            color="primary"
            variant="soft"
          >
            ms
          </UBadge>
        </div>
        <div class="text-5xl font-bold text-highlighted">
          <MSlidingNumber :value="responseTime" />
        </div>
        <div class="mt-2 h-2 bg-accented rounded-full overflow-hidden">
          <div
            class="h-full bg-primary rounded-full"
            :style="{ width: `${Math.min(100, responseTime / 5)}%` }"
          />
        </div>
      </div>

      <div class="bg-default rounded-xl shadow-xl p-6 border border-default">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h4 class="font-bold text-highlighted">
              Uptime
            </h4>
            <p class="text-sm text-muted">
              Service availability
            </p>
          </div>
          <UBadge
            color="green"
            variant="soft"
          >
            %
          </UBadge>
        </div>
        <div class="text-5xl font-bold text-highlighted">
          <MSlidingNumber
            :value="uptime"
            :precision="1"
          />
        </div>
        <div class="mt-2 h-2 bg-accented rounded-full overflow-hidden">
          <div
            class="h-full bg-green-500 rounded-full"
            :style="{ width: `${uptime}%` }"
          />
        </div>
      </div>

      <div class="bg-default rounded-xl shadow-xl p-6 border border-default">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h4 class="font-bold text-highlighted">
              Monthly actives
            </h4>
            <p class="text-sm text-muted">
              Current online
            </p>
          </div>
        </div>
        <div class="text-5xl font-bold text-highlighted">
          <MSlidingNumber :value="activeUsers" />
        </div>
        <div class="mt-2 h-2 bg-accented rounded-full overflow-hidden">
          <div
            class="h-full bg-primary/70 rounded-full"
            :style="{ width: `${Math.min(100, activeUsers / 2000 * 100)}%` }"
          />
        </div>
      </div>
    </div>

    <div class="mt-10 flex flex-col sm:flex-row gap-4">
      <UButton
        color="primary"
        variant="solid"
        size="lg"
        block
        @click="updateMetrics"
      >
        <UIcon
          name="i-lucide-refresh-cw"
          class="w-5 h-5 mr-2"
        />
        Refresh Data
      </UButton>
      <UButton
        color="neutral"
        variant="outline"
        size="lg"
        block
        @click="resetMetrics"
      >
        <UIcon
          name="i-lucide-rotate-ccw"
          class="w-5 h-5 mr-2"
        />
        Reset
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const responseTime = ref(124)
const uptime = ref(99.9)
const activeUsers = ref(1248)

const updateMetrics = () => {
  responseTime.value = Math.floor(Math.random() * 200) + 50
  uptime.value = 99.5 + (Math.random() * 0.4)
  activeUsers.value = Math.floor(Math.random() * 2000) + 500
}

const resetMetrics = () => {
  responseTime.value = 124
  uptime.value = 99.9
  activeUsers.value = 1248
}
</script>
```
::

## Examples

### Interactive counter

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="sliding-number-usage" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4 flex flex-col items-center">
    <MSlidingNumber :value="currentValue" />
    <button
      class="px-4 py-2 bg-primary/70 text-white rounded hover:bg-primary transition-colors"
      @click="changeNumber"
    >
      Change Number
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentValue = ref(1234)

const changeNumber = () => {
  currentValue.value = Math.floor(Math.random() * 10000)
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
    <component-example name="sliding-number-custom" />
  :::
#code
  <PlaygroundCode name="SlidingNumber" />
::

## Props

::component-props
  ::component-prop{name="value" type="number" :required="true"}
  Value to display.
  ::
  
  ::component-prop{name="padStart" type="boolean" default="false"}
  Pad single digits with leading zero.
  ::
  
  ::component-prop{name="decimalSeparator" type="string" default="'.'"}
  Character to use as decimal separator.
  ::
  
  ::component-prop{name="precision" type="number | null" default="null"}
  Number of decimal places to show. `null` renders the value as-is.
  ::
  
  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes to apply to the component.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.slidingNumber` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `flex items-baseline`
  ::
  ::component-slot-row{name="separator"}
  `mx-0.5`
  ::
  ::component-slot-row{name="digit"}
  `relative inline-block w-[1ch] overflow-hidden leading-none tabular-nums align-baseline`
  ::
  ::component-slot-row{name="digitTrack"}
  `absolute inset-0`
  ::
  ::component-slot-row{name="digitGhost"}
  `opacity-0 block`
  ::
  ::component-slot-row{name="digitGlyph"}
  `absolute inset-0 flex items-center justify-center`
  ::
::

## Accessibility

Each digit slot renders all ten glyphs (`0`–`9`) plus an invisible ghost `0`, so the text content of the element is a stack like `0123456789` per place rather than the number itself. A screen reader will not read a meaningful value from it. Give the component an `aria-label` with the real number, or hide the visual with `aria-hidden="true"` and render an `sr-only` copy of the value alongside it.

The root is a plain `<div>` with no role or `tabindex`; the component is not interactive. There is no `prefers-reduced-motion` handling — the digits always slide — so consumers that must honour it should render the value as static text.

## Performance

- One spring per digit place drives the slide (`useSpring` plus a `useTransform` per glyph in `DigitGlyph`), so cost scales with the number of visible digits, not the magnitude of the value — going from `9` to `1,000,000` adds springs only for the new places.
- Each place measures its height once on mount via `offsetHeight` (one forced reflow per digit); the animated stack renders only after the height is known, which avoids a first-frame layout blob.
- Only ten glyphs per place are translated on the `y` axis, and the transform is compositor-friendly, so a value change animates transform only rather than relaying out text.
- A negative value renders an extra `-` span; there is no per-frame JavaScript beyond the springs.
