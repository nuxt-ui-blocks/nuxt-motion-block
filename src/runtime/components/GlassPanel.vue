<template>
  <div
    ref="cardRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <UCard :ui="{ root: ui.card({ class: uiProps.ui?.card }) }">
      <template
        v-if="$slots.header"
        #header
      >
        <slot name="header" />
      </template>

      <slot />

      <template
        v-if="$slots.footer"
        #footer
      >
        <slot name="footer" />
      </template>
    </UCard>

    <div
      v-if="props.backgroundImage"
      :class="ui.background({ class: uiProps.ui?.background })"
      :style="parallaxStyle"
    >
      <img
        :src="props.backgroundImage"
        :class="ui.backgroundImage({ class: uiProps.ui?.backgroundImage })"
        alt=""
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import glassPanel from '../theme/glass-panel'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: Record<string, any>
  backgroundImage?: string
  parallax?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  backgroundImage: undefined,
  parallax: true,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'glassPanel',
  props,
  theme: glassPanel,
})

const cardRef = ref<HTMLElement>()
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

const parallaxStyle = computed(() => {
  if (!props.parallax || !isHovering.value) {
    return { transform: 'translate(0, 0) scale(1.1)' }
  }
  const x = (mouseX.value - 0.5) * 20
  const y = (mouseY.value - 0.5) * 20
  return { transform: `translate(${x}px, ${y}px) scale(1.1)` }
})

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value || !props.parallax) return
  const rect = cardRef.value.getBoundingClientRect()
  isHovering.value = true
  mouseX.value = (e.clientX - rect.left) / rect.width
  mouseY.value = (e.clientY - rect.top) / rect.height
}

function handleMouseLeave() {
  isHovering.value = false
  mouseX.value = 0.5
  mouseY.value = 0.5
}
</script>
