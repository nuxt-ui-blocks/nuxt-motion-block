<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'

export interface PhototabTab {
  /** Iconify name shown in the tab bar. */
  icon?: string
  /** Image URL for the panel. */
  image: string
  /** Tab label, also used as the image alt text. */
  name: string
}

export interface PhototabProps {
  /** Extra classes for the root. */
  class?: string
  /** Name of the tab selected on mount. Defaults to the first tab. */
  defaultTab?: string
  /** Height of the component in pixels. */
  height?: number
  /** Extra classes for the image. */
  imageClassName?: string
  /** Extra classes for the tab list. */
  tabListClassName?: string
  /** Extra classes for each tab trigger. */
  tabTriggerClassName?: string
  /** Tabs to display. */
  tabs: PhototabTab[]
}

const props = withDefaults(defineProps<PhototabProps>(), {
  class: undefined,
  defaultTab: undefined,
  height: 400,
  imageClassName: undefined,
  tabListClassName: undefined,
  tabTriggerClassName: undefined,
})

const WHITESPACE = /\s+/g
/** Ids cannot contain whitespace, so multi-word names are slugged. */
function toTabValue(name: string) {
  return name.replace(WHITESPACE, '-')
}

const uid = useId().replace(/[^\w-]/g, '')
const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const tabValues = computed(() => props.tabs.map(tab => ({ ...tab, value: toTabValue(tab.name) })))
const selected = ref(toTabValue(props.defaultTab ?? props.tabs[0]?.name ?? ''))

const activeIndex = computed(() => {
  const index = tabValues.value.findIndex(tab => tab.value === selected.value)
  return index === -1 ? 0 : index
})

const listEl = ref<HTMLDivElement | null>(null)
const triggerEls = ref<Array<HTMLButtonElement | null>>([])

function setTriggerEl(el: unknown, index: number) {
  triggerEls.value[index] = el as HTMLButtonElement | null
}

interface HoverStyle {
  height: number
  left: number
  top: number
  width: number
}

const hoverStyle = ref<HoverStyle | null>(null)

function measureHover(index: number) {
  const list = listEl.value
  const trigger = triggerEls.value[index]

  if (!list || !trigger) {
    return
  }

  const listRect = list.getBoundingClientRect()
  const triggerRect = trigger.getBoundingClientRect()

  hoverStyle.value = {
    height: triggerRect.height,
    left: triggerRect.left - listRect.left,
    top: triggerRect.top - listRect.top,
    width: triggerRect.width,
  }
}

function onEnter(index: number) {
  if (isReduced.value) {
    hoverStyle.value = null
    return
  }

  measureHover(index)
}

function clearHover() {
  hoverStyle.value = null
}

function selectTab(index: number, focus = false) {
  const tab = tabValues.value[index]

  if (!tab) {
    return
  }

  selected.value = tab.value

  if (focus) {
    nextTick(() => triggerEls.value[index]?.focus())
  }
}

function onKeydown(event: KeyboardEvent) {
  const last = tabValues.value.length - 1
  let next: number | null = null

  if (event.key === 'ArrowRight') {
    next = activeIndex.value === last ? 0 : activeIndex.value + 1
  }
  else if (event.key === 'ArrowLeft') {
    next = activeIndex.value === 0 ? last : activeIndex.value - 1
  }
  else if (event.key === 'Home') {
    next = 0
  }
  else if (event.key === 'End') {
    next = last
  }

  if (next === null) {
    return
  }

  event.preventDefault()
  selectTab(next, true)
}

const pillTransition = computed(() =>
  isReduced.value
    ? { duration: 0 }
    : { damping: 40, duration: 0.25, stiffness: 400, type: 'spring' as const },
)
</script>

<template>
  <div
    :class="['group relative aspect-square w-auto overflow-hidden', props.class]"
    :style="{ height: `${props.height}px` }"
  >
    <div
      v-for="(tab, index) in tabValues"
      v-show="selected === tab.value"
      :id="`phototab-${uid}-panel-${index}`"
      :key="`panel-${tab.value}`"
      :aria-labelledby="`phototab-${uid}-tab-${index}`"
      role="tabpanel"
    >
      <img
        :alt="tab.name"
        :class="['h-full w-full rounded-2xl bg-muted object-cover', props.imageClassName]"
        draggable="false"
        :height="props.height"
        loading="lazy"
        :src="tab.image"
        width="400"
      >
    </div>

    <div
      ref="listEl"
      aria-label="Photo tabs"
      :class="[
        'absolute right-0 bottom-2 left-0 mx-auto flex w-40 -translate-y-10 flex-row items-center justify-between rounded-full bg-primary/40 px-3 py-2 text-sm font-medium text-highlighted ring-1 ring-default/70 backdrop-blur-sm transition-transform hover:text-highlighted motion-reduce:transition-none md:translate-y-20 md:group-hover:translate-y-0 md:group-focus-within:translate-y-0',
        props.tabListClassName,
      ]"
      role="tablist"
      style="pointer-events: auto"
      @focusout="clearHover"
      @mouseleave="clearHover"
    >
      <AnimatePresence>
        <motion.span
          v-if="hoverStyle && !isReduced"
          :animate="{ ...hoverStyle, opacity: 1 }"
          class="pointer-events-none absolute z-0 rounded-full bg-primary"
          :exit="{ opacity: 0 }"
          :initial="{ opacity: 0 }"
          :transition="pillTransition"
        />
      </AnimatePresence>

      <button
        v-for="(tab, index) in tabValues"
        :id="`phototab-${uid}-tab-${index}`"
        :key="tab.value"
        :ref="el => setTriggerEl(el, index)"
        :aria-controls="`phototab-${uid}-panel-${index}`"
        :aria-label="tab.name"
        :aria-selected="selected === tab.value"
        :class="[
          'relative z-10 cursor-pointer rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
          selected === tab.value ? 'bg-default' : '',
          props.tabTriggerClassName,
        ]"
        :tabindex="activeIndex === index ? 0 : -1"
        role="tab"
        type="button"
        @click="selectTab(index)"
        @focus="onEnter(index)"
        @keydown="onKeydown"
        @mouseenter="onEnter(index)"
      >
        <span class="relative z-10 flex items-center justify-center rounded-full focus:outline-none">
          <UIcon
            v-if="tab.icon"
            :name="tab.icon"
            class="size-4"
          />
          <span class="sr-only">{{ tab.name }}</span>
        </span>
      </button>
    </div>
  </div>
</template>
