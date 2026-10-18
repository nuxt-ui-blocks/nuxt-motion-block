<template>
  <div class="space-y-12">
    <UPageHeader
      title="PerWordCrossfade"
      description="Each word of a string fades and lifts in on its own offset, so a whole sentence resolves word by word instead of all at once."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Words stagger in reading order with an 8px lift. The start offset is deliberately small —
        the point is the cascade, not the distance. Individual characters are
        <code class="font-mono">aria-hidden</code> and the root carries the full
        <code class="font-mono">aria-label</code>, so a screen reader announces the sentence once.
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
        <MPerWordCrossfade
          :key="replayKey"
          :delay="delay"
          class="max-w-lg text-center text-3xl font-bold"
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
          distinct offsets on screen
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-distinct"
        >
          {{ readouts.distinct }}
        </dd>
        <dt class="text-muted">
          leading word
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-leading"
        >
          {{ readouts.leading }}
        </dd>
        <dt class="text-muted">
          first word transform
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-first"
        >
          {{ readouts.first }}
        </dd>
        <dt class="text-muted">
          word wrappers
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-wrappers"
        >
          {{ readouts.wrappers }}
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
        :max="200"
        :min="0"
        :step="5"
      >
        <USlider
          v-model="stagger"
          :max="200"
          :min="0"
          :step="5"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Long copy wraps across lines
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root carries no <code class="font-mono">display</code> style on purpose, so it inherits
        whatever the parent gives it — which means constraining the width is the parent's job. Words
        are inline-block, so a long sentence reflows to that width and still animates in reading
        order. Below, the constraint lives on the wrapper rather than on the component.
      </p>

      <div class="rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <div class="max-w-sm">
          <MPerWordCrossfade
            :key="`para-${replayKey}`"
            class="text-lg leading-relaxed"
            :stagger="stagger"
            :text="paragraph"
            data-testid="paragraph"
          />
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          rendered line count
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-lines"
        >
          {{ readouts.lines }}
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
          root aria-label
        </dt>
        <dd class="truncate font-mono">
          {{ readouts.paraAria }}
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
          aria-hidden animated spans
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-hidden"
        >
          {{ readouts.hidden }}
        </dd>
        <dt class="text-muted">
          start state
        </dt>
        <dd class="font-mono">
          opacity 0 · y 8
        </dd>
        <dt class="text-muted">
          duration / ease
        </dt>
        <dd class="font-mono">
          0.7s · (0.16, 1, 0.3, 1)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Every word finds its place'
const paragraph = 'Sentences longer than one line keep their reading order while the words arrive, because each word is an inline-block child of an unstyled root.'

const delay = ref(0)
const stagger = ref(70)
const triggerOnView = ref(false)
const replayKey = ref(0)

const wordCount = computed(() => headline.split(' ').length)

const readouts = ref({
  aria: 'pending',
  distinct: 'pending',
  display: 'pending',
  first: 'pending',
  hidden: 'pending',
  leading: 'pending',
  lines: 'pending',
  paraAria: 'pending',
  reduced: 'pending',
  wrappers: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

function toggleTrigger() {
  triggerOnView.value = !triggerOnView.value
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
 * Each direct child of the root is one word wrapper, and the animated span is
 * that wrapper's first child. Sampling the wrapper itself would read the offset
 * off the static inline-block box, which never moves.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const wrappers = root ? Array.from(root.children) as HTMLElement[] : []

  if (wrappers.length === 0) {
    return
  }

  const movers = wrappers
    .map(wrapper => wrapper.firstElementChild as HTMLElement | null)
    .filter((el): el is HTMLElement => el !== null)

  const offsets = movers.map(translateY)

  // Closest to zero means furthest resolved. The stagger is proportional to the
  // word index, so the leading word is always index 0.
  let bestIndex = 0
  for (let i = 1; i < offsets.length; i++) {
    if (Math.abs(offsets[i]) < Math.abs(offsets[bestIndex])) {
      bestIndex = i
    }
  }

  const settled = offsets.every(offset => Math.abs(offset) < 0.5)

  const paragraphRoot = document.querySelector('[data-testid="paragraph"]')
  const paragraphWords = paragraphRoot
    ? Array.from(paragraphRoot.children) as HTMLElement[]
    : []

  // Line count is measured off the wrapper boxes: two words on the same line
  // share a top. Counting distinct tops is enough and avoids a layout read on
  // the whole paragraph.
  const tops = new Set(paragraphWords.map(el => Math.round(el.getBoundingClientRect().top)))

  readouts.value = {
    aria: root?.getAttribute('aria-label') ?? 'missing',
    distinct: String(new Set(offsets).size),
    display: paragraphRoot ? getComputedStyle(paragraphRoot).display : 'pending',
    first: settled ? 'y 0' : `y ${offsets[0].toFixed(1)}`,
    hidden: String(movers.filter(el => el.getAttribute('aria-hidden') === 'true').length),
    leading: `word ${bestIndex + 1} of ${offsets.length}`,
    lines: String(tops.size),
    paraAria: paragraphRoot?.getAttribute('aria-label') ?? 'pending',
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
    wrappers: String(wrappers.length),
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
