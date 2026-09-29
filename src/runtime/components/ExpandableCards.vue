<template>
  <div class="space-y-3">
    <motion.div
      v-for="(item, index) in props.items"
      :key="index"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.05 }"
    >
      <UCard
        :class="props.class"
        :ui="props.ui"
      >
        <div
          class="flex items-start justify-between cursor-pointer"
          @click="toggle(index)"
        >
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-highlighted">
              {{ item.title }}
            </h3>
          </div>
          <motion.div
            :animate="{ rotate: isOpen(index) ? 180 : 0 }"
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
            v-if="isOpen(index)"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
            class="overflow-hidden"
          >
            <div class="pt-4">
              <p class="text-muted">
                {{ item.content }}
              </p>
              <slot
                name="item"
                :item="item"
                :index="index"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </UCard>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import type { UCardProps } from '#ui/types'
import { ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'

defineOptions({ inheritAttrs: false })

interface AccordionItem {
  title: string
  content: string
  [key: string]: any
}

interface Props {
  class?: string
  ui?: UCardProps['ui']
  items: AccordionItem[]
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
})

const openIndices = ref<Set<number>>(new Set())

function isOpen(index: number) {
  return openIndices.value.has(index)
}

function toggle(index: number) {
  const next = new Set(openIndices.value)
  if (next.has(index)) {
    next.delete(index)
  }
  else {
    if (!props.multiple) next.clear()
    next.add(index)
  }
  openIndices.value = next
}
</script>
