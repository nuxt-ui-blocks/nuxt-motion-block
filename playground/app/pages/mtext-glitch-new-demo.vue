<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextGlitchNew"
      description="Pure-CSS glitch: the ::before and ::after copies of the string are clipped into horizontal bands and offset against the base, with no JavaScript running at all."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The element paints its own text, then two pseudo-elements re-paint
        <code class="font-mono">attr(data-text)</code> at <code class="font-mono">±10px</code> with
        <code class="font-mono">clip-path</code> bands sweeping through them. The pseudo boxes are hard-coded
        to <code class="font-mono">#060010</code> and the glyphs to white, so this only reads on a near-black
        surface — the component is painted for a dark stage, not for the card background.
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
          :label="`enableShadows: ${enableShadows}`"
          icon="i-lucide-copy"
          variant="outline"
          data-testid="toggle-shadows"
          @click="enableShadows = !enableShadows"
        />
      </div>

      <div class="mb-8 grid place-items-center overflow-hidden rounded-2xl bg-[#060010] px-6 py-14">
        <MTextGlitchNew
          :key="replayKey"
          :enable-shadows="enableShadows"
          :speed="speed"
          class="text-4xl! sm:text-5xl!"
          data-testid="basic"
          text="GLITCH"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          speed
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speed"
        >
          {{ speed }}
        </dd>
        <dt class="text-muted">
          before animation
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-before"
        >
          {{ readouts.before }}
        </dd>
        <dt class="text-muted">
          after animation
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-after"
        >
          {{ readouts.after }}
        </dd>
        <dt class="text-muted">
          before shadow
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-before-shadow"
        >
          {{ readouts.beforeShadow }}
        </dd>
        <dt class="text-muted">
          after shadow
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-after-shadow"
        >
          {{ readouts.afterShadow }}
        </dd>
        <dt class="text-muted">
          ::before content
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-content"
        >
          {{ readouts.keys }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="speed"
        :hint="`glitch keyframes run at ${(speed * 2).toFixed(1)}s and ${(speed * 3).toFixed(1)}s`"
      >
        <USlider
          v-model="speed"
          :max="2"
          :min="0.1"
          :step="0.1"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Hover activation
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">enableOnHover</code> the pseudo-elements start at
        <code class="font-mono">content: ''</code> and <code class="font-mono">opacity: 0</code>; the
        <code class="font-mono">hover:</code> variants swap in <code class="font-mono">attr(data-text)</code>
        and start the animation. Nothing is clipped away until the pointer arrives, so it costs nothing at rest.
      </p>

      <div class="grid place-items-center overflow-hidden rounded-2xl bg-[#060010] px-6 py-14">
        <MTextGlitchNew
          :enable-on-hover="true"
          :speed="1"
          class="text-4xl! sm:text-5xl!"
          data-testid="hover-mode"
          text="HOVER ME"
        />
      </div>

      <p class="mt-4 text-center text-xs text-muted">
        The panel is intentionally quiet until you point at it.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Shadows
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">enableShadows</code> only swaps the <code class="font-mono">--before-shadow</code>
        and <code class="font-mono">--after-shadow</code> custom properties between
        <code class="font-mono">5px 0 cyan</code> / <code class="font-mono">-5px 0 red</code> and
        <code class="font-mono">none</code>. The channel split stays; only the chromatic fringe disappears.
      </p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="grid place-items-center overflow-hidden rounded-2xl bg-[#060010] px-6 py-12">
          <MTextGlitchNew
            :enable-shadows="true"
            :speed="0.8"
            class="text-3xl! sm:text-4xl!"
            data-testid="shadows-on"
            text="SHADOWS"
          />
          <span class="mt-4 text-xs text-muted">enableShadows: true</span>
        </div>
        <div class="grid place-items-center overflow-hidden rounded-2xl bg-[#060010] px-6 py-12">
          <MTextGlitchNew
            :enable-shadows="false"
            :speed="0.8"
            class="text-3xl! sm:text-4xl!"
            data-testid="shadows-off"
            text="SHADOWS"
          />
          <span class="mt-4 text-xs text-muted">enableShadows: false</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Speeds
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        One <code class="font-mono">speed</code> value drives two keyframe durations: the before copy runs
        <code class="font-mono">speed × 2</code> seconds and the after copy
        <code class="font-mono">speed × 3</code>. They are deliberately coprime so the two bands never land
        on the same frame twice in a row.
      </p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="option in speeds"
          :key="option.label"
          class="grid place-items-center overflow-hidden rounded-2xl bg-[#060010] px-6 py-10"
        >
          <MTextGlitchNew
            :speed="option.value"
            class="text-3xl!"
            :data-testid="`speed-${option.label}`"
            :text="option.label"
          />
          <span class="mt-4 text-xs text-muted">speed {{ option.value }}</span>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface SpeedOption {
  label: string
  value: number
}

const speeds: SpeedOption[] = [
  { label: 'SNAP', value: 0.2 },
  { label: 'STEADY', value: 0.6 },
  { label: 'SLOW', value: 1.2 },
  { label: 'CRAWL', value: 2 },
]

const speed = ref(0.5)
const enableShadows = ref(true)
const replayKey = ref(0)

const readouts = ref({
  after: 'pending',
  afterShadow: 'pending',
  before: 'pending',
  beforeShadow: 'pending',
  keys: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

/** Reads the custom properties the component computes from `speed` and `enableShadows`. */
function sample() {
  const el = document.querySelector<HTMLElement>('[data-testid="basic"]')
  if (!el) {
    return
  }

  const styles = getComputedStyle(el)
  readouts.value = {
    after: styles.getPropertyValue('--after-animation').trim() || 'missing',
    afterShadow: styles.getPropertyValue('--after-shadow').trim() || 'missing',
    before: styles.getPropertyValue('--before-animation').trim() || 'missing',
    beforeShadow: styles.getPropertyValue('--before-shadow').trim() || 'missing',
    keys: getComputedStyle(el, '::before').content || 'none',
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
