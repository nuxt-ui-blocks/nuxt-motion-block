<template>
  <ComponentPlayground
    name="FaviconSearch"
    :hide="['results', 'modelValue', 'defaultValue', 'open', 'defaultOpen']"
    :defaults="{
      label: 'Search the docs',
      groupLabel: 'Documentation',
      placeholder: 'Search documentation…',
      maxResults: 4,
      loading: false,
      showShortcut: true,
      hotkey: 'k',
      class: 'max-w-md',
      results: [
        { id: 'vue', title: 'Vue.js', description: 'The progressive JavaScript framework', url: 'https://vuejs.org' },
        { id: 'nuxt', title: 'Nuxt', description: 'The full-stack Vue framework', url: 'https://nuxt.com' },
        { id: 'motion', title: 'Motion for Vue', description: 'A production-ready animation library', url: 'https://motion.dev' },
        { id: 'ui', title: 'Nuxt UI', description: 'A UI library for Nuxt applications', url: 'https://ui.nuxt.com' },
      ],
    }"
    :controls="{
      label: { label: 'Field label', kind: 'string' },
      placeholder: { label: 'Placeholder', kind: 'string' },
      groupLabel: { label: 'List label', kind: 'string' },
      loading: { label: 'Loading', kind: 'boolean' },
      showShortcut: { label: 'Show shortcut', kind: 'boolean' },
      hotkey: { label: 'Hotkey', kind: 'string' },
      maxResults: { label: 'Max results', kind: 'number', min: 1, max: 4, step: 1 },
    }"
  />
</template>
