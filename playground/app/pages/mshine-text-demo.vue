<template>
  <div class="space-y-12">
    <UPageHeader
      title="ShineText"
      description="A highlight that sweeps across text. The glyphs are filled with a wide gradient and the gradient is slid behind them, so the shine is the text's own paint rather than an overlay."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">duration</code> is the time for one sweep and
        <code class="font-mono">repeatDelay</code> is the rest between them. The pause is what separates "light passing over a surface" from "a loading spinner made of letters" — drop it to zero and the effect turns into a progress indicator.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div
        class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14"
      >
        <MShineText
          :key="replayKey"
          :base-color="baseColor"
          :class="`text-4xl font-bold sm:text-5xl`"
          :duration="duration"
          :repeat-delay="repeatDelay"
          :shine-color="shineColor"
          :text="headline"
          data-testid="basic"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          {{ duration }}s
        </dd>
        <dt class="text-muted">
          repeatDelay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delay"
        >
          {{ repeatDelay }}s
        </dd>
        <dt class="text-muted">
          background-position-x
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-position"
        >
          {{ readouts.position }}
        </dd>
        <dt class="text-muted">
          painting
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-painting"
        >
          {{ readouts.painting }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Speed
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The sweep is <code class="font-mono">backgroundPositionX</code> going from <code class="font-mono">150%</code> to <code class="font-mono">-150%</code>, past both edges of a <code class="font-mono">250%</code>-wide gradient. Because that is a paint-bound property rather than a transform, this repaints the text every frame — keep the glyph count modest and the duration above about a second.
      </p>

      <div class="mb-8 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="duration"
          :hint="`${duration.toFixed(2)}s per sweep`"
        >
          <USlider
            v-model="duration"
            :min="0.4"
            :max="6"
            :step="0.05"
          />
        </UFormField>
        <UFormField
          label="repeatDelay"
          :hint="`${repeatDelay.toFixed(2)}s at rest`"
        >
          <USlider
            v-model="repeatDelay"
            :min="0"
            :max="3"
            :step="0.05"
          />
        </UFormField>
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MShineText
          :base-color="baseColor"
          class="text-3xl font-bold"
          :duration="duration"
          :repeat-delay="repeatDelay"
          :shine-color="shineColor"
          text="Slow is smooth, smooth is fast"
          data-testid="speed"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Colours
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The gradient is a single <code class="font-mono">linear-gradient</code> at <code class="font-mono">110deg</code> with stops at <code class="font-mono">40%</code>, <code class="font-mono">50%</code> and <code class="font-mono">60%</code>. Only the middle stop is the shine, which is what keeps the band narrow instead of washing the whole word.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="preset in presets"
          :key="preset.label"
          :label="preset.label"
          :variant="preset.label === activePreset ? 'solid' : 'outline'"
          :data-testid="`preset-${preset.label}`"
          @click="applyPreset(preset)"
        />
      </div>

      <div class="grid gap-4">
        <div
          v-for="preset in presets"
          :key="`${preset.label}-row`"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10"
        >
          <MShineText
            :base-color="preset.base"
            class="text-3xl font-bold"
            :duration="duration"
            :repeat-delay="repeatDelay"
            :shine-color="preset.shine"
            :text="preset.label"
            :data-testid="`swatch-${preset.label}`"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sizes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The effect is resolution-independent: it is a background gradient clipped to glyphs, so it scales with the font size and needs no per-size tuning.
      </p>

      <div class="grid gap-4">
        <div
          v-for="option in sizes"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8"
        >
          <MShineText
            :base-color="baseColor"
            :class="`font-bold ${option}`"
            :duration="duration"
            :repeat-delay="repeatDelay"
            :shine-color="shineColor"
            text="Polished"
            :data-testid="`size-${option}`"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Environment
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Under <code class="font-mono">prefers-reduced-motion: reduce</code> the component stops animating <em>and</em> drops the gradient, painting with a plain <code class="font-mono">color</code> instead. Freezing the gradient would usually look identical, but a frozen <code class="font-mono">color: transparent</code> fill is invisible anywhere <code class="font-mono">background-clip: text</code> is unsupported — so the static variant never relies on the clip at all.
      </p>

      <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <dt class="text-muted">
          prefers-reduced-motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduced"
        >
          {{ readouts.reducedMotion }}
        </dd>
        <dt class="text-muted">
          gradient applied
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-gradient"
        >
          {{ readouts.gradient }}
        </dd>
        <dt class="text-muted">
          text colour
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-color"
        >
          {{ readouts.color }}
        </dd>
        <dt class="text-muted">
          paint cost
        </dt>
        <dd
          class="text-muted"
          data-testid="readout-cost"
        >
          background-position is not compositor-only, so every frame repaints
          the text
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface ShinePreset {
  base: string
  label: string
  shine: string
}

const presets: ShinePreset[] = [
  { label: 'Silver', base: '#94a3b8', shine: '#f8fafc' },
  { label: 'Gold', base: '#b45309', shine: '#fde68a' },
  { label: 'Mint', base: '#0f766e', shine: '#a7f3d0' },
  { label: 'Rose', base: '#9f1239', shine: '#fecdd3' },
  { label: 'Ink', base: 'var(--ui-text-dimmed)', shine: 'var(--ui-text-highlighted)' },
]

const sizes = ['text-xl', 'text-3xl', 'text-5xl', 'text-6xl']

const headline = 'Shine on'

const baseColor = ref('var(--ui-text-muted)')
const shineColor = ref('var(--ui-text)')
const duration = ref(2.5)
const repeatDelay = ref(0.6)
const activePreset = ref('Silver')
const replayKey = ref(0)

const readouts = ref({
  color: 'pending',
  gradient: 'pending',
  painting: 'pending',
  position: 'pending',
  reducedMotion: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

/** Reads the live inline/computed paint off the rendered span. */
function sample() {
  const el = document.querySelector<HTMLElement>('[data-testid="basic"]')
  if (!el) {
    return
  }

  const styles = getComputedStyle(el)
  readouts.value = {
    color: styles.color,
    gradient: styles.backgroundImage === 'none' ? 'no' : 'yes',
    painting: styles.backgroundClip,
    position: styles.backgroundPositionX || 'unset',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
  }
}

function applyPreset(preset: ShinePreset) {
  activePreset.value = preset.label
  baseColor.value = preset.base
  shineColor.value = preset.shine
}

onMounted(() => {
  const tick = () => {
    sample()
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>
