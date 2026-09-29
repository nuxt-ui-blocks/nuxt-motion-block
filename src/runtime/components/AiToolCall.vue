<template>
  <div
    class="w-full overflow-hidden rounded-xl border border-default bg-default"
    :class="props.class"
  >
    <button
      :aria-expanded="hasDetail() ? isOpen : undefined"
      class="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left"
      :disabled="!hasDetail()"
      type="button"
      @click="isOpen = !isOpen"
    >
      <!--
        The status badge is **one ring that changes behaviour**, not four icons that
        swap places.

        `pending` breathes, `running` spins as a gap in the same ring, `success` keeps
        the ring and draws a check inside it, `error` keeps the ring and draws a
        cross. Because the ring never unmounts, the eye tracks a single object through
        the whole lifecycle instead of watching icons pop in and out.
      -->
      <span class="relative flex size-5 shrink-0 items-center justify-center text-muted">
        <svg
          aria-hidden="true"
          class="size-5 overflow-visible"
          :viewBox="`0 0 ${BADGE_VIEWBOX} ${BADGE_VIEWBOX}`"
        >
          <motion.g
            :animate="shouldReduceMotion || !isRunning ? undefined : { rotate: 360 }"
            :style="{ transformBox: 'view-box', transformOrigin: 'center' }"
            :transition="{
              duration: SPIN_SECONDS,
              ease: 'linear',
              repeat: Number.POSITIVE_INFINITY,
            }"
          >
            <motion.circle
              :animate="{
                stroke: ringColor,
                // Running opens a gap in the ring; everything else closes it.
                strokeDasharray: isRunning ? '0.68 0.32' : '1 0',
                strokeOpacity:
                  isPending && !shouldReduceMotion ? [0.35, 1, 0.35] : 1,
              }"
              :cx="BADGE_CENTER"
              :cy="BADGE_CENTER"
              fill="none"
              :pathLength="1"
              :r="RING_RADIUS"
              stroke-linecap="round"
              stroke-width="2"
              :transition="{
                stroke: shouldReduceMotion
                  ? instant
                  : { duration: 0.25, ease: EASE_OUT },
                strokeDasharray: shouldReduceMotion
                  ? instant
                  : { duration: 0.25, ease: EASE_OUT },
                strokeOpacity: shouldReduceMotion
                  ? instant
                  : { duration: PENDING_PULSE_SECONDS, repeat: Number.POSITIVE_INFINITY },
              }"
            />
          </motion.g>

          <AnimatePresence :initial="false">
            <motion.path
              v-if="props.status === 'success'"
              :animate="{ opacity: 1, pathLength: 1 }"
              :d="CHECK_PATH"
              :exit="{ opacity: 0, transition: { duration: 0.1 } }"
              fill="none"
              :initial="shouldReduceMotion
                ? { opacity: 1, pathLength: 1 }
                : { opacity: 1, pathLength: 0 }"
              :stroke="ringColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.2"
              :transition="shouldReduceMotion
                ? instant
                : { duration: 0.22, ease: EASE_OUT }"
            />
            <motion.path
              v-for="(path, index) in markPaths"
              :key="path"
              :animate="{ opacity: 1, pathLength: 1 }"
              :d="path"
              :exit="{ opacity: 0, transition: { duration: 0.1 } }"
              fill="none"
              :initial="shouldReduceMotion
                ? { opacity: 1, pathLength: 1 }
                : { opacity: 1, pathLength: 0 }"
              :stroke="ringColor"
              stroke-linecap="round"
              stroke-width="2.2"
              :transition="shouldReduceMotion
                ? instant
                : { delay: index * 0.06, duration: 0.16, ease: EASE_OUT }"
            />
          </AnimatePresence>
        </svg>
      </span>

      <span class="min-w-0 flex-1">
        <span class="block truncate font-mono text-xs font-medium text-highlighted">
          {{ props.name }}
        </span>
      </span>

      <span
        v-if="props.summary"
        class="shrink-0 text-xs text-muted"
      >{{ props.summary }}</span>
      <span class="sr-only">{{ statusLabel }}</span>

      <motion.span
        v-if="hasDetail()"
        :animate="{ rotate: isOpen ? 90 : 0 }"
        class="flex size-4 shrink-0 items-center justify-center text-muted"
        :transition="shouldReduceMotion ? instant : SPRING_DEFAULT"
      >
        <UIcon
          aria-hidden="true"
          name="i-lucide-chevron-right"
          :size="14"
        />
      </motion.span>
    </button>

    <AnimatePresence :initial="false">
      <motion.div
        v-if="isOpen && hasDetail()"
        :animate="panelShown"
        class="overflow-hidden"
        :exit="shouldReduceMotion ? panelGoneInstant : panelGone"
        :initial="shouldReduceMotion ? panelShown : panelHidden"
        :transition="shouldReduceMotion
          ? instant
          : { height: SPRING_DEFAULT, opacity: { duration: 0.18, ease: EASE_OUT } }"
      >
        <div class="space-y-2 border-t border-default px-3 py-2.5 text-xs">
          <div v-if="slots.args">
            <p class="mb-1 text-[10px] uppercase tracking-wide text-muted">
              Arguments
            </p>
            <div class="overflow-x-auto font-mono text-highlighted">
              <slot name="args" />
            </div>
          </div>
          <div v-if="slots.result">
            <p class="mb-1 text-[10px] uppercase tracking-wide text-muted">
              Result
            </p>
            <div class="overflow-x-auto text-highlighted">
              <slot name="result" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { computed, ref, useSlots } from 'vue'

