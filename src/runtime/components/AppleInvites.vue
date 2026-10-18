<template>
  <div
    v-bind="$attrs"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <AnimatePresence
      :custom="direction"
      :initial="false"
    >
      <motion.div
        v-for="item in visibleEvents"
        :key="item.key"
        :class="ui.card({ class: [uiProps.ui?.card, props.cardClassName] })"
        :animate="item.variant"
        :custom="direction"
        exit="hidden"
        initial="hidden"
        :style="{
          height: responsiveHeight,
          width: responsiveWidth,
        }"
        :variants="variants"
      >
        <div :class="ui.cardInner({ class: uiProps.ui?.cardInner })">
          <div
            v-if="item.event.backgroundClassName"
            :class="ui.background({ class: [uiProps.ui?.background, item.event.backgroundClassName] })"
          />
          <img
            v-else-if="item.event.image"
            :alt="item.event.title || ''"
            :class="ui.image({ class: uiProps.ui?.image })"
            :draggable="false"
            height="400"
            :src="item.event.image"
            width="400"
          >

          <div
            :class="ui.badgeWrap({ class: uiProps.ui?.badgeWrap })"
            :style="{
              left: `${metrics.badgeLeft}px`,
              top: `${metrics.badgeTop}px`,
            }"
          >
            <span
              :class="ui.badge({ class: uiProps.ui?.badge })"
              :style="{
                fontSize: `${metrics.badgeFontSize}px`,
                gap: `${metrics.badgeGap}px`,
                paddingBottom: `${metrics.badgePaddingY}px`,
                paddingLeft: `${metrics.badgePaddingX}px`,
                paddingRight: `${metrics.badgePaddingX}px`,
                paddingTop: `${metrics.badgePaddingY}px`,
              }"
            >
              <UIcon
                name="i-lucide-crown"
                aria-hidden="true"
                :style="{
                  width: `${metrics.badgeIconSize}px`,
                  height: `${metrics.badgeIconSize}px`,
                }"
              />
              {{ item.event.badge }}
            </span>
          </div>

          <div
            :class="ui.content({ class: uiProps.ui?.content })"
            :style="{ padding: `${metrics.contentPadding}px` }"
          >
            <div
              :class="ui.avatars({ class: uiProps.ui?.avatars })"
              :style="{
                gap: `${metrics.avatarGap}px`,
                marginBottom: `${metrics.avatarMarginBottom}px`,
              }"
            >
              <img
                v-for="(participant, idx) in item.event.participants || []"
                :key="`participant-${participant.avatar}-${idx}`"
                :alt="`Participant ${idx + 1}`"
                :class="ui.avatar({ class: uiProps.ui?.avatar })"
                :draggable="false"
                :height="metrics.avatarSize"
                :src="participant.avatar"
                :style="{
                  height: `${metrics.avatarSize}px`,
                  width: `${metrics.avatarSize}px`,
                }"
                :width="metrics.avatarSize"
              >
            </div>
            <p
              v-if="item.event.title"
              :class="ui.title({ class: uiProps.ui?.title })"
              :style="{
                fontSize: `${metrics.titleFontSize}px`,
                lineHeight: BASE_LINE_HEIGHT,
                marginBottom: `${metrics.titleMarginBottom}px`,
              }"
            >
              {{ item.event.title }}
            </p>
            <p
              v-if="item.event.subtitle"
              :class="ui.subtitle({ class: uiProps.ui?.subtitle })"
              :style="{
                fontSize: `${metrics.subtitleFontSize}px`,
                lineHeight: BASE_LINE_HEIGHT,
              }"
            >
              {{ item.event.subtitle }}
            </p>
            <p
              :class="ui.location({ class: uiProps.ui?.location })"
              :style="{
                fontSize: `${metrics.locationFontSize}px`,
                lineHeight: BASE_LINE_HEIGHT,
              }"
            >
              {{ item.event.location }}
            </p>
          </div>

          <div :class="ui.blurWrap({ class: uiProps.ui?.blurWrap })">
            <div
              v-for="blur in BLUR_LAYERS"
              :key="blur"
              :class="ui.blurLayer({ class: uiProps.ui?.blurLayer })"
              :style="{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                maskImage: 'linear-gradient(transparent, #000)',
                WebkitMaskImage: 'linear-gradient(transparent, #000)',
              }"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import appleInvites from '../theme/apple-invites'

defineOptions({ inheritAttrs: false })

export interface ResponsiveSize {
  '2xl'?: number | string
  'base'?: number | string
  'lg'?: number | string
  'md'?: number | string
  'sm'?: number | string
  'xl'?: number | string
}

