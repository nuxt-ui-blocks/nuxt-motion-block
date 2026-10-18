<script setup lang="ts">
const stats = [
  { value: 180, suffix: '+', label: 'Motion components' },
  { value: 532, suffix: '', label: 'Copy-paste examples' },
  { value: 17, suffix: '', label: 'Component categories' },
  { value: 0, suffix: '', label: 'Config required' },
]
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl border border-default/70 bg-elevated/30">
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    <div class="grid grid-cols-2 gap-y-10 px-6 py-12 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-default/70 sm:px-4">
      <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="flex flex-col items-center gap-2 text-center sm:px-6"
      >
        <div class="flex items-baseline text-4xl font-semibold tracking-tight text-highlighted tabular-nums sm:text-5xl">
          <MCountingNumber
            :to="stat.value"
            :duration="1.6"
            :delay="index * 120"
            once
          />
          <span
            v-if="stat.suffix"
            class="text-primary"
          >{{ stat.suffix }}</span>
        </div>
        <div class="text-sm text-muted">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </div>
</template>
