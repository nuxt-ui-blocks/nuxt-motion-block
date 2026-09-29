<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      AnimatedToggle Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Basic Toggle
          </h2>
          <p class="text-sm text-muted mt-1">
            Thumb bounces with spring animation on toggle
          </p>
        </template>
        <div class="flex items-center gap-4">
          <MAnimatedToggle v-model="toggle1" />
          <span class="text-sm text-muted">{{ toggle1 ? 'On' : 'Off' }}</span>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Sizes
          </h2>
          <p class="text-sm text-muted mt-1">
            Different toggle sizes
          </p>
        </template>
        <div class="flex items-center gap-6">
          <div class="flex flex-col items-center gap-1">
            <MAnimatedToggle
              v-model="sizeSm"
              size="sm"
            />
            <span class="text-xs text-muted">sm</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <MAnimatedToggle
              v-model="sizeMd"
              size="md"
            />
            <span class="text-xs text-muted">md</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <MAnimatedToggle
              v-model="sizeLg"
              size="lg"
            />
            <span class="text-xs text-muted">lg</span>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            With Labels
          </h2>
          <p class="text-sm text-muted mt-1">
            Toggle with descriptive labels
          </p>
        </template>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <MAnimatedToggle v-model="notifications" />
            <span class="text-sm">Enable notifications</span>
          </div>
          <div class="flex items-center gap-3">
            <MAnimatedToggle v-model="darkMode" />
            <span class="text-sm">Dark mode</span>
          </div>
          <div class="flex items-center gap-3">
            <MAnimatedToggle v-model="marketing" />
            <span class="text-sm">Marketing emails</span>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Disabled
          </h2>
          <p class="text-sm text-muted mt-1">
            No interaction when disabled
          </p>
        </template>
        <div class="flex items-center gap-4">
          <MAnimatedToggle
            :model-value="true"
            disabled
          />
          <span class="text-sm text-muted">Always on (disabled)</span>
        </div>
        <div class="flex items-center gap-4 mt-2">
          <MAnimatedToggle
            :model-value="false"
            disabled
          />
          <span class="text-sm text-muted">Always off (disabled)</span>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Interactive Demo
          </h2>
          <p class="text-sm text-muted mt-1">
            Toggle and see the state change
          </p>
        </template>
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <MAnimatedToggle v-model="interactive" />
            <span class="text-sm">Feature flag</span>
          </div>
          <div
            class="p-3 rounded-lg text-sm font-mono"
            :class="interactive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'"
          >
            {{ interactive ? 'Feature enabled' : 'Feature disabled' }}
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const toggle1 = ref(false)
const sizeSm = ref(false)
const sizeMd = ref(true)
const sizeLg = ref(false)
const notifications = ref(true)
const darkMode = ref(false)
const marketing = ref(false)
const interactive = ref(false)
</script>
