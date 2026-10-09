<template>
  <div class="space-y-12">
    <UPageHeader
      title="Tilt"
      description="A perspective tilt that follows the pointer across the element's surface and springs level on exit."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">mousemove</code> converts the cursor position into offsets
        between <code class="font-mono">-0.5</code> and <code class="font-mono">0.5</code>,
        two springs smooth them, and a motion template writes
        <code class="font-mono">perspective(1000px) rotateX(…) rotateY(…)</code> onto the root.
        On leave both values return to 0, so the card settles flat.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replayKey++"
        />
        <UButton
          :label="`isReverse: ${isReverse}`"
          icon="i-lucide-arrow-left-right"
          variant="outline"
          data-testid="toggle-reverse"
          @click="isReverse = !isReverse"
        />
      </div>

      <div
        class="mb-8 grid h-80 place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted)"
        data-testid="stage"
      >
        <MTilt
          :key="`basic-${rotationFactor}-${isReverse}-${replayKey}`"
          :class-name="'w-72 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 p-6 text-white shadow-xl'"
          :rotation-factor="rotationFactor"
          :is-reverse="isReverse"
          :spring-options="springOptions"
          data-testid="tilt"
        >
          <p class="text-lg font-bold">
            Pointer-reactive surface
          </p>
          <p class="mt-2 text-sm text-white/80">
            Move the cursor across the card — corners lift, edges dip.
          </p>
          <p class="mt-4 font-mono text-xs text-white/70">
            rotate ±{{ rotationFactor }}° · {{ isReverse ? 'reversed' : 'normal' }}
          </p>
        </MTilt>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          rotationFactor
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-factor"
        >
          {{ rotationFactor }}°
        </dd>
        <dt class="text-muted">
          isReverse
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reverse"
        >
          {{ isReverse }}
        </dd>
        <dt class="text-muted">
          spring k / c / m
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spring"
        >
          {{ springOptions.stiffness ?? 'default' }} / {{ springOptions.damping ?? 'default' }} /
          {{ springOptions.mass ?? 'default' }}
        </dd>
        <dt class="text-muted">
          class prop
        </dt>
        <dd class="font-mono">
          className (not class)
        </dd>
        <dt class="text-muted">
          transform
        </dt>
        <dd class="font-mono">
          perspective + rotateX/Y
        </dd>
        <dt class="text-muted">
          restore on leave
        </dt>
        <dd class="font-mono">
          x → 0 · y → 0
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="rotationFactor (remounts to apply)"
      >
        <USlider
          v-model="rotationFactor"
          :min="0"
          :max="45"
          :step="1"
          data-testid="slider-factor"
        />
      </UFormField>

      <p class="mt-4 text-xs text-muted">
        <code class="font-mono">rotationFactor</code>, <code class="font-mono">isReverse</code>
        and <code class="font-mono">springOptions</code> are all read once while the two
        <code class="font-mono">useTransform</code> ranges are built, so the key above includes
        them — every slider tick remounts the card with the new values.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Spring presets
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">springOptions</code> defaults to an empty object, which lets
        motion-v use its own spring defaults. These three override it; the active preset
        re-keys the instance.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="spring in springs"
          :key="spring.value"
          :label="spring.label"
          :variant="springPreset === spring.value ? 'solid' : 'outline'"
          :data-testid="`spring-${spring.value}`"
          @click="springPreset = spring.value"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="ghost"
          data-testid="replay-springs"
          @click="replayKey++"
        />
      </div>

      <div
        class="mb-8 grid h-72 place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted)"
        data-testid="stage-spring"
      >
        <MTilt
          :key="`spring-${springPreset}-${replayKey}`"
          :class-name="'w-64 rounded-2xl bg-default p-6 shadow-lg ring-1 ring-default'"
          :spring-options="activeSpring.options"
          :rotation-factor="20"
          data-testid="tilt-spring"
        >
          <p class="text-lg font-bold text-highlighted">
            {{ activeSpring.label }}
          </p>
          <p class="mt-2 font-mono text-xs text-muted">
            {{ activeSpring.note }}
          </p>
        </MTilt>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-preset"
        >
          {{ activeSpring.label }}
        </dd>
        <dt class="text-muted">
          options
        </dt>
        <dd class="font-mono">
          {{ activeSpring.note }}
        </dd>
        <dt class="text-muted">
          default
        </dt>
        <dd class="font-mono">
          {} → motion-v defaults
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
        Doc caveats: the documented manual-control example passes
        <code class="font-mono">v-model:enabled</code>, which the component does not declare —
        it is never wired to anything, so there is no programmatic enable switch. The styling
        prop is <code class="font-mono">className</code> and it is bound through to the root;
        a plain <code class="font-mono">class</code> attribute still merges in via fallthrough,
        but <code class="font-mono">className</code> is the one in the interface.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const replayKey = ref(0)
const rotationFactor = ref(15)
const isReverse = ref(false)
const springPreset = ref('default')

const springOptions = ref<Record<string, number>>({})

const springs = [
  { label: 'Default', value: 'default', options: {}, note: '{} · motion-v defaults' },
  { label: 'Snappy', value: 'snappy', options: { stiffness: 300, damping: 25, mass: 0.4 }, note: 'k 300 · c 25 · m 0.4' },
  { label: 'Loose', value: 'loose', options: { stiffness: 60, damping: 8, mass: 0.8 }, note: 'k 60 · c 8 · m 0.8' },
] as const

const activeSpring = computed(() => springs.find(s => s.value === springPreset.value) ?? springs[0])

const propTour = [
  { name: 'className', value: 'string · root class' },
  { name: 'style', value: 'Record<string, any> · merged' },
  { name: 'rotationFactor', value: 'number · 15 · setup only' },
  { name: 'isReverse', value: 'boolean · false · setup only' },
  { name: 'springOptions', value: '{} by default · setup only' },
  { name: 'slot', value: 'the tilting content' },
  { name: 'emits', value: 'none' },
] as const
</script>
