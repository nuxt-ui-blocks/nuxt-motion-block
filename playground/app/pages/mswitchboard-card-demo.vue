<template>
  <div class="space-y-12">
    <UPageHeader
      title="SwitchboardCard"
      description="UCard with 3D rotateY flip animation and perspective."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Click to Flip
        </p>
      </template>
      <div class="max-w-sm mx-auto">
        <MSwitchboardCard
          :flipped="flipped"
          class="cursor-pointer"
          @click="flipped = !flipped"
        >
          <template #front>
            <div class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  class="w-8 h-8 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-highlighted">
                Front Side
              </h3>
              <p class="text-sm text-muted mt-1">
                Click to see the back
              </p>
            </div>
          </template>
          <template #back>
            <div class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                <svg
                  class="w-8 h-8 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-highlighted">
                Back Side
              </h3>
              <p class="text-sm text-muted mt-1">
                Click to flip back
              </p>
            </div>
          </template>
        </MSwitchboardCard>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const flipped = ref(false)
</script>
