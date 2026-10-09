<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6">
    <div class="flex h-28 items-center justify-center">
      <MGridLoader
        :pattern="pattern"
        :mode="mode"
        :sequence="['solo-center', 'x-shape', 'diamond', 'border']"
        color="primary"
        size="lg"
        :rounded="rounded"
        :static="frozen"
      />
    </div>

    <div class="grid w-full max-w-sm grid-cols-2 gap-3">
      <USelect
        v-model="pattern"
        :items="patterns"
      />
      <USelect
        v-model="mode"
        :items="['pulse', 'stagger', 'sequence']"
      />
    </div>

    <div class="flex items-center gap-4">
      <UCheckbox
        v-model="rounded"
        label="Round cells"
      />
      <UButton
        :label="frozen ? 'Resume' : 'Freeze'"
        icon="i-lucide-pause"
        size="xs"
        variant="outline"
        @click="frozen = !frozen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const pattern = ref('wave-lr')
const mode = ref<'pulse' | 'stagger' | 'sequence'>('pulse')
const rounded = ref(false)
const frozen = ref(false)

const patterns = ['wave-lr', 'spiral-cw', 'heartbeat', 'checkerboard', 'border', 'ripple-out']
</script>
