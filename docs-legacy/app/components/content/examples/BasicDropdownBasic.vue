<template>
  <div class="flex w-full max-w-md justify-center">
    <MBasicDropdown
      :items="items"
      label="Select option"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
const items = [
  { id: '1', label: 'Option 1', icon: 'i-lucide-circle' },
  { id: '2', label: 'Option 2', icon: 'i-lucide-square' },
  { id: '3', label: 'Option 3', icon: 'i-lucide-triangle' },
]

const onChange = (_item) => {
  // handle selection
}
</script>
