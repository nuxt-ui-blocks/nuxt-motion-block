<template>
  <div class="space-y-12">
    <UPageHeader
      title="BlurOutUp"
      description="Words rise out of a blur, one after another. Translated from smoothui's blur-out-up."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every word starts at <code class="font-mono">6px</code> blur with zero opacity,
        <code class="font-mono">10px</code> low, then drifts up while the blur collapses to zero.
        Unlike the per-character effects this slices on whitespace, so a word is always legible as a
        unit and the effect reads as a sentence resolving rather than as a headline assembling.
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
        <MBlurOutUp
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
          children in root
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-children"
        >
          {{ readouts.children }}
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
          widest blur on screen
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-blur"
        >
          {{ readouts.blur }}
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
        :step="4"
      >
        <USlider
          v-model="stagger"
          :max="160"
          :min="0"
          :step="4"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Paragraph copy
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root deliberately sets <strong>no</strong> display style, so it stays an inline box and
        wraps at whatever width its parent allows. The constraint belongs on the parent, not on the
        component — a <code class="font-mono">max-width</code> passed straight to the component has
        no effect on a non-replaced inline box.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            constrained to 22rem
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <div class="max-w-[22rem]">
              <MBlurOutUp
                :key="`wrapped-${replayKey}`"
                class="text-lg leading-relaxed"
                :stagger="stagger"
                :text="paragraph"
                data-testid="pair-wrapped"
              />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            unconstrained — one long line
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MBlurOutUp
              :key="`wide-${replayKey}`"
              class="text-lg leading-relaxed"
              :stagger="stagger"
              :text="paragraph"
              data-testid="pair-wide"
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
          opacity 0 · y 10 · blur 6px
        </dd>
        <dt class="text-muted">
          duration / ease
        </dt>
        <dd class="font-mono">
          0.56s · (0.22, 1, 0.36, 1)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Words resolve one by one'
const paragraph = 'Long copy is where the word-level split pays off, because every word stays legible as a unit while it arrives.'

const delay = ref(0)
const stagger = ref(28)
const triggerOnView = ref(false)
const replayKey = ref(0)

const wordCount = computed(() => headline.split(' ').length)

const readouts = ref({
  aria: 'pending',
  blur: 'pending',
  children: 'pending',
  direction: 'pending',
  display: 'pending',
  distinct: 'pending',
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
 * Pulls the blur radius out of the computed `filter`, which is the channel that
 * distinguishes this effect from the unblurred slide-and-scale reveals.
 */
function blurOf(element: HTMLElement) {
  const filter = getComputedStyle(element).filter
  const match = filter.match(/blur\(([\d.]+)px\)/)

  return match ? Number.parseFloat(match[1] ?? '0') : 0
}

/**
 * Samples the root's children on every frame. The lookup happens inside the
 * callback because `replayKey` remounts the subtree, so a node captured in a
 * closure would be detached and every computed style would come back empty.
 *
 * Every other child is the inter-word space, so only the odd indices are
 * animated words. Filtering by `aria-hidden` would also drop the spaces, hence
 * the index stride.
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

  const offsets = words.map(translateY)
  const blurs = words.map(blurOf)

  let bestIndex = 0
  for (let i = 1; i < offsets.length; i++) {
    if (Math.abs(offsets[i]) < Math.abs(offsets[bestIndex])) {
      bestIndex = i
    }
  }

  // Below the floor the values are indistinguishable and the component has
  // finished; report the resting state rather than the sign of float noise.
  const settled = offsets.every(offset => Math.abs(offset) < 0.5)
  const active = offsets.filter(offset => Math.abs(offset) > 0.5)

  readouts.value = {
    aria: root?.getAttribute('aria-label') ?? 'missing',
    blur: `${Math.max(...blurs).toFixed(1)}px`,
    children: String(children.length),
    direction: settled
      ? 'at rest (y 0)'
      : (active.length > 0 && active.every(offset => offset > 0) ? 'rising (y > 0)' : 'mixed'),
    display: root ? getComputedStyle(root).display : 'missing',
    distinct: String(new Set(offsets).size),
    hidden: String(children.filter(el => el.getAttribute('aria-hidden') === 'true').length),
    leading: `word ${bestIndex + 1} of ${words.length}`,
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
