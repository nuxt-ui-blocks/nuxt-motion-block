<template>
  <div class="space-y-12">
    <UPageHeader
      title="WaveText"
      description="Each character rides the same vertical loop with a per-character delay, so the text ripples."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">amplitude</code> is the peak travel in px, <code class="font-mono">duration</code> is one full cycle, and <code class="font-mono">staggerDelay</code> is the extra delay per character. The stagger is the entire effect — set it to zero and every letter moves in lockstep, which reads as a bounce rather than a wave.
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
        <MWaveText
          :key="replayKey"
          :amplitude="amplitude"
          class="text-4xl font-bold sm:text-5xl"
          :duration="duration"
          :stagger-delay="staggerDelay"
          :text="headline"
          data-testid="basic"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          amplitude
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-amplitude"
        >
          {{ amplitude }}px
        </dd>
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
          staggerDelay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stagger"
        >
          {{ staggerDelay }}s
        </dd>
        <dt class="text-muted">
          first char transform
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-transform"
        >
          {{ readouts.transform }}
        </dd>
        <dt class="text-muted">
          distinct offsets
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-distinct"
        >
          {{ readouts.distinct }}
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
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Timing
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        A slow <code class="font-mono">duration</code> with a tight <code class="font-mono">staggerDelay</code> gives a long, gentle ripple; a fast duration with a wide stagger turns the same word into a travelling pulse. Because every character loops forever, both settle into a steady rhythm once the per-character offsets have spread out.
      </p>

      <div class="mb-8 grid gap-6 sm:grid-cols-3">
        <UFormField
          label="amplitude"
          :hint="`${amplitude}px`"
        >
          <USlider
            v-model="amplitude"
            :min="0"
            :max="24"
            :step="1"
          />
        </UFormField>
        <UFormField
          label="duration"
          :hint="`${duration.toFixed(2)}s per cycle`"
        >
          <USlider
            v-model="duration"
            :min="0.4"
            :max="4"
            :step="0.05"
          />
        </UFormField>
        <UFormField
          label="staggerDelay"
          :hint="`${staggerDelay.toFixed(3)}s per char`"
        >
          <USlider
            v-model="staggerDelay"
            :min="0"
            :max="0.2"
            :step="0.005"
          />
        </UFormField>
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MWaveText
          :amplitude="amplitude"
          class="text-3xl font-bold"
          :duration="duration"
          :stagger-delay="staggerDelay"
          text="Ripple through the line"
          data-testid="timing"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Amplitude
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Amplitude is measured in px rather than em, so the travel does not grow with the font size. On large headlines that keeps the motion restrained; on small text a value that looks subtle at the top of this page will look almost static, so tune per size.
      </p>

      <div class="grid gap-4">
        <div
          v-for="option in amplitudePresets"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8"
        >
          <MWaveText
            :amplitude="option"
            :duration="duration"
            class="text-3xl font-bold"
            :stagger-delay="staggerDelay"
            text="Wave"
            :data-testid="`amplitude-${option}`"
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
        The wave is a transform on inline-block spans, so it stays on the compositor and costs nothing per frame regardless of how many characters are on screen. Keep the character count reasonable anyway: each character is its own animated element.
      </p>

      <div class="grid gap-4">
        <div
          v-for="option in sizes"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8"
        >
          <MWaveText
            :amplitude="amplitude"
            :class="`font-bold ${option}`"
            :duration="duration"
            :stagger-delay="staggerDelay"
            text="Rolling"
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
        Under <code class="font-mono">prefers-reduced-motion: reduce</code> every character holds at <code class="font-mono">y: 0</code> with a zero-length transition. The text is identical to the resting frame of the animation, so nothing shifts position when the preference is toggled — it simply stops moving.
      </p>

      <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <dt class="text-muted">
          prefers-reduced-motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduced-env"
        >
          {{ readouts.reduced }}
        </dd>
        <dt class="text-muted">
          animation target
        </dt>
        <dd
          class="font-mono text-muted"
          data-testid="readout-target"
        >
          {{ readouts.target }}
        </dd>
        <dt class="text-muted">
          paint cost
        </dt>
        <dd
          class="text-muted"
          data-testid="readout-cost"
        >
          transform-only, so the wave runs on the compositor
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Wave on'

const amplitudePresets = [4, 8, 16]
const sizes = ['text-xl', 'text-3xl', 'text-5xl', 'text-6xl']

const amplitude = ref(8)
const duration = ref(1.2)
const staggerDelay = ref(0.05)
const replayKey = ref(0)

const readouts = ref({
  distinct: 'pending',
  reduced: 'pending',
  target: 'pending',
  transform: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

/**
 * Reads the live transforms off the character spans. `distinct` counts how many
 * different translate offsets are on screen at once: a wave spread by the
 * stagger produces many, while a reduced-motion or zero-stagger render collapses
 * to one.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const chars = root ? Array.from(root.children) as HTMLElement[] : []
  const transforms = chars.map(el => getComputedStyle(el).transform)

  readouts.value = {
    distinct: String(new Set(transforms).size),
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
    target: `y: [0, ${-amplitude.value}, 0, ${amplitude.value * 0.5}, 0]`,
    transform: chars[0] ? (getComputedStyle(chars[0]).transform || 'none') : 'none',
  }
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
