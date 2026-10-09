<template>
  <div class="space-y-12">
    <UPageHeader
      title="OrbitalImageWheel"
      description="A ring of thumbnails you throw around. Drag to spin it, let go and it coasts on momentum, press the arrow keys to step, click a thumbnail to bring it to the top. The item nearest the top is the current one and is announced politely."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Uncontrolled
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        No <code class="font-mono">rotation</code> prop, so the wheel owns its angle.
        Dragging rotates it synchronously; releasing hands the drag velocity to a
        momentum loop that decays until it drops below
        <code class="font-mono">0.02°/ms</code> — and with
        <code class="font-mono">snap</code> on, that is when it settles onto the
        nearest thumbnail.
      </p>

      <MOrbitalImageWheel
        :active-id="activeId"
        :items="items"
        :snap="snap"
        class="my-4"
        data-testid="uncontrolled"
        @rotation-change="onUncontrolledRotation"
      />

      <div class="grid gap-1 text-sm text-muted sm:grid-cols-3">
        <p>
          Rotation:
          <code
            class="font-mono"
            data-demo-rotation
          >{{ uncontrolledRotation.toFixed(1) }}°</code>
        </p>
        <p>
          Events:
          <code
            class="font-mono"
            data-demo-changes
          >{{ uncontrolledChanges }}</code>
        </p>
        <p>
          Current:
          <code
            class="font-mono"
            data-demo-current
          >{{ uncontrolledCurrent }}</code>
        </p>
      </div>

      <p class="mt-4 text-sm text-muted">
        Try dragging it, or focus a thumbnail and press
        <kbd class="font-mono">←</kbd>
        /
        <kbd class="font-mono">→</kbd>
        — the steps are one item apart, so 120° for this set of six.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Auto-rotate
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">autoRotate</code> runs a continuous loop, but it
        suspends itself for any of three reasons: the pointer is hovering it (only
        on hover-capable pointers — on touch, <code class="font-mono">pointerenter</code>
        can fire without a matching leave and would otherwise pause it forever),
        focus is anywhere inside it, or the tab is hidden. The readout below is
        measured from the emitted events, not from the component's internals.
      </p>

      <MOrbitalImageWheel
        :auto-rotate="autoRotate"
        :auto-rotate-speed="autoRotateSpeed"
        :items="items"
        class="my-4"
        data-testid="auto-rotate"
        @rotation-change="onAutoRotation"
      />

      <div class="grid gap-1 text-sm text-muted sm:grid-cols-3">
        <p>
          Speed:
          <code
            class="font-mono"
            data-demo-speed
          >{{ autoRotateSpeed }}°/s</code>
        </p>
        <p>
          Advancing:
          <code
            class="font-mono"
            data-demo-advancing
          >{{ readouts.advancing }}</code>
        </p>
        <p>
          Hover capable:
          <code
            class="font-mono"
            data-demo-hover-capable
          >{{ readouts.hoverCapable }}</code>
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
        Passing <code class="font-mono">rotation</code> hands the angle to the
        caller. The component never writes its own state in this mode — it only
        emits what it would like, and the parent decides. Note the highlighted
        item is forced with <code class="font-mono">activeId</code> below, which
        overrides the automatic top-of-circle detection entirely.
      </p>

      <UFormField
        class="mb-6 max-w-md"
        label="rotation"
        :hint="`${Math.round(controlledRotation)}°`"
      >
        <USlider
          v-model="controlledRotation"
          :max="359"
          :min="0"
          :step="1"
        />
      </UFormField>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="item in items"
          :key="item.id"
          :label="item.label"
          :variant="activeId === item.id ? 'solid' : 'outline'"
          :data-testid="`active-${item.id}`"
          @click="activeId = item.id"
        />
      </div>

      <MOrbitalImageWheel
        :active-id="activeId"
        :items="items"
        :rotation="controlledRotation"
        class="my-4"
        data-testid="controlled"
        @rotation-change="controlledEvents += 1"
      />

      <p class="text-sm text-muted">
        Emitted:
        <code
          class="font-mono"
          data-demo-controlled-emits
        >{{ controlledEvents }}</code>
        — the wheel is asking for a value it will never apply on its own.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          faceOutward &amp; radius
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">faceOutward</code> adds each thumbnail's own
        angle to its transform, so the tiles turn with the ring like gondolas.
        <code class="font-mono">z-index</code> is the rounded vertical offset,
        which is what makes the near side of the ring overlap the far side.
      </p>

      <div class="flex flex-wrap items-start gap-10">
        <div class="text-center">
          <MOrbitalImageWheel
            :face-outward="faceOutward"
            :items="items"
            :radius="radius"
            :snap="snap"
            data-testid="sized"
          />
          <p class="mt-2 text-xs text-muted">
            r = {{ radius }}px
          </p>
        </div>

        <div class="grid flex-1 content-start gap-1 text-sm text-muted sm:grid-cols-2">
          <p>
            faceOutward:
            <code
              class="font-mono"
              data-demo-face-outward
            >{{ faceOutward }}</code>
          </p>
          <p>
            Outer box:
            <code
              class="font-mono"
              data-demo-diameter
            >{{ readouts.diameter }}</code>
          </p>
          <p>
            Tile size:
            <code
              class="font-mono"
              data-demo-tile
            >{{ readouts.tile }}</code>
          </p>
          <p>
            Top tile transform:
            <code
              class="font-mono"
              data-demo-top-transform
            >{{ readouts.topTransform }}</code>
          </p>
          <p>
            Tile rotate():
            <code
              class="font-mono"
              data-demo-tile-rotate
            >{{ readouts.tileRotate }}</code>
          </p>
          <p>
            Top z-index:
            <code
              class="font-mono"
              data-demo-top-z
            >{{ readouts.topZ }}</code>
          </p>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Degenerate item counts
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The item angle is <code class="font-mono">360 / items.length</code>, so
        both edges need a defined result rather than a division by zero. With no
        items there is nothing to place and nothing to announce; with one item the
        angle is the whole circle, the snap target is always zero, and that single
        tile is permanently the current one.
      </p>

      <div class="flex flex-wrap items-start gap-10">
        <div class="text-center">
          <MOrbitalImageWheel
            :items="[]"
            data-testid="empty"
          />
          <p class="mt-2 text-xs text-muted">
            0 items
          </p>
        </div>

        <div class="text-center">
          <MOrbitalImageWheel
            :items="items.slice(0, 1)"
            :snap="snap"
            data-testid="single"
          />
          <p class="mt-2 text-xs text-muted">
            1 item
          </p>
        </div>

        <div class="grid flex-1 content-start gap-1 text-sm text-muted sm:grid-cols-2">
          <p>
            Empty buttons:
            <code
              class="font-mono"
              data-demo-empty-buttons
            >{{ readouts.emptyButtons }}</code>
          </p>
          <p>
            Empty announcement:
            <code
              class="font-mono"
              data-demo-empty-live
            >{{ readouts.emptyLive }}</code>
          </p>
          <p>
            Single buttons:
            <code
              class="font-mono"
              data-demo-single-buttons
            >{{ readouts.singleButtons }}</code>
          </p>
          <p>
            Single current:
            <code
              class="font-mono"
              data-demo-single-current
            >{{ readouts.singleCurrent }}</code>
          </p>
        </div>
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
          label="radius"
          :hint="`${radius}px`"
        >
          <USelect
            v-model="radius"
            :items="radiusItems"
            class="w-full"
            data-testid="select-radius"
          />
        </UFormField>

        <UFormField
          label="autoRotateSpeed"
          :hint="`${autoRotateSpeed}°/s`"
        >
          <USelect
            v-model="autoRotateSpeed"
            :items="speedItems"
            class="w-full"
          />
        </UFormField>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <UButton
          v-for="toggle in toggles"
          :key="toggle"
          :label="`${toggle}: ${toggleState(toggle)}`"
          :variant="toggleState(toggle) ? 'solid' : 'outline'"
          :data-testid="`toggle-${toggle}`"
          @click="flipToggle(toggle)"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Environment
        </p>
      </template>

      <p class="mb-4 text-sm text-muted">
        Read back from the live DOM — the roles and attributes the wheel exposes,
        as the browser sees them.
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
          Root role:
          <code
            class="font-mono"
            data-demo-role
          >{{ readouts.role }}</code>
        </p>
        <p>
          Root name:
          <code
            class="font-mono"
            data-demo-label
          >{{ readouts.label }}</code>
        </p>
        <p>
          Buttons:
          <code
            class="font-mono"
            data-demo-buttons
          >{{ readouts.buttons }}</code>
        </p>
        <p>
          Announcement:
          <code
            class="font-mono"
            data-demo-live
          >{{ readouts.live }}</code>
        </p>
        <p>
          Current item:
          <code
            class="font-mono"
            data-demo-live-current
          >{{ readouts.liveCurrent }}</code>
        </p>
        <p>
          Tile names:
          <code
            class="font-mono"
            data-demo-names
          >{{ readouts.names }}</code>
        </p>
        <p>
          Touch action:
          <code
            class="font-mono"
            data-demo-touch
          >{{ readouts.touchAction }}</code>
        </p>
        <p>
          User select:
          <code
            class="font-mono"
            data-demo-select
          >{{ readouts.userSelect }}</code>
        </p>
        <p>
          Doc hidden:
          <code
            class="font-mono"
            data-demo-hidden
          >{{ readouts.hidden }}</code>
        </p>
        <p>
          Advancing:
          <code
            class="font-mono"
            data-demo-live-advancing
          >{{ readouts.advancing }}</code>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { OrbitalImageWheelItem } from '../../../src/runtime/components/OrbitalImageWheel/OrbitalImageWheel.vue'

