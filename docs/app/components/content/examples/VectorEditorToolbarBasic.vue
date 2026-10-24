<template>
  <div class="flex w-full flex-col items-center gap-5">
    <MVectorEditorToolbar
      :tools="tools"
      aria-label="Illustration tools"
    />

    <div
      class="relative grid h-44 w-full max-w-md place-items-center overflow-hidden rounded-xl border border-dashed border-default bg-elevated/40"
    >
      <div class="absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(127,127,127,0.28)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div class="relative flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-primary">
        <UIcon
          name="i-lucide-pen-tool"
          class="size-4"
        />
        <span class="text-xs font-medium">Draw something</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tools = [
  {
    id: 'select',
    label: 'Select',
    icon: 'i-lucide-mouse-pointer',
    shortcut: 'V',
  },
  {
    id: 'shape',
    label: 'Shape',
    icon: 'i-lucide-square',
    items: [
      { id: 'rectangle', label: 'Rectangle', icon: 'i-lucide-square', shortcut: 'R' },
      { id: 'ellipse', label: 'Ellipse', icon: 'i-lucide-circle', shortcut: 'O' },
      { id: 'polygon', label: 'Polygon', icon: 'i-lucide-triangle', shortcut: 'Y' },
      { id: 'line', label: 'Line', icon: 'i-lucide-minus', shortcut: 'L' },
    ],
  },
  {
    id: 'pen',
    label: 'Pen',
    icon: 'i-lucide-pencil',
    items: [
      { id: 'pen', label: 'Pen', icon: 'i-lucide-pen-tool', shortcut: 'P' },
      { id: 'brush', label: 'Brush', icon: 'i-lucide-paintbrush', shortcut: 'B' },
      { id: 'eraser', label: 'Eraser', icon: 'i-lucide-eraser', shortcut: 'E' },
    ],
  },
  {
    id: 'text',
    label: 'Text',
    icon: 'i-lucide-type',
    shortcut: 'T',
  },
  {
    id: 'hand',
    label: 'Hand',
    icon: 'i-lucide-hand',
    shortcut: 'H',
  },
  {
    id: 'zoom',
    label: 'Zoom',
    icon: 'i-lucide-search',
    shortcut: 'Z',
  },
]
</script>
