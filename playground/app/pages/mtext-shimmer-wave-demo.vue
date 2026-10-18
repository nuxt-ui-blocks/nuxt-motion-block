<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextShimmerWave"
      description="A shimmer whose letters travel through depth, scaled and rotated as the band passes."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each letter is its own Motion element animating
        <code class="font-mono">translateZ</code>, <code class="font-mono">translateY</code>,
        <code class="font-mono">rotateY</code>, <code class="font-mono">scale</code> and colour on an
        <code class="font-mono">Infinity</code> repeat, delayed by
        <code class="font-mono">i × duration / (spread × length)</code>. The per-character stagger is
        therefore a fraction of a second, not a fixed <code class="font-mono">0.1s</code>, and it
        tightens as the string grows.
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

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextShimmerWave
          :key="`${trigger}-${duration}-${spread}`"
          :duration="duration"
          :spread="spread"
          :text="text"
          class="text-3xl font-bold"
          data-testid="basic"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="duration"
          :hint="`${duration}s per cycle`"
        >
          <USlider
            v-model="duration"
            :max="6"
            :min="0.5"
            :step="0.1"
          />
        </UFormField>
        <UFormField
          label="spread"
          :hint="`divides each delay by ${spread}`"
        >
          <USlider
            v-model="spread"
            :max="8"
            :min="0.5"
            :step="0.5"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          {{ duration }}s
        </dd>
        <dt class="text-muted">
          letters
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-letters"
        >
          {{ text.length }}
        </dd>
        <dt class="text-muted">
          last delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stagger"
        >
          {{ ((text.length - 1) * duration / (spread * text.length)).toFixed(2) }}s
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Wave geometry
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The five distances are independent: <code class="font-mono">zDistance</code> and
        <code class="font-mono">rotateYDistance</code> give depth, while
        <code class="font-mono">xDistance</code>, <code class="font-mono">yDistance</code> and
        <code class="font-mono">scaleDistance</code> give the letter its arc. Values below come from
        the <code class="font-mono">as const</code> preset list.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="preset in wavePresets"
          :key="preset.label"
          :label="preset.label"
          :variant="preset.label === activeWave ? 'solid' : 'outline'"
          :data-testid="`wave-${preset.label}`"
          @click="applyWave(preset)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextShimmerWave
          :key="`${trigger}-${activeWave}`"
          :duration="wave.duration"
          :rotate-y-distance="wave.rotateYDistance"
          :scale-distance="wave.scaleDistance"
          :spread="wave.spread"
          :text="text"
          :x-distance="wave.xDistance"
          :y-distance="wave.yDistance"
          :z-distance="wave.zDistance"
          class="text-3xl font-bold"
          data-testid="wave"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-preset"
        >
          {{ activeWave }}
        </dd>
        <dt class="text-muted">
          zDistance
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-z"
        >
          {{ wave.zDistance }}
        </dd>
        <dt class="text-muted">
          rotateYDistance
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rotate"
        >
          {{ wave.rotateYDistance }}
        </dd>
        <dt class="text-muted">
          xDistance
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-x"
        >
          {{ wave.xDistance }}
        </dd>
        <dt class="text-muted">
          yDistance
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-y"
        >
          {{ wave.yDistance }}
        </dd>
        <dt class="text-muted">
          scaleDistance
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-scale"
        >
          {{ wave.scaleDistance }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Element
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The component takes <code class="font-mono">class</code>, not <code class="font-mono">className</code>,
        and it has no public play/pause API, so Replay remounts it to restart the CSS loop. The readout
        reports the tag the browser actually produced for each <code class="font-mono">as</code> value.
        One HTML quirk: each letter renders as a <code class="font-mono">div</code>, and the parser
        refuses <code class="font-mono">&lt;div&gt;</code> inside <code class="font-mono">&lt;p&gt;</code>,
        so every <code class="font-mono">as="p"</code> instance — including the defaults above — emits
        its letters as siblings during SSR and Vue logs a cosmetic hydration-mismatch warning on load
        while the client rebuilds the nesting. The <code class="font-mono">h1</code> and
        <code class="font-mono">span</code> instances hydrate cleanly.
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

      <div class="grid gap-4 sm:grid-cols-3">
        <div
          v-for="option in elements"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10"
        >
          <MTextShimmerWave
            :key="`${trigger}-element-${option}`"
            :as="option"
            :duration="duration"
            :text="`as ${option}`"
            class="font-bold"
            :data-testid="`element-${option}`"
          />
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt
          v-for="option in elements"
          :key="option"
          class="text-muted"
        >
          as="{{ option }}"
        </dt>
        <dd
          v-for="option in elements"
          :key="`tag-${option}`"
          class="font-mono"
          :data-testid="`readout-element-${option}`"
        >
          {{ renderedTags[option] ?? 'pending' }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const text = 'Wave through depth'
const trigger = ref(false)
const duration = ref(1)
const spread = ref(2)
const activeWave = ref('Default')
const renderedTags = ref<Record<string, string>>({})

const wavePresets = [
  { label: 'Default', duration: 1, zDistance: 10, xDistance: 2, yDistance: -2, scaleDistance: 1.1, rotateYDistance: 10, spread: 2 },
  { label: 'Subtle', duration: 1.6, zDistance: 4, xDistance: 1, yDistance: -1, scaleDistance: 1.03, rotateYDistance: 4, spread: 2 },
  { label: 'Dramatic', duration: 0.8, zDistance: 24, xDistance: 5, yDistance: -6, scaleDistance: 1.25, rotateYDistance: 28, spread: 3 },
] as const

const wave = ref<(typeof wavePresets)[number]>({ ...wavePresets[0] })

const elements = ['p', 'h1', 'span'] as const

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applyWave(preset: (typeof wavePresets)[number]) {
  activeWave.value = preset.label
  wave.value = { ...preset }
  replay()
}

onMounted(() => {
  for (const option of elements) {
    const element = document.querySelector(`[data-testid="element-${option}"]`)
    renderedTags.value[option] = element?.tagName.toLowerCase() ?? 'missing'
  }
})
</script>
