<template>
  <ComponentPlayground
    name="AnimatedBackground"
    :defaults="{
      defaultValue: 'inbox',
      containerClass: 'flex items-center gap-1 rounded-xl border border-default bg-elevated p-1',
    }"
  >
    <button
      v-for="item in items"
      :key="item.id"
      :data-id="item.id"
      type="button"
      class="relative z-1 flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-highlighted"
    >
      <UIcon
        :name="item.icon"
        class="size-4"
      />
      {{ item.label }}
    </button>
  </ComponentPlayground>
</template>

<script setup>
const items = [
  { id: 'inbox', label: 'Inbox', icon: 'i-lucide-inbox' },
  { id: 'drafts', label: 'Drafts', icon: 'i-lucide-file-pen' },
  { id: 'sent', label: 'Sent', icon: 'i-lucide-send' },
  { id: 'trash', label: 'Trash', icon: 'i-lucide-trash-2' },
]
</script>
