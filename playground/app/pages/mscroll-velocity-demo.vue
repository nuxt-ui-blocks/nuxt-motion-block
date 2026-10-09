<template>
  <div class="space-y-12">
    <UPageHeader
      title="ScrollVelocity"
      description="Marquee rows that idle on their own and swing opposite ways as the page scrolls past."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each row is its own rAF loop: a base velocity slides the text forever, and scroll
        distance per frame feeds a smoothed factor that either reinforces or flips it. Odd
        rows are created with a negative base velocity, so two rows already run in opposite
        directions before you touch the wheel. Keep scrolling — the rows below sit in a tall
        stretch of page on purpose.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replayKey++"
        />
      </div>

      <div
        class="space-y-2 rounded-2xl border border-dashed border-default bg-(--ui-bg-muted) p-6"
        data-testid="basic-stage"
      >
        <MScrollVelocity
          :key="`basic-${replayKey}`"
          :texts="['Motion primitives', 'Motion primitives']"
          :velocity="120"
          :parallax-style="{ borderRadius: '12px', background: 'rgba(59,130,246,0.08)', boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.35)' }"
          data-testid="velocity-basic-0"
        />
        <MScrollVelocity
          :key="`basic-alt-${replayKey}`"
          :texts="['Built for Nuxt', 'Built for Nuxt']"
          :velocity="120"
          :parallax-style="{ borderRadius: '12px', background: 'rgba(236,72,153,0.08)', boxShadow: 'inset 0 0 0 1px rgba(236,72,153,0.35)' }"
          data-testid="velocity-basic-1"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          base velocity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-velocity"
        >
          120
        </dd>
        <dt class="text-muted">
          rows
        </dt>
        <dd class="font-mono">
          2 (index parity flips sign)
        </dd>
        <dt class="text-muted">
          loop
        </dt>
        <dd class="font-mono">
          useRafFn · paused on unmount
        </dd>
        <dt class="text-muted">
          idle behaviour
        </dt>
        <dd class="font-mono">
          drifts without scrolling
        </dd>
        <dt class="text-muted">
          copies per row
        </dt>
        <dd class="font-mono">
          6 (numCopies default)
        </dd>
        <dt class="text-muted">
          width source
        </dt>
        <dd class="font-mono">
          offsetWidth of copy 0
        </dd>
      </dl>
    </UCard>

    <div
      class="grid h-[70vh] place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted)"
      data-testid="spacer-1"
    >
      <p class="text-center text-sm text-muted">
        Scroll through me — the rows above reverse and accelerate<br>based on how fast you
        move, not where you are.
      </p>
    </div>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Controls
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every value is read inside the render function or the rAF callback, so the sliders
        respond live: <code class="font-mono">velocity</code> sets the drift speed,
        <code class="font-mono">stiffness</code> and <code class="font-mono">damping</code>
        shape how fast the smoothed factor chases the raw scroll velocity, and
        <code class="font-mono">numCopies</code> changes how many spans fill the loop.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-controls"
          @click="replayKey++"
        />
      </div>

      <div class="mb-6 rounded-2xl border border-dashed border-default bg-(--ui-bg-muted) p-6">
        <MScrollVelocity
          :key="`controls-${replayKey}`"
          :texts="['Scroll fast or slow', 'Scroll fast or slow']"
          :velocity="velocity"
          :damping="damping"
          :stiffness="stiffness"
          :num-copies="numCopies"
          :velocity-mapping="velocityMapping"
          data-testid="velocity-controls"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          velocity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-velocity-slider"
        >
          {{ velocity }}
        </dd>
        <dt class="text-muted">
          damping
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-damping"
        >
          {{ damping }}
        </dd>
        <dt class="text-muted">
          stiffness
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stiffness"
        >
          {{ stiffness }}
        </dd>
        <dt class="text-muted">
          numCopies
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-copies"
        >
          {{ numCopies }}
        </dd>
        <dt class="text-muted">
          velocityMapping
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mapping"
        >
          [{{ velocityMapping.input.join(', ') }}] → [{{ velocityMapping.output.join(', ') }}]
        </dd>
        <dt class="text-muted">
          reactivity
        </dt>
        <dd class="font-mono">
          all live
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="velocity"
      >
        <USlider
          v-model="velocity"
          :min="0"
          :max="400"
          :step="10"
          data-testid="slider-velocity"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="damping"
      >
        <USlider
          v-model="damping"
          :min="0"
          :max="200"
          :step="5"
          data-testid="slider-damping"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="stiffness"
      >
        <USlider
          v-model="stiffness"
          :min="0"
          :max="1000"
          :step="25"
          data-testid="slider-stiffness"
        />
      </UFormField>

      <UFormField
        class="mt-4"
        label="numCopies"
      >
        <USlider
          v-model="numCopies"
          :min="2"
          :max="12"
          :step="1"
          data-testid="slider-copies"
        />
      </UFormField>
    </UCard>

    <div
      class="grid h-[70vh] place-items-center rounded-2xl border border-dashed border-default bg-(--ui-bg-muted)"
      data-testid="spacer-2"
    >
      <p class="text-center text-sm text-muted">
        Second stretch — with damping low the factor overshoots,<br>with damping high it
        barely reacts at all.
      </p>
    </div>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Styling hooks
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Styling goes through the two style props: <code class="font-mono">parallaxStyle</code>
        lands on the clipped outer wrapper, <code class="font-mono">scrollerStyle</code> on the
        translating track — which already carries
        <code class="font-mono">flex whitespace-nowrap text-4xl font-bold</code>. Inline styles
        beat the track's utility classes, so these are the reliable way to restyle a row.
      </p>

      <div class="space-y-4">
        <div class="rounded-2xl border border-default bg-default/60 p-4">
          <p class="mb-2 font-mono text-xs text-muted">
            :parallax-style="&#123; borderRadius, background, boxShadow &#125;"
          </p>
          <MScrollVelocity
            :key="`style-a-${replayKey}`"
            :texts="['Primary row', 'Primary row']"
            :velocity="90"
            :parallax-style="{ borderRadius: '12px', background: 'rgba(59,130,246,0.1)', boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.5)' }"
            data-testid="velocity-style-a"
          />
        </div>

        <div class="rounded-2xl border border-default bg-default/60 p-4">
          <p class="mb-2 font-mono text-xs text-muted">
            :scroller-style="&#123; letterSpacing, textTransform, color &#125;" · mapping widened
          </p>
          <MScrollVelocity
            :key="`style-b-${replayKey}`"
            :texts="['Uppercase track']"
            :velocity="90"
            :scroller-style="{ letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ui-primary)' }"
            :velocity-mapping="{ input: [0, 2000], output: [0, 2] }"
            data-testid="velocity-style-b"
          />
        </div>
      </div>

      <p class="mt-4 text-xs text-muted">
        The class-based siblings are dead in the source: this component forwards them as
        <code class="font-mono">class-name</code> /
        <code class="font-mono">parallax-class-name</code> /
        <code class="font-mono">scroller-class-name</code>, but the row inside declares
        <code class="font-mono">class</code> / <code class="font-mono">parallaxClass</code> /
        <code class="font-mono">scrollerClass</code>. The names never match, so
        <code class="font-mono">class="text-primary"</code> is accepted as a prop, never
        applied anywhere — and never reaches the root either. The docs' custom example passes
        <code class="font-mono">class</code> the same way.
      </p>
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
        Caveats: <code class="font-mono">scrollContainerRef</code> is declared and forwarded
        down to each row, but the row reads <code class="font-mono">window.scrollY</code>
        directly — the prop is dead, so a scrolling panel will not drive it. The three class
        props are swallowed by the <code class="font-mono">*-name</code> forwarding mismatch
        shown above. With an empty <code class="font-mono">texts</code> array the component
        renders an empty <code class="font-mono">&lt;section&gt;</code>, and the raw scroll
        delta is multiplied by 60 to approximate a per-second rate before mapping.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)
const velocity = ref(120)
const damping = ref(50)
const stiffness = ref(400)
const numCopies = ref(6)
const velocityMapping = ref({
  input: [0, 1000] as [number, number],
  output: [0, 5] as [number, number],
})

const propTour = [
  { name: 'texts', value: 'string[] · [] · empty renders nothing' },
  { name: 'velocity', value: 'number · 100 · sign per index' },
  { name: 'damping', value: 'number · 50 · live' },
  { name: 'stiffness', value: 'number · 400 · live' },
  { name: 'numCopies', value: 'number · 6 · live' },
  { name: 'velocityMapping', value: 'input → output range' },
  { name: 'class', value: 'declared · dead (-name mismatch)' },
  { name: 'parallaxClass / scrollerClass', value: 'declared · dead (-name mismatch)' },
  { name: 'parallaxStyle / scrollerStyle', value: 'wrapper / track · work' },
  { name: 'scrollContainerRef', value: 'forwarded but unused' },
] as const
</script>
