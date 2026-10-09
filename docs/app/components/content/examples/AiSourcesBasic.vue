<template>
  <div class="w-full max-w-lg rounded-2xl border border-default p-6">
    <MAiSources :sources="sources">
      <template #favicon="{ source }">
        <UIcon :name="source.icon" />
      </template>
    </MAiSources>
  </div>
</template>

<script setup lang="ts">
type Source = {
  id: string
  snippet?: string
  title: string
  url: string
  icon: string
}

const sources: Source[] = [
  {
    id: 's-1',
    icon: 'i-lucide-github',
    snippet: 'Component: add / update / delete a source',
    title: 'Add a search source',
    url: 'https://ui.nuxt.com/docs/components/chat',
  },
  {
    id: 's-2',
    icon: 'i-lucide-book-open',
    snippet: 'How retrieval-augmented generation is wired into the answer',
    title: 'Retrieval notes',
    url: 'https://ai-sdk.dev/docs',
  },
  {
    id: 's-3',
    icon: 'i-lucide-file-text',
    snippet: 'Release checklist, internal',
    title: 'Shipping checklist',
    url: 'https://motion-primitives.com',
  },
  {
    id: 's-4',
    icon: 'i-lucide-globe',
    title: 'Token naming convention',
    url: 'https://nuxt.com/docs',
  },
]
</script>
