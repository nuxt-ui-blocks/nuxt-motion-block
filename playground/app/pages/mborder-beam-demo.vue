<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BorderBeamRadius } from '../../../src/runtime/components/BorderBeam.vue'

const beams = ref(1)
const duration = ref(6)
const size = ref(72)
const borderWidth = ref(1)
const pauseOnHover = ref(true)
const reverse = ref(false)
const active = ref(true)
const radius = ref<string>('16')

// The input is free text, but the component only understands a pixel number or
// the `squircle` keyword, so anything unparseable falls back to its default.
const numericRadius = computed<BorderBeamRadius>(() => {
  const parsed = Number.parseFloat(radius.value)
  return Number.isNaN(parsed) ? 16 : parsed
})

const beamCounts = [1, 2, 3, 4]
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="BorderBeam"
      description="Light that rides the outline of its own container. The comet is a dash stroked along the border path, so it is curved by construction and can never drift off the edge."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Beams, direction and speed
        </p>
        <p class="text-muted">
          Each beam is phase-offset around the loop. Watch the
          <code>stroke-dashoffset</code> of the four stacked core dashes and the
          blurred halo to confirm the comet is actually moving.
        </p>
      </template>

      <div class="flex justify-center">
        <MBorderBeam
          :active="active"
          :beams="beams"
          :border-width="borderWidth"
          class="flex h-32 w-48 items-center justify-center rounded-2xl border border-default bg-elevated/50"
          color-from="var(--color-brand)"
          color-to="var(--color-brand-light)"
          :duration="duration"
          :pause-on-hover="pauseOnHover"
          :radius="numericRadius"
          :reverse="reverse"
          :size="size"
        >
          <p class="text-center text-sm font-medium text-muted">
            {{ active ? 'Hover to pause' : 'Paused' }}
          </p>
        </MBorderBeam>
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Beams
          </p>
          <div class="flex gap-2">
            <UButton
              v-for="count in beamCounts"
              :key="count"
              :label="String(count)"
              :color="beams === count ? 'primary' : 'neutral'"
              :variant="beams === count ? 'solid' : 'outline'"
              size="sm"
              @click="beams = count"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Radius
          </p>
          <USelectMenu
            v-model="radius"
            :items="[{ label: 'Square (0)', value: '0' }, { label: 'Rounded (16)', value: '16' }, { label: 'Round (999)', value: '999' }, { label: 'Squircle', value: 'squircle' }]"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Lap duration — {{ duration }}s
          </p>
          <USlider
            v-model="duration"
            :min="1"
            :max="20"
            :step="0.5"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Comet length — {{ size }}px
          </p>
          <USlider
            v-model="size"
            :min="10"
            :max="400"
            :step="2"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Border width — {{ borderWidth }}px
          </p>
          <USlider
            v-model="borderWidth"
            :min="1"
            :max="8"
            :step="0.5"
          />
        </div>

        <div class="space-y-2 pt-6">
          <USwitch
            v-model="active"
            label="Active"
          />
          <USwitch
            v-model="reverse"
            label="Reverse"
          />
          <USwitch
            v-model="pauseOnHover"
            label="Pause on hover"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Bright palette, thick border
        </p>
        <p class="text-muted">
          The halo stop is pushed 68% towards white before it is blurred. A dark
          blur is a shadow, so a beam colour that is not lightened first would
          darken its own fringe instead of glowing.
        </p>
      </template>

      <div class="flex justify-center">
        <MBorderBeam
          :beams="3"
          :border-width="3"
          class="flex h-40 w-64 items-center justify-center rounded-[2rem] border border-default bg-default"
          color-from="var(--color-success)"
          color-to="var(--color-warning)"
          :duration="3"
          :pause-on-hover="true"
          radius="squircle"
          :size="220"
        >
          <p class="text-2xl font-semibold tracking-tight">
            Squircle path
          </p>
        </MBorderBeam>
      </div>
    </UCard>
  </div>
</template>
