---
title: Animated Number
description: Animated numeric value with smooth transitions.
navigation:
  icon: i-lucide-hash
---

# Animated Number

The AnimatedNumber component animates numeric values with smooth transitions. It's perfect for displaying counters, statistics, and any numerical data that benefits from animation.

## Usage

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
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Count</div>
        <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">
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

## Props

::field-group
  ::field{name="value" type="number" :required="true"}
  Target value to animate to.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the component.
  ::
  
  ::field{name="springOptions" type="SpringOptions" default="{ stiffness: 300, damping: 30, mass: 1 }"}
  Spring animation options.
  ::
  
  ::field{name="as" type="string" default="'span'"}
  HTML element to render as.
  ::
  
  ::field{name="format" type="function" default="(value: number) => Math.round(value).toLocaleString()"}
  Custom formatting function.
  ::
::

## Examples

### With Custom Duration

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-number-duration" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4">
    <div class="text-center">
      <div class="text-sm text-gray-500 mb-1">2-Second Animation</div>
      <div class="text-2xl font-bold">
        <MAnimatedNumber :value="targetValue" :duration="2" />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-2">
      <UButton @click="setTarget(10000)" size="xs">10K</UButton>
      <UButton @click="setTarget(50000)" size="xs" variant="outline">50K</UButton>
      <UButton @click="setTarget(100000)" size="xs" color="green">100K</UButton>
      <UButton @click="setTarget(0)" size="xs" color="red" variant="outline">Reset</UButton>
    </div>
    
    <div class="flex items-center justify-between">
      <span class="text-sm">Auto Increment:</span>
      <USwitch v-model="autoIncrement" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const targetValue = ref(123456)
const autoIncrement = ref(false)
let intervalId = null

const setTarget = (value) => {
  targetValue.value = value
}

const startAutoIncrement = () => {
  intervalId = setInterval(() => {
    targetValue.value += 1000
  }, 3000)
}

const stopAutoIncrement = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  // Auto increment is initially disabled
})

onUnmounted(() => {
  stopAutoIncrement()
})
</script>
```
::

### With Custom Easing

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-number-easing" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4">
    <div class="text-center">
      <div class="text-sm text-gray-500 mb-1">EaseInOut Animation</div>
      <div class="text-2xl font-bold">
        <MAnimatedNumber :value="easeValue" easing="easeInOut" />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-2">
      <UButton @click="setEaseValue(0)" size="xs" color="red">To 0</UButton>
      <UButton @click="setEaseValue(100)" size="xs" color="primary">To 100</UButton>
      <UButton @click="setEaseValue(500)" size="xs" variant="outline">To 500</UButton>
      <UButton @click="setEaseValue(1000)" size="xs" color="green">To 1000</UButton>
    </div>
    
    <div class="flex items-center justify-between">
      <span class="text-sm">Auto Cycle:</span>
      <USwitch v-model="autoCycle" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const easeValue = ref(100)
const autoCycle = ref(false)
let intervalId = null
let direction = 1

const setEaseValue = (value) => {
  easeValue.value = value
}

const startAutoCycle = () => {
  intervalId = setInterval(() => {
    if (direction === 1) {
      easeValue.value += 100
      if (easeValue.value >= 1000) {
        direction = -1
      }
    } else {
      easeValue.value -= 100
      if (easeValue.value <= 0) {
        direction = 1
      }
    }
  }, 2000)
}

const stopAutoCycle = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  direction = 1
}

onMounted(() => {
  // Auto cycle is initially disabled
})

onUnmounted(() => {
  stopAutoCycle()
})
</script>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-number-styling" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4">
    <div class="text-center">
      <div class="text-sm text-gray-500 mb-1">Styled Value</div>
      <div>
        <MAnimatedNumber 
          :value="styledValue" 
          as="div" 
          class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-2">
      <UButton @click="updateStyledValue(styledValue + 25)" size="xs">+25</UButton>
      <UButton @click="updateStyledValue(styledValue - 25)" size="xs" variant="outline">-25</UButton>
      <UButton @click="updateStyledValue(styledValue + 100)" size="xs" color="green">+100</UButton>
      <UButton @click="updateStyledValue(42)" size="xs" color="red" variant="outline">Reset</UButton>
    </div>
    
    <div class="flex items-center justify-between">
      <span class="text-sm">Live Updates:</span>
      <USwitch v-model="liveUpdates" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const styledValue = ref(42)
const liveUpdates = ref(true)
let intervalId = null

const updateStyledValue = (value) => {
  styledValue.value = value
}

const startLiveUpdates = () => {
  intervalId = setInterval(() => {
    const change = Math.floor(Math.random() * 10) - 5
    styledValue.value += change
  }, 1500)
}

const stopLiveUpdates = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  if (liveUpdates.value) {
    startLiveUpdates()
  }
})

onUnmounted(() => {
  stopLiveUpdates()
})
</script>
```
::

