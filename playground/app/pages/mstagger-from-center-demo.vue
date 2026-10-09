<template>
  <div class="space-y-12">
    <UPageHeader
      title="StaggerFromCenter"
      description="Characters resolve outward from the middle of the string, each one offset by its distance from the center. Translated from smoothui's stagger-from-center."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every character starts blurred, faded and pushed down, then resolves. The delay is scaled by each character's distance from the middle of the string, so the center lands first and the resolve spreads out to the edges. <code class="font-mono">delay</code> and <code class="font-mono">stagger</code> are both in milliseconds.
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
        <MStaggerFromCenter
          :key="replayKey"
          :delay="delay"
          class="text-4xl font-bold sm:text-5xl"
          :stagger="stagger"
          :text="headline"
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
          resolve order
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-order"
        >
          {{ readouts.order }}
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
        A large <code class="font-mono">stagger</code> makes the outward resolve obvious; a small one collapses everything toward a single simultaneous fade. <code class="font-mono">delay</code> shifts the whole sequence without changing its shape.
      </p>

      <div class="mb-8 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="delay"
          :hint="`${delay}ms`"
        >
          <USlider
            v-model="delay"
            :min="0"
            :max="400"
            :step="10"
          />
        </UFormField>
        <UFormField
          label="stagger"
          :hint="`${stagger}ms per step`"
        >
          <USlider
            v-model="stagger"
            :min="0"
            :max="80"
            :step="1"
          />
        </UFormField>
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MStaggerFromCenter
          :delay="delay"
          class="text-3xl font-bold"
          :stagger="stagger"
          text="Center outward"
          data-testid="timing"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Trigger on view
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">triggerOnView</code> the characters hold at the hidden state until the wrapper scrolls into view, then resolve once. Toggle it on and scroll the sample to replay.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="triggerOnView ? 'triggerOnView: on' : 'triggerOnView: off'"
          :icon="triggerOnView ? 'i-lucide-eye' : 'i-lucide-eye-off'"
          variant="outline"
          data-testid="toggle-trigger"
          @click="toggleTrigger()"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-24">
        <MStaggerFromCenter
          :delay="delay"
          class="text-3xl font-bold"
          :stagger="stagger"
          text="Appears on scroll"
          :trigger-on-view="triggerOnView"
          data-testid="trigger"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sizes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The resolve is a per-character <code class="font-mono">filter</code>, <code class="font-mono">opacity</code> and <code class="font-mono">transform</code>. Blur is the expensive part, so keep it to short strings — each character is its own animated element.
      </p>

      <div class="grid gap-4">
        <div
          v-for="option in sizes"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8"
        >
          <MStaggerFromCenter
            :delay="delay"
            :class="`font-bold ${option}`"
            :stagger="stagger"
            text="Resolve"
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
        Under <code class="font-mono">prefers-reduced-motion: reduce</code> every character commits the resolved state with a zero-length transition, so the text appears immediately at full opacity with no blur and no motion.
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
          blur while animating, compositor transform and opacity
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Center out'
const sizes = ['text-xl', 'text-3xl', 'text-5xl', 'text-6xl']

const delay = ref(0)
const stagger = ref(22)
const triggerOnView = ref(false)
const replayKey = ref(0)

const readouts = ref({
  distinct: 'pending',
  order: 'pending',
  reduced: 'pending',
  target: 'pending',
  transform: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

function toggleTrigger() {
  triggerOnView.value = !triggerOnView.value
}

/**
 * Reads the live resolved styles off the character spans. `distinct` counts how
 * many different translate offsets are on screen at once: the center-scaled
 * stagger produces several while resolving and collapses to one once settled.
 * `order` labels where the middle character sits between the first and last.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const chars = root ? Array.from(root.children) as HTMLElement[] : []
  const transforms = chars.map(el => getComputedStyle(el).transform)
  const centerIndex = Math.floor((chars.length - 1) / 2)

  readouts.value = {
    distinct: String(new Set(transforms).size),
    order: `center is char ${centerIndex + 1} of ${chars.length}`,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
    target: 'filter: blur(0px), opacity: 1, y: 0',
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
