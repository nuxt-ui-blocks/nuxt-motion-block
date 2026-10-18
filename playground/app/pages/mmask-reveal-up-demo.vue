<template>
  <div class="space-y-12">
    <UPageHeader
      title="MaskRevealUp"
      description="Lines rise out of their own clipping box."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every line sits inside its own <code class="font-mono">overflow: hidden</code> box, so the
        line slides up from 30px below and is clipped by the box rather than sliding over the
        lines beneath it. The blur is what sells it — without the clip, a blurred line ghosting over
        its neighbour is just a slow fade.
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
        <MMaskRevealUp
          :key="replayKey"
          class="text-center text-2xl font-bold"
          :delay="delay"
          :stagger="stagger"
          :text="statement"
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
          lines
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ lineCount }}
        </dd>
        <dt class="text-muted">
          distinct offsets on screen
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-distinct"
        >
          {{ readouts.distinct }}
        </dd>
        <dt class="text-muted">
          leading line offset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-leading"
        >
          {{ readouts.leading }}
        </dd>
        <dt class="text-muted">
          lowest line offset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-lowest"
        >
          {{ readouts.lowest }}
        </dd>
        <dt class="text-muted">
          mask overflow
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-overflow"
        >
          {{ readouts.overflow }}
        </dd>
        <dt class="text-muted">
          widest blur on screen
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-blur"
        >
          {{ readouts.blur }}
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
        :step="10"
      >
        <USlider
          v-model="stagger"
          :max="300"
          :min="0"
          :step="10"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          lines overrides text
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">text</code> is required even when
        <code class="font-mono">lines</code> is supplied — it is the fallback the component splits on
        newlines, and requiring it keeps the root's <code class="font-mono">aria-label</code> from ever
        being empty. Pass an array and it wins outright.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            from text — split on newlines
          </p>
          <div
            class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10"
            data-testid="pair-text"
          >
            <MMaskRevealUp
              :key="`text-${replayKey}`"
              class="text-center text-lg font-bold"
              :stagger="stagger"
              :text="statement"
            />
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            from lines — the prop wins
          </p>
          <div
            class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10"
            data-testid="pair-lines"
          >
            <MMaskRevealUp
              :key="`lines-${replayKey}`"
              class="text-center text-lg font-bold"
              :lines="lines"
              :stagger="stagger"
              text="unused"
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
          root display
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-display"
        >
          {{ readouts.display }}
        </dd>
        <dt class="text-muted">
          start state
        </dt>
        <dd class="font-mono">
          opacity 0 · y 30 · blur 6px
        </dd>
        <dt class="text-muted">
          duration / ease
        </dt>
        <dd class="font-mono">
          0.76s · (0.22, 1, 0.36, 1)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const statement = 'Two lines rise\nout of their own box'
const lines = ['Three lines,', 'each in its own', 'clipping box']

const delay = ref(0)
const stagger = ref(90)
const triggerOnView = ref(false)
const replayKey = ref(0)

const lineCount = computed(() => statement.split('\n').length)

const readouts = ref({
  aria: 'pending',
  blur: 'pending',
  display: 'pending',
  distinct: 'pending',
  hidden: 'pending',
  leading: 'pending',
  lowest: 'pending',
  overflow: 'pending',
  reduced: 'pending',
})

/**
 * Reads the vertical offset out of a computed transform. This effect animates
 * translateY only, so the fifth matrix slot is the offset in pixels.
 */
function translateY(element: HTMLElement) {
  const transform = getComputedStyle(element).transform

  if (transform === 'none') {
    return 0
  }

  const matrix = transform.match(/matrix\(([^)]+)\)/)

  if (!matrix) {
    return 0
  }

  return Number.parseFloat(matrix[1].split(',')[5] ?? '0')
}

/**
 * Reads the blur radius out of the computed filter. The mask hides the travel,
 * so blur is the only channel that proves the line is still animating while it
 * is invisible.
 */
function blurOf(element: HTMLElement) {
  const filter = getComputedStyle(element).filter
  const match = filter.match(/blur\((\d+(?:\.\d+)?)px\)/)

  return match ? Number.parseFloat(match[1]!) : 0
}

/**
 * Each direct child of the root is a mask box, and each mask's only child is the
 * line that animates inside it. Reading `mask.firstElementChild` rather than
 * the mask itself is what makes the clip verifiable: the mask never moves, the
 * line does.
 */
function moversOf(root: Element) {
  return Array.from(root.children)
    .map(mask => mask.firstElementChild as HTMLElement | null)
    .filter((element): element is HTMLElement => element !== null)
}

/**
 * Samples on every frame, re-querying the root because `replayKey` remounts the
 * subtree and a captured node would be detached.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')

  if (!root) {
    return
  }

  const lines = moversOf(root)

  if (lines.length === 0) {
    return
  }

  const offsets = lines.map(translateY)
  const blurs = lines.map(blurOf)

  let bestIndex = 0
  for (let i = 1; i < offsets.length; i++) {
    if (Math.abs(offsets[i]!) < Math.abs(offsets[bestIndex]!)) {
      bestIndex = i
    }
  }

  readouts.value = {
    aria: root.getAttribute('aria-label') ?? 'missing',
    blur: `${Math.max(...blurs).toFixed(1)}px`,
    display: getComputedStyle(root).display,
    distinct: String(new Set(offsets).size),
    hidden: String(root.querySelectorAll('[aria-hidden="true"]').length),
    leading: `line ${bestIndex + 1} at ${offsets[bestIndex]?.toFixed(1)}`,
    lowest: `y ${Math.min(...offsets).toFixed(1)}`,
    overflow: getComputedStyle(root.children[0]!).overflow,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
  }
}

let frame = 0

function replay() {
  replayKey.value++
}

function toggleTrigger() {
  triggerOnView.value = !triggerOnView.value
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
