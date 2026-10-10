<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Motion, MotionConfig, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import toolbarExpandable from '../theme/toolbar-expandable'

interface ToolbarItem {
  id: string
  label: string
  icon?: string
  content?: any
}

interface Props {
  class?: string
  ui?: Record<string, any>
  items?: ToolbarItem[]
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  items: () => [],
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'toolbarExpandable',
  props,
  theme: toolbarExpandable,
})

const emit = defineEmits<{
  select: [item: ToolbarItem]
}>()

const activeItemId = ref<string | null>(null)
const toolbarRef = ref<HTMLDivElement>()

const activeItem = computed(() => {
  if (!activeItemId.value) return null
  return props.items.find(item => item.id === activeItemId.value) ?? null
})

const springTransition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.2,
}

function handleItemClick(item: ToolbarItem) {
  if (activeItemId.value === item.id) {
    activeItemId.value = null
  }
  else {
    activeItemId.value = item.id
    emit('select', item)
  }
}

function handleClickOutside(event: MouseEvent) {
  if (toolbarRef.value && !toolbarRef.value.contains(event.target as Node)) {
    activeItemId.value = null
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <MotionConfig :transition="springTransition">
    <div
      ref="toolbarRef"
      :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    >
      <div
        :class="ui.bar({ class: uiProps.ui?.bar })"
      >
        <UButton
          v-for="item in items"
          :key="item.id"
          variant="ghost"
          :icon="item.icon"
          :class="ui.button({ active: activeItemId === item.id, class: uiProps.ui?.button })"
          @click="handleItemClick(item)"
        >
          <slot
            name="item-icon"
            :item="item"
            :is-active="activeItemId === item.id"
          />
        </UButton>
      </div>

      <AnimatePresence :initial="false">
        <Motion
          v-if="activeItem"
          :key="activeItem.id"
          :class="ui.panel({ class: uiProps.ui?.panel })"
          :initial="{ opacity: 0, height: 0, scale: 0.95 }"
          :animate="{ opacity: 1, height: 'auto', scale: 1 }"
          :exit="{ opacity: 0, height: 0, scale: 0.95 }"
          style="transform-origin: bottom center"
        >
          <div :class="ui.panelContent({ class: uiProps.ui?.panelContent })">
            <slot
              name="item-content"
              :item="activeItem"
            >
              <div
                v-if="activeItem.content"
                :class="ui.content({ class: uiProps.ui?.content })"
              >
                {{ activeItem.content }}
              </div>
            </slot>
          </div>
        </Motion>
      </AnimatePresence>
    </div>
  </MotionConfig>
</template>
