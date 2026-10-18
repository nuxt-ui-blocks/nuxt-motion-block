<template>
  <div class="space-y-12">
    <UPageHeader
      title="ShortSlideDown"
      description="A short phrase assembles word by word, holds, then collapses and swaps to the next phrase on a loop."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Words drop in one at a time — 500ms apart — dropping the stack downward as each arrives, then
        the whole phrase blurs out after the interval and the next one builds. Give it a short
        phrase; the effect is built for two to four words, not a sentence.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="`interval: ${interval}ms`"
          icon="i-lucide-timer"
          variant="outline"
          data-testid="readout-interval-button"
          @click="cycleInterval()"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="mb-8 grid min-h-56 place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MShortSlideDown
          :key="replayKey"
          class="text-4xl font-bold"
          :interval="interval"
          :phrases="phrases"
          data-testid="basic"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          interval
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-interval"
        >
          {{ interval }}ms
        </dd>
        <dt class="text-muted">
          visible words
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-words"
        >
          {{ readouts.words }}
        </dd>
        <dt class="text-muted">
          stack height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-height"
        >
          {{ readouts.height }}
        </dd>
        <dt class="text-muted">
          max y offset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-max-y"
        >
          {{ readouts.maxY }}
        </dd>
        <dt class="text-muted">
          phase
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-phase"
        >
          {{ readouts.phase }}
        </dd>
        <dt class="text-muted">
          phrase swaps seen
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-swaps"
        >
          {{ readouts.swaps }}
        </dd>
        <dt class="text-muted">
          current phrase
        </dt>
        <dd class="truncate font-mono">
          {{ readouts.phrase }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="interval (ms)"
        :max="6000"
        :min="800"
        :step="100"
      >
        <USlider
          v-model="interval"
          :max="6000"
          :min="800"
          :step="100"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Stacked against ShortSlideRight
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Both rotate phrases on the same interval, but they compose along different axes:
        <code class="font-mono">MShortSlideDown</code> stacks vertically with
        <code class="font-mono">popLayout</code> so the words push each other, while
        <code class="font-mono">MShortSlideRight</code> glides inline with
        <code class="font-mono">mode="wait"</code> and never reflows.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            short-slide-down (column)
          </p>
          <div class="grid min-h-48 place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MShortSlideDown
              :key="`down-${replayKey}`"
              class="text-2xl font-bold"
              :interval="interval"
              :phrases="phrases"
              data-testid="pair-down"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            short-slide-right (inline)
          </p>
          <div class="grid min-h-48 place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MShortSlideRight
              :key="`right-${replayKey}`"
              class="text-2xl font-bold"
              :interval="interval"
              :phrases="phrases"
              data-testid="pair-right"
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
          aria-live on root
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-aria-live"
        >
          {{ readouts.ariaLive }}
        </dd>
        <dt class="text-muted">
          root flex direction
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-flex"
        >
          {{ readouts.flex }}
        </dd>
        <dt class="text-muted">
          word step / build ease
        </dt>
        <dd class="font-mono">
          500ms · (0.2, 0.8, 0.2, 1)
        </dd>
        <dt class="text-muted">
          exit offset / blur
        </dt>
        <dd class="font-mono">
          y 10 · blur 1.2px
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const phrases = ['Ship it', 'Then sleep']
const intervals = [2500, 1200, 4000]

const interval = ref(2500)
const replayKey = ref(0)

const readouts = ref({
  ariaLive: 'pending',
  flex: 'pending',
  height: 'pending',
  maxY: 'pending',
  phrase: 'pending',
  phase: 'pending',
  reduced: 'pending',
  swaps: 'pending',
  words: 'pending',
})

let swaps = 0
let lastPhrase = ''
let timer: ReturnType<typeof setInterval> | null = null

function replay() {
  replayKey.value++
}

function cycleInterval() {
  const current = intervals.indexOf(interval.value)
  interval.value = intervals[(current + 1) % intervals.length] ?? 2500
}

/**
 * AnimatePresence in popLayout mode may wrap a departing child in its own box
 * before positioning it absolutely. Rather than assume a DOM shape that motion-v
 * is free to change, walk down from the wrapper to whichever element actually
 * carries a transform.
 */
function moverOf(element: HTMLElement): HTMLElement {
  if (getComputedStyle(element).transform !== 'none') {
    return element
  }

  const child = element.firstElementChild as HTMLElement | null

  return child ? moverOf(child) : element
}

/**
 * Reads the vertical translate off a computed transform. The transform is a
 * matrix while the word is mid-flight, so the translate lands in the last matrix
 * slot rather than in `translateY()`.
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
 * Polled rather than rAF-driven: this component's phases are hundreds of
 * milliseconds wide, and the automated browser throttles rAF on backgrounded
 * pages badly enough to skip whole phases. A 50ms interval is cheap here and
 * catches the exit window reliably.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')

  if (!root) {
    return
  }

  const wrappers = Array.from(root.children) as HTMLElement[]

  if (wrappers.length === 0) {
    return
  }

  const words = wrappers.map(w => (w.textContent ?? '').trim())
  const phrase = words.join(' ')
  const offsets = wrappers.map(w => translateY(moverOf(w)))

  if (phrase !== lastPhrase && lastPhrase !== '') {
    swaps++
    lastPhrase = phrase
  }
  else if (phrase !== lastPhrase) {
    lastPhrase = phrase
  }

  const maxY = Math.max(...offsets)

  // The build travels from y -28 up to 0; the exit travels down to y +10. The
  // sign is the only reliable separator between the two phases, so a positive
  // max offset means the collapse is under way rather than a word still arriving.
  const phase = maxY > 1
    ? 'exiting'
    : (maxY < -1 ? 'building' : 'holding')

  readouts.value = {
    ariaLive: root.getAttribute('aria-live') ?? 'missing',
    flex: getComputedStyle(root).flexDirection,
    height: `${Math.round(root.getBoundingClientRect().height)}px`,
    maxY: maxY.toFixed(1),
    phrase,
    phase,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
    swaps: String(swaps),
    words: String(wrappers.length),
  }
}

onMounted(() => {
  timer = setInterval(sample, 50)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
