<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Motion, MotionConfig, AnimatePresence } from 'motion-v'

interface ToolbarItem {
  id: string
  label: string
  icon?: string
  content?: any
}

interface Props {
  class?: string
  items?: ToolbarItem[]
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  items: () => [],
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
      class="relative inline-flex flex-col-reverse items-center gap-2"
      :class="props.class"
    >
      <div
        class="flex items-center gap-1 h-12 px-2 rounded-2xl bg-default/80 dark:bg-default/80 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20"
      >
        <UButton
          v-for="item in items"
          :key="item.id"
          variant="ghost"
          :icon="item.icon"
          class="flex items-center justify-center w-10 h-10 rounded-xl"
          :class="[
            activeItemId === item.id
              ? 'bg-muted/10 dark:bg-muted/10'
              : '',
          ]"
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
          class="w-full rounded-2xl bg-default/90 dark:bg-default/90 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20 overflow-hidden"
          :initial="{ opacity: 0, height: 0, scale: 0.95 }"
          :animate="{ opacity: 1, height: 'auto', scale: 1 }"
          :exit="{ opacity: 0, height: 0, scale: 0.95 }"
          style="transform-origin: bottom center"
        >
          <div class="p-4">
            <slot
              name="item-content"
              :item="activeItem"
            >
              <div
                v-if="activeItem.content"
                class="text-sm text-muted dark:text-muted"
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
