---
title: Text Loop
description: Text that loops through different values with smooth transitions.
---

The TextLoop component cycles through a list of values, swapping one for the next with a smooth transition. It is perfect for rotating words in a headline, alternating labels, or any short content that needs to change automatically.

## Usage

Pass the values as `items`. The loop advances every `interval` seconds, and each swap animates the outgoing item out and the incoming one in.

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-usage" />
  :::
#code
```vue
<template>
  <MTextLoop :items="['First', 'Second', 'Third']" />
</template>
```
::

## Examples

### Basic text loop

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-basic" />
  :::
#code
```vue
<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Build
        <MTextLoop
          :items="['Modern', 'Innovative', 'Beautiful', 'Interactive']"
          class="text-primary"
        />
        Experiences
      </h1>

      <p class="text-xl text-muted mb-8">
        Create stunning interfaces with our collection of animated components that
        <MTextLoop
          :items="['transform', 'enhance', 'revolutionize', 'elevate']"
          class="text-purple-600 dark:text-purple-400 font-semibold"
        />
        the way users interact with your applications.
      </p>

      <div class="bg-default rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-lg font-semibold mb-2">
              Real-time Preview
            </h3>
            <p class="text-muted text-sm">
              See changes instantly as you type with our live preview feature
            </p>
          </div>
          <MTextLoop
            :items="['99.9%', '10x', '50ms', '24/7']"
            class="text-3xl font-bold text-green-600 dark:text-green-400"
          />
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <UButton
          size="lg"
          color="primary"
        >
          Get Started
        </UButton>
        <UButton
          size="lg"
          variant="outline"
        >
          View Documentation
        </UButton>
      </div>
    </div>
  </div>
</template>
```
::

### Interactive loop

Drive the loop from your own controls with `trigger`, style each value with
`className`, and react to swaps through `indexChange` (or the `onIndexChange`
prop). `transition` and `variants` let you replace the default flip with your own
motion.

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-interactive" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-5">
    <div class="flex items-baseline justify-center gap-2">
      <span class="text-sm text-muted">Loved by</span>
      <MTextLoop
        :items="stats"
        class="text-xl font-bold text-primary"
        class-name="tabular-nums"
        :interval="1.6"
        :transition="{ type: 'spring', stiffness: 220, damping: 26 }"
        :variants="{
          initial: { y: -16, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 16, opacity: 0 },
        }"
        :trigger="playing"
        @index-change="index = $event"
      />
      <span class="text-sm text-muted">teams</span>
    </div>

    <div class="flex items-center gap-3">
      <UButton
        :label="playing ? 'Pause' : 'Resume'"
        :icon="playing ? 'i-lucide-pause' : 'i-lucide-play'"
        variant="outline"
        @click="playing = !playing"
      />
      <span class="text-xs text-dimmed">#{{ index + 1 }} of {{ stats.length }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = ['12,000+', '8,500+', '23,000+', '4,200+']
const playing = ref(true)
const index = ref(0)
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-loop-custom" />
  :::
#code
  <PlaygroundCode name="TextLoop" />
::

## Props

::component-props
  ::component-prop{name="items" type="any[]" default="[]"}
  The values to cycle through. With one item or fewer the loop does not advance.
  ::

  ::component-prop{name="className" type="string" default="''"}
  CSS classes applied to the root element.
  ::

  ::component-prop{name="interval" type="number" default="2"}
  Seconds between values. The effective delay is clamped to a minimum of one second to avoid transition conflicts.
  ::

  ::component-prop{name="transition" type="object" default="{ type: 'spring', stiffness: 150, damping: 19, mass: 1.2 }"}
  Transition applied to each item's enter and exit.
  ::

  ::component-prop{name="variants" type="object" default="undefined"}
  Custom `initial`, `animate` and `exit` variants. A `'direction'` string in a variant value is replaced with the current direction.
  ::

  ::component-prop{name="onIndexChange" type="(index: number) => void" default="undefined"}
  Called with the new index whenever the loop advances. Equivalent to listening for the `indexChange` event.
  ::

  ::component-prop{name="trigger" type="boolean" default="true"}
  Enable or disable the loop. When `false` the interval stops but the current value stays in place.
  ::

  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes applied to the root element, merged with `className`.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## Events

::component-events
  ::component-event{name="indexChange" type="(index: number) => void"}
  Emitted with the new index each time the loop advances.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textLoop` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-flex items-center justify-center align-baseline`
  ::
  ::component-slot-row{name="item"}
  ::
  ::component-slot-row{name="measure"}
  `invisible absolute`
  ::
  ::component-slot-row{name="measureItem"}
  ::
::

## Accessibility

The current value is rendered as real text in a plain `span`, so it is read normally, but there is no live region and no `aria-live`, so a screen reader will not be notified as the value changes. Avoid placing content that must be announced in a loop, or render a static, always-visible alternative alongside it.

## Performance

- The swap is driven by a single `setInterval`, cleared on unmount and restarted whenever `trigger` or `items` change.
- A hidden `measure` element holds a copy of every item so the container can be sized to the tallest one; that is one extra node per item, kept off-screen and non-interactive.
- The container's height is set inline from the measurement on mount and whenever `items` change, so the surrounding layout does not jump as values of different heights cycle.