export interface Participant {
  avatar: string
}

export interface Event {
  backgroundClassName?: string
  badge?: string
  id: number
  image?: string
  location: string
  participants?: Participant[]
  subtitle?: string
  title?: string
}

export interface Props {
  /** Controlled active card. Leave undefined to let the carousel track it itself. */
  activeIndex?: number
  /** Width divided by this value gives the card height when `cardHeight` is omitted. */
  aspectRatio?: number
  /** Merged onto each card wrapper. */
  cardClassName?: string
  /** Explicit card height. Falls back to `cardWidth / aspectRatio`. */
  cardHeight?: number | string | ResponsiveSize
  /** Card width. Pass a `ResponsiveSize` to scale with the viewport. */
  cardWidth?: number | string | ResponsiveSize
  /** Merged onto the outer centring wrapper. */
  class?: string
  /** Invitation cards to cycle through. */
  events: Event[]
  /** Milliseconds between automatic advances. */
  interval?: number
  /** Per-slot classes resolved against the component theme. */
  ui?: Record<string, any>
}

const DEFAULT_CARD_WIDTH = 240
const DEFAULT_ASPECT_RATIO = 1.5625 // 5:8 ratio (500/320)

// Base sizes for responsive scaling (based on DEFAULT_CARD_WIDTH = 240)
const BASE_BADGE_FONT_SIZE = 12
const BASE_BADGE_PADDING_X = 12
const BASE_BADGE_PADDING_Y = 3
const BASE_BADGE_ICON_SIZE = 14
const BASE_TITLE_FONT_SIZE = 18
const BASE_SUBTITLE_FONT_SIZE = 12
const BASE_LOCATION_FONT_SIZE = 12
const BASE_AVATAR_SIZE = 24
const BASE_CONTENT_PADDING = 24
const BASE_BADGE_TOP = 16
const BASE_BADGE_LEFT = 16
const BASE_BADGE_GAP = 8
const BASE_AVATAR_GAP = 8
const BASE_AVATAR_MARGIN_BOTTOM = 8
const BASE_TITLE_MARGIN_BOTTOM = 4
const BASE_LINE_HEIGHT = 1.4
const BADGE_PADDING_Y_SCALE_FACTOR = 0.7 // Reduce vertical padding scaling for more compact badges

// Minimum sizes to ensure readability
const MIN_BADGE_FONT_SIZE = 10
const MIN_BADGE_PADDING_X = 8
const MIN_BADGE_PADDING_Y = 1
const MIN_BADGE_ICON_SIZE = 12
const MIN_TITLE_FONT_SIZE = 14
const MIN_SUBTITLE_FONT_SIZE = 10
const MIN_LOCATION_FONT_SIZE = 10
const MIN_AVATAR_SIZE = 20
const MIN_CONTENT_PADDING = 12
const MIN_BADGE_TOP = 8
const MIN_BADGE_LEFT = 8
const MIN_BADGE_GAP = 4
const MIN_AVATAR_GAP = 4
const MIN_AVATAR_MARGIN_BOTTOM = 4
const MIN_TITLE_MARGIN_BOTTOM = 2

const BREAKPOINTS = {
  '2xl': 1536,
  'lg': 1024,
  'md': 768,
  'sm': 640,
  'xl': 1280,
} as const

/** Blur radii, in px, of the stacked gradient-masked glass layers. */
const BLUR_LAYERS = [1, 2, 3, 6, 12] as const

const SPRING_TRANSITION = {
  damping: 30,
  duration: 0.25,
  stiffness: 300,
  type: 'spring',
} as const

const REDUCED_TRANSITION = { duration: 0 } as const

const REDUCED_GLASS_TRANSITION = { duration: 0.3 } as const

const VISIBLE_OFFSETS = [-1, 0, 1] as const

type CardVariant = 'center' | 'left' | 'right'

interface VisibleEvent {
  event: Event
  /**
   * The event id, so a card keeps its DOM node while it slides between slots.
   * The `[-1, 0, 1]` window wraps onto the same id twice for one- and two-event
   * lists; the repeat is suffixed with its slot so the two copies stay distinct
   * for Vue's keyed TransitionGroup instead of collapsing into one.
   */
  key: string
  variant: CardVariant
}

const props = withDefaults(defineProps<Props>(), {
  activeIndex: undefined,
  aspectRatio: DEFAULT_ASPECT_RATIO,
  cardClassName: undefined,
  cardHeight: undefined,
  cardWidth: DEFAULT_CARD_WIDTH,
  class: undefined,
  interval: 3000,
  ui: undefined,
})

