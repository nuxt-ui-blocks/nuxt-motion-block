<template>
  <div class="space-y-12">
    <UPageHeader
      title="StaggerFromEdges"
      description="Characters resolve inward from both ends, each one offset by its distance to the nearest edge. The mirror of StaggerFromCenter. Translated from smoothui's stagger-from-edges."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every character starts blurred, faded and pushed down, then resolves. The delay is scaled by each character's distance to the <em>nearest edge</em>, so the first and last letters land together and the resolve converges toward the middle. <code class="font-mono">delay</code> and <code class="font-mono">stagger</code> are both in milliseconds.
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

      <div
        class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14"
      >
        <MStaggerFromEdges
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
          leading ring
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-leading"
        >
          {{ readouts.leading }}
        </dd>
        <dt class="text-muted">
          edge char filter
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-edge"
        >
          {{ readouts.edge }}
        </dd>
        <dt class="text-muted">
          centre char filter
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-centre"
        >
          {{ readouts.centre }}
        </dd>
        <dt class="text-muted">
          target
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-target"
        >
          {{ readouts.target }}
        </dd>
        <dt class="text-muted">
          reduced motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduced"
        >
          {{ readouts.reduced }}
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
        :max="120"
        :min="0"
        :step="2"
      >
        <USlider
          v-model="stagger"
          :max="120"
          :min="0"
          :step="2"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Side by side with the centre-out cascade
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Same string, same constants. Only the distance metric differs —
        <code class="font-mono">Math.abs(i - (n-1)/2)</code> versus
        <code class="font-mono">Math.min(i, n-1-i)</code> — so the two produce
        opposite readings of the same motion.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            from edges (this component)
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MStaggerFromEdges
              :key="`edges-${replayKey}`"
              class="text-3xl font-bold"
              :stagger="stagger"
              :text="pairText"
              data-testid="pair-edges"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            from centre (MStaggerFromCenter)
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10">
            <MStaggerFromCenter
              :key="`center-${replayKey}`"
              class="text-3xl font-bold"
              :stagger="stagger"
              :text="pairText"
              data-testid="pair-center"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sizes
        </p>
      </template>

      <div class="space-y-6">
        <div
          v-for="size in sizes"
          :key="size"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ size }}
          </p>
          <div class="rounded-xl bg-(--ui-bg-muted) px-4 py-8">
            <MStaggerFromEdges
              :key="`${size}-${replayKey}`"
              class="font-bold"
              :class="size"
              :stagger="stagger"
              :text="headline"
              :data-testid="`size-${size}`"
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
          data-testid="readout-reduced-env"
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
          edge distance formula
        </dt>
        <dd class="font-mono">
          Math.min(i, n-1-i)
        </dd>
        <dt class="text-muted">
          start state
        </dt>
        <dd class="font-mono">
          blur(3px) · y 12 · opacity 0
        </dd>
        <dt class="text-muted">
          duration / ease
        </dt>
        <dd class="font-mono">
          0.62s · (0.22, 1, 0.36, 1)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Edges in'
const pairText = 'Converge'
const sizes = ['text-xl', 'text-3xl', 'text-5xl', 'text-6xl']

const delay = ref(0)
const stagger = ref(22)
const triggerOnView = ref(false)
const replayKey = ref(0)

const charCount = computed(() => Array.from(headline).length)

const readouts = ref({
  aria: 'pending',
  centre: 'pending',
  distinct: 'pending',
  edge: 'pending',
  hidden: 'pending',
  leading: 'pending',
  reduced: 'pending',
  target: 'filter: blur(0px), opacity: 1, y: 0',
})

let frame = 0

function replay() {
  replayKey.value++
}

function toggleTrigger() {
  triggerOnView.value = !triggerOnView.value
}

/**
 * Reads the live resolved styles off the character spans. The lookup happens
 * inside the frame callback on purpose: `replayKey` remounts the subtree, so a
 * node captured in a closure would be detached and every computed style would
 * come back empty.
 *
 * `leading` names the ring that is furthest along its transition. Because the
 * delay is measured from the nearest edge, the outer ring (index 0 and the
 * last index) resolves before the middle — the opposite of StaggerFromCenter.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const chars = root ? Array.from(root.children) as HTMLElement[] : []

  if (chars.length === 0) {
    return
  }

  const transforms = chars.map(el => getComputedStyle(el).transform)
  const blurs = chars.map(el => getComputedStyle(el).filter)
  const last = chars.length - 1
  const centreIndex = Math.floor(last / 2)

  // Lowest blur value == furthest resolved == smallest distance-to-edge.
  let bestIndex = 0
  for (let i = 1; i < chars.length; i++) {
    if (blurs[i] < blurs[bestIndex]) {
      bestIndex = i
    }
  }

  readouts.value = {
    aria: root?.getAttribute('aria-label') ?? 'missing',
    centre: blurs[centreIndex] || 'n/a',
    distinct: String(new Set(transforms).size),
    edge: `${blurs[0]} / ${blurs[last]}`,
    hidden: String(chars.filter(el => el.getAttribute('aria-hidden') === 'true').length),
    leading: `char ${bestIndex + 1} (edge distance ${Math.min(bestIndex, last - bestIndex)})`,
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduce'
      : 'no-preference',
    target: 'filter: blur(0px), opacity: 1, y: 0',
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
