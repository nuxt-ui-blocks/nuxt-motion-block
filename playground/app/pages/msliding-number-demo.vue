<template>
  <div class="space-y-12">
    <UPageHeader
      title="SlidingNumber"
      description="Odometer digits that spring to their new position instead of teleporting."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every place gets its own slot containing a 0–9 stack; each glyph springs toward the digit it
        represents and the shortest path around the ring wins, so 9 → 0 rolls up one step instead of
        shooting back through ten. Replay drops the value to zero first, then restores it so you can
        watch the whole wheel re-roll.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="-1"
          icon="i-lucide-minus"
          variant="outline"
          data-testid="decrease"
          @click="value = value - 1"
        />
        <UButton
          label="+1"
          icon="i-lucide-plus"
          variant="outline"
          data-testid="increase"
          @click="value = value + 1"
        />
        <UButton
          label="+250"
          icon="i-lucide-plus"
          variant="outline"
          data-testid="increase-large"
          @click="value = value + 250"
        />
        <UButton
          label="Random"
          icon="i-lucide-shuffle"
          variant="outline"
          data-testid="random"
          @click="value = Math.round(Math.random() * 9999)"
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
        <MSlidingNumber
          :key="Number(trigger)"
          :decimal-separator="decimalSeparator"
          :pad-start="padStart"
          :precision="precision"
          :value="value"
          class="text-6xl font-bold text-highlighted"
          data-testid="basic"
        />
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
          digit slots
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-slots"
        >
          {{ digitCount }}
        </dd>
        <dt class="text-muted">
          spring
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spring"
        >
          280 / 18 / 0.3
        </dd>
        <dt class="text-muted">
          sign
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-sign"
        >
          {{ value < 0 ? 'separate glyph' : 'none' }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Precision and separator
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">precision</code> forces a fixed number of decimals (the default
        <code class="font-mono">null</code> shows only what the number has), and
        <code class="font-mono">decimalSeparator</code> swaps the literal between the groups.
        <code class="font-mono">padStart</code> only zero-pads a single-digit integer, so it is visible
        on 0–9 and nowhere else. All three options are listed in <code class="font-mono">as const</code>.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in precisionOptions"
          :key="String(option)"
          :label="option === null ? 'precision: null' : `precision: ${option}`"
          :variant="option === precision ? 'solid' : 'outline'"
          :data-testid="`precision-${option}`"
          @click="precision = option; replay()"
        />
        <UButton
          v-for="separator in separators"
          :key="separator"
          :label="`separator: ${separator}`"
          :variant="separator === decimalSeparator ? 'solid' : 'outline'"
          :data-testid="`separator-${separator}`"
          @click="decimalSeparator = separator; replay()"
        />
        <UButton
          :label="padStart ? 'padStart: true' : 'padStart: false'"
          variant="outline"
          data-testid="toggle-pad-start"
          @click="padStart = !padStart; replay()"
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
        <MSlidingNumber
          :key="`${trigger}-format`"
          :decimal-separator="decimalSeparator"
          :pad-start="padStart"
          :precision="precision"
          :value="value"
          class="text-6xl font-bold text-primary"
          data-testid="format"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          precision
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-precision"
        >
          {{ precision === null ? 'null' : precision }}
        </dd>
        <dt class="text-muted">
          separator
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-separator"
        >
          {{ decimalSeparator }}
        </dd>
        <dt class="text-muted">
          padStart
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-pad-start"
        >
          {{ padStart ? 'true' : 'false' }}
        </dd>
        <dt class="text-muted">
          rendered
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rendered"
        >
          {{ renderedPreview }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sign and scale
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        A negative value renders an extra <code class="font-mono">-</code> span in front of the wheels
        while the slots themselves animate on <code class="font-mono">Math.abs(value)</code>. Growing
        the integer part inserts a new slot on the left for the added place; it appears in place with
        no entrance animation while the existing wheels spring to their new digits.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="preset in valuePresets"
          :key="preset.label"
          :label="preset.label"
          :variant="preset.value === value ? 'solid' : 'outline'"
          :data-testid="`value-${preset.label}`"
          @click="applyValue(preset)"
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
        <MSlidingNumber
          :key="`${trigger}-sign`"
          :decimal-separator="decimalSeparator"
          :pad-start="padStart"
          :precision="precision"
          :value="value"
          class="text-6xl font-bold text-highlighted"
          data-testid="sign"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-value-preset"
        >
          {{ activeValue }}
        </dd>
        <dt class="text-muted">
          value
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-sign-value"
        >
          {{ value }}
        </dd>
        <dt class="text-muted">
          options
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-value-options"
        >
          {{ valuePresets.map(preset => preset.label).join(', ') }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

const trigger = ref(false)
const value = ref(482)
const precision = ref<number | null>(null)
const decimalSeparator = ref('.')
const padStart = ref(false)
const activeValue = ref('Positive')

const precisionOptions = [null, 0, 1, 2] as const
const separators = ['.', ','] as const

const valuePresets = [
  { label: 'Positive', value: 482 },
  { label: 'Negative', value: -137 },
  { label: 'Nine', value: 9 },
  { label: 'Thousands', value: 1250000 },
] as const

const digitCount = computed(() => {
  const digits = Math.abs(Math.trunc(value.value)).toString().length
  const decimals = precision.value ?? 0
  return digits + decimals
})

const renderedPreview = computed(() => {
  const abs = Math.abs(value.value)
  const base = precision.value === null ? String(abs) : abs.toFixed(precision.value)
  const [integerPart, decimalPart] = base.split('.')
  const padded = padStart.value && Math.abs(value.value) < 10 ? `0${integerPart}` : integerPart
  const joined = decimalPart ? `${padded}${decimalSeparator.value}${decimalPart}` : padded
  return value.value < 0 ? `-${joined}` : joined
})

function replay(targetOverride?: number) {
  const target = targetOverride ?? value.value
  trigger.value = false
  value.value = 0
  nextTick(() => {
    trigger.value = true
    nextTick(() => {
      value.value = target
    })
  })
}

function applyValue(preset: (typeof valuePresets)[number]) {
  activeValue.value = preset.label
  value.value = preset.value
  replay(preset.value)
}
</script>
