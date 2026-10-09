<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Motion, MotionConfig, AnimatePresence } from 'motion-v'

interface Props {
  class?: string
  width?: string
  collapsedWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  width: '300px',
  collapsedWidth: '98px',
})

const emit = defineEmits<{
  open: []
  close: []
}>()

const isOpen = ref(false)
const toolbarRef = ref<HTMLDivElement>()

const springTransition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.2,
}

const toolbarWidth = computed(() => (isOpen.value ? props.width : props.collapsedWidth))

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('open')
  }
  else {
    emit('close')
  }
}

function handleClickOutside(event: MouseEvent) {
  if (toolbarRef.value && !toolbarRef.value.contains(event.target as Node)) {
    if (isOpen.value) {
      isOpen.value = false
      emit('close')
    }
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
    <Motion
      ref="toolbarRef"
      :style="{ width: toolbarWidth }"
      class="relative flex items-center h-12 rounded-2xl bg-default/80 dark:bg-default/80 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20 overflow-hidden"
      :class="props.class"
      layout
    >
      <div class="flex items-center justify-center h-full shrink-0 overflow-hidden whitespace-nowrap">
        <UButton
          variant="ghost"
          :icon="isOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          class="flex items-center justify-center w-12 h-full shrink-0"
          @click="toggle"
        />

        <div
          v-if="!isOpen"
          class="flex items-center gap-1 pr-3 shrink-0"
        >
          <slot name="default" />
        </div>
      </div>

      <AnimatePresence>
        <Motion
          v-if="isOpen"
          class="flex-1 flex items-center h-full px-4"
          :initial="{ opacity: 0, width: 0 }"
          :animate="{ opacity: 1, width: 'auto' }"
          :exit="{ opacity: 0, width: 0 }"
        >
          <slot name="expanded" />
        </Motion>
      </AnimatePresence>
    </Motion>
  </MotionConfig>
</template>
