<template>
  <div class="space-y-12">
    <UPageHeader
      title="BottomUpLetters"
      description="Characters rise into place one after another, each settling upward from below."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every character starts faded and pushed down, then rises and resolves.
        <code class="font-mono">delay</code> and <code class="font-mono">stagger</code> are both
        in milliseconds, and the stagger is applied in string order — so the effect reads left to
        right while the motion itself is upward.
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
        <MBottomUpLetters
          :key="replayKey"
          :delay="delay"
          class="text-4xl font-bold sm:text-5xl"
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
          chars
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ charCount }}
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
          leading char
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-leading"
        >
          {{ readouts.leading }}
        </dd>
        <dt class="text-muted">
          first char transform
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-first"
        >
          {{ readouts.first }}
        </dd>
        <dt class="text-muted">
          travel direction
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-direction"
        >
          {{ readouts.direction }}
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
        :max="160"
        :min="0"
        :step="2"
      >
        <USlider
          v-model="stagger"
          :max="160"
          :min="0"
          :step="2"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Mirrored against TopDownLetters
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Same string, same constants, opposite sign on the start offset. Put side by side the
        difference is unambiguous: this one settles upward, the other drops in from above.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            bottom-up (this component)
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MBottomUpLetters
              :key="`bottom-${replayKey}`"
              class="text-3xl font-bold"
              :stagger="stagger"
              :text="pairText"
              data-testid="pair-bottom"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            top-down (MTopDownLetters)
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MTopDownLetters
              :key="`top-${replayKey}`"
              class="text-3xl font-bold"
              :stagger="stagger"
              :text="pairText"
              data-testid="pair-top"
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
          start state
        </dt>
        <dd class="font-mono">
          opacity 0 · y 46
        </dd>
        <dt class="text-muted">
          duration / ease
        </dt>
        <dd class="font-mono">
          0.4s · (0.18, 1, 0.32, 1)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Rise up'
const pairText = 'Mirror'

const delay = ref(0)
const stagger = ref(88)
const triggerOnView = ref(false)
const replayKey = ref(0)

const charCount = computed(() => Array.from(headline).length)

const readouts = ref({
  aria: 'pending',
  direction: 'pending',
  distinct: 'pending',
  first: 'pending',
  hidden: 'pending',
  leading: 'pending',
  reduced: 'pending',
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
 * matrix while the character is mid-flight, so the translate lands in the last
 * matrix slot rather than in `translateY()`.
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
 * Samples the character spans on every frame. The lookup happens inside the
 * callback on purpose: `replayKey` remounts the subtree, so a node captured in
 * a closure would be detached and every computed style would come back empty.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const chars = root ? Array.from(root.children) as HTMLElement[] : []

  if (chars.length === 0) {
    return
  }

  const offsets = chars.map(translateY)

  // Closest to zero means furthest resolved. Because the delay is proportional
  // to the character index, the leading character is always index 0.
  let bestIndex = 0
  for (let i = 1; i < offsets.length; i++) {
    if (Math.abs(offsets[i]) < Math.abs(offsets[bestIndex])) {
      bestIndex = i
    }
  }

  // Below the floor the offsets are indistinguishable and the component has
  // finished; report the resting state rather than the sign of float noise.
  const settled = offsets.every(offset => Math.abs(offset) < 0.5)
  const active = offsets.filter(offset => Math.abs(offset) > 0.5)

  readouts.value = {
    aria: root?.getAttribute('aria-label') ?? 'missing',
    direction: settled
      ? 'at rest (y 0)'
      : (active.length > 0 && active.every(offset => offset > 0) ? 'rising (y > 0)' : 'mixed'),
    distinct: String(new Set(offsets).size),
    first: settled ? 'y 0' : `y ${offsets[0].toFixed(1)}`,
    hidden: String(chars.filter(el => el.getAttribute('aria-hidden') === 'true').length),
    leading: `char ${bestIndex + 1} of ${chars.length}`,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
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
