<template>
  <div
    ref="cardRef"
    :style="containerStyle"
    class="relative isolate [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform"
    @pointermove="handlePointerMove"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
  >
    <UCard
      :class="props.class"
      :ui="props.ui"
      class="h-full will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden relative"
    >
      <!-- Background Effects Layer -->
      <div
        class="absolute inset-0 mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity pointer-events-none z-0 [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] after:content-[''] after:absolute after:inset-0 after:mix-blend-exclusion after:[background-size:var(--foil-size),_200%_400%,_800%,_200%] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-blend-mode:soft-light,_hue,_hard-light]"
        :style="backgroundStyle"
      />

      <!-- Glare Layer -->
      <div
        class="absolute inset-0 mix-blend-soft-light opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background pointer-events-none z-10"
        :style="glareStyle"
      />
      <!-- Header Slot -->
      <template
        v-if="$slots.header"
        #header
      >
        <div class="relative z-10">
          <slot name="header" />
        </div>
      </template>

      <!-- Default Slot -->
      <div class="relative z-10">
        <slot>
          <!-- Default content -->
          <div class="text-white space-y-4">
            <UIcon
              name="i-heroicons-sparkles"
              class="w-12 h-12 mx-auto text-blue-400"
            />
            <h3 class="text-2xl font-bold">
              Glare Card
            </h3>
            <p class="text-slate-400">
              Move your cursor to see the effect
            </p>
          </div>
        </slot>
      </div>
      <!-- Footer Slot -->
      <template
        v-if="$slots.footer"
        #footer
      >
        <div class="relative z-10">
          <slot name="footer" />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '#ui/components/Card.vue'
import { ref, computed } from 'vue'

interface Props {
  class?: string
  ui?: CardProps['ui']
  glareColor?: string
  glareColorInner?: string
  glareColorOuter?: string
  // Rainbow customization
  rainbowColors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  glareColor: 'rgba(255,255,255,0.8)',
  glareColorInner: 'rgba(255,255,255,0.65)',
  glareColorOuter: 'rgba(255,255,255,0)',
  rainbowColors: () => [
    'rgb(255,119,115)',
    'rgba(255,237,95,1)',
    'rgba(168,255,95,1)',
    'rgba(131,255,247,1)',
    'rgba(120,148,255,1)',
    'rgb(216,117,255)',
    'rgb(255,119,115)',
  ],
})

// Refs
const cardRef = ref<HTMLElement>()
const isPointerInside = ref(false)

// State
const glareState = ref({
  glare: {
    x: 50,
    y: 50,
  },
  background: {
    x: 50,
    y: 50,
  },
  rotate: {
    x: 0,
    y: 0,
  },
})

// Container styles
const containerStyle = {
  '--m-x': '50%',
  '--m-y': '50%',
  '--r-x': '0deg',
  '--r-y': '0deg',
  '--bg-x': '50%',
  '--bg-y': '50%',
  '--duration': '300ms',
  '--foil-size': '100%',
  '--opacity': '0',
  '--easing': 'ease',
}

// Glare style with customizable colors
const glareStyle = computed(() => ({
  background: `radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), ${props.glareColor} 10%, ${props.glareColorInner} 20%, ${props.glareColorOuter} 90%)`,
}))

// Background styles
const backgroundStyle = computed(() => {
  // Build rainbow gradient with customizable colors
  const rainbowStops = props.rainbowColors.map((color, index) => {
    return `${color} calc(var(--step) * ${index + 1})`
  }).join(', ')

  return {
    '--step': '5%',
    '--foil-svg': `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E")`,
    '--pattern': 'var(--foil-svg) center/100% no-repeat',
    '--rainbow': `repeating-linear-gradient( 0deg,${rainbowStops} ) 0% var(--bg-y)/200% 700% no-repeat`,
    '--diagonal': 'repeating-linear-gradient( 128deg,#0e152e 0%,hsl(180,10%,60%) 3.8%,hsl(180,10%,60%) 4.5%,hsl(180,10%,60%) 5.2%,#0e152e 10%,#0e152e 12% ) var(--bg-x) var(--bg-y)/300% no-repeat',
    '--shade': 'radial-gradient( farthest-corner circle at var(--m-x) var(--m-y),rgba(255,255,255,0.1) 12%,rgba(255,255,255,0.15) 20%,rgba(255,255,255,0.25) 120% ) var(--bg-x) var(--bg-y)/300% no-repeat',
    'backgroundBlendMode': 'hue, hue, hue, overlay',
  }
})

// Update CSS variables
const updateStyles = () => {
  if (cardRef.value) {
    const { background, rotate, glare } = glareState.value
    cardRef.value.style.setProperty('--m-x', `${glare.x}%`)
    cardRef.value.style.setProperty('--m-y', `${glare.y}%`)
    cardRef.value.style.setProperty('--r-x', `${rotate.x}deg`)
    cardRef.value.style.setProperty('--r-y', `${rotate.y}deg`)
    cardRef.value.style.setProperty('--bg-x', `${background.x}%`)
    cardRef.value.style.setProperty('--bg-y', `${background.y}%`)
  }
}

// Event handlers
const handlePointerMove = (event: PointerEvent) => {
  const rotateFactor = 0.4
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const position = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
  const percentage = {
    x: (100 / rect.width) * position.x,
    y: (100 / rect.height) * position.y,
  }
  const delta = {
    x: percentage.x - 50,
    y: percentage.y - 50,
  }

  const { background, rotate, glare } = glareState.value
  background.x = 50 + percentage.x / 4 - 12.5
  background.y = 50 + percentage.y / 3 - 16.67
  rotate.x = -(delta.x / 3.5)
  rotate.y = delta.y / 2
  rotate.x *= rotateFactor
  rotate.y *= rotateFactor
  glare.x = percentage.x
  glare.y = percentage.y

  updateStyles()
}

const handlePointerEnter = () => {
  isPointerInside.value = true
  if (cardRef.value) {
    cardRef.value.style.setProperty('--opacity', '0.6')
    setTimeout(() => {
      if (isPointerInside.value) {
        cardRef.value?.style.setProperty('--duration', '0s')
      }
    }, 300)
  }
}

const handlePointerLeave = () => {
  isPointerInside.value = false
  if (cardRef.value) {
    cardRef.value.style.setProperty('--opacity', '0')
    cardRef.value.style.removeProperty('--duration')
    cardRef.value?.style.setProperty('--r-x', '0deg')
    cardRef.value?.style.setProperty('--r-y', '0deg')
  }
}
</script>
