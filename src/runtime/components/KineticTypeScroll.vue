<template>
  <div
    ref="wrapperRef"
    :class="[
      'relative flex flex-wrap gap-x-[0.4em] gap-y-[0.18em]',
      alignClass[props.align],
      props.class,
    ]"
  >
    <!-- Every glyph below is aria-hidden, so the readable copy lives here. An
         aria-label on this plain div would be dropped by assistive tech. -->
    <span class="sr-only">{{ readableText }}</span>
    <component
      :is="KineticWord"
      v-for="(entry, entryIndex) in props.words"
      :key="entryIndex"
      :dim-range="props.dimRange"
      :index="entryIndex"
      :lift-range="props.liftRange"
      :progress="scrollYProgress"
      :scale-range="props.scaleRange"
      :should-reduce-motion="!!shouldReduceMotion"
      :stagger="props.stagger"
      :total="props.words.length"
      :tracking-range="props.trackingRange"
      :weight-range="props.weightRange"
      :word="entry"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref, type Component } from 'vue'
import { useReducedMotion, useScroll, useSpring, useTransform, Motion } from 'motion-v'
import type { MaybeComputedElementRef } from '@vueuse/core'
import type { MotionValue, ScrollOffset } from 'motion-v'

export type KineticTypeScrollAlign = 'start' | 'center' | 'end'

export interface KineticTypeScrollProps {
  /** Row alignment of the wrapped phrase. */
  align?: KineticTypeScrollAlign
  class?: string
  /**
   * Scrollable ancestor whose progress drives the effect. Pass a getter —
   * `:container="() => panelRef"` — not the element: a plain binding is
   * unwrapped by the template and captured as `null` during `setup`, after
   * which nothing re-reads it and `useScroll` falls back to the window. The
   * getter is invoked inside Motion's `flush: 'post'` effect, where your ref is
   * a tracked dependency.
   */
  container?: MaybeComputedElementRef
  /** Opacity at rest vs. at each word's peak. */
  dimRange?: [number, number]
  /** Vertical offset in px at rest vs. at each word's peak. */
  liftRange?: [number, number]
  /** Motion scroll offset tuple, forwarded to `useScroll`. */
  offset?: ScrollOffset
  /** Scale applied at rest vs. at each word's peak. */
  scaleRange?: [number, number]
  /** Fractional offset between each word's active scroll window (0-1). */
  stagger?: number
  /** Letter-spacing in px at rest vs. at each word's peak. */
  trackingRange?: [number, number]
  /**
   * `font-variation-settings` "wght" at rest vs. at each word's peak.
   * Only visible when the active font is a variable font.
   */
  weightRange?: [number, number]
  words: string[]
}

const props = withDefaults(defineProps<KineticTypeScrollProps>(), {
  align: 'center',
  class: '',
  dimRange: () => [0.45, 1],
  liftRange: () => [0, -12],
  // Motion's own default (`["start start", "end end"]`) collapses on an element
  // shorter than its scroller, which left the whole effect stuck near 0. This
  // window opens as the phrase enters the lower part of the viewport and closes
  // around the time it reaches the middle.
  offset: () => ['start 0.9', 'end 0.45'],
  scaleRange: () => [0.92, 1.18],
  stagger: 0.12,
  trackingRange: () => [-0.5, 2.5],
  weightRange: () => [380, 800],
})

/**
 * Head- and tail-room at both ends of the scroll range: the wave starts after
 * the phrase has settled into view and ends before it leaves, so there is time
 * to read the line on either side of the effect.
 */
const WAVE_MARGIN = 0.14
/**
 * Each word's active window as a multiple of the gap between peaks. Above 1 the
 * windows overlap, which is what turns a row of individual pulses into a single
 * wave travelling through the phrase.
 */
const WINDOW_OVERLAP = 1.2
const MIN_WINDOW = 0.09
const INTENSITY_SCALE = 2
/**
 * A soft, near-critically-damped spring: the wave should read as one moving
 * crest, not as each word snapping.
 */
const SPRING_TRANSITION = { type: 'spring' as const, bounce: 0, duration: 0.32 }

const alignClass = {
  center: 'justify-center',
  end: 'justify-end',
  start: 'justify-start',
}

