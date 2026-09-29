<template>
  <div class="space-y-12">
    <UPageHeader
      title="PagePreloader"
      description="Teleported page overlay with animated loading bar or spinner and progress indicator."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Bar Progress
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Simulated page load with a progress bar. Click to start.
      </p>
      <div class="flex items-center gap-4">
        <UButton
          label="Start Loading"
          color="primary"
          :disabled="barLoading"
          @click="startBarLoad"
        />
        <span
          v-if="barLoading"
          class="text-sm text-muted"
        >Loading... {{ barProgress }}%</span>
        <span
          v-else
          class="text-sm text-success"
        >Complete!</span>
      </div>
      <MPagePreloader
        v-model:loading="barLoading"
        :progress="barProgress"
        variant="bar"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Spinner Variant
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Indeterminate loading with a spinning icon.
      </p>
      <UButton
        label="Show Spinner"
        color="secondary"
        :disabled="spinnerLoading"
        @click="spinnerLoading = true"
      />
      <MPagePreloader
        v-model:loading="spinnerLoading"
        :progress="0"
        variant="spinner"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Auto-Dismiss
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Loading overlay that auto-completes after 2 seconds.
      </p>
      <UButton
        label="Quick Load"
        color="success"
        :disabled="autoLoading"
        @click="autoLoad"
      />
      <MPagePreloader
        v-model:loading="autoLoading"
        :progress="autoProgress"
        variant="bar"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Click to Dismiss
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Click the overlay background to dismiss.
      </p>
      <UButton
        label="Show Overlay"
        variant="outline"
        @click="dismissLoading = true"
      />
      <MPagePreloader
        v-model:loading="dismissLoading"
        :progress="45"
        variant="bar"
      />
    </UCard>
  </div>
</template>

<script setup lang="ts">
const barLoading = ref(false)
const barProgress = ref(0)
let barInterval: ReturnType<typeof setInterval> | null = null

function startBarLoad() {
  barProgress.value = 0
  barLoading.value = true
  if (barInterval) clearInterval(barInterval)
  barInterval = setInterval(() => {
    barProgress.value += Math.random() * 15 + 5
    if (barProgress.value >= 100) {
      barProgress.value = 100
      barLoading.value = false
      if (barInterval) clearInterval(barInterval)
    }
  }, 200)
}

const spinnerLoading = ref(false)

const autoLoading = ref(false)
const autoProgress = ref(0)

function autoLoad() {
  autoProgress.value = 0
  autoLoading.value = true
  const start = Date.now()
  const duration = 2000
  function tick() {
    const elapsed = Date.now() - start
    autoProgress.value = Math.min(100, (elapsed / duration) * 100)
    if (autoProgress.value < 100) {
      requestAnimationFrame(tick)
    }
    else {
      autoLoading.value = false
    }
  }
  requestAnimationFrame(tick)
}

const dismissLoading = ref(false)
</script>
