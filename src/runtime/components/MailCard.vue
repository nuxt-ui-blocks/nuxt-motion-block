<template>
  <UCard :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div
      :class="ui.header({ class: uiProps.ui?.header })"
      @click="toggle"
    >
      <div :class="ui.headerContent({ class: uiProps.ui?.headerContent })">
        <h3 :class="ui.title({ class: uiProps.ui?.title })">
          {{ props.title }}
        </h3>
        <p
          v-if="!isExpanded && props.preview"
          :class="ui.preview({ class: uiProps.ui?.preview })"
        >
          {{ props.preview }}
        </p>
      </div>
      <motion.div
        :animate="{ rotate: isExpanded ? 180 : 0 }"
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
        v-if="isExpanded"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
        :class="ui.body({ class: uiProps.ui?.body })"
      >
        <div :class="ui.bodyInner({ class: uiProps.ui?.bodyInner })">
          <slot>
            <p :class="ui.bodyText({ class: uiProps.ui?.bodyText })">
              {{ props.preview }}
            </p>
          </slot>
        </div>
      </motion.div>
    </AnimatePresence>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import mailCard from '../theme/mail-card'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: Record<string, any>
  title: string
  preview?: string
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  preview: '',
  expanded: false,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'mailCard', props, theme: mailCard })

const emit = defineEmits<{
  'update:expanded': [value: boolean]
}>()

const isExpanded = ref(props.expanded)

function toggle() {
  isExpanded.value = !isExpanded.value
  emit('update:expanded', isExpanded.value)
}
</script>
