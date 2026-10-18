<template>
  <div class="p-4 space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">
        With Padding
      </h3>
      <MSlidingNumber
        :value="currentValue"
        :pad-start="true"
      />
    </div>
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

const currentValue = ref(7)

const changeNumber = () => {
  currentValue.value = Math.floor(Math.random() * 10)
}
</script>
