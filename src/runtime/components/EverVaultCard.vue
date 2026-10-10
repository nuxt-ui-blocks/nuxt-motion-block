<template>
  <UCard
    ref="cardRef"
    v-bind="$attrs"
    :ui="{
      root: ui.root({ class: [uiProps.ui?.root, uiProps.class] }),
      body: ui.body({ class: uiProps.ui?.body }),
    }"
    @mousemove="onMouseMove"
  >
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>
    <div :class="ui.overlay({ class: uiProps.ui?.overlay })">
      <div :class="ui.mask({ class: uiProps.ui?.mask })" />

      <!-- Gradient layer -->
      <motion.div
        :class="[ui.gradient({ class: uiProps.ui?.gradient }), props.gradientColors]"
        :style="gradientStyle"
      />

      <!-- Text pattern layer -->
      <motion.div
        :class="ui.pattern({ class: uiProps.ui?.pattern })"
        :style="gradientStyle"
      >
        <p :class="ui.patternText({ class: uiProps.ui?.patternText })">
          {{ randomString }}
        </p>
      </motion.div>
    </div>
    <template v-if="$slots.default">
      <slot />
    </template>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import everVaultCard from '../theme/ever-vault-card'

interface Props {
  class?: string
  gradientColors?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  gradientColors: 'from-green-500 to-blue-700',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'everVaultCard',
  props,
  theme: everVaultCard,
})

const cardRef = ref<HTMLElement>()
const mouseX = ref(0)
const mouseY = ref(0)
const randomString = ref('')

onMounted(() => {
  randomString.value = generateRandomString(1500)
})

const onMouseMove = (event: MouseEvent) => {
  if (!cardRef.value) return
  // @ts-ignore
  const { left, top } = cardRef.value.$el.getBoundingClientRect()
  mouseX.value = event.clientX - left
  mouseY.value = event.clientY - top

  randomString.value = generateRandomString(1500)
}

const gradientStyle = computed(() => {
  const maskImage = `radial-gradient(250px at ${mouseX.value}px ${mouseY.value}px, white, transparent)`
  return {
    maskImage,
    WebkitMaskImage: maskImage,
  }
})

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const generateRandomString = (length: number) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
</script>
