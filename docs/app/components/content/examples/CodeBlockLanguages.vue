<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <div class="flex flex-wrap items-center gap-3">
      <USelect
        v-model="language"
        :items="languages"
        class="w-40"
      />
      <USelect
        v-model="theme"
        :items="themes"
        class="w-40"
      />
    </div>

    <MCodeBlock
      :key="`${language}-${theme}`"
      :code="snippets[language]"
      :language="language"
      :theme="theme"
    />

    <p class="text-xs text-dimmed">
      The highlighter is built once on mount, so the panel is re-keyed to force a fresh grammar and theme when either changes.
    </p>
  </div>
</template>

<script setup lang="ts">
const languages = ['ts', 'vue', 'css', 'json']
const themes = ['github-dark', 'github-light']

const snippets: Record<string, string> = {
  ts: `export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  return { count, increment }
}`,
  vue: `<template>
  <MCodeBlock
    :code="code"
    language="vue"
  />
</template>`,
  css: `.panel {
  display: grid;
  gap: 1rem;
  border-radius: 0.75rem;
}`,
  json: `{
  "name": "nuxt-motion-block",
  "private": true
}`,
}

const language = ref('ts')
const theme = ref('github-dark')
</script>
