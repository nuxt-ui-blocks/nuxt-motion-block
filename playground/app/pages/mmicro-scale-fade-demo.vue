<template>
  <div class="space-y-12">
    <UPageHeader
      title="MicroScaleFade"
      description="A whole string fades in while easing up from 96% scale. One element, no per-character split — the scale is small enough to read as a settle rather than a zoom."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The text is a single animated element, so every character is always at the same point in the
        animation. Use it for a headline or a single stat where a per-character reveal would be
        busy rather than precise.
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

      <div class="mb-8 grid min-h-32 place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MMicroScaleFade
          :key="replayKey"
          :delay="delay"
          class="text-4xl font-bold sm:text-5xl"
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
          animated elements
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ readouts.count }}
        </dd>
        <dt class="text-muted">
          scale
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-scale"
        >
          {{ readouts.scale }}
        </dd>
        <dt class="text-muted">
          opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-opacity"
        >
          {{ readouts.opacity }}
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
          aria-hidden children
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-hidden"
        >
          {{ readouts.hidden }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="delay (ms)"
        :max="1500"
        :min="0"
        :step="10"
      >
        <USlider
          v-model="delay"
          :max="1500"
          :min="0"
          :step="10"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Whole block vs per character
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The same string twice. <code class="font-mono">MMicroScaleFade</code> keeps every character
        in lockstep as one element; <code class="font-mono">MBottomUpLetters</code> splits the
        string and staggers it, so its offsets are visibly distinct mid-flight. Settled, the two are
        visually identical.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            micro-scale-fade (1 element)
          </p>
          <div class="grid min-h-24 place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MMicroScaleFade
              :key="`micro-${replayKey}`"
              class="text-3xl font-bold"
              :text="pairText"
              data-testid="pair-micro"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            bottom-up letters ({{ pairText.length }} elements)
          </p>
          <div class="grid min-h-24 place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MBottomUpLetters
              :key="`chars-${replayKey}`"
              class="text-3xl font-bold"
              :text="pairText"
              data-testid="pair-chars"
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
          start state
        </dt>
        <dd class="font-mono">
          opacity 0 · scale 0.96
        </dd>
        <dt class="text-muted">
          duration / ease
        </dt>
        <dd class="font-mono">
          0.6s · (0.32, 0.72, 0, 1)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Calm focus'
const pairText = 'One block'

const delay = ref(0)
const triggerOnView = ref(false)
const replayKey = ref(0)

const readouts = ref({
  aria: 'pending',
  count: 'pending',
  distinct: 'pending',
  hidden: 'pending',
  opacity: 'pending',
  reduced: 'pending',
  scale: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

function toggleTrigger() {
  triggerOnView.value = !triggerOnView.value
}

/**
 * Uniform scale lives in the first matrix slot. `scale()` alone would only be
 * readable while the browser keeps the shorthand, so parse the matrix instead.
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
 * Samples the single animated span on every frame. Re-queried inside the
 * callback because `replayKey` remounts the subtree and would leave a captured
 * node detached with empty computed styles.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const children = root ? Array.from(root.children) as HTMLElement[] : []

  if (children.length === 0) {
    return
  }

  const target = children[0]!
  const style = getComputedStyle(target)
  const scale = scaleOf(target)

  // The comparison card is what proves this component never splits the string:
  // one element carries the whole string, so there is nothing to stagger.
  const pairMicro = document.querySelector('[data-testid="pair-micro"]')
  const pairChars = document.querySelector('[data-testid="pair-chars"]')
  const microChildren = pairMicro ? pairMicro.children.length : 0
  const charChildren = pairChars ? pairChars.children.length : 0

  readouts.value = {
    aria: root?.getAttribute('aria-label') ?? 'missing',
    count: String(children.length),
    distinct: `${microChildren} element vs ${charChildren} elements`,
    hidden: String(children.filter(el => el.getAttribute('aria-hidden') === 'true').length),
    opacity: `${Number.parseFloat(style.opacity).toFixed(3)}`,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
    scale: scale.toFixed(4),
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