const swatch = (from: string, to: string, glyph: string): string =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">`
    + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`
    + `<stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/>`
    + `</linearGradient></defs>`
    + `<rect width="160" height="160" fill="url(#g)"/>`
    + `<text x="80" y="100" font-family="system-ui,sans-serif" font-size="64" font-weight="700" `
    + `fill="rgba(255,255,255,0.94)" text-anchor="middle">${glyph}</text></svg>`,
  )}`

// Inline data URIs so the demo has no network dependency and every tile is
// visually distinct — the labels are the same strings the buttons announce.
const items: OrbitalImageWheelItem[] = [
  { alt: 'Alpine ridge at dusk', id: 'ridge', image: swatch('#4C1D95', '#7C3AED', 'A'), label: 'Ridge' },
  { alt: 'Tidal pool from above', id: 'tide', image: swatch('#0C4A6E', '#0891B2', 'B'), label: 'Tide' },
  { alt: 'Salt flat at noon', id: 'salt', image: swatch('#7C2D12', '#EA580C', 'C'), label: 'Salt' },
  { alt: 'Birch forest in fog', id: 'birch', image: swatch('#14532D', '#16A34A', 'D'), label: 'Birch' },
  { alt: 'Glacier crevasse', id: 'glacier', image: swatch('#1E3A8A', '#2563EB', 'E'), label: 'Glacier' },
  { alt: 'Desert arch at dawn', id: 'arch', image: swatch('#831843', '#DB2777', 'F'), label: 'Arch' },
]

