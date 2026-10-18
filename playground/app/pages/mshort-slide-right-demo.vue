<template>
  <div class="space-y-12">
    <UPageHeader
      title="ShortSlideRight"
      description="A short phrase glides in from the left as a single inline unit, words fading up behind it, then blurs out and swaps to the next phrase on a loop."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The phrase is an inline element and never wraps, so it slides in as one object rather than
        reassembling itself line by line. Words fade in 92ms apart inside the arriving phrase, which
        is what stops the slide from reading as a single opaque block.
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

      <div class="mb-8 rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <div class="mx-auto w-fit">
          <MShortSlideRight
            :key="replayKey"
            class="text-4xl font-bold"
            :interval="interval"
            :phrases="phrases"
            data-testid="basic"
          />
        </div>
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
          words
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-words"
        >
          {{ readouts.words }}
        </dd>
        <dt class="text-muted">
          phrase x offset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-phrase-x"
        >
          {{ readouts.phraseX }}
        </dd>
        <dt class="text-muted">
          phrase blur
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-blur"
        >
          {{ readouts.blur }}
        </dd>
        <dt class="text-muted">
          first word opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-first-opacity"
        >
          {{ readouts.firstOpacity }}
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
          :min="0"
          :step="100"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Inline axis and overflow
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The wrapper is <code class="font-mono">inline-block</code> and clips its overflow, so a phrase
        sliding in from -24px is hidden until it clears the left edge rather than bleeding outside the
        box. It sits in a line of ordinary text below without pushing anything around — which needs
        a plain block parent, because a flex or grid parent blockifies it back to
        <code class="font-mono">block</code>.
      </p>

      <div class="rounded-2xl bg-(--ui-bg-muted) px-6 py-12">
        <p class="text-lg">
          <span class="font-muted">Now showing:</span>
          <MShortSlideRight
            :key="`inline-${replayKey}`"
            class="text-lg font-bold"
            :interval="interval"
            :phrases="phrases"
            data-testid="inline"
          />
          <span class="font-muted">— rotating on a timer.</span>
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          root display
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-root-display"
        >
          {{ readouts.rootDisplay }}
        </dd>
        <dt class="text-muted">
          root overflow
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-overflow"
        >
          {{ readouts.overflow }}
        </dd>
        <dt class="text-muted">
          root position
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-position"
        >
          {{ readouts.position }}
        </dd>
      </dl>
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
          start state
        </dt>
        <dd class="font-mono">
          x -24 · blur 1.2px
        </dd>
        <dt class="text-muted">
          word stagger / gap
        </dt>
        <dd class="font-mono">
          92ms · 0.25em
        </dd>
        <dt class="text-muted">
          exit offset / blur
        </dt>
        <dd class="font-mono">
          x 12 · blur 1px
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
  blur: 'pending',
  firstOpacity: 'pending',
  overflow: 'pending',
  phase: 'pending',
  phrase: 'pending',
  phraseX: 'pending',
  position: 'pending',
  reduced: 'pending',
  rootDisplay: 'pending',
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
 * Horizontal translate is the fourth matrix slot, not the fifth — the vertical
 * translate sits at index 5 in the other components, so reading the wrong one
 * here would report a permanent zero.
 */
function translateX(element: HTMLElement) {
  const transform = getComputedStyle(element).transform

  if (transform === 'none') {
    return 0
  }

  const matrix = transform.match(/matrix\(([^)]+)\)/)

  if (!matrix) {
    return 0
  }

  return Number.parseFloat(matrix[1].split(',')[4] ?? '0')
}

function blurOf(element: HTMLElement) {
  const filter = getComputedStyle(element).filter
  const match = filter.match(/blur\(([\d.]+)px\)/)

  return match ? Number.parseFloat(match[1] ?? '0') : 0
}

/**
 * Polled rather than rAF-driven: the arrival is 0.52s and the exit 0.32s, and
 * the automated browser throttles rAF on backgrounded pages badly enough to miss
 * the whole window. A 50ms interval is cheap and catches both phases.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')

  if (!root) {
    return
  }

  // The root holds exactly one phrase wrapper, and the wrapper holds the words.
  // mode="wait" means the outgoing phrase is gone before the next arrives, so
  // there is never more than one child to pick between.
  const phraseEl = root.firstElementChild as HTMLElement | null

  if (!phraseEl) {
    return
  }

  const words = Array.from(phraseEl.children) as HTMLElement[]
  const phrase = words.map(word => (word.textContent ?? '').trim()).join(' ')
  const x = translateX(phraseEl)

  if (phrase !== lastPhrase && lastPhrase !== '') {
    swaps++
    lastPhrase = phrase
  }
  else if (phrase !== lastPhrase) {
    lastPhrase = phrase
  }

  const firstWord = words[0]

  readouts.value = {
    ariaLive: root.getAttribute('aria-live') ?? 'missing',
    blur: `${blurOf(phraseEl).toFixed(2)}px`,
    firstOpacity: firstWord
      ? Number.parseFloat(getComputedStyle(firstWord).opacity).toFixed(3)
      : 'pending',
    overflow: getComputedStyle(root).overflow,
    // The arrival travels from x -24 up to 0; the exit travels on to x +12. The
    // sign separates "still arriving" from "already leaving".
    phase: x > 2
      ? 'exiting'
      : (x < -2 ? 'entering' : 'holding'),
    phrase,
    phraseX: x.toFixed(1),
    position: getComputedStyle(root).position,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
    rootDisplay: getComputedStyle(root).display,
    swaps: String(swaps),
    words: String(words.length),
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
