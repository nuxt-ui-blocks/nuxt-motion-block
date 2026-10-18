<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion, useScroll, useMotionValueEvent } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import floatingNavbar from '../theme/floating-navbar'

interface NavLink {
  label: string
  to: string
}

interface Props {
  links?: NavLink[]
  brand?: string
  blur?: boolean
  /**
   * Scroll container to track. When provided the navbar is `sticky` inside the
   * container and reacts to its scroll; otherwise it is `fixed` to the viewport
   * and tracks window scroll.
   */
  container?: HTMLElement | null
  /**
   * Positioning mode. Defaults to `fixed` (viewport) or, when a `container` is
   * given, `inline` (sticky within the container).
   */
  position?: 'fixed' | 'inline'
  hideOnScroll?: boolean
  scrollThreshold?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  links: () => [],
  brand: '',
  blur: true,
  container: undefined,
  position: undefined,
  hideOnScroll: true,
  scrollThreshold: 80,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'floatingNavbar',
  props,
  theme: floatingNavbar,
})

const scrollOptions = computed(() =>
  props.container ? { container: props.container } : {},
)
const { scrollY } = useScroll(scrollOptions)

const positionVariant = computed<NonNullable<Props['position']>>(() =>
  props.position ?? (props.container ? 'inline' : 'fixed'),
)
const xOffset = computed(() => (positionVariant.value === 'inline' ? 0 : '-50%'))

const isVisible = ref(true)
const lastScrollY = ref(0)

useMotionValueEvent(scrollY, 'change', (latest: number) => {
  if (!props.hideOnScroll) {
    isVisible.value = true
  }
  else if (latest > lastScrollY.value && latest > props.scrollThreshold) {
    isVisible.value = false
  }
  else {
    isVisible.value = true
  }
  lastScrollY.value = latest
})
</script>

<template>
  <motion.header
    :class="ui.root({ blur: props.blur, position: positionVariant, class: [uiProps.ui?.root, uiProps.class] })"
    :initial="{ opacity: 0, y: -100, x: xOffset }"
    :animate="{
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : -100,
      x: xOffset,
    }"
    :transition="{ type: 'spring', bounce: 0.15, duration: 0.5 }"
  >
    <span :class="ui.brand({ class: uiProps.ui?.brand })">{{ brand }}</span>

    <nav :class="ui.nav({ class: uiProps.ui?.nav })">
      <a
        v-for="link in links"
        :key="link.to"
        :href="link.to"
        :class="ui.link({ class: uiProps.ui?.link })"
      >
        {{ link.label }}
      </a>
    </nav>

    <slot name="right" />
  </motion.header>
</template>
