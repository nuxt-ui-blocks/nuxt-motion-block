<template>
  <div class="space-y-12">
    <UPageHeader
      title="Cursor"
      description="A spring-damped marker that stands in for the pointer, either across the whole page or only inside one box."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Attach to parent
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">attachToParent</code> the component still listens to
        <code class="font-mono">document</code> mousemove, but only paints the marker while
        the pointer is over the parent element and leaves the native cursor alone there.
        Toggle it off and the marker takes over the page, setting
        <code class="font-mono">body { cursor: none }</code>.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
        <UButton
          :label="`attachToParent: ${attachToParent}`"
          icon="i-lucide-box"
          variant="outline"
          data-testid="toggle-attach"
          @click="toggleAttach()"
        />
      </div>

      <div
        class="relative grid h-72 place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted) px-6 text-center"
        data-testid="stage"
      >
        <MCursor
          :key="replayKey"
          :attach-to-parent="attachToParent"
          :on-position-change="recordPosition"
          :spring-config="springConfig"
          :variants="dotVariants"
        >
          <div class="h-4 w-4 rounded-full bg-primary ring-4 ring-default" />
        </MCursor>

        <p class="max-w-xs text-sm text-muted">
          Move the pointer around inside this box and the marker trails after it.
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          pointer x / y
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-position"
        >
          {{ position.x }} / {{ position.y }}
        </dd>
        <dt class="text-muted">
          attachToParent
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-attach"
        >
          {{ attachToParent }}
        </dd>
        <dt class="text-muted">
          body cursor
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-body-cursor"
        >
          {{ attachToParent ? 'auto' : 'none' }}
        </dd>
        <dt class="text-muted">
          spring k / c / m
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spring"
        >
          {{ springConfig.stiffness }} / {{ springConfig.damping }} / {{ springConfig.mass }}
        </dd>
        <dt class="text-muted">
          slot content
        </dt>
        <dd class="font-mono">
          16px dot + ring
        </dd>
        <dt class="text-muted">
          trail (doc prop)
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-trail"
        >
          not implemented
        </dd>
      </dl>

      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <UFormField label="stiffness">
          <USlider
            v-model="springConfig.stiffness"
            :max="500"
            :min="50"
            :step="10"
            data-testid="slider-stiffness"
          />
        </UFormField>
        <UFormField label="damping">
          <USlider
            v-model="springConfig.damping"
            :max="50"
            :min="5"
            :step="1"
            data-testid="slider-damping"
          />
        </UFormField>
        <UFormField label="mass">
          <USlider
            v-model="springConfig.mass"
            :max="2"
            :min="0.1"
            :step="0.1"
            data-testid="slider-mass"
          />
        </UFormField>
      </div>

      <p class="mt-4 text-xs text-muted">
        The spring config is handed to <code class="font-mono">useSpring</code> once during
        setup, so the sliders only take effect on Replay, which remounts the component.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Variants and transition
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The slot is wrapped in its own <code class="font-mono">Motion</code> driven by the
        <code class="font-mono">initial</code>, <code class="font-mono">animate</code> and
        <code class="font-mono">exit</code> variants, so entering and leaving the parent
        fades the marker instead of popping it. The
        <code class="font-mono">transition</code> prop is passed straight to that inner
        motion, while the outer motion keeps following the pointer through the spring.
      </p>

      <div
        class="relative grid h-64 place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted) px-6 text-center"
        data-testid="stage-variants"
      >
        <MCursor
          attach-to-parent
          :transition="transition"
          :variants="pillVariants"
        >
          <div class="flex items-center gap-1 rounded-full bg-default/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <UIcon
              class="size-3.5"
              name="i-lucide-mouse-pointer-2"
            />
            exploring
          </div>
        </MCursor>

        <p class="max-w-xs text-sm text-muted">
          This one enters at 60% scale with zero opacity and collapses again when you
          leave the box.
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          transition
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-transition"
        >
          {{ transition.duration }}s · {{ transition.ease }}
        </dd>
        <dt class="text-muted">
          initial
        </dt>
        <dd class="font-mono">
          scale 0.6 · opacity 0
        </dd>
        <dt class="text-muted">
          exit
        </dt>
        <dd class="font-mono">
          scale 0.6 · opacity 0
        </dd>
        <dt class="text-muted">
          outer positioning
        </dt>
        <dd class="font-mono">
          fixed · translate -50%
        </dd>
        <dt class="text-muted">
          events
        </dt>
        <dd class="font-mono">
          document mousemove only
        </dd>
        <dt class="text-muted">
          cleanup
        </dt>
        <dd class="font-mono">
          listener removed on unmount
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Props in the source
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt
          v-for="prop in propTour"
          :key="prop.name"
          class="text-muted"
        >
          {{ prop.name }}
        </dt>
        <dd
          v-for="prop in propTour"
          :key="`${prop.name}-value`"
          class="font-mono"
        >
          {{ prop.value }}
        </dd>
      </dl>

      <p class="mt-4 text-xs text-muted">
        The docs also list a <code class="font-mono">trail</code> boolean, but the
        component never reads it, so the trailing-dot effect has to be built in the slot.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const attachToParent = ref(true)
const replayKey = ref(0)
const position = ref({ x: 0, y: 0 })

const springConfig = ref({
  stiffness: 200,
  damping: 20,
  mass: 0.5,
})

const transition = {
  duration: 0.2,
  ease: 'easeInOut',
}

const dotVariants = {
  initial: { scale: 0.6, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.6, opacity: 0 },
}

const pillVariants = {
  initial: { scale: 0.6, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.6, opacity: 0 },
}

const propTour = [
  { name: 'attachToParent', value: 'boolean · default false' },
  { name: 'springConfig', value: 'SpringOptions' },
  { name: 'variants', value: 'initial / animate / exit' },
  { name: 'transition', value: 'Transition' },
  { name: 'onPositionChange', value: '(x, y) => void' },
  { name: 'class', value: 'merged onto the fixed root' },
] as const

function replay() {
  replayKey.value++
}

function toggleAttach() {
  attachToParent.value = !attachToParent.value
}

function recordPosition(x: number, y: number) {
  position.value = { x: Math.round(x), y: Math.round(y) }
}
</script>
