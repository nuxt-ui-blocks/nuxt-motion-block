<template>
  <div class="space-y-12">
    <UPageHeader
      title="FlowingStroke"
      description="A dashed stripe layer riding a fixed wave path — the dashes travel only while the pointer is inside."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
        <p class="text-muted">
          The solid ribbon is the track; a second, thinner stroke of the same path carries the dash
          pattern. Only <code class="font-mono">stroke-dashoffset</code> changes, so the stripes can
          never drift off the curve they ride. Hover a panel — the travel starts on
          <code class="font-mono">mouseenter</code> and freezes on leave.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
        <div class="w-full max-w-md rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/30">
          <div class="flex justify-center">
            <MFlowingStroke
              :key="`doc-a-${replayKey}`"
              :width="440"
              :height="140"
              :dash="30"
              :gap="18"
              :ribbon="16"
              :speed="1.4"
              data-testid="basic-a"
            />
          </div>
          <p class="mt-2 text-center text-xs text-muted">
            Hover the ribbon — the dashes travel along the path
          </p>
        </div>

        <div class="w-full max-w-md rounded-2xl border border-default p-4">
          <div class="flex justify-center">
            <MFlowingStroke
              :key="`doc-b-${replayKey}`"
              :width="440"
              :height="160"
              :dash="6"
              :gap="10"
              :ribbon="10"
              :speed="3"
              data-testid="basic-b"
            />
          </div>
          <p class="mt-2 text-center text-xs text-muted">
            A tight dash at three times the base speed
          </p>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          trigger
        </dt>
        <dd class="font-mono">
          mouseenter / mouseleave
        </dd>
        <dt class="text-muted">
          base rate
        </dt>
        <dd class="font-mono">
          120px per second
        </dd>
        <dt class="text-muted">
          loop unit
        </dt>
        <dd class="font-mono">
          (dash + gap) px, modulo
        </dd>
        <dt class="text-muted">
          ribbon stroke
        </dt>
        <dd class="font-mono">
          16px / 10px
        </dd>
        <dt class="text-muted">
          stripe stroke
        </dt>
        <dd class="font-mono">
          ribbon − 2 × stripeInset
        </dd>
        <dt class="text-muted">
          svg semantics
        </dt>
        <dd class="font-mono">
          aria-hidden="true"
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Prop tour
        </p>
        <p class="text-muted">
          Everything except the curve itself is tuning: the dash rhythm, the weight of the two
          stroke layers, and <code class="font-mono">speed</code> as a multiplier on the 120px/s
          base rate. Hover the panel after moving a slider.
        </p>
      </template>

      <div class="mb-8 flex justify-center rounded-2xl bg-(--ui-bg-muted) p-4">
        <MFlowingStroke
          :key="`tour-${replayKey}`"
          :width="440"
          :height="150"
          :dash="dash"
          :gap="gap"
          :ribbon="ribbon"
          :stripe-inset="effectiveInset"
          :speed="speed"
          data-testid="tour"
        />
      </div>

      <dl class="mb-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          stripe stroke width
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stripe-width"
        >
          {{ ribbon - effectiveInset * 2 }}px
        </dd>
        <dt class="text-muted">
          dash period
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-period"
        >
          {{ dash + gap }}px
        </dd>
        <dt class="text-muted">
          travel rate
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rate"
        >
          {{ Math.round(120 * speed) }}px/s
        </dd>
        <dt class="text-muted">
          effective stripeInset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-inset"
        >
          {{ effectiveInset }}
        </dd>
        <dt class="text-muted">
          visible stripes
        </dt>
        <dd class="font-mono">
          dash / (dash + gap)
        </dd>
        <dt class="text-muted">
          path
        </dt>
        <dd class="font-mono">
          4 fixed cubic segments
        </dd>
      </dl>

      <div class="grid gap-6 md:grid-cols-2">
        <UFormField
          label="dash (px)"
          :max="60"
          :min="4"
          :step="2"
        >
          <USlider
            v-model="dash"
            :max="60"
            :min="4"
            :step="2"
          />
        </UFormField>

        <UFormField
          label="gap (px)"
          :max="40"
          :min="4"
          :step="2"
        >
          <USlider
            v-model="gap"
            :max="40"
            :min="4"
            :step="2"
          />
        </UFormField>

        <UFormField
          label="ribbon (px)"
          :max="34"
          :min="8"
          :step="2"
        >
          <USlider
            v-model="ribbon"
            :max="34"
            :min="8"
            :step="2"
          />
        </UFormField>

        <UFormField
          label="stripeInset (px)"
          :max="8"
          :min="0"
          :step="1"
        >
          <USlider
            v-model="stripeInset"
            :max="8"
            :min="0"
            :step="1"
          />
        </UFormField>

        <UFormField
          label="speed (× base rate)"
          :max="4"
          :min="0.5"
          :step="0.1"
        >
          <USlider
            v-model="speed"
            :max="4"
            :min="0.5"
            :step="0.1"
          />
        </UFormField>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Aspect ratio
        </p>
        <p class="text-muted">
          The wave is a fixed four-segment cubic generated from <code class="font-mono">width</code>
          and <code class="font-mono">height</code> — not a configurable curve. The only shape
          control is the box: wide flattens the crests, tall steepens them.
        </p>
      </template>

      <div class="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
        <div class="space-y-2">
          <p class="text-center text-xs font-medium text-muted">
            wide and short — 480 × 90
          </p>
          <div class="rounded-2xl border border-default p-3">
            <MFlowingStroke
              :key="`flat-${replayKey}`"
              :width="480"
              :height="90"
              :ribbon="14"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-center text-xs font-medium text-muted">
            narrow and tall — 300 × 200
          </p>
          <div class="rounded-2xl border border-default p-3">
            <MFlowingStroke
              :key="`steep-${replayKey}`"
              :width="300"
              :height="200"
              :ribbon="14"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Accessibility
        </p>
        <p class="text-muted">
          The stroke is decoration. Nothing about it reaches the accessibility tree, and the
          travel trigger is pointer-only.
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          svg
        </dt>
        <dd class="font-mono">
          aria-hidden, no title or role
        </dd>
        <dt class="text-muted">
          keyboard trigger
        </dt>
        <dd class="font-mono">
          none — nothing focusable
        </dd>
        <dt class="text-muted">
          touch
        </dt>
        <dd class="font-mono">
          renders still, no travel
        </dd>
        <dt class="text-muted">
          reduced motion
        </dt>
        <dd class="font-mono">
          dashoffset pinned to 0
        </dd>
        <dt class="text-muted">
          loop
        </dt>
        <dd class="font-mono">
          one rAF per instance
        </dd>
        <dt class="text-muted">
          frame model
        </dt>
        <dd class="font-mono">
          time-based, Hz independent
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const dash = ref(30)
const gap = ref(18)
const ribbon = ref(16)
const stripeInset = ref(4)
const speed = ref(1.4)
const replayKey = ref(0)

/**
 * The stripe layer is `ribbon - 2 * stripeInset` wide. A slider combination that
 * drives that below 2px would emit an invisible (or invalid) stroke, so the
 * inset is clamped against the ribbon instead of passing the raw value through.
 */
const effectiveInset = computed(() =>
  Math.max(0, Math.min(stripeInset.value, Math.floor((ribbon.value - 2) / 2))),
)

function replay() {
  replayKey.value++
}
</script>
