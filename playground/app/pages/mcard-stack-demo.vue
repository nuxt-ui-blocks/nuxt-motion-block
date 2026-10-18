<template>
  <div class="space-y-12">
    <UPageHeader
      title="Stacked Cards"
      description="A deck that deals itself — cards rotate through the front on a timer or on demand."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Auto rotate
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every card is absolutely positioned and the stack animates
        <code class="font-mono">top</code>, <code class="font-mono">scale</code> and
        <code class="font-mono">z-index</code>, so the front card is always the largest and the
        ones behind it peek over its top edge. The deck only mounts its cards on the client, so
        this section is empty during SSR.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MCardStack
          :key="`auto-${rotateInterval}`"
          data-testid="stack-basic"
          :items="items"
          :rotate-interval="rotateInterval"
        />
      </div>

      <dl class="mb-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          cards
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ items.length }}
        </dd>
        <dt class="text-muted">
          rotateInterval
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-interval"
        >
          {{ rotateInterval }}ms
        </dd>
        <dt class="text-muted">
          offset
        </dt>
        <dd class="font-mono">
          10px
        </dd>
        <dt class="text-muted">
          scaleFactor
        </dt>
        <dd class="font-mono">
          0.06
        </dd>
        <dt class="text-muted">
          container
        </dt>
        <dd class="font-mono">
          h-60 w-60 md:w-96
        </dd>
        <dt class="text-muted">
          client only
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-client"
        >
          cards start on mount
        </dd>
      </dl>

      <UFormField
        label="rotateInterval (ms)"
        :max="8000"
        :min="1000"
        :step="500"
      >
        <USlider
          v-model="rotateInterval"
          :max="8000"
          :min="1000"
          :step="500"
          data-testid="slider-interval"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Manual control
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">auto-rotate</code> off the deck holds still and the exposed
        <code class="font-mono">nextCard</code> / <code class="font-mono">prevCard</code> methods
        drive the rotation. The same methods are what the timer calls internally, so a manual
        stack and an automatic one stay in sync with one another.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MCardStack
          ref="manualRef"
          data-testid="stack-manual"
          :items="items"
          :auto-rotate="false"
        />
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Previous"
          icon="i-lucide-arrow-left"
          variant="outline"
          data-testid="prev"
          @click="manualRef?.prevCard()"
        />
        <UButton
          label="Next"
          icon="i-lucide-arrow-right"
          icon-placement="right"
          variant="outline"
          data-testid="next"
          @click="manualRef?.nextCard()"
        />
        <UButton
          label="Start timer"
          icon="i-lucide-play"
          variant="soft"
          data-testid="start"
          @click="manualRef?.startFlipping()"
        />
        <UButton
          label="Stop timer"
          icon="i-lucide-pause"
          variant="soft"
          data-testid="stop"
          @click="manualRef?.stopFlipping()"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          autoRotate
        </dt>
        <dd class="font-mono">
          false
        </dd>
        <dt class="text-muted">
          methods
        </dt>
        <dd class="font-mono">
          nextCard · prevCard
        </dd>
        <dt class="text-muted">
          timer hooks
        </dt>
        <dd class="font-mono">
          startFlipping · stopFlipping
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Offset and scale
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">offset</code> is the vertical gap each card in the deck claims and
        <code class="font-mono">scaleFactor</code> is how much each step shrinks. Both are read
        once when the stack mounts, so changing either remounts the deck to re-lay it out.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MCardStack
          :key="`layout-${offset}-${scaleFactor}`"
          data-testid="stack-layout"
          :items="items"
          :offset="offset"
          :scale-factor="scaleFactor"
          class="h-72 w-80"
        />
      </div>

      <dl class="mb-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          offset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-offset"
        >
          {{ offset }}px
        </dd>
        <dt class="text-muted">
          scaleFactor
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-scale"
        >
          {{ scaleFactor }}
        </dd>
        <dt class="text-muted">
          deck size
        </dt>
        <dd class="font-mono">
          h-72 w-80
        </dd>
      </dl>

      <div class="grid gap-6 sm:grid-cols-2">
        <UFormField
          label="offset (px)"
          :max="40"
          :min="2"
          :step="1"
        >
          <USlider
            v-model="offset"
            :max="40"
            :min="2"
            :step="1"
            data-testid="slider-offset"
          />
        </UFormField>

        <UFormField
          label="scaleFactor"
          :max="0.2"
          :min="0.01"
          :step="0.01"
        >
          <USlider
            v-model="scaleFactor"
            :max="0.2"
            :min="0.01"
            :step="0.01"
            data-testid="slider-scale"
          />
        </UFormField>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface StackCard {
  id: number
  title: string
  content: string
  name: string
  designation: string
}

const items: StackCard[] = [
  { id: 1, title: 'Project Alpha', content: 'A deck that rotates the front card back to the pile.', name: 'Sam Rivera', designation: 'Lead Developer' },
  { id: 2, title: 'Project Betaeta', content: 'Each card behind is scaled down and lifted a few pixels.', name: 'Sam Designer', designation: 'Senior Designer' },
  { id: 3, title: 'Project Gamma', content: 'Change the interval to feel how the timing reads.', name: 'Jordan Manager', designation: 'Project Manager' },
  { id: 4, title: 'Project Delta', content: 'Manual control uses the same rotation the timer runs.', name: 'Riley Engineer', designation: 'Platform Engineer' },
]

const rotateInterval = ref(5000)
const offset = ref(10)
const scaleFactor = ref(0.06)

const manualRef = ref<{ nextCard: () => void, prevCard: () => void, startFlipping: () => void, stopFlipping: () => void } | null>(null)
</script>
