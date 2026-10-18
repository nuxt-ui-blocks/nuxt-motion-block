<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <UButton
        variant="soft"
        class="gap-2"
        @click="menuOpen = !menuOpen"
      >
        <MMorphIcon :toggled="menuOpen" />
        {{ menuOpen ? 'Close' : 'Menu' }}
      </UButton>

      <UButton
        variant="outline"
        class="gap-2"
        @click="liked = !liked"
      >
        <MMorphIcon
          :toggled="liked"
          icon1="i-lucide-heart"
          icon2="i-lucide-heart-crack"
        />
        {{ liked ? 'Unlike' : 'Like' }}
      </UButton>

      <UButton
        variant="ghost"
        class="gap-2"
        @click="playing = !playing"
      >
        <MMorphIcon
          :toggled="playing"
          icon1="i-lucide-play"
          icon2="i-lucide-pause"
        />
        {{ playing ? 'Pause' : 'Play' }}
      </UButton>
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      <code>toggled</code> is the only input: the component holds no state of its own, so whatever
      flips it — a click, a route change, a keyboard shortcut — gets the same rotation and scale
      swap between the two icons.
    </p>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const liked = ref(false)
const playing = ref(false)
</script>
