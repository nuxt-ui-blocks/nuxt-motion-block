<template>
  <UCard
    :class="props.class"
    :ui="props.ui"
  >
    <div
      class="flex items-start justify-between cursor-pointer"
      @click="toggle"
    >
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-highlighted">
          {{ props.title }}
        </h3>
        <p
          v-if="!isExpanded && props.preview"
          class="text-sm text-muted mt-1 truncate"
        >
          {{ props.preview }}
        </p>
      </div>
      <motion.div
        :animate="{ rotate: isExpanded ? 180 : 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
        class="ml-2 flex-shrink-0 text-muted"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </motion.div>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="isExpanded"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
        class="overflow-hidden"
      >
        <div class="pt-4">
          <slot>
            <p class="text-muted">
              {{ props.preview }}
            </p>
          </slot>
        </div>
      </motion.div>
    </AnimatePresence>
  </UCard>
</template>

<script setup lang="ts">
import type { CardProps } from '#ui/components/Card.vue'
import { ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: CardProps['ui']
  title: string
  preview?: string
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  preview: '',
  expanded: false,
})

const emit = defineEmits<{
  'update:expanded': [value: boolean]
}>()

const isExpanded = ref(props.expanded)

function toggle() {
  isExpanded.value = !isExpanded.value
  emit('update:expanded', isExpanded.value)
}
</script>
