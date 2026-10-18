<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-5">
    <div class="flex items-baseline gap-2">
      <span class="text-xs uppercase tracking-widest text-muted">Now playing</span>
      <MTextRoll
        :key="track"
        :children="track"
        :duration="0.6"
        :get-enter-delay="i => i * 0.045"
        :get-exit-delay="i => i * 0.045"
        :transition="{ ease: [0.22, 1, 0.36, 1] }"
        :variants="{
          enter: { initial: { rotateX: 0, opacity: 1 }, animate: { rotateX: 95, opacity: 0 } },
          exit: { initial: { rotateX: -95, opacity: 0 }, animate: { rotateX: 0, opacity: 1 } },
        }"
        class="text-lg font-semibold text-primary"
        :on-animation-complete="() => (finished = true)"
      />
    </div>

    <div class="flex items-center gap-3">
      <UButton
        label="Next track"
        icon="i-lucide-skip-forward"
        variant="outline"
        @click="next"
      />
      <span class="text-xs text-dimmed">{{ finished ? 'ready' : 'rolling…' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const tracks = ['Midnight City', 'Reunion', 'Outro']
const index = ref(0)
const track = computed(() => tracks[index.value])
const finished = ref(false)

function next() {
  finished.value = false
  index.value = (index.value + 1) % tracks.length
}
</script>
