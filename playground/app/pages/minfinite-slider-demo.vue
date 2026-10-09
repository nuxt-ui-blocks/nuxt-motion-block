<template>
  <div class="space-y-12">
    <UPageHeader
      title="InfiniteSlider"
      description="A marquee that renders its content twice and translates the pair by -50% forever — one keyframe, no JavaScript."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The default slot is rendered twice, side by side, inside a
        <code class="font-mono">width: fit-content</code> flex row. The animation moves that row
        from <code class="font-mono">0</code> to <code class="font-mono">-50%</code>, which is
        exactly one copy wide — so the moment copy one leaves the left edge, copy two is already
        where copy one started and the seam never shows.
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

      <div class="mb-8 rounded-2xl bg-(--ui-bg-muted)">
        <MInfiniteSlider
          :key="`basic-${replayKey}`"
          :duration="duration"
          class-name="items-center gap-10 py-4"
          data-testid="basic"
        >
          <div
            v-for="logo in logos"
            :key="logo"
            class="flex shrink-0 items-center gap-2 text-dimmed"
          >
            <UIcon
              :name="logo"
              class="size-5"
            />
            <span class="text-sm font-semibold tracking-tight">
              {{ label(logo) }}
            </span>
          </div>
        </MInfiniteSlider>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
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
          nodes in row
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-clones"
        >
          {{ readouts.clones }}
        </dd>
        <dt class="text-muted">
          items per copy
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-per-copy"
        >
          {{ readouts.perCopy }}
        </dd>
        <dt class="text-muted">
          computed lap time
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-lap"
        >
          {{ readouts.lap }}
        </dd>
        <dt class="text-muted">
          timing function
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-timing"
        >
          {{ readouts.timing }}
        </dd>
        <dt class="text-muted">
          iteration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-iteration"
        >
          {{ readouts.iteration }}
        </dd>
        <dt class="text-muted">
          row width
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-row-width"
        >
          {{ readouts.rowWidth }}
        </dd>
        <dt class="text-muted">
          keyframe distance
        </dt>
        <dd class="font-mono">
          translateX(-50%)
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="duration (seconds per lap)"
        :max="60"
        :min="5"
        :step="1"
      >
        <USlider
          v-model="duration"
          :max="60"
          :min="5"
          :step="1"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Lap speed
        </p>
        <p class="text-muted">
          <code class="font-mono">duration</code> is seconds for the full pass of the doubled row,
          not per copy. Same content, three lap lengths.
        </p>
      </template>

      <div class="space-y-6">
        <div
          v-for="speed in speeds"
          :key="speed.name"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ speed.name }} — {{ speed.duration }}s lap
          </p>
          <div class="rounded-2xl border border-default">
            <MInfiniteSlider
              :key="`${speed.name}-${replayKey}`"
              :duration="speed.duration"
              class-name="items-center gap-6 px-3 py-3"
              :data-testid="`speed-${speed.tone}`"
            >
              <span
                v-for="chip in chips"
                :key="chip"
                class="shrink-0 rounded-full border border-default bg-(--ui-bg-muted) px-3 py-1 text-xs font-medium"
              >
                {{ chip }}
              </span>
            </MInfiniteSlider>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Spacing belongs to className
        </p>
        <p class="text-muted">
          <code class="font-mono">className</code> lands on the animated flex row, not on the outer
          clipping box. The clip box is always <code class="font-mono">w-full overflow-hidden</code>
          and takes no classes of its own — so gaps, alignment and vertical padding all go here.
        </p>
      </template>

      <div class="space-y-6">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            className="items-center gap-4"
          </p>
          <div class="rounded-2xl bg-(--ui-bg-muted)">
            <MInfiniteSlider
              :key="`tight-${replayKey}`"
              :duration="30"
              class-name="items-center gap-4 py-3"
              data-testid="spacing-tight"
            >
              <span
                v-for="chip in chips"
                :key="chip"
                class="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                {{ chip }}
              </span>
            </MInfiniteSlider>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            className="items-center gap-20"
          </p>
          <div class="rounded-2xl bg-(--ui-bg-muted)">
            <MInfiniteSlider
              :key="`loose-${replayKey}`"
              :duration="30"
              class-name="items-center gap-20 py-3"
              data-testid="spacing-loose"
            >
              <span
                v-for="chip in chips"
                :key="chip"
                class="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                {{ chip }}
              </span>
            </MInfiniteSlider>
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          clip box classes
        </dt>
        <dd class="font-mono">
          w-full overflow-hidden (fixed)
        </dd>
        <dt class="text-muted">
          row classes
        </dt>
        <dd class="font-mono">
          className prop
        </dd>
        <dt class="text-muted">
          seam spacing
        </dt>
        <dd class="font-mono">
          flex gap, not margins
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Accessibility
        </p>
        <p class="text-muted">
          The duplication is unconditional, which is exactly what makes the loop seamless — and
          exactly what the accessibility tree sees twice.
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          pause control
        </dt>
        <dd class="font-mono">
          none
        </dd>
        <dt class="text-muted">
          reduced motion
        </dt>
        <dd class="font-mono">
          not handled — runs full speed
        </dd>
        <dt class="text-muted">
          duplicated content
        </dt>
        <dd class="font-mono">
          read twice by screen readers
        </dd>
        <dt class="text-muted">
          keyboard
        </dt>
        <dd class="font-mono">
          tab order doubled if focusable
        </dd>
        <dt class="text-muted">
          layout cost
        </dt>
        <dd class="font-mono">
          transform only, compositor-driven
        </dd>
        <dt class="text-muted">
          measurement
        </dt>
        <dd class="font-mono">
          none — no ResizeObserver
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const logos = [
  'i-lucide-rocket',
  'i-lucide-anchor',
  'i-lucide-orbit',
  'i-lucide-flame',
  'i-lucide-gem',
  'i-lucide-zap',
  'i-lucide-globe',
  'i-lucide-shield',
] as const

const chips = ['Vue', 'Nuxt', 'Motion', 'Nuxt UI', 'Nitro', 'Vite', 'VueUse'] as const

const speeds = [
  { name: 'Fast', duration: 8, tone: 'fast' },
  { name: 'Documentation default', duration: 28, tone: 'doc' },
  { name: 'Slow', duration: 60, tone: 'slow' },
] as const

const duration = ref(28)
const replayKey = ref(0)

function label(logo: string) {
  return logo.replace('i-lucide-', '')
}

function replay() {
  replayKey.value++
}

const readouts = ref({
  clones: 'pending',
  iteration: 'pending',
  lap: 'pending',
  perCopy: 'pending',
  rowWidth: 'pending',
  timing: 'pending',
})

let frame = 0

/**
 * Reads the live computed style off the animated row. The row is the element
 * carrying `animationDuration`, so it is the one that proves the prop landed —
 * the outer clipping box has no animation at all.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')
  const row = root?.querySelector('.infinite-slider-content') as HTMLElement | null

  if (!row) {
    return
  }

  const children = Array.from(row.children)
  const style = getComputedStyle(row)

  readouts.value = {
    clones: String(children.length),
    iteration: style.animationIterationCount,
    lap: style.animationDuration,
    perCopy: String(Math.round(children.length / 2)),
    rowWidth: `${Math.round(row.scrollWidth)}px`,
    timing: style.animationTimingFunction,
  }
}

onMounted(() => {
  const tick = () => {
    sample()
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>
