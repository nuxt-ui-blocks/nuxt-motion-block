<template>
  <div
    class="relative h-[460px] w-full overflow-hidden rounded-2xl border border-default bg-elevated/30"
  >
    <div class="absolute inset-0 opacity-70 [background-image:radial-gradient(circle,rgba(127,127,127,0.25)_1px,transparent_1px)] [background-size:20px_20px]" />

    <div class="absolute top-24 left-8 h-28 w-40 rounded-2xl border border-primary/30 bg-primary/10" />
    <div class="absolute top-36 right-10 size-24 rounded-full border-2 border-dashed border-primary/40" />
    <div class="absolute bottom-16 left-1/3 h-20 w-52 rounded-xl border border-default bg-default/70 shadow-sm" />

    <div class="absolute bottom-24 left-12 flex items-center gap-2 text-[11px] font-medium text-muted">
      <UIcon
        name="i-lucide-layers"
        class="size-3.5"
      />
      Frame 01
    </div>

    <MVectorEditorToolbar
      v-model:active-tool="active"
      :tools="tools"
      :shortcuts-enabled="false"
      floating
      orientation="vertical"
      aria-label="Canvas tools"
    >
      <template #properties>
        <div class="w-52 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-highlighted">Selection</span>
            <span class="text-[10px] tracking-wide text-dimmed uppercase">Frame</span>
          </div>
          <div class="grid grid-cols-2 gap-1.5 text-[11px]">
            <div
              v-for="field in fields"
              :key="field.label"
              class="flex items-center justify-between rounded-md bg-muted px-2 py-1"
            >
              <span class="text-muted">{{ field.label }}</span>
              <span class="font-medium text-highlighted">{{ field.value }}</span>
            </div>
          </div>
        </div>
      </template>
    </MVectorEditorToolbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('select')

const fields = [
  { label: 'X', value: '120' },
  { label: 'Y', value: '80' },
  { label: 'W', value: '240' },
  { label: 'H', value: '160' },
]

const tools = [
  {
    id: 'select',
    label: 'Select',
    icon: 'i-lucide-mouse-pointer',
  },
  {
    id: 'shape',
    label: 'Shape',
    icon: 'i-lucide-square',
    items: [
      { id: 'rectangle', label: 'Rectangle', icon: 'i-lucide-square' },
      { id: 'ellipse', label: 'Ellipse', icon: 'i-lucide-circle' },
      { id: 'polygon', label: 'Polygon', icon: 'i-lucide-triangle' },
    ],
  },
  {
    id: 'pen',
    label: 'Pen',
    icon: 'i-lucide-pencil',
    items: [
      { id: 'pen', label: 'Pen', icon: 'i-lucide-pen-tool' },
      { id: 'brush', label: 'Brush', icon: 'i-lucide-paintbrush' },
      { id: 'eraser', label: 'Eraser', icon: 'i-lucide-eraser' },
    ],
  },
  {
    id: 'text',
    label: 'Text',
    icon: 'i-lucide-type',
  },
  {
    id: 'hand',
    label: 'Hand',
    icon: 'i-lucide-hand',
  },
]
</script>
