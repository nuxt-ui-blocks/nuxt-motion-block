<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MApertureBlurTransition
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="relative flex h-44 flex-col justify-end gap-1 overflow-hidden p-6"
        :class="open
          ? 'bg-gradient-to-br from-amber-200 via-rose-300 to-sky-400'
          : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800'"
      >
        <span
          aria-hidden="true"
          class="absolute -top-8 -right-8 size-32 rounded-full border"
          :class="open ? 'border-black/20' : 'border-white/20'"
        />
        <span
          class="text-xs font-medium tracking-widest"
          :class="open ? 'text-black/60' : 'text-white/60'"
        >
          {{ open ? 'f/1.4' : 'f/16' }}
        </span>
        <span
          class="text-xl font-semibold"
          :class="open ? 'text-black' : 'text-white'"
        >
          {{ open ? 'Wide open, everything soft' : 'Stopped down, everything sharp' }}
        </span>
      </div>
    </MApertureBlurTransition>

    <div class="flex items-center gap-3">
      <UButton
        :label="open ? 'Stop down' : 'Open up'"
        icon="i-lucide-aperture"
        @click="swap"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
const transitionKey = ref(0)
const rested = ref(false)

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? 'rested' : 'sweeping…'
})

function swap() {
  // The slot updates immediately; the cover that opens the sweep is fully
  // opaque on the first frame, so content and key change on the same tick.
  open.value = !open.value
  rested.value = false
  transitionKey.value++
}
</script>
