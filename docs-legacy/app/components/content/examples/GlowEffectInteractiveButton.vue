<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <!-- Interactive Button -->
    <div class="relative">
      <MGlowEffect
        ref="glowRef"
        mode="rotate"
        :colors="['#8B5CF6', '#EC4899', '#F59E0B']"
        blur="strong"
        :scale="1.2"
        :duration="4"
      />
      <div class="relative z-10">
        <UButton
          size="lg"
          class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          @click="handleClick"
        >
          Click Me!
        </UButton>
      </div>
    </div>

    <!-- Status Indicator -->
    <div class="text-center">
      <p class="text-gray-600 dark:text-gray-400 mb-2">
        Click the button to see the effect
      </p>
      <p
        v-if="clickCount > 0"
        class="text-sm text-purple-600 dark:text-purple-400"
      >
        Button clicked {{ clickCount }} time{{ clickCount !== 1 ? 's' : '' }}!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clickCount = ref(0)
const glowRef = ref(null)

const handleClick = () => {
  clickCount.value++

  // Add a temporary extra glow effect on click
  if (glowRef.value) {
    // This would be implemented if we had access to the glow effect methods
    console.log('Button clicked!')
  }
}
</script>
