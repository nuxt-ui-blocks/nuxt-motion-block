<template>
  <div class="w-full h-fit relative group">
    <!-- refesh button -->
    <div class="flex gap-2 absolute -top-2 -right-2 z-10">
      <UButton
        size="sm"
        variant="neutral"
        icon="i-lucide-rotate-ccw"
        class="hidden group-hover:block"
        title="Refresh"
        @click="key++"
      />
      <UButton
        size="sm"
        variant="neutral"
        icon="i-lucide-arrow-up-right"
        class="hidden group-hover:block"
        title="Open in new tab"
        @click="openInNewTab"
      />
    </div>
    <div class="p-4">
      <component
        :is="exampleComponent"
        v-if="exampleComponent"
        :key="key"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
const key = ref(0)
const toPascalCase = (str) => {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

const examples = import.meta.glob('./examples/*.vue')

const exampleComponent = computed(() => {
  if (!props.name) {
    return null
  }
  const componentName = toPascalCase(props.name)
  const path = `./examples/${componentName}.vue`
  if (path in examples) {
    return defineAsyncComponent(examples[path])
  }
  return null
})

const openInNewTab = () => {
  const url = `/examples/${props.name}`
  window.open(url, '_blank')
}
</script>
