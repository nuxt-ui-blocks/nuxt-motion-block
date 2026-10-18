<template>
  <div class="space-y-12">
    <UPageHeader
      title="SpringScaleIn"
      description="Words pop in with an overshoot. Translated from smoothui's spring-scale-in."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each word fades up from <code class="font-mono">0.7</code> scale and lands slightly past
        its resting size before easing back — that overshoot is the whole character of the effect.
        The component is named for a spring but the transition is a hand-tuned
        back-out curve, <code class="font-mono">(0.34, 1.56, 0.64, 1)</code>.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
        <UButton
          :label="`triggerOnView: ${triggerOnView}`"
          icon="i-lucide-eye"
          variant="outline"
          data-testid="toggle-trigger"
          @click="toggleTrigger()"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MSpringScaleIn
          :key="replayKey"
          :delay="delay"
          class="text-3xl font-bold"
          :stagger="stagger"
          :text="headline"
          :trigger-on-view="triggerOnView"
          data-testid="basic"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delay"
        >
          {{ delay }}ms
        </dd>
        <dt class="text-muted">
          stagger
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stagger"
        >
          {{ stagger }}ms
        </dd>
        <dt class="text-muted">
          words
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ wordCount }}
        </dd>
        <dt class="text-muted">
          distinct scales on screen
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-distinct"
        >
          {{ readouts.distinct }}
        </dd>
        <dt class="text-muted">
          leading word scale
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-leading"
        >
          {{ readouts.leading }}
        </dd>
        <dt class="text-muted">
          peak scale seen
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-peak"
        >
          {{ readouts.peak }}
        </dd>
        <dt class="text-muted">
          overshoot
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-overshoot"
        >
          {{ readouts.overshoot }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="delay (ms)"
        :max="1000"
        :min="0"
        :step="10"
      >
        <USlider
          v-model="delay"
          :max="1000"
          :min="0"
          :step="10"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="stagger (ms)"
        :max="300"
        :min="0"
        :step="5"
      >
        <USlider
          v-model="stagger"
          :max="300"
          :min="0"
          :step="5"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Stagger options
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        At the <code class="font-mono">95ms</code> default a four-word phrase takes about
        <code class="font-mono">285ms</code> to hand over, which reads as one gesture. Push the
        stagger up and the overshoot of each word becomes individually legible — which is the
        difference between a pop and a stutter.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="option in staggerOptions"
          :key="option.stagger"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ option.label }}
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MSpringScaleIn
              :key="`opt-${option.stagger}-${replayKey}`"
              class="text-2xl font-bold"
              :stagger="option.stagger"
              :text="optionText"
              :data-testid="`pair-${option.stagger}`"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Environment
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          prefers-reduced-motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduced"
        >
          {{ readouts.reduced }}
        </dd>
        <dt class="text-muted">
          aria-label on root
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-aria"
        >
          {{ readouts.aria }}
        </dd>
        <dt class="text-muted">
          aria-hidden children
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-hidden"
        >
          {{ readouts.hidden }}
        </dd>
        <dt class="text-muted">
          filters on words
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-filter"
        >
          {{ readouts.filter }}
        </dd>
        <dt class="text-muted">
          start state
        </dt>
        <dd class="font-mono">
          opacity 0 · scale 0.7
        </dd>
        <dt class="text-muted">
          duration / ease
        </dt>
        <dd class="font-mono">
          0.36s · (0.34, 1.56, 0.64, 1)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Words pop with weight'
const optionText = 'Pop'

const delay = ref(0)
const stagger = ref(95)
const triggerOnView = ref(false)
const replayKey = ref(0)

const staggerOptions = [
  { label: 'stagger 0ms — simultaneous', stagger: 0 },
  { label: 'stagger 95ms — the default', stagger: 95 },
  { label: 'stagger 220ms — one at a time', stagger: 220 },
]

const wordCount = computed(() => headline.split(' ').length)

function replay() {
  replayKey.value++
}

function toggleTrigger() {
  triggerOnView.value = !triggerOnView.value
}

const readouts = ref({
  aria: 'pending',
  distinct: 'pending',
  filter: 'pending',
  hidden: 'pending',
  leading: 'pending',
  overshoot: 'pending',
  peak: 'pending',
  reduced: 'pending',
})

// Tracks the highest scale seen across the whole run. The curve peaks at roughly
// 1.11 and then settles at exactly 1, so anything above 1 is overshoot and
// anything below is still travelling in.
let peakScale = 0

// Handle for the sampling loop started in `onMounted`. Kept at module scope so
// `onBeforeUnmount` can cancel it; otherwise the loop outlives the page and
// keeps querying a detached root.
let frame = 0

/**
 * Reads the uniform scale out of a computed transform. This effect animates
 * scale only, so the matrix's first slot is the scale factor.
 */
function scaleOf(element: HTMLElement) {
  const transform = getComputedStyle(element).transform

  if (transform === 'none') {
    return 1
  }

  const matrix = transform.match(/matrix\(([^)]+)\)/)

  if (!matrix) {
    return 1
  }

  return Number.parseFloat(matrix[1].split(',')[0] ?? '1')
}

/**
 * Samples the root's children on every frame. The lookup happens inside the
 * callback because `replayKey` remounts the subtree, so a node captured in a
 * closure would be detached and every computed style would come back empty.
 *
 * Every other child is the inter-word space, so only the odd indices are
 * animated words.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const children = root ? Array.from(root.children) as HTMLElement[] : []

  if (children.length === 0) {
    return
  }

  const words = children.filter((_element, index) => index % 2 === 0)

  if (words.length === 0) {
    return
  }

  const scales = words.map(scaleOf)
  const settled = scales.every(scale => Math.abs(scale - 1) < 0.005)

  let bestIndex = 0
  for (let i = 1; i < scales.length; i++) {
    if (Math.abs(scales[i] - 1) < Math.abs(scales[bestIndex] - 1)) {
      bestIndex = i
    }
  }

  for (const scale of scales) {
    if (scale > peakScale) {
      peakScale = scale
    }
  }

  readouts.value = {
    aria: root?.getAttribute('aria-label') ?? 'missing',
    distinct: String(new Set(scales).size),
    filter: getComputedStyle(words[0]!).filter,
    hidden: String(children.filter(el => el.getAttribute('aria-hidden') === 'true').length),
    leading: `word ${bestIndex + 1} at ${scales[bestIndex]?.toFixed(3)}`,
    overshoot: peakScale > 1.001 ? `yes — peaked at ${peakScale.toFixed(3)}` : 'not observed yet',
    peak: peakScale.toFixed(3),
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
  }

  // Reset once everything has come to rest so the next replay starts from a
  // clean high-water mark.
  if (settled && peakScale > 1) {
    peakScale = 1
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
