<template>
  <div
    role="button"
    tabindex="0"
    :aria-expanded="String(open)"
    :class="rootClasses"
    @click="toggle"
    @keydown.enter="toggle"
    @keydown.space.prevent="toggle"
  >
    <slot
      :is-open="open"
      :toggle="toggle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { injectDisclosure } from './useDisclosure'

interface DisclosureTriggerProps {
  class?: string
}

const props = defineProps<DisclosureTriggerProps>()

const { open, toggle } = injectDisclosure()

const rootClasses = computed(() => {
  return [props.class].filter(Boolean).join(' ')
})
</script>
