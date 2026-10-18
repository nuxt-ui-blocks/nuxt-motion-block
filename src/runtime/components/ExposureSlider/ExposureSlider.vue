<template>
  <div
    class="flex w-full max-w-[500px] flex-col items-center gap-6 text-default"
    :class="props.class"
    :style="{ '--es-accent': accent }"
  >
    <ExposureProgressRing
      v-if="props.showIndicator"
      :value="selectedValue"
      :normalized="normalizedValue"
    />

    <div
      class="relative flex w-full items-center justify-center"
      :style="{ height: `${TRACK_HEIGHT}px`, maskImage: TRACK_MASK, WebkitMaskImage: TRACK_MASK }"
    >
      <!--
        The padded wrapper is what the pointer targets: the padding reserves half
        a notch either side of centre so the first and last notch can reach the
        middle of the track, which is where the selection actually happens.
      -->
      <div
        ref="track"
        class="relative h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
        :style="{ padding: `0 calc(50% - ${NOTCH_WIDTH / 2}px)` }"
        role="slider"
        :tabindex="0"
        :aria-label="props.label"
        :aria-valuemin="props.min"
        :aria-valuemax="props.max"
        :aria-valuenow="selectedValue"
        :aria-valuetext="`${selectedValue}`"
        :aria-disabled="props.disabled || undefined"
        @keydown="onKeydown"
        @pointerdown="onPointerdown"
        @pointermove="onPointermove"
        @pointerup="onPointerup"
        @pointercancel="onPointercancel"
      >
        <Motion
          as="ul"
          class="relative m-0 flex h-full list-none items-center p-0"
          :style="{ marginLeft: `${-centerIndex * NOTCH_WIDTH}px`, x: x }"
        >
          <ExposureNotch
            v-for="i in count"
            :key="i - 1"
            :index="i - 1"
            :center-index="centerIndex"
            :x="x"
          />
        </Motion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMotionValue, useReducedMotion, useSpring } from 'motion-v'
import { computed, ref } from 'vue'
import { useResolvedColor } from '../../composables/useThemeColor'
import { SPRING_REDUCED, SPRING_SNAP } from '../../utils/motion-tokens'
import ExposureNotch from './ExposureNotch.vue'
import ExposureProgressRing from './ExposureProgressRing.vue'
import { NOTCH_WIDTH, TRACK_HEIGHT } from './constants'

/**
 * Props for `MExposureSlider`.
 *
 * Declared here rather than in a sibling `types` file: `defineProps` has to
 * expand the type to emit runtime props, and when that type is imported the SFC
 * compiler needs filesystem access to resolve it, which the dev server's
 * browser-side compile path cannot provide.
 */
export interface ExposureSliderProps {
  /** Accessible name for the slider. Overridden by an `aria-label` attribute. */
  label?: string
  /** CSS colour for the centred notch and the progress ring. */
  accentColor?: string
  /** Classes for the outermost element. */
  class?: string
  /** Block all pointer and keyboard input and mark the track `aria-disabled`. */
  disabled?: boolean
  /** Value the slider starts at, and the centre of its travel. */
  defaultValue?: number
  /** Highest selectable value. */
  max?: number
  /** Lowest selectable value. */
  min?: number
  /** Show the progress ring above the track. */
  showIndicator?: boolean
  /** Distance between selectable values. */
  step?: number
}

const DEFAULT_ACCENT = 'var(--color-brand, oklch(0.65 0.25 12))'

/** Fades the track out at both ends so notches enter and leave rather than clip. */
const TRACK_MASK = 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'

const props = withDefaults(defineProps<ExposureSliderProps>(), {
  label: 'Exposure',
  defaultValue: 0,
  max: 20,
  min: -20,
  step: 1,
  showIndicator: true,
})

const emit = defineEmits<{ change: [value: number] }>()

const centerIndex = computed(() => Math.round((props.defaultValue - props.min) / props.step))
const count = computed(() => Math.floor((props.max - props.min) / props.step) + 1)

/** Largest |offset| in px, per side, before the track runs out of notches. */
const maxOffset = computed(() => Math.max(centerIndex.value, count.value - 1 - centerIndex.value) * NOTCH_WIDTH)

const accent = useResolvedColor(() => props.accentColor ?? DEFAULT_ACCENT)

const track = ref<HTMLElement | null>(null)

/** Raw, un-sprung track offset in px. Zero means "centred on `defaultValue`". */
const offset = useMotionValue(0)

/**
 * The spring is always mounted; reduced motion swaps its config instead of
 * skipping the hook. Conditionally calling `useSpring` would change hook order
 * the moment the OS preference changes, which React and Vue both treat as a
 * hard error.
 */
const reducedMotion = useReducedMotion()
const x = useSpring(offset, computed(() => (reducedMotion.value === true ? SPRING_REDUCED : SPRING_SNAP)))

/**
 * Plain reactive mirror of the selection.
 *
 * `offset` is a MotionValue, which templates deliberately do not unwrap, so
 * `aria-valuenow` cannot read it directly. This holds the same number in a form
 * the template can consume, and it is the value assistive tech is given: it steps
 * once per notch rather than tracking the spring frame by frame.
 */
const selectedIndex = ref(centerIndex.value)

