<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { animate } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import variableProximity from '../theme/variable-proximity'

const props = defineProps({
  label: { type: String, required: true },
  class: { type: String, default: undefined },
  ui: { type: Object, default: undefined },
  fromFontVariationSettings: { type: String, default: '\'wght\' 400, \'opsz\' 9' },
  toFontVariationSettings: { type: String, default: '\'wght\' 1000, \'opsz\' 40' },
  containerRef: { type: Object, default: null },
  radius: { type: Number, default: 100 },
  falloff: { type: String as PropType<'linear' | 'exponential' | 'gaussian'>, default: 'linear' },
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'variableProximity',
  props,
  theme: variableProximity,
})

const internalContainerRef = ref<HTMLElement | null>(null)
const charRefs = ref<HTMLElement[]>([])

function parseFontVariation(settings: string) {
  const w = /'wght'\s*([0-9.]+)/.exec(settings)
  const o = /'opsz'\s*([0-9.]+)/.exec(settings)
  return { wght: w ? Number(w[1]) : 400, opsz: o ? Number(o[1]) : 9 }
}

const fromVars = parseFontVariation(props.fromFontVariationSettings)
const toVars = parseFontVariation(props.toFontVariationSettings)

function getContainer() {
  const c = props.containerRef
  if (c?.value) return c.value
  if (c instanceof HTMLElement) return c
  return internalContainerRef.value
}

// ✅ Define cleanup variables outside to close over them
let handleMove: ((e: MouseEvent) => void) | null = null
let handleLeave: (() => void) | null = null

// ✅ Register cleanup synchronously
onUnmounted(() => {
  const container = getContainer()
  if (!container) return
  if (handleMove) container.removeEventListener('mousemove', handleMove)
  if (handleLeave) container.removeEventListener('mouseleave', handleLeave)
})

onMounted(async () => {
  await nextTick()

  const container = getContainer()
  if (!container) return

  const chars = charRefs.value
  if (!chars.length) return

  // Initialize font variation CSS variables
  for (const el of chars) {
    el.style.setProperty('--vp-wght', String(fromVars.wght))
    el.style.setProperty('--vp-opsz', String(fromVars.opsz))
    el.style.fontVariationSettings = `'wght' var(--vp-wght), 'opsz' var(--vp-opsz)`
  }

  // Define handlers (after variables are ready)
  handleMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    for (const el of chars) {
      const charRect = el.getBoundingClientRect()
      const cx = charRect.left - rect.left + charRect.width / 2
      const cy = charRect.top - rect.top + charRect.height / 2
      const dist = Math.hypot(mouseX - cx, mouseY - cy)
      const t = Math.min(dist / props.radius, 1)
      const weight = toVars.wght - (toVars.wght - fromVars.wght) * t
      const opsz = toVars.opsz - (toVars.opsz - fromVars.opsz) * t

      animate(el, { '--vp-wght': weight, '--vp-opsz': opsz }, { duration: 0.25 })
    }
  }

  handleLeave = () => {
    for (const el of chars) {
      animate(
        el,
        { '--vp-wght': fromVars.wght, '--vp-opsz': fromVars.opsz },
        { duration: 0.35 },
      )
    }
  }

  // ✅ Attach after handlers are defined
  container.addEventListener('mousemove', handleMove)
  container.addEventListener('mouseleave', handleLeave)
})
</script>

<template>
  <div
    ref="internalContainerRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <span
      v-for="(char, i) in label.split('')"
      :key="i"
      ref="charRefs"
      :class="ui.char({ class: uiProps.ui?.char })"
      style="display: inline-block; will-change: font-variation-settings, transform;"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </span>
  </div>
</template>
