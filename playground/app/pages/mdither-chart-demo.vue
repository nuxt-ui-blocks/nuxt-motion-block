<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      DitherChart
    </h1>

    <p class="text-muted mb-8">
      Canvas-based dithered charts with Bayer matrix quantization. Draw-in animation on scroll.
    </p>

    <div class="space-y-8">
      <!-- Line -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">
              Line
            </h2>
            <UBadge
              label="default"
              variant="subtle"
            />
          </div>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="lineData"
            variant="line"
            :width="400"
            :height="200"
            label="Revenue Trend"
            caption="Monthly revenue over 12 months"
          />
        </div>
      </UCard>

      <!-- Bar -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Bar
          </h2>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="barData"
            variant="bar"
            :width="400"
            :height="200"
            label="Quarterly Sales"
          />
        </div>
      </UCard>

      <!-- Stacked -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Stacked
          </h2>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="stackedData"
            variant="stacked"
            :width="400"
            :height="200"
            label="Revenue Breakdown"
          />
        </div>
      </UCard>

      <!-- Donut -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Donut
          </h2>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="[donutData]"
            variant="donut"
            :width="240"
            :height="240"
            label="Market Share"
          />
        </div>
      </UCard>

      <!-- Gauge -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Gauge
          </h2>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="gaugeData"
            variant="gauge"
            :width="240"
            :height="200"
            label="Performance"
            caption="72% of target"
          />
        </div>
      </UCard>

      <!-- Funnel -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Funnel
          </h2>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="[funnelData]"
            variant="funnel"
            :width="320"
            :height="200"
            label="Conversion Funnel"
          />
        </div>
      </UCard>

      <!-- Heatmap -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Heatmap
          </h2>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="heatmapData"
            variant="heatmap"
            :width="400"
            :height="200"
            label="Activity by Day"
          />
        </div>
      </UCard>

      <!-- Bubbles -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Bubbles
          </h2>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="bubbleData"
            variant="bubbles"
            :width="400"
            :height="200"
            label="Visitor activity"
          />
        </div>
      </UCard>

      <!-- Configurations -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Pixel Sizes
          </h2>
        </template>
        <div class="flex items-end justify-center gap-6 py-4 flex-wrap">
          <div class="text-center">
            <MDitherChart
              :data="lineData"
              variant="line"
              :pixel-size="2"
              :width="160"
              :height="120"
            />
            <span class="text-xs text-muted mt-1 block">pixel: 2</span>
          </div>
          <div class="text-center">
            <MDitherChart
              :data="lineData"
              variant="line"
              :pixel-size="4"
              :width="160"
              :height="120"
            />
            <span class="text-xs text-muted mt-1 block">pixel: 4</span>
          </div>
          <div class="text-center">
            <MDitherChart
              :data="lineData"
              variant="line"
              :pixel-size="6"
              :width="160"
              :height="120"
            />
            <span class="text-xs text-muted mt-1 block">pixel: 6</span>
          </div>
        </div>
      </UCard>

      <!-- Matrix orders -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Bayer Matrix Orders
          </h2>
        </template>
        <div class="flex items-end justify-center gap-6 py-4 flex-wrap">
          <div class="text-center">
            <MDitherChart
              :data="barData"
              variant="bar"
              :matrix="2"
              :width="160"
              :height="120"
            />
            <span class="text-xs text-muted mt-1 block">2×2 (coarse)</span>
          </div>
          <div class="text-center">
            <MDitherChart
              :data="barData"
              variant="bar"
              :matrix="4"
              :width="160"
              :height="120"
            />
            <span class="text-xs text-muted mt-1 block">4×4 (default)</span>
          </div>
          <div class="text-center">
            <MDitherChart
              :data="barData"
              variant="bar"
              :matrix="8"
              :width="160"
              :height="120"
            />
            <span class="text-xs text-muted mt-1 block">8×8 (fine)</span>
          </div>
        </div>
      </UCard>

      <!-- No Animation -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            No Animation
          </h2>
        </template>
        <div class="flex justify-center py-4">
          <MDitherChart
            :data="lineData"
            variant="line"
            :animate="false"
            :width="400"
            :height="200"
            label="Instant Render"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DitherChartSeries } from '../../../src/runtime/components/DitherChart.vue'

const lineData: DitherChartSeries[] = [
  {
    name: 'Revenue',
    points: [
      { value: 30 }, { value: 45 }, { value: 35 }, { value: 55 },
      { value: 48 }, { value: 62 }, { value: 58 }, { value: 75 },
      { value: 68 }, { value: 82 }, { value: 78 }, { value: 95 },
    ],
  },
]

const barData: DitherChartSeries[] = [
  {
    name: 'Direct',
    points: [{ value: 40 }, { value: 65 }, { value: 50 }, { value: 80 }],
  },
  {
    name: 'Organic',
    points: [{ value: 25 }, { value: 40 }, { value: 35 }, { value: 55 }],
  },
]

const stackedData: DitherChartSeries[] = [
  {
    name: 'Subscriptions',
    points: [{ value: 30 }, { value: 45 }, { value: 40 }, { value: 55 }],
  },
  {
    name: 'One-time',
    points: [{ value: 20 }, { value: 15 }, { value: 25 }, { value: 20 }],
  },
  {
    name: 'Enterprise',
    points: [{ value: 10 }, { value: 20 }, { value: 15 }, { value: 30 }],
  },
]

const donutData: DitherChartSeries = {
  points: [
    { value: 45, label: 'Desktop' },
    { value: 25, label: 'Mobile' },
    { value: 18, label: 'Tablet' },
    { value: 12, label: 'Other' },
  ],
}

const gaugeData: DitherChartSeries[] = [
  {
    points: [{ value: 72, label: 'Performance' }],
  },
]

const funnelData: DitherChartSeries = {
  name: 'Conversion',
  points: [
    { value: 100, label: 'Visitors' },
    { value: 65, label: 'Signups' },
    { value: 35, label: 'Activated' },
    { value: 18, label: 'Subscribed' },
    { value: 8, label: 'Retained' },
  ],
}

const heatmapData: DitherChartSeries[] = [
  {
    points: [{ value: 20 }, { value: 35 }, { value: 50 }, { value: 40 }, { value: 25 }, { value: 15 }, { value: 10 }],
  },
  {
    points: [{ value: 15 }, { value: 45 }, { value: 60 }, { value: 55 }, { value: 30 }, { value: 20 }, { value: 12 }],
  },
  {
    points: [{ value: 25 }, { value: 40 }, { value: 70 }, { value: 65 }, { value: 45 }, { value: 30 }, { value: 18 }],
  },
  {
    points: [{ value: 10 }, { value: 30 }, { value: 45 }, { value: 50 }, { value: 35 }, { value: 25 }, { value: 8 }],
  },
]

const bubbleData: DitherChartSeries[] = [
  {
    name: 'High',
    points: [{ value: 80 }, { value: 60 }, { value: 40 }, { value: 70 }, { value: 50 }],
  },
  {
    name: 'Low',
    points: [{ value: 30 }, { value: 50 }, { value: 25 }, { value: 35 }, { value: 20 }],
  },
]
</script>
