<template>
  <div class="space-y-12">
    <UPageHeader
      title="TrueFocus"
      description="A frame that walks from word to word, sharpening one and blurring the rest."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Auto cycle
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The sentence is split on spaces; an interval of
        <code class="font-mono">(animationDuration + pauseBetweenAnimations) × 1000</code>ms advances
        the index and a Motion div tweens the four corner brackets to the active word's box over
        <code class="font-mono">animationDuration</code>. The active word gets
        <code class="font-mono">blur(0px)</code>, everyone else gets
        <code class="font-mono">blur(blurAmount)</code>. The readout below probes that inline filter
        every 150ms, so it reports whichever word is sharp right now.
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

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTrueFocus
          :key="Number(trigger)"
          :animation-duration="animationDuration"
          :blur-amount="blurAmount"
          :border-color="borderColor"
          :pause-between-animations="pauseBetweenAnimations"
          :sentence="sentence"
          data-testid="auto"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-3">
        <UFormField
          label="blurAmount"
          :hint="`${blurAmount}px`"
        >
          <USlider
            v-model="blurAmount"
            :max="20"
            :min="1"
            :step="1"
          />
        </UFormField>
        <UFormField
          label="animationDuration"
          :hint="`${animationDuration}s`"
        >
          <USlider
            v-model="animationDuration"
            :max="2"
            :min="0.1"
            :step="0.1"
          />
        </UFormField>
        <UFormField
          label="pauseBetweenAnimations"
          :hint="`${pauseBetweenAnimations}s`"
        >
          <USlider
            v-model="pauseBetweenAnimations"
            :max="4"
            :min="0"
            :step="0.1"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          words
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-words"
        >
          {{ sentence.split(' ').length }}
        </dd>
        <dt class="text-muted">
          cycle interval
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-interval"
        >
          {{ Math.round((animationDuration + pauseBetweenAnimations) * 1000) }}ms
        </dd>
        <dt class="text-muted">
          focused word
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-focused"
        >
          {{ focusedWord ?? 'pending' }}
        </dd>
        <dt class="text-muted">
          mode
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mode"
        >
          {{ manualMode ? 'manual' : 'auto' }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Border colour
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">borderColor</code> is written to <code class="font-mono">--border-color</code>
        and drives both the bracket strokes and their drop shadow. Note that
        <code class="font-mono">glowColor</code> is stored on <code class="font-mono">--glow-color</code>
        but nothing reads that variable — the shadow follows the border colour instead.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="colour in borderColours"
          :key="colour.label"
          :label="colour.label"
          :variant="colour.value === borderColor ? 'solid' : 'outline'"
          :data-testid="`colour-${colour.label}`"
          @click="applyColour(colour)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTrueFocus
          :key="`${trigger}-${borderColor}`"
          :animation-duration="animationDuration"
          :blur-amount="blurAmount"
          :border-color="borderColor"
          :glow-color="glowColour"
          :pause-between-animations="pauseBetweenAnimations"
          :sentence="sentence"
          data-testid="colour"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          borderColor
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-border"
        >
          {{ borderColor }}
        </dd>
        <dt class="text-muted">
          glowColor
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-glow"
        >
          {{ glowColour }}
        </dd>
        <dt class="text-muted">
          read by CSS
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-glow-wired"
        >
          --glow-color: unused
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Manual mode
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">manualMode</code> the interval is cleared, so hovering a word
        moves the brackets and leaving restores the last hovered word. Toggling remounts the
        component, so switching back to auto restarts the cycle from the first word.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="manualMode ? 'Switch to auto' : 'Switch to manual'"
          icon="i-lucide-hand"
          variant="outline"
          data-testid="toggle-manual"
          @click="manualMode = !manualMode; replay()"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTrueFocus
          :key="`${trigger}-manual-${manualMode}`"
          :animation-duration="animationDuration"
          :blur-amount="blurAmount"
          :border-color="borderColor"
          :manual-mode="manualMode"
          :pause-between-animations="pauseBetweenAnimations"
          :sentence="sentence"
          data-testid="manual"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          manualMode
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-manual"
        >
          {{ manualMode ? 'true' : 'false' }}
        </dd>
        <dt class="text-muted">
          input
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-input"
        >
          {{ manualMode ? 'hover' : 'interval' }}
        </dd>
        <dt class="text-muted">
          sentence
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-sentence"
        >
          {{ sentence }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const sentence = 'True Focus follows the words'
const trigger = ref(false)
const blurAmount = ref(5)
const animationDuration = ref(0.5)
const pauseBetweenAnimations = ref(1)
const manualMode = ref(false)
const borderColor = ref('green')
const glowColour = ref('rgba(0, 255, 0, 0.6)')
const focusedWord = ref<string | null>(null)

const borderColours = [
  { label: 'Green', value: 'green' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Amber', value: '#f59e0b' },
  { label: 'Violet', value: '#8b5cf6' },
] as const

let probeId: ReturnType<typeof setInterval> | null = null

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applyColour(colour: (typeof borderColours)[number]) {
  borderColor.value = colour.value
  glowColour.value = colour.value === 'green' ? 'rgba(0, 255, 0, 0.6)' : colour.value
  replay()
}

function probeFocus() {
  const words = document.querySelectorAll('[data-testid="auto"] > span')
  let found: string | null = null
  words.forEach((element) => {
    const filter = (element as HTMLElement).style.filter
    if (filter.includes('blur(0')) found = element.textContent?.trim() ?? found
  })
  focusedWord.value = found
}

onMounted(() => {
  probeId = setInterval(probeFocus, 150)
})

onBeforeUnmount(() => {
  if (probeId) clearInterval(probeId)
})
</script>
