<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Current Count
        </div>
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
