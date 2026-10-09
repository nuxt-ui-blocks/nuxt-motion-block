<template>
  <div
    ref="wrapperRef"
    class="relative inline-block"
    @focusout="handleWrapperBlur"
    @mouseenter="handleWrapperMouseEnter"
    @mouseleave="handleWrapperMouseLeave"
  >
    <button
      ref="triggerRef"
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      :class="['rounded font-medium text-primary text-sm underline-offset-2 hover:underline', props.class]"
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
        :class="[
          'absolute left-1/2 z-30 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-default bg-default shadow-xl',
          resolvedPlacement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
        ]"
        @mouseenter="handleCardMouseEnter"
        @mouseleave="handleCardMouseLeave"
      >
        <div
          v-if="props.loading"
          aria-hidden="true"
          class="animate-pulse p-4"
        >
          <div class="h-16 rounded-lg bg-muted" />
          <div class="mt-3 flex items-center gap-3">
            <div class="size-12 rounded-full bg-muted" />
            <div class="flex-1 space-y-2">
              <div class="h-3 w-2/3 rounded bg-muted" />
              <div class="h-3 w-1/3 rounded bg-muted" />
            </div>
          </div>
          <div class="mt-4 h-3 w-full rounded bg-muted" />
          <div class="mt-2 h-3 w-4/5 rounded bg-muted" />
        </div>

        <div v-else>
          <img
            v-if="props.profile.banner"
            :src="props.profile.banner"
            alt=""
            class="h-16 w-full object-cover"
            height="64"
            width="320"
          >
          <div
            v-else
            class="h-16 w-full bg-gradient-to-r from-primary/40 to-primary/10"
          />

          <div class="p-4">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <img
                  :src="props.profile.avatar"
                  :alt="props.profile.name"
                  class="size-12 shrink-0 rounded-full border-2 border-default object-cover"
                  height="48"
                  width="48"
                >
                <div class="min-w-0">
                  <div class="flex items-center gap-1">
                    <a
                      v-if="props.profile.url"
                      :href="props.profile.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="truncate font-semibold text-highlighted text-sm hover:underline"
                    >
                      {{ props.profile.name }}
                    </a>
                    <p
                      v-else
                      class="truncate font-semibold text-highlighted text-sm"
                    >
                      {{ props.profile.name }}
                    </p>
                    <UIcon
                      v-if="props.profile.verified"
                      name="i-heroicons-check-badge-solid"
                      class="size-4 shrink-0 text-primary"
                    />
                    <span
                      v-if="props.profile.verified"
                      class="sr-only"
                    >
                      Verified account
                    </span>
                  </div>
                  <p class="truncate text-muted text-xs">
                    @{{ props.profile.handle }}
                  </p>
                </div>
              </div>

              <motion.div
                layout
                class="shrink-0"
              >
                <UButton
                  :variant="isFollowing ? 'soft' : 'solid'"
                  :color="isFollowing ? 'neutral' : 'primary'"
                  :aria-pressed="isFollowing"
                  class="rounded-full"
                  @click="toggleFollow"
                >
                  <AnimatePresence
                    :initial="false"
                    mode="wait"
                  >
                    <motion.span
                      :key="isFollowing ? 'following' : 'follow'"
                      class="inline-block"
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
              class="mt-3 text-highlighted/80 text-sm leading-relaxed"
            >
              {{ props.profile.bio }}
            </p>

            <ul
              v-if="props.profile.stats?.length"
              class="mt-4 flex items-center gap-4"
            >
              <li
                v-for="stat in props.profile.stats"
                :key="stat.label"
                class="flex flex-col"
              >
                <span class="font-semibold text-highlighted text-sm">
                  <span v-if="typeof stat.value === 'number'">{{ formatStat(stat.label) }}</span>
                  <span v-else>{{ stat.value }}</span>
                </span>
                <span class="text-muted text-xs">
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
  closeDelay: DEFAULT_CLOSE_DELAY,
  following: undefined,
  loading: false,
  openDelay: DEFAULT_OPEN_DELAY,
  placement: 'auto',
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
