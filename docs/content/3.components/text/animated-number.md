---
title: Animated Number
description: Animated numeric value with smooth transitions.
---

The AnimatedNumber component animates numeric values with smooth transitions. A single `useSpring` eases the displayed figure from its previous value to the new one, so counters, statistics, and dashboards settle rather than jump.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-number-basic" />
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
          <span class="text-primary font-medium">Performance Dashboard</span>
        </div>
        <h2 class="text-4xl font-bold text-highlighted mb-4">
          Real-time Metrics
        </h2>
        <p class="text-xl text-muted max-w-3xl mx-auto">
          Live analytics and performance indicators that update in real-time to help you make informed decisions
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
            <MAnimatedNumber
              :value="activeUsers"
              :spring-options="{ stiffness: 100, damping: 10 }"
            />
          </div>
          <div class="text-muted mb-3">
            Monthly actives
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+12.5% from last month</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-zap"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-highlighted mb-2">
            <MAnimatedNumber
              :value="uptime"
              :spring-options="{ stiffness: 100, damping: 10 }"
            />
            <span class="text-2xl">%</span>
          </div>
          <div class="text-muted mb-3">
            System Uptime
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-check-circle"
              class="w-4 h-4 mr-1"
            />
            <span>99.99% SLA</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-package"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-highlighted mb-2">
            <MAnimatedNumber
              :value="projects"
              :spring-options="{ stiffness: 100, damping: 10 }"
            />+
          </div>
          <div class="text-muted mb-3">
            Projects Delivered
          </div>
          <div class="flex items-center justify-center text-sm text-primary">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+8.2% from last quarter</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-life-buoy"
                class="w-8 h-8 text-orange-600 dark:text-orange-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-highlighted mb-2">
            <MAnimatedNumber
              :value="responseTime"
              :spring-options="{ stiffness: 100, damping: 10 }"
            />
            <span class="text-2xl">ms</span>
          </div>
          <div class="text-muted mb-3">
            Avg. Response Time
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-down"
              class="w-4 h-4 mr-1"
            />
            <span>-15% from last week</span>
          </div>
        </UCard>
      </div>

      <UCard class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-highlighted mb-1">
              Performance Trends
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
              name="i-lucide-bar-chart-3"
              class="w-12 h-12 text-dimmed mx-auto mb-3"
            />
            <p class="text-muted">
              Performance chart visualization
            </p>
            <p class="text-sm text-dimmed mt-1">
              Interactive chart would appear here
            </p>
          </div>
        </div>
      </UCard>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3"
          @click="refreshData"
        >
          <UIcon
            name="i-lucide-refresh-cw"
            class="w-5 h-5 mr-2"
          />
          Refresh Data
        </UButton>
        <UButton
          size="lg"
          variant="outline"
          class="px-8 py-3"
          @click="exportReport"
        >
          <UIcon
            name="i-lucide-download"
            class="w-5 h-5 mr-2"
          />
          Export Report
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeUsers = ref(15420)
const uptime = ref(99.9)
const projects = ref(542)
const responseTime = ref(124)
const timeRange = ref('30d')

const refreshData = () => {
  // Simulate data refresh with random variations
  activeUsers.value = Math.floor(15000 + Math.random() * 1000)
  uptime.value = Number.parseFloat((99.8 + Math.random() * 0.2).toFixed(2))
  projects.value = 500 + Math.floor(Math.random() * 50)
  responseTime.value = Math.floor(100 + Math.random() * 50)
}

const exportReport = () => {
  // In a real implementation, this would export a PDF or CSV report
  alert('Exporting performance report...')
}

const setTimeRange = (range) => {
  timeRange.value = range
  // In a real implementation, this would fetch data for the selected time range
  console.log('Time range set to:', range)
}

