<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Interactive Counter
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        Manual increment controls
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Current Score
        </div>
        <div class="text-4xl font-bold text-purple-600 dark:text-purple-400">
          <MAnimatedNumber
            :value="score"
            :spring-options="{ stiffness: 200, damping: 15 }"
            class="text-4xl font-bold"
          />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="font-medium text-gray-900 dark:text-white text-center">
        Game Controls
      </div>
      <div class="grid grid-cols-2 gap-3">
        <UButton
          color="primary"
          size="sm"
          @click="increaseScore(10)"
        >
          +10 Points
        </UButton>
        <UButton
          color="primary"
          variant="outline"
          size="sm"
          @click="increaseScore(50)"
        >
          +50 Points
        </UButton>
        <UButton
          color="green"
          size="sm"
          @click="increaseScore(100)"
        >
          +100 Points
        </UButton>
        <UButton
          color="red"
          variant="outline"
          size="sm"
          @click="resetScore"
        >
          Reset
        </UButton>
      </div>

      <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
          Total Actions: {{ actionCount }}
        </div>
      </div>
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
