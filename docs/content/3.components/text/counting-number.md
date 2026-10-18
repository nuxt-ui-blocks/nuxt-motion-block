---
title: Counting Number
description: Number counter with various animation effects.
---

The CountingNumber component creates animated number counters with various animation effects. It's perfect for displaying statistics, metrics, and any numerical data that benefits from a counting animation.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="counting-number-basic" />
  :::
#code
```vue
<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/30 rounded-full mb-4">
          <UIcon
            name="i-lucide-bar-chart-3"
            class="w-5 h-5 text-primary"
          />
          <span class="text-primary font-medium">Growth Metrics</span>
        </div>
        <h2 class="text-4xl font-bold text-highlighted mb-4">
          Community Impact
        </h2>
        <p class="text-xl text-muted max-w-3xl mx-auto">
          Real-time statistics showing the growth and impact of our platform
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-primary/10 dark:bg-primary/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-users"
                class="w-8 h-8 text-primary"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-highlighted mb-2">
            <MCountingNumber
              :to="communityMembers"
              :duration="2"
            />
          </div>
          <div class="text-muted mb-3">
            Community Members
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+12.5% this month</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-code"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-highlighted mb-2">
            <MCountingNumber
              :to="linesOfCode"
              :duration="2.5"
            />
          </div>
          <div class="text-muted mb-3">
            Lines of Code
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+8.3% this quarter</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-star"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-highlighted mb-2">
            <MCountingNumber
              :to="githubStars"
              :duration="3"
            />
          </div>
          <div class="text-muted mb-3">
            GitHub Stars
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+15.2% this year</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-globe"
                class="w-8 h-8 text-orange-600 dark:text-orange-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-highlighted mb-2">
            <MCountingNumber
              :to="countries"
              :duration="2"
            />
          </div>
          <div class="text-muted mb-3">
            Countries
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+3 new this month</span>
          </div>
        </UCard>
      </div>

      <UCard class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-highlighted mb-1">
              Growth Trends
            </h3>
            <p class="text-muted">
              Historical data and growth patterns
            </p>
          </div>
          <div class="flex gap-2 mt-4 md:mt-0">
            <UButton
              size="sm"
              :color="timeRange === '7d' ? 'primary' : 'gray'"
              variant="solid"
              @click="setTimeRange('7d')"
            >
              7D
            </UButton>
            <UButton
              size="sm"
              :color="timeRange === '30d' ? 'primary' : 'gray'"
              variant="solid"
              @click="setTimeRange('30d')"
            >
              30D
            </UButton>
            <UButton
              size="sm"
              :color="timeRange === '90d' ? 'primary' : 'gray'"
              variant="solid"
              @click="setTimeRange('90d')"
            >
              90D
            </UButton>
          </div>
        </div>

        <div class="h-64 flex items-center justify-center bg-elevated rounded-lg">
          <div class="text-center">
            <UIcon
              name="i-lucide-trending-up"
              class="w-12 h-12 text-dimmed mx-auto mb-3"
            />
            <p class="text-muted">
              Interactive growth chart
            </p>
            <p class="text-sm text-dimmed mt-1">
              Visualization would appear here
            </p>
          </div>
        </div>
      </UCard>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3"
          @click="refreshStats"
        >
          <UIcon
            name="i-lucide-refresh-cw"
            class="w-5 h-5 mr-2"
          />
          Refresh Statistics
        </UButton>
        <UButton
          size="lg"
          variant="outline"
          class="px-8 py-3"
          @click="exportData"
        >
          <UIcon
            name="i-lucide-download"
            class="w-5 h-5 mr-2"
          />
          Export Data
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const communityMembers = ref(12500)
const linesOfCode = ref(3500)
const githubStars = ref(420)
const countries = ref(78)
const timeRange = ref('30d')

const refreshStats = () => {
  // Simulate data refresh with random variations
  communityMembers.value = Math.floor(12000 + Math.random() * 1000)
  linesOfCode.value = Math.floor(3400 + Math.random() * 200)
  githubStars.value = Math.floor(400 + Math.random() * 50)
  countries.value = Math.floor(75 + Math.random() * 5)
}

const exportData = () => {
  // In a real implementation, this would export data
  alert('Exporting community statistics...')
}

const setTimeRange = (range) => {
  timeRange.value = range
  // In a real implementation, this would fetch data for the selected time range
  console.log('Time range set to:', range)
}

// Simulate real-time updates
onMounted(() => {
  setInterval(() => {
    refreshStats()
  }, 15000) // Update every 15 seconds
})
</script>
```
::

## Examples

### Formatted with delay

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="counting-number-with-formatting" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">
        With Delay and Formatting
      </h3>
      <MCountingNumber
        :to="123456"
        :delay="1000"
        :format="(value) => value.toLocaleString()"
      />
    </div>
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="counting-number-custom" />
  :::
#code
  <PlaygroundCode name="CountingNumber" />
::

## Props

::component-props
  ::component-prop{name="from" type="number" default="0"}
  Starting number.
  ::
  
  ::component-prop{name="to" type="number" default="100"}
  Ending number.
  ::
  
  ::component-prop{name="duration" type="number" default="2"}
  Animation duration in seconds.
  ::
  
  ::component-prop{name="delay" type="number" default="0"}
  Animation delay in milliseconds.
  ::
  
  ::component-prop{name="startOnView" type="boolean" default="true"}
  Whether to start animation when element enters viewport.
  ::
  
  ::component-prop{name="once" type="boolean" default="false"}
  Whether to animate only once.
  ::
  
  ::component-prop{name="inViewMargin" type="string" default="'0px'"}
  Margin for viewport detection.
  ::
  
  ::component-prop{name="format" type="function" default="undefined"}
  Custom formatting function.
  ::
  
  ::component-prop{name="onComplete" type="() => void" default="undefined"}
  Callback invoked when the animation completes. The callback form of the [`complete`](#events) event.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the component.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## Events

::component-events
  ::component-event{name="complete" type="() => void"}
  Emitted when animation completes.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.countingNumber` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-block`
  ::
::

## Accessibility

The value is rendered as plain text inside the animated element. It is not in an `aria-live` region, so the running count and the final value are not announced; if the number should be read out when it settles, wrap the component in an `aria-live` region of your own and either leave the default polling off or accept that the region will announce the final value.

Because the root spreads `v-bind="props"`, every declared prop is also written to the element as a DOM attribute (for example `to="100"`, `duration="2"`). Attributes you set on `<MCountingNumber>` still fall through normally, but do not expect a prop name to be free for an attribute of the same name.

The element has no role or `tabindex`; it is not interactive. There is no `prefers-reduced-motion` handling — the animation runs regardless — so consumers that must honour it should render the final value directly.

## Performance

- The count is a `requestAnimationFrame` loop with linear interpolation (`elapsed / (duration * 1000)`); it writes the text once per frame for `duration` seconds, then stops. There is no easing or spring, so the cost is proportional to the duration, not the distance.
- `startOnView` is an intersection observer through `useElementVisibility`; without `once`, re-entering the viewport restarts the loop.
- `delay` is a single `setTimeout` before the loop starts, and the pending frame is cancelled on unmount. A settled counter costs nothing.
