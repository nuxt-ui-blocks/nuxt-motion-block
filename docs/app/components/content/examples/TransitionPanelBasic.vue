<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MTransitionPanel
      :active-index="active"
      :variants="variants"
      :transition="{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }"
      class="overflow-hidden rounded-2xl"
    >
      <div
        :key="active"
        class="flex h-40 flex-col items-center justify-center gap-1 p-6 text-center"
        :class="panels[active].tone"
      >
        <span class="text-xs font-medium uppercase tracking-widest opacity-70">
          {{ panels[active].eyebrow }}
        </span>
        <span class="text-lg font-semibold text-white">
          {{ panels[active].title }}
        </span>
      </div>
    </MTransitionPanel>

    <div class="grid grid-cols-3 gap-2">
      <UButton
        v-for="(panel, index) in panels"
        :key="panel.title"
        :label="String(index + 1)"
        :variant="index === active ? 'solid' : 'outline'"
        class="justify-center"
        @click="active = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const active = ref(1)

const panels = [
  { eyebrow: 'Queued', title: 'Waiting on CI', tone: 'bg-primary' },
  { eyebrow: 'Running', title: 'Building bundle', tone: 'bg-amber-600' },
  { eyebrow: 'Done', title: 'Deployed to prod', tone: 'bg-emerald-600' },
]

// The panel is keyed on `activeIndex` internally, so the slot only has to supply
// the content for the index currently on screen.
const variants = {
  enter: { opacity: 0, y: 24, rotateX: -12 },
  center: { opacity: 1, y: 0, rotateX: 0 },
  exit: { opacity: 0, y: -24, rotateX: 12 },
}
</script>
