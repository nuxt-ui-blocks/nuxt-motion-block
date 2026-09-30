<template>
  <div class="space-y-12">
    <UPageHeader
      title="ThemeToggle"
      description="Animated theme toggle cycling through light, dark, and system modes with icon morph transitions."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic Toggle
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Click to cycle through light → dark → system. The icon morphs with a rotation animation.
      </p>
      <div class="flex items-center gap-4">
        <MThemeToggle />
        <span class="text-sm text-muted">Current: {{ colorMode.preference }}</span>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sizes
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Available in different sizes.
      </p>
      <div class="flex items-center gap-4">
        <MThemeToggle size="xs" />
        <MThemeToggle size="sm" />
        <MThemeToggle size="md" />
        <MThemeToggle size="lg" />
        <MThemeToggle size="xl" />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Inline Usage
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Works naturally in any layout — navbars, sidebars, or toolbars.
      </p>
      <div class="flex items-center justify-between p-4 rounded-lg border border-default">
        <span class="font-semibold">My App</span>
        <div class="flex items-center gap-3">
          <UButton
            variant="ghost"
            size="sm"
            label="Home"
          />
          <UButton
            variant="ghost"
            size="sm"
            label="About"
          />
          <MThemeToggle />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()
</script>