const radii = [120, 160, 200]
const radiusItems = radii.map(option => ({ label: `${option}px`, value: option }))
const speeds = [6, 12, 45, 120]
const speedItems = speeds.map(option => ({ label: `${option}°/s`, value: option }))

const radius = ref(160)
const autoRotateSpeed = ref(12)
const autoRotate = ref(true)
const faceOutward = ref(true)
const snap = ref(true)
const activeId = ref<string | undefined>(undefined)

const uncontrolledRotation = ref(0)
const uncontrolledChanges = ref(0)
const autoRotation = ref(0)
const autoLastEvent = ref(0)
const controlledRotation = ref(0)
const controlledEvents = ref(0)

type Toggle = 'autoRotate' | 'faceOutward' | 'snap' | 'activeId'
const toggles: Toggle[] = ['autoRotate', 'faceOutward', 'snap', 'activeId']

function propsFor(toggle: Toggle) {
  if (toggle === 'autoRotate') return autoRotate
  if (toggle === 'faceOutward') return faceOutward
  return snap
}

function toggleState(toggle: Toggle) {
  if (toggle === 'activeId') return activeId.value !== undefined
  return propsFor(toggle).value
}

function flipToggle(toggle: Toggle) {
  if (toggle === 'activeId') {
    activeId.value = activeId.value === undefined ? items[2].id : undefined
    return
  }
  const target = propsFor(toggle)
  target.value = !target.value
}

function currentNameFor(selector: string) {
  const active = document.querySelector(`${selector} [aria-current="true"]`)
  return active?.getAttribute('aria-label') ?? '—'
}

const uncontrolledCurrent = ref('—')

function onUncontrolledRotation(rotation: number) {
  uncontrolledRotation.value = rotation
  uncontrolledChanges.value += 1
  uncontrolledCurrent.value = currentNameFor('[data-testid="uncontrolled"]')
}

function onAutoRotation(rotation: number) {
  autoRotation.value = rotation
  autoLastEvent.value = performance.now()
}

