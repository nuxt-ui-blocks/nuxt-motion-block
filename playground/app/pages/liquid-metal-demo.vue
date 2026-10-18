<template>
  <div class="space-y-12">
    <UPageHeader
      title="LiquidMetal"
      description="A domain-warped noise field read as a normal, then lit."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Surface
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The shader never draws a shape. It builds an fBm height field, samples it three times to get a
        gradient, treats that gradient as a surface normal, and lights it with one key light plus a Fresnel
        rim. Chrome, gold, mercury and oil are the same field with a different (low, high, tint) triple —
        which is why switching them is a uniform write rather than a recompile.
      </p>

      <div class="mb-8 flex flex-wrap items-center gap-2">
        <UButton
          label="Pause"
          icon="i-lucide-pause"
          variant="outline"
          data-testid="pause"
          @click="paused = !paused"
        />
        <UButton
          label="Resume"
          icon="i-lucide-play"
          variant="outline"
          data-testid="resume"
          @click="paused = false"
        />
        <UButton
          label="Toggle pointer"
          icon="i-lucide-mouse-pointer"
          variant="outline"
          data-testid="pointer"
          @click="pointerInfluence = !pointerInfluence"
        />
      </div>

      <div class="mb-8 rounded-2xl bg-(--ui-bg-muted) p-6">
        <MLiquidMetal
          :distortion="distortion"
          :paused="paused"
          :pointer-influence="pointerInfluence"
          :speed="speed"
          :variant="variant"
          class="h-72"
          data-testid="metal"
        >
          <div class="grid h-full place-items-center">
            <p class="text-sm font-semibold text-black/45 dark:text-white/45">
              Move the pointer across the surface
            </p>
          </div>
        </MLiquidMetal>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          context
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-context"
        >
          {{ readouts.context }}
        </dd>
        <dt class="text-muted">
          drawing buffer
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-buffer"
        >
          {{ readouts.buffer }}
        </dd>
        <dt class="text-muted">
          variant
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant"
        >
          {{ variant }}
        </dd>
        <dt class="text-muted">
          paused
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-paused"
        >
          {{ paused }}
        </dd>
        <dt class="text-muted">
          prefers-reduced-motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduced"
        >
          {{ readouts.reduced }}
        </dd>
      </dl>

      <div class="mt-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="distortion"
          :max="3"
          :min="0"
          :step="0.05"
        >
          <USlider
            v-model="distortion"
            :max="3"
            :min="0"
            :step="0.05"
          />
        </UFormField>
        <UFormField
          label="speed"
          :max="4"
          :min="0"
          :step="0.1"
        >
          <USlider
            v-model="speed"
            :max="4"
            :min="0"
            :step="0.1"
          />
        </UFormField>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Variants
        </p>
      </template>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="option in variantOptions"
          :key="option"
          class="space-y-2"
        >
          <UButton
            :label="option"
            :variant="option === variant ? 'solid' : 'outline'"
            class="w-full justify-start"
            :data-testid="`pick-${option}`"
            @click="variant = option"
          />
          <MLiquidMetal
            class="h-36 rounded-2xl"
            :distortion="distortion"
            :speed="speed"
            :variant="option"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Masked text
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">maskText</code> the component stops trying to render metal and becomes a
        CSS gradient clipped to the glyph shapes. The shader cannot do this — it has no access to the text's
        outline — so this path is a genuinely different technique rather than a cheaper version of the same
        one. A conic gradient would be wrong here: the sweep has to run along the text's own axis, or it
        reads as a disc rotating behind the letters.
      </p>

      <div class="rounded-2xl bg-(--ui-bg-muted) p-8 text-center">
        <MLiquidMetal
          class="text-5xl font-black tracking-tight"
          :paused="paused"
          :speed="speed"
          :variant="variant"
          mask-text
        >
          LIQUID
        </MLiquidMetal>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          When the shader is not there
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        This surface needs WebGL2 — it uses an explicit output variable and
        <code class="font-mono">#version 300 es</code>, which WebGL1 cannot compile. Where WebGL2 is missing, or
        where the visitor prefers reduced motion, the component renders a static conic gradient in the same
        palette. Not the same material, but the same colour language, so a layout built around it still reads
        correctly.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Listed literally rather than imported from the component's constants: the
// playground depends on the package the same way a consumer would, so reaching
// into `src/` would prove nothing about the published surface.
const variantOptions = ['chrome', 'gold', 'mercury', 'oil'] as const

const variant = ref<(typeof variantOptions)[number]>('chrome')
const distortion = ref(1)
const speed = ref(1)
const paused = ref(false)
const pointerInfluence = ref(true)

const readouts = ref({
  buffer: 'pending',
  context: 'pending',
  reduced: 'pending',
})

/**
 * Samples the live canvas each frame.
 *
 * The context type is read back off the canvas rather than reported by the
 * component, so this confirms the browser actually granted one instead of trusting
 * the component's own flag. `getContext` returns the existing context when called
 * again with the same type, so probing does not allocate a second one.
 */
function sample() {
  const element = document.querySelector('[data-testid="metal"]')
  const canvas = element?.querySelector('canvas') ?? null

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'reduce'
    : 'no-preference'

  if (!(canvas instanceof HTMLCanvasElement)) {
    // Every field is written, not just `context`: an early return that leaves the
    // others at `pending` makes them read as if the sampler never ran.
    readouts.value = { buffer: 'none', context: 'no canvas — fallback surface', reduced }
    return
  }

  const context = canvas.getContext('webgl2')
  readouts.value = {
    buffer: `${canvas.width}x${canvas.height}`,
    context: context ? 'webgl2' : 'none — fallback surface',
    reduced,
  }
}

let frame = 0

onMounted(() => {
  const tick = () => {
    sample()
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
})
</script>
