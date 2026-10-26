<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import pagination from '../theme/pagination'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface PaginationProps {
  /** Current page, 1-indexed. Leave undefined to let the component own it. */
  page?: number
  /** Total number of pages. */
  totalPages: number
  /** Number of sibling pages shown on each side of the current page. */
  siblings?: number
  /** Accessible name for the `<nav>` landmark. */
  ariaLabel?: string
  /** Extra classes for the root element. */
  class?: string
  /** Per-slot classes merged over the theme defaults. */
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<PaginationProps>(), {
  siblings: 1,
  ariaLabel: 'Pagination',
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'pagination',
  props,
  theme: pagination,
})

const ELLIPSIS = 'ellipsis'
type PageItem = number | typeof ELLIPSIS

const ROW_HIDDEN = Object.freeze({ opacity: 0, y: 4 })
const ROW_SHOWN = Object.freeze({ opacity: 1, y: 0 })
const NO_MOTION = Object.freeze({ duration: 0 })
const STAGGER_DELAY = 0.03

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)
const layoutId = `pagination-active-${useId()}`

const total = computed(() => Math.max(1, Math.floor(props.totalPages)))

/**
 * `page` stays optional so the component works on its own, while a bound prop
 * keeps the parent in charge. The internal copy is only written when nothing
 * is bound, and `update:page` fires either way - the usual controlled pattern.
 */
const isControlled = computed(() => props.page !== undefined)
const internalPage = ref(1)
const currentPage = computed(() => {
  const raw = isControlled.value ? Number(props.page) : internalPage.value
  return Math.min(Math.max(Math.floor(raw), 1), total.value)
})

const pageItems = computed<PageItem[]>(() =>
  buildPageRange(currentPage.value, total.value, Math.max(0, Math.floor(props.siblings))),
)

const canGoBack = computed(() => currentPage.value > 1)
const canGoForward = computed(() => currentPage.value < total.value)

function buildPageRange(page: number, totalPages: number, siblings: number): PageItem[] {
  // siblings + current + two boundary pages + two potential ellipses
  const totalSlots = siblings * 2 + 5

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const leftSibling = Math.max(page - siblings, 2)
  const rightSibling = Math.min(page + siblings, totalPages - 1)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  const items: PageItem[] = [1]

  if (showLeftEllipsis) {
    items.push(ELLIPSIS)
  }
  else {
    for (let index = 2; index < leftSibling; index++) {
      items.push(index)
    }
  }

  for (let index = leftSibling; index <= rightSibling; index++) {
    items.push(index)
  }

  if (showRightEllipsis) {
    items.push(ELLIPSIS)
  }
  else {
    for (let index = rightSibling + 1; index < totalPages; index++) {
      items.push(index)
    }
  }

  items.push(totalPages)

  return items
}

function goTo(next: number) {
  const target = Math.min(Math.max(Math.floor(next), 1), total.value)

  if (target === currentPage.value) {
    return
  }

  if (!isControlled.value) {
    internalPage.value = target
  }

  emit('update:page', target)
}

/**
 * The active pill is a shared-layout element with a stable `layout-id`, so it
 * travels between page buttons instead of being unmounted and recreated. A
 * zero-length transition still lands it on the new button under reduced motion.
 */
const indicatorTransition = computed(() => isReduced.value ? NO_MOTION : SPRING_DEFAULT)

function transitionFor(index: number) {
  if (isReduced.value) {
    return NO_MOTION
  }

  return { ...SPRING_DEFAULT, delay: index * STAGGER_DELAY }
}
</script>

<template>
  <nav
    :aria-label="props.ariaLabel"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <ul :class="ui.list({ class: uiProps.ui?.list })">
      <li :class="ui.item({ class: uiProps.ui?.item })">
        <button
          type="button"
          aria-label="Go to previous page"
          :class="ui.navButton({ class: uiProps.ui?.navButton })"
          :disabled="!canGoBack"
          @click="goTo(currentPage - 1)"
        >
          <UIcon
            name="i-lucide-chevron-left"
            :class="ui.icon({ class: uiProps.ui?.icon })"
          />
          <span :class="ui.navLabel({ class: uiProps.ui?.navLabel })">Previous</span>
        </button>
      </li>

      <Motion
        v-for="(item, index) in pageItems"
        :key="item === ELLIPSIS ? `ellipsis-${index}` : item"
        as="li"
        :class="ui.item({ class: uiProps.ui?.item })"
        :initial="ROW_HIDDEN"
        :animate="ROW_SHOWN"
        :transition="transitionFor(index)"
      >
        <span
          v-if="item === ELLIPSIS"
          aria-hidden="true"
          :class="ui.ellipsis({ class: uiProps.ui?.ellipsis })"
        >
          ...
        </span>

        <button
          v-else
          type="button"
          :aria-current="item === currentPage ? 'page' : undefined"
          :aria-label="`Go to page ${item}`"
          :class="ui.pageButton({ active: item === currentPage, class: uiProps.ui?.pageButton })"
          @click="goTo(item)"
        >
          <Motion
            v-if="item === currentPage"
            :class="ui.indicator({ class: uiProps.ui?.indicator })"
            :layout-id="layoutId"
            :transition="indicatorTransition"
          />
          <span :class="ui.pageLabel({ class: uiProps.ui?.pageLabel })">{{ item }}</span>
        </button>
      </Motion>

      <li :class="ui.item({ class: uiProps.ui?.item })">
        <button
          type="button"
          aria-label="Go to next page"
          :class="ui.navButton({ class: uiProps.ui?.navButton })"
          :disabled="!canGoForward"
          @click="goTo(currentPage + 1)"
        >
          <span :class="ui.navLabel({ class: uiProps.ui?.navLabel })">Next</span>
          <UIcon
            name="i-lucide-chevron-right"
            :class="ui.icon({ class: uiProps.ui?.icon })"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>
