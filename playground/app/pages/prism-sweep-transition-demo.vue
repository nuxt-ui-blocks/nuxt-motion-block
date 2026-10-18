<template>
  <div class="space-y-12">
    <UPageHeader
      title="PrismSweepTransition"
      description="A faceted caustic band sweeps the frame and swaps what sits behind it."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Content swap
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        One program covers all sixteen combinations: the band's axis, direction, width and palette are
        uniforms, not branches. A direction or tone control moved mid-sweep therefore lands on the very next
        frame as a few uniform writes — a recompile on the frame a control moves would stutter in exactly the
        place the eye is already tracking.
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
          label="Swap content"
          icon="i-lucide-arrow-left-right"
          variant="outline"
          data-testid="swap"
          @click="swapContent()"
        />
      </div>

      <div class="mb-4 flex flex-wrap gap-2">
        <UButton
          v-for="option in directionOptions"
          :key="option"
          :label="option"
          :variant="option === direction ? 'solid' : 'outline'"
          :data-testid="`pick-direction-${option}`"
          @click="direction = option"
        />
        <span class="mx-2 self-center text-xs text-muted">direction</span>
      </div>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in toneOptions"
          :key="option"
          :label="option"
          :variant="option === tone ? 'solid' : 'outline'"
          :data-testid="`pick-tone-${option}`"
          @click="tone = option"
        />
        <span class="mx-2 self-center text-xs text-muted">tone</span>
      </div>

      <div class="mb-8 rounded-2xl bg-(--ui-bg-muted) p-6">
        <MPrismSweepTransition
          :direction="direction"
          :duration="duration"
          :tone="tone"
          :transition-key="transitionKey"
          class="h-64"
          data-testid="reveal"
          @rest="onRest()"
        >
          <div
            class="grid h-full place-items-center rounded-xl text-center"
            :class="panels[panel].surfaceClass"
          >
            <div class="space-y-2 px-6">
              <p class="text-3xl font-bold">
                {{ panels[panel].title }}
              </p>
              <p class="text-sm text-black/55 dark:text-white/55">
                {{ panels[panel].body }}
              </p>
            </div>
          </div>
        </MPrismSweepTransition>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          rest events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rest"
        >
          {{ restCount }}
        </dd>
        <dt class="text-muted">
          context
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-context"
        >
          {{ readouts.context }}
        </dd>
        <dt class="text-muted">
          drawing buffer
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-buffer"
        >
          {{ readouts.buffer }}
        </dd>
        <dt class="text-muted">
          canvas opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-opacity"
        >
          {{ readouts.opacity }}
        </dd>
        <dt class="text-muted">
          direction / tone
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mode"
        >
          {{ direction }} / {{ tone }}
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

      <UFormField
        class="mt-6"
        label="duration (ms)"
        :max="2600"
        :min="100"
        :step="20"
      >
        <USlider
          v-model="duration"
          :max="2600"
          :min="100"
          :step="20"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Tones
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each tone is nine numbers — three colours, a span, a softness, a bend, a facet frequency, a bloom —
        written to uniforms from a palette table. The fragment shader never learns which tone it is drawing.
      </p>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="option in toneOptions"
          :key="option"
          class="space-y-2"
        >
          <p class="text-sm font-semibold capitalize">
            {{ option }}
          </p>
          <div class="grid h-40 place-items-center rounded-xl bg-(--ui-bg-muted) px-4">
            <MPrismSweepTransition
              :duration="duration"
              :tone="option"
              :transition-key="`${option}-${transitionKey}`"
              class="h-full w-full"
            >
              <div
                class="grid h-full place-items-center rounded-lg bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900"
              >
                <p class="text-sm font-semibold">
                  {{ option }}
                </p>
              </div>
            </MPrismSweepTransition>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Directions
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Direction names the edge the band comes <em>from</em>: <code class="font-mono">left</code> travels
        left to right, <code class="font-mono">up</code> enters from the bottom and climbs. The shader flips
        its own axis rather than rotating anything, so each direction is two floats.
      </p>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="option in directionOptions"
          :key="option"
          class="space-y-2"
        >
          <p class="text-sm font-semibold">
            {{ option }}
          </p>
          <div class="grid h-40 place-items-center rounded-xl bg-(--ui-bg-muted) px-4">
            <MPrismSweepTransition
              :direction="option"
              :duration="duration"
              :transition-key="`${option}-${transitionKey}`"
              class="h-full w-full"
            >
              <div
                class="grid h-full place-items-center rounded-lg bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900"
              >
                <p class="text-sm font-semibold">
                  {{ option }}
                </p>
              </div>
            </MPrismSweepTransition>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          How the seam is covered
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The React original holds its previous children in state and swaps them once the band crosses
        <code class="font-mono">CONTENT_SWAP_RATIO</code> — a little past the midpoint, while the band is
        still over old material. A Vue slot cannot be snapshotted that way, so the slot shows the new content
        from the first frame and an opaque cover, tinted from the tone's shadow colour, stands in for the old
        one until that same travel point. Without a context the sweep still runs as a CSS gradient band over
        the identical cover, so the swap is hidden on both paths and
        <code class="font-mono">rest</code> fires on both.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Listed literally rather than imported from the component's constants: the
// playground depends on the package the same way a consumer would, so reaching
// into `src/` would prove nothing about the published surface.
const directionOptions = [
  'down',
  'left',
  'right',
  'up',
] as const

const toneOptions = [
  'aperture',
  'beam',
  'chroma',
  'prism',
] as const

const panels = [
  {
    body: 'A slide deck advance, a route change, a tab switch.',
    surfaceClass: 'bg-[oklch(0.93_0.05_330)] dark:bg-[oklch(0.36_0.11_330)]',
    title: 'Left panel',
  },
  {
    body: 'The same box, a different state, covered by the sweep.',
    surfaceClass: 'bg-[oklch(0.93_0.06_200)] dark:bg-[oklch(0.36_0.1_200)]',
    title: 'Right panel',
  },
]

const direction = ref<(typeof directionOptions)[number]>('left')
const tone = ref<(typeof toneOptions)[number]>('prism')
const duration = ref(1240)
const transitionKey = ref(0)
const panel = ref(0)
const restCount = ref(0)

const readouts = ref({
  buffer: 'pending',
  context: 'pending',
  opacity: 'pending',
  reduced: 'pending',
})

function replay() {
  transitionKey.value++
}

function swapContent() {
  panel.value = panel.value === 0 ? 1 : 0
  transitionKey.value++
}

function onRest() {
  restCount.value++
}

let frame = 0

/**
 * Samples the live canvas on every frame.
 *
 * The context type is read off the canvas rather than reported by the component,
 * so this verifies the browser actually granted a context instead of trusting the
 * component's own flag. `getContext` returns the already-created context when
 * called again with the same type, so probing here does not allocate a second one.
 */
function sample() {
  const element = document.querySelector('[data-testid="reveal"]')
  const canvas = element?.querySelector('canvas') ?? null

  if (!(canvas instanceof HTMLCanvasElement)) {
    readouts.value = { ...readouts.value, context: 'no canvas rendered' }
    return
  }

  const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
  readouts.value = {
    buffer: `${canvas.width}x${canvas.height}`,
    context: context ? (context instanceof WebGL2RenderingContext ? 'webgl2' : 'webgl') : 'none — fallback path',
    opacity: getComputedStyle(canvas).opacity,
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
  if (frame) cancelAnimationFrame(frame)
})
</script>
