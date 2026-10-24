<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export interface CountBadgeProps {
  /** Extra classes for the badge itself. */
  class?: string
  /** Number to display in the `count` variant. */
  count?: number
  /** Value at which the badge switches to `max+`. */
  max?: number
  /** Render an extra ping ring behind the badge. */
  ping?: boolean
  /** Corner the badge is anchored to. */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** Show the count badge when the value is zero. */
  showZero?: boolean
  /** Presence state used by the `status` variant. */
  status?: 'online' | 'offline' | 'busy' | 'away'
  /** What the badge shows. */
  variant?: 'dot' | 'count' | 'status'
}

const props = withDefaults(defineProps<CountBadgeProps>(), {
  class: undefined,
  count: 0,
  max: 99,
  ping: false,
  position: 'top-right',
  showZero: false,
  status: 'online',
  variant: 'dot',
})

const STATUS_CLASSES = {
  away: 'bg-warning',
  busy: 'bg-error',
  offline: 'bg-inverted/35',
  online: 'bg-success',
} as const

const POSITION_CLASSES = {
  'bottom-left': '-bottom-1 -left-1',
  'bottom-right': '-bottom-1 -right-1',
  'top-left': '-top-1 -left-1',
  'top-right': '-top-1 -right-1',
} as const

/** Vertical travel of the rolling digit, in pixels. */
const DIGIT_SHIFT = 12

const direction = ref<1 | -1>(1)
let previousCount = props.count

watch(
  () => props.count,
  (next) => {
    direction.value = next > previousCount ? 1 : -1
    previousCount = next
  },
)

const displayValue = computed(() => (props.count > props.max ? `${props.max}+` : String(props.count)))

const isVisible = computed(
  () =>
    props.variant === 'dot'
    || props.variant === 'status'
    || (props.variant === 'count' && (props.count > 0 || props.showZero)),
)

const backgroundClass = computed(() =>
  props.variant === 'status' ? STATUS_CLASSES[props.status] : 'bg-primary',
)

const sizeClass = computed(() => {
  if (props.variant === 'dot') {
    return 'h-2.5 w-2.5'
  }

  if (props.variant === 'status') {
    return 'h-3 w-3'
  }

  const length = displayValue.value.length

  if (length === 1) {
    return 'h-5 w-5 text-xs'
  }

  if (length === 2) {
    return 'h-5 min-w-5 px-1 text-xs'
  }

  return 'h-5 min-w-6 px-1 text-xs'
})

const badgeClasses = computed(() => [
  'count-badge-in absolute flex items-center justify-center rounded-full text-inverted',
  backgroundClass.value,
  sizeClass.value,
  POSITION_CLASSES[props.position],
  props.variant === 'status' && 'ring-2 ring-default',
  props.class,
])
</script>

<template>
  <span class="relative inline-flex">
    <slot>
      <span class="h-4 w-4" />
    </slot>

    <span
      v-if="isVisible"
      :aria-hidden="props.variant === 'dot' ? 'true' : undefined"
      :class="badgeClasses"
    >
      <template v-if="props.variant === 'count'">
        <span
          class="relative inline-flex overflow-hidden font-medium leading-none"
          :style="{ '--count-shift': `${direction * DIGIT_SHIFT}px` }"
        >
          <Transition
            mode="out-in"
            name="count-roll"
          >
            <span
              :key="props.count"
              class="inline-block"
            >{{ displayValue }}</span>
          </Transition>
        </span>
      </template>

      <span
        v-else-if="props.variant === 'status'"
        class="sr-only"
      >{{ props.status }}</span>

      <span
        v-if="props.ping"
        aria-hidden="true"
        class="absolute inset-0 animate-ping rounded-full opacity-75 motion-reduce:animate-none"
        :class="backgroundClass"
      />
    </span>
  </span>
</template>

<style scoped>
.count-badge-in {
  animation: count-badge-in 150ms ease-out;
}

@keyframes count-badge-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.count-roll-enter-active,
.count-roll-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.count-roll-enter-from {
  opacity: 0;
  transform: translateY(var(--count-shift, 12px));
}

.count-roll-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--count-shift, 12px) * -1));
}

@media (prefers-reduced-motion: reduce) {
  .count-badge-in {
    animation: none;
  }

  .count-roll-enter-active,
  .count-roll-leave-active {
    transition: none;
  }
}
</style>
