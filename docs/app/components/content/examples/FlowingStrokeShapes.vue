<template>
  <div class="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
    <div
      v-for="item in shapes"
      :key="item.label"
      class="rounded-2xl border border-default p-4"
    >
      <div class="flex justify-center">
        <MFlowingStroke
          :width="300"
          :height="120"
          color="primary"
          :shape="item.shape"
          :amplitude="item.amplitude"
          trigger="loop"
          :speed="1.6"
        />
      </div>
      <p class="mt-2 text-center text-xs font-medium text-muted">
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const shapes = [
  { shape: 'wave', amplitude: 1, label: 'wave — the default rolling curve' },
  { shape: 'arc', amplitude: 1, label: 'arc — one arch, up and back down' },
  { shape: 'diagonal', amplitude: 1, label: 'diagonal — a gentle rise' },
  { shape: 'zigzag', amplitude: 1, label: 'zigzag — sharp, straight segments' },
  { shape: 'ring', amplitude: 1, label: 'ring — a closed loop the dashes orbit' },
  { shape: 'wave', amplitude: 0.4, label: 'wave with amplitude 0.4 — a flatter curve' },
] as const
</script>
