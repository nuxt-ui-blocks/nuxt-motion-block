<template>
  <div class="flex w-full justify-center py-10">
    <MGooeyFilter
      class="flex items-center"
      :contrast="18"
      :strength="9"
    >
      <div class="flex -space-x-4">
        <button
          v-for="dot in dots"
          :key="dot.label"
          :aria-label="dot.label"
          class="size-16 rounded-full border-0 transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          :class="dot.color"
          type="button"
        />
      </div>
    </MGooeyFilter>
  </div>
</template>

<script setup lang="ts">
const dots = [
  { label: 'First blob', color: 'bg-primary' },
  { label: 'Second blob', color: 'bg-secondary' },
  { label: 'Third blob', color: 'bg-primary' },
  { label: 'Fourth blob', color: 'bg-secondary' },
]
</script>
