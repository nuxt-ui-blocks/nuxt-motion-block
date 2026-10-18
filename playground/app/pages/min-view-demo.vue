<template>
  <div class="space-y-12">
    <UPageHeader
      title="InView"
      description="Reveals its children when the element enters the viewport, then stays or repeats depending on once."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The component watches its own root with VueUse's
        <code class="font-mono">useElementVisibility</code> and flips between the
        <code class="font-mono">hidden</code> and <code class="font-mono">visible</code>
        variants. With <code class="font-mono">once</code> it latches after the first
        entry, so scrolling away and back changes nothing. Replay remounts the component
        and clears the latch.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
        <UButton
          :label="`once: ${once}`"
          icon="i-lucide-repeat"
          variant="outline"
          data-testid="toggle-once"
          @click="once = !once"
        />
      </div>

      <div
        class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-16"
        data-testid="stage"
      >
        <MInView
          :key="replayKey"
          :once="once"
          class="text-center"
          data-testid="basic"
          @animation-start="status = 'animating'"
          @animation-complete="status = 'complete'"
        >
          <p class="text-3xl font-bold text-highlighted">
            Scroll-aware reveal
          </p>
          <p class="mt-2 text-sm text-muted">
            opacity 0 → 1 over 0.6s, easeOut
          </p>
        </MInView>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          once
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-once"
        >
          {{ once }}
        </dd>
        <dt class="text-muted">
          lifecycle
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-status"
        >
          {{ status }}
        </dd>
        <dt class="text-muted">
          variants
        </dt>
        <dd class="font-mono">
          hidden / visible
        </dd>
        <dt class="text-muted">
          default transition
        </dt>
        <dd class="font-mono">
          0.6s · easeOut
        </dd>
        <dt class="text-muted">
          events
        </dt>
        <dd class="font-mono">
          animationStart / animationComplete
        </dd>
        <dt class="text-muted">
          detector
        </dt>
        <dd class="font-mono">
          useElementVisibility
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom variants and transition
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Variants are keyed <code class="font-mono">hidden</code> / <code class="font-mono">visible</code>
        — not <code class="font-mono">initial</code> / <code class="font-mono">animate</code>.
        Both are merged over the built-in opacity fallback, and both plus the transition are
        bound reactively, so the sliders below update the next run without a remount.
      </p>

      <div
        class="mb-8 grid place-items-center overflow-hidden rounded-2xl bg-(--ui-bg-muted) px-6 py-16"
        data-testid="stage-custom"
      >
        <MInView
          :key="`custom-${replayKey}`"
          :variants="customVariants"
          :transition="customTransition"
          class="rounded-xl bg-default px-8 py-6 text-center shadow-lg"
          data-testid="custom"
          @animation-complete="customRuns++"
        >
          <p class="text-2xl font-bold text-highlighted">
            Rise and blur in
          </p>
          <p class="mt-2 text-sm text-muted">
            y {{ customVariants.visible.y }}px · scale {{ customVariants.visible.scale }}
            · blur {{ customVariants.visible.filter }}
          </p>
        </MInView>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          runs completed
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-runs"
        >
          {{ customRuns }}
        </dd>
        <dt class="text-muted">
          hidden
        </dt>
        <dd class="font-mono">
          opacity 0 · y {{ customVariants.hidden.y }} · blur 8px
        </dd>
        <dt class="text-muted">
          visible
        </dt>
        <dd class="font-mono">
          opacity 1 · y {{ customVariants.visible.y }} · blur 0px
        </dd>
        <dt class="text-muted">
          transition
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-transition"
        >
          {{ customTransition.duration }}s · {{ customTransition.ease }}
        </dd>
        <dt class="text-muted">
          as
        </dt>
        <dd class="font-mono">
          div (default)
        </dd>
        <dt class="text-muted">
          class merging
        </dt>
        <dd class="font-mono">
          defaults + class prop
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="transition duration (s)"
      >
        <USlider
          v-model="customTransition.duration"
          :min="0.2"
          :max="2"
          :step="0.1"
          data-testid="slider-duration"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="enter y (px)"
      >
        <USlider
          v-model="customVariants.visible.y"
          :min="-60"
          :max="60"
          :step="4"
          data-testid="slider-y"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="enter scale"
      >
        <USlider
          v-model="customVariants.visible.scale"
          :min="0.6"
          :max="1.2"
          :step="0.05"
          data-testid="slider-scale"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Viewport section with once off
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        This block sits far enough down the page that it starts outside the viewport.
        With <code class="font-mono">once=false</code> it plays every time it re-enters and
        reverses every time it leaves. The <code class="font-mono">viewOptions</code> object
        is handed to the observer during setup only, so changing threshold or margin needs a
        remount — press Replay after adjusting them.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-view"
          @click="replay()"
        />
        <UButton
          :label="`once: ${once}`"
          icon="i-lucide-repeat"
          variant="outline"
          data-testid="toggle-once-view"
          @click="once = !once"
        />
      </div>

      <UFormField label="threshold (per Replay)">
        <USlider
          v-model="threshold"
          :min="0"
          :max="1"
          :step="0.05"
          data-testid="slider-threshold"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="margin / rootMargin (per Replay)"
      >
        <USelectMenu
          v-model="margin"
          :items="margins"
          value-key="value"
          class="w-full sm:w-64"
          data-testid="select-margin"
        />
      </UFormField>

      <div
        class="mt-6 grid place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted) px-6 py-24"
        data-testid="stage-view"
      >
        <MInView
          :key="`view-${replayKey}`"
          :once="once"
          :view-options="{ margin, threshold }"
          :variants="viewVariants"
          class="rounded-xl bg-primary/10 px-8 py-6 text-center ring-1 ring-primary/30"
          data-testid="view"
          @animation-start="viewStatus = 'animating'"
          @animation-complete="viewStatus = 'complete'"
        >
          <p class="text-2xl font-bold text-highlighted">
            Threshold {{ threshold }} · margin {{ margin }}
          </p>
          <p class="mt-2 text-sm text-muted">
            Scroll me out of frame and back.
          </p>
        </MInView>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          lifecycle
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-view-status"
        >
          {{ viewStatus }}
        </dd>
        <dt class="text-muted">
          threshold
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-threshold"
        >
          {{ threshold }}
        </dd>
        <dt class="text-muted">
          margin
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-margin"
        >
          {{ margin }}
        </dd>
        <dt class="text-muted">
          variant keys
        </dt>
        <dd class="font-mono">
          hidden / visible
        </dd>
        <dt class="text-muted">
          reversing
        </dt>
        <dd class="font-mono">
          back to hidden when out of view
        </dd>
        <dt class="text-muted">
          observer options
        </dt>
        <dd class="font-mono">
          captured at setup
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
        Doc caveats: the docs list standalone <code class="font-mono">threshold</code>,
        <code class="font-mono">rootMargin</code> and <code class="font-mono">delay</code>
        props — none exist on the component (threshold and margin live inside
        <code class="font-mono">viewOptions</code>, and there is no delay), and the docs'
        <code class="font-mono">initial</code> / <code class="font-mono">animate</code>
        variant example is ignored because the component only reads
        <code class="font-mono">hidden</code> / <code class="font-mono">visible</code>.
        There is also no <code class="font-mono">inView</code> event; the emits are
        <code class="font-mono">animationStart</code> and <code class="font-mono">animationComplete</code>.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const replayKey = ref(0)