const shouldReduceMotion = useReducedMotion()
const wrapperRef = ref<HTMLElement | null>(null)
// The wrapper needs a positioned ancestor for Motion to measure a scroll target
// against, which is why the template's class list includes `relative`.
// `container` scopes the progress source; when it is undefined Motion measures
// the nearest scrollable ancestor, which is the document itself.
const { scrollYProgress } = useScroll({
  // Straight through, never `props.container?.value`: `useScroll` resolves the
  // getter via `unrefElement` inside its own `flush: 'post'` effect, so
  // unwrapping here would strip the reactive source.
  container: props.container,
  offset: props.offset,
  target: wrapperRef,
})

const readableText = computed(() => props.words.join(' '))

/**
 * Each word owns its own set of motion values, so it has to be its own
 * component. It is defined inline with a render function rather than in a
 * sibling file: every `.vue` under `components/` is auto-registered with an `M`
 * prefix, and a one-word rendering helper is not a public component.
 */
const KineticWord = defineComponent({
  name: 'KineticWord',
  props: {
    dimRange: { type: Array as unknown as () => [number, number], required: true },
    index: { type: Number, required: true },
    liftRange: { type: Array as unknown as () => [number, number], required: true },
    progress: { type: Object as () => MotionValue<number>, required: true },
    scaleRange: { type: Array as unknown as () => [number, number], required: true },
    shouldReduceMotion: { type: Boolean, required: true },
    stagger: { type: Number, required: true },
    total: { type: Number, required: true },
    trackingRange: { type: Array as unknown as () => [number, number], required: true },
    weightRange: { type: Array as unknown as () => [number, number], required: true },
    word: { type: String, required: true },
  },
  setup(wordProps) {
    const gaps = Math.max(1, wordProps.total - 1)
    // Peaks are evenly spaced and the whole wave is centred in the range, so a
    // short phrase does not crowd into the first third of the scroll.
    const spacing = Math.min(wordProps.stagger, (1 - 2 * WAVE_MARGIN) / gaps)
    const waveStart = (1 - spacing * gaps) / 2
    const center = waveStart + spacing * wordProps.index
    const halfWindow = Math.max(spacing * WINDOW_OVERLAP, MIN_WINDOW)

    const localProgress = useTransform(
      wordProps.progress,
      [center - halfWindow, center + halfWindow],
      [0, 1],
      { clamp: true },
    )
    // A triangle: rises to 1 at the centre of the window, falls to 0 at the
    // edges. Peaks at the centre and nulls at the edges is what makes the
    // window overlap read as one travelling crest.
    const intensity = useTransform(
      localProgress,
      (value: number) => 1 - Math.abs(value * INTENSITY_SCALE - 1),
    )

    const scale = useSpring(useTransform(intensity, [0, 1], wordProps.scaleRange), SPRING_TRANSITION)
    const tracking = useSpring(useTransform(intensity, [0, 1], wordProps.trackingRange), SPRING_TRANSITION)
    const weight = useSpring(useTransform(intensity, [0, 1], wordProps.weightRange), SPRING_TRANSITION)
    const y = useSpring(useTransform(intensity, [0, 1], wordProps.liftRange), SPRING_TRANSITION)
    const opacity = useSpring(useTransform(intensity, [0, 1], wordProps.dimRange), SPRING_TRANSITION)
    const letterSpacing = useTransform(tracking, (value: number) => `${value}px`)
    const fontVariationSettings = useTransform(weight, (value: number) => `"wght" ${Math.round(value)}`)

    return () => {
      if (wordProps.shouldReduceMotion) {
        // No travel and no dimming — the phrase simply reads at its peak weight.
        return h(
          'span',
          {
            'aria-hidden': 'true',
            'class': 'inline-block',
            'style': { fontVariationSettings: `"wght" ${wordProps.weightRange[1]}` },
          },
          wordProps.word,
        )
      }
      // `Motion` rather than a bare span: a plain element does not unwrap motion
      // values in its style, so the values would be dropped and the word would
      // never change at all. The cast is because `Motion`'s prop type does not
      // model motion values inside `style`, and the `h()` overload cannot be
      // satisfied without it.
      return h(
        Motion as unknown as Component,
        {
          'as': 'span',
          'aria-hidden': 'true',
          'class': 'inline-block will-change-transform',
          'style': { fontVariationSettings, letterSpacing, opacity, scale, y },
        },
        wordProps.word,
      )
    }
  },
})
</script>
