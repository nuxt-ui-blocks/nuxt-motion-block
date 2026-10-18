<template>
  <ComponentPlayground
    name="AiSources"
    :hide="['sources']"
    :defaults="{
      sources: [
        { id: 's-1', title: 'Add a search source', url: 'https://ui.nuxt.com/docs/components/chat', snippet: 'Component: add / update / delete a source' },
        { id: 's-2', title: 'Retrieval notes', url: 'https://ai-sdk.dev/docs', snippet: 'How retrieval-augmented generation is wired into the answer' },
        { id: 's-3', title: 'Shipping checklist', url: 'https://example.com', snippet: 'Release checklist, internal' },
        { id: 's-4', title: 'Token naming convention', url: 'https://nuxt.com/docs' },
      ],
    }"
  />
</template>
