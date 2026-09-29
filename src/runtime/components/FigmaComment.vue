<template>
  <div
    ref="rootEl"
    v-bind="$attrs"
    :class="['relative', props.class, props.className]"
    @click="handleToggle"
    @keydown.enter.prevent="handleToggle"
    @keydown.space.prevent="handleToggle"
  >
    <motion.div
      :animate="cardAnimate"
      :aria-expanded="isOpen"
      :aria-label="toggleLabel"
      :style="cardStyle"
      :transition="cardTransition"
      class="absolute bottom-0 left-0 cursor-pointer overflow-hidden rounded-2xl rounded-bl-none bg-default shadow-[0px_0px_0.5px_0px_rgb(0_0_0/0.18),0px_3px_8px_0px_rgb(0_0_0/0.1),0px_1px_3px_0px_rgb(0_0_0/0.1)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default"
      data-demo-figma-card=""
      role="button"
      tabindex="0"
    >
      <motion.div
        :animate="avatarAnimate"
        :style="avatarStyle"
        :transition="avatarTransition"
        class="absolute z-10"
      >
        <img
          v-if="hasAvatarImage"
          ref="avatarImgEl"
          :src="props.avatarUrl"
          :alt="resolvedAvatarAlt"
          class="size-6 rounded-full object-cover"
          @error="avatarFailed = true"
        >
        <span
          v-else
          aria-hidden="true"
          class="flex size-6 items-center justify-center rounded-full bg-muted text-[10px] leading-none font-semibold text-inverted"
        >{{ fallbackInitial }}</span>
      </motion.div>

      <div
        ref="measureEl"
        aria-hidden="true"
        class="pointer-events-none absolute"
        :style="measureStyle"
      >
        <div class="flex flex-col items-start gap-0.5 py-3 pr-4 pl-11">
          <div class="flex items-start gap-0.5">
            <p class="text-[11px] leading-4 font-semibold text-highlighted">
              {{ props.authorName }}
            </p>
            <p class="text-[11px] leading-4 font-medium text-muted">
              {{ props.timestamp }}
            </p>
          </div>
          <p class="text-left text-[11px] leading-4 font-medium text-highlighted">
            {{ props.message }}
          </p>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          v-if="isOpen"
          key="figma-comment-content"
          :initial="contentInitial"
          :animate="contentAnimate"
          :exit="contentExit"
          :transition="contentTransition"
          :style="contentStyle"
          class="absolute inset-0 flex flex-col items-start gap-0.5 py-3 pr-4 pl-11"
        >
          <div class="flex items-start gap-0.5">
            <p class="text-[11px] leading-4 font-semibold text-highlighted">
              {{ props.authorName }}
            </p>
            <p class="text-[11px] leading-4 font-medium text-muted">
              {{ props.timestamp }}
            </p>
          </div>
          <p class="text-left text-[11px] leading-4 font-medium text-highlighted">
            {{ props.message }}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useClickOutside } from '../composables/useClickOutside'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FigmaCommentProps>(), {
  authorName: DEFAULT_AUTHOR_NAME,
  avatarAlt: undefined,
  avatarUrl: DEFAULT_AVATAR_URL,
  class: undefined,
  className: undefined,
  message: DEFAULT_MESSAGE,
  open: undefined,
  defaultOpen: false,
  timestamp: DEFAULT_TIMESTAMP,
  width: DEFAULT_WIDTH,
})

const emit = defineEmits<{
  'openChange': [value: boolean]
  'update:open': [value: boolean]
}>()

const shouldReduceMotion = useReducedMotion()
const internalOpen = ref(props.defaultOpen)
const contentHeight = ref(CLOSED_SIZE)
const avatarFailed = ref(false)

const rootEl = ref<HTMLElement>()
const measureEl = ref<HTMLElement>()
const avatarImgEl = ref<HTMLImageElement>()

const isControlled = computed(() => props.open !== undefined)
const isOpen = computed<boolean>(() =>
  isControlled.value ? Boolean(props.open) : internalOpen.value,
)

