<template>
  <div
    ref="wrapperRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @focusout="handleWrapperBlur"
    @mouseenter="handleWrapperMouseEnter"
    @mouseleave="handleWrapperMouseLeave"
  >
    <button
      ref="triggerRef"
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      :class="ui.trigger({ class: uiProps.ui?.trigger })"
      @click="handleTriggerClick"
      @focus="handleTriggerFocus"
      @keydown="handleTriggerKeyDown"
    >
      <slot name="trigger">
        {{ `@${props.profile.handle}` }}
      </slot>
    </button>

    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        :id="cardId"
        :role="openedVia === 'focus' ? 'dialog' : undefined"
        :aria-label="openedVia === 'focus' ? `${props.profile.name} profile preview` : undefined"
        :initial="cardInitial"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="cardExit"
        :transition="cardTransition"
        :style="{ transformOrigin }"
        :class="ui.card({ placement: resolvedPlacement, class: uiProps.ui?.card })"
        @mouseenter="handleCardMouseEnter"
        @mouseleave="handleCardMouseLeave"
      >
        <div
          v-if="props.loading"
          aria-hidden="true"
          :class="ui.loading({ class: uiProps.ui?.loading })"
        >
          <div :class="ui.loadingBanner({ class: uiProps.ui?.loadingBanner })" />
          <div :class="ui.loadingBody({ class: uiProps.ui?.loadingBody })">
            <div :class="ui.loadingAvatar({ class: uiProps.ui?.loadingAvatar })" />
            <div :class="ui.loadingText({ class: uiProps.ui?.loadingText })">
              <div :class="ui.loadingLineWide({ class: uiProps.ui?.loadingLineWide })" />
              <div :class="ui.loadingLineNarrow({ class: uiProps.ui?.loadingLineNarrow })" />
            </div>
          </div>
          <div :class="ui.loadingLineFull({ class: uiProps.ui?.loadingLineFull })" />
          <div :class="ui.loadingLineShort({ class: uiProps.ui?.loadingLineShort })" />
        </div>

        <div v-else>
          <img
            v-if="props.profile.banner"
            :src="props.profile.banner"
            alt=""
            :class="ui.banner({ class: uiProps.ui?.banner })"
            height="64"
            width="320"
          >
          <div
            v-else
            :class="ui.bannerFallback({ class: uiProps.ui?.bannerFallback })"
          />

          <div :class="ui.body({ class: uiProps.ui?.body })">
            <div :class="ui.header({ class: uiProps.ui?.header })">
              <div :class="ui.identity({ class: uiProps.ui?.identity })">
                <img
                  :src="props.profile.avatar"
                  :alt="props.profile.name"
                  :class="ui.avatar({ class: uiProps.ui?.avatar })"
                  height="48"
                  width="48"
                >
                <div :class="ui.info({ class: uiProps.ui?.info })">
                  <div :class="ui.nameRow({ class: uiProps.ui?.nameRow })">
                    <a
                      v-if="props.profile.url"
                      :href="props.profile.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      :class="ui.nameLink({ class: uiProps.ui?.nameLink })"
                    >
                      {{ props.profile.name }}
                    </a>
                    <p
                      v-else
                      :class="ui.name({ class: uiProps.ui?.name })"
                    >
                      {{ props.profile.name }}
                    </p>
                    <UIcon
                      v-if="props.profile.verified"
                      name="i-heroicons-check-badge-solid"
                      :class="ui.verifiedIcon({ class: uiProps.ui?.verifiedIcon })"
                    />
                    <span
                      v-if="props.profile.verified"
                      :class="ui.verifiedLabel({ class: uiProps.ui?.verifiedLabel })"
                    >
                      Verified account
                    </span>
                  </div>
                  <p :class="ui.handle({ class: uiProps.ui?.handle })">
                    @{{ props.profile.handle }}
                  </p>
                </div>
              </div>

              <motion.div
                layout
                :class="ui.action({ class: uiProps.ui?.action })"
              >
                <UButton
                  :variant="isFollowing ? 'soft' : 'solid'"
                  :color="isFollowing ? 'neutral' : 'primary'"
                  :aria-pressed="isFollowing"
                  :class="ui.followButton({ class: uiProps.ui?.followButton })"
                  @click="toggleFollow"
                >
                  <AnimatePresence
                    :initial="false"
                    mode="wait"
                  >
                    <motion.span
                      :key="isFollowing ? 'following' : 'follow'"
                      :class="ui.followLabel({ class: uiProps.ui?.followLabel })"
                      :initial="{ opacity: 0 }"
                      :animate="{ opacity: 1 }"
                      :exit="{ opacity: 0 }"
                      :transition="labelTransition"
                    >
                      {{ isFollowing ? 'Following' : 'Follow' }}
                    </motion.span>
                  </AnimatePresence>
                </UButton>
              </motion.div>
            </div>

            <p
              v-if="props.profile.bio"
              :class="ui.bio({ class: uiProps.ui?.bio })"
            >
              {{ props.profile.bio }}
            </p>

            <ul
              v-if="props.profile.stats?.length"
              :class="ui.stats({ class: uiProps.ui?.stats })"
            >
              <li
                v-for="stat in props.profile.stats"
                :key="stat.label"
                :class="ui.stat({ class: uiProps.ui?.stat })"
              >
                <span :class="ui.statValue({ class: uiProps.ui?.statValue })">
                  <span v-if="typeof stat.value === 'number'">{{ formatStat(stat.label) }}</span>
                  <span v-else>{{ stat.value }}</span>
                </span>
                <span :class="ui.statLabel({ class: uiProps.ui?.statLabel })">
                  {{ stat.label }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import socialHoverCard from '../theme/social-hover-card'

export interface SocialProfileStat {
  label: string
  value: number | string
}

export interface SocialProfile {
  avatar: string
  banner?: string
  bio?: string
  handle: string
  id: string
  name: string
  stats?: SocialProfileStat[]
  url?: string
  verified?: boolean
}

type Placement = 'auto' | 'bottom' | 'top'
type ResolvedPlacement = 'bottom' | 'top'
type OpenedVia = 'focus' | 'hover'

interface Props {
  class?: string
  ui?: Record<string, any>
  closeDelay?: number
  /** Controlled follow state. Leave undefined for uncontrolled. */
  following?: boolean
  loading?: boolean
  openDelay?: number
  placement?: Placement
  profile: SocialProfile
}

const DEFAULT_OPEN_DELAY = 350
const DEFAULT_CLOSE_DELAY = 150
const CARD_MIN_SPACE_PX = 260
const COUNT_UP_DURATION_MS = 600
const SPRING_TRANSITION = { bounce: 0.1, duration: 0.25, type: 'spring' } as const
const INSTANT_TRANSITION = { duration: 0 } as const
const LABEL_TRANSITION = { duration: 0.15 } as const

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  closeDelay: DEFAULT_CLOSE_DELAY,
  following: undefined,
  loading: false,
  openDelay: DEFAULT_OPEN_DELAY,
  placement: 'auto',
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'socialHoverCard',
  props,
  theme: socialHoverCard,
})

