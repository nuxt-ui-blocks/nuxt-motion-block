<template>
  <div class="space-y-12">
    <UPageHeader
      title="RansomNote"
      description="Each letter torn out of the newspaper and pasted back at the wrong angle."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every scrap's font, paper colour, rotation, skew and entrance offset comes from a seeded PRNG, so
        the server and the client build byte-identical markup — which is why the note looks identical on
        both sides of hydration. Change <code class="font-mono">seed</code> and the whole collage is
        re-cut; leave it alone and the note never changes.
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
          :label="`animate: ${animate}`"
          icon="i-lucide-play"
          variant="outline"
          data-testid="toggle-animate"
          @click="toggleAnimate()"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MRansomNote
          :key="replayKey"
          class="max-w-lg text-center text-3xl font-bold"
          :animate="animate"
          :intensity="intensity"
          :seed="seed"
          :text="headline"
          data-testid="basic"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          scraps
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ readouts.count }}
        </dd>
        <dt class="text-muted">
          distinct fonts
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-fonts"
        >
          {{ readouts.fonts }}
        </dd>
        <dt class="text-muted">
          distinct papers
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-papers"
        >
          {{ readouts.papers }}
        </dd>
        <dt class="text-muted">
          first scrap transform
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-transform"
        >
          {{ readouts.transform }}
        </dd>
        <dt class="text-muted">
          first scrap type
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-font"
        >
          {{ readouts.font }}
        </dd>
        <dt class="text-muted">
          first scrap size / paper
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-scalepaper"
        >
          {{ readouts.scalePaper }}
        </dd>
        <dt class="text-muted">
          rotation channel present
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rotate"
        >
          {{ readouts.rotate }}
        </dd>
        <dt class="text-muted">
          skew channel present
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-skew"
        >
          {{ readouts.skew }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="intensity"
        :max="100"
        :min="0"
        :step="5"
      >
        <USlider
          v-model="intensityPercent"
          :max="100"
          :min="0"
          :step="5"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="seed"
        :max="99"
        :min="1"
        :step="1"
      >
        <USlider
          v-model="seed"
          :max="99"
          :min="1"
          :step="1"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Animate modes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">assemble</code> flies every scrap in from a random offset on a spring and
        settles it; <code class="font-mono">jitter</code> keeps it still but makes it tremble forever; and
        <code class="font-mono">none</code> drops straight to the collage. Note that
        <code class="font-mono">stagger</code> is in <strong>seconds</strong> on this component — every
        other stagger in the library is milliseconds.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="mode in animateModes"
          :key="mode"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            animate: {{ mode }}
          </p>
          <div
            class="grid min-h-32 place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-8"
            :data-testid="`pair-${mode}`"
          >
            <MRansomNote
              :key="`${mode}-${replayKey}`"
              class="text-center text-xl font-bold"
              :animate="mode"
              :intensity="intensity"
              :seed="seed"
              :text="headline"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Readable copy
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every scrap is <code class="font-mono">aria-hidden</code>, so the note is a wall of hidden glyphs
        to a screen reader. The sentence lives in a visually hidden span on the wrapper instead — which
        also means <code class="font-mono">sr-only</code> is doing double duty here, hiding text that is
        meant to be found.
      </p>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MRansomNote
          :key="`copy-${replayKey}`"
          class="text-center text-2xl font-bold"
          animate="none"
          :intensity="intensity"
          :seed="seed"
          :text="headline"
          data-testid="pair-copy"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Environment
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          prefers-reduced-motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduced"
        >
          {{ reduced ? 'reduce' : 'no-preference' }}
        </dd>
        <dt class="text-muted">
          aria-hidden scraps
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-hidden"
        >
          {{ readouts.hidden }}
        </dd>
        <dt class="text-muted">
          aria-label on wrapper
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-aria"
        >
          {{ readouts.aria }}
        </dd>
        <dt class="text-muted">
          sr-only copy
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-copy"
        >
          {{ readouts.copy }}
        </dd>
        <dt class="text-muted">
          entry
        </dt>
        <dd class="font-mono">
          duration 0.25 · bounce 0.1
        </dd>
        <dt class="text-muted">
          stagger unit
        </dt>
        <dd class="font-mono">
          seconds (default 0.03)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { RansomNoteAnimate } from '../../../src/runtime/components/RansomNote/constants'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const headline = 'RANSOM'

const animateModes: RansomNoteAnimate[] = ['none', 'assemble', 'jitter']
const cycle: RansomNoteAnimate[] = ['none', 'assemble', 'jitter']

const animate = ref<RansomNoteAnimate>('assemble')
const intensityPercent = ref(60)
const seed = ref(1)
const replayKey = ref(0)
const reduced = ref(false)

const intensity = computed(() => intensityPercent.value / 100)

const readouts = ref({
  aria: 'pending',
  copy: 'pending',
  count: 'pending',
  font: 'pending',
  fonts: 'pending',
  hidden: 'pending',
  papers: 'pending',
  rotate: 'pending',
  scalePaper: 'pending',
  skew: 'pending',
  transform: 'pending',
})

function replay() {
  replayKey.value++
}

function toggleAnimate() {
  animate.value = cycle[(cycle.indexOf(animate.value) + 1) % cycle.length] ?? 'assemble'
}

/**
 * The whole point of this demo is the transform string. `skew` rides in the
 * animated state rather than in `style`, because motion-v owns the transform and
 * would drop a static channel the first time the rotation animates — so if the
 * skew survives at all, it has to appear in the same `transform` as `rotate`.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]')

  if (!root) {
    return
  }

  const collage = root.querySelector('[aria-hidden="true"]')
  const scraps = collage ? Array.from(collage.children) as HTMLElement[] : []
  const first = scraps[0]

  if (!first) {
    return
  }

  const style = getComputedStyle(first)
  // The animated transform is a function string in the element's own inline
  // style. `getComputedStyle` resolves it to `matrix3d(...)`, where `rotate` and
  // `skew` no longer appear by name, so the channel check has to read the inline
  // value. Reading the computed one made both channels report `MISSING` forever
  // even though the skew was animating correctly the whole time.
  const transform = first.style.transform || style.transform

  readouts.value = {
    aria: root.getAttribute('aria-label') ?? 'none (plain div)',
    copy: (root.querySelector('.sr-only')?.textContent ?? '').slice(0, 32),
    count: String(scraps.length),
    font: style.fontFamily.split(',')[0]?.replace(/['"]/g, '') ?? '',
    fonts: String(new Set(scraps.map(scrap => getComputedStyle(scrap).fontFamily)).size),
    hidden: String(scraps.filter(scrap => scrap.getAttribute('aria-hidden') === 'true').length),
    papers: String(new Set(scraps.map(scrap => getComputedStyle(scrap).backgroundColor)).size),
    rotate: transform.includes('rotate') ? 'rotate() present' : 'MISSING',
    scalePaper: `${style.fontSize} on ${style.backgroundColor}`,
    skew: transform.includes('skew') ? 'skewX() present' : 'MISSING',
    transform: transform === 'none' ? 'none' : transform.slice(0, 60),
  }
}

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timer = setInterval(sample, 120)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
