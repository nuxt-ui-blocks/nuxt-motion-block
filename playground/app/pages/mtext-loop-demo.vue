<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextLoop"
      description="Cycles a list of strings through one slot with a shared exit/enter transition, measuring the tallest item so the line never jumps while it swaps."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        One <code class="font-mono">Motion</code> child lives inside an
        <code class="font-mono">AnimatePresence mode="wait"</code>, keyed by index. The invisible measure
        column behind it renders every item and publishes the tallest height to the container, so a
        long word and a short word occupy the same box. Every instance on this page is wrapped in
        <code class="font-mono">&lt;ClientOnly&gt;</code>: the presence wrapper hydrates a different
        node set than the server prints, and leaving it in the SSR pass throws a hydration mismatch
        on load.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
        <UButton
          :label="`trigger: ${trigger}`"
          :icon="trigger ? 'i-lucide-pause' : 'i-lucide-play'"
          variant="outline"
          data-testid="toggle-trigger"
          @click="trigger = !trigger"
        />
      </div>

      <p
        class="mb-8 rounded-2xl bg-(--ui-bg-muted) px-6 py-10 text-center text-3xl font-bold sm:text-4xl"
        data-testid="sentence"
      >
        Ship
        <ClientOnly>
          <MTextLoop
            :key="`basic-${replayKey}`"
            :items="phrases"
            :interval="interval"
            :trigger="trigger"
            class-name="font-bold text-primary"
            data-testid="basic"
            @index-change="onIndexChange"
          />
        </ClientOnly>
        every day.
      </p>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          index
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-index"
        >
          {{ index }}
        </dd>
        <dt class="text-muted">
          item
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-item"
        >
          {{ item }}
        </dd>
        <dt class="text-muted">
          effective interval
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-interval"
        >
          {{ effectiveInterval }}ms
        </dd>
        <dt class="text-muted">
          trigger
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-trigger"
        >
          {{ trigger }}
        </dd>
        <dt class="text-muted">
          container height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-height"
        >
          {{ readouts.height }}
        </dd>
        <dt class="text-muted">
          measured children
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-measured"
        >
          {{ readouts.measured }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="interval"
        :hint="`requested ${interval}s — the component clamps anything under 1000ms`"
      >
        <USlider
          v-model="interval"
          :max="8"
          :min="1"
          :step="0.5"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom variants &amp; transition
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Passing <code class="font-mono">variants</code> replaces the built-in rotate-X flip entirely —
        the component still computes it, but only spreads your three keys. The nested
        <code class="font-mono">transition</code> inside the default <code class="font-mono">animate</code>
        disappears with it, so whatever you pass in <code class="font-mono">transition</code> becomes the
        only timing for both directions.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-variants"
          @click="replayVariants()"
        />
        <UButton
          :label="`spring: ${useSpring}`"
          icon="i-lucide-waves"
          variant="outline"
          data-testid="toggle-spring"
          @click="useSpring = !useSpring"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-12">
        <ClientOnly>
          <MTextLoop
            :key="`variants-${replayKey}`"
            :items="moods"
            :interval="2"
            :variants="slideVariants"
            :transition="customTransition"
            class-name="text-3xl font-black tracking-tight"
            data-testid="variants"
            @index-change="onVariantIndexChange"
          />
        </ClientOnly>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          transition
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-transition"
        >
          {{ customTransition.type ?? 'missing' }} {{ customTransition.duration ?? '' }}
        </dd>
        <dt class="text-muted">
          last index
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant-index"
        >
          {{ variantIndex }}
        </dd>
        <dt class="text-muted">
          items
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant-items"
        >
          {{ moods.length }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Callback
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The component declares <code class="font-mono">defineEmits(['indexChange'])</code> and calls the
        <code class="font-mono">onIndexChange</code> prop directly on the same line, so both routes fire
        per tick. This card wires only the prop to show it working; the Basic card wires only the event.
        Binding both to the same handler would run it twice per swap.
      </p>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <ClientOnly>
          <MTextLoop
            :items="cities"
            :interval="2"
            :on-index-change="record"
            class-name="text-2xl font-semibold"
            data-testid="callback"
          />
        </ClientOnly>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <dt class="text-muted">
          prop callback calls
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-calls"
        >
          {{ calls }}
        </dd>
        <dt class="text-muted">
          last index
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-callback-index"
        >
          {{ callbackIndex }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const phrases = ['small wins', 'daily motion', 'clean states', 'visible copy']
const moods = ['CALM', 'TENSE', 'BRIGHT', 'HEAVY']
const cities = ['Kyoto', 'Lisbon', 'Oslo', 'Valparaíso']

const interval = ref(2)
const trigger = ref(true)
const replayKey = ref(0)

const index = ref(0)
const item = ref(phrases[0])
const variantIndex = ref(0)
const calls = ref(0)
const callbackIndex = ref(0)
const useSpring = ref(false)

const readouts = ref({
  height: 'pending',
  measured: 'pending',
})

const effectiveInterval = computed(() => Math.max(interval.value * 1000, 1000))

const slideVariants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -40, scale: 0.96 },
}

const customTransition = computed(() =>
  useSpring.value
    ? { type: 'spring', duration: 0.6, stiffness: 240, damping: 24 }
    : { type: 'tween', duration: 0.4, ease: 'easeInOut' },
)

let frame = 0

function replay() {
  replayKey.value++
}

function replayVariants() {
  replayKey.value++
}

function onIndexChange(next: number) {
  index.value = next
  item.value = phrases[next] ?? ''
}

function onVariantIndexChange(next: number) {
  variantIndex.value = next
}

function record(next: number) {
  calls.value++
  callbackIndex.value = next
}

/** Reports the box the component measured — height is published inline by the measure column. */
function sample() {
  const el = document.querySelector<HTMLElement>('[data-testid="basic"]')
  const measure = el?.querySelector('.invisible')
  if (!el) {
    return
  }

  readouts.value = {
    height: getComputedStyle(el).height,
    measured: measure ? `${measure.children.length} items` : 'missing',
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
