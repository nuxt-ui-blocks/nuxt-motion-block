<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextScramble"
      description="Text that resolves out of random characters, locking each glyph in place from left to right."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The reveal is index-driven: once <code class="font-mono">progress × text.length</code> passes a
        character's position it stops rolling and keeps its real glyph. Spaces are exempt from the
        character set, so word shapes stay readable the whole way through. The component both emits
        <code class="font-mono">scrambleComplete</code> and calls its declared
        <code class="font-mono">onScrambleComplete</code> prop, so <code class="font-mono">@scramble-complete</code>
        resolves to both and the counter below steps twice per run.
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
        <MTextScramble
          :duration="duration"
          :speed="speed"
          :text="headline"
          :trigger="trigger"
          class="text-3xl font-bold"
          data-testid="basic"
          @scramble-complete="scrambleCount++"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="duration"
          :hint="`${duration}s total`"
        >
          <USlider
            v-model="duration"
            :max="3"
            :min="0.1"
            :step="0.1"
          />
        </UFormField>
        <UFormField
          label="speed"
          :hint="`${speed}s per tick`"
        >
          <USlider
            v-model="speed"
            :max="0.2"
            :min="0.01"
            :step="0.01"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          steps
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-steps"
        >
          {{ steps }}
        </dd>
        <dt class="text-muted">
          character set
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-charset"
        >
          {{ characterSet.length }} glyphs
        </dd>
        <dt class="text-muted">
          complete events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-complete"
        >
          {{ scrambleCount }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Character set
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">characterSet</code> is sampled with
        <code class="font-mono">Math.random()</code> for every unresolved character on every tick, so
        swapping it re-rolls the whole pending tail. Replay re-runs the animation with the new set.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="set in characterSets"
          :key="set.label"
          :label="set.label"
          :variant="set.label === activeSet ? 'solid' : 'outline'"
          :data-testid="`charset-${set.label}`"
          @click="applySet(set)"
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
        <MTextScramble
          :character-set="characterSet"
          :duration="duration"
          :speed="speed"
          :text="charsetSample"
          :trigger="trigger"
          class="text-2xl font-bold"
          data-testid="charset"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active set
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-active-set"
        >
          {{ activeSet }}
        </dd>
        <dt class="text-muted">
          glyphs
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-glyphs"
        >
          {{ characterSet }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Element
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        This component forwards <code class="font-mono">as</code> to Motion as an
        <code class="font-mono">is</code> attribute, which Motion never reads — so all three instances
        render a <code class="font-mono">div</code> with an inert <code class="font-mono">is="…"</code>
        attribute. The readout below reports the tag the browser actually produced, not the prop you
        passed.
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

      <div class="grid gap-4 sm:grid-cols-3">
        <div
          v-for="option in elements"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-8"
        >
          <MTextScramble
            :as="option"
            :duration="duration"
            :speed="speed"
            :text="`as ${option}`"
            :trigger="trigger"
            class="font-bold"
            :data-testid="`as-${option}`"
          />
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt
          v-for="option in elements"
          :key="option"
          class="text-muted"
        >
          as="{{ option }}"
        </dt>
        <dd
          v-for="option in elements"
          :key="`tag-${option}`"
          class="font-mono"
          :data-testid="`readout-as-${option}`"
        >
          {{ renderedTags[option] ?? 'pending' }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const headline = 'Scramble into focus'
const charsetSample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const trigger = ref(true)
const duration = ref(0.8)
const speed = ref(0.04)
const scrambleCount = ref(0)
const activeSet = ref('Alphanumeric')
const renderedTags = ref<Record<string, string>>({})

const characterSet = ref(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
)

const characterSets = [
  {
    label: 'Alphanumeric',
    value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  },
  { label: 'Uppercase', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  { label: 'Digits', value: '0123456789' },
  { label: 'Symbols', value: '!@#$%^&*()_+-=[]{}|;:,.<>?' },
] as const

const elements = ['p', 'h1', 'span'] as const

const steps = Math.round(duration.value / speed.value)

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applySet(set: (typeof characterSets)[number]) {
  activeSet.value = set.label
  characterSet.value = set.value
  replay()
}

onMounted(() => {
  for (const option of elements) {
    const element = document.querySelector(`[data-testid="as-${option}"]`)
    renderedTags.value[option] = element?.tagName.toLowerCase() ?? 'missing'
  }
})
</script>
