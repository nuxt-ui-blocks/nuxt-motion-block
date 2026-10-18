<template>
  <div class="space-y-6 p-6">
    <UPageHeader
      title="Depth layers"
      description="Scroll-driven multi-depth parallax with optional pointer tracking."
    />

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Live rig
        </p>
      </template>
      <div class="space-y-4">
        <MParallaxLayers
          class="h-72 rounded-xl border border-default"
          :direction="direction"
          :pointer-parallax="pointerParallax"
          :range="range"
          :layers="layers"
        >
          <template #layer="{ layer }">
            <div
              v-if="layer.id === 'far'"
              class="grid h-full place-items-center bg-#334155"
            >
              <span class="text-sm font-semibold text-white/70">
                far · depth {{ layer.depth }} · blur 6px · opacity 0.5
              </span>
            </div>
            <div
              v-else-if="layer.id === 'mid'"
              class="grid h-full place-items-center bg-#0d9488/70"
            >
              <span class="text-sm font-semibold text-white/90">
                mid · depth {{ layer.depth }} · blur 2px
              </span>
            </div>
            <div
              v-else
              class="grid h-full place-items-center bg-#f59e0b/80"
            >
              <span class="text-sm font-semibold text-white">
                near · depth {{ layer.depth }}
              </span>
            </div>
          </template>
        </MParallaxLayers>

        <p class="text-sm text-muted">
          Scroll the page to drive the rig. On a hover-capable device, move the
          pointer across the box.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Controls
        </p>
      </template>
      <div class="space-y-6">
        <USwitch
          v-model="pointerParallax"
          label="Pointer parallax"
        />

        <USelect
          v-model="direction"
          :items="directionItems"
          label="Direction"
          class="w-40"
        />

        <div class="space-y-2">
          <p class="text-sm font-medium text-muted">
            Range: <code data-demo-range>{{ range }}px</code>
          </p>
          <USlider
            v-model="range"
            :min="0"
            :max="240"
            :step="10"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-muted">
            Layers (nearest depth)
          </p>
          <USlider
            v-model="nearestDepth"
            :min="0"
            :max="2"
            :step="0.1"
            class="w-full"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Environment
        </p>
      </template>
      <div class="space-y-2 text-sm text-muted">
        <p>
          Hover capable:
          <code data-demo-hover-device>{{ hoverCapable ? 'yes' : 'no' }}</code>
        </p>
        <p>
          Reduced motion:
          <code data-demo-reduced-motion>{{ reducedMotion ? 'yes' : 'no' }}</code>
        </p>
        <p>
          Pointer listeners attached:
          <code data-demo-listeners>{{ pointerParallax && hoverCapable && !reducedMotion ? 'yes' : 'no' }}</code>
        </p>
        <p>
          Direction:
          <code data-demo-direction>{{ direction }}</code>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { ParallaxDirection } from '../../../src/runtime/components/ParallaxLayers/types'
import { useReducedMotion } from 'motion-v'

const direction = ref<ParallaxDirection>('vertical')
const pointerParallax = ref(false)
const range = ref(80)
const nearestDepth = ref(1)

const directionItems = [
  { label: 'Vertical', value: 'vertical' },
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Both', value: 'both' },
]

const layers = computed(() => [
  { id: 'far', depth: nearestDepth.value * 0.3, blur: 6, opacity: 0.5 },
  { id: 'mid', depth: nearestDepth.value * 0.7, blur: 2 },
  { id: 'near', depth: nearestDepth.value },
])

const reducedMotion = useReducedMotion()

const hoverCapable = ref(false)
// Created on mount rather than at setup: `matchMedia` does not exist during SSR.
let hoverQuery: MediaQueryList | undefined

function syncHoverCapable() {
  hoverCapable.value = hoverQuery?.matches ?? false
}

onMounted(() => {
  if (typeof window.matchMedia !== 'function') return

  hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  syncHoverCapable()
  hoverQuery.addEventListener('change', syncHoverCapable)
})

onBeforeUnmount(() => {
  hoverQuery?.removeEventListener('change', syncHoverCapable)
})
</script>
