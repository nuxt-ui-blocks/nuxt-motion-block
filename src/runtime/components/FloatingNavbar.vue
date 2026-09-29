<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion, useScroll, useMotionValueEvent } from 'motion-v'

interface NavLink {
  label: string
  to: string
}

interface Props {
  links?: NavLink[]
  brand?: string
  blur?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  links: () => [],
  brand: '',
  blur: true,
  class: '',
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

const navbarClasses = computed(() => [
  'fixed top-4 left-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full',
  'border border-default shadow-lg',
  props.blur ? 'bg-background/70 backdrop-blur-xl' : 'bg-background',
  props.class,
].join(' '))
</script>

<template>
  <motion.header
    :class="navbarClasses"
    :initial="{ opacity: 0, y: -100, x: '-50%' }"
    :animate="{
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : -100,
      x: '-50%',
    }"
    :transition="{ type: 'spring', bounce: 0.15, duration: 0.5 }"
  >
    <span class="font-bold text-lg whitespace-nowrap">{{ brand }}</span>

    <nav class="hidden md:flex items-center gap-1">
      <a
        v-for="link in links"
        :key="link.to"
        :href="link.to"
        class="px-3 py-1.5 rounded-full text-sm font-medium hover:bg-muted transition-colors"
      >
        {{ link.label }}
      </a>
    </nav>

    <slot name="right" />
  </motion.header>
</template>
