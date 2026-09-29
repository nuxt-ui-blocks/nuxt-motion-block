<template>
  <UHeader :ui="{ left: 'flex items-center gap-2' }">
    <template #left>
      <span class="font-bold text-lg">{{ title }}</span>
    </template>

    <template #nav>
      <UNavigationMenu
        :items="desktopItems"
        class="hidden lg:flex"
      />
    </template>

    <template #body>
      <div class="lg:hidden p-4">
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
            class="w-full justify-start"
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

interface NavItem {
  label: string
  to: string
  icon?: string
}

interface Props {
  title?: string
  items?: NavItem[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  items: () => [],
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
