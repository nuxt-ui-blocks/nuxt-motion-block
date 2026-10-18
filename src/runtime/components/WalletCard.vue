<template>
  <motion.div
    :initial="{ opacity: 0, y: 40 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
    :class="ui.wrapper({ class: [uiProps.ui?.wrapper, uiProps.class] })"
    @mouseenter="showShine = true"
    @mouseleave="showShine = false"
  >
    <UCard
      :ui="{ ...uiProps.ui, root: ui.card({ class: [uiProps.ui?.root, uiProps.ui?.card] }) }"
    >
      <template
        v-if="$slots.header"
        #header
      >
        <slot name="header" />
      </template>

      <div :class="ui.body({ class: uiProps.ui?.body })">
        <div
          v-if="props.balance"
          :class="ui.balance({ class: uiProps.ui?.balance })"
        >
          {{ props.balance }}
        </div>
        <div
          v-if="props.cardNumber"
          :class="ui.cardNumber({ class: uiProps.ui?.cardNumber })"
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
      :class="ui.shine({ class: [showShine ? 'opacity-100' : 'opacity-0', uiProps.ui?.shine] })"
    >
      <div :class="ui.shineBeam({ class: uiProps.ui?.shineBeam })" />
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import walletCard from '../theme/wallet-card'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: Record<string, any>
  balance?: string
  cardNumber?: string
  shine?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  balance: undefined,
  cardNumber: undefined,
  shine: true,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'walletCard',
  props,
  theme: walletCard,
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
