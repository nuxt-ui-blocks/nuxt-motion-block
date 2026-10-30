<!--
  Segments are kept flush against their tags on purpose. The segment slot uses
  `whitespace-pre` so a split word keeps its exact shape, which also means a
  formatter-inserted newline would render as a visible gap between characters.
-->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <!-- @vue-ignore -->
  <Motion
    :ref="setRoot"
    :as="as"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :variants="containerVariants"
    initial="hidden"
    :animate="isActive ? 'visible' : 'hidden'"
  >
    <template
      v-for="segment in segments"
      :key="segment.key"
    >
      <span
        v-if="segment.isSpace"
        :class="ui.space({ class: uiProps.ui?.space })"
      >{{ segment.value }}</span>

      <!-- @vue-ignore -->
      <Motion
        v-else
        as="span"
        :class="ui.segment({ class: [uiProps.ui?.segment, uiProps.segmentClass] })"
        :variants="segmentVariants"
        :transition="segmentTransition"
      >{{ segment.value }}</Motion>
    </template>
  </Motion>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Motion, useInView, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textAnimate from '../theme/text-animate'

export type TextAnimatePreset
  = | 'fadeIn'
    | 'blurIn'
    | 'blurInUp'
    | 'blurInDown'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'scaleUp'
    | 'scaleDown'
    | 'spinIn'

export interface TextAnimateProps {
  /** Element to render the text as. */
  as?: string
  /** Split the text by words, characters or lines. */
  by?: 'words' | 'characters' | 'lines'
  /** Extra classes for the root element. */
  class?: string
  /** Seconds between one segment starting and the next. */
  delay?: number
  /** Seconds each segment takes to settle. */
  duration?: number
  /** Only play once when `startOnView` is on. */
  once?: boolean
  /** Animation to play. */
  preset?: TextAnimatePreset
  /** Extra classes for each animated segment. */
  segmentClass?: string
  /** Hold the animation until the text scrolls into view. */
  startOnView?: boolean
  /** Text to animate. The default slot wins if both are given. */
  text?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<TextAnimateProps>(), {
  as: 'p',
  by: 'words',
  class: undefined,
  delay: 0.1,
  duration: 0.3,
  once: false,
  preset: 'fadeIn',
  segmentClass: undefined,
  startOnView: true,
  text: '',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'textAnimate', props, theme: textAnimate })

const PRESETS: Record<TextAnimatePreset, { hidden: Record<string, any>, visible: Record<string, any> }> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  blurInUp: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  blurInDown: {
    hidden: { opacity: 0, y: -20, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 },
  },
  spinIn: {
    hidden: { opacity: 0, rotate: -180, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
}

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLElement | null>(null)
/**
 * A template ref on a component resolves to the instance, not the node, so the
 * element is unwrapped here before it reaches `useInView`.
 */
const setRoot = (target: any) => {
  rootRef.value = target?.$el ?? target ?? null
}
const inView = useInView(rootRef, { once: props.once, amount: 0.2 })

/**
 * Reduced motion skips the travel and the stagger entirely: the text is simply
 * present, which is the whole point of the preference.
 */
const isActive = computed(() => {
  if (shouldReduceMotion.value) {
    return true
  }
  return props.startOnView ? inView.value : true
})

const containerVariants = computed(() => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: shouldReduceMotion.value ? 0 : props.delay,
    },
  },
}))

const segmentVariants = computed(() => {
  if (shouldReduceMotion.value) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  }
  return PRESETS[props.preset] ?? PRESETS.fadeIn
})

const segmentTransition = computed(() => ({
  duration: shouldReduceMotion.value ? 0 : Math.max(props.duration, 0),
}))

interface Segment {
  isSpace: boolean
  key: string
  value: string
}

const segments = computed<Segment[]>(() => {
  const value = props.text
  if (!value) {
    return []
  }

  const parts = props.by === 'lines'
    ? value.split(/(\n)/)
    : props.by === 'characters'
      ? Array.from(value)
      : value.split(/(\s+)/)

  return parts
    .filter(part => part.length > 0)
    .map((part, index) => ({
      key: `${index}-${part}`,
      value: part,
      // Whitespace is rendered as plain text: animating it would translate the
      // gaps between words and leave the line visibly jittering.
      isSpace: part.trim().length === 0,
    }))
})
</script>
