<template>
  <div class="p-4 space-y-4 flex flex-col items-center">
    <MTextMorph :text="currentText" />
    <button
      class="px-4 py-2 bg-primary/70 text-white rounded hover:bg-primary transition-colors"
      @click="cycleText"
    >
      Change Text
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const texts = ['Hello', 'World', 'Vue', 'Nuxt']
const currentIndex = ref(0)
const currentText = computed(() => texts[currentIndex.value])

const cycleText = () => {
  currentIndex.value = (currentIndex.value + 1) % texts.length
}
</script>
