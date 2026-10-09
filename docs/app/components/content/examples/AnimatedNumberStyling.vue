<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Styled Counter
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        Custom styling with live updates
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Styled Value
        </div>
        <div>
          <MAnimatedNumber
            :value="styledValue"
            as="div"
            class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="font-medium text-gray-900 dark:text-white text-center">
        Control Panel
      </div>
      <div class="grid grid-cols-2 gap-3">
        <UButton
          color="primary"
          size="sm"
          @click="updateStyledValue(styledValue + 25)"
        >
          +25
        </UButton>
        <UButton
          color="primary"
          variant="outline"
          size="sm"
          @click="updateStyledValue(styledValue - 25)"
        >
          -25
        </UButton>
        <UButton
          color="green"
          size="sm"
          @click="updateStyledValue(styledValue + 100)"
        >
          +100
        </UButton>
        <UButton
          color="red"
          variant="outline"
          size="sm"
          @click="updateStyledValue(42)"
        >
          Reset
        </UButton>
      </div>

      <div class="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div>
          <div class="font-medium text-gray-900 dark:text-white">
            Live Updates
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Automatic styling
          </div>
        </div>
        <USwitch
          v-model="liveUpdates"
          @update:model-value="toggleLiveUpdates"
        />
      </div>
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
    // Add/subtract small random values for live effect
    const change = Math.floor(Math.random() * 10) - 5 // -5 to +5
    styledValue.value += change
  }, 1500)
}

const stopLiveUpdates = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const toggleLiveUpdates = (enabled) => {
  if (enabled) {
    startLiveUpdates()
  }
  else {
    stopLiveUpdates()
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
