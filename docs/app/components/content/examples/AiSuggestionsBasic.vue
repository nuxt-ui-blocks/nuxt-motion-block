<template>
  <div class="w-full max-w-lg space-y-3">
    <MAiSuggestions
      :suggestions="suggestions"
      label="Follow-ups"
      @select="pick"
    />
    <p class="text-xs text-muted">
      {{ picked ? `Selected: ${picked}` : 'Pick a chip - it collapses, and the row makes room.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const all = [
  { id: 's-1', label: 'Tighten the intro' },
  { id: 's-2', label: 'Add a benchmark' },
  { id: 's-3', label: 'Compare with the old API' },
  { id: 's-4', label: 'Find the breaking change' },
]

const suggestions = ref([...all])
const picked = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

/**
 * Removing a chip is what shows the exit and the row re-flowing. Putting it
 * back a beat later keeps the example from running out of chips.
 */
const pick = (suggestion: { id: string, label: string }) => {
  picked.value = suggestion.label
  suggestions.value = suggestions.value.filter(item => item.id !== suggestion.id)
  clearTimeout(timer)
  timer = setTimeout(() => {
    suggestions.value = [...all]
  }, 1400)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>
