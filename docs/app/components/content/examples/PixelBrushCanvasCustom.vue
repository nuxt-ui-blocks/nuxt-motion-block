<template>
  <div class="flex w-full flex-col items-center gap-5 px-6 py-10">
    <MPixelBrushCanvas
      ref="canvas"
      v-model:brush="brush"
      v-model:color="color"
      :grid="true"
      :height="18"
      :palette="palette"
      :pixel-size="14"
      :width="24"
    />

    <div class="flex flex-wrap items-center justify-center gap-3">
      <span class="rounded-full bg-elevated px-3 py-1 text-xs text-muted">
        {{ brush }} · colour {{ color + 1 }}
      </span>
      <UButton
        label="Undo"
        icon="i-lucide-undo-2"
        color="neutral"
        variant="outline"
        size="sm"
        @click="canvas?.undo()"
      />
      <UButton
        label="Clear"
        icon="i-lucide-trash-2"
        color="neutral"
        variant="outline"
        size="sm"
        @click="canvas?.clear()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PixelBrushHandle {
  clear: () => void
  undo: () => void
}

const canvas = ref<PixelBrushHandle | null>(null)
const brush = ref<'pencil' | 'eraser' | 'fill' | 'line' | 'rect'>('pencil')
const color = ref(0)
const palette = [
  'var(--ui-primary)',
  'var(--ui-error)',
  'var(--ui-warning)',
  'var(--ui-success)',
  'var(--ui-info)',
  '#111827',
]
</script>
