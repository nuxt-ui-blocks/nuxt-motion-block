<template>
  <div class="p-4 space-y-4 flex flex-col items-center">
    <MSlidingNumber :value="currentValue" />
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="changeNumber"
    >
      Change Number
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentValue = ref(1234)

const changeNumber = () => {
  currentValue.value = Math.floor(Math.random() * 10000)
}
</script>
