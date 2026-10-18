<template>
  <div class="space-y-12">
    <UPageHeader
      title="MorphIcon"
      description="Animated icon morph between two states with scale and rotation transitions."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Menu Toggle
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Click to toggle between menu and close icons with a morphing animation.
      </p>
      <div class="flex items-center gap-4">
        <UButton
          variant="outline"
          @click="menuOpen = !menuOpen"
        >
          <MMorphIcon :toggled="menuOpen" />
          <span class="ml-2">{{ menuOpen ? 'Close' : 'Menu' }}</span>
        </UButton>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom Icons
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Use any icon set — the morph animation works with any pair.
      </p>
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-center gap-2">
          <UButton
            variant="ghost"
            size="lg"
            @click="heartOpen = !heartOpen"
          >
            <MMorphIcon
              :toggled="heartOpen"
              icon1="i-lucide-heart"
              icon2="i-lucide-heart-crack"
            />
          </UButton>
          <span class="text-xs text-muted">{{ heartOpen ? 'Cracked' : 'Loved' }}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UButton
            variant="ghost"
            size="lg"
            @click="lockOpen = !lockOpen"
          >
            <MMorphIcon
              :toggled="lockOpen"
              icon1="i-lucide-lock"
              icon2="i-lucide-unlock"
            />
          </UButton>
          <span class="text-xs text-muted">{{ lockOpen ? 'Unlocked' : 'Locked' }}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UButton
            variant="ghost"
            size="lg"
            @click="playOpen = !playOpen"
          >
            <MMorphIcon
              :toggled="playOpen"
              icon1="i-lucide-play"
              icon2="i-lucide-pause"
            />
          </UButton>
          <span class="text-xs text-muted">{{ playOpen ? 'Playing' : 'Paused' }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Standalone Sizes
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        The icon inherits its size from the container.
      </p>
      <div class="flex items-end gap-6">
        <div class="flex flex-col items-center gap-1">
          <div class="w-4 h-4">
            <MMorphIcon :toggled="false" />
          </div>
          <span class="text-xs text-muted">16px</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div class="w-6 h-6">
            <MMorphIcon :toggled="true" />
          </div>
          <span class="text-xs text-muted">24px</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div class="w-8 h-8">
            <MMorphIcon :toggled="false" />
          </div>
          <span class="text-xs text-muted">32px</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div class="w-12 h-12">
            <MMorphIcon :toggled="true" />
          </div>
          <span class="text-xs text-muted">48px</span>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const heartOpen = ref(false)
const lockOpen = ref(false)
const playOpen = ref(false)
</script>