// Simulate real-time updates
onMounted(() => {
  setInterval(() => {
    refreshData()
  }, 10000) // Update every 10 seconds
})
</script>
```
::

## Examples

### Live dashboard

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-number-dashboard" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Live Dashboard Counter
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Real-time counter with automatic updates and manual interactions
      </p>
    </div>

    <!-- Main Counter Display -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Total Page Views
        </div>
        <div class="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          <MAnimatedNumber
            :value="pageViews"
            :spring-options="{ stiffness: 100, damping: 15 }"
          />
        </div>
        <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
          <UIcon
            name="i-lucide-trending-up"
            class="w-4 h-4 mr-1"
          />
          <span>+{{ viewsPerSecond }}/sec</span>
        </div>
      </div>
    </div>

    <!-- Control Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Control Panel
      </h3>

      <!-- Auto-update Toggle -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <div class="font-medium text-gray-900 dark:text-white">
            Auto Update
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Automatic page view simulation
          </div>
        </div>
        <USwitch
          v-model="isAutoUpdating"
          @update:model-value="toggleAutoUpdate"
        />
      </div>

      <!-- Hands-on controls -->
      <div class="space-y-4">
        <div class="font-medium text-gray-900 dark:text-white">
          Manual Actions
        </div>
        <div class="grid grid-cols-2 gap-3">
          <UButton
            color="primary"
            size="sm"
            @click="addViews(10)"
          >
            +10 Views
          </UButton>
          <UButton
            color="primary"
            variant="outline"
            size="sm"
            @click="addViews(50)"
          >
            +50 Views
          </UButton>
          <UButton
            color="green"
            size="sm"
            @click="addViews(100)"
          >
            +100 Views
          </UButton>
          <UButton
            color="red"
            variant="outline"
            size="sm"
            @click="resetViews"
          >
            Reset
          </UButton>
        </div>
      </div>

      <!-- Stats Info -->
      <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Started
            </div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ startTime }}
            </div>
          </div>
          <div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Updates
            </div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ updateCount }}
            </div>
          </div>
          <div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Manual
            </div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ manualActions }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const pageViews = ref(1234)
const isAutoUpdating = ref(true)
const viewsPerSecond = ref(3)
const updateCount = ref(0)
const manualActions = ref(0)
const startTime = ref(new Date().toLocaleTimeString())

let intervalId = null

// Add views manually
const addViews = (amount) => {
  pageViews.value += amount
  manualActions.value++
}

// Reset views
const resetViews = () => {
  pageViews.value = 0
  updateCount.value = 0
  manualActions.value = 0
  startTime.value = new Date().toLocaleTimeString()
}

// Toggle auto update
const toggleAutoUpdate = (enabled) => {
  if (enabled) {
    startAutoUpdate()
  }
  else {
    stopAutoUpdate()
  }
}

// Start auto update
const startAutoUpdate = () => {
  stopAutoUpdate() // Clear any existing interval
  intervalId = setInterval(() => {
    // Add random views per second (1-5)
    const randomViews = Math.floor(Math.random() * 5) + 1
    pageViews.value += randomViews
    updateCount.value++
  }, 1000)
}

// Stop auto update
const stopAutoUpdate = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// Initialize
onMounted(() => {
  if (isAutoUpdating.value) {
    startAutoUpdate()
  }
})

// Cleanup
onUnmounted(() => {
  stopAutoUpdate()
})
</script>
```
::

### Live-updating counter

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-number-example" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="bg-default rounded-lg p-6 shadow mb-6">
      <div class="text-center">
        <div class="text-sm text-muted mb-1">
          Current Count
        </div>
        <div class="text-4xl font-bold text-primary">
          <MAnimatedNumber
            :value="count"
            :spring-options="{ stiffness: 150, damping: 20 }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(1234)
let intervalId = null

const startTimer = () => {
  intervalId = setInterval(() => {
    // Add 1-10 to simulate live updates
    const increment = Math.floor(Math.random() * 10) + 1
    count.value += increment
  }, 1000)
}

const stopTimer = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-number-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedNumber" />
::

## Props

::component-props
  ::component-prop{name="value" type="number" :required="true"}
  Target value to animate to.
  ::
  
  ::component-prop{name="springOptions" type="SpringOptions" default="{ stiffness: 300, damping: 30, mass: 1 }"}
  Spring animation options.
  ::
  
  ::component-prop{name="as" type="string" default="'span'"}
  HTML element to render as.
  ::
  
  ::component-prop{name="format" type="function" default="(value: number) => Math.round(value).toLocaleString()"}
  Custom formatting function.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the component.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedNumber` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-block tabular-nums`
  ::
::

## Accessibility

The value is written into the element's text and updates every frame while the spring settles. That text is not inside an `aria-live` region, so it is not announced on each change; some screen readers that follow DOM mutations may still re-read the element as it settles. That is acceptable for a decorative metric, but if a single value must be announced, wrap it in your own `aria-live` region.

The element renders as `as` (default `span`) and adds no role or `tabindex` — it is plain text. When a currency symbol or unit is supplied by a sibling, add an `aria-label` so the accessible name reads as a complete value rather than a bare number.

There is no `prefers-reduced-motion` handling: the spring runs regardless. Consumers that must honour the setting should render a static figure instead.

## Performance

- One `motionValue` and one `useSpring` drive the value; the only subscription is `springValue.on('change')`, and it is removed on unmount.
- Each spring frame assigns a `ref`, which re-runs the `format` computed and patches a single text node — a component re-render per frame while settling, and nothing once the value converges.
- A static number costs one initial frame and then no work; there is no polling and no timer.
- `springOptions` directly control the settling cost: a stiffer spring with more damping reaches the target in fewer frames, so tune `stiffness`/`damping` before reaching for a rAF loop.