### With Trigger

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-number-with-trigger" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4">
    <div class="text-center">
      <div class="text-sm text-gray-500 mb-1">Interactive Counter</div>
      <div class="text-2xl font-bold">
        <MAnimatedNumber :value="score" />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-2">
      <UButton @click="increaseScore(10)" size="xs">+10</UButton>
      <UButton @click="increaseScore(50)" size="xs" variant="outline">+50</UButton>
      <UButton @click="increaseScore(100)" size="xs" color="green">+100</UButton>
      <UButton @click="resetScore" size="xs" color="red" variant="outline">Reset</UButton>
    </div>
    
    <div class="text-center text-sm text-gray-500">
      Actions: {{ actionCount }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score = ref(0)
const actionCount = ref(0)

const increaseScore = (points) => {
  score.value += points
  actionCount.value++
}

const resetScore = () => {
  score.value = 0
  actionCount.value = 0
}
</script>
```
::

### Dashboard Example

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
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Live Dashboard Counter</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Real-time counter with automatic updates and manual interactions
      </p>
    </div>

    <!-- Main Counter Display -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Page Views</div>
        <div class="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          <MAnimatedNumber 
            :value="pageViews" 
            :spring-options="{ stiffness: 100, damping: 15 }"
          />
        </div>
        <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
          <UIcon name="i-lucide-trending-up" class="w-4 h-4 mr-1" />
          <span>+{{ viewsPerSecond }}/sec</span>
        </div>
      </div>
    </div>

    <!-- Control Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Control Panel</h3>
      
      <!-- Auto-update Toggle -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <div class="font-medium text-gray-900 dark:text-white">Auto Update</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Automatic page view simulation</div>
        </div>
        <USwitch
          v-model="isAutoUpdating"
          @update:model-value="toggleAutoUpdate"
        />
      </div>

      <!-- Manual Controls -->
      <div class="space-y-4">
        <div class="font-medium text-gray-900 dark:text-white">Manual Actions</div>
        <div class="grid grid-cols-2 gap-3">
          <UButton 
            @click="addViews(10)" 
            color="primary"
            size="sm"
          >
            +10 Views
          </UButton>
          <UButton 
            @click="addViews(50)" 
            color="primary"
            variant="outline"
            size="sm"
          >
            +50 Views
          </UButton>
          <UButton 
            @click="addViews(100)" 
            color="green"
            size="sm"
          >
            +100 Views
          </UButton>
          <UButton 
            @click="resetViews" 
            color="red"
            variant="outline"
            size="sm"
          >
            Reset
          </UButton>
        </div>
      </div>

      <!-- Stats Info -->
      <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Started</div>
            <div class="font-medium text-gray-900 dark:text-white">{{ startTime }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Updates</div>
            <div class="font-medium text-gray-900 dark:text-white">{{ updateCount }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Manual</div>
            <div class="font-medium text-gray-900 dark:text-white">{{ manualActions }}</div>
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
  } else {
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

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedNumber` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'inline-block tabular-nums'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedNumber` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-block tabular-nums` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedNumber` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-block tabular-nums` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedNumber` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-block tabular-nums` |
