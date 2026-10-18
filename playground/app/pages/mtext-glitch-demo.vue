<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextGlitch"
      description="RGB-split clone layers, flicker and scan lines over a base string. Fires on hover, on an interval, when scrolled into view, or by hand."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The base string keeps <code class="font-mono">opacity: 1</code> while
        <code class="font-mono">intensity</code> decides how many clones are stacked on top of it.
        Every clone is tinted from <code class="font-mono">colors</code> and blended with
        <code class="font-mono">mix-blend-mode: multiply</code>, so the resting state is plain text
        and only the hover builds the stack. Hover the panel to run it.
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
          :label="`showScanLines: ${showScanLines}`"
          icon="i-lucide-scan-line"
          variant="outline"
          data-testid="toggle-scanlines"
          @click="showScanLines = !showScanLines"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextGlitch
          :key="`basic-${replayKey}`"
          :colors="colors"
          :intensity="intensity"
          :show-scan-lines="showScanLines"
          :speed="speed"
          class="text-4xl font-black"
          data-testid="basic"
          text="GLITCH"
          @glitch-end="glitchState = 'idle'"
          @glitch-start="glitchState = 'running'"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          intensity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-intensity"
        >
          {{ intensity }}
        </dd>
        <dt class="text-muted">
          clone layers
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-layers"
        >
          {{ readouts.layers }}
        </dd>
        <dt class="text-muted">
          scan lines
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-scanlines"
        >
          {{ readouts.scanLines }}
        </dd>
        <dt class="text-muted">
          glitch state
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-state"
        >
          {{ glitchState }}
        </dd>
        <dt class="text-muted">
          speed
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speed"
        >
          {{ speed }}ms
        </dd>
        <dt class="text-muted">
          container overflow
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-overflow"
        >
          {{ readouts.overflow }}
        </dd>
      </dl>

      <div class="mt-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="intensity (1-10)"
          :hint="`${intensity} maps onto low / medium / high / extreme`"
        >
          <USlider
            v-model="intensity"
            :max="10"
            :min="1"
            :step="1"
          />
        </UFormField>

        <UFormField
          label="speed (ms)"
          :hint="`${speed}ms per flicker frame`"
        >
          <USlider
            v-model="speed"
            :max="1200"
            :min="100"
            :step="50"
          />
        </UFormField>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Trigger modes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">trigger</code> is a mode, not a boolean. <code class="font-mono">hover</code> binds
        mouseenter/mouseleave, <code class="font-mono">auto</code> and <code class="font-mono">inView</code> run a
        client-side interval (never on the server), and <code class="font-mono">manual</code> hands the
        controls to the exposed <code class="font-mono">trigger()</code> / <code class="font-mono">stop()</code> methods.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="mode in triggerModes"
          :key="mode"
          :label="mode"
          :variant="mode === activeTrigger ? 'solid' : 'outline'"
          :data-testid="`trigger-${mode}`"
          @click="activeTrigger = mode"
        />
      </div>

      <div
        v-if="activeTrigger === 'manual'"
        class="mb-8 flex flex-wrap gap-2"
      >
        <UButton
          label="Glitch now"
          icon="i-lucide-zap"
          data-testid="manual-start"
          @click="glitchRef?.trigger()"
        />
        <UButton
          label="Stop"
          icon="i-lucide-square"
          variant="soft"
          data-testid="manual-stop"
          @click="glitchRef?.stop()"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextGlitch
          ref="glitchRef"
          :duration="1.5"
          :interval="2"
          :trigger="activeTrigger"
          class="text-3xl font-black"
          data-testid="triggered"
          text="TRIGGER"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Intensity tour
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The named levels are a lookup table: <code class="font-mono">low</code> stacks two clones with a
        2px maximum offset, <code class="font-mono">extreme</code> stacks six with 15px and a 50% flicker
        chance. Numbers 1-10 are folded back onto those same four presets, so there is no continuous dial
        underneath the labels.
      </p>

      <div class="grid gap-4">
        <div
          v-for="level in intensityTour"
          :key="level"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10"
        >
          <MTextGlitch
            :intensity="level"
            :speed="300"
            trigger="auto"
            class="text-2xl font-black"
            :data-testid="`level-${level}`"
            :text="level.toUpperCase()"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Colours
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The palette is walked per layer index with a modulo, so a three-colour array recycles across six
        layers rather than running out. Layers paint on top of the page background, which is why a light
        palette on a light card reads as a soft double image instead of a hard RGB tear.
      </p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="palette in palettes"
          :key="palette.name"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10"
        >
          <MTextGlitch
            :colors="palette.colors"
            intensity="high"
            :speed="400"
            trigger="auto"
            class="text-2xl font-black"
            :data-testid="`palette-${palette.name}`"
            :text="palette.name"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const triggerModes = ['hover', 'auto', 'inView', 'manual'] as const
const intensityTour = ['low', 'medium', 'high', 'extreme'] as const

interface Palette {
  colors: string[]
  name: string
}

const palettes: Palette[] = [
  { name: 'DEFAULT', colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] },
  { name: 'CYANMAG', colors: ['#00ffff', '#ff00ff'] },
  { name: 'MONO', colors: ['#111111', '#666666', '#bbbbbb'] },
  { name: 'ACID', colors: ['#a3e635', '#facc15', '#f43f5e'] },
]

const colors = ref<string[]>([...palettes[0]!.colors])
const intensity = ref(4)
const speed = ref(500)
const showScanLines = ref(true)
const replayKey = ref(0)

const activeTrigger = ref<(typeof triggerModes)[number]>('hover')
const glitchState = ref('idle')
const glitchRef = ref<any>(null)

const readouts = ref({
  layers: 'pending',
  overflow: 'pending',
  scanLines: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

/** Counts the clone layers the intensity preset actually rendered, plus the scan lines. */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  if (!root) {
    return
  }

  const layers = root.querySelectorAll('.text-glitch-layer').length
  const lines = root.querySelectorAll('[class*="bg-white/20"]').length

  readouts.value = {
    layers: String(layers),
    overflow: getComputedStyle(root).overflow,
    scanLines: showScanLines.value ? String(lines) : 'hidden by prop',
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
