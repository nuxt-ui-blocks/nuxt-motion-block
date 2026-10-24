<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div
      ref="viewportRef"
      :class="ui.viewport({ class: uiProps.ui?.viewport })"
      @scroll="measure"
    >
      <slot />
    </div>

    <AnimatePresence :initial="false">
      <motion.div
        v-if="!isPinned"
        :class="ui.jump({ class: uiProps.ui?.jump })"
        :initial="jumpFrom"
        :animate="jumpTo"
        :exit="jumpExit"
        :transition="jumpTransition"
      >
        <UButton
          aria-label="Jump to latest"
          color="neutral"
          icon="i-lucide-arrow-down"
          size="xs"
          variant="outline"
          :class="ui.jumpButton({ class: uiProps.ui?.jumpButton })"
          :ui="{ base: 'rounded-full' }"
          @click="jumpToLatest"
        >
          Jump to latest
        </UButton>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiConversation from '../theme/ai-conversation'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface AiConversationProps {
  /**
   * Changes whenever the thread grows - message count, or the length of the
   * text being streamed. It is the signal to follow the bottom; without it the
   * container still updates for resizes, but not for a stream that arrives in
   * place.
   */
  contentKey?: string | number
  /**
   * How close to the bottom still counts as "at the bottom". Zero breaks on
   * fractional scroll heights; anything large keeps yanking the view down while
   * someone is reading a few lines up.
   */
  bottomThreshold?: number
  class?: string
  ui?: Record<string, any>
}

/**
 * Scroll container for a thread.
 *
 * It follows the bottom **only while the reader is already there**. Scrolling up
 * during a stream is an explicit act - the reader wants to read something - and
 * dragging them back down is the single most common way chat UIs become
 * unusable. When it stops following, a pill offers the trip back.
 */
const props = withDefaults(defineProps<AiConversationProps>(), {
  contentKey: undefined,
  bottomThreshold: 48,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiConversation', props, theme: aiConversation })

const reducedMotion = useReducedMotion()
const viewportRef = ref<HTMLElement | null>(null)
const isPinned = ref(true)

const measure = (): void => {
  const viewport = viewportRef.value
  if (!viewport) return
  const distance = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
  isPinned.value = distance <= props.bottomThreshold
}

const scrollToBottom = (behavior: ScrollBehavior): void => {
  const viewport = viewportRef.value
  if (!viewport) return
  // `Element.scrollTo` is missing in jsdom and a few older engines, and it is
  // not worth throwing over - assigning `scrollTop` lands in the same place,
  // just without the smoothing.
  if (typeof viewport.scrollTo === 'function') {
    viewport.scrollTo({ behavior, top: viewport.scrollHeight })
  } else {
    viewport.scrollTop = viewport.scrollHeight
  }
  isPinned.value = true
}

const jumpToLatest = (): void => {
  scrollToBottom(reducedMotion.value === true ? 'auto' : 'smooth')
}

/**
 * Post-flush, so the measurement is taken against the DOM that just grew. A
 * `pre` watcher would scroll to the previous `scrollHeight` and land a message
 * short, which reads as the thread being broken.
 */
watch(
  () => props.contentKey,
  () => {
    if (isPinned.value) scrollToBottom(reducedMotion.value === true ? 'auto' : 'smooth')
  },
  { flush: 'post' },
)

let resizeObserver: ResizeObserver | undefined
let mutationObserver: MutationObserver | undefined

/**
 * Re-observes every child, because the observer only knows about nodes it was
 * told about and the slot re-renders its list on change.
 */
const observeChildren = (): void => {
  if (!resizeObserver || !viewportRef.value) return
  resizeObserver.disconnect()
  for (const child of Array.from(viewportRef.value.children)) {
    resizeObserver.observe(child)
  }
}

onMounted(() => {
  // A resize catches content that grows without `contentKey` changing: an image
  // finishing loading, a `details` element opening, a font swapping in.
  resizeObserver = new ResizeObserver(measure)
  observeChildren()

  mutationObserver = new MutationObserver(() => {
    observeChildren()
    measure()
  })
  if (viewportRef.value) {
    mutationObserver.observe(viewportRef.value, { childList: true })
  }

  // A thread opens at its latest message, so the first paint is already where a
  // reader expects to be.
  scrollToBottom('auto')
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
})

defineExpose({ isPinned, scrollToBottom: jumpToLatest })

const jumpFrom = computed(() =>
  reducedMotion.value === true ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 8 },
)

const jumpTo = { opacity: 1, scale: 1, y: 0 }

const jumpExit = computed(() =>
  reducedMotion.value === true
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, scale: 0.96, y: 8 },
)

const jumpTransition = computed(() => (reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT))
</script>