// Single write path for the open state. The reference has no controlled prop:
// it owns the state and reports it from an effect keyed on `isOpen`, so
// `onOpenChange` always carries the value the component is actually showing —
// once on mount with the initial value, then on every change. A click here
// therefore only *requests* the next value through `update:open`; `openChange`
// is left to the watcher below, so it can never report a change the parent
// refused to apply.
function setOpen(value: boolean) {
  if (!isControlled.value) {
    internalOpen.value = value
  }
  emit('update:open', value)
}

// Mirrors the reference's `useEffect(() => onOpenChange?.(isOpen), [isOpen,
// onOpenChange])`. `onOpenChange` identity cannot change in Vue — the listener
// is resolved at setup — so `isOpen` is the only meaningful dependency.
watch(isOpen, (value) => {
  emit('openChange', value)
})

// The React reference attaches `onClick` and its click-outside ref to the
// animated card itself. motion-v does not reliably forward `on*` props onto the
// DOM node it renders, so the listeners and the ref live on this plain wrapper
// instead. The wrapper is `position: relative` with a single absolutely
// positioned child, so it is a zero-size box: `contains()` is still true for
// every pixel of the card, which keeps the outside-click semantics identical.
useClickOutside(rootEl, () => {
  if (isOpen.value) {
    setOpen(false)
  }
})

const resolvedAvatarAlt = computed(() => props.avatarAlt ?? props.authorName)
const hasAvatarImage = computed(() => !!props.avatarUrl && !avatarFailed.value)
const fallbackInitial = computed(() => props.authorName.charAt(0))
const toggleLabel = computed(() =>
  `${isOpen.value ? 'Hide' : 'Show'} comment from ${props.authorName}`,
)

watch(() => props.avatarUrl, async () => {
  avatarFailed.value = false
  await nextTick()
  syncAvatarFailure()
})

function syncAvatarFailure() {
  const img = avatarImgEl.value
  if (img && img.complete && img.naturalWidth === 0) {
    avatarFailed.value = true
  }
}

function measureContent() {
  const inner = measureEl.value?.firstElementChild
  if (!(inner instanceof HTMLElement)) {
    return
  }

  const height = inner.scrollHeight
  if (height > 0) {
    contentHeight.value = height
  }
}

let measureTimerShort: ReturnType<typeof setTimeout> | undefined
let measureTimerLong: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  measureTimerShort = setTimeout(measureContent, MEASURE_DELAY_SHORT)
  measureTimerLong = setTimeout(measureContent, MEASURE_DELAY_LONG)
  emit('openChange', isOpen.value)
  // A cached DNS failure can resolve before hydration attaches the error
  // listener, so also check the already-failed image state once mounted.
  void nextTick(syncAvatarFailure)
})

// The reference only measures on mount even though its comment says the height
// is measured "when the component mounts or message changes"; re-measuring on
// change keeps the open card the right size without a remount.
watch([() => props.message, () => props.width], () => {
  void nextTick(measureContent)
})

onBeforeUnmount(() => {
  clearTimeout(measureTimerShort)
  clearTimeout(measureTimerLong)
})

function handleToggle() {
  setOpen(!isOpen.value)
}

const cardSize = computed(() => ({
  height: isOpen.value ? contentHeight.value : CLOSED_SIZE,
  width: isOpen.value ? props.width : CLOSED_SIZE,
}))

const cardAnimate = computed(() => (shouldReduceMotion.value ? {} : cardSize.value))
const cardStyle = computed<CSSProperties | undefined>(() =>
  shouldReduceMotion.value
    ? { height: `${cardSize.value.height}px`, width: `${cardSize.value.width}px` }
    : undefined,
)

const cardTransition = computed(() =>
  shouldReduceMotion.value
    ? { duration: 0 }
    : {
        damping: 45,
        delay: isOpen.value ? 0 : CONTAINER_CLOSE_DELAY,
        duration: 0.25,
        mass: 0.7,
        stiffness: 550,
        type: 'spring' as const,
      },
)

const avatarOffset = computed(() => ({
  left: isOpen.value ? AVATAR_OPEN_LEFT : AVATAR_CLOSED_LEFT,
  top: isOpen.value ? AVATAR_OPEN_TOP : AVATAR_CLOSED_TOP,
}))

const avatarAnimate = computed(() =>
  shouldReduceMotion.value ? {} : avatarOffset.value,
)

