<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Motion, MotionConfig, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import toolbarDynamic from '../theme/toolbar-dynamic'

interface Props {
  class?: string
  ui?: Record<string, any>
  width?: string
  collapsedWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  width: '300px',
  collapsedWidth: '98px',
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'toolbarDynamic',
  props,
  theme: toolbarDynamic,
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
      :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
      layout
    >
      <div :class="ui.inner({ class: uiProps.ui?.inner })">
        <UButton
          variant="ghost"
          :icon="isOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          :class="ui.toggle({ class: uiProps.ui?.toggle })"
          @click="toggle"
        />

        <div
          v-if="!isOpen"
          :class="ui.collapsed({ class: uiProps.ui?.collapsed })"
        >
          <slot name="default" />
        </div>
      </div>

      <AnimatePresence>
        <Motion
          v-if="isOpen"
          :class="ui.expanded({ class: uiProps.ui?.expanded })"
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
