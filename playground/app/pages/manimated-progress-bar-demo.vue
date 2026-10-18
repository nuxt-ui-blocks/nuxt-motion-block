<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      AnimatedProgressBar Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Basic Progress
          </h2>
          <p class="text-sm text-muted mt-1">
            Smooth spring animation between values
          </p>
        </template>
        <div class="max-w-sm space-y-4">
          <MAnimatedProgressBar
            :value="basicProgress"
            label="Upload progress"
            status
          />
          <div class="flex gap-2">
            <UButton
              label="0%"
              size="xs"
              @click="basicProgress = 0"
            />
            <UButton
              label="25%"
              size="xs"
              @click="basicProgress = 25"
            />
            <UButton
              label="50%"
              size="xs"
              @click="basicProgress = 50"
            />
            <UButton
              label="75%"
              size="xs"
              @click="basicProgress = 75"
            />
            <UButton
              label="100%"
              size="xs"
              @click="basicProgress = 100"
            />
          </div>
          <p class="text-sm text-muted">
            {{ basicProgress }}%
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            With Shimmer
          </h2>
          <p class="text-sm text-muted mt-1">
            Shimmer overlay sweeps across the bar
          </p>
        </template>
        <div class="max-w-sm space-y-4">
          <MAnimatedProgressBar
            :value="shimmerProgress"
            shimmer
          />
          <UButton
            label="Animate"
            color="primary"
            @click="shimmerProgress = shimmerProgress === 100 ? 0 : 100"
          />
          <p class="text-sm text-muted">
            {{ shimmerProgress }}%
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Animated Steps
          </h2>
          <p class="text-sm text-muted mt-1">
            Step through progress values
          </p>
        </template>
        <div class="max-w-sm space-y-4">
          <MAnimatedProgressBar :value="stepProgress" />
          <div class="flex gap-2">
            <UButton
              label="Previous"
              color="secondary"
              :disabled="stepProgress <= 0"
              @click="stepProgress = Math.max(0, stepProgress - 20)"
            />
            <UButton
              label="Next"
              color="primary"
              :disabled="stepProgress >= 100"
              @click="stepProgress = Math.min(100, stepProgress + 20)"
            />
          </div>
          <p class="text-sm text-muted">
            Step {{ Math.floor(stepProgress / 20) + 1 }} of 6
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Colors
          </h2>
          <p class="text-sm text-muted mt-1">
            Different color variants
          </p>
        </template>
        <div class="max-w-sm space-y-4">
          <div>
            <p class="text-xs text-muted mb-1">
              Primary
            </p>
            <MAnimatedProgressBar
              :value="60"
              color="primary"
            />
          </div>
          <div>
            <p class="text-xs text-muted mb-1">
              Success
            </p>
            <MAnimatedProgressBar
              :value="80"
              color="success"
            />
          </div>
          <div>
            <p class="text-xs text-muted mb-1">
              Warning
            </p>
            <MAnimatedProgressBar
              :value="40"
              color="warning"
            />
          </div>
          <div>
            <p class="text-xs text-muted mb-1">
              Error
            </p>
            <MAnimatedProgressBar
              :value="20"
              color="error"
            />
          </div>
          <div>
            <p class="text-xs text-muted mb-1">
              Info
            </p>
            <MAnimatedProgressBar
              :value="70"
              color="info"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const basicProgress = ref(30)
const shimmerProgress = ref(0)
const stepProgress = ref(0)
</script>
