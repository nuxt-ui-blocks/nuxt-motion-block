<template>
  <div class="space-y-6 p-6">
    <UPageHeader
      title="Exposure Slider"
      description="A notched EV scale with a spring-settled track and a progress ring. Translated from smoothui's exposure-slider."
    />

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Live slider
        </p>
      </template>
      <div class="space-y-6">
        <MExposureSlider
          :label="label"
          :accent-color="accent"
          :default-value="safeDefault"
          :disabled="disabled"
          :max="max"
          :min="min"
          :show-indicator="showIndicator"
          :step="step"
          @change="onChange"
        />

        <p class="text-sm text-muted">
          Drag the track, or focus it and use the arrow keys. Page Up/Down moves
          by ten notches, Home and End jump to the ends.
        </p>

        <div class="grid gap-3 sm:grid-cols-4">
          <div
            v-for="item in readouts"
            :key="item.key"
            class="rounded-lg border border-default p-3"
          >
            <p class="text-xs text-dimmed">
              {{ item.key }}
            </p>
            <p
              class="font-mono text-lg font-semibold text-highlighted"
              :data-demo-readout="item.key"
            >
              {{ item.value }}
            </p>
          </div>
        </div>

        <p
          v-if="lastChange !== null"
          class="text-xs text-dimmed"
          data-demo-last-change
        >
          last change: {{ lastChange }}
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Controls
        </p>
      </template>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UFormField
          label="min"
          :hint="`${min}`"
        >
          <UInput
            v-model.number="min"
            type="number"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="max"
          :hint="`${max}`"
        >
          <UInput
            v-model.number="max"
            type="number"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="step"
          :hint="`${step}`"
        >
          <UInput
            v-model.number="step"
            type="number"
            min="1"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="default value"
          :hint="`${safeDefault} (clamped into range)`"
        >
          <UInput
            v-model.number="defaultValue"
            type="number"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="label"
          :hint="label"
        >
          <UInput
            v-model="label"
            class="w-full"
          />
        </UFormField>

        <div class="space-y-3">
          <p class="text-sm font-medium text-highlighted">
            accent
          </p>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="option in ACCENTS"
              :key="option.value"
              size="sm"
              :variant="accent === option.value ? 'solid' : 'outline'"
              @click="accent = option.value"
            >
              {{ option.label }}
            </UButton>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <label class="flex items-center gap-2 text-sm">
            <USwitch v-model="showIndicator" />
            indicator
          </label>
          <label class="flex items-center gap-2 text-sm">
            <USwitch v-model="disabled" />
            disabled
          </label>
        </div>

        <UButton
          class="justify-self-start"
          color="neutral"
          variant="outline"
          @click="reset"
        >
          Reset
        </UButton>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Asymmetric range
        </p>
      </template>
      <div class="space-y-4">
        <p class="text-sm text-muted">
          The centre of travel follows
          <code>defaultValue</code>, so the scale does not have to be symmetric
          around zero. Here the range is -5 to 10 in steps of 3.
        </p>
        <MExposureSlider
          accent-color="var(--color-emerald-500, oklch(0.7 0.17 160))"
          :default-value="0"
          label="Aperture"
          :max="10"
          :min="-5"
          :step="3"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const ACCENTS = [
  { label: 'brand', value: 'var(--color-brand, oklch(0.65 0.25 12))' },
  { label: 'amber', value: 'oklch(0.75 0.16 75)' },
  { label: 'sky', value: 'oklch(0.7 0.15 235)' },
  { label: 'violet', value: 'oklch(0.65 0.2 300)' },
]

const min = ref(-20)
const max = ref(20)
const step = ref(1)
const defaultValue = ref(0)
const label = ref('Exposure')
const showIndicator = ref(true)
const disabled = ref(false)
const accent = ref(ACCENTS[0]!.value)

const value = ref(0)
const changeCount = ref(0)
const lastChange = ref<number | null>(null)

/**
 * The centre of travel is derived from `defaultValue`, so a value outside the
 * range would push the track off its notches. Clamping here keeps the controls
 * above free to produce nonsense without breaking the rig.
 */
const safeDefault = computed(() => Math.max(min.value, Math.min(max.value, defaultValue.value)))

const normalized = computed(() => {
  const span = max.value - min.value
  if (span === 0) return 0
  return ((value.value - min.value) / span) * 2 - 1
})

/** Mirrors the component's own derivation, so a wrong formula shows up here too. */
const notchCount = computed(() => Math.floor((max.value - min.value) / step.value) + 1)

const readouts = computed(() => [
  { key: 'value', value: `${value.value}` },
  { key: 'normalized', value: normalized.value.toFixed(3) },
  { key: 'notches', value: `${notchCount.value}` },
  { key: 'change events', value: `${changeCount.value}` },
])

function onChange(next: number) {
  value.value = next
  changeCount.value += 1
  lastChange.value = next
}

function reset() {
  min.value = -20
  max.value = 20
  step.value = 1
  defaultValue.value = 0
  label.value = 'Exposure'
  showIndicator.value = true
  disabled.value = false
  accent.value = ACCENTS[0]!.value
  value.value = 0
  changeCount.value = 0
  lastChange.value = null
}
</script>