const once = ref(true)
const status = ref('idle')
const customRuns = ref(0)
const viewStatus = ref('idle')
const threshold = ref(0.3)
const margin = ref('0px')

const margins = [
  { label: 'None (0px)', value: '0px' },
  { label: 'Early (50px)', value: '50px' },
  { label: 'Late (-50px)', value: '-50px' },
  { label: 'Deep (-150px)', value: '-150px' },
]

const customTransition = reactive<{ duration: number, ease: 'easeOut' }>({
  duration: 0.8,
  ease: 'easeOut',
})

const customVariants = reactive({
  hidden: { opacity: 0, y: 32, scale: 1, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, scale: 0.9, filter: 'blur(0px)' },
})

const viewVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

const propTour = [
  { name: 'variants', value: 'hidden / visible' },
  { name: 'transition', value: 'reactive' },
  { name: 'viewOptions', value: 'margin + threshold · setup only' },
  { name: 'as', value: 'HTMLElementTagNameMap key · div' },
  { name: 'once', value: 'boolean · true · reactive' },
  { name: 'class', value: 'merged over defaults' },
  { name: 'onAnimationStart', value: 'callback prop' },
  { name: 'onAnimationComplete', value: 'callback prop' },
] as const

function replay() {
  replayKey.value++
  status.value = 'idle'
  viewStatus.value = 'idle'
}
</script>
