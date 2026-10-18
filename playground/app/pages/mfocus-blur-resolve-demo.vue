<template>
  <div class="space-y-12">
    <UPageHeader
      title="FocusBlurResolve"
      description="Waits for focus, then resolves a soft blur with a tiny lift to snap the text into sharpness."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Ramps <code class="font-mono">filter: blur(14px) → blur(0px)</code>, <code class="font-mono">opacity 0→1</code>, <code class="font-mono">scale 1.01→1</code>, <code class="font-mono">y 14px→0</code>
        using the cubic-bezier <code class="font-mono">[0.22,1,0.36,1]</code> over <code class="font-mono">0.76s</code>. The wrapper carries a single <code class="font-mono">aria-label</code>, the animated span is <code class="font-mono">aria-hidden</code>.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MFocusBlurResolve
          :key="replayKey"
          :text="headline"
          :trigger-on-view="triggerOnView"
          :delay="delayMs"
          class="text-4xl font-bold sm:text-5xl"
          data-testid="basic"
        />
      </div>

      <div class="mb-6 flex flex-wrap items-center gap-3">
        <UButton
          :variant="triggerOnView ? 'solid' : 'outline'"
          data-testid="toggle-trigger"
          @click="triggerOnView = !triggerOnView"
        >
          {{ triggerOnView ? 'triggerOnView: true' : 'triggerOnView: false' }}
        </UButton>
        <UButton
          data-testid="replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          @click="replay()"
        >
          Replay
        </UButton>
      </div>

      <UFormField
        class="mb-4 max-w-sm"
        :hint="`${delayMs}ms delay before resolve`"
        label="delay (ms)"
      >
        <USlider
          v-model="delayMs"
          :max="1000"
          :min="0"
          :step="10"
        />
      </UFormField>

      <dl class="mt-6 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        <div class="rounded-lg border border-default bg-default/60 px-3 py-2">
          <dt class="text-muted">
            duration
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-duration"
          >
            {{ durationSec }}s
          </dd>
        </div>
        <div class="rounded-lg border border-default bg-default/60 px-3 py-2">
          <dt class="text-muted">
            delay
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-delay"
          >
            {{ (delayMs / 1000).toFixed(2) }}s
          </dd>
        </div>
        <div class="rounded-lg border border-default bg-default/60 px-3 py-2">
          <dt class="text-muted">
            triggerOnView
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-trigger"
          >
            {{ triggerOnView }}
          </dd>
        </div>
        <div class="rounded-lg border border-default bg-default/60 px-3 py-2">
          <dt class="text-muted">
            reducedMotion
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-reduced"
          >
            {{ readouts.reducedMotion }}
          </dd>
        </div>
        <div class="rounded-lg border border-default bg-default/60 px-3 py-2">
          <dt class="text-muted">
            filter
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-filter"
          >
            {{ readouts.filter }}
          </dd>
        </div>
        <div class="rounded-lg border border-default bg-default/60 px-3 py-2">
          <dt class="text-muted">
            opacity
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-opacity"
          >
            {{ readouts.opacity }}
          </dd>
        </div>
        <div class="rounded-lg border border-default bg-default/60 px-3 py-2">
          <dt class="text-muted">
            transform
          </dt>
          <dd
            class="truncate font-mono"
            data-testid="readout-transform"
          >
            {{ readouts.transform }}
          </dd>
        </div>
        <div class="rounded-lg border border-default bg-default/60 px-3 py-2">
          <dt class="text-muted">
            willChange
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-willchange"
          >
            {{ readouts.willChange }}
          </dd>
        </div>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Variants
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Resolve runs independently per instance. In <code class="font-mono">triggerOnView</code> mode the animation starts at the hidden state when the wrapper enters the viewport (once). Reduced motion jumps straight to the resolved state with <code class="font-mono">filter: blur(0px)</code> and <code class="font-mono">opacity: 1</code>.
      </p>

      <div class="grid gap-8 sm:grid-cols-2">
        <div class="flex flex-col items-center justify-center rounded-2xl bg-(--ui-bg-muted) px-6 py-12">
          <MFocusBlurResolve
            data-testid="variant-small"
            text="Small lift"
            class="text-xl font-semibold"
          />
        </div>
        <div class="flex flex-col items-center justify-center rounded-2xl bg-(--ui-bg-muted) px-6 py-12">
          <MFocusBlurResolve
            data-testid="variant-large"
            text="Larger headline"
            class="text-5xl font-bold"
            :delay="120"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Focus. Blur. Resolve.'
const triggerOnView = ref(false)
const delayMs = ref(0)
// Mirrors FOCUS_BLUR_DURATION_S. Kept as a literal rather than imported across
// the package boundary so the demo's vue-tsc pass does not depend on a relative
// path out of the playground.
const durationSec = ref(0.76)
const replayKey = ref(0)

const readouts = ref({
  filter: 'pending',
  opacity: 'pending',
  reducedMotion: 'pending',
  transform: 'pending',
  willChange: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

function sample() {
  // The animated values live on the inner Motion span, not the wrapper that
  // carries the test id, so reading the wrapper would always report the
  // wrapper's own (static) styles and make these readouts meaningless.
  const wrapper = document.querySelector('[data-testid="basic"]')
  const el = wrapper?.firstElementChild as HTMLElement | null
  if (el) {
    const cs = getComputedStyle(el)
    readouts.value.filter = cs.filter || 'none'
    readouts.value.opacity = cs.opacity || '1'
    readouts.value.transform = cs.transform === 'none' ? 'none' : cs.transform
    readouts.value.willChange = cs.willChange || 'auto'
  }
  readouts.value.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'true' : 'false'
  frame = requestAnimationFrame(sample)
}

onMounted(() => {
  frame = requestAnimationFrame(sample)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
})
</script>
