<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextGradient"
      description="Glyphs filled with a gradient that is animated by sliding or pulsing the background behind them, in five animation styles and four gradient directions."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The text is painted with <code class="font-mono">background-clip: text</code> and a transparent
        fill, so the animation is the gradient moving underneath static glyphs — not a colour property
        changing. Pick an animation style; <code class="font-mono">static</code> drops the transition
        entirely and leaves a frozen gradient.
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
          v-for="option in animations"
          :key="option"
          :label="option"
          :variant="option === animation ? 'solid' : 'outline'"
          :data-testid="`animation-${option}`"
          @click="animation = option"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextGradient
          :key="`basic-${replayKey}`"
          :animation="animation"
          :duration="duration"
          :hover="hover"
          :size="size"
          :speed="speed"
          class="text-4xl sm:text-5xl"
          data-testid="basic"
          text="GRADIENT"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          animation
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-animation"
        >
          {{ animation }}
        </dd>
        <dt class="text-muted">
          transition duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          {{ animation === 'static' ? 'none' : `${(duration / speed).toFixed(2)}s` }}
        </dd>
        <dt class="text-muted">
          background-size
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-size"
        >
          {{ readouts.backgroundSize }}
        </dd>
        <dt class="text-muted">
          background-position
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-position"
        >
          {{ readouts.backgroundPosition }}
        </dd>
        <dt class="text-muted">
          text fill
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-fill"
        >
          {{ readouts.fill }}
        </dd>
        <dt class="text-muted">
          aria-label
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-aria"
        >
          {{ readouts.aria }}
        </dd>
      </dl>

      <div class="mt-6 grid gap-6 sm:grid-cols-3">
        <UFormField
          label="duration"
          :hint="`${duration.toFixed(1)}s at speed 1`"
        >
          <USlider
            v-model="duration"
            :max="8"
            :min="0.5"
            :step="0.5"
          />
        </UFormField>

        <UFormField
          label="speed"
          :hint="`${speed}× multiplier`"
        >
          <USlider
            v-model="speed"
            :max="4"
            :min="0.25"
            :step="0.25"
          />
        </UFormField>

        <UFormField
          label="size"
          :hint="`${size}% gradient tile`"
        >
          <USlider
            v-model="size"
            :max="400"
            :min="50"
            :step="10"
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
        <code class="font-mono">direction</code> only picks the gradient's own axis:
        <code class="font-mono">90deg</code>, <code class="font-mono">180deg</code>,
        <code class="font-mono">45deg</code> or a <code class="font-mono">circle</code>. The animated
        property is still <code class="font-mono">backgroundPosition</code>, which is why the radial
        version moves its centre rather than sweeping a line.
      </p>

      <div class="grid gap-4">
        <div
          v-for="option in directions"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8"
        >
          <MTextGradient
            :animation="'flow'"
            :direction="option"
            class="text-2xl sm:text-3xl"
            :data-testid="`direction-${option}`"
            :text="option.toUpperCase()"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Colours
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The array is joined straight into the gradient string, so any CSS colour list works — including
        <code class="font-mono">currentColor</code> and CSS variables. Shorter lists give wider bands
        because there are fewer stops to travel between.
      </p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="palette in palettes"
          :key="palette.name"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8"
        >
          <MTextGradient
            :animation="'wave'"
            :colors="palette.colors"
            class="text-2xl"
            :data-testid="`palette-${palette.name}`"
            :text="palette.name"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Element &amp; size
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The docs pass <code class="font-mono">as="h1"</code>, but the component forwards it to
        <code class="font-mono">Motion</code> as <code class="font-mono">is</code> — and Motion's tag prop is
        <code class="font-mono">as</code>, so the attribute falls through untouched. The readout below reports
        the tag the browser actually produced rather than the prop that was asked for.
      </p>

      <div class="mb-8 grid gap-4 sm:grid-cols-2">
        <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8">
          <MTextGradient
            :as="'h1'"
            class="text-3xl"
            data-testid="element-h1"
            text="HEADING"
          />
        </div>
        <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8">
          <MTextGradient
            :as="'h2'"
            class="text-3xl"
            data-testid="element-h2"
            text="SUBHEADING"
          />
        </div>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          tag for as="h1"
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-tag-h1"
        >
          {{ readouts.tagH1 }}
        </dd>
        <dt class="text-muted">
          tag for as="h2"
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-tag-h2"
        >
          {{ readouts.tagH2 }}
        </dd>
        <dt class="text-muted">
          hover scale
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-hover"
        >
          {{ hover ? 'enabled' : 'disabled' }}
        </dd>
      </dl>

      <div class="mt-6 flex flex-wrap gap-2">
        <UButton
          :label="`hover: ${hover}`"
          icon="i-lucide-mouse-pointer-2"
          variant="outline"
          data-testid="toggle-hover"
          @click="hover = !hover"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Accessibility
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every instance carries an <code class="font-mono">aria-label</code> — its own default is
        <code class="font-mono">"Animated gradient text: …"</code>, overridable with
        <code class="font-mono">ariaLabel</code>. <code class="font-mono">reduceMotion</code> empties the
        transition (the same branch the OS-level <code class="font-mono">prefers-reduced-motion</code>
        query takes), and <code class="font-mono">hideFromScreenReader</code> hides the painted element
        while leaving an <code class="font-mono">sr-only</code> copy behind it.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="`reduceMotion: ${reduceMotion}`"
          icon="i-lucide-accessibility"
          variant="outline"
          data-testid="toggle-reduce"
          @click="reduceMotion = !reduceMotion"
        />
        <UButton
          :label="`hideFromScreenReader: ${hideFromScreenReader}`"
          icon="i-lucide-eye-off"
          variant="outline"
          data-testid="toggle-hidden"
          @click="hideFromScreenReader = !hideFromScreenReader"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-a11y"
          @click="replay()"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextGradient
          :key="`a11y-${replayKey}`"
          :aria-label="ariaLabel"
          :hide-from-screen-reader="hideFromScreenReader"
          :reduce-motion="reduceMotion"
          class="text-3xl sm:text-4xl"
          data-testid="a11y"
          text="LABELLED"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          aria-label
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-a11y-label"
        >
          {{ readouts.a11yLabel }}
        </dd>
        <dt class="text-muted">
          aria-hidden
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-a11y-hidden"
        >
          {{ readouts.a11yHidden }}
        </dd>
        <dt class="text-muted">
          sr-only copy
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-a11y-sr"
        >
          {{ readouts.a11ySr }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="ariaLabel"
      >
        <UInput
          v-model="ariaLabel"
          data-testid="input-aria"
          placeholder="Animated gradient text: LABELLED"
        />
      </UFormField>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const animations = ['wave', 'pulse', 'flow', 'rainbow', 'static'] as const
const directions = ['horizontal', 'vertical', 'diagonal', 'radial'] as const

interface Palette {
  colors: string[]
  name: string
}

const palettes: Palette[] = [
  { name: 'SUNSET', colors: ['#ff6b6b', '#feca57', '#ff9ff3'] },
  { name: 'OCEAN', colors: ['#2196f3', '#00bcd4', '#009688'] },
  { name: 'MONO', colors: ['#111827', '#6b7280', '#e5e7eb'] },
  { name: 'NEON', colors: ['#a855f7', '#ec4899', '#f43f5e'] },
]

const animation = ref<(typeof animations)[number]>('wave')
const duration = ref(3)
const speed = ref(1)
const size = ref(200)
const hover = ref(false)
const replayKey = ref(0)

const reduceMotion = ref(false)
const hideFromScreenReader = ref(false)
const ariaLabel = ref('')

const readouts = ref({
  aria: 'pending',
  a11yHidden: 'pending',
  a11yLabel: 'pending',
  a11ySr: 'pending',
  backgroundPosition: 'pending',
  backgroundSize: 'pending',
  fill: 'pending',
  tagH1: 'pending',
  tagH2: 'pending',
})

let frame = 0

function replay() {
  replayKey.value++
}

/** Samples paint state off the live nodes, including the tag each `as` value produced. */
function sample() {
  const basic = document.querySelector<HTMLElement>('[data-testid="basic"]')
  const h1 = document.querySelector<HTMLElement>('[data-testid="element-h1"]')
  const h2 = document.querySelector<HTMLElement>('[data-testid="element-h2"]')
  const a11y = document.querySelector<HTMLElement>('[data-testid="a11y"]')

  if (!basic) {
    return
  }

  const styles = getComputedStyle(basic)
  const srOnly = a11y ? a11y.querySelector('.sr-only') : null

  readouts.value = {
    aria: basic.getAttribute('aria-label') ?? 'missing',
    a11yHidden: a11y?.getAttribute('aria-hidden') ?? 'false',
    a11yLabel: a11y?.getAttribute('aria-label') ?? 'missing',
    a11ySr: srOnly ? (srOnly.textContent || 'empty') : 'none',
    backgroundPosition: styles.backgroundPosition,
    backgroundSize: styles.backgroundSize,
    fill: styles.webkitTextFillColor || styles.color,
    tagH1: h1 ? h1.tagName.toLowerCase() : 'pending',
    tagH2: h2 ? h2.tagName.toLowerCase() : 'pending',
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
