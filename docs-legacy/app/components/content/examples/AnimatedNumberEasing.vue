<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Easing Animation
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        easeInOut easing function
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Ease Value
        </div>
        <div class="text-4xl font-bold text-green-600 dark:text-green-400">
          <MAnimatedNumber
            :value="easeValue"
            easing="easeInOut"
            class="text-4xl font-bold"
          />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="font-medium text-gray-900 dark:text-white text-center">
        Animation Controls
      </div>
      <div class="grid grid-cols-2 gap-3">
        <UButton
          color="red"
          size="sm"
          @click="setEaseValue(0)"
        >
          To 0
        </UButton>
        <UButton
          color="primary"
          size="sm"
          @click="setEaseValue(100)"
        >
          To 100
        </UButton>
        <UButton
          color="primary"
          variant="outline"
          size="sm"
          @click="setEaseValue(500)"
        >
          To 500
        </UButton>
        <UButton
          color="green"
          size="sm"
          @click="setEaseValue(1000)"
        >
          To 1000
        </UButton>
      </div>

      <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              Auto Cycle
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Between 0-1000
            </div>
          </div>
          <USwitch
            v-model="autoCycle"
            @update:model-value="toggleAutoCycle"
          />
        </div>
      </div>
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
    }
    else {
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

const toggleAutoCycle = (enabled) => {
  if (enabled) {
    startAutoCycle()
  }
  else {
    stopAutoCycle()
  }
}

onMounted(() => {
  // Auto cycle is initially disabled
})

onUnmounted(() => {
  stopAutoCycle()
})
</script>
