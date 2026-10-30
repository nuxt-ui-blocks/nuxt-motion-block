<template>
  <span
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <Motion
      :key="replayToken"
      as="span"
      aria-hidden="true"
      :class="ui.highlight({ class: uiProps.ui?.highlight })"
      :style="highlightStyle"
      :initial="{ scaleX: 0, skewX: -12 }"
      :animate="{ scaleX: revealed ? 1 : 0, skewX: -12 }"
      :transition="transition"
    />
    <span :class="ui.text({ class: uiProps.ui?.text })">
      <slot>{{ text }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Motion, useInView, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textHighlighter from '../theme/text-highlighter'

export interface TextHighlighterProps {
  /** Extra classes for the wrapper. */
  class?: string
  /** Colour of the swipe. Any CSS colour works. */
  highlightColor?: string
  /** Seconds for one swipe. */
  duration?: number
  /** Wait before the swipe starts, in seconds. */
  delay?: number
  /** Text to highlight. The default slot wins when it is filled. */
  text?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<TextHighlighterProps>(), {
  class: undefined,
  highlightColor: undefined,
  duration: 0.7,
  delay: 0.1,
  text: '',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'textHighlighter', props, theme: textHighlighter })

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLElement | null>(null)
const inView = useInView(rootRef, { once: true, amount: 0.6 })

/**
 * The swipe is drawn once, on the way in. Under reduced motion it is simply
 * already there, so the text never reads as un-highlighted.
 */
const revealed = computed(() => shouldReduceMotion.value || inView.value)

const transition = computed(() => ({
  duration: shouldReduceMotion.value ? 0 : props.duration,
  delay: shouldReduceMotion.value ? 0 : props.delay,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}))

const highlightStyle = computed(() => (
  props.highlightColor ? { backgroundColor: props.highlightColor } : undefined
))

/**
 * The swipe is a one-shot reveal, so a new phrase would otherwise keep the
 * width of the old one. Re-arming the element replays the swipe whenever the
 * text or its timing changes, which also keeps a live playground honest.
 */
const replayToken = ref(0)

watch(
  () => [props.text, props.duration, props.delay],
  () => {
    replayToken.value += 1
  },
)
</script>
