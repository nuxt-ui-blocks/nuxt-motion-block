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
        class="flex items-center gap-1 h-12 px-2 rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl shadow-black/20"
      >
        <UButton
          v-for="item in items"
          :key="item.id"
          variant="ghost"
          :icon="item.icon"
          class="flex items-center justify-center w-10 h-10 rounded-xl"
          :class="[
            activeItemId === item.id
              ? 'bg-black/10 dark:bg-white/10'
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
          class="w-full rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl shadow-black/20 overflow-hidden"
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
                class="text-sm text-gray-700 dark:text-gray-300"
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
