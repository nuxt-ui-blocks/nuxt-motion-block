<template>
  <UModal
    :open="open"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @update:open="onUpdateOpen"
  >
    <slot />

    <template #content>
      <AnimatePresence>
        <motion.div
          :initial="{ opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.95 }"
          :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
          :class="ui.container({ class: uiProps.ui?.container })"
        >
          <video
            ref="videoRef"
            :src="src"
            :poster="poster"
            :autoplay="autoplay"
            controls
            :class="ui.video({ class: uiProps.ui?.video })"
          />
        </motion.div>
      </AnimatePresence>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import videoModal from '../theme/video-modal'

interface Props {
  src: string
  poster?: string
  autoplay?: boolean
  open?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  poster: '',
  autoplay: false,
  open: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'videoModal',
  props,
  theme: videoModal,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const videoRef = ref<HTMLVideoElement | null>(null)

function onUpdateOpen(val: boolean) {
  emit('update:open', val)
}

watch(() => props.open, async (isOpen) => {
  await nextTick()
  const video = videoRef.value
  if (!video) return
  if (isOpen) {
    video.play().catch(() => {})
  }
  else {
    video.pause()
  }
})
</script>
