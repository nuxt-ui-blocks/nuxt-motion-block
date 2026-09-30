<template>
  <motion.div
    class="relative overflow-hidden"
    :class="props.class"
    :initial="false"
  >
    <slot />

    <motion.div
      class="absolute inset-0 z-10 flex items-center justify-center"
      :style="maskStyle"
      :initial="{ opacity: 1, scale: 1 }"
      :animate="{
        opacity: show ? 0 : 1,
        scale: show ? 1.05 : 1,
        pointerEvents: show ? 'none' : 'auto',
      }"
      :transition="{
        duration: 0.3,
        ease: 'easeInOut',
      }"
    >
      <slot name="mask">
        <div class="text-center p-6">
          <div
            v-if="icon"
            class="mb-4"
          >
            <UIcon
              :name="icon"
              class="w-12 h-12 mx-auto text-white"
            />
          </div>
          <p
            v-if="label"
            class="text-white text-lg font-medium"
          >
            {{ label }}
          </p>
        </div>
      </slot>
    </motion.div>
  </motion.div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'

interface Props {
  show?: boolean
  color?: string
  icon?: string
  label?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  color: 'rgba(0,0,0,0.5)',
  icon: '',
  label: '',
})

const maskStyle = computed(() => ({
  backgroundColor: props.color,
}))
</script>
