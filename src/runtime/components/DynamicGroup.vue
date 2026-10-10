<template>
  <div :class="ui.root({ direction: props.direction, columns: props.direction === 'grid' ? props.columns : undefined, class: [uiProps.ui?.root, uiProps.class] })">
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
        :class="ui.item({ class: uiProps.ui?.item })"
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
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import dynamicGroup from '../theme/dynamic-group'

interface Props {
  items: any[]
  layout?: boolean
  keyField?: string
  direction?: 'row' | 'column' | 'grid'
  columns?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  layout: true,
  keyField: 'id',
  direction: 'grid',
  columns: 3,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'dynamicGroup',
  props,
  theme: dynamicGroup,
})

const emit = defineEmits<{
  remove: [index: number]
}>()

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
