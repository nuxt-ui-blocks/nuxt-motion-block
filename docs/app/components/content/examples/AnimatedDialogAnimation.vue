<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="option in presets"
        :key="option.id"
        :label="option.label"
        size="sm"
        :color="preset === option.id ? 'primary' : 'neutral'"
        :variant="preset === option.id ? 'solid' : 'subtle'"
        @click="preset = option.id"
      />
    </div>

    <MAnimatedDialog
      :scale="active.scale"
      :variants="active.variants"
      :transition-options="active.transitionOptions"
      title="Animated dialog"
      :description="`Preset: ${active.label}`"
    >
      <UButton
        label="Open dialog"
        color="primary"
      />

      <template #body>
        <div class="p-4">
          <p class="text-muted">
            The dialog opens with the “{{ active.label }}” animation. Pick another
            preset above, then open it again.
          </p>
        </div>
      </template>
    </MAnimatedDialog>
  </div>
</template>

<script setup lang="ts">
const presets = [
  {
    id: 'scale',
    label: 'Scale',
    scale: 0.96,
    variants: undefined,
    transitionOptions: undefined,
  },
  {
    id: 'slide',
    label: 'Slide in',
    scale: 1,
    variants: {
      initial: { opacity: 0, x: 80 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 80 },
    },
    transitionOptions: { type: 'spring' as const, stiffness: 260, damping: 26 },
  },
  {
    id: 'pop',
    label: 'Pop',
    scale: 0.5,
    variants: undefined,
    transitionOptions: { type: 'spring' as const, stiffness: 320, damping: 18 },
  },
]

const preset = ref('scale')
const active = computed(() => presets.find(option => option.id === preset.value) ?? presets[0]!)
</script>