const selectedValue = computed(() => Math.round(clampValue(selectedIndex.value)))

// The last value actually announced to the parent. `selectedValue` cannot
// answer "did this change?" on its own: the drag handlers move `selectedIndex`
// as the pointer travels and only `commit` decides what to announce, so by the
// time `commit` runs the derived value already reads back as the new one.
let lastEmitted = selectedValue.value

/**
 * The ring reads from `selectedIndex` rather than the spring.
 *
 * The selection only ever moves in whole notches, so the arc would step in
 * whole notches either way — deriving it from the raw selection loses no
 * animation while keeping the ring a plain presentational component instead of
 * three more motion values. The notches are where the continuous motion lives.
 */
const normalizedValue = computed(() => {
  const span = props.max - props.min
  if (span === 0) return 0
  return ((clampValue(selectedIndex.value) - props.min) / span) * 2 - 1
})
function clampIndex(index: number) {
  return Math.max(0, Math.min(count.value - 1, index))
}

function clampValue(index: number) {
  return props.min + index * props.step
}

/**
 * The single write path for the value.
 *
 * Both the drag and the keyboard handlers go through here, which is what keeps
 * `change` from firing twice for one interaction — upstream emitted on every
 * `pointermove` and then again on `pointerup` for the value it had just sent.
 */
function commit(index: number) {
  const next = clampIndex(index)
  const value = Math.round(clampValue(next))
  const changed = value !== lastEmitted

  selectedIndex.value = next
  // `offset` is measured from the centre notch, matching the drag path in
  // `onPointermove`. The list already carries a `-centerIndex` margin, so
  // writing the absolute index here would compound the two and fling the
  // track off screen on the first interaction.
  offset.set(-(next - centerIndex.value) * NOTCH_WIDTH)

  // Only announce a genuine change. Holding an arrow key against a bound, or
  // releasing a drag that never moved, would otherwise re-emit the value the
  // consumer already has — noise that makes a `change` handler do redundant
  // work, and a lie about what the event means.
  if (changed) {
    lastEmitted = value
    emit('change', value)
  }
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return

  const page = 10
  let next = selectedIndex.value

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      next -= 1
      break
    case 'ArrowRight':
    case 'ArrowUp':
      next += 1
      break
    case 'PageDown':
      next -= page
      break
    case 'PageUp':
      next += page
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = count.value - 1
      break
    default:
      return
  }

  event.preventDefault()
  commit(next)
}

// Pointer capture rather than window listeners: the gesture handlers stay on the
// element, so there is no teardown path to get wrong and a pointer released
// outside the window still lands on the element that owns the drag.
let grabStartX = 0
let grabStartOffset = 0
let grabStartIndex = 0

function applyDrag(clientX: number) {
  const dragged = grabStartOffset + (clientX - grabStartX)
  const bounded = Math.max(-maxOffset.value, Math.min(maxOffset.value, dragged))
  // The track follows the pointer continuously, but the selection only moves in
  // whole notches, so the readout and the ring agree with where a notch sits.
  offset.set(bounded)
  selectedIndex.value = clampIndex(centerIndex.value + Math.round(-bounded / NOTCH_WIDTH))
}

function onPointerdown(event: PointerEvent) {
  if (props.disabled || !track.value) return
  const rect = track.value.getBoundingClientRect()
  track.value.setPointerCapture(event.pointerId)
  // Jump to the notch under the pointer straight away, so a plain click lands
  // where the user aimed instead of springing back to the old selection — the
  // selection only moves in `applyDrag`, and a click that never moves the
  // pointer would otherwise leave it where it was. A notch `d` px right of
  // centre is a *higher* index, and `offset` is negative for a higher index,
  // so the jump subtracts. The grab origin absorbs it, so the first real move
  // tracks the finger from there rather than counting the jump twice.
  grabStartX = event.clientX
  grabStartIndex = selectedIndex.value
  grabStartOffset = offset.get() - (event.clientX - (rect.left + rect.width / 2))
  applyDrag(event.clientX)
  event.preventDefault()
}

function onPointermove(event: PointerEvent) {
  if (props.disabled || !track.value?.hasPointerCapture(event.pointerId)) return
  applyDrag(event.clientX)
}

function onPointerup(event: PointerEvent) {
  if (props.disabled || !track.value?.hasPointerCapture(event.pointerId)) return
  track.value.releasePointerCapture(event.pointerId)
  snapToNearest()
  commit(selectedIndex.value)
}

function onPointercancel(event: PointerEvent) {
  if (!track.value?.hasPointerCapture(event.pointerId)) return
  track.value.releasePointerCapture(event.pointerId)
  // A cancelled gesture never committed, so put the selection back where the
  // drag began. Snapping to wherever the pointer happened to be and staying
  // silent would leave the visible value disagreeing with the value the
  // consumer was last told about, which is worse than reverting.
  selectedIndex.value = grabStartIndex
  offset.set(-(grabStartIndex - centerIndex.value) * NOTCH_WIDTH)
}

/** Quantise a free drag onto a whole number of notches. */
function snapToNearest() {
  const current = offset.get()
  offset.set(Math.round(current / NOTCH_WIDTH) * NOTCH_WIDTH)
}
</script>
