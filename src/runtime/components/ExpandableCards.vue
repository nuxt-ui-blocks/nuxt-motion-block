<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <motion.div
      v-for="(item, index) in props.items"
      :key="index"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.05 }"
    >
      <UCard
        :ui="{
          root: ui.cardRoot({ class: uiProps.ui?.cardRoot }),
          body: ui.cardBody({ class: uiProps.ui?.cardBody }),
        }"
      >
        <div
          :class="ui.header({ class: uiProps.ui?.header })"
          @click="toggle(index)"
        >
          <div :class="ui.headerContent({ class: uiProps.ui?.headerContent })">
            <h3 :class="ui.title({ class: uiProps.ui?.title })">
              {{ item.title }}
            </h3>
          </div>
          <motion.div
            :animate="{ rotate: isOpen(index) ? 180 : 0 }"
            :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
            :class="ui.chevron({ class: uiProps.ui?.chevron })"
          >
            <svg
              :class="ui.chevronIcon({ class: uiProps.ui?.chevronIcon })"
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
            :class="ui.collapsible({ class: uiProps.ui?.collapsible })"
          >
            <div :class="ui.content({ class: uiProps.ui?.content })">
              <p :class="ui.contentText({ class: uiProps.ui?.contentText })">
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
import { ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import expandableCards from '../theme/expandable-cards'

defineOptions({ inheritAttrs: false })

interface AccordionItem {
  title: string
  content: string
  [key: string]: any
}

interface Props {
  class?: string
  ui?: Record<string, any>
  items: AccordionItem[]
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  multiple: false,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'expandableCards',
  props,
  theme: expandableCards,
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
