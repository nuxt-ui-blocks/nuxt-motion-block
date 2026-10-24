<template>
  <div class="w-full max-w-sm rounded-xl border border-default bg-default p-2">
    <MFluidHoverHighlight>
      <button
        v-for="action in actions"
        :key="action.label"
        type="button"
        data-fluid-item
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-default outline-none"
      >
        <UIcon
          :name="action.icon"
          class="size-4 shrink-0 text-muted"
        />
        <span class="flex-1">{{ action.label }}</span>
        <kbd class="font-sans text-[11px] text-muted">{{ action.shortcut }}</kbd>
      </button>
    </MFluidHoverHighlight>
  </div>
</template>

<script setup lang="ts">
/**
 * Five rows, one plate. The plate follows both the pointer and Tab - hover it,
 * then press Tab to watch it move without the mouse.
 */
const actions = [
  { label: 'New file', icon: 'i-lucide-file-plus', shortcut: '⌘N' },
  { label: 'Open project', icon: 'i-lucide-folder-open', shortcut: '⌘O' },
  { label: 'Search', icon: 'i-lucide-search', shortcut: '⌘K' },
  { label: 'Toggle theme', icon: 'i-lucide-sun-moon', shortcut: '⌘J' },
  { label: 'Settings', icon: 'i-lucide-settings', shortcut: '⌘,' },
]
</script>
