<template>
  <ComponentPlayground
    name="AiResponse"
    :hide="['citations']"
    :defaults="{
      text: 'Found 12 hardcoded colors [1]. I can tokenize them without touching your theme [2].',
      citations: [
        { id: 'c-1', index: 1, title: 'Nuxt UI theming', url: 'https://ui.nuxt.com' },
        { id: 'c-2', index: 2, title: 'Style tokens', url: 'https://nuxt.com/docs' },
      ],
    }"
  />
</template>