const emit = defineEmits<{
  'follow:change': [following: boolean]
}>()

const shouldReduceMotion = useReducedMotion()

const isOpen = ref(false)
const openedVia = ref<OpenedVia>('hover')
const isHoverDevice = useHoverCapable()
const resolvedPlacement = ref<ResolvedPlacement>(props.placement === 'top' ? 'top' : 'bottom')
const internalFollowing = ref(props.following ?? false)

const wrapperRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)

let openTimeout: ReturnType<typeof setTimeout> | undefined
let closeTimeout: ReturnType<typeof setTimeout> | undefined
let countFrame = 0
let skipFocusOpen = false

const isFollowingControlled = computed(() => props.following !== undefined)
const isFollowing = computed(() => (isFollowingControlled.value ? props.following : internalFollowing.value))

const transformOrigin = computed(() =>
  resolvedPlacement.value === 'top' ? 'bottom center' : 'top center')

const cardId = computed(() => `social-hover-card-${props.profile.id}`)
const cardInitial = computed(() => (shouldReduceMotion.value ? { opacity: 0 } : { opacity: 0, scale: 0.92 }))
const cardExit = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, scale: 0.92 })
const cardTransition = computed(() => (shouldReduceMotion.value ? INSTANT_TRANSITION : SPRING_TRANSITION))
const labelTransition = computed(() => (shouldReduceMotion.value ? INSTANT_TRANSITION : LABEL_TRANSITION))

// Numeric stats count up from zero each time the card opens, so every stat runs
// off a single rAF loop instead of one loop per stat.
const numericStats = computed(() =>
  (props.profile.stats ?? []).filter(
    (stat): stat is SocialProfileStat & { value: number } => typeof stat.value === 'number'))

