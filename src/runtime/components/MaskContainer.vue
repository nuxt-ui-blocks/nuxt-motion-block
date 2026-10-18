<template>
  <motion.div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :initial="false"
  >
    <slot />

    <motion.div
      :class="ui.mask({ class: uiProps.ui?.mask })"
      :style="maskStyle"
      :initial="{ opacity: 1, scale: 1 }"
      :animate="{
        opacity: show ? 0 : 1,
        scale: show ? 1.05 : 1,
        pointerEvents: show ? 'none' : 'auto',
      }"
      :transition="{
        duration: 0.3,
        ease: 'easeInOut',
      }"
    >
      <slot name="mask">
        <div :class="ui.content({ class: uiProps.ui?.content })">
          <div
            v-if="icon"
            :class="ui.iconWrapper({ class: uiProps.ui?.iconWrapper })"
          >
            <UIcon
              :name="icon"
              :class="ui.icon({ class: uiProps.ui?.icon })"
            />
          </div>
          <p
            v-if="label"
            :class="ui.label({ class: uiProps.ui?.label })"
          >
            {{ label }}
          </p>
        </div>
      </slot>
    </motion.div>
  </motion.div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import maskContainer from '../theme/mask-container'

interface Props {
  show?: boolean
  color?: string
  icon?: string
  label?: string
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  color: 'rgba(0,0,0,0.5)',
  icon: '',
  label: '',
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'maskContainer', props, theme: maskContainer })

const resolvedColor = useResolvedColor(() => props.color)

const maskStyle = computed(() => ({
  backgroundColor: resolvedColor.value,
}))
</script>
