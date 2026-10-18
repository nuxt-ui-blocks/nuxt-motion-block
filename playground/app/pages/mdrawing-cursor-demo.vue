<script setup lang="ts">
import { ref } from 'vue'

const color = ref('var(--color-brand)')
const lineWidth = ref(4)
const taper = ref(true)
const smoothing = ref(0.6)
// `decay` is a millisecond lifetime, not a 0..1 ratio. A sub-1 value retires
// every sampled point before the next frame can draw it, which collapses the
// whole stroke down to the single in-flight sample — a bare dot tracking the
// pointer instead of ink.
const decay = ref(900)
const blend = ref<'source-over' | 'lighter'>('source-over')
const clearOnLeave = ref(true)
const paused = ref(false)

/** Only the two methods `defineExpose` publishes — the canvas itself is internal. */
interface PenHandle {
  clear?: () => void
  toDataURL?: () => string
}

const penRef = ref<PenHandle | null>(null)
const bytes = ref(0)

function clear() {
  penRef.value?.clear?.()
  bytes.value = 0
}

function save() {
  const url = penRef.value?.toDataURL?.()
  bytes.value = url ? url.length : 0
}
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="DrawingCursor"
      description="Ink that follows the pointer. Points are captured at the sub-frame rate the OS actually reports, so a fast flick still draws a smooth line rather than a polyline."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Draw here
        </p>
        <p class="text-muted">
          Stroke width tapers with pointer speed, and each point fades by
          <code>decay</code> so old ink recedes instead of being erased. A gap
          over 120ms starts a new stroke, which is what stops a slow pause from
          drawing a line back across the shape.
        </p>
      </template>

      <MDrawingCursor
        ref="penRef"
        :blend="blend"
        class="h-80 w-full touch-none rounded-2xl border border-default bg-elevated/50"
        :clear-on-leave="clearOnLeave"
        :color="color"
        :decay="decay"
        :line-width="lineWidth"
        :paused="paused"
        :smoothing="smoothing"
        :taper="taper"
      />

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Base width — {{ lineWidth }}px
          </p>
          <USlider
            v-model="lineWidth"
            :max="20"
            :min="1"
            :step="1"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Thins the stroke as the pointer speeds up
          </p>
          <USwitch v-model="taper" />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Smoothing — {{ smoothing.toFixed(2) }}
          </p>
          <USlider
            v-model="smoothing"
            :max="1"
            :min="0"
            :step="0.05"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Alpha decay — {{ decay }}ms
          </p>
          <USlider
            v-model="decay"
            :max="2000"
            :min="0"
            :step="10"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Blend
          </p>
          <USelectMenu
            v-model="blend"
            :items="[{ label: 'source-over', value: 'source-over' }, { label: 'lighter', value: 'lighter' }]"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-2 pt-6">
          <USwitch
            v-model="clearOnLeave"
            label="Clear on leave"
          />
          <USwitch
            v-model="paused"
            label="Paused"
          />
        </div>
      </div>

      <div class="mt-6 flex flex-wrap items-center gap-2">
        <UButton
          icon="i-lucide-eraser"
          label="Clear"
          color="neutral"
          variant="outline"
          @click="clear"
        />
        <UButton
          icon="i-lucide-download"
          label="Export PNG data URL"
          color="neutral"
          variant="subtle"
          @click="save"
        />
        <span
          v-if="bytes"
          class="text-muted text-sm"
        >
          Last export: {{ bytes.toLocaleString() }} chars
        </span>
      </div>
    </UCard>
  </div>
</template>
