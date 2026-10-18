<template>
  <div class="space-y-12">
    <UPageHeader
      title="ForceDot"
      description="A field of bouncing dots with pairwise collision, pushed away from or pulled toward the pointer."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Repel playground
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The loop is a plain <code class="font-mono">requestAnimationFrame</code> started in
        <code class="font-mono">onMounted</code>: every frame each dot steps by its velocity,
        bounces off the walls with 0.9 damping, gets a force applied while it sits inside
        <code class="font-mono">influenceRadius</code>, then the O(n²) collision pass separates
        overlapping pairs. Move the pointer over the canvas and the field parts around it.
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
          :label="`mode: ${mode}`"
          icon="i-lucide-magnet"
          variant="outline"
          data-testid="toggle-mode"
          @click="toggleMode()"
        />
      </div>

      <div
        class="flex justify-center overflow-hidden rounded-2xl border border-dashed border-default bg-(--ui-bg-muted)"
        data-testid="stage"
      >
        <MForceDot
          :key="replayKey"
          :count="count"
          :width="stageWidth"
          :height="stageHeight"
          :radius="radius"
          :repel="mode === 'repel'"
          :attract="mode === 'attract'"
          :influence-radius="influenceRadius"
          :max-force="maxForce"
          :dot-class="dotClass"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          count (per Replay)
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ count }}
        </dd>
        <dt class="text-muted">
          mode
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mode"
        >
          {{ mode }}
        </dd>
        <dt class="text-muted">
          radius
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-radius"
        >
          {{ radius }}px
        </dd>
        <dt class="text-muted">
          influenceRadius
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-influence"
        >
          {{ influenceRadius }}px
        </dd>
        <dt class="text-muted">
          maxForce
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-force"
        >
          {{ maxForce }}
        </dd>
        <dt class="text-muted">
          canvas
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-canvas"
        >
          {{ stageWidth }}×{{ stageHeight }}
        </dd>
        <dt class="text-muted">
          dotClass
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-dotclass"
        >
          {{ dotClass }}
        </dd>
        <dt class="text-muted">
          speed prop
        </dt>
        <dd class="font-mono">
          fixed at 1
        </dd>
        <dt class="text-muted">
          collisions
        </dt>
        <dd class="font-mono">
          always on
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="count (applied on Replay)"
      >
        <USlider
          v-model="count"
          :min="20"
          :max="200"
          :step="10"
          data-testid="slider-count"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="radius"
      >
        <USlider
          v-model="radius"
          :min="2"
          :max="30"
          :step="1"
          data-testid="slider-radius"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="influenceRadius"
      >
        <USlider
          v-model="influenceRadius"
          :min="50"
          :max="500"
          :step="10"
          data-testid="slider-influence"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="maxForce"
      >
        <USlider
          v-model="maxForce"
          :min="0.5"
          :max="8"
          :step="0.5"
          data-testid="slider-force"
        />
      </UFormField>

      <p class="mt-4 text-xs text-muted">
        <code class="font-mono">count</code>, <code class="font-mono">width</code> and
        <code class="font-mono">height</code> are read once while the component sets up
        (the velocities array is built from them), so those three only take effect on Replay,
        which remounts the field. <code class="font-mono">speed</code> is deliberately left at
        1: it multiplies every stored velocity once per frame, so anything above 1 compounds
        until the field explodes.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Presets
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Same component, different <code class="font-mono">count</code>,
        <code class="font-mono">dotClass</code> and mode. Only one instance is mounted at a
        time — each preset change remounts through the key, which is also what re-seeds the
        random starting positions.
      </p>

      <USelectMenu
        v-model="presetValue"
        :items="presets"
        value-key="value"
        class="mb-6 w-full sm:w-72"
        data-testid="preset-select"
      />

      <div
        class="flex justify-center overflow-hidden rounded-2xl border border-dashed border-default bg-(--ui-bg-muted)"
        data-testid="preset-stage"
      >
        <MForceDot
          :key="preset.value"
          :count="preset.count"
          :width="600"
          :height="360"
          :radius="preset.radius"
          :repel="preset.repel"
          :attract="preset.attract"
          :influence-radius="250"
          :max-force="3"
          :dot-class="preset.dotClass"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-preset"
        >
          {{ preset.label }}
        </dd>
        <dt class="text-muted">
          count
        </dt>
        <dd class="font-mono">
          {{ preset.count }}
        </dd>
        <dt class="text-muted">
          dotClass
        </dt>
        <dd class="font-mono">
          {{ preset.dotClass }}
        </dd>
        <dt class="text-muted">
          repel
        </dt>
        <dd class="font-mono">
          {{ preset.repel }}
        </dd>
        <dt class="text-muted">
          attract
        </dt>
        <dd class="font-mono">
          {{ preset.attract }}
        </dd>
        <dt class="text-muted">
          radius
        </dt>
        <dd class="font-mono">
          {{ preset.radius }}
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
        Plain <code class="font-mono">defineProps</code> with no TypeScript interface, and no
        emits: everything happens inside the one rAF loop, which is never cancelled — the loop
        stops only because the component unmounts and the page goes away. Dots start at random
        coordinates decided during setup, so the server and client markup disagree on the first
        frame and Vue logs a hydration mismatch warning. It is cosmetic.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const stageWidth = 600
const stageHeight = 400

const replayKey = ref(0)
const count = ref(80)
const radius = ref(12)
const influenceRadius = ref(250)
const maxForce = ref(3)
const mode = ref<'repel' | 'attract'>('repel')
const dotClass = ref('fill-neutral-200')

const presets = [
  { label: 'Dense ice', value: 'ice', count: 140, radius: 8, repel: true, attract: false, dotClass: 'fill-neutral-200' },
  { label: 'Sparse blue', value: 'blue', count: 40, radius: 14, repel: true, attract: false, dotClass: 'fill-blue-500' },
  { label: 'Warm attract', value: 'warm', count: 90, radius: 10, repel: false, attract: true, dotClass: 'fill-amber-400' },
]

const presetValue = ref(presets[0].value)
const preset = computed(() => presets.find(p => p.value === presetValue.value) ?? presets[0])

const propTour = [
  { name: 'count', value: 'number · 80 · setup only' },
  { name: 'width / height', value: 'number · 600 · setup only' },
  { name: 'radius', value: 'number · 12 · live' },
  { name: 'repel / attract', value: 'boolean · true / false' },
  { name: 'influenceRadius', value: 'number · 250 · live' },
  { name: 'maxForce', value: 'number · 3 · live' },
  { name: 'speed', value: 'number · 1 · live' },
  { name: 'dotClass', value: 'string · \'fill-neutral-200\'' },
] as const

function replay() {
  replayKey.value++
}

function toggleMode() {
  mode.value = mode.value === 'repel' ? 'attract' : 'repel'
}
</script>
