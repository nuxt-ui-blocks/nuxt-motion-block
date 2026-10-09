<template>
  <div class="space-y-12">
    <UPageHeader
      title="UnlockFaceId"
      description="An Apple Face ID mark that runs its own scan. The brackets and the face draw on stroke by stroke, content behind the glyph stays blurred until the read resolves, and a failed read shakes and waits to be dismissed."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Uncontrolled
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        No <code class="font-mono">status</code> prop: activating the glyph starts a
        timed scan and resolves to <code class="font-mono">success</code>. The
        button disables itself while busy and once unlocked, so the scan can
        neither be restarted nor read as still available.
      </p>

      <MUnlockFaceId
        :error-message="uncontrolledErrorMessage"
        :scan-duration="scanDuration"
        :size="size"
        class="mx-auto max-w-sm"
        data-testid="uncontrolled"
        @complete="uncontrolledEvents.push('complete')"
        @scan="uncontrolledEvents.push('scan')"
      >
        <UCard>
          <p class="text-sm font-bold">
            Restricted content
          </p>
          <p class="mt-2 text-sm text-muted">
            Blurred and non-interactive until the read resolves. Nothing here is
            hidden from the DOM — it is blurred and made inert, so it must never
            carry the only copy of something that matters.
          </p>
        </UCard>
      </MUnlockFaceId>

      <div class="mt-6 grid gap-1 text-sm text-muted sm:grid-cols-2">
        <p>
          Events:
          <code
            class="font-mono"
            data-demo-events
          >{{ uncontrolledEvents.length ? uncontrolledEvents.join(' → ') : '—' }}</code>
        </p>
        <p>
          Scan duration:
          <code
            class="font-mono"
            data-demo-scan-duration
          >{{ scanDuration }}ms</code>
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Controlled
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Passing <code class="font-mono">status</code> hands the state machine to
        the caller: the component stops setting its own status entirely, so
        clicking the glyph only emits <code class="font-mono">scan</code> and
        waits. That is the shape to use when the read is real — a request to
        your own auth endpoint, not a timer.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in statuses"
          :key="option"
          :label="option"
          :variant="status === option ? 'solid' : 'outline'"
          :data-testid="`status-${option}`"
          @click="status = option"
        />
      </div>

      <MUnlockFaceId
        :error-message="controlledErrorMessage"
        :scan-duration="scanDuration"
        :size="size"
        :status="status"
        class="mx-auto max-w-sm"
        data-testid="controlled"
        @complete="controlledEvents.push('complete')"
        @scan="controlledEvents.push('scan')"
      >
        <UCard>
          <p class="text-sm font-bold">
            Restricted content
          </p>
        </UCard>
      </MUnlockFaceId>

      <p class="mt-6 text-sm text-muted">
        Events:
        <code
          class="font-mono"
          data-demo-controlled-events
        >{{ controlledEvents.length ? controlledEvents.join(' → ') : '—' }}</code>
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sizes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">size</code> is the rendered box only. The glyph
        is a fixed <code class="font-mono">100×100</code> viewBox, so the strokes
        and the corner radii scale with the box rather than being redrawn —
        which is why the stroke weight is a constant and not a computed one.
      </p>

      <div class="flex flex-wrap items-end gap-8">
        <MUnlockFaceId
          v-for="option in sizes"
          :key="option"
          :size="option"
          :status="status"
        >
          <p class="text-center text-xs text-muted">
            {{ option }}px
          </p>
        </MUnlockFaceId>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Environment
        </p>
      </template>

      <p class="mb-4 text-sm text-muted">
        Read back from the controlled glyph's own attributes and computed style
        — the accessibility contract and the blur gate, as the browser sees them.
      </p>

      <div class="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
        <p>
          Hydrated:
          <code
            class="font-mono"
            data-demo-poll
          >{{ readouts.poll }}</code>
        </p>
        <p>
          Reduced motion:
          <code
            class="font-mono"
            data-demo-reduced-motion
          >{{ readouts.reducedMotion }}</code>
        </p>
        <p>
          Glyph:
          <code
            class="font-mono"
            data-demo-glyph
          >{{ readouts.glyph }}</code>
        </p>
        <p>
          Status message:
          <code
            class="font-mono"
            data-demo-message
          >{{ readouts.message }}</code>
        </p>
        <p>
          Live region:
          <code
            class="font-mono"
            data-demo-live
          >{{ readouts.live }}</code>
        </p>
        <p>
          Trigger name:
          <code
            class="font-mono"
            data-demo-label
          >{{ readouts.label }}</code>
        </p>
        <p>
          Trigger busy:
          <code
            class="font-mono"
            data-demo-busy
          >{{ readouts.busy }}</code>
        </p>
        <p>
          Trigger disabled:
          <code
            class="font-mono"
            data-demo-disabled
          >{{ readouts.disabled }}</code>
        </p>
        <p>
          Trigger box:
          <code
            class="font-mono"
            data-demo-trigger-size
          >{{ readouts.triggerSize }}</code>
        </p>
        <p>
          Scan band:
          <code
            class="font-mono"
            data-demo-scan-band
          >{{ readouts.scanBand }}</code>
        </p>
        <p>
          Stroke colour:
          <code
            class="font-mono"
            data-demo-stroke
          >{{ readouts.stroke }}</code>
        </p>
        <p>
          Content filter:
          <code
            class="font-mono"
            data-demo-content-filter
          >{{ readouts.contentFilter }}</code>
        </p>
        <p>
          Content inert:
          <code
            class="font-mono"
            data-demo-content-events
          >{{ readouts.contentEvents }}</code>
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Controls
        </p>
      </template>

      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField
          label="scan duration"
          :hint="`${scanDuration}ms`"
        >
          <USelect
            v-model="scanDuration"
            :items="durations"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="size"
          :hint="`${size}px`"
        >
          <USelect
            v-model="size"
            :items="sizeItems"
            class="w-full"
          />
        </UFormField>
      </div>

      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <UFormField
          label="uncontrolled error message"
        >
          <UInput
            v-model="uncontrolledErrorMessage"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="controlled error message"
        >
          <UInput
            v-model="controlledErrorMessage"
            class="w-full"
          />
        </UFormField>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { UnlockStatus } from '../../../src/runtime/components/UnlockFaceId/constants'

