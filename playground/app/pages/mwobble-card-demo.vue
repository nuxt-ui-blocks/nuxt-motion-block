<template>
  <div class="space-y-12">
    <UPageHeader
      title="WobbleCard"
      description="UCard with iOS-style wobble tilt on hover with spring animation."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Wobble Effect
        </p>
      </template>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MWobbleCard
          v-for="item in items"
          :key="item.title"
          :intensity="10"
        >
          <div class="space-y-2">
            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <UIcon
                :name="item.icon"
                class="w-6 h-6 text-primary"
              />
            </div>
            <h3 class="text-lg font-semibold text-highlighted">
              {{ item.title }}
            </h3>
            <p class="text-sm text-muted">
              {{ item.description }}
            </p>
          </div>
        </MWobbleCard>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          High Intensity
        </p>
      </template>
      <div class="max-w-sm">
        <MWobbleCard
          :intensity="25"
          :speed="200"
        >
          <div class="text-center py-4">
            <h3 class="text-xl font-bold text-highlighted">
              Intense Wobble
            </h3>
            <p class="text-muted mt-2">
              Higher intensity (25) with faster speed (200ms)
            </p>
          </div>
        </MWobbleCard>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const items = [
  { icon: 'i-lucide-zap', title: 'Fast', description: 'Lightning quick interactions and animations.' },
  { icon: 'i-lucide-shield', title: 'Secure', description: 'End-to-end encryption for all data.' },
  { icon: 'i-lucide-globe', title: 'Global', description: 'Deployed across 30+ regions worldwide.' },
]
</script>
