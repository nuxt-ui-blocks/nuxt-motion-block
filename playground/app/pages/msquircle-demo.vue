<template>
  <div class="space-y-12">
    <UPageHeader
      title="Squircle"
      description="Corners traced as a superellipse rather than a circular arc, which is what keeps curvature continuous into the straight edges. Translated from smoothui's squircle."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">radius</code> sets the corner size and <code class="font-mono">smoothing</code> sets how far the curve is pushed out of a circle — <code class="font-mono">0</code> is an exact circular corner, identical to <code class="font-mono">border-radius</code>, and <code class="font-mono">1</code> flattens the corner into the edge. The shape comes from a measured <code class="font-mono">clip-path: path(...)</code>, so it tracks the element's own size.
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

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MSquircle
          :key="replayKey"
          class="grid aspect-4/3 w-full max-w-sm place-items-center bg-linear-to-br from-primary to-tertiary text-3xl font-bold text-white"
          :radius="radius"
          :smoothing="smoothing"
          data-testid="basic"
        >
          Squircle
        </MSquircle>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          radius
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-radius"
        >
          {{ radius }}px
        </dd>
        <dt class="text-muted">
          smoothing
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-smoothing"
        >
          {{ smoothing.toFixed(2) }}
        </dd>
        <dt class="text-muted">
          measured box
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-box"
        >
          {{ readouts.box }}
        </dd>
        <dt class="text-muted">
          clip-path
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-clip"
        >
          {{ readouts.clip }}
        </dd>
        <dt class="text-muted">
          path segments
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-segments"
        >
          {{ readouts.segments }}
        </dd>
        <dt class="text-muted">
          samples per corner
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-samples"
        >
          {{ readouts.samples }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Smoothing
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Smoothing maps to the superellipse exponent as <code class="font-mono">2 + smoothing × 4</code>. The first column is a plain circle and the last is nearly a rounded rectangle; the difference only shows at the seam where the corner meets the edge, which is exactly what squircle is for.
      </p>

      <div class="mb-8 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="radius"
          :hint="`${radius}px`"
        >
          <USlider
            v-model="radius"
            :min="0"
            :max="96"
            :step="1"
          />
        </UFormField>
        <UFormField
          label="smoothing"
          :hint="`${smoothing.toFixed(2)} → exponent ${(2 + smoothing * 4).toFixed(2)}`"
        >
          <USlider
            v-model="smoothing"
            :min="0"
            :max="1"
            :step="0.01"
          />
        </UFormField>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="option in smoothingPresets"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10"
        >
          <MSquircle
            class="grid aspect-square w-full max-w-44 place-items-center bg-linear-to-br from-primary to-tertiary text-xl font-bold text-white"
            :radius="radius"
            :smoothing="option"
            :data-testid="`smoothing-${option}`"
          >
            {{ option.toFixed(2) }}
          </MSquircle>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Radius
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Corners are traced as polylines, so the sample count scales with the radius — half a sample per pixel, bounded at 12 and 48. A 24px corner uses the minimum and reads as smooth; a 96px corner would visibly facet at that count and gets twice the points. Watch the sample readout as you drag <code class="font-mono">radius</code> on the previous card.
      </p>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="option in radiusPresets"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10"
        >
          <MSquircle
            class="grid aspect-square w-full max-w-36 place-items-center bg-linear-to-br from-primary to-tertiary text-xl font-bold text-white"
            :radius="option"
            :smoothing="smoothing"
            :data-testid="`radius-${option}`"
          >
            {{ option }}
          </MSquircle>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Border and element
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">border</code> adds a hairline in the theme's default border colour, and <code class="font-mono">as</code> chooses the element. Both only work if the box has a real size — the path is measured in the element's own pixels, so a squircle around an image or an auto-height stack has to be laid out first.
      </p>

      <div class="grid gap-4 sm:grid-cols-2">
        <MSquircle
          as="section"
          border
          class="grid aspect-4/3 w-full place-items-center bg-(--ui-bg-muted) text-center text-sm text-muted"
          :radius="40"
          :smoothing="1"
          data-testid="bordered"
        >
          <span class="px-8">bordered, radius 40, smoothing 1</span>
        </MSquircle>

        <MSquircle
          as="article"
          class="grid aspect-4/3 w-full place-items-center bg-(--ui-bg-muted) text-sm text-muted"
          :radius="16"
          :smoothing="0.35"
          data-testid="unbordered"
        >
          <span class="px-8">plain, radius 16, smoothing 0.35</span>
        </MSquircle>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Environment
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Squircle has no animation, so <code class="font-mono">prefers-reduced-motion</code> changes nothing here — there is no motion to remove. The shape is pure geometry, recomputed only when the box or the props change, and the path is never delegated to CSS <code class="font-mono">corner-shape: squircle</code>, which is a single fixed shape that would silently ignore <code class="font-mono">smoothing</code>.
      </p>

      <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <dt class="text-muted">
          prefers-reduced-motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduced-env"
        >
          {{ readouts.reduced }}
        </dd>
        <dt class="text-muted">
          exponent
        </dt>
        <dd
          class="font-mono text-muted"
          data-testid="readout-exponent"
        >
          {{ (2 + smoothing * 4).toFixed(2) }}
        </dd>
        <dt class="text-muted">
          paint cost
        </dt>
        <dd
          class="text-muted"
          data-testid="readout-cost"
        >
          one clip path, recomputed on resize only
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const smoothingPresets = [0, 0.35, 0.6, 1]
const radiusPresets = [8, 24, 48, 96]

const radius = ref(24)
const smoothing = ref(0.6)
const replayKey = ref(0)

const readouts = ref({
  box: 'pending',
  clip: 'pending',
  reduced: 'pending',
  samples: 'pending',
  segments: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

/**
 * The clip path is read back off the computed style, which is the only place
 * the real curve exists — the component computes it into an inline style and
 * nothing else reflects it. Segment and sample counts are derived from the path
 * by counting `L` commands: four are the straight edges, the rest are the
 * corner points.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]') as HTMLElement | null

  if (root) {
    const cs = getComputedStyle(root)
    const clip = cs.clipPath && cs.clipPath !== 'none' ? cs.clipPath : 'none'
    const segments = clip === 'none' ? 0 : (clip.match(/L/gi) ?? []).length
    const rect = root.getBoundingClientRect()

    readouts.value = {
      box: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
      clip: clip === 'none' ? 'none' : 'path(...)',
      reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'no-preference',
      samples: String(Math.max(0, Math.round((segments - 4) / 4))),
      segments: String(segments),
    }
  }

  frame = requestAnimationFrame(sample)
}

onMounted(() => {
  frame = requestAnimationFrame(sample)
})

onBeforeUnmount(() => {
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>