// ------------------------------------------------------------------- readouts

const reducedMotion = useReducedMotion()

const readouts = reactive({
  poll: 0,
  reducedMotion: '—',
  role: '—',
  label: '—',
  buttons: '—',
  live: '—',
  liveCurrent: '—',
  names: '—',
  touchAction: '—',
  userSelect: '—',
  hidden: '—',
  hoverCapable: '—',
  advancing: '—',
  diameter: '—',
  tile: '—',
  topTransform: '—',
  tileRotate: '—',
  topZ: '—',
  emptyButtons: '—',
  emptyLive: '—',
  singleButtons: '—',
  singleCurrent: '—',
})

/**
 * Polled rather than bound, for the same reason as every other demo here: the
 * values worth reporting are computed styles and attributes, not the component's
 * own state, so the only honest way to show them is to read them back.
 */
let poll: ReturnType<typeof setInterval> | undefined

function rotateOf(transform: string) {
  return /rotate\(([-\d.]+)deg\)/.exec(transform)?.[1] ?? null
}

function readEnvironment() {
  readouts.poll += 1

  const root = document.querySelector('[data-testid="uncontrolled"]')
  readouts.reducedMotion = reducedMotion.value ? 'yes' : 'no'
  readouts.hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ? 'yes'
    : 'no'
  readouts.hidden = String(document.hidden)
  // Derived from the emitted event stream rather than any internal flag: if
  // nothing has arrived in the last 250ms the loop is not running. Before the
  // first event ever lands there is nothing to measure, which is reported as
  // "never" rather than being reported as a pause that did not happen.
  if (autoLastEvent.value === 0) {
    readouts.advancing = 'never'
  }
  else {
    readouts.advancing
      = performance.now() - autoLastEvent.value < 250 ? 'yes' : 'no'
  }

  if (!(root instanceof HTMLElement)) return
  const buttons = [...root.querySelectorAll('button')]
  const live = root.querySelector('span[aria-live]')

  readouts.role = root.getAttribute('role') ?? '—'
  readouts.label = root.getAttribute('aria-label') ?? '—'
  readouts.buttons = String(buttons.length)
  readouts.live = live
    ? `${live.getAttribute('aria-live') ?? '—'} / "${live.textContent?.trim() || 'empty'}"`
    : '—'
  readouts.liveCurrent = currentNameFor('[data-testid="uncontrolled"]')
  readouts.names = buttons
    .map(button => button.getAttribute('aria-label') ?? '?')
    .join(', ')
  readouts.touchAction = getComputedStyle(root).touchAction
  readouts.userSelect = getComputedStyle(root).userSelect
}

function readGeometry() {
  const root = document.querySelector('[data-testid="sized"]')
  if (!(root instanceof HTMLElement)) return
  const buttons = [...root.querySelectorAll('button')] as HTMLElement[]
  readouts.diameter = `${getComputedStyle(root).width} × ${getComputedStyle(root).height}`
  readouts.tile = buttons.length
    ? `${getComputedStyle(buttons[0]).width} × ${getComputedStyle(buttons[0]).height}`
    : '—'

  const top = buttons.reduce<HTMLElement | null>((best, button) => {
    if (!best) return button
    return Number(button.style.zIndex) > Number(best.style.zIndex) ? button : best
  }, null)

  readouts.topTransform = top?.style.transform ?? '—'
  readouts.topZ = top?.style.zIndex ?? '—'
  const transforms = buttons.map(button => rotateOf(button.style.transform) ?? '0')
  readouts.tileRotate
    = transforms.every(value => value === '0') ? 'all 0°' : `${transforms.join('°, ')}°`
}

function readEdges() {
  const empty = document.querySelector('[data-testid="empty"]')
  const single = document.querySelector('[data-testid="single"]')
  readouts.emptyButtons = empty ? String(empty.querySelectorAll('button').length) : '—'
  readouts.emptyLive
    = (empty?.querySelector('span[aria-live]')?.textContent?.trim() || 'empty')
  readouts.singleButtons = single ? String(single.querySelectorAll('button').length) : '—'
  readouts.singleCurrent = single ? currentNameFor('[data-testid="single"]') : '—'
}

function readAll() {
  readEnvironment()
  readGeometry()
  readEdges()
}

onMounted(() => {
  readAll()
  poll = setInterval(readAll, 150)
})

onBeforeUnmount(() => {
  if (poll) clearInterval(poll)
})
</script>
