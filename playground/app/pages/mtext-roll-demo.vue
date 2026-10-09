<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextRoll"
      description="Two stacked copies per letter — one rotating away, one rotating in — sharing a perspective wrapper so a word flips through itself letter by letter."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each letter owns three children: an enter layer at
        <code class="font-mono">rotateX 0 → 90</code>, an exit layer at
        <code class="font-mono">90 → 0</code>, and an invisible spacer that reserves the width. The layers
        are <code class="font-mono">backface-visibility: hidden</code>, so at 90° the letter simply is not
        there. The animation runs once per mount — Replay remounts the component.
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
          v-for="(phrase, position) in phrases"
          :key="phrase"
          :label="phrase"
          :variant="phrase === currentPhrase ? 'solid' : 'outline'"
          :data-testid="`phrase-${position}`"
          @click="setPhrase(phrase)"
        />
      </div>

      <div class="mb-8 rounded-2xl bg-(--ui-bg-muted) px-6 py-14 text-center">
        <MTextRoll
          :key="`basic-${replayKey}`"
          :duration="duration"
          :get-enter-delay="enterDelay"
          :get-exit-delay="exitDelay"
          :on-animation-complete="onComplete"
          class="text-3xl font-black tracking-tight sm:text-4xl"
          data-testid="roll"
          :children="currentPhrase"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          letters
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-letters"
        >
          {{ readouts.letters }}
        </dd>
        <dt class="text-muted">
          duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          {{ duration.toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          last enter delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-last-enter"
        >
          {{ enterDelay(currentPhrase.length - 1).toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          last exit delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-last-exit"
        >
          {{ exitDelay(currentPhrase.length - 1).toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          complete callbacks
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-completes"
        >
          {{ completes }}
        </dd>
        <dt class="text-muted">
          sr-only copy
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-sr"
        >
          {{ readouts.sr }}
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="duration"
        :hint="`both layers share it; delays are added on top`"
      >
        <USlider
          v-model="duration"
          :max="2"
          :min="0.1"
          :step="0.1"
          data-testid="slider-duration"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom stagger
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The defaults are <code class="font-mono">(i) =&gt; i * 0.1</code> for enter and
        <code class="font-mono">(i) =&gt; i * 0.1 + 0.2</code> for exit, which reads left to right. The
        functions are called per letter on every render, so a countdown index flips the whole word in the
        opposite direction.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-stagger"
          @click="staggerKey++"
        />
        <UButton
          :label="`order: ${order}`"
          icon="i-lucide-arrow-left-right"
          variant="outline"
          data-testid="toggle-order"
          @click="order = order === 'forward' ? 'reverse' : 'forward'"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextRoll
          :key="`stagger-${staggerKey}`"
          :duration="duration"
          :get-enter-delay="staggerEnterDelay"
          :get-exit-delay="staggerExitDelay"
          class="text-3xl font-black sm:text-4xl"
          data-testid="stagger"
          children="COUNTDOWN"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          first enter delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-first-enter"
        >
          {{ staggerEnterDelay(0).toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          last enter delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stagger-last"
        >
          {{ staggerEnterDelay('COUNTDOWN'.length - 1).toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          order
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-order"
        >
          {{ order }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom variants
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">variants</code> is read as four independent fields —
        <code class="font-mono">enter.initial</code>, <code class="font-mono">enter.animate</code>,
        <code class="font-mono">exit.initial</code>, <code class="font-mono">exit.animate</code> — each
        falling back to its own default when empty. Flip the axis to
        <code class="font-mono">rotateY</code> and the word spins on its vertical edge instead.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-variants"
          @click="variantKey++"
        />
        <UButton
          :label="`axis: ${axis}`"
          icon="i-lucide-refresh-cw"
          variant="outline"
          data-testid="toggle-axis"
          @click="axis = axis === 'rotateX' ? 'rotateY' : 'rotateX'"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextRoll
          :key="`variants-${variantKey}`"
          :duration="duration"
          :variants="axisVariants"
          class="text-3xl font-black sm:text-4xl"
          data-testid="variants"
          children="SPIN"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          enter initial
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant-enter-initial"
        >
          {{ enterInitialLabel }}
        </dd>
        <dt class="text-muted">
          enter animate
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant-enter-animate"
        >
          {{ enterAnimateLabel }}
        </dd>
        <dt class="text-muted">
          axis
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-axis"
        >
          {{ axis }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Container classes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The docs document a <code class="font-mono">className</code> prop, but the component declares
        <code class="font-mono">class</code> — <code class="font-mono">className</code> is not in
        <code class="font-mono">TextRollProps</code>, so it falls through as a literal
        <code class="font-mono">classname</code> attribute and styles nothing. Both strings below are
        read back off the live roots.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay both"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-classes"
          @click="classKey++"
        />
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
          <MTextRoll
            :key="`class-${classKey}`"
            class="text-2xl font-bold text-primary"
            data-testid="roll-class"
            children="class"
          />
          <span class="mt-4 text-xs text-muted">class="text-2xl font-bold text-primary"</span>
        </div>
        <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
          <MTextRoll
            :key="`classname-${classKey}`"
            class-name="text-2xl font-bold text-primary"
            data-testid="roll-classname"
            children="className"
          />
          <span class="mt-4 text-xs text-muted">className="text-2xl font-bold text-primary"</span>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <dt class="text-muted">
          root class (class=)
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-root-class"
        >
          {{ readouts.rootClass }}
        </dd>
        <dt class="text-muted">
          root class (className=)
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-root-classname"
        >
          {{ readouts.rootClassName }}
        </dd>
        <dt class="text-muted">
          stray attribute
        </dt>
        <dd
          class="font-mono truncate"
          data-testid="readout-stray-attr"
        >
          {{ readouts.strayAttr }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const phrases = ['SHIP IT', 'ROLL', 'NEXT WEEK']

const currentPhrase = ref(phrases[0])
const duration = ref(0.5)
const replayKey = ref(0)
const staggerKey = ref(0)
const variantKey = ref(0)
const classKey = ref(0)
const completes = ref(0)

const order = ref<'forward' | 'reverse'>('forward')
const axis = ref<'rotateX' | 'rotateY'>('rotateX')

const readouts = ref({
  letters: 'pending',
  rootClass: 'pending',
  rootClassName: 'pending',
  sr: 'pending',
  strayAttr: 'pending',
})

const enterDelay = (i: number) => i * 0.1
const exitDelay = (i: number) => i * 0.1 + 0.2

const staggerEnterDelay = (i: number) =>
  order.value === 'forward' ? i * 0.08 : ('COUNTDOWN'.length - 1 - i) * 0.08

const staggerExitDelay = (i: number) => staggerEnterDelay(i) + 0.25

const axisVariants = computed(() => ({
  enter: {
    initial: { [axis.value]: 0 },
    animate: { [axis.value]: 90 },
  },
  exit: {
    initial: { [axis.value]: 90 },
    animate: { [axis.value]: 0 },
  },
}))

const enterInitialLabel = computed(() => `${axis.value}: 0`)
const enterAnimateLabel = computed(() => `${axis.value}: 90`)

function setPhrase(phrase: string) {
  currentPhrase.value = phrase
  replayKey.value++
}

function onComplete() {
  completes.value++
}

/** Reads back the container's real class list and the stray `classname` attribute. */
function sample() {
  const roll = document.querySelector<HTMLElement>('[data-testid="roll"]')
  const withClass = document.querySelector<HTMLElement>('[data-testid="roll-class"]')
  const withClassName = document.querySelector<HTMLElement>('[data-testid="roll-classname"]')

  if (!roll) {
    return
  }

  readouts.value = {
    letters: String(roll.querySelectorAll(':scope > span:not(.sr-only)').length),
    rootClass: withClass?.className || '(empty)',
    rootClassName: withClassName?.className || '(empty)',
    sr: roll.querySelector('.sr-only')?.textContent ?? 'missing',
    strayAttr:
      withClassName?.getAttribute('class-name')
      ?? withClassName?.getAttribute('classname')
      ?? 'not rendered',
  }
}

let frame = 0

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
