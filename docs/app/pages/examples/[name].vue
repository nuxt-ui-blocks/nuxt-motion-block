<script setup lang="ts">
definePageMeta({
  header: false,
  footer: false,
})

const route = useRoute()
const name = computed(() => String(route.params.name ?? ''))

const toPascalCase = (str: string) =>
  str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')

const examples = import.meta.glob('../../components/content/examples/*.vue')

const component = computed(() => {
  if (!name.value) return null
  const path = `../../components/content/examples/${toPascalCase(name.value)}.vue`
  return path in examples ? defineAsyncComponent(examples[path] as () => Promise<{ default: unknown }>) : null
})

useHead({ title: `${name.value} · Nuxt Motion Block` })
</script>

<template>
  <div class="w-full">
    <component
      :is="component"
      v-if="component"
    />
    <p
      v-else
      class="min-h-screen flex items-center justify-center text-muted"
    >
      Example "{{ name }}" not found.
    </p>
  </div>
</template>