const emit = defineEmits<{
  'update:activeIndex': [index: number]
}>()

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'appleInvites',
  props,
  theme: appleInvites,
})

const shouldReduceMotion = useReducedMotion()
const { width: viewportWidth } = useWindowSize()

/**
 * The reference resolves responsive sizes in a mount effect, so the server and
 * the first client render both use `getInitialSize` and only a mounted client
 * ever reads the viewport. Gating on `isMounted` reproduces that and keeps the
 * markup hydration-safe.
 */
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

function formatSize(size: number | string): string {
  return typeof size === 'number' ? `${size}px` : size
}

function isResponsiveObject(size: number | string | ResponsiveSize | undefined): size is ResponsiveSize {
  return typeof size === 'object' && size !== null
}

function getInitialSize(
  size: number | string | ResponsiveSize | undefined,
  defaultValue: number | string,
): string {
  if (!size) {
    return formatSize(defaultValue)
  }
  if (typeof size === 'number' || typeof size === 'string') {
    return formatSize(size)
  }
  // Responsive object - start with base or first available value
  if (size.base !== undefined) {
    return formatSize(size.base)
  }
  return formatSize(defaultValue)
}

function getSizeForBreakpoint(
  size: ResponsiveSize,
  width: number,
): number | string | undefined {
  if (width >= BREAKPOINTS['2xl']) {
    return size['2xl'] ?? size.xl ?? size.lg ?? size.md ?? size.sm ?? size.base
  }
  if (width >= BREAKPOINTS.xl) {
    return size.xl ?? size.lg ?? size.md ?? size.sm ?? size.base
  }
  if (width >= BREAKPOINTS.lg) {
    return size.lg ?? size.md ?? size.sm ?? size.base
  }
  if (width >= BREAKPOINTS.md) {
    return size.md ?? size.sm ?? size.base
  }
  if (width >= BREAKPOINTS.sm) {
    return size.sm ?? size.base
  }
  return size.base
}

function resolveSize(
  size: number | string | ResponsiveSize | undefined,
  defaultValue: number | string,
): string {
  if (isResponsiveObject(size) && isMounted.value) {
    const selectedSize = getSizeForBreakpoint(size, viewportWidth.value)
    if (selectedSize !== undefined) {
      return formatSize(selectedSize)
    }
  }
  return getInitialSize(size, defaultValue)
}

function parseSize(size: string): number {
  const num = Number.parseFloat(size)
  return Number.isNaN(num) ? 0 : num
}

function calculateHeightFromWidth(width: string, aspectRatio: number): string {
  const widthNum = parseSize(width)
  if (widthNum === 0) {
    return width
  }
  const heightNum = widthNum * aspectRatio
  return `${heightNum}px`
}

/** Local stand-in for popmotion's `wrap`, which is not a motion-v dependency. */
function wrapIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0
  }
  return ((index % length) + length) % length
}

const responsiveWidth = computed(() => resolveSize(props.cardWidth, DEFAULT_CARD_WIDTH))

const aspectRatioHeight = computed(() => calculateHeightFromWidth(responsiveWidth.value, props.aspectRatio))

const explicitHeight = computed(() => resolveSize(props.cardHeight, aspectRatioHeight.value))

const responsiveHeight = computed(() => props.cardHeight === undefined
  ? aspectRatioHeight.value
  : explicitHeight.value)

/**
 * Responsive sizes for internal content, derived from the resolved card width
 * exactly like the reference.
 */