const avatarStyle = computed<CSSProperties | undefined>(() =>
  shouldReduceMotion.value
    ? {
        left: `${avatarOffset.value.left}px`,
        top: `${avatarOffset.value.top}px`,
      }
    : undefined,
)

const avatarTransition = computed(() =>
  shouldReduceMotion.value
    ? { duration: 0 }
    : {
        damping: 25,
        duration: 0.25,
        stiffness: 300,
        type: 'spring' as const,
      },
)

const measureStyle = computed<CSSProperties>(() => ({
  left: 0,
  position: 'absolute',
  top: '-9999px',
  width: `${props.width}px`,
}))

const contentStyle = computed<CSSProperties>(() => ({ width: `${props.width}px` }))

const contentInitial = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 0 }
    : { filter: `blur(${INITIAL_BLUR_PX}px)`, opacity: 0 },
)

const contentAnimate = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 1 }
    : { filter: 'blur(0px)', opacity: 1 },
)

// motion-v types `transition` as a plain object and Vue's prop validator rejects
// a function, so the reference's `(isExiting) => ...` transition is expressed as
// the enter transition on the component plus the matching transition nested in
// the `exit` target. Both resolve to the same 0.25s blur/opacity tween; only the
// enter keeps the 0.15s content delay.
const contentTransition = computed(() =>
  shouldReduceMotion.value
    ? { duration: 0 }
    : {
        duration: 0.25,
        ease: BLUR_EASE,
        filter: {
          delay: CONTENT_DELAY,
          duration: 0.25,
          ease: BLUR_EASE,
        },
        opacity: {
          delay: CONTENT_DELAY,
          duration: 0.25,
          ease: BLUR_EASE,
        },
      },
)

const contentExit = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 0, transition: { duration: 0 } }
    : {
        filter: `blur(${EXIT_BLUR_PX}px)`,
        opacity: 0,
        transition: {
          duration: 0.25,
          ease: BLUR_EASE,
          filter: { duration: 0.25, ease: BLUR_EASE },
          opacity: { duration: 0.25, ease: BLUR_EASE },
        },
      },
)
</script>

<script lang="ts">
// Kept in a normal script so the hoisted `defineProps()` defaults can reference
// these module-scope constants, and so the public prop interface is importable.
const CLOSED_SIZE = 32
const AVATAR_CLOSED_LEFT = 4
const AVATAR_CLOSED_TOP = 4
const AVATAR_OPEN_LEFT = 12
const AVATAR_OPEN_TOP = 12
const CONTENT_DELAY = 0.15
const INITIAL_BLUR_PX = 6
const EXIT_BLUR_PX = 3
const MEASURE_DELAY_SHORT = 100
const MEASURE_DELAY_LONG = 500
const CONTAINER_CLOSE_DELAY = 0.08
const BLUR_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const DEFAULT_WIDTH = 180
const DEFAULT_TIMESTAMP = 'Just now'
// The reference reads its defaults from `somePeople(1, 11)[0]`, which is
// `arjun-mehta` in smoothui's cast data. The avatar url is the exact string
// `getImageKitUrl` builds for that entry.
const DEFAULT_AUTHOR_NAME = 'Arjun Mehta'
const DEFAULT_AVATAR_URL
  = 'https://ik.imagekit.io/16u211libb/smoothui/troupe-people/arjun-mehta.webp?tr=w-48,h-48,q-85,f-auto'
const DEFAULT_MESSAGE
  = 'What happens if we adjust this to handle a light and dark mode? I\'m not sure if we\'re ready to handle...'

export interface FigmaCommentProps {
  /** Comment author, shown in the attribution row. */
  authorName?: string
  /** Alternative text for the avatar image. Defaults to `authorName`. */
  avatarAlt?: string
  /** Avatar image url. Defaults to the reference author's ImageKit portrait. */
  avatarUrl?: string
  /** Extra classes for the positioning wrapper. */
  class?: string
  /** Alias of `class`, kept for parity with the React reference. */
  className?: string
  /** Comment body. */
  message?: string
  /** Controlled open state. Leave undefined for uncontrolled usage. */
  open?: boolean
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean
  /** Relative time string shown next to the author. */
  timestamp?: string
  /** Open card width in pixels. Also the measurement width. */
  width?: number
}
</script>
