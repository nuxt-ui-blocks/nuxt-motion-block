<template>
  <div :class="containerClasses">
    <AnimatePresence>
      <motion.div
        v-for="(item, index) in items"
        :key="getKey(item)"
        :layout="layout"
        :initial="{ opacity: 0, scale: 0.8, y: 20 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.8, y: -20 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          delay: index * 0.03,
        }"
        class="will-change-transform"
      >
        <slot
          :item="item"
          :index="index"
          :remove="() => removeItem(index)"
        >
          <UCard>
            <p class="text-sm text-muted">
              {{ item }}
            </p>
          </UCard>
        </slot>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { cn } from '../utils/merge'

interface Props {
  items: any[]
  layout?: boolean
  keyField?: string
  direction?: 'row' | 'column' | 'grid'
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  layout: true,
  keyField: 'id',
  direction: 'grid',
  columns: 3,
})

const emit = defineEmits<{
  remove: [index: number]
}>()

const GRID_COLUMNS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const containerClasses = computed(() => {
  if (props.direction === 'grid') {
    return cn('relative grid gap-4', GRID_COLUMNS[props.columns] ?? GRID_COLUMNS[3])
  }
  if (props.direction === 'row') {
    return cn('relative flex flex-wrap gap-4')
  }
  return cn('relative space-y-4')
})

function getKey(item: any): string | number {
  if (typeof item === 'object' && item !== null) {
    return item[props.keyField] ?? JSON.stringify(item)
  }
  return item
}

function removeItem(index: number) {
  emit('remove', index)
}
</script>
