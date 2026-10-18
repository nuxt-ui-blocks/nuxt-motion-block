<template>
  <div class="flex w-full max-w-2xl flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <MEmbossSurface
        v-for="entry in variants"
        :key="entry.value"
        :variant="entry.value"
        :color="entry.color"
        :softness="entry.softness"
        class="flex h-36 flex-col items-center justify-center gap-1 rounded-2xl border border-default p-6"
      >
        <span
          class="text-lg font-semibold"
          :class="entry.textClass"
        >
          {{ entry.label }}
        </span>
        <span
          class="text-xs opacity-70"
          :class="entry.textClass"
        >
          {{ entry.hint }}
        </span>
      </MEmbossSurface>
    </div>

    <MEmbossSurface
      variant="plaster"
      interactive
      color="#ded9d2"
      :softness="0.8"
      :depth="3"
      class="flex h-32 items-center justify-center rounded-2xl border border-default"
    >
      <p class="text-sm font-medium text-stone-800">
        Move the pointer across this surface
      </p>
    </MEmbossSurface>
  </div>
</template>

<script setup lang="ts">
const variants = [
  { value: 'emboss', label: 'Emboss', hint: 'Raised surface', color: '#52525b', softness: 0.5, textClass: 'text-zinc-100' },
  { value: 'deboss', label: 'Deboss', hint: 'Pressed surface', color: '#52525b', softness: 0.5, textClass: 'text-zinc-100' },
  { value: 'plaster', label: 'Plaster', hint: 'Lit SVG relief', color: '#d6d3d1', softness: 0.8, textClass: 'text-stone-800' },
  { value: 'metal-stamp', label: 'Metal stamp', hint: 'Hard zero-blur edges', color: '#71717a', softness: 0.35, textClass: 'text-zinc-50' },
] as const
</script>
