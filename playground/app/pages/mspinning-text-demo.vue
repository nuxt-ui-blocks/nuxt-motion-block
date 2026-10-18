<template>
  <div class="space-y-12">
    <UPageHeader
      title="SpinningText"
      description="Characters arranged on a circle that rotates as one group, forever."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each letter is absolutely positioned at the container's centre, rotated by
        <code class="font-mono">360 / length × index</code> and pushed out by
        <code class="font-mono">radius</code> characters, while the container turns a full
        <code class="font-mono">360deg</code> on a linear infinite timeline. A visually hidden span
        keeps the full string readable by screen readers.
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
        <MSpinningText
          :key="`${trigger}-${duration}-${radius}-${fontSize}`"
          :class-name="'h-48 w-48'"
          :duration="duration"
          :font-size="fontSize"
          :radius="radius"
          :reverse="reverse"
          :children="label"
          data-testid="basic"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-3">
        <UFormField
          label="duration"
          :hint="`${duration}s per rotation`"
        >
          <USlider
            v-model="duration"
            :max="20"
            :min="1"
            :step="0.5"
          />
        </UFormField>
        <UFormField
          label="radius"
          :hint="`${radius}ch`"
        >
          <USlider
            v-model="radius"
            :max="10"
            :min="2"
            :step="0.5"
          />
        </UFormField>
        <UFormField
          label="fontSize"
          :hint="`${fontSize}rem`"
        >
          <USlider
            v-model="fontSize"
            :max="3"
            :min="0.5"
            :step="0.25"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          characters
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-letters"
        >
          {{ label.length }}
        </dd>
        <dt class="text-muted">
          direction
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-direction"
        >
          {{ reverse ? 'reverse' : 'forward' }}
        </dd>
        <dt class="text-muted">
          degrees per letter
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-degrees"
        >
          {{ (360 / label.length).toFixed(1) }}
        </dd>
        <dt class="text-muted">
          transition
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-transition"
        >
          linear, repeat Infinity
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Direction and speed
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">reverse</code> flips the container's target from
        <code class="font-mono">360</code> to <code class="font-mono">-360</code>, and
        <code class="font-mono">duration</code> is the only lever on speed because the ease is pinned
        to linear. Speeds come from an <code class="font-mono">as const</code> preset list.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="speed in speeds"
          :key="speed.label"
          :label="`${speed.label} (${speed.duration}s)`"
          :variant="speed.duration === duration && speed.reverse === reverse ? 'solid' : 'outline'"
          :data-testid="`speed-${speed.label}`"
          @click="applySpeed(speed)"
        />
        <UButton
          :label="reverse ? 'Forward' : 'Reverse'"
          icon="i-lucide-refresh-cw"
          variant="outline"
          data-testid="toggle-reverse"
          @click="reverse = !reverse; replay()"
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
        <MSpinningText
          :key="`${trigger}-${speedLabel}`"
          :class-name="'h-40 w-40'"
          :duration="duration"
          :font-size="1"
          :radius="5"
          :reverse="reverse"
          :children="label"
          data-testid="speed"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speed"
        >
          {{ speedLabel }}
        </dd>
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
          reverse
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reverse"
        >
          {{ reverse ? 'true' : 'false' }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Size presets
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">fontSize</code> is in rem and <code class="font-mono">radius</code> is
        in <code class="font-mono">ch</code> of that letter, so raising fontSize grows the circle too.
        The container itself gets no width from its children — the sizing class is what keeps the
        circle centred in the box.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="preset in sizePresets"
          :key="preset.label"
          :label="preset.label"
          :variant="preset.label === activeSize ? 'solid' : 'outline'"
          :data-testid="`size-${preset.label}`"
          @click="applySize(preset)"
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
        <MSpinningText
          :key="`${trigger}-${activeSize}`"
          :class-name="sizeClass"
          :duration="duration"
          :font-size="activeSize === 'Small' ? 0.75 : activeSize === 'Large' ? 1.5 : 1"
          :radius="activeSize === 'Small' ? 4 : activeSize === 'Large' ? 6 : 5"
          :children="label"
          data-testid="size"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-size"
        >
          {{ activeSize }}
        </dd>
        <dt class="text-muted">
          className
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-class"
        >
          {{ sizeClass }}
        </dd>
        <dt class="text-muted">
          options
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-size-presets"
        >
          {{ sizePresets.map(preset => preset.label).join(', ') }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const label = 'keep moving forward'
const trigger = ref(false)
const duration = ref(10)
const radius = ref(5)
const fontSize = ref(1)
const reverse = ref(false)
const speedLabel = ref('Steady')
const activeSize = ref('Medium')

const speeds = [
  { label: 'Slow', duration: 14, reverse: false },
  { label: 'Steady', duration: 8, reverse: false },
  { label: 'Fast', duration: 3, reverse: false },
  { label: 'Reverse', duration: 8, reverse: true },
] as const

const sizePresets = [
  { label: 'Small', className: 'h-32 w-32 text-primary' },
  { label: 'Medium', className: 'h-44 w-44 text-primary' },
  { label: 'Large', className: 'h-56 w-56 text-primary' },
] as const

const sizeClass = ref<string>(sizePresets[1].className)

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applySpeed(speed: (typeof speeds)[number]) {
  speedLabel.value = speed.label
  duration.value = speed.duration
  reverse.value = speed.reverse
  replay()
}

function applySize(preset: (typeof sizePresets)[number]) {
  activeSize.value = preset.label
  sizeClass.value = preset.className
  replay()
}
</script>
