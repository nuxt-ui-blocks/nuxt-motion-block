<template>
  <UModal
    :open="open"
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
          class="relative"
        >
          <video
            ref="videoRef"
            :src="src"
            :poster="poster"
            :autoplay="autoplay"
            controls
            class="w-full rounded-lg"
          />
        </motion.div>
      </AnimatePresence>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'

interface Props {
  src: string
  poster?: string
  autoplay?: boolean
  open?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  poster: '',
  autoplay: false,
  open: false,
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
