<template>
  <div class="space-y-12">
    <UPageHeader
      title="GlowEffect"
      description="An animated glow layer — rotating, pulsing or shifting gradients — that sits behind content as a sibling."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The component has <strong>no slot</strong>: its root is a self-closing
        <code class="font-mono">Motion</code> with
        <code class="font-mono">pointer-events-none absolute inset-0</code>. Content is a sibling
        inside a <code class="font-mono">relative</code> wrapper, raised with
        <code class="font-mono">relative z-10</code>. (The docs Usage snippet wraps children inside
        <code class="font-mono">&lt;MGlowEffect&gt;</code> — those children would be dropped.)
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

      <div class="flex justify-center">
        <div class="relative w-full max-w-md">
          <MGlowEffect
            :key="replayKey"
            data-testid="basic"
          />
          <div class="relative z-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 shadow-xl">
            <h3 class="mb-2 text-2xl font-bold text-white">
              Glow Effect
            </h3>
            <p class="mb-4 text-sm text-blue-100">
              Default mode: rotating conic gradient, medium blur, 5s cycle.
            </p>
            <UButton
              variant="solid"
              size="sm"
              class="bg-white text-blue-700 hover:bg-gray-100"
            >
              Get Started
            </UButton>
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          mode
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mode"
        >
          rotate
        </dd>
        <dt class="text-muted">
          blur
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-blur"
        >
          medium → blur-md
        </dd>
        <dt class="text-muted">
          duration
        </dt>
        <dd class="font-mono">
          5s, linear, infinite
        </dd>
        <dt class="text-muted">
          colors
        </dt>
        <dd class="font-mono">
          #FF5733 #33FF57 #3357FF #F1C40F
        </dd>
        <dt class="text-muted">
          root
        </dt>
        <dd class="font-mono">
          absolute inset-0, pointer-events-none
        </dd>
        <dt class="text-muted">
          slot
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-slot"
        >
          none — sibling pattern
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Animation modes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Six modes share one prop: <code class="font-mono">rotate</code> (conic spin),
        <code class="font-mono">pulse</code> (radial fade + scale), <code class="font-mono">breathe</code>
        (gentle scale), <code class="font-mono">colorShift</code> (conic color morph),
        <code class="font-mono">flowHorizontal</code> (linear sweep) and
        <code class="font-mono">static</code> (a fixed gradient, no animation).
      </p>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="mode in modes"
          :key="mode.name"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ mode.name }}
          </p>
          <div class="relative rounded-xl border border-default p-5">
            <MGlowEffect
              :key="`${mode.name}-${replayKey}`"
              :mode="mode.name"
              :colors="[...mode.colors]"
              :duration="mode.duration"
              :data-testid="`mode-${mode.name}`"
            />
            <div class="relative z-10 flex h-full flex-col gap-2">
              <UIcon
                :name="mode.icon"
                class="h-8 w-8 text-primary-500"
              />
              <p class="font-semibold text-highlighted">
                {{ mode.title }}
              </p>
              <p class="text-xs text-muted">
                {{ mode.hint }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Blur intensities
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Named steps map to fixed Tailwind utilities — <code class="font-mono">softest</code> →
        <code class="font-mono">blur-xs</code> up to <code class="font-mono">strongest</code> →
        <code class="font-mono">blur-2xl</code>, plus <code class="font-mono">none</code>. Only the
        named values are generated in the stylesheet (see the caveats).
      </p>

      <div class="grid gap-6 sm:grid-cols-3">
        <div
          v-for="step in blurs"
          :key="step.name"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ step.name }} → {{ step.cls }}
          </p>
          <div class="relative rounded-xl bg-gray-950 p-6 text-center">
            <MGlowEffect
              :key="`${step.name}-${replayKey}`"
              mode="colorShift"
              :colors="['#8B5CF6', '#EC4899']"
              :blur="step.name"
              :duration="4"
              :data-testid="`blur-${step.name}`"
            />
            <div class="relative z-10">
              <p class="font-semibold text-white">
                {{ step.cls }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Caveats
        </p>
      </template>

      <ul class="grid gap-2 text-sm text-muted sm:grid-cols-2">
        <li>
          No default slot exists — children passed to
          <code class="font-mono">&lt;MGlowEffect&gt;</code> are silently discarded. Wrap the
          component and your content as siblings in a <code class="font-mono">relative</code>
          parent, exactly as every instance on this page does.
        </li>
        <li>
          <code class="font-mono">blur</code> as a number (<code class="font-mono">:blur="10"</code>)
          and the <code class="font-mono">scale</code> prop build classes by string interpolation
          (<code class="font-mono">blur-[10px]</code>, <code class="font-mono">scale-[1.1]</code>).
          Tailwind's scanner never sees those literals, so the utilities are never generated and
          the effect is missing. Named blur steps work; scale still multiplies the pulse/breathe
          keyframes but has no static-class effect in the other modes.
        </li>
        <li>
          The base transition captures <code class="font-mono">duration</code> once during setup
          (<code class="font-mono">BASE_TRANSITION</code> is a plain object) — changing the prop
          after mount does not retune an already-running loop unless you also pass
          <code class="font-mono">transition</code> explicitly.
        </li>
        <li>
          The glow is <code class="font-mono">absolute inset-0</code> behind your content and never
          intercepts input, but a parent with <code class="font-mono">overflow-hidden</code> will
          clip the blurred spill.
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)

const modes = [
  {
    name: 'rotate',
    title: 'Rotate',
    hint: 'Conic gradient spinning continuously',
    icon: 'i-lucide-refresh-cw',
    colors: ['#FF5733', '#33FF57', '#3357FF'],
    duration: 4,
  },
  {
    name: 'pulse',
    title: 'Pulse',
    hint: 'Radial glow breathing in and out',
    icon: 'i-lucide-heart-pulse',
    colors: ['#EC4899'],
    duration: 2,
  },
  {
    name: 'breathe',
    title: 'Breathe',
    hint: 'Subtle scale, mirrored easing',
    icon: 'i-lucide-wind',
    colors: ['#10B981'],
    duration: 3,
  },
  {
    name: 'colorShift',
    title: 'Color shift',
    hint: 'Conic gradient morphing hues',
    icon: 'i-lucide-palette',
    colors: ['#8B5CF6', '#A855F7', '#C084FC'],
    duration: 5,
  },
  {
    name: 'flowHorizontal',
    title: 'Flow horizontal',
    hint: 'Linear gradient sweeping left to right',
    icon: 'i-lucide-arrow-right',
    colors: ['#0EA5E9', '#06B6D4'],
    duration: 4,
  },
  {
    name: 'static',
    title: 'Static',
    hint: 'Fixed gradient, no animation',
    icon: 'i-lucide-pause',
    colors: ['#F59E0B', '#F97316'],
    duration: 5,
  },
] as const

const blurs = [
  { name: 'softest', cls: 'blur-xs' },
  { name: 'medium', cls: 'blur-md' },
  { name: 'strongest', cls: 'blur-2xl' },
] as const

function replay() {
  replayKey.value++
}
</script>
