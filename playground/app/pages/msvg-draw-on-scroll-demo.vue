<script setup lang="ts">
import { ref } from 'vue'

const strokeWidth = ref(2)
const once = ref(false)
const showMarker = ref(true)
const offsetEnd = ref(0.6)

const stroke = 'var(--color-brand)'

const signature = 'M18 92 C 30 26, 62 12, 96 44 S 158 96, 190 52'

const subtitle = 'M28 100 C 46 78, 70 74, 96 92 S 146 120, 176 92'

// Each example gets its own scroll panel. Two instances sharing the window
// scroll would read the same page-level progress, so their offset ranges
// overlap and only the last one appears to draw.
const firstPanel = ref<HTMLElement | null>(null)
const secondPanel = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="SvgDrawOnScroll"
      description="SVG paths that draw themselves as you scroll. Each path owns a sub-range of the scroll, so several paths can be sequenced into one drawing instead of all finishing together."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Two paths, sequenced
        </p>
        <p class="text-muted">
          <code>pathLength</code> is normalised to <code>1</code>, so scroll
          progress maps straight onto drawn length with no per-path measurement.
        </p>
      </template>

      <!--
        `relative` is load-bearing: Motion walks offsetParent from the target up
        to the scroll container, so the container has to be one. Without it the
        offsets are shifted by the panel's distance down the document and the
        range no longer matches what you see.
      -->
      <div
        ref="firstPanel"
        class="relative h-[500px] overflow-y-auto overscroll-contain"
      >
        <div class="h-[420px]" />

        <MSvgDrawOnScroll
          class="mx-auto w-full max-w-lg"
          :container="() => firstPanel"
          :offset="['start 0.9', `end ${offsetEnd}`]"
          :once="once"
          :paths="[signature, subtitle]"
          :stroke="stroke"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          viewBox="0 0 220 120"
        >
          <template
            v-if="showMarker"
            #marker
          >
            <circle
              r="6"
              fill="var(--color-brand-light)"
              stroke="var(--color-brand)"
              stroke-width="2"
            />
          </template>
        </MSvgDrawOnScroll>

        <div class="h-[340px]" />
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Stroke width — {{ strokeWidth }}px
          </p>
          <USlider
            v-model="strokeWidth"
            :max="8"
            :min="0.5"
            :step="0.5"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            End offset — {{ offsetEnd.toFixed(2) }}
          </p>
          <USlider
            v-model="offsetEnd"
            :max="0.95"
            :min="0.2"
            :step="0.05"
          />
        </div>

        <div class="space-y-2 pt-4">
          <USwitch
            v-model="once"
            label="Once (latch at completion)"
          />
          <USwitch
            v-model="showMarker"
            label="Show tip marker"
          />
        </div>
      </div>

      <p class="text-muted mt-4 text-sm">
        The marker is placed with
        <code>getPointAtLength()</code> +
        <code>getScreenCTM()</code> +
        <code>DOMPoint.matrixTransform</code>, not CSS
        <code>offset-path</code>. <code>offset-path</code> resolves in CSS
        pixels while <code>d</code> is in viewBox units, so the two drift apart
        as soon as the viewBox and the rendered box differ in scale.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Single path, square viewBox
        </p>
        <p class="text-muted">
          A <code>0 0 100 100</code> viewBox rendered into a wide box is the case
          that breaks an <code>offset-path</code> marker.
        </p>
      </template>

      <div
        ref="secondPanel"
        class="relative h-[500px] overflow-y-auto overscroll-contain"
      >
        <div class="h-[420px]" />

        <MSvgDrawOnScroll
          class="mx-auto w-full max-w-2xl"
          :container="() => secondPanel"
          :offset="['start 0.95', 'end 0.55']"
          :path="'M50 8 C 12 30 12 70 50 92 C 88 70 88 30 50 8 Z'"
          stroke="var(--color-success)"
          :stroke-width="3"
          stroke-linejoin="round"
          viewBox="0 0 100 100"
        />

        <div class="h-[340px]" />
      </div>
    </UCard>
  </div>
</template>
