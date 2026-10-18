<script setup lang="ts">
import { computed, defineAsyncComponent, type AsyncComponentLoader } from 'vue'

definePageMeta({
  layout: 'public',
})

const route = useRoute()

const exampleName = computed<string>(() => {
  const name = route.params.name as string | string[] | undefined
  if (Array.isArray(name) && name.length > 0) {
    return name[0] || ''
  }
  return (name as string) || ''
})

const toPascalCase = (str: string): string => {
  return str.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

const examples = import.meta.glob('../../components/content/examples/*.vue')

const exampleComponent = computed(() => {
  if (!exampleName.value) {
    return null
  }

  const componentName = toPascalCase(exampleName.value)
  const path = `../../components/content/examples/${componentName}.vue`

  const componentLoader = examples[path] as AsyncComponentLoader<any> | undefined
  if (componentLoader) {
    return defineAsyncComponent(componentLoader)
  }

  return null
})

// Set page title
useHead({
  title: `${exampleName.value} Example`,
})
</script>

<template>
  <!-- <UPage> -->
  <!-- <UPageHeader
      :title="exampleName"
      :description="`Example demonstration for ${exampleName}`"
    /> -->

  <!-- <UPageBody> -->
  <!-- <div class="flex justify-center w-full"> -->
  <div class="">
    <component
      :is="exampleComponent"
      v-if="exampleComponent"
    />
  </div>
  <!-- </div> -->
  <!-- </UPageBody> -->
  <!-- </UPage> -->
</template>
