<template>
  <div
    class="group relative inline-block"
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
      class="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :style="{ borderRadius: btnRadius }"
    >
      <div
        class="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent mix-blend-plus-lighter"
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

defineOptions({ inheritAttrs: false })

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
