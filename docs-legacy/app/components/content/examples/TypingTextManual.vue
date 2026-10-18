<template>
  <div class="p-4 space-y-4">
    <MTypingText
      :key="typingKey"
      :texts="typingTexts"
      :loop="isLooping"
      :speed="typingSpeed"
      class="text-xl font-bold"
    />
    <div class="flex flex-wrap gap-2">
      <button
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
        @click="resetTyping"
      >
        Reset
      </button>
      <button
        class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
        @click="toggleLoop"
      >
        {{ isLooping ? 'Disable Loop' : 'Enable Loop' }}
      </button>
      <button
        class="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
        @click="changeSpeed"
      >
        Speed: {{ typingSpeed }}ms
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const typingKey = ref(0)
const isLooping = ref(true)
const typingSpeed = ref(100)

const typingTexts = [
  'Click buttons to control',
  'Adjust typing speed',
  'Toggle loop mode',
  'Reset animation',
]

const resetTyping = () => {
  typingKey.value++
}

const toggleLoop = () => {
  isLooping.value = !isLooping.value
}

const changeSpeed = () => {
  if (typingSpeed.value === 100) {
    typingSpeed.value = 50
  }
  else if (typingSpeed.value === 50) {
    typingSpeed.value = 150
  }
  else {
    typingSpeed.value = 100
  }
}
</script>
