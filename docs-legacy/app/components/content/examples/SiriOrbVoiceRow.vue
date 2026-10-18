<template>
  <div class="w-full max-w-md rounded-xl bg-black/5 p-6 dark:bg-white/5">
    <div class="flex items-center gap-4">
      <MSiriOrb
        :amplitude="level"
        :size="'56px'"
        state="listening"
      />
      <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-highlighted">
          Hey, how can I help?
        </span>
        <span class="text-xs text-muted">Listening…</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// In a real app, `level` is a MotionValue<number> from `useAudioAmplitude`.
// The orb reads it through `useTransform`, so a 60Hz audio stream animates on
// the motion thread instead of costing 60 component updates per second.
const level = ref(0)

let raf = 0
let t = 0
const tick = () => {
  t += 0.03
  level.value = 0.35 + 0.4 * Math.abs(Math.sin(t) * Math.cos(t * 0.6))
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>
