<template>
  <div class="space-y-12">
    <UPageHeader
      title="PerspectiveText3D"
      description="Letters parked at different depths on a tilting plane."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic — static tilt
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">depth</code> spreads the segments along the z axis, so the middle of the
        line sits nearest the viewer and the ends fall away. On top of that sits a fixed plane rotation —
        this is the <code class="font-mono">static</code> driver, so nothing responds to the pointer or to
        scroll. Every segment is <code class="font-mono">aria-hidden</code>; the readable copy lives in a
        visually hidden span instead.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-20">
        <MPerspectiveText3D
          :key="replayKey"
          class="text-center text-3xl font-bold sm:text-4xl"
          :depth="depth"
          driver="static"
          :rotate-x="rotateX"
          :rotate-y="rotateY"
          :text="headline"
          data-testid="basic"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          depth
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-depth"
        >
          {{ depth }}px
        </dd>
        <dt class="text-muted">
          rotateX / rotateY
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rotation"
        >
          {{ rotateX }}° / {{ rotateY }}°
        </dd>
        <dt class="text-muted">
          segments
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ readouts.count }}
        </dd>
        <dt class="text-muted">
          distinct translateZ values
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-depths"
        >
          {{ readouts.depths }}
        </dd>
        <dt class="text-muted">
          plane transform
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-plane"
        >
          {{ readouts.plane }}
        </dd>
        <dt class="text-muted">
          wrapper perspective
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-perspective"
        >
          {{ readouts.perspective }}
        </dd>
        <dt class="text-muted">
          transform-style
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-transform-style"
        >
          {{ readouts.transformStyle }}
        </dd>
        <dt class="text-muted">
          text reads as
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-copy"
        >
          {{ readouts.copy }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="depth (px)"
        :max="120"
        :min="0"
        :step="10"
      >
        <USlider
          v-model="depth"
          :max="120"
          :min="0"
          :step="10"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="rotateX (deg)"
        :max="40"
        :min="-40"
        :step="1"
      >
        <USlider
          v-model="rotateX"
          :max="40"
          :min="-40"
          :step="1"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="rotateY (deg)"
        :max="40"
        :min="-40"
        :step="1"
      >
        <USlider
          v-model="rotateY"
          :max="40"
          :min="-40"
          :step="1"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Split mode
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">words</code> gives one translateZ per word; <code class="font-mono">lines</code>
        gives one per line, which is the stronger effect for a headline split across two or three rows
        because each row gets its own depth ramp.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            split: words
          </p>
          <div
            class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-14"
            data-testid="pair-words"
          >
            <MPerspectiveText3D
              :key="`words-${replayKey}`"
              class="text-center text-2xl font-bold"
              :depth="depth"
              driver="static"
              :rotate-x="rotateX"
              :rotate-y="rotateY"
              split="words"
              :text="headline"
            />
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            split: lines
          </p>
          <div
            class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-14"
            data-testid="pair-lines"
          >
            <MPerspectiveText3D
              :key="`lines-${replayKey}`"
              class="text-center text-2xl font-bold"
              :depth="depth"
              driver="static"
              :rotate-x="rotateX"
              :rotate-y="rotateY"
              split="lines"
              :text="paragraph"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Pointer driver
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Move the cursor over the text. The plane follows at twice the tilt angle, sprung so it eases into
        place rather than tracking rigidly, and returns to flat when the pointer leaves.
      </p>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-20">
        <MPerspectiveText3D
          class="text-center text-3xl font-bold"
          :depth="depth"
          driver="pointer"
          :rotate-x="rotateX"
          :rotate-y="rotateY"
          :text="headline"
          data-testid="pair-pointer"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Scroll driver
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The plane rotation is driven by scroll progress instead. Pass
        <code class="font-mono">container</code> to measure against a scrolling element of your own
        instead of the window — scroll the box below and watch the tilt invert as it passes.
      </p>
      <p class="mb-6 text-sm text-muted">
        That element needs
        <code class="font-mono">position: relative</code>. Motion locates the headline by walking
        <code class="font-mono">offsetParent</code> from the headline up to the container, and a
        <code class="font-mono">position: static</code> container is skipped by that walk, so the
        offsets are measured in page space and stay put while the box scrolls. The tilt then holds
        one value no matter where the scroll is.
      </p>

      <div
        ref="scrollContainer"
        class="relative h-64 overflow-y-auto overscroll-contain rounded-2xl bg-(--ui-bg-muted) p-6"
        data-testid="scroll-container"
      >
        <div class="flex h-[30rem] items-center justify-center">
          <MPerspectiveText3D
            :key="replayKey"
            class="text-center text-3xl font-bold"
            :container="() => scrollContainer"
            :depth="depth"
            driver="scroll"
            :rotate-x="rotateX"
            :rotate-y="rotateY"
            :text="headline"
            data-testid="pair-scroll"
          />
        </div>
        <div class="h-[30rem]" />
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
          {{ reduced ? 'reduce' : 'no-preference' }}
        </dd>
        <dt class="text-muted">
          aria-hidden segments
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-hidden"
        >
          {{ readouts.hidden }}
        </dd>
        <dt class="text-muted">
          aria-label on wrapper
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-aria"
        >
          {{ readouts.aria }}
        </dd>
        <dt class="text-muted">
          start rotation
        </dt>
        <dd class="font-mono">
          rotateX 0 · rotateY 0
        </dd>
        <dt class="text-muted">
          spring
        </dt>
        <dd class="font-mono">
          duration 0.25 · bounce 0.1
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'Depth in the letterforms'
const paragraph = 'A headline broken\nacross two rows of type'

const depth = ref(40)
const rotateX = ref(8)
const rotateY = ref(10)
const replayKey = ref(0)
const scrollContainer = ref<HTMLElement | null>(null)
const reduced = ref(false)

const readouts = ref({
  aria: 'pending',
  copy: 'pending',
  count: 'pending',
  depths: 'pending',
  hidden: 'pending',
  perspective: 'pending',
  plane: 'pending',
  transformStyle: 'pending',
})

function replay() {
  replayKey.value++
}

function translateZOf(element: HTMLElement) {
  const transform = getComputedStyle(element).transform

  if (transform === 'none') {
    return 0
  }

  const matrix = transform.match(/matrix3d\(([^)]+)\)/)

  if (matrix) {
    return Number.parseFloat(matrix[1].split(',')[14] ?? '0')
  }

  const flat = transform.match(/matrix\(([^)]+)\)/)

  return flat ? Number.parseFloat(flat[1].split(',')[5] ?? '0') : 0
}

