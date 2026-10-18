<template>
  <div class="flex w-full max-w-md flex-col items-center gap-8 py-6">
    <MMusicToggle
      v-model:playing="playing"
      :progress="progress"
      :on-seek="seek"
      :size="104"
      title="Night Ride"
      artist="Nova Kinetic"
      cover="https://picsum.photos/seed/midnight-drive/400/400"
    />

    <div class="flex w-full flex-col gap-1.5">
      <USlider
        v-model="progress"
        :min="0"
        :max="1"
        :step="0.01"
        aria-label="Follow progress"
      />
      <span class="text-xs text-muted">
        progress = {{ progress.toFixed(2) }} · focus the ring, then use ←/→, Home or End
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const playing = ref(false)
const progress = ref(0.35)

function seek(value: number) {
  progress.value = value
}
</script>