const metrics = computed(() => {
  const scaleFactor = parseSize(responsiveWidth.value) / DEFAULT_CARD_WIDTH

  return {
    avatarGap: Math.max(MIN_AVATAR_GAP, Math.round(BASE_AVATAR_GAP * scaleFactor)),
    avatarMarginBottom: Math.max(
      MIN_AVATAR_MARGIN_BOTTOM,
      Math.round(BASE_AVATAR_MARGIN_BOTTOM * scaleFactor),
    ),
    avatarSize: Math.max(MIN_AVATAR_SIZE, Math.round(BASE_AVATAR_SIZE * scaleFactor)),
    badgeFontSize: Math.max(
      MIN_BADGE_FONT_SIZE,
      Math.round(BASE_BADGE_FONT_SIZE * scaleFactor),
    ),
    badgeGap: Math.max(MIN_BADGE_GAP, Math.round(BASE_BADGE_GAP * scaleFactor)),
    badgeIconSize: Math.max(
      MIN_BADGE_ICON_SIZE,
      Math.round(BASE_BADGE_ICON_SIZE * scaleFactor),
    ),
    badgeLeft: Math.max(MIN_BADGE_LEFT, Math.round(BASE_BADGE_LEFT * scaleFactor)),
    badgePaddingX: Math.max(
      MIN_BADGE_PADDING_X,
      Math.round(BASE_BADGE_PADDING_X * scaleFactor),
    ),
    badgePaddingY: Math.max(
      MIN_BADGE_PADDING_Y,
      Math.round(BASE_BADGE_PADDING_Y * scaleFactor * BADGE_PADDING_Y_SCALE_FACTOR),
    ),
    badgeTop: Math.max(MIN_BADGE_TOP, Math.round(BASE_BADGE_TOP * scaleFactor)),
    contentPadding: Math.max(
      MIN_CONTENT_PADDING,
      Math.round(BASE_CONTENT_PADDING * scaleFactor),
    ),
    locationFontSize: Math.max(
      MIN_LOCATION_FONT_SIZE,
      Math.round(BASE_LOCATION_FONT_SIZE * scaleFactor),
    ),
    subtitleFontSize: Math.max(
      MIN_SUBTITLE_FONT_SIZE,
      Math.round(BASE_SUBTITLE_FONT_SIZE * scaleFactor),
    ),
    titleFontSize: Math.max(
      MIN_TITLE_FONT_SIZE,
      Math.round(BASE_TITLE_FONT_SIZE * scaleFactor),
    ),
    titleMarginBottom: Math.max(
      MIN_TITLE_MARGIN_BOTTOM,
      Math.round(BASE_TITLE_MARGIN_BOTTOM * scaleFactor),
    ),
  }
})

const variants = computed(() => {
  const transition = shouldReduceMotion.value ? REDUCED_TRANSITION : SPRING_TRANSITION

  return {
    center: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition,
      x: '-50%',
      zIndex: 3,
    },
    hidden: {
      opacity: 0,
      transition: shouldReduceMotion.value ? REDUCED_TRANSITION : REDUCED_GLASS_TRANSITION,
      zIndex: 1,
    },
    left: {
      opacity: 0.8,
      rotate: -12,
      scale: 0.9,
      transition,
      x: '-130%',
      zIndex: 2,
    },
    right: {
      opacity: 0.8,
      rotate: 12,
      scale: 0.9,
      transition,
      x: '30%',
      zIndex: 2,
    },
  }
})

const internalPage = ref(0)

/** Kept for parity with the reference, which threads it through `custom`. */
const direction = ref(0)

const page = computed(() => props.activeIndex ?? internalPage.value)

const activeIndex = computed(() => wrapIndex(page.value, props.events.length))

function setPage(value: number, nextDirection: number): void {
  if (props.activeIndex !== undefined) {
    emit('update:activeIndex', value)
    return
  }
  internalPage.value = value
  direction.value = nextDirection
}

/**
 * The reference recreates the timer in an effect, so it only ever exists in the
 * browser and any manual or external page change restarts the countdown.
 */
let intervalTimer: ReturnType<typeof setInterval> | undefined

function clearIntervalTimer(): void {
  if (intervalTimer !== undefined) {
    clearInterval(intervalTimer)
    intervalTimer = undefined
  }
}

watch(
  [() => page.value, () => props.interval, () => props.events.length],
  () => {
    clearIntervalTimer()
    if (!import.meta.client || props.events.length === 0 || props.interval <= 0) {
      return
    }
    intervalTimer = setInterval(() => {
      setPage(page.value + 1, 1)
    }, props.interval)
  },
  { immediate: true },
)

onUnmounted(clearIntervalTimer)

function getVariant(index: number): CardVariant {
  if (index === 1) {
    return 'center'
  }
  if (index === 0) {
    return 'left'
  }
  return 'right'
}

/**
 * The `[-1, 0, 1]` window, mapped straight onto `events` and wrapped, exactly
 * like the reference. Every slot is emitted, so one- and two-event lists still
 * show the same card twice — once as the left neighbour and once as the right.
 */
const visibleEvents = computed<VisibleEvent[]>(() => {
  const total = props.events.length
  if (total === 0) {
    return []
  }

  const result: VisibleEvent[] = []
  const usedKeys = new Set<string>()

  for (const [slot, offset] of VISIBLE_OFFSETS.entries()) {
    const event = props.events[wrapIndex(activeIndex.value + offset, total)]
    if (!event) {
      continue
    }

    const id = String(event.id)
    const key = usedKeys.has(id) ? `${id}-${slot}` : id
    usedKeys.add(key)

    result.push({ event, key, variant: getVariant(slot) })
  }

  return result
})
</script>
