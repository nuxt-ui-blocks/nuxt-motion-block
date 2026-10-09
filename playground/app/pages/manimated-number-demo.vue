<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedNumber"
      description="A number that springs to its new value instead of jumping there."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The value feeds a Motion spring; every frame writes into a local ref that a computed
        <code class="font-mono">format</code> turns into text. Buttons move the target, Replay resets it
        to zero first so you can watch the same spring climb back up from scratch.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="-1000"
          icon="i-lucide-minus"
          variant="outline"
          data-testid="decrease"
          @click="value = Math.max(0, value - 1000)"
        />
        <UButton
          label="+1000"
          icon="i-lucide-plus"
          variant="outline"
          data-testid="increase"
          @click="value = value + 1000"
        />
        <UButton
          label="Random"
          icon="i-lucide-shuffle"
          variant="outline"
          data-testid="random"
          @click="value = Math.round(Math.random() * 100000)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <p
          class="text-5xl font-bold text-highlighted"
          data-testid="display"
        >
          <MAnimatedNumber
            :key="Number(trigger)"
            :format="formatFn"
            :spring-options="spring"
            :value="value"
          />
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          value
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-value"
        >
          {{ value }}
        </dd>
        <dt class="text-muted">
          format
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-format"
        >
          {{ activeFormatLabel }}
        </dd>
        <dt class="text-muted">
          element
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-element"
        >
          span
        </dd>
        <dt class="text-muted">
          spring
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spring"
        >
          {{ spring.stiffness }} / {{ spring.damping }} / {{ spring.mass }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Format
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">format</code> is a plain <code class="font-mono">(value: number) => string</code>
        computed over the spring's current position, so swapping it reformats the in-flight number
        without restarting anything. The four options below are an
        <code class="font-mono">as const</code> list of formatters.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in formats"
          :key="option.label"
          :label="option.label"
          :variant="option.label === activeFormatLabel ? 'solid' : 'outline'"
          :data-testid="`format-${option.label}`"
          @click="applyFormat(option)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <p class="text-5xl font-bold text-primary">
          <MAnimatedNumber
            :key="`${trigger}-format`"
            :format="formatFn"
            :value="value"
          />
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active format
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-active-format"
        >
          {{ activeFormatLabel }}
        </dd>
        <dt class="text-muted">
          input
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-format-input"
        >
          {{ value }}
        </dd>
        <dt class="text-muted">
          options
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-format-options"
        >
          {{ formats.map(option => option.label).join(', ') }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Spring
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">springOptions</code> goes straight into motion-v's
        <code class="font-mono">useSpring</code>, which only rebuilds the spring when the options
        object is replaced. The sliders below edit the object in place, so the readout shows the live
        config while the running spring keeps its mounted one until Apply &amp; replay remounts the
        component. Preset buttons swap in a whole new object — recreating the spring on the spot — and
        re-key so you can watch the climb from zero again.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="preset in springPresets"
          :key="preset.label"
          :label="preset.label"
          :variant="preset.label === activeSpring ? 'solid' : 'outline'"
          :data-testid="`spring-${preset.label}`"
          @click="applySpring(preset)"
        />
        <UButton
          label="Apply &amp; replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="mb-8 grid gap-6 sm:grid-cols-3">
        <UFormField
          label="stiffness"
          :hint="`${spring.stiffness}`"
        >
          <USlider
            v-model="spring.stiffness"
            :max="1000"
            :min="20"
            :step="10"
          />
        </UFormField>
        <UFormField
          label="damping"
          :hint="`${spring.damping}`"
        >
          <USlider
            v-model="spring.damping"
            :max="80"
            :min="1"
            :step="1"
          />
        </UFormField>
        <UFormField
          label="mass"
          :hint="`${spring.mass}`"
        >
          <USlider
            v-model="spring.mass"
            :max="4"
            :min="0.1"
            :step="0.1"
          />
        </UFormField>
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <p class="text-5xl font-bold text-highlighted">
          <MAnimatedNumber
            :key="`${trigger}-spring-${activeSpring}`"
            :spring-options="spring"
            :value="value"
          />
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spring-preset"
        >
          {{ activeSpring }}
        </dd>
        <dt class="text-muted">
          stiffness
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stiffness"
        >
          {{ spring.stiffness }}
        </dd>
        <dt class="text-muted">
          damping
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-damping"
        >
          {{ spring.damping }}
        </dd>
        <dt class="text-muted">
          mass
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mass"
        >
          {{ spring.mass }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { SpringOptions } from 'motion-v'

const trigger = ref(false)
const value = ref(12500)
const activeFormatLabel = ref('Locale')
const activeSpring = ref('Default')

const formats = [
  { label: 'Locale', fn: (v: number) => Math.round(v).toLocaleString() },
  { label: 'Fixed', fn: (v: number) => v.toFixed(2) },
  { label: 'Currency', fn: (v: number) => `$${Math.round(v).toLocaleString()}` },
  { label: 'Percent', fn: (v: number) => `${v.toFixed(1)}%` },
] as const

const springPresets = [
  { label: 'Default', stiffness: 300, damping: 30, mass: 1 },
  { label: 'Bouncy', stiffness: 120, damping: 8, mass: 0.8 },
  { label: 'Stiff', stiffness: 700, damping: 40, mass: 1.2 },
] as const

const spring = ref<SpringOptions>({ ...springPresets[0] })
const formatFn = ref<(v: number) => string>(formats[0].fn)

function replay() {
  const target = value.value
  trigger.value = false
  value.value = 0
  nextTick(() => {
    trigger.value = true
    nextTick(() => {
      value.value = target
    })
  })
}

function applyFormat(option: (typeof formats)[number]) {
  activeFormatLabel.value = option.label
  formatFn.value = option.fn
}

function applySpring(preset: (typeof springPresets)[number]) {
  activeSpring.value = preset.label
  spring.value = { ...preset }
  replay()
}
</script>
