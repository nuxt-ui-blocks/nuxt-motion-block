<template>
  <motion.div
    :initial="{ opacity: 0, y: 40 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
    :class="cn('relative overflow-hidden', props.class)"
    @mouseenter="showShine = true"
    @mouseleave="showShine = false"
  >
    <UCard
      :ui="props.ui"
      class="h-full"
    >
      <template
        v-if="$slots.header"
        #header
      >
        <slot name="header" />
      </template>

      <div class="space-y-4">
        <div
          v-if="props.balance"
          class="text-2xl font-bold text-highlighted"
        >
          {{ props.balance }}
        </div>
        <div
          v-if="props.cardNumber"
          class="text-sm text-muted font-mono tracking-wider"
        >
          {{ maskedCardNumber }}
        </div>
        <slot />
      </div>

      <template
        v-if="$slots.footer"
        #footer
      >
        <slot name="footer" />
      </template>
    </UCard>

    <div
      v-if="props.shine"
      class="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500"
      :class="showShine ? 'opacity-100' : 'opacity-0'"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_0.8s_ease-out_forwards]" />
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import type { CardProps } from '#ui/components/Card.vue'
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { cn } from '../utils/merge'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: CardProps['ui']
  balance?: string
  cardNumber?: string
  shine?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  balance: undefined,
  cardNumber: undefined,
  shine: true,
})

const showShine = ref(false)

const maskedCardNumber = computed(() => {
  if (!props.cardNumber) return ''
  const last4 = props.cardNumber.slice(-4)
  return `•••• •••• •••• ${last4}`
})
</script>

<style scoped>
@keyframes shine {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}
</style>
