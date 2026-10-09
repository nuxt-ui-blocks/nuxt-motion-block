<template>
  <div class="space-y-12">
    <UPageHeader
      title="CountingNumber"
      description="A number that counts from one bound to another on requestAnimationFrame."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Progress is measured from <code class="font-mono">performance.now()</code> rather than
        accumulated per frame, so the count stays honest even when frames are dropped. Direction is
        just the sign of <code class="font-mono">to − from</code>, and Replay remounts to re-run the
        whole trip. The component both emits <code class="font-mono">complete</code> and calls its
        declared <code class="font-mono">onComplete</code> prop, so the counter below steps twice per
        run.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="preset in countPresets"
          :key="preset.label"
          :label="preset.label"
          :variant="preset.label === activeCount ? 'solid' : 'outline'"
          :data-testid="`preset-${preset.label}`"
          @click="applyCount(preset)"
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
        <MCountingNumber
          :key="`${trigger}-${activeCount}`"
          :delay="delay"
          :duration="duration"
          :format="formatFn"
          :from="from"
          :to="to"
          class="text-5xl font-bold text-highlighted"
          data-testid="basic"
          @complete="completeCount++"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="duration"
          :hint="`${duration}s`"
        >
          <USlider
            v-model="duration"
            :max="10"
            :min="0.2"
            :step="0.2"
          />
        </UFormField>
        <UFormField
          label="delay"
          :hint="`${delay}ms`"
        >
          <USlider
            v-model="delay"
            :max="3000"
            :min="0"
            :step="100"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          from → to
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-range"
        >
          {{ from }} → {{ to }}
        </dd>
        <dt class="text-muted">
          frames
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-frames"
        >
          ~{{ Math.round(duration * 60) }}
        </dd>
        <dt class="text-muted">
          preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-preset"
        >
          {{ activeCount }}
        </dd>
        <dt class="text-muted">
          complete events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-complete"
        >
          {{ completeCount }}
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
        <code class="font-mono">format</code> receives the raw interpolated value every frame — round it
        yourself if you do not want decimal jitter. Options come from an
        <code class="font-mono">as const</code> list and apply without restarting the count.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in formats"
          :key="option.label"
          :label="option.label"
          :variant="option.label === activeFormat ? 'solid' : 'outline'"
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
        <MCountingNumber
          :key="`format-${activeFormat}-${trigger}`"
          :delay="delay"
          :duration="duration"
          :format="formatFn"
          :from="from"
          :to="to"
          class="text-5xl font-bold text-primary"
          data-testid="format"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active format
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-active-format"
        >
          {{ activeFormat }}
        </dd>
        <dt class="text-muted">
          options
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-formats"
        >
          {{ formats.map(option => option.label).join(', ') }}
        </dd>
        <dt class="text-muted">
          applied on
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-applied"
        >
          every frame
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Start conditions
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">startOnView</code> the count waits for an intersection observer;
        with it off the count begins the moment the component mounts. <code class="font-mono">once</code>
        stops any later restart, and <code class="font-mono">inViewMargin</code> is passed straight to
        the observer's rootMargin.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="startOnView ? 'startOnView: true' : 'startOnView: false'"
          variant="outline"
          data-testid="toggle-start-on-view"
          @click="startOnView = !startOnView; replay()"
        />
        <UButton
          :label="once ? 'once: true' : 'once: false'"
          variant="outline"
          data-testid="toggle-once"
          @click="once = !once; replay()"
        />
        <UButton
          v-for="margin in margins"
          :key="margin"
          :label="`margin: ${margin}`"
          :variant="margin === inViewMargin ? 'solid' : 'outline'"
          :data-testid="`margin-${margin}`"
          @click="inViewMargin = margin; replay()"
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
        <MCountingNumber
          :key="`${trigger}-view-${startOnView}-${once}-${inViewMargin}`"
          :delay="delay"
          :duration="duration"
          :from="from"
          :in-view-margin="inViewMargin"
          :once="once"
          :start-on-view="startOnView"
          :to="to"
          class="text-5xl font-bold text-highlighted"
          data-testid="view"
          @complete="viewCompleteCount++"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          startOnView
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-start-on-view"
        >
          {{ startOnView ? 'true' : 'false' }}
        </dd>
        <dt class="text-muted">
          once
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-once"
        >
          {{ once ? 'true' : 'false' }}
        </dd>
        <dt class="text-muted">
          inViewMargin
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-margin"
        >
          {{ inViewMargin }}
        </dd>
        <dt class="text-muted">
          complete events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-view-complete"
        >
          {{ viewCompleteCount }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const trigger = ref(false)
const from = ref(0)
const to = ref(100)
const duration = ref(2)
const delay = ref(0)
const activeCount = ref('Count up')
const activeFormat = ref('Locale')
const completeCount = ref(0)
const viewCompleteCount = ref(0)
const startOnView = ref(true)
const once = ref(false)
const inViewMargin = ref('0px')

const countPresets = [
  { label: 'Count up', from: 0, to: 100 },
  { label: 'Count down', from: 100, to: 0 },
  { label: 'Large', from: 0, to: 250000 },
] as const

const formats = [
  { label: 'Locale', fn: (v: number) => Math.round(v).toLocaleString() },
  { label: 'Padded', fn: (v: number) => Math.round(v).toString().padStart(5, '0') },
  { label: 'Percent', fn: (v: number) => `${Math.round(v)}%` },
  { label: 'Fixed', fn: (v: number) => v.toFixed(1) },
] as const

const margins = ['0px', '100px', '-50px'] as const

const formatFn = ref<(v: number) => string>(formats[0].fn)

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applyCount(preset: (typeof countPresets)[number]) {
  activeCount.value = preset.label
  from.value = preset.from
  to.value = preset.to
  replay()
}

function applyFormat(option: (typeof formats)[number]) {
  activeFormat.value = option.label
  formatFn.value = option.fn
}
</script>
