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
