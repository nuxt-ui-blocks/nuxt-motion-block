<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <div class="flex items-center gap-2">
      <UButton
        size="sm"
        variant="soft"
        @click="expandAll"
      >
        Expand all
      </UButton>
      <UButton
        size="sm"
        variant="soft"
        color="neutral"
        @click="open = []"
      >
        Collapse all
      </UButton>
      <span class="ml-auto text-xs text-dimmed">{{ open.length }} / {{ features.length }} open</span>
    </div>

    <MAccordion
      v-model="open"
      type="multiple"
      :items="features"
    />

    <p class="text-xs text-dimmed">
      With <code>type="multiple"</code> every panel springs open independently and the bound array stays in sync.
    </p>
  </div>
</template>

<script setup lang="ts">
const features: { label: string, value: string, icon: string, content: string }[] = [
  {
    label: 'Sortable panels',
    value: 'panels',
    icon: 'i-lucide-layers',
    content: 'Each trigger is a real button carrying aria-expanded, so keyboard and screen readers work without any extra wiring.',
  },
  {
    label: 'Spring height',
    value: 'spring',
    icon: 'i-lucide-waves',
    content: 'The panel height is measured with scrollHeight and driven 0 → px by a motion-v spring, then restored to auto once it lands.',
  },
  {
    label: 'Open several at once',
    value: 'multiple',
    icon: 'i-lucide-git-branch',
    content: 'Binding an array with type="multiple" lets panels open independently — drive it from buttons, routes, or search.',
  },
]

const open = ref<string[]>(['panels'])

function expandAll() {
  open.value = features.map(feature => feature.value)
}
</script>