/**
 * A single tool invocation, collapsed by default.
 *
 * Ported from `ai-tool-call`. Arguments and results are the kind of thing people
 * want available but not in their face, so the row stays one line until asked.
 *
 * The React `args` / `result` render props become the `args` and `result` slots;
 * everything else keeps its name. Status is this component's own four-value enum
 * rather than the twelve-field `AIState`: a tool call has a lifecycle, not a mood,
 * and borrowing the shared accent vocabulary here would imply a connection the
 * data does not have.
 *
 * The badge is inlined rather than split into a second file so the kit does not
 * publish an `MToolCallBadge` nobody asked for.
 */
const SPRING_DEFAULT = {
  bounce: 0.1,
  duration: 0.25,
  type: 'spring' as const,
}
const EASE_OUT = [0.23, 1, 0.32, 1] as const
const BADGE_VIEWBOX = 24
const BADGE_CENTER = BADGE_VIEWBOX / 2
const RING_RADIUS = 8
const CHECK_PATH = 'M 8.5 12.2 L 11 14.8 L 15.8 9.6'
const crossPaths = ['M 9 9 L 15 15', 'M 15 9 L 9 15'] as const
const SPIN_SECONDS = 0.9
const PENDING_PULSE_SECONDS = 1.6

const instant = { duration: 0 }

const panelShown = { height: 'auto', opacity: 1 }
const panelHidden = { height: 0, opacity: 0 }
const panelGone = { height: 0, opacity: 0 }
const panelGoneInstant = { opacity: 0, transition: instant }

type AIToolCallStatus = 'pending' | 'running' | 'success' | 'error'

const STATUS_LABEL: Record<AIToolCallStatus, string> = {
  error: 'Failed',
  pending: 'Queued',
  running: 'Running',
  success: 'Done',
}

interface Props {
  class?: string
  defaultOpen?: boolean
  /** Tool name, e.g. `search_web`. */
  name: string
  status?: AIToolCallStatus
  /** Short right-aligned note, e.g. "3 files" or "1.2s". */
  summary?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
  status: 'pending',
})

const slots = useSlots()
const shouldReduceMotion = useReducedMotion()
const isOpen = ref(props.defaultOpen)

// A function rather than a computed: slot presence is not reactive state, and a
// cached `false` would leave the disclosure unreachable if a caller supplied the
// slot later.
function hasDetail() {
  return Boolean(slots.args || slots.result)
}

const isRunning = computed(() => props.status === 'running')
const isPending = computed(() => props.status === 'pending')

const ringColor = computed(() => {
  if (props.status === 'success') {
    return 'oklch(72% 0.17 150)'
  }
  if (props.status === 'error') {
    return 'oklch(63% 0.21 25)'
  }
  return 'currentColor'
})

const statusLabel = computed(() => STATUS_LABEL[props.status])

// The two strokes of the cross as a single value, so the template can `v-for`
// without a `v-if` on the same element, which eslint rightly rejects.
const markPaths = computed(() => (props.status === 'error' ? crossPaths : []))
</script>