const statDisplays = reactive<Record<string, number>>({})

function formatStat(label: string) {
  return (statDisplays[label] ?? 0).toLocaleString()
}

function stopCountUp() {
  if (countFrame) {
    cancelAnimationFrame(countFrame)
    countFrame = 0
  }
}

function startCountUp() {
  stopCountUp()

  const targets = numericStats.value

  if (shouldReduceMotion.value) {
    for (const stat of targets) {
      statDisplays[stat.label] = stat.value
    }
    return
  }

  const start = performance.now()

  for (const stat of targets) {
    statDisplays[stat.label] = 0
  }

  const tick = (now: number) => {
    // The rAF timestamp is the start of the current frame, which can predate the
    // `performance.now()` captured above, so clamp the progress to keep the first
    // frame from rendering a negative count.
    const progress = Math.max(0, Math.min((now - start) / COUNT_UP_DURATION_MS, 1))
    const eased = easeOutCubic(progress)

    for (const stat of targets) {
      statDisplays[stat.label] = Math.round(stat.value * eased)
    }

    if (progress < 1) {
      countFrame = requestAnimationFrame(tick)
    }
    else {
      countFrame = 0
    }
  }

  countFrame = requestAnimationFrame(tick)
}

watch(
  numericStats,
  (stats) => {
    for (const stat of stats) {
      if (statDisplays[stat.label] === undefined) {
        statDisplays[stat.label] = stat.value
      }
    }
  },
  { immediate: true },
)

function clearTimers() {
  if (openTimeout !== undefined) {
    clearTimeout(openTimeout)
    openTimeout = undefined
  }
  if (closeTimeout !== undefined) {
    clearTimeout(closeTimeout)
    closeTimeout = undefined
  }
}

function openCard(via: OpenedVia) {
  clearTimers()
  openedVia.value = via

  if (via === 'hover') {
    openTimeout = setTimeout(() => {
      isOpen.value = true
    }, props.openDelay)
  }
  else {
    isOpen.value = true
  }
}

function closeCard(immediate = false) {
  clearTimers()

  if (immediate) {
    isOpen.value = false
    return
  }

  closeTimeout = setTimeout(() => {
    isOpen.value = false
  }, props.closeDelay)
}

function handleWrapperMouseEnter() {
  if (isHoverDevice.value) {
    openCard('hover')
  }
}

function handleWrapperMouseLeave() {
  if (isHoverDevice.value) {
    closeCard()
  }
}

function handleCardMouseEnter() {
  if (isHoverDevice.value) {
    clearTimers()
  }
}

function handleCardMouseLeave() {
  if (isHoverDevice.value) {
    closeCard()
  }
}

function handleTriggerClick() {
  if (isHoverDevice.value) {
    return
  }

  if (isOpen.value) {
    closeCard(true)
  }
  else {
    openCard('focus')
  }
}

function handleTriggerFocus() {
  // Escape closes the card and hands focus back to the trigger, and that focus
  // call lands here. Without the guard the card would reopen on the spot.
  if (skipFocusOpen) {
    return
  }

  openCard('focus')
}

function handleTriggerKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    closeCard(true)

    // Focus events dispatch synchronously, so the flag is consumed by this
    // call and cleared immediately after.
    skipFocusOpen = true
    triggerRef.value?.focus()
    skipFocusOpen = false
  }
}

function handleWrapperBlur(event: FocusEvent) {
  const next = event.relatedTarget as Node | null

  if (!wrapperRef.value?.contains(next)) {
    closeCard(true)
  }
}

function toggleFollow() {
  const next = !isFollowing.value

  if (!isFollowingControlled.value) {
    internalFollowing.value = next
  }

  emit('follow:change', next)
}

watch(
  [isOpen, () => props.placement],
  ([open]) => {
    if (!(open && props.placement === 'auto' && triggerRef.value)) {
      return
    }

    const rect = triggerRef.value.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    resolvedPlacement.value = spaceBelow < CARD_MIN_SPACE_PX && spaceAbove > spaceBelow ? 'top' : 'bottom'
  },
)

watch(isOpen, (open) => {
  if (open) {
    startCountUp()
  }
  else {
    stopCountUp()
  }
})

onBeforeUnmount(() => {
  clearTimers()
  stopCountUp()
})
</script>
