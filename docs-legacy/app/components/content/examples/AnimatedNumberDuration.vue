<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Custom Duration Counter
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        2-second animation duration
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Target Value
        </div>
        <div class="text-4xl font-bold text-purple-600 dark:text-purple-400">
          <MAnimatedNumber
            :value="targetValue"
            :duration="2"
            class="text-4xl font-bold"
          />
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <div class="font-medium text-gray-900 dark:text-white text-center">
        Set Target Value
      </div>
      <div class="grid grid-cols-2 gap-3">
        <UButton
          color="primary"
          size="sm"
          @click="setTarget(10000)"
        >
          10K
        </UButton>
        <UButton
          color="primary"
          variant="outline"
          size="sm"
          @click="setTarget(50000)"
        >
          50K
        </UButton>
        <UButton
          color="green"
          size="sm"
          @click="setTarget(100000)"
        >
          100K
        </UButton>
        <UButton
          color="red"
          variant="outline"
          size="sm"
          @click="setTarget(0)"
        >
          Reset
        </UButton>
      </div>

      <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Auto Increment
          </div>
          <USwitch
            v-model="autoIncrement"
            @update:model-value="toggleAutoIncrement"
          />
        </div>
      </div>
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

const toggleAutoIncrement = (enabled) => {
  if (enabled) {
    startAutoIncrement()
  }
  else {
    stopAutoIncrement()
  }
}

onMounted(() => {
  // Auto increment is initially disabled
})

onUnmounted(() => {
  stopAutoIncrement()
})
</script>
