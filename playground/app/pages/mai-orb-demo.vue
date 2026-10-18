<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiOrb"
      description="A state-agnostic WebGL2 material. It knows about light, flow and thickness, and nothing about what it is representing — state belongs to AiOrbFace, which composes this. Falls back to a plain CSS radial gradient where WebGL2 is unavailable."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Palettes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Colours are interpolated in Oklab, so a palette stays perceptually even
        as it moves instead of drifting through mud. Three stops is enough to
        give the interior depth; two is enough to give it a light.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in palettes"
          :key="option.name"
          :label="option.name"
          :variant="palette === option.name ? 'solid' : 'outline'"
          :data-testid="`palette-${option.name}`"
          @click="palette = option.name"
        />
      </div>

      <div class="mb-8 flex flex-wrap items-center justify-center gap-12 rounded-2xl bg-(--ui-bg-muted) py-12">
        <MAiOrb
          :colors="activePalette"
          :size="208"
        />
        <MAiOrb
          :colors="activePalette"
          :size="96"
        />
        <MAiOrb
          :colors="activePalette"
          size="100%"
          class="w-52"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Knobs
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every number below is a live prop. Nothing is committed on a timer, so
        the material follows the slider frame by frame without rebuilding its GL
        resources — the colour stops are converted to a uniform instead.
      </p>

      <div class="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="knob in knobs"
          :key="knob.key"
          class="space-y-1"
        >
          <label
            class="flex items-baseline justify-between text-sm"
            :for="`knob-${knob.key}`"
          >
            <span>{{ knob.label }}</span>
            <span class="font-mono text-xs text-muted">{{ format(knob.value) }}</span>
          </label>
          <input
            :id="`knob-${knob.key}`"
            v-model.number="knob.value"
            class="w-full accent-primary"
            type="range"
            :min="knob.min"
            :max="knob.max"
            :step="knob.step"
          >
        </div>
      </div>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-12 rounded-2xl bg-(--ui-bg-muted) py-12">
        <MAiOrb
          v-for="option in [72, 144, 224]"
          :key="option"
          v-bind="tuned"
          :colors="activePalette"
          :size="option"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Paused
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Pause stops the render loop but keeps the last committed props. That
        distinction is the reason <code class="font-mono">paused</code> exists
        as a prop instead of a global: an orb that scrolls out of view, a
        reduced-motion user and a paused demo are three different reasons to
        stop drawing, and only the last one is a decision the author made.
      </p>

      <UButton
        :label="paused ? 'resume' : 'pause'"
        :variant="paused ? 'solid' : 'outline'"
        data-testid="pause-toggle"
        @click="paused = !paused"
      />

      <div class="mt-8 flex flex-wrap items-center justify-center gap-12 rounded-2xl bg-(--ui-bg-muted) py-12">
        <MAiOrb
          :colors="activePalette"
          :paused="paused"
          :size="176"
        />
        <div class="w-56 space-y-1 text-sm text-muted">
          <p>
            The orb is always
            <code class="font-mono">aria-hidden</code>. It is decoration, and it
            gets its meaning from whatever the label around it belongs to —
            <code class="font-mono">AiOrbFace</code> is the piece that accepts
            a label.
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Knob {
  key: string
  label: string
  value: number
  min: number
  max: number
  step: number
}

const palettes: { name: string, colors: string[] }[] = [
  { name: 'magenta', colors: ['#f25aed', '#c04bf5', '#ffffff'] },
  { name: 'ember', colors: ['#ff7a18', '#ff3d6e', '#ffe9c2'] },
  { name: 'abyss', colors: ['#1e3bd6', '#12d3d8', '#d6f7ff'] },
  { name: 'moss', colors: ['#2f7d4f', '#9ad45a', '#f2ffd9'] },
  { name: 'ink', colors: ['#1b1d2a', '#4b4f6b', '#c8cbe0'] },
]

const palette = ref('magenta')
const paused = ref(false)

const activePalette = computed(() => palettes.find(option => option.name === palette.value)?.colors ?? [])

const knobs = reactive<Knob[]>([
  { key: 'aberration', label: 'aberration', value: 0.8, min: 0, max: 3, step: 0.05 },
  { key: 'balance', label: 'balance', value: 0.5, min: 0, max: 1, step: 0.01 },
  { key: 'blobScale', label: 'blobScale', value: 3, min: 0.5, max: 8, step: 0.1 },
  { key: 'chroma', label: 'chroma', value: 1, min: 0, max: 3, step: 0.05 },
  { key: 'contrast', label: 'contrast', value: 1, min: 0, max: 2, step: 0.05 },
  { key: 'duration', label: 'duration', value: 7, min: 1, max: 20, step: 0.5 },
  { key: 'flow', label: 'flow', value: 0.6, min: 0, max: 1, step: 0.01 },
  { key: 'glow', label: 'glow', value: 0, min: 0, max: 1, step: 0.01 },
  { key: 'grain', label: 'grain', value: 0.6, min: 0, max: 1, step: 0.01 },
  { key: 'inner', label: 'inner', value: 0.6, min: 0, max: 1, step: 0.01 },
  { key: 'iridescence', label: 'iridescence', value: 0.4, min: 0, max: 1, step: 0.01 },
  { key: 'lightX', label: 'lightX', value: 0.32, min: 0, max: 1, step: 0.01 },
  { key: 'lightY', label: 'lightY', value: 0.28, min: 0, max: 1, step: 0.01 },
  { key: 'refraction', label: 'refraction', value: 0.4, min: 0, max: 1, step: 0.01 },
  { key: 'rim', label: 'rim', value: 0.5, min: 0, max: 1, step: 0.01 },
  { key: 'shading', label: 'shading', value: 0.7, min: 0, max: 1, step: 0.01 },
  { key: 'shift', label: 'shift', value: 0.15, min: -1, max: 1, step: 0.01 },
  { key: 'softness', label: 'softness', value: 0.7, min: 0, max: 1, step: 0.01 },
  { key: 'specular', label: 'specular', value: 0.6, min: 0, max: 1, step: 0.01 },
  { key: 'turbulence', label: 'turbulence', value: 0.3, min: 0, max: 1, step: 0.01 },
  { key: 'wobble', label: 'wobble', value: 0.4, min: 0, max: 1, step: 0.01 },
])

const tuned = computed(() => Object.fromEntries(knobs.map(knob => [knob.key, knob.value])))

function format(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2)
}
</script>
