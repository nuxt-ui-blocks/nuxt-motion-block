<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ transform: isPressed ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.15s ease' }"
    @mousedown="isPressed = true"
    @mouseup="isPressed = false"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false; isPressed = false"
  >
    <UButton
      ref="btnRef"
      v-bind="$attrs"
    >
      <slot />
    </UButton>
    <div
      :class="ui.shine({ class: uiProps.ui?.shine })"
      :style="{ borderRadius: btnRadius }"
    >
      <div
        :class="ui.shineBar({ class: uiProps.ui?.shineBar })"
        :style="{
          width: '200%',
          left: isHovered ? '100%' : '-100%',
          transition: 'left 0.6s ease-in-out',
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import smoothButton from '../theme/smooth-button'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ class?: string, ui?: Record<string, any> }>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'smoothButton', props, theme: smoothButton })

const isPressed = ref(false)
const isHovered = ref(false)
const btnRef = ref<any>(null)
const btnRadius = ref('8px')

onMounted(async () => {
  await nextTick()
  const el = btnRef.value?.$el || btnRef.value
  if (el) {
    btnRadius.value = getComputedStyle(el).borderRadius
  }
})
</script>
