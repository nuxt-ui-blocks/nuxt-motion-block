<template>
  <div class="space-y-12">
    <UPageHeader
      title="WordRotate"
      description="A list of words cycling through one slot, each swap animated on its own curve."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Only the current word exists in the DOM: the inner Motion element is keyed by index, so each
        swap is a fresh mount that animates in from the style's initial state. The interval fires
        every <code class="font-mono">duration + pauseDuration</code> — the word sits visible for
        <code class="font-mono">duration</code>, then <code class="font-mono">pauseDuration</code>
        covers the exit before the next index mounts.
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
          :label="loop ? 'Loop on' : 'Loop off'"
          variant="outline"
          data-testid="toggle-loop"
          @click="loop = !loop; replay()"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <div class="text-3xl font-bold text-highlighted">
          Build
          <MWordRotate
            :key="Number(trigger)"
            :duration="duration"
            :loop="loop"
            :pause-duration="pauseDuration"
            :words="words"
            animation-style="slide-up"
            class="text-primary"
            data-testid="basic"
          />
          things that move.
        </div>
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="duration"
          :hint="`${duration}ms visible`"
        >
          <USlider
            v-model="duration"
            :max="4000"
            :min="400"
            :step="100"
          />
        </UFormField>
        <UFormField
          label="pauseDuration"
          :hint="`${pauseDuration}ms exit window`"
        >
          <USlider
            v-model="pauseDuration"
            :max="4000"
            :min="0"
            :step="100"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          swap timing
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-swap"
        >
          {{ duration }}ms + {{ pauseDuration }}ms
        </dd>
        <dt class="text-muted">
          cycle
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cycle"
        >
          {{ duration + pauseDuration }}ms
        </dd>
        <dt class="text-muted">
          full rotation
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rotation"
        >
          {{ (duration + pauseDuration) * words.length }}ms
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
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Animation style
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The prop is named <code class="font-mono">animation-style</code> and only accepts
        <code class="font-mono">fade</code>, <code class="font-mono">slide-up</code>,
        <code class="font-mono">slide-down</code>, <code class="font-mono">scale</code> or
        <code class="font-mono">flip</code>. The docs' <code class="font-mono">animation="slide"</code>
        and <code class="font-mono">pause-on-hover</code> do not exist in this component.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="style in animationStyles"
          :key="style"
          :label="style"
          :variant="style === activeStyle ? 'solid' : 'outline'"
          :data-testid="`style-${style}`"
          @click="applyStyle(style)"
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
        <div class="text-3xl font-bold text-highlighted">
          Every swap is
          <MWordRotate
            :key="`${trigger}-${activeStyle}`"
            :animation-style="activeStyle"
            :duration="duration"
            :pause-duration="pauseDuration"
            :words="words"
            class="text-primary"
            data-testid="style"
          />
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active style
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-style"
        >
          {{ activeStyle }}
        </dd>
        <dt class="text-muted">
          styles
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-styles"
        >
          {{ animationStyles.join(', ') }}
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
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Word list
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each list is an <code class="font-mono">as const</code> tuple of strings. Only the word at
        <code class="font-mono">currentWord</code> is rendered, so a screen reader announces one word
        per swap rather than reading the whole list up front.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="list in wordLists"
          :key="list.label"
          :label="list.label"
          :variant="list.label === activeList ? 'solid' : 'outline'"
          :data-testid="`list-${list.label}`"
          @click="applyList(list)"
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
        <div class="text-3xl font-bold text-highlighted">
          <MWordRotate
            :key="`${trigger}-${activeList}`"
            :duration="duration"
            :pause-duration="pauseDuration"
            :words="words"
            animation-style="fade"
            class="text-primary"
            data-testid="list"
          />
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
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
          entries
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-entries"
        >
          {{ words.join(' | ') }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const trigger = ref(false)
const duration = ref(2000)
const pauseDuration = ref(300)
const loop = ref(true)
const activeStyle = ref<(typeof animationStyles)[number]>('slide-up')
const activeList = ref('Verbs')

const animationStyles = ['fade', 'slide-up', 'slide-down', 'scale', 'flip'] as const

const wordLists = [
  { label: 'Verbs', words: ['ship', 'iterate', 'measure', 'refine'] as readonly string[] },
  { label: 'Nouns', words: ['interfaces', 'motion', 'systems', 'details'] as readonly string[] },
  { label: 'Adjectives', words: ['fast', 'deliberate', 'quiet', 'precise'] as readonly string[] },
] as const

const words = ref<string[]>([...wordLists[0].words])

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applyStyle(style: (typeof animationStyles)[number]) {
  activeStyle.value = style
  replay()
}

function applyList(list: (typeof wordLists)[number]) {
  activeList.value = list.label
  words.value = [...list.words]
  replay()
}
</script>
