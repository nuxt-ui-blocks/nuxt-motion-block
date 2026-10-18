<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="loading"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.25 }"
        :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
        @click.self="onOverlayClick"
      >
        <div :class="ui.panel({ class: uiProps.ui?.panel })">
          <UProgress
            v-if="variant === 'bar'"
            :model-value="progress"
            :class="ui.progress({ class: uiProps.ui?.progress })"
          />
          <motion.div
            v-else
            :animate="{ rotate: 360 }"
            :transition="{ repeat: Infinity, duration: 1, ease: 'linear' }"
          >
            <UIcon
              name="i-lucide-loader-2"
              :class="ui.spinnerIcon({ class: uiProps.ui?.spinnerIcon })"
            />
          </motion.div>
          <span :class="ui.label({ class: uiProps.ui?.label })">{{ Math.round(progress) }}%</span>
        </div>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import pagePreloader from '../theme/page-preloader'

const props = withDefaults(defineProps<{
  class?: string
  loading?: boolean
  progress?: number
  variant?: 'bar' | 'spinner'
  ui?: Record<string, any>
}>(), {
  class: undefined,
  loading: false,
  progress: 0,
  variant: 'bar',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'pagePreloader', props, theme: pagePreloader })

const emit = defineEmits<{
  'update:loading': [value: boolean]
}>()

function onOverlayClick() {
  emit('update:loading', false)
}
</script>
