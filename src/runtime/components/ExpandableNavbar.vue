<template>
  <UHeader
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :ui="{ left: ui.left({ class: uiProps.ui?.left }) }"
  >
    <template #left>
      <span :class="ui.title({ class: uiProps.ui?.title })">{{ title }}</span>
    </template>

    <UNavigationMenu
      :items="desktopItems"
      :class="ui.menu({ class: uiProps.ui?.menu })"
    />

    <template #body>
      <div :class="ui.body({ class: uiProps.ui?.body })">
        <motion.div
          v-for="(item, i) in items"
          :key="item.to"
          :initial="{ opacity: 0, x: -24 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 25 }"
        >
          <UButton
            :to="item.to"
            variant="ghost"
            :icon="item.icon"
            :class="ui.button({ class: uiProps.ui?.button })"
            :label="item.label"
          />
        </motion.div>
      </div>
    </template>

    <slot name="actions" />
  </UHeader>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import expandableNavbar from '../theme/expandable-navbar'

interface NavItem {
  label: string
  to: string
  icon?: string
}

interface Props {
  title?: string
  items?: NavItem[]
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  items: () => [],
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'expandableNavbar',
  props,
  theme: expandableNavbar,
})

const desktopItems = computed(() => {
  return [
    props.items.map(item => ({
      label: item.label,
      to: item.to,
      icon: item.icon,
    })),
  ]
})
</script>
