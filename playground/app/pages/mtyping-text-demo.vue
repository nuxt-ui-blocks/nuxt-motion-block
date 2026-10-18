<template>
  <div class="space-y-12">
    <UPageHeader
      title="TypingText"
      description="Characters revealed one at a time behind a blinking cursor, optionally cycling a list."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        A chain of <code class="font-mono">setTimeout</code> calls appends one character per
        <code class="font-mono">speed</code> tick until the string is exhausted, then the component
        emits <code class="font-mono">complete</code> — but it also calls its declared
        <code class="font-mono">onComplete</code> prop, so <code class="font-mono">@complete</code>
        resolves to both and the counter below steps twice per run. The cursor is a Motion element
        blinking on a four-step opacity keyframe rather than a CSS steps() trick, so it fades instead
        of snapping.
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
        <MTypingText
          :key="Number(trigger)"
          :cursor="cursor"
          :delay="delay"
          :show-cursor="showCursor"
          :speed="speed"
          :text="text"
          class="text-3xl font-bold"
          data-testid="basic"
          @complete="basicCount++"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="speed"
          :hint="`${speed}ms per character`"
        >
          <USlider
            v-model="speed"
            :max="400"
            :min="20"
            :step="10"
          />
        </UFormField>
        <UFormField
          label="delay"
          :hint="`${delay}ms before typing`"
        >
          <USlider
            v-model="delay"
            :max="2000"
            :min="0"
            :step="100"
          />
        </UFormField>
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          :label="showCursor ? 'Cursor on' : 'Cursor off'"
          variant="outline"
          data-testid="toggle-cursor"
          @click="showCursor = !showCursor; replay()"
        />
        <UButton
          :label="cursor === '|' ? 'Cursor: pipe' : 'Cursor: block'"
          variant="outline"
          data-testid="toggle-cursor-char"
          @click="cursor = cursor === '|' ? '▌' : '|'; replay()"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          characters
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-characters"
        >
          {{ text.length }}
        </dd>
        <dt class="text-muted">
          typing time
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-time"
        >
          {{ text.length * speed + delay }}ms
        </dd>
        <dt class="text-muted">
          cursor
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cursor"
        >
          {{ showCursor ? cursor : 'hidden' }}
        </dd>
        <dt class="text-muted">
          complete events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-complete"
        >
          {{ basicCount }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Animation preset
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">animation</code> only changes the container's entrance while the
        characters type — it does not affect the typing itself. Any string outside the
        <code class="font-mono">as const</code> list below falls through to the default
        <code class="font-mono">{ opacity: 0, y: 10 }</code> state.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="preset in animationPresets"
          :key="preset"
          :label="preset"
          :variant="preset === activePreset ? 'solid' : 'outline'"
          :data-testid="`preset-${preset}`"
          @click="applyPreset(preset)"
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
        <MTypingText
          :key="`${trigger}-${activePreset}`"
          :animation="activePreset"
          :speed="speed"
          :text="text"
          class="text-3xl font-bold"
          data-testid="preset"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-preset"
        >
          {{ activePreset }}
        </dd>
        <dt class="text-muted">
          presets
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-presets"
        >
          {{ animationPresets.length }}
        </dd>
        <dt class="text-muted">
          transition
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-transition"
        >
          0.6s ease-out (hardcoded)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Cycling list
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">texts</code> set, the index only advances after a
        <code class="font-mono">pauseDuration</code> gap while <code class="font-mono">loop</code> is
        on — with it off, the first text types once and the chain stops. The docs' manual
        <code class="font-mono">start()</code> / <code class="font-mono">pause()</code> API does not
        exist here — Replay remounts the component instead.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="list in textLists"
          :key="list.label"
          :label="list.label"
          :variant="list.label === activeList ? 'solid' : 'outline'"
          :data-testid="`list-${list.label}`"
          @click="applyList(list)"
        />
        <UButton
          :label="loop ? 'Loop on' : 'Loop off'"
          variant="outline"
          data-testid="toggle-loop"
          @click="loop = !loop; replay()"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTypingText
          :key="`${trigger}-cycle-${activeList}-${loop}`"
          :loop="loop"
          :pause-duration="pauseDuration"
          :speed="speed"
          :texts="texts"
          class="text-3xl font-bold"
          data-testid="cycle"
          @complete="cycleCount++"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="pauseDuration"
          :hint="`${pauseDuration}ms between texts`"
        >
          <USlider
            v-model="pauseDuration"
            :max="5000"
            :min="200"
            :step="100"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          list
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-list"
        >
          {{ activeList }}
        </dd>
        <dt class="text-muted">
          texts
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-texts"
        >
          {{ texts.length }}
        </dd>
        <dt class="text-muted">
          loop
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-loop"
        >
          {{ loop ? 'true' : 'false' }}
        </dd>
        <dt class="text-muted">
          complete events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cycle-complete"
        >
          {{ cycleCount }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const text = 'Typing one character at a time'
const trigger = ref(false)
const speed = ref(60)
const delay = ref(300)
const showCursor = ref(true)
const cursor = ref('|')
const basicCount = ref(0)
const cycleCount = ref(0)
const loop = ref(true)
const pauseDuration = ref(1500)
const activePreset = ref('blurIn')
const activeList = ref('Short')

const animationPresets = [
  'fadeIn',
  'blurIn',
  'blurInUp',
  'slideUp',
  'slideDown',
  'scaleUp',
  'slideLeft',
] as const

const textLists = [
  { label: 'Short', texts: ['Ship it.', 'Measure it.', 'Improve it.'] as readonly string[] },
  { label: 'Long', texts: ['A longer line takes more ticks to finish typing.', 'Then the pause starts the next one.'] as readonly string[] },
] as const

const texts = ref<string[]>([...textLists[0].texts])

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applyPreset(preset: (typeof animationPresets)[number]) {
  activePreset.value = preset
  replay()
}

function applyList(list: (typeof textLists)[number]) {
  activeList.value = list.label
  texts.value = [...list.texts]
  replay()
}
</script>
