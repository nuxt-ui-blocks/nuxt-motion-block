<template>
  <div class="space-y-12">
    <UPageHeader
      title="ScrollProgress"
      description="A one-pixel bar driven by scroll position, smoothed through a spring so it lags the wheel and catches up."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Window progress bar
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">useScroll</code> reads the document, a
        <code class="font-mono">useSpring</code> smooths <code class="font-mono">scrollYProgress</code>,
        and the value lands on <code class="font-mono">scaleX</code> with
        <code class="font-mono">origin-left</code> — the bar fills from the left edge. The base
        classes are only <code class="font-mono">inset-x-0 top-0 h-1 origin-left</code>, so the
        class prop has to add <code class="font-mono">fixed</code> and a background. Scroll the
        page, or hit Replay to jump back to the top.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <MScrollProgress
        :key="`window-${springKey}`"
        class="fixed top-0 z-50 bg-primary"
        data-testid="window-bar"
      />

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          window progress
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-progress"
        >
          {{ progress }}%
        </dd>
        <dt class="text-muted">
          spring k / c
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spring"
        >
          {{ stiffness }} / {{ damping }}
        </dd>
        <dt class="text-muted">
          base classes
        </dt>
        <dd class="font-mono">
          inset-x-0 top-0 h-1 origin-left
        </dd>
        <dt class="text-muted">
          added here
        </dt>
        <dd class="font-mono">
          fixed · z-50 · bg-primary
        </dd>
        <dt class="text-muted">
          default spring
        </dt>
        <dd class="font-mono">
          k 200 · c 50 · restDelta 0.001
        </dd>
        <dt class="text-muted">
          transform
        </dt>
        <dd class="font-mono">
          scaleX 0 → 1
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="spring stiffness (per Replay)"
      >
        <USlider
          v-model="stiffness"
          :min="20"
          :max="500"
          :step="10"
          data-testid="slider-stiffness"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="spring damping (per Replay)"
      >
        <USlider
          v-model="damping"
          :min="5"
          :max="120"
          :step="5"
          data-testid="slider-damping"
        />
      </UFormField>

      <p class="mt-4 text-xs text-muted">
        <code class="font-mono">springOptions</code> is spread over the defaults once at setup,
        so the key includes both values. The readout above is measured by this page's own
        scroll listener — the component exposes no progress value and no events.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Scrollable panel
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Point it at a container instead of the window. The prop must be a getter —
        <code class="font-mono">:container-ref="() => panelRef"</code> — because a plain
        binding is unwrapped to the element (or <code class="font-mono">null</code>) during
        setup and captured forever; the getter is resolved later by
        <code class="font-mono">useScroll</code>'s own effect. Inside the panel the bar only
        needs <code class="font-mono">absolute</code>, which the wrapper provides a
        positioning context for.
      </p>

      <div
        ref="panelRef"
        class="relative h-72 overflow-y-auto rounded-2xl border border-default bg-(--ui-bg-muted) p-6"
        data-testid="panel"
        @scroll="onPanelScroll"
      >
        <MScrollProgress
          :key="`panel-${springKey}`"
          class="absolute bg-primary"
          :container-ref="() => panelRef"
          data-testid="panel-bar"
        />

        <div class="space-y-6">
          <div
            v-for="step in panelSteps"
            :key="step"
            class="grid h-32 place-items-center rounded-xl bg-default/70 ring-1 ring-default"
          >
            <p class="font-mono text-sm text-muted">
              block {{ step }}
            </p>
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          panel progress
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-panel-progress"
        >
          {{ panelProgress }}%
        </dd>
        <dt class="text-muted">
          containerRef
        </dt>
        <dd class="font-mono">
          () => panelRef
        </dd>
        <dt class="text-muted">
          fallback
        </dt>
        <dd class="font-mono">
          window, if unresolved
        </dd>
        <dt class="text-muted">
          class
        </dt>
        <dd class="font-mono">
          absolute bg-primary
        </dd>
        <dt class="text-muted">
          blocks
        </dt>
        <dd class="font-mono">
          6 × 128px
        </dd>
        <dt class="text-muted">
          events
        </dt>
        <dd class="font-mono">
          none
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Props in the source
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt
          v-for="prop in propTour"
          :key="prop.name"
          class="text-muted"
        >
          {{ prop.name }}
        </dt>
        <dd
          v-for="prop in propTour"
          :key="`${prop.name}-value`"
          class="font-mono"
        >
          {{ prop.value }}
        </dd>
      </dl>

      <p class="mt-4 text-xs text-muted">
        Caveats: the root is a self-closing element with no slot and no emits, so any progress
        number you want to show has to be measured elsewhere, as this page does. The docs pass
        <code class="font-mono">class="bg-primary fixed top-0 z-50"</code> for the window case
        — without <code class="font-mono">fixed</code> the bar sits in normal flow and
        <code class="font-mono">inset-x-0</code> does nothing. The internal progress ref only
        updates because a <code class="font-mono">useMotionValueEvent</code> subscribes inside
        <code class="font-mono">onMounted</code>.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const stiffness = ref(200)
const damping = ref(50)
const springKey = ref(0)
const progress = ref(0)
const panelProgress = ref(0)
const panelRef = ref<HTMLElement | null>(null)

const panelSteps = [1, 2, 3, 4, 5, 6]

const propTour = [
  { name: 'class', value: 'appended after base h-1 bar' },
  { name: 'springOptions', value: 'merged over defaults · setup only' },
  { name: 'containerRef', value: 'getter · window by default' },
  { name: 'emits', value: 'none' },
  { name: 'slot', value: 'none — self-closing root' },
  { name: 'style', value: 'scaleX from the spring' },
] as const

function windowProgress() {
  const el = document.documentElement
  const max = el.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0
}

function onPanelScroll() {
  const el = panelRef.value
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  panelProgress.value = max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0
}

function replay() {
  springKey.value++
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', windowProgress, { passive: true })
  windowProgress()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', windowProgress)
})
</script>
