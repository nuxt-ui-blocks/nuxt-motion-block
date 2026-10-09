<template>
  <div class="space-y-12">
    <UPageHeader
      title="SdfBlobTransition"
      description="Metaball shapes sweep over changing content. Translated from smoothui's sdf-blob-transition."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Content swap
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The blob is a signed distance field, so its edge is soft and metaball-shaped rather than a
        hard geometric boundary. Two shapes that overlap are blended with
        <code class="font-mono">smin</code> instead of intersecting in a crease — that fillet is the
        whole difference between two circles touching and one blob.
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

      <div class="mb-8 rounded-2xl bg-(--ui-bg-muted) p-6">
        <MSdfBlobTransition
          :duration="duration"
          :transition-key="transitionKey"
          :variant="variant"
          class="h-64"
          data-testid="blob"
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
        </MSdfBlobTransition>
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
          variant
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant"
        >
          {{ variant }}
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
        :max="2400"
        :min="100"
        :step="20"
      >
        <USlider
          v-model="duration"
          :max="2400"
          :min="100"
          :step="20"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Variants
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        All five are one compiled program branching on a single float uniform. Switching variant is a
        uniform write, not a recompile — which matters because a recompile would land on the exact frame
        the control changed, and a stutter there is the most visible stutter in the demo.
      </p>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="option in variantOptions"
          :key="option"
          class="space-y-2"
        >
          <UButton
            :label="option"
            :variant="option === variant ? 'solid' : 'outline'"
            class="w-full justify-start"
            :data-testid="`pick-${option}`"
            @click="variant = option"
          />
          <div class="grid h-40 place-items-center rounded-xl bg-(--ui-bg-muted) px-4">
            <MSdfBlobTransition
              :duration="duration"
              :transition-key="`${option}-${transitionKey}`"
              :variant="option"
              class="h-full w-full"
            >
              <div
                class="grid h-full place-items-center rounded-lg bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900"
              >
                <p class="text-sm font-semibold">
                  {{ option }}
                </p>
              </div>
            </MSdfBlobTransition>
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
        The React original holds its previous children in state and swaps them at the sweep's midpoint,
        so the visitor watches old content get wiped away. A Vue slot cannot be snapshotted that way —
        reusing held VNodes renders stale DOM — so here the slot is already showing the new content on
        the first frame. An opaque cover behind the canvas absorbs that swap and clears over the first
        <code class="font-mono">16%</code> of the sweep, while the blob's edge is still wide enough to
        read as a shape. The effect is preserved; the causal order of the swap is not.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const variantOptions = ['circle', 'warped', 'merge', 'radial', 'final'] as const

const panels = [
  {
    body: 'A slide deck advance, a route change, a tab switch.',
    surfaceClass: 'bg-[oklch(0.93_0.05_330)] dark:bg-[oklch(0.36_0.11_330)]',
    title: 'Panel one',
  },
  {
    body: 'The same box, a different state, covered by the sweep.',
    surfaceClass: 'bg-[oklch(0.93_0.06_200)] dark:bg-[oklch(0.36_0.1_200)]',
    title: 'Panel two',
  },
]

const variant = ref<(typeof variantOptions)[number]>('final')
const duration = ref(1120)
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
  const element = document.querySelector('[data-testid="blob"]')
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
