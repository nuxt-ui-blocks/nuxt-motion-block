<script setup lang="ts">
import { defineComponent, h, ref, onMounted, nextTick, watch, computed } from 'vue'
import { motion, motionValue, useSpring, useTransform } from 'motion-v'
import type { MotionValue, SpringOptions } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import slidingNumber from '../theme/sliding-number'

/** Spring config (same feel as original) */
const TRANSITION = {
  stiffness: 280,
  damping: 18,
  mass: 0.3,
} satisfies SpringOptions

type Props = {
  value: number
  padStart?: boolean
  decimalSeparator?: string
  /** optional: force N decimals (e.g. 2 => always show 2 decimal places) */
  precision?: number | null
  class?: string
  ui?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  padStart: false,
  decimalSeparator: '.',
  precision: null,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'slidingNumber',
  props,
  theme: slidingNumber,
})

/** One animated glyph (0–9) positioned by y */
const DigitGlyph = defineComponent({
  name: 'DigitGlyph',
  props: {
    mv: { type: Object as () => MotionValue<number>, required: true }, // animated digit (0..9)
    number: { type: Number, required: true }, // this glyph (0..9)
    height: { type: Number, required: true }, // measured per-place height
    glyphClass: { type: String, default: '' },
  },
  setup(p) {
    /** make height reactive to useTransform by mirroring it in a MotionValue */
    const hMV = motionValue(p.height)
    watch(() => p.height, nv => hMV.set(nv))

    /** y depends on BOTH: animated digit value AND measured height */
    const y = useTransform<number, number>([p.mv, hMV], ([latest, height]) => {
      if (!height) return 0
      const placeValue = latest % 10
      const offset = (10 + p.number - placeValue) % 10
      let memo = offset * height
      if (offset > 5) memo -= 10 * height
      return memo
    })

    return () =>
      h(
        motion.span,
        {
          style: { y },
          transition: TRANSITION,
          class: p.glyphClass,
        },
        () => p.number.toString(),
      )
  },
})

/** One digit slot that renders 0–9 and slides to the correct one */
const Digit = defineComponent({
  name: 'Digit',
  props: {
    value: { type: Number, required: true }, // full integer/decimal integer (e.g., 123 or 45)
    place: { type: Number, required: true }, // 1, 10, 100, ... (or for decimals: 10^(len-index-1))
    digitClass: { type: String, default: '' },
    trackClass: { type: String, default: '' },
    ghostClass: { type: String, default: '' },
    glyphClass: { type: String, default: '' },
  },
  setup(p) {
    // current digit at this place (0..9)
    const digitValue = computed(() => Math.floor(p.value / p.place) % 10)

    // animate the digitValue with spring
    const raw = motionValue(digitValue.value)
    const spring = useSpring(raw, TRANSITION)
    watch(digitValue, nv => raw.set(nv))

    // measure height once per place using a ghost '0'
    const ghostRef = ref<HTMLElement | null>(null)
    const height = ref(0)
    const measure = () => {
      if (ghostRef.value) height.value = ghostRef.value.offsetHeight
    }
    onMounted(async () => {
      await nextTick()
      measure()
    })

    return () =>
      h(
        'div',
        { class: p.digitClass },
        [
          // 👻 Ghost to reserve height (visible to layout, not to eyes)
          h('span', { ref: ghostRef, class: p.ghostClass }, '0'),

          // Only render animated stack after height is known -> no blob
          height.value > 0
            ? h(
                'div',
                { class: p.trackClass },
                Array.from({ length: 10 }, (_, i) =>
                  h(DigitGlyph, { mv: spring, number: i, height: height.value, key: i, glyphClass: p.glyphClass }),
                ),
              )
            : null,
        ],
      )
  },
})

/** ---------- Split number into integer & decimals (reactive) ---------- */
const absValue = computed(() => Math.abs(props.value))

const formatted = computed(() => {
  if (props.precision === null) return absValue.value.toString()
  // fixed decimals if precision provided
  return absValue.value.toFixed(props.precision)
})

const integerPart = computed(() => formatted.value.split('.')[0])
const decimalPart = computed(() => formatted.value.split('.')[1] ?? '')

const integerValue = computed(() => Number.parseInt(integerPart.value || '0', 10))

const paddedInteger = computed(() => {
  const s = integerPart.value
  if (props.padStart && integerValue.value < 10) return `0${s}`
  return s
})

const integerDigits = computed(() => paddedInteger.value.split(''))
const integerPlaces = computed(() =>
  integerDigits.value.map((_, i) => Math.pow(10, integerDigits.value.length - i - 1)),
)

const decimalDigits = computed(() => decimalPart.value.split(''))
const decimalPlaces = computed(() =>
  decimalDigits.value.map((_, i) => Math.pow(10, decimalDigits.value.length - i - 1)),
)
</script>

<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <span v-if="value < 0">-</span>

    <!-- integer places -->
    <Digit
      v-for="(_, i) in integerDigits"
      :key="'pos-' + integerPlaces[i]"
      :value="integerValue"
      :place="integerPlaces[i]"
      :digit-class="ui.digit({ class: uiProps.ui?.digit })"
      :track-class="ui.digitTrack({ class: uiProps.ui?.digitTrack })"
      :ghost-class="ui.digitGhost({ class: uiProps.ui?.digitGhost })"
      :glyph-class="ui.digitGlyph({ class: uiProps.ui?.digitGlyph })"
    />

    <!-- decimals -->
    <template v-if="decimalDigits.length">
      <span :class="ui.separator({ class: uiProps.ui?.separator })">{{ decimalSeparator }}</span>
      <Digit
        v-for="(_, i) in decimalDigits"
        :key="'dec-' + i"
        :value="parseInt(decimalPart, 10)"
        :place="decimalPlaces[i]"
        :digit-class="ui.digit({ class: uiProps.ui?.digit })"
        :track-class="ui.digitTrack({ class: uiProps.ui?.digitTrack })"
        :ghost-class="ui.digitGhost({ class: uiProps.ui?.digitGhost })"
        :glyph-class="ui.digitGlyph({ class: uiProps.ui?.digitGlyph })"
      />
    </template>
  </div>
</template>
