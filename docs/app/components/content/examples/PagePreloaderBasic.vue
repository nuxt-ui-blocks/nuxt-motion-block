<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex items-center gap-3">
      <USwitch
        v-model="loading"
        label="Loading"
      />
      <USelect
        v-model="variant"
        :items="['bar', 'spinner']"
        class="w-28"
      />
    </div>

    <div class="flex h-24 items-center justify-center rounded-2xl border border-default bg-default text-sm text-muted">
      The overlay teleports to body, so it covers this card too. Click anywhere on
      it to dismiss — that emit is the only way out.
    </div>

    <UProgress
      :model-value="progress"
      :max="100"
      size="sm"
    />

    <MPagePreloader
      v-model:loading="loading"
      :progress="progress"
      :variant="variant"
    />
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const variant = ref<'bar' | 'spinner'>('bar')
const progress = ref(0)

let timer: ReturnType<typeof setInterval> | undefined

watch(loading, (value) => {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
  if (value) {
    progress.value = 0
    timer = setInterval(() => {
      progress.value = Math.min(100, progress.value + 4)
      if (progress.value >= 100) {
        loading.value = false
      }
    }, 60)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
