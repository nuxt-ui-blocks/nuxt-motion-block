<template>
  <div
    ref="containerRef"
    :class="ui.root({ class: [uiProps.ui?.root, props.containerClass, uiProps.class] })"
    @click="handleClick"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <slot
      :active-id="activeId"
      :set-active-id="setActiveId"
    />

    <!-- Animated Background -->
    <div
      v-if="showBackground"
      :class="ui.background({ class: [uiProps.ui?.background, props.backgroundClass] })"
      :style="backgroundStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedBackground from '../theme/animated-background'

interface Props {
  defaultValue?: string | null
  enableHover?: boolean
  backgroundClass?: string
  containerClass?: string
  class?: string
  transition?: {
    duration?: number
    ease?: string
  }
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: null,
  enableHover: false,
  backgroundClass: 'bg-accented rounded-lg',
  containerClass: '',
  class: undefined,
  transition: () => ({ duration: 300, ease: 'ease-out' }),
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'animatedBackground', props, theme: animatedBackground })

const emit = defineEmits<{
  valueChange: [value: string | null]
}>()

// Refs
const containerRef = ref<HTMLElement>()
const activeId = ref<string | null>(props.defaultValue)
const backgroundStyle = ref<Record<string, string>>({})
const showBackground = ref(false)

// Methods
const updateBackgroundPosition = async () => {
  if (!containerRef.value || !activeId.value) {
    showBackground.value = false
    return
  }

  await nextTick()

  const activeElement = containerRef.value.querySelector(`[data-id="${activeId.value}"]`) as HTMLElement
  if (!activeElement) {
    showBackground.value = false
    return
  }

  const containerRect = containerRef.value.getBoundingClientRect()
  const elementRect = activeElement.getBoundingClientRect()

  backgroundStyle.value = {
    left: `${elementRect.left - containerRect.left}px`,
    top: `${elementRect.top - containerRect.top}px`,
    width: `${elementRect.width}px`,
    height: `${elementRect.height}px`,
    transitionDuration: `${props.transition.duration}ms`,
    transitionTimingFunction: props.transition.ease || 'ease-out',
  }

  showBackground.value = true
}

const setActiveId = async (id: string | null) => {
  activeId.value = id
  emit('valueChange', id)
  await updateBackgroundPosition()
}

const findDataId = (element: HTMLElement): string | null => {
  let current: HTMLElement | null = element
  let depth = 0

  while (current && depth < 10) {
    const dataId = current.getAttribute('data-id')
    if (dataId) return dataId
    current = current.parentElement
    depth++
  }

  return null
}

const handleClick = (event: MouseEvent) => {
  if (props.enableHover) return

  const target = event.target as HTMLElement
  const dataId = findDataId(target)
  if (dataId) {
    setActiveId(dataId)
  }
}

const handleMouseOver = (event: MouseEvent) => {
  if (!props.enableHover) return

  const target = event.target as HTMLElement
  const dataId = findDataId(target)
  if (dataId) {
    setActiveId(dataId)
  }
}

const handleMouseLeave = () => {
  if (!props.enableHover) return
  setActiveId(null)
}

// Lifecycle
onMounted(() => {
  if (props.defaultValue) {
    updateBackgroundPosition()
  }
})
</script>
