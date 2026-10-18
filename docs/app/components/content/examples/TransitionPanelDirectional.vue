<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MTransitionPanel
      :active-index="active"
      :custom="direction"
      :variants="variants"
      :transition="{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }"
      class="overflow-hidden rounded-2xl"
    >
      <div
        :key="active"
        class="flex h-40 flex-col items-center justify-center gap-1 p-6 text-center"
        :class="steps[active].tone"
      >
        <span class="text-xs font-medium uppercase tracking-widest text-white/70">
          {{ steps[active].eyebrow }}
        </span>
        <span class="text-lg font-semibold text-white">
          {{ steps[active].title }}
        </span>
      </div>
    </MTransitionPanel>

    <div class="flex items-center justify-between">
      <UButton
        label="Back"
        icon="i-lucide-arrow-left"
        variant="outline"
        :disabled="active === 0"
        @click="go(-1)"
      />
      <span class="text-xs text-muted">{{ active + 1 }} / {{ steps.length }}</span>
      <UButton
        label="Next"
        trailing-icon="i-lucide-arrow-right"
        :disabled="active === steps.length - 1"
        @click="go(1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const active = ref(1)
const direction = ref(1)

// `custom` reaches the exiting child, so only `exit` can vary with direction:
// the outgoing panel leaves opposite the way the visitor is moving, while the
// arriving panel always enters from the same side.
const variants = {
  enter: { opacity: 0, x: 48 },
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
}

const steps = [
  { eyebrow: 'Step one', title: 'Connect your account', tone: 'bg-primary' },
  { eyebrow: 'Step two', title: 'Invite your team', tone: 'bg-amber-600' },
  { eyebrow: 'Step three', title: 'Ship your first change', tone: 'bg-emerald-600' },
]

function go(step: number) {
  direction.value = step
  active.value = Math.min(Math.max(active.value + step, 0), steps.length - 1)
}
</script>
