<script setup lang="ts">
import { ref } from 'vue'
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
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  links: () => [],
  brand: '',
  blur: true,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'floatingNavbar',
  props,
  theme: floatingNavbar,
})

const { scrollY } = useScroll()
const isVisible = ref(true)
const lastScrollY = ref(0)

useMotionValueEvent(scrollY, 'change', (latest: number) => {
  if (latest > lastScrollY.value && latest > 80) {
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
    :class="ui.root({ blur: props.blur, class: [uiProps.ui?.root, uiProps.class] })"
    :initial="{ opacity: 0, y: -100, x: '-50%' }"
    :animate="{
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : -100,
      x: '-50%',
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
