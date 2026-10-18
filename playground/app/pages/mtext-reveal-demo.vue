<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextReveal"
      description="Splits a string into per-character spans and animates each one to its resting state on its own delay, with six effects and five directions."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each character is its own <code class="font-mono">Motion</code> node, so
        <code class="font-mono">delay + index × stagger</code> is what you are tuning. The visible glyphs
        are <code class="font-mono">aria-hidden</code> and the readable string lives in an
        <code class="font-mono">sr-only</code> span behind them.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replayKey++"
        />
        <UButton
          v-for="option in effects"
          :key="option"
          :label="option"
          :variant="option === effect ? 'solid' : 'outline'"
          :data-testid="`effect-${option}`"
          @click="setEffect(option)"
        />
      </div>

      <div class="mb-8 rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextReveal
          :key="`basic-${replayKey}`"
          :delay="delay"
          :duration="duration"
          :effect="effect"
          :stagger="stagger"
          :trigger="true"
          class="text-3xl font-black sm:text-4xl"
          data-testid="basic"
          :text="headline"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          effect
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-effect"
        >
          {{ effect }}
        </dd>
        <dt class="text-muted">
          characters
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-chars"
        >
          {{ readouts.chars }}
        </dd>
        <dt class="text-muted">
          first delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-first-delay"
        >
          {{ delay.toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          last delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-last-delay"
        >
          {{ (delay + (headline.length - 1) * stagger).toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          settle time
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-settle"
        >
          {{ settleTime.toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          role
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-role"
        >
          {{ readouts.role }}
        </dd>
      </dl>

      <div class="mt-6 grid gap-6 sm:grid-cols-3">
        <UFormField
          label="stagger"
          :hint="`${stagger}s between characters`"
        >
          <USlider
            v-model="stagger"
            :max="0.3"
            :min="0"
            :step="0.01"
            data-testid="slider-stagger"
          />
        </UFormField>

        <UFormField
          label="duration"
          :hint="`${duration}s per character`"
        >
          <USlider
            v-model="duration"
            :max="2"
            :min="0.1"
            :step="0.1"
            data-testid="slider-duration"
          />
        </UFormField>

        <UFormField
          label="delay"
          :hint="`${delay}s before the first character`"
        >
          <USlider
            v-model="delay"
            :max="2"
            :min="0"
            :step="0.1"
            data-testid="slider-delay"
          />
        </UFormField>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Directions
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">direction</code> only supplies the offset each effect starts from:
        <code class="font-mono">up</code> begins <code class="font-mono">y: 30</code>,
        <code class="font-mono">right</code> begins <code class="font-mono">x: -30</code>, and
        <code class="font-mono">random</code> samples a ±20px offset per character on every render — which
        means the same prop never produces the same starting layout twice. Because the server and the
        client roll different offsets, this row's instances are wrapped in
        <code class="font-mono">&lt;ClientOnly&gt;</code> so the mismatch never reaches hydration.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay all"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-directions"
          @click="replayKey++"
        />
        <UButton
          v-for="option in directions"
          :key="option"
          :label="option"
          :variant="option === direction ? 'solid' : 'outline'"
          :data-testid="`direction-${option}`"
          @click="direction = option"
        />
      </div>

      <div class="grid gap-4">
        <div
          v-for="option in directions"
          :key="option"
          class="rounded-2xl bg-(--ui-bg-muted) px-6 py-6"
        >
          <p class="mb-2 text-xs uppercase tracking-wide text-muted">
            {{ option }}
          </p>
          <ClientOnly>
            <MTextReveal
              :key="`direction-${option}-${replayKey}`"
              :delay="0"
              :direction="option"
              :duration="0.5"
              :effect="'slide'"
              :stagger="0.03"
              :trigger="true"
              class="text-2xl font-bold"
              :data-testid="`reveal-${option}`"
              :text="`Slides from the ${option}`"
            />
          </ClientOnly>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom char classes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">class</code> lands on the container and
        <code class="font-mono">charClass</code> on every per-character span, next to the built-in
        <code class="font-mono">text-reveal-char relative</code>. Both are plain strings, so they are
        appended after the component's own classes rather than merged.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-chars"
          @click="charsKey++"
        />
      </div>

      <div class="rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextReveal
          :key="`chars-${charsKey}`"
          :char-class="charClass"
          :delay="0"
          :duration="0.6"
          :effect="effect"
          :stagger="0.04"
          :trigger="true"
          class="text-3xl font-black text-primary"
          data-testid="chars"
          text="PER CHARACTER"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          charClass
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-charclass"
        >
          {{ charClass }}
        </dd>
        <dt class="text-muted">
          container classes
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-container-class"
        >
          {{ readouts.containerClass }}
        </dd>
        <dt class="text-muted">
          span classes
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-span-class"
        >
          {{ readouts.spanClass }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Accessibility &amp; events
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The container carries <code class="font-mono">aria-label</code>,
        <code class="font-mono">aria-live</code> and <code class="font-mono">aria-busy</code>, plus a
        <code class="font-mono">role="text"</code> that most engines ignore. The
        <code class="font-mono">complete</code> event is wired here too — see the readout below for what
        actually arrives.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-a11y"
          @click="a11yKey++"
        />
        <UButton
          :label="`reduceMotion: ${reduceMotion}`"
          icon="i-lucide-accessibility"
          variant="outline"
          data-testid="toggle-reduce"
          @click="reduceMotion = !reduceMotion"
        />
        <UButton
          :label="`startOnView: ${startOnView}`"
          icon="i-lucide-scan-eye"
          variant="outline"
          data-testid="toggle-start-on-view"
          @click="startOnView = !startOnView"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextReveal
          :key="`a11y-${a11yKey}`"
          :aria-label="ariaLabel"
          :delay="0.2"
          :duration="0.5"
          :effect="'blur'"
          :reduce-motion="reduceMotion"
          :start-on-view="startOnView"
          :stagger="0.05"
          :text="ariaLabel || 'LABELLED REVEAL'"
          class="text-3xl font-black"
          data-testid="a11y"
          @click="clicks++"
          @complete="completes++"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          aria-label
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-aria-label"
        >
          {{ readouts.ariaLabel }}
        </dd>
        <dt class="text-muted">
          aria-live
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-aria-live"
        >
          {{ readouts.ariaLive }}
        </dd>
        <dt class="text-muted">
          aria-busy
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-aria-busy"
        >
          {{ readouts.ariaBusy }}
        </dd>
        <dt class="text-muted">
          click events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-clicks"
        >
          {{ clicks }}
        </dd>
        <dt class="text-muted">
          complete events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-completes"
        >
          {{ completes }}
        </dd>
        <dt class="text-muted">
          reduceMotion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduce"
        >
          {{ reduceMotion }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="ariaLabel"
        hint="empty falls back to &quot;Animated text: …&quot;"
      >
        <UInput
          v-model="ariaLabel"
          data-testid="input-aria"
          placeholder="Animated text: LABELLED REVEAL"
        />
      </UFormField>

      <UAlert
        class="mt-6"
        icon="i-lucide-info"
        color="warning"
        variant="subtle"
        title="complete never fires"
        description="hasAnimated is only ever read — it is never set to true, so the watcher that emits complete has nothing to watch and once has no effect. Clicks do fire."
      />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const effects = ['fade', 'slide', 'bounce', 'rotate', 'scale', 'blur'] as const
const directions = ['up', 'down', 'left', 'right', 'random'] as const
const headline = 'REVEAL THE COPY'

const effect = ref<(typeof effects)[number]>('slide')
const direction = ref<(typeof directions)[number]>('up')
const stagger = ref(0.05)
const duration = ref(0.6)
const delay = ref(0)
const replayKey = ref(0)
const charsKey = ref(0)
const a11yKey = ref(0)

const charClass = ref('tracking-widest')
const ariaLabel = ref('')
const reduceMotion = ref(false)
const startOnView = ref(false)
const clicks = ref(0)
const completes = ref(0)

const readouts = ref({
  ariaBusy: 'pending',
  ariaLabel: 'pending',
  ariaLive: 'pending',
  chars: 'pending',
  containerClass: 'pending',
  role: 'pending',
  spanClass: 'pending',
})

const settleTime = computed(() => delay.value + (headline.length - 1) * stagger.value + duration.value)

let frame = 0

function setEffect(option: (typeof effects)[number]) {
  effect.value = option
  replayKey.value++
}

function sample() {
  const basic = document.querySelector<HTMLElement>('[data-testid="basic"]')
  const a11y = document.querySelector<HTMLElement>('[data-testid="a11y"]')
  const chars = document.querySelector<HTMLElement>('[data-testid="chars"]')

  if (!basic) {
    return
  }

  readouts.value = {
    ...readouts.value,
    ariaBusy: a11y?.getAttribute('aria-busy') ?? 'missing',
    ariaLabel: a11y?.getAttribute('aria-label') ?? 'missing',
    ariaLive: a11y?.getAttribute('aria-live') ?? 'missing',
    chars: String(basic.querySelectorAll(':scope > span[aria-hidden]').length),
    containerClass: chars?.className ?? 'pending',
    role: basic.getAttribute('role') ?? 'missing',
    spanClass: chars?.querySelector('span[aria-hidden]')?.className ?? 'pending',
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