const statuses: UnlockStatus[] = ['idle', 'scanning', 'success', 'error']
const sizes = [64, 96, 128, 192]
const sizeItems = sizes.map(option => ({ label: `${option}px`, value: option }))
const durations = [
  { label: '600ms', value: 600 },
  { label: '1200ms', value: 1200 },
  { label: '1800ms', value: 1800 },
  { label: '3000ms', value: 3000 },
]

const status = ref<UnlockStatus>('scanning')
const size = ref(128)
const scanDuration = ref(1800)
const uncontrolledErrorMessage = ref('Face not recognized. Try again.')
const controlledErrorMessage = ref('Face not recognized. Try again.')
const uncontrolledEvents = ref<string[]>([])
const controlledEvents = ref<string[]>([])

const reducedMotion = useReducedMotion()

// ------------------------------------------------------------------- readouts

const readouts = reactive({
  poll: 0,
  reducedMotion: '—',
  glyph: '—',
  message: '—',
  live: '—',
  label: '—',
  busy: '—',
  disabled: '—',
  triggerSize: '—',
  scanBand: '—',
  stroke: '—',
  contentFilter: '—',
  contentEvents: '—',
})

/**
 * Polled rather than bound, for the same reason as every other demo here: the
 * values worth reporting are computed styles and attributes, not the component's
 * own state, so the only honest way to show them is to read them back.
 */
let poll: ReturnType<typeof setInterval> | undefined

function readGlyph() {
  readouts.poll += 1

  const root = document.querySelector('[data-testid="controlled"]')
  if (!(root instanceof HTMLElement)) return

  const trigger = root.querySelector('[data-unlock-trigger]')
  const message = root.querySelector('[data-unlock-status]')
  const content = root.querySelector('[data-unlock-content]')
  const face = root.querySelector('[data-unlock-face-glyph]')

  readouts.reducedMotion = reducedMotion.value ? 'yes' : 'no'
  readouts.glyph = root.querySelector('[data-unlock-check-glyph]')
    ? 'check'
    : face ? 'face' : '—'
  readouts.message = message?.textContent?.trim() ?? '—'
  readouts.live = message
    ? `${message.getAttribute('role') ?? '—'} / ${message.getAttribute('aria-live') ?? '—'}`
    : '—'
  readouts.label = trigger?.getAttribute('aria-label') ?? '—'
  readouts.busy = trigger?.getAttribute('aria-busy') ?? '—'
  readouts.disabled = trigger instanceof HTMLButtonElement ? String(trigger.disabled) : '—'
  readouts.triggerSize = trigger
    ? `${getComputedStyle(trigger).width} × ${getComputedStyle(trigger).height}`
    : '—'
  readouts.scanBand = root.querySelector('[data-unlock-scan-band]') ? 'present' : 'absent'

  const path = root.querySelector('[data-unlock-face-glyph] path, [data-unlock-check-glyph] path')
  readouts.stroke = path instanceof SVGElement ? getComputedStyle(path).stroke : '—'

  readouts.contentFilter = content ? getComputedStyle(content).filter : '—'
  readouts.contentEvents = content ? getComputedStyle(content).pointerEvents : '—'
}

onMounted(() => {
  readGlyph()
  poll = setInterval(readGlyph, 150)
})

onBeforeUnmount(() => {
  if (poll) clearInterval(poll)
})
</script>
