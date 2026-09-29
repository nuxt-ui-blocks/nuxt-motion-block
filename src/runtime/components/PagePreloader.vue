<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="loading"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.25 }"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="onOverlayClick"
      >
        <div class="flex flex-col items-center gap-4 p-6 rounded-xl bg-background/80 backdrop-blur-sm shadow-xl">
          <UProgress
            v-if="variant === 'bar'"
            :model-value="progress"
            class="w-48"
          />
          <motion.div
            v-else
            :animate="{ rotate: 360 }"
            :transition="{ repeat: Infinity, duration: 1, ease: 'linear' }"
          >
            <UIcon
              name="i-lucide-loader-2"
              class="w-8 h-8 text-primary"
            />
          </motion.div>
          <span class="text-sm text-muted">{{ Math.round(progress) }}%</span>
        </div>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'

withDefaults(defineProps<{
  loading?: boolean
  progress?: number
  variant?: 'bar' | 'spinner'
}>(), {
  loading: false,
  progress: 0,
  variant: 'bar',
})

const emit = defineEmits<{
  'update:loading': [value: boolean]
}>()

function onOverlayClick() {
  emit('update:loading', false)
}
</script>
