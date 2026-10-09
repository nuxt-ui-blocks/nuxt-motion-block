<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextMorph"
      description="Per-character morphing between two strings: shared characters keep their identity through layout animation, added and removed characters fade in and out."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every character gets an id of the shape
        <code class="font-mono">char-{renderCount}-{index}-{letter}{count}</code>, so a letter that exists
        in both strings keeps the same id and is moved by
        <code class="font-mono">layout-id</code> instead of being re-created. The component has no timer
        of its own — this card morphs on click. Each instance is wrapped in
        <code class="font-mono">&lt;ClientOnly&gt;</code> because the internal
        <code class="font-mono">AnimatePresence mode="popLayout"</code> hydrates more nodes than the
        server prints, which would otherwise log a mismatch on load.
      </p>

      <div class="mb-8 flex flex-wrap items-center gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
        <UButton
          v-for="(phrase, position) in phrases"
          :key="phrase"
          :label="phrase"
          :variant="position === phraseIndex ? 'solid' : 'outline'"
          :data-testid="`phrase-${position}`"
          @click="phraseIndex = position"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <ClientOnly>
          <MTextMorph
            :text="currentPhrase"
            class-name="text-3xl font-black tracking-tight sm:text-4xl"
            data-testid="basic"
          />
        </ClientOnly>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          text
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-text"
        >
          {{ currentPhrase }}
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
          rendered tag
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-tag"
        >
          {{ readouts.tag }}
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
        <dt class="text-muted">
          layout-id
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-layout-id"
        >
          {{ readouts.layoutId }}
        </dd>
        <dt class="text-muted">
          visible glyphs
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-glyphs"
        >
          {{ readouts.glyphs }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Autoplay
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The interval is created in a click handler (and in
        <code class="font-mono">onMounted</code> when left running) and cleared in
        <code class="font-mono">onBeforeUnmount</code>, so nothing is scheduled before hydration —
        the component itself never touches a timer. Stop it and the phrase stays where it is.
      </p>

      <div class="mb-8 flex flex-wrap items-center gap-2">
        <UButton
          :label="playing ? 'Stop' : 'Start'"
          :icon="playing ? 'i-lucide-pause' : 'i-lucide-play'"
          variant="outline"
          data-testid="toggle-play"
          @click="togglePlaying()"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-auto"
          @click="autoIndex = 0"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <ClientOnly>
          <MTextMorph
            :text="autoPhrase"
            class-name="text-3xl font-black tracking-tight sm:text-4xl"
            data-testid="auto"
          />
        </ClientOnly>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          playing
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-playing"
        >
          {{ playing }}
        </dd>
        <dt class="text-muted">
          interval
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-auto-interval"
        >
          {{ autoInterval }}ms
        </dd>
        <dt class="text-muted">
          ticks
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-ticks"
        >
          {{ ticks }}
        </dd>
        <dt class="text-muted">
          phrase
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-auto-phrase"
        >
          {{ autoPhrase }}
        </dd>
        <dt class="text-muted">
          timer owner
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-owner"
        >
          page (component has none)
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="interval"
      >
        <USlider
          v-model="autoInterval"
          :max="4000"
          :min="500"
          :step="250"
          data-testid="slider-interval"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Element
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">as</code> is handed to Vue's built-in
        <code class="font-mono">&lt;component :is&gt;</code> here, so the tag really changes — unlike the
        same prop on TextGradient, which forwards it to <code class="font-mono">Motion</code> as
        <code class="font-mono">is</code>. The readouts are measured off the DOM, not taken from the prop.
      </p>

      <div class="mb-8 grid gap-4 sm:grid-cols-3">
        <div
          v-for="tag in tags"
          :key="tag"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-8"
        >
          <ClientOnly>
            <MTextMorph
              :key="tag"
              :as="tag"
              :text="`${tag.toUpperCase()} TAG`"
              class-name="text-xl font-bold"
              :data-testid="`element-${tag}`"
            />
          </ClientOnly>
          <span class="mt-3 text-xs text-muted">as="{{ tag }}"</span>
        </div>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <div
          v-for="tag in tags"
          :key="tag"
          class="contents"
        >
          <dt class="text-muted">
            as="{{ tag }}" renders
          </dt>
          <dd
            class="font-mono"
            :data-testid="`readout-tag-${tag}`"
          >
            {{ readouts.tags[tag] ?? 'pending' }}
          </dd>
        </div>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom variants &amp; transition
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The defaults slide each glyph <code class="font-mono">y: 20 → 0</code> on a
        <code class="font-mono">300/20/0.5</code> spring. Override all three keys and the transition is
        merged over the default, so a partial override keeps the spring's remaining fields.
      </p>

      <div class="mb-8 flex flex-wrap items-center gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-variants"
          @click="replayCustom()"
        />
        <UButton
          v-for="(phrase, position) in customPhrases"
          :key="phrase"
          :label="phrase"
          :variant="position === customIndex ? 'solid' : 'outline'"
          :data-testid="`custom-${position}`"
          @click="customIndex = position"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <ClientOnly>
          <MTextMorph
            :text="customPhrases[customIndex]"
            :variants="slideAcross"
            :transition="customTransition"
            class-name="text-3xl font-black tracking-tight"
            data-testid="custom"
          />
        </ClientOnly>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          initial x
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant-x"
        >
          {{ slideAcross.initial?.x }}
        </dd>
        <dt class="text-muted">
          transition
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant-transition"
        >
          {{ customTransition.type }} {{ customTransition.stiffness }}/{{ customTransition.damping }}
        </dd>
        <dt class="text-muted">
          exit y
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant-exit"
        >
          {{ slideAcross.exit?.y }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const phrases = ['HI', 'MORPH', 'TEXT STATE']
const tags = ['h1', 'p', 'span'] as const
const customPhrases = ['EAST', 'DRIFT']
const autoPhrases = ['ONE', 'TWO', 'THREE', 'FOUR']

const phraseIndex = ref(0)
const autoIndex = ref(0)
const customIndex = ref(0)

const playing = ref(true)
const autoInterval = ref(1500)
const ticks = ref(0)

const readouts = ref({
  aria: 'pending',
  chars: 'pending',
  glyphs: 'pending',
  layoutId: 'pending',
  tag: 'pending',
  tags: {} as Record<string, string>,
})

const currentPhrase = computed(() => phrases[phraseIndex.value])
const autoPhrase = computed(() => autoPhrases[autoIndex.value])

const slideAcross = {
  initial: { opacity: 0, x: -60, rotateX: 0 },
  animate: { opacity: 1, x: 0, rotateX: 0 },
  exit: { opacity: 0, x: 60, y: 0, rotateX: 0 },
}

const customTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
}

const timers = new Set<ReturnType<typeof setInterval>>()

async function replay() {
  if (phraseIndex.value === 0) {
    phraseIndex.value = 1
    await nextTick()
  }
  phraseIndex.value = 0
}

async function replayCustom() {
  if (customIndex.value === 0) {
    customIndex.value = 1
    await nextTick()
  }
  customIndex.value = 0
}

function startTimer() {
  const id = setInterval(() => {
    ticks.value++
    autoIndex.value = (autoIndex.value + 1) % autoPhrases.length
  }, autoInterval.value)
  timers.add(id)
}

function stopTimers() {
  timers.forEach(id => clearInterval(id))
  timers.clear()
}

function togglePlaying() {
  if (playing.value) {
    stopTimers()
    playing.value = false
    return
  }

  startTimer()
  playing.value = true
}

// Slider edits rebuild a running interval instead of waiting for it to fire.
watch(autoInterval, () => {
  if (!playing.value) {
    return
  }
  stopTimers()
  startTimer()
})

function sample() {
  const basic = document.querySelector<HTMLElement>('[data-testid="basic"]')
  const custom = document.querySelector<HTMLElement>('[data-testid="custom"]')
  const layoutId = custom?.querySelector<HTMLElement>('[layout-id]')

  readouts.value = {
    ...readouts.value,
    aria: basic?.getAttribute('aria-label') ?? 'missing',
    chars: String(basic?.querySelectorAll(':scope > *').length ?? 0),
    glyphs: String(custom?.querySelectorAll(':scope > *').length ?? 0),
    layoutId: layoutId?.getAttribute('layout-id') ?? 'prop only, not in DOM',
    tag: basic?.tagName.toLowerCase() ?? 'pending',
    tags: Object.fromEntries(
      tags.map(tag => [
        tag,
        document.querySelector(`[data-testid="element-${tag}"]`)?.tagName.toLowerCase() ?? 'pending',
      ]),
    ),
  }
}

let frame = 0

onMounted(() => {
  if (playing.value) {
    startTimer()
  }

  const tick = () => {
    sample()
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  stopTimers()
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>
