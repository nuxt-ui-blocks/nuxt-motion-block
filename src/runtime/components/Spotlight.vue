<template>
  <div
    ref="containerRef"
    :class="ui.root({ visible: isHovered, class: [uiProps.ui?.root, uiProps.class] })"
    :style="spotlightStyle"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSpring, useTransform } from 'motion-v'
import type { SpringOptions } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import spotlight from '../theme/spotlight'

const props = withDefaults(defineProps<{
  class?: string
  ui?: Record<string, any>
  size?: number
  springOptions?: SpringOptions
}>(), {
  class: 'bg-primary-300/20 dark:bg-primary-600/20',
  ui: undefined,
  size: 200,
  springOptions: () => ({ bounce: 0 }),
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'spotlight',
  props,
  theme: spotlight,
})

const containerRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const parentElement = ref<HTMLElement | null>(null)

const mouseX = useSpring(0, props.springOptions)
const mouseY = useSpring(0, props.springOptions)

const spotlightLeft = useTransform(mouseX, x => `${x - props.size / 2}px`)
const spotlightTop = useTransform(mouseY, y => `${y - props.size / 2}px`)

const left = ref(spotlightLeft.get())
const top = ref(spotlightTop.get())

const handleMouseMove = (event: MouseEvent) => {
  if (!parentElement.value) return
  const { left, top } = parentElement.value.getBoundingClientRect()
  mouseX.set(event.clientX - left)
  mouseY.set(event.clientY - top)
}

const handleMouseEnter = () => isHovered.value = true
const handleMouseLeave = () => isHovered.value = false

watch(containerRef, (el, prevEl, onCleanup) => {
  if (!el) return

  const parent = el.parentElement
  if (parent) {
    parent.style.position = 'relative'
    parent.style.overflow = 'hidden'
    parentElement.value = parent

    parent.addEventListener('mousemove', handleMouseMove)
    parent.addEventListener('mouseenter', handleMouseEnter)
    parent.addEventListener('mouseleave', handleMouseLeave)
  }

  const unsubscribeLeft = spotlightLeft.on('change', (latest) => {
    left.value = latest
  })
  const unsubscribeTop = spotlightTop.on('change', (latest) => {
    top.value = latest
  })

  onCleanup(() => {
    if (parent) {
      parent.removeEventListener('mousemove', handleMouseMove)
      parent.removeEventListener('mouseenter', handleMouseEnter)
      parent.removeEventListener('mouseleave', handleMouseLeave)
    }
    unsubscribeLeft()
    unsubscribeTop()
  })
})

const spotlightStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  left: left.value,
  top: top.value,
}))
</script>
