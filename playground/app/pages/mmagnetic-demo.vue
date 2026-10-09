<template>
  <div class="space-y-12">
    <UPageHeader
      title="Magnetic"
      description="An element that leans toward the pointer inside a radius and springs back when it leaves."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every frame a document-level <code class="font-mono">mousemove</code> handler measures
        the distance from the element's center to the cursor. Inside
        <code class="font-mono">range</code> the target becomes
        <code class="font-mono">distance Ã— intensity Ã— (1 âˆ’ distance / range)</code> â€” strongest
        at the center, tapering to zero at the edge â€” and two springs ease the element onto it.
        Hover the button below.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div
        class="mb-8 grid h-72 place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted)"
        data-testid="stage"
      >
        <MMagnetic
          :key="replayKey"
          :intensity="intensity"
          :range="range"
          :spring-options="springOptions"
          data-testid="magnetic"
        >
          <button
            type="button"
            class="rounded-full bg-primary px-8 py-4 font-semibold text-white"
            data-testid="magnetic-target"
          >
            Hover me
          </button>
        </MMagnetic>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          intensity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-intensity"
        >
          {{ intensity }}
        </dd>
        <dt class="text-muted">
          range
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-range"
        >
          {{ range }}px
        </dd>
        <dt class="text-muted">
          actionArea
        </dt>
        <dd class="font-mono">
          self (default)
        </dd>
        <dt class="text-muted">
          spring k / c / m
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spring"
        >
          {{ springOptions.stiffness }} / {{ springOptions.damping }} / {{ springOptions.mass }}
        </dd>
        <dt class="text-muted">
          listener
        </dt>
        <dd class="font-mono">
          document mousemove
        </dd>
        <dt class="text-muted">
          reactivity
        </dt>
        <dd class="font-mono">
          intensity / range live
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="intensity"
      >
        <USlider
          v-model="intensity"
          :min="0"
          :max="1"
          :step="0.05"
          data-testid="slider-intensity"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="range (px)"
      >
        <USlider
          v-model="range"
          :min="20"
          :max="300"
          :step="10"
          data-testid="slider-range"
        />
      </UFormField>

      <p class="mt-4 text-xs text-muted">
        <code class="font-mono">intensity</code> and <code class="font-mono">range</code> are
        read inside the mousemove handler, so the sliders respond immediately.
        <code class="font-mono">springOptions</code> is handed to
        <code class="font-mono">useSpring</code> once during setup â€” Replay remounts to apply it.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          actionArea: self, parent, global
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">self</code> arms the element only while the pointer is over it.
        <code class="font-mono">parent</code> arms it while the pointer is anywhere over the
        wrapper box, so it can pull from outside its own bounds. <code class="font-mono">global</code>
        arms it permanently â€” it tracks the cursor from anywhere on the page. All three are
        separate instances mounted with their final value, because the parent listeners are
        bound once in <code class="font-mono">onMounted</code>.
      </p>

      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="area in areas"
          :key="area.value"
          class="rounded-2xl border border-dashed border-default bg-(--ui-bg-muted) p-4"
        >
          <p class="mb-3 text-center text-sm font-medium text-muted">
            {{ area.label }}
          </p>
          <div class="grid h-40 place-items-center rounded-xl bg-default/60 ring-1 ring-default">
            <MMagnetic
              :key="`area-${area.value}-${replayKey}`"
              :action-area="area.value"
              :intensity="0.6"
              :range="120"
              :data-testid="`magnetic-${area.value}`"
            >
              <span
                class="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white"
                :data-testid="`area-target-${area.value}`"
              >
                Target
              </span>
            </MMagnetic>
          </div>
          <p
            class="mt-3 text-center font-mono text-xs text-muted"
            :data-testid="`readout-area-${area.value}`"
          >
            {{ area.note }}
          </p>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Spring presets and props
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The default spring is unusually loose â€” stiffness 26.7, damping 4.1, mass 0.2 â€” which
        gives the pull a soft, lagging feel. These presets swap it out; the key forces a remount
        because <code class="font-mono">useSpring</code> only reads the config once.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="spring in springs"
          :key="spring.value"
          :label="spring.label"
          :variant="springPreset.value === spring.value ? 'solid' : 'outline'"
          :data-testid="`spring-${spring.value}`"
          @click="springPreset = spring"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="ghost"
          data-testid="replay-springs"
          @click="replay()"
        />
      </div>

      <div
        class="mb-8 grid h-64 place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted)"
        data-testid="stage-spring"
      >
        <MMagnetic
          :key="`spring-${springPreset.value}-${replayKey}`"
          :spring-options="springPreset.options"
          :intensity="0.7"
          :range="140"
          data-testid="magnetic-spring"
        >
          <div class="rounded-2xl bg-default px-8 py-6 text-center shadow-lg ring-1 ring-default">
            <p class="text-lg font-bold text-highlighted">
              {{ springPreset.label }}
            </p>
            <p class="mt-1 font-mono text-xs text-muted">
              k {{ springPreset.options.stiffness }} Â· c {{ springPreset.options.damping }} Â· m
              {{ springPreset.options.mass }}
            </p>
          </div>
        </MMagnetic>
      </div>

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
        Note: the document <code class="font-mono">mousemove</code> listener is always
        attached, even in <code class="font-mono">self</code> mode â€” it just does nothing while
        the pointer is outside <code class="font-mono">range</code>. Switching
        <code class="font-mono">actionArea</code> after mount only takes effect for the
        global / non-global half of the watch, so this page mounts one instance per value
        instead of mutating it live.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)
const intensity = ref(0.6)
const range = ref(100)

const springOptions = ref({
  stiffness: 26.7,
  damping: 4.1,
  mass: 0.2,
})

const areas = [
  { label: 'self', value: 'self', note: 'armed on hover only' },
  { label: 'parent', value: 'parent', note: 'armed over the wrapper' },
  { label: 'global', value: 'global', note: 'armed everywhere' },
] as const

const springs = [
  { label: 'Default (loose)', value: 'default', options: { stiffness: 26.7, damping: 4.1, mass: 0.2 } },
  { label: 'Snappy', value: 'snappy', options: { stiffness: 400, damping: 30, mass: 0.5 } },
  { label: 'Floaty', value: 'floaty', options: { stiffness: 40, damping: 8, mass: 1 } },
] as const

const springPreset = ref<(typeof springs)[number]>(springs[0])

const propTour = [
  { name: 'intensity', value: 'number Â· 0.6 Â· live' },
  { name: 'range', value: 'number Â· 100 Â· live' },
  { name: 'actionArea', value: '\'self\' | \'parent\' | \'global\'' },
  { name: 'springOptions', value: 'k / c / m Â· setup only' },
  { name: 'slot', value: 'the pulled element' },
  { name: 'emits', value: 'none' },
] as const

function replay() {
  replayKey.value++
}
</script>
