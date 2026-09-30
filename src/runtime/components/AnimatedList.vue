<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'

defineOptions({ inheritAttrs: false })

/**
 * Declared here and exported from here: a second `<script>` block would land in
 * the same module scope and redeclare it, which is a parse error rather than a
 * shadow.
 */
export type AnimatedListItem = { id?: string | number, label?: string, [key: string]: any } | string | number

interface Props {
  items?: AnimatedListItem[]
  animation?: 'slide' | 'fade' | 'scale'
  maxVisible?: number
  direction?: 'up' | 'down'
  stagger?: number
  recede?: boolean
  feed?: boolean
  feedInterval?: number
  pauseOnHover?: boolean
  onItemClick?: (item: AnimatedListItem, index: number) => void
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  animation: 'slide',
  maxVisible: 5,
  direction: 'down',
  stagger: 0.05,
  recede: true,
  feed: false,
  feedInterval: 2000,
  pauseOnHover: true,
  ui: () => ({}),
})

const emit = defineEmits<{
  'update:items': [items: AnimatedListItem[]]
}>()

const SPRING = { bounce: 0.1, duration: 0.25, type: 'spring' as const }
const ENTER_OFFSET = 14
const MAX_STAGGER_DELAY = 0.3
const RECEDE_OPACITY_STEP = 0.18
const RECEDE_SCALE_STEP = 0.05
const MIN_RECEDE_OPACITY = 0.35
const MIN_RECEDE_SCALE = 0.85

const reduce = useReducedMotion()

function labelOf(item: AnimatedListItem) {
  if (item === null || item === undefined) return ''
  if (typeof item === 'object') return String((item as any).label ?? (item as any).title ?? (item as any).name ?? '')
  return String(item)
}

function keyOf(item: AnimatedListItem, sourceIndex: number) {
  if (item !== null && typeof item === 'object' && (item as any).id !== null && (item as any).id !== undefined) {
    return String((item as any).id)
  }
  return typeof item === 'object' ? `m-list-${sourceIndex}` : `m-list-${String(item)}`
}

const feedCount = ref(0)
const isPaused = ref(false)
let feedTimer: ReturnType<typeof setTimeout> | undefined

function scheduleFeed() {
  if (feedTimer) {
    clearTimeout(feedTimer)
    feedTimer = undefined
  }
  if (!props.feed || isPaused.value || feedCount.value >= props.items.length) return
  feedTimer = setTimeout(() => {
    feedCount.value = Math.min(feedCount.value + 1, props.items.length)
    scheduleFeed()
  }, props.feedInterval)
}

watch(
  [() => props.feed, () => props.feedInterval, () => props.items.length, feedCount, isPaused],
  scheduleFeed,
)
onMounted(scheduleFeed)
onBeforeUnmount(() => {
  if (feedTimer) clearTimeout(feedTimer)
  feedTimer = undefined
})

function enterOffset() {
  return props.direction === 'down' ? -ENTER_OFFSET : ENTER_OFFSET
}

function rowInitial() {
  if (reduce.value) return { opacity: 1, scale: 1, y: 0 }
  if (props.animation === 'fade') return { opacity: 0, scale: 1, y: 0 }
  if (props.animation === 'scale') return { opacity: 0, scale: 0.8, y: 0 }
  return { opacity: 0, scale: 0.95, y: enterOffset() }
}

function rowAnimate(position: number) {
  if (reduce.value) return { opacity: 1, scale: 1, y: 0 }
  if (!props.recede) return { opacity: 1, scale: 1, y: 0 }
  return {
    opacity: Math.max(MIN_RECEDE_OPACITY, 1 - position * RECEDE_OPACITY_STEP),
    scale: Math.max(MIN_RECEDE_SCALE, 1 - position * RECEDE_SCALE_STEP),
    y: 0,
  }
}

function rowExit() {
  if (reduce.value) return { opacity: 0, transition: { duration: 0 } }
  return { opacity: 0, scale: 0.9, y: 0 }
}

function rowTransition(position: number) {
  if (reduce.value) return { duration: 0 }
  return { ...SPRING, delay: Math.min(position * props.stagger, MAX_STAGGER_DELAY) }
}

const rows = computed(() => {
  const all = props.items
  const active = props.feed ? all.slice(0, Math.min(feedCount.value, all.length)) : all
  const start = Math.max(0, active.length - props.maxVisible)
  const windowed = active.slice(start).map((item, offset) => ({ item, sourceIndex: start + offset }))
  const ordered = props.direction === 'down' ? [...windowed].reverse() : windowed
  return ordered.map((row, position) => ({
    ...row,
    position,
    key: keyOf(row.item, row.sourceIndex),
    initial: rowInitial(),
    animate: rowAnimate(position),
    exit: rowExit(),
    transition: rowTransition(position),
  }))
})

function add(item: AnimatedListItem) {
  emit('update:items', [...props.items, item])
}

function remove(index: number) {
  emit('update:items', props.items.filter((_item, i) => i !== index))
}

function clear() {
  emit('update:items', [])
}

defineExpose({ add, remove, clear })
</script>

<template>
  <ul
    v-bind="$attrs"
    aria-live="polite"
    :class="['flex flex-col gap-2 m-animated-list']"
    @mouseenter="pauseOnHover && (isPaused = true)"
    @mouseleave="pauseOnHover && (isPaused = false)"
  >
    <AnimatePresence mode="popLayout">
      <motion.li
        v-for="row in rows"
        :key="row.key"
        layout
        class="list-none"
        :initial="row.initial"
        :animate="row.animate"
        :exit="row.exit"
        :transition="row.transition"
      >
        <slot
          :item="row.item"
          :index="row.sourceIndex"
          :position="row.position"
          :remove="remove"
        >
          <UCard
            v-if="onItemClick"
            :ui="{ body: 'px-3 py-2', ...ui }"
            class="cursor-pointer"
            @click="onItemClick(row.item, row.sourceIndex)"
          >
            <span>{{ labelOf(row.item) }}</span>
          </UCard>

          <UCard
            v-else
            :ui="{ body: 'px-3 py-2', ...ui }"
          >
            <div class="flex items-center justify-between gap-3">
              <span>{{ labelOf(row.item) }}</span>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="xs"
                :aria-label="`Remove ${labelOf(row.item)}`"
                @click.stop="remove(row.sourceIndex)"
              />
            </div>
          </UCard>
        </slot>
      </motion.li>
    </AnimatePresence>
  </ul>
</template>
