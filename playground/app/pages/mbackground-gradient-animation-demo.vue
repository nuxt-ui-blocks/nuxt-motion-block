<template>
  <div class="space-y-12">
    <UPageHeader
      title="BackgroundGradientAnimation"
      description="Five blurred radial blobs orbit a shared blend mode. Translated from aceternity-ui's background-gradient-animation."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Pointer spotlight
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root is not positioned, so it needs a
        <code class="font-mono">relative</code> wrapper with an explicit height. The
        <code class="font-mono">class</code> prop lands on the
        <strong>content container</strong> — <code class="font-mono">h-full</code> there is what
        lets the slot's <code class="font-mono">h-full ... justify-center</code> actually centre.
        With <code class="font-mono">interactive</code> on, the pointer blob eases toward the
        cursor (lerp of <code class="font-mono">1/20</code> per frame) inside a rAF loop.
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
          :label="`interactive: ${interactive}`"
          icon="i-lucide-mouse-pointer-2"
          variant="outline"
          data-testid="toggle-interactive"
          @click="toggleInteractive()"
        />
      </div>

      <div class="relative h-96 overflow-hidden rounded-2xl border border-default">
        <MBackgroundGradientAnimation
          :key="`basic-${replayKey}`"
          :interactive="interactive"
          class="h-full"
          data-testid="basic-gradient"
        >
          <div class="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <p class="text-xs font-medium uppercase tracking-widest text-white/70">
              BackgroundGradientAnimation
            </p>
            <h2 class="mt-3 text-3xl font-bold">
              Move the pointer over the blobs
            </h2>
            <p class="mt-4 max-w-md text-sm text-white/80">
              The spotlight div is v-if'd, so toggling interactive removes it entirely.
            </p>
          </div>
        </MBackgroundGradientAnimation>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          interactive
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-interactive"
        >
          {{ interactive }}
        </dd>
        <dt class="text-muted">
          blobs
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-blobs"
        >
          5 radial + 1 pointer
        </dd>
        <dt class="text-muted">
          loop times
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-loops"
        >
          30s / 20s / 40s / 40s / 20s
        </dd>
        <dt class="text-muted">
          blend mode
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-blend"
        >
          hard-light
        </dd>
        <dt class="text-muted">
          filter (non-Safari)
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-filter"
        >
          url(#blurMe) blur(40px)
        </dd>
        <dt class="text-muted">
          pointer easing
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-easing"
        >
          x += (target - x) / 20
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Colour schemes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Colour, size and blending props are written to
        <code class="font-mono">document.body.style</code> in
        <code class="font-mono">onMounted</code> <strong>once</strong> — there is no watcher —
        and every instance on the page reads those same variables. Picking a scheme remounts
        this stage (new <code class="font-mono">:key</code>), which re-applies the vars and also
        repaints the stage above, while per-instance props like
        <code class="font-mono">class</code> stay put.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in schemes"
          :key="option.id"
          :label="option.label"
          :variant="schemeId === option.id ? 'solid' : 'outline'"
          :data-testid="`scheme-${option.id}`"
          @click="selectScheme(option.id)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="soft"
          data-testid="replay-schemes"
          @click="replay()"
        />
      </div>

      <div class="relative h-72 overflow-hidden rounded-2xl border border-default">
        <MBackgroundGradientAnimation
          :key="`scheme-${schemeId}-${replayKey}`"
          :gradient-background-start="scheme.start"
          :gradient-background-end="scheme.end"
          :first-color="scheme.first"
          :second-color="scheme.second"
          :third-color="scheme.third"
          :fourth-color="scheme.fourth"
          :fifth-color="scheme.fifth"
          class="h-full"
          data-testid="scheme-stage"
        >
          <div class="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <p class="text-2xl font-bold">
              {{ scheme.label }}
            </p>
            <p class="mt-2 max-w-sm text-sm text-white/80">
              Remounted with new body-level CSS variables.
            </p>
          </div>
        </MBackgroundGradientAnimation>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active scheme
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-scheme"
        >
          {{ scheme.id }}
        </dd>
        <dt class="text-muted">
          gradient start
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-start"
        >
          {{ scheme.start }}
        </dd>
        <dt class="text-muted">
          gradient end
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-end"
        >
          {{ scheme.end }}
        </dd>
        <dt class="text-muted">
          applied via
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-applied"
        >
          remount (no watcher)
        </dd>
        <dt class="text-muted">
          scope of CSS vars
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-scope"
        >
          document.body (shared)
        </dd>
        <dt class="text-muted">
          last mount wins
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-wins"
        >
          yes
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Multiple instances
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Size, colours and blending are global, so instances can only differ through per-instance
        props: <code class="font-mono">class</code> (content container),
        <code class="font-mono">container-class</code> (root) and
        <code class="font-mono">interactive</code>. The two side stages run with
        <code class="font-mono">interactive=false</code>, so no pointer blob spawns there — but
        every instance still starts its own rAF loop.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            interactive off · content top-left
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl border border-default">
            <MBackgroundGradientAnimation
              :key="`left-${replayKey}`"
              :interactive="false"
              class="p-4"
              container-class="rounded-xl"
              data-testid="instance-left"
            >
              <div class="relative z-10 text-left text-white">
                <p class="text-lg font-bold">
                  Top left
                </p>
                <p class="text-xs text-white/75">
                  class: p-4
                </p>
              </div>
            </MBackgroundGradientAnimation>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            interactive on · centred
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl border border-default">
            <MBackgroundGradientAnimation
              :key="`middle-${replayKey}`"
              class="h-full"
              data-testid="instance-middle"
            >
              <div class="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                <p class="text-lg font-bold">
                  Centre
                </p>
                <p class="text-xs text-white/75">
                  class: h-full
                </p>
              </div>
            </MBackgroundGradientAnimation>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            interactive off · content bottom-right
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl border border-default">
            <MBackgroundGradientAnimation
              :key="`right-${replayKey}`"
              :interactive="false"
              class="flex h-full items-end justify-end p-4"
              container-class="rounded-xl"
              data-testid="instance-right"
            >
              <div class="relative z-10 text-right text-white">
                <p class="text-lg font-bold">
                  Bottom right
                </p>
                <p class="text-xs text-white/75">
                  class: flex h-full items-end justify-end p-4
                </p>
              </div>
            </MBackgroundGradientAnimation>
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          per-instance props
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-per-instance"
        >
          class · container-class · interactive
        </dd>
        <dt class="text-muted">
          shared via document.body
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-shared"
        >
          size · colours · blending
        </dd>
        <dt class="text-muted">
          rAF loops on page
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-loops-count"
        >
          one per instance
        </dd>
        <dt class="text-muted">
          slot wrapper height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-slot-height"
        >
          class="h-full" (left/right override)
        </dd>
        <dt class="text-muted">
          size default
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-size"
        >
          80%
        </dd>
        <dt class="text-muted">
          blending default
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-blend-default"
        >
          hard-light
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const schemes = [
  {
    id: 'indigo',
    label: 'Indigo (default)',
    start: 'rgb(108, 0, 162)',
    end: 'rgb(0, 17, 82)',
    first: '18, 113, 255',
    second: '221, 74, 255',
    third: '100, 220, 255',
    fourth: '200, 50, 50',
    fifth: '180, 180, 50',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    start: 'rgb(255, 95, 0)',
    end: 'rgb(90, 0, 40)',
    first: '255, 130, 50',
    second: '255, 60, 120',
    third: '255, 205, 90',
    fourth: '200, 40, 80',
    fifth: '120, 30, 140',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    start: 'rgb(0, 40, 90)',
    end: 'rgb(0, 90, 110)',
    first: '0, 180, 255',
    second: '0, 230, 170',
    third: '80, 130, 255',
    fourth: '20, 80, 160',
    fifth: '0, 200, 200',
  },
] as const

const schemeId = ref<typeof schemes[number]['id']>('indigo')
const interactive = ref(true)
const replayKey = ref(0)

const scheme = computed(() => schemes.find(option => option.id === schemeId.value) ?? schemes[0])

function replay() {
  replayKey.value++
}

function toggleInteractive() {
  interactive.value = !interactive.value
}

function selectScheme(id: typeof schemes[number]['id']) {
  schemeId.value = id
}
</script>
