<template>
  <div class="space-y-12">
    <UPageHeader
      title="VariableProximity"
      description="Letters get heavier as the cursor comes near, then relax when it leaves."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The label is split into per-character spans; a <code class="font-mono">mousemove</code> listener
        on the container measures every character's centre against the cursor, maps distance over
        <code class="font-mono">radius</code> to a 0–1 factor, and animates each span's
        <code class="font-mono">--vp-wght</code> / <code class="font-mono">--vp-opsz</code> CSS
        variables over 250ms. Needs a variable font to show anything at all — this page loads Inter var.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="sample in labels"
          :key="sample.label"
          :label="sample.label"
          :variant="sample.label === activeLabel ? 'solid' : 'outline'"
          :data-testid="`label-${sample.label}`"
          @click="applyLabel(sample)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div
        class="mb-8 grid min-h-48 place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10"
        style="font-family: 'Inter var', 'Inter', ui-sans-serif, sans-serif"
        data-testid="proximity"
      >
        <MVariableProximity
          :key="`${trigger}-${activeLabel}`"
          :label="label"
          :radius="radius"
          class="text-4xl font-bold"
          data-testid="basic"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="radius"
          :hint="`${radius}px`"
        >
          <USlider
            v-model="radius"
            :max="400"
            :min="20"
            :step="10"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          characters
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-characters"
        >
          {{ label.length }}
        </dd>
        <dt class="text-muted">
          radius
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-radius"
        >
          {{ radius }}px
        </dd>
        <dt class="text-muted">
          active label
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-label"
        >
          {{ activeLabel }}
        </dd>
        <dt class="text-muted">
          font
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-font"
        >
          Inter var
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Weight range
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">fromFontVariationSettings</code> and
        <code class="font-mono">toFontVariationSettings</code> are parsed once during setup, so each
        range below remounts the component. Ranges come from an
        <code class="font-mono">as const</code> list and only <code class="font-mono">'wght'</code> and
        <code class="font-mono">'opsz'</code> numbers are read out of the string.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="weightRange in ranges"
          :key="weightRange.label"
          :label="weightRange.label"
          :variant="weightRange.label === activeRange ? 'solid' : 'outline'"
          :data-testid="`range-${weightRange.label}`"
          @click="applyRange(weightRange)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div
        class="grid min-h-48 place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10"
        style="font-family: 'Inter var', 'Inter', ui-sans-serif, sans-serif"
        data-testid="range"
      >
        <MVariableProximity
          :key="`${trigger}-range-${activeRange}`"
          :from-font-variation-settings="range.from"
          :label="label"
          :radius="radius"
          :to-font-variation-settings="range.to"
          class="text-4xl font-bold"
          data-testid="range-text"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          range
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-range"
        >
          {{ activeRange }}
        </dd>
        <dt class="text-muted">
          from
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-from"
        >
          {{ range.from }}
        </dd>
        <dt class="text-muted">
          to
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-to"
        >
          {{ range.to }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Falloff
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The <code class="font-mono">falloff</code> prop accepts <code class="font-mono">linear</code>,
        <code class="font-mono">exponential</code> and <code class="font-mono">gaussian</code>, but the
        implementation never reads it — weight is always a straight
        <code class="font-mono">min(distance / radius, 1)</code> interpolation. The buttons only change
        the value you pass in; the motion you see stays linear.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="mode in falloffModes"
          :key="mode"
          :label="mode"
          :variant="mode === falloff ? 'solid' : 'outline'"
          :data-testid="`falloff-${mode}`"
          @click="applyFalloff(mode)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div
        class="grid min-h-48 place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10"
        style="font-family: 'Inter var', 'Inter', ui-sans-serif, sans-serif"
        data-testid="falloff"
      >
        <MVariableProximity
          :key="`${trigger}-falloff-${falloff}`"
          :falloff="falloff"
          :label="label"
          :radius="radius"
          class="text-4xl font-bold"
          data-testid="falloff-text"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          falloff
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-falloff"
        >
          {{ falloff }}
        </dd>
        <dt class="text-muted">
          wired
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-falloff-wired"
        >
          no — always linear
        </dd>
        <dt class="text-muted">
          options
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-falloff-options"
        >
          {{ falloffModes.join(', ') }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

useHead({
  link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }],
})

const trigger = ref(false)
const radius = ref(120)
const activeLabel = ref('Proximity')
const activeRange = ref('Default')
const falloff = ref<'linear' | 'exponential' | 'gaussian'>('linear')

const labels = [
  { label: 'Proximity', text: 'Move closer' },
  { label: 'Sentence', text: 'The quick brown fox jumps over the lazy dog' },
  { label: 'Digits', text: '0123456789' },
] as const

const ranges = [
  {
    label: 'Default',
    from: '\'wght\' 400, \'opsz\' 9',
    to: '\'wght\' 1000, \'opsz\' 40',
  },
  {
    label: 'Wide',
    from: '\'wght\' 100, \'opsz\' 9',
    to: '\'wght\' 900, \'opsz\' 40',
  },
  {
    label: 'Tight',
    from: '\'wght\' 600, \'opsz\' 9',
    to: '\'wght\' 650, \'opsz\' 40',
  },
] as const

const falloffModes = ['linear', 'exponential', 'gaussian'] as const

const label = ref<string>(labels[0].text)
const range = ref<{ from: string, to: string }>({ from: ranges[0].from, to: ranges[0].to })

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applyLabel(sample: (typeof labels)[number]) {
  activeLabel.value = sample.label
  label.value = sample.text
  replay()
}

function applyRange(next: (typeof ranges)[number]) {
  activeRange.value = next.label
  range.value = { from: next.from, to: next.to }
  replay()
}

function applyFalloff(mode: (typeof falloffModes)[number]) {
  falloff.value = mode
  replay()
}
</script>