/**
 * Samples the static card only. The scroll and pointer drivers are verified by
 * driving the page rather than by polling: `scrollYProgress` and the pointer
 * handlers are the thing under test, not the render loop.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')

  if (!root) {
    return
  }

  // The plane is the wrapper's second child: the first is the sr-only copy.
  const plane = root.querySelector(':scope > :nth-child(2)') as HTMLElement | null
  const segments = Array.from(root.querySelectorAll('[aria-hidden="true"]')) as HTMLElement[]

  if (!plane) {
    return
  }

  const depths = segments.map(translateZOf)

  readouts.value = {
    aria: root.getAttribute('aria-label') ?? 'none (plain div)',
    copy: (root.querySelector('.sr-only')?.textContent ?? '').slice(0, 32),
    count: String(segments.length),
    depths: `${new Set(depths).size} distinct`,
    hidden: String(segments.filter(segment => segment.getAttribute('aria-hidden') === 'true').length),
    perspective: getComputedStyle(root).perspective,
    plane: getComputedStyle(plane).transform.slice(0, 46),
    transformStyle: getComputedStyle(plane).transformStyle,
  }
}

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // `setInterval` rather than `requestAnimationFrame`: rAF is throttled in the
  // automated browser and this only needs to be current when a human looks.
  timer = setInterval(sample, 120)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
