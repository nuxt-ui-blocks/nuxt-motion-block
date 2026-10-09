<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MSdfBlobTransition
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="flex h-44 flex-col items-center justify-center gap-1 text-center"
        :class="queued ? 'bg-rose-600 text-white' : 'bg-zinc-900 text-zinc-300'"
      >
        <span class="text-xs font-medium uppercase tracking-widest opacity-70">
          {{ queued ? 'Export queued' : 'No exports' }}
        </span>
        <span class="text-xl font-semibold">
          {{ queued ? '3 renders in the queue' : 'Queue is empty' }}
        </span>
      </div>
    </MSdfBlobTransition>

    <div class="flex items-center gap-3">
      <UButton
        :label="queued ? 'Clear queue' : 'Queue renders'"
        icon="i-lucide-arrow-left-right"
        @click="swap"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const queued = ref(false)
const transitionKey = ref(0)
const rested = ref(false)

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? 'rested' : 'sweeping…'
})

function swap() {
  // The slot updates immediately; the cover that opens the sweep is fully
  // opaque on the first frame, so content and key change on the same tick.
  queued.value = !queued.value
  rested.value = false
  transitionKey.value++
}
</script>
