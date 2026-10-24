<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { useMediaQuery } from '@vueuse/core'

export type HoverExpandOrientation = 'horizontal' | 'vertical'

export interface HoverExpandItem {
  /** Accessible description of the image. Falls back to the title. */
  alt?: string
  /** Shown under the title while the panel is expanded. */
  description?: string
  /** Stable key. */
  id: string
  /** Background image URL. Panels without one render as a solid card. */
  image?: string
  /** Visible label and accessible name. */
  title: string
}

export interface HoverExpandProps {
  /** Controlled active panel. Leave it out to let the component keep its own. */
  activeIndex?: number
  /** Extra classes for the group wrapper. */
  class?: string
  /** Flex grow value of the collapsed panels. */
  collapsedFlex?: number
  /** Flex grow value of the active panel. */
  expandedFlex?: number
  /** Panels to render. */
  items: HoverExpandItem[]
  /** Horizontal lays the panels in a row, vertical stacks them. */
  orientation?: HoverExpandOrientation
  /** Keep the title visible on collapsed panels, rotated ninety degrees. */
  showLabelsWhenCollapsed?: boolean
}

const props = withDefaults(defineProps<HoverExpandProps>(), {
  activeIndex: undefined,
  class: undefined,
  collapsedFlex: 1,
  expandedFlex: 4,
  orientation: 'horizontal',
  showLabelsWhenCollapsed: true,
})

const emit = defineEmits<{
  'update:activeIndex': [index: number]
}>()

const LABEL_ROTATION = -90

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)
const isHoverDevice = useMediaQuery('(hover: hover) and (pointer: fine)')

const internalActive = ref(0)
const isControlled = computed(() => props.activeIndex !== undefined)
const activeIndex = computed(() => (isControlled.value ? props.activeIndex! : internalActive.value))
const isHorizontal = computed(() => props.orientation === 'horizontal')

const panelRefs = ref<(HTMLButtonElement | null)[]>([])

function setPanelRef(element: unknown, index: number) {
  panelRefs.value[index] = (element as HTMLButtonElement | null) ?? null
}

function setActive(index: number) {
  if (!isControlled.value) {
    internalActive.value = index
  }

  emit('update:activeIndex', index)
}

function onKeydown(event: KeyboardEvent, index: number) {
  const nextKey = isHorizontal.value ? 'ArrowRight' : 'ArrowDown'
  const prevKey = isHorizontal.value ? 'ArrowLeft' : 'ArrowUp'

  let next: number | undefined

  if (event.key === nextKey) {
    next = Math.min(index + 1, props.items.length - 1)
  }
  else if (event.key === prevKey) {
    next = Math.max(index - 1, 0)
  }

  if (next === undefined) {
    return
  }

  event.preventDefault()
  setActive(next)
  panelRefs.value[next]?.focus()
}

const panelTransition = computed(() =>
  isReduced.value ? { duration: 0 } : { bounce: 0.1, duration: 0.25, type: 'spring' as const },
)

function labelAnimate(index: number) {
  const visible = index === activeIndex.value || props.showLabelsWhenCollapsed
  if (isReduced.value) {
    return { opacity: visible ? 1 : 0 }
  }

  return {
    opacity: visible ? 1 : 0,
    rotate: isHorizontal.value && index !== activeIndex.value ? LABEL_ROTATION : 0,
  }
}
</script>

<template>
  <div
    aria-label="Expandable image panels"
    :class="[
      'flex w-full gap-2',
      isHorizontal ? 'h-[360px] flex-row' : 'h-[520px] flex-col',
      props.class,
    ]"
    role="group"
  >
    <button
      v-for="(item, index) in props.items"
      :key="item.id"
      :ref="element => setPanelRef(element, index)"
      :aria-label="item.title"
      :aria-pressed="index === activeIndex"
      class="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl border border-default text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default"
      :style="{
        flexBasis: 0,
        flexGrow: index === activeIndex ? props.expandedFlex : props.collapsedFlex,
        transition: isReduced ? 'none' : 'flex-grow 250ms cubic-bezier(0.23, 1, 0.32, 1)',
      }"
      type="button"
      @click="!isHoverDevice && setActive(index)"
      @focus="setActive(index)"
      @keydown="onKeydown($event, index)"
      @mouseenter="isHoverDevice && setActive(index)"
    >
      <img
        v-if="item.image"
        :alt="item.alt ?? item.title"
        class="absolute inset-0 h-full w-full object-cover"
        draggable="false"
        :src="item.image"
      >

      <div
        aria-hidden="true"
        class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"
      />

      <motion.div
        :animate="labelAnimate(index)"
        class="absolute inset-0 flex items-end p-4"
        :transition="panelTransition"
      >
        <div :class="[isHorizontal && index !== activeIndex && 'origin-left whitespace-nowrap']">
          <p class="text-sm font-semibold text-white">
            {{ item.title }}
          </p>
          <p
            v-if="index === activeIndex && item.description"
            class="mt-1 text-xs text-white/80"
          >
            {{ item.description }}
          </p>
        </div>
      </motion.div>
    </button>
  </div>
</template>
