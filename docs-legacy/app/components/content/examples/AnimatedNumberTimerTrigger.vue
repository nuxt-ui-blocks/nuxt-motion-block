<template>
  <div class="p-4 space-y-4 max-w-xs">
    <div class="text-center">
      <div class="text-sm text-gray-500 mb-1">
        Live Counter
      </div>
      <div class="text-2xl font-bold text-blue-600">
        <MAnimatedNumber :value="count" />
      </div>
    </div>

    <!-- Auto Toggle -->
    <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
      <span class="text-sm">Auto Update:</span>
      <USwitch
        v-model="isAutoUpdating"
        @update:model-value="toggleTimer"
      />
    </div>

    <!-- Manual Controls -->
    <div class="grid grid-cols-2 gap-2">
      <UButton
        size="xs"
        @click="increment(10)"
      >
        +10
      </UButton>
      <UButton
        size="xs"
        variant="outline"
        @click="increment(50)"
      >
        +50
      </UButton>
      <UButton
        size="xs"
        color="green"
        @click="increment(100)"
      >
        +100
      </UButton>
      <UButton
        size="xs"
        color="red"
        variant="outline"
        @click="reset"
      >
        Reset
      </UButton>
    </div>

    <!-- Status -->
    <div class="text-center text-xs text-gray-500">
      Status:
      <span :class="isAutoUpdating ? 'text-green-600' : 'text-red-600'">
        {{ isAutoUpdating ? 'Running' : 'Paused' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(1234)
const isAutoUpdating = ref(true)
let intervalId = null

// Auto update every second
const startTimer = () => {
  intervalId = setInterval(() => {
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

const toggleTimer = (enabled) => {
  if (enabled) {
    startTimer()
  }
  else {
    stopTimer()
  }
}

// Manual controls
const increment = (value) => {
  count.value += value
}

const reset = () => {
  count.value = 0
}

// Lifecycle
onMounted(() => {
  if (isAutoUpdating.value) {
    startTimer()
  }
})

onUnmounted(() => {
  stopTimer()
})
</script>
