<template>
  <div class="flex items-center justify-center">
    <MAnimatedBackground
      default-value="overview"
      :transition="{ duration: 300 }"
      background-class="bg-accented rounded-lg"
      class="inline-flex items-center gap-1 rounded-xl border border-default bg-elevated p-1"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :data-id="tab.id"
        type="button"
        class="relative z-1 rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-highlighted"
      >
        {{ tab.label }}
      </button>
    </MAnimatedBackground>
  </div>
</template>

<script setup>
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
]
</script>
