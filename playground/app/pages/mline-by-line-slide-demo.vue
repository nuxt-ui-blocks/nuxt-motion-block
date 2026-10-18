<template>
  <div class="space-y-12">
    <UPageHeader
      title="LineByLineSlide"
      description="Each line of a block of copy slides in from the left on its own offset, so a multi-line statement resolves line by line."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Pass a string with newlines in it, or an array via
        <code class="font-mono">lines</code> when the copy already lives as an array. Lines travel
        48px from the left with a 120ms stagger — the largest offset and the longest duration in the
        text tier, because a whole line has more mass than a single character.
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

      <div class="mb-8 grid min-h-40 place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MLineByLineSlide
          :key="replayKey"
          :delay="delay"
          class="text-center text-2xl font-bold"
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
          leading line
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-leading"
        >
          {{ readouts.leading }}
        </dd>
        <dt class="text-muted">
          first line transform
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-first"
        >
          {{ readouts.first }}
        </dd>
        <dt class="text-muted">
          rendered text
        </dt>
        <dd class="truncate font-mono">
          {{ readouts.text }}
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
        <code class="font-mono">lines</code> wins when both are supplied, but
        <code class="font-mono">text</code> stays required so the root
        <code class="font-mono">aria-label</code> is never empty. The
        <code class="font-mono">text</code> prop here is deliberately a placeholder — if it leaked
        through, the rendered copy below would not match the array.
      </p>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-12">
        <MLineByLineSlide
          :key="`lines-${replayKey}`"
          class="text-center text-xl font-bold"
          :lines="arrayLines"
          :stagger="stagger"
          text="placeholder"
          data-testid="lines-override"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          rendered lines
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-override-count"
        >
          {{ readouts.overrideCount }}
        </dd>
        <dt class="text-muted">
          rendered text
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-override-text"
        >
          {{ readouts.overrideText }}
        </dd>
        <dt class="text-muted">
          aria-label
        </dt>
        <dd class="truncate font-mono">
          {{ readouts.overrideAria }}
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
          aria-hidden lines
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
          opacity 0 · x -48
        </dd>
        <dt class="text-muted">
          duration / ease
        </dt>
        <dd class="font-mono">
          0.9s · (0.22, 1, 0.36, 1)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const statement = 'Two lines arrive\none stagger at a time'
const arrayLines = ['From', 'an', 'array']

const delay = ref(0)
const stagger = ref(120)
const triggerOnView = ref(false)
const replayKey = ref(0)

const lineCount = computed(() => statement.split('\n').length)

const readouts = ref({
  aria: 'pending',
  distinct: 'pending',
  first: 'pending',
  hidden: 'pending',
  leading: 'pending',
  overrideAria: 'pending',
  overrideCount: 'pending',
  overrideText: 'pending',
  reduced: 'pending',
  text: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

function toggleTrigger() {
  triggerOnView.value = !triggerOnView.value
}

/**
 * Horizontal translate is the fourth matrix slot, not the fifth — the vertical
 * translate is at index 5 for the letter components, so reading the wrong one
 * here would silently report zero.
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

/**
 * Samples the line spans on every frame. Re-queried inside the callback because
 * `replayKey` remounts the subtree and would leave a captured node detached with
 * empty computed styles.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const lines = root ? Array.from(root.children) as HTMLElement[] : []

  if (lines.length === 0) {
    return
  }

  const offsets = lines.map(translateX)

  // Closest to zero means furthest resolved. The stagger is proportional to the
  // line index, so the leading line is always index 0.
  let bestIndex = 0
  for (let i = 1; i < offsets.length; i++) {
    if (Math.abs(offsets[i]) < Math.abs(offsets[bestIndex])) {
      bestIndex = i
    }
  }

  const settled = offsets.every(offset => Math.abs(offset) < 0.5)

  const overrideRoot = document.querySelector('[data-testid="lines-override"]')

  readouts.value = {
    aria: root?.getAttribute('aria-label') ?? 'missing',
    distinct: String(new Set(offsets).size),
    first: settled ? 'x 0' : `x ${offsets[0].toFixed(1)}`,
    hidden: String(lines.filter(el => el.getAttribute('aria-hidden') === 'true').length),
    leading: `line ${bestIndex + 1} of ${lines.length}`,
    overrideAria: overrideRoot?.getAttribute('aria-label') ?? 'missing',
    overrideCount: overrideRoot ? String(overrideRoot.children.length) : 'pending',
    // Lines are block boxes, so there is no whitespace text node between them and
    // `textContent` concatenates them. Rejoin with a space to read like the copy.
    overrideText: overrideRoot
      ? Array.from(overrideRoot.children).map(line => (line.textContent ?? '').trim()).join(' ')
      : 'pending',
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
    text: (root?.getAttribute('aria-label') ?? 'pending').replace(/\s+/g, ' ').trim(),
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
