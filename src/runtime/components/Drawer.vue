<template>
  <UDrawer
    v-bind="$attrs"
    :open="isOpen"
    :default-open="defaultOpen"
    :direction="direction"
    :title="title"
    :description="description"
    :inset="inset"
    :overlay="overlay"
    :handle="showDefaultHandle"
    :portal="portal"
    :nested="nested"
    :close="close"
    :close-icon="closeIcon"
    :dismissible="dismissible"
    :modal="modal"
    :fixed="fixed"
    :handle-only="handleOnly"
    :snap-points="snapPoints"
    :active-snap-point="activeSnapPoint"
    :close-threshold="closeThreshold"
    :should-scale-background="shouldScaleBackground"
    :set-background-color-on-scale="setBackgroundColorOnScale"
    :no-body-styles="noBodyStyles"
    :prevent-scroll-restoration="preventScrollRestoration"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :ui="drawerUi"
    @update:open="handleUpdateOpen"
    @close="$emit('close')"
    @drag="$emit('drag', $event)"
    @release="$emit('release', $event)"
    @animation-end="$emit('animationEnd', $event)"
    @update:active-snap-point="$emit('update:activeSnapPoint', $event)"
  >
    <template
      v-if="$slots.default"
      #default
    >
      <slot />
    </template>

    <template #content>
      <AnimatePresence>
        <motion.div
          v-if="isOpen"
          :initial="contentInitial"
          :animate="contentAnimate"
          :exit="contentExit"
          :transition="contentTransition"
          :class="ui.content({ class: uiProps.ui?.content })"
        >
          <motion.div
            v-if="showAnimatedHandle"
            :initial="handleInitial"
            :animate="handleAnimate"
            :transition="handleTransition"
            :class="ui.handle({ class: uiProps.ui?.handle })"
            aria-hidden="true"
          />

          <motion.div
            v-if="hasHeader"
            :initial="childInitial"
            :animate="childAnimate"
            :exit="childExit"
            :transition="staggerTransitions[0]"
            :class="ui.header({ class: uiProps.ui?.header })"
          >
            <slot name="header">
              <div
                v-if="title"
                :class="ui.headerContent({ class: uiProps.ui?.headerContent })"
              >
                <h2 :class="ui.title({ class: uiProps.ui?.title })">
                  {{ title }}
                </h2>
                <p
                  v-if="description"
                  :class="ui.description({ class: uiProps.ui?.description })"
                >
                  {{ description }}
                </p>
              </div>
            </slot>
          </motion.div>

          <motion.div
            :initial="childInitial"
            :animate="childAnimate"
            :exit="childExit"
            :transition="staggerTransitions[1]"
            :class="ui.body({ class: uiProps.ui?.body })"
          >
            <slot name="body" />
          </motion.div>

          <motion.div
            v-if="$slots.footer"
            :initial="childInitial"
            :animate="childAnimate"
            :exit="childExit"
            :transition="staggerTransitions[2]"
            :class="ui.footer({ class: uiProps.ui?.footer })"
          >
            <slot name="footer" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </template>

    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>

    <template
      v-if="$slots.title"
      #title
    >
      <slot name="title" />
    </template>

    <template
      v-if="$slots.description"
      #description
    >
      <slot name="description" />
    </template>

    <template
      v-if="$slots.actions"
      #actions
    >
      <slot name="actions" />
    </template>

    <template
      v-if="$slots.body"
      #body
    >
      <slot name="body" />
    </template>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>

    <template
      v-if="$slots.close"
      #close="{ ui: closeUi }"
    >
      <slot
        name="close"
        :ui="closeUi"
      />
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { motion, AnimatePresence, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import drawer from '../theme/drawer'

defineOptions({ inheritAttrs: false })

const BACKDROP_DURATION = 0.2
const STAGGER_BASE_DELAY = 0.12
const STAGGER_CHILD_DELAY = 0.05
const HANDLE_PULSE_DURATION = 2

interface Props {
  open?: boolean
  defaultOpen?: boolean
  direction?: 'bottom' | 'top' | 'left' | 'right'
  title?: string
  description?: string
  inset?: boolean
  overlay?: boolean
  handle?: boolean
  animatedHandle?: boolean
  portal?: string | boolean | HTMLElement
  nested?: boolean
  close?: boolean | object
  closeIcon?: string
  dismissible?: boolean
  modal?: boolean
  fixed?: boolean
  handleOnly?: boolean
  snapPoints?: (string | number)[]
  activeSnapPoint?: string | number | null
  closeThreshold?: number
  shouldScaleBackground?: boolean
  setBackgroundColorOnScale?: boolean
  noBodyStyles?: boolean
  preventScrollRestoration?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: undefined,
  direction: 'bottom',
  inset: false,
  overlay: true,
  handle: true,
  animatedHandle: true,
  portal: true,
  nested: false,
  close: false,
  dismissible: true,
  modal: true,
  handleOnly: false,
  setBackgroundColorOnScale: true,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'drawer', props, theme: drawer })

const emit = defineEmits<{
  'update:open': [value: boolean]
  'close': []
  'drag': [percentageDragged: number]
  'release': [open: boolean]
  'animationEnd': [open: boolean]
  'update:activeSnapPoint': [val: string | number]
}>()

const reduce = useReducedMotion()

const internalOpen = ref(toRef(() => props.defaultOpen).value ?? false)
const isControlled = computed(() => props.open !== undefined)
const isOpen = computed(() => (isControlled.value ? Boolean(props.open) : internalOpen.value))

function handleUpdateOpen(value: boolean) {
  if (!isControlled.value) {
    internalOpen.value = value
  }
  emit('update:open', value)
}

const hasHeader = computed(() => Boolean(props.title || props.description))

const showAnimatedHandle = computed(() => {
  return props.handle && props.animatedHandle && !props.handleOnly && props.direction === 'bottom'
})

const showDefaultHandle = computed(() => {
  return props.handle && !showAnimatedHandle.value
})

const contentInitial = computed(() => {
  return reduce.value ? { opacity: 1 } : { opacity: 0 }
})

const contentAnimate = computed(() => ({ opacity: 1 }))

const contentExit = computed(() => {
  return reduce.value
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, transition: { duration: 0.15 } }
})

const contentTransition = computed(() => {
  return reduce.value ? { duration: 0 } : { duration: BACKDROP_DURATION }
})

const childInitial = computed(() => {
  return reduce.value ? { opacity: 1 } : { opacity: 0, y: 6 }
})

const childAnimate = computed(() => {
  return reduce.value ? { opacity: 1 } : { opacity: 1, y: 0 }
})

const childExit = computed(() => {
  return reduce.value
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, transition: { duration: 0.1 } }
})

const staggerTransitions = computed(() => {
  return [0, 1, 2].map((index) => {
    if (reduce.value) {
      return { duration: 0 }
    }
    return {
      bounce: 0,
      delay: STAGGER_BASE_DELAY + index * STAGGER_CHILD_DELAY,
      duration: 0.25,
      type: 'spring' as const,
    }
  })
})

const handleInitial = computed(() => ({ opacity: 0.5 }))

const handleAnimate = computed(() => {
  return reduce.value ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }
})

const handleTransition = computed(() => {
  if (reduce.value) {
    return { duration: 0 }
  }
  return {
    duration: HANDLE_PULSE_DURATION,
    ease: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
    repeat: Number.POSITIVE_INFINITY,
  }
})

const drawerUi = computed(() => ({
  ...uiProps.ui,
  overlay: ui.value.overlay({ class: uiProps.ui?.overlay }),
}))
</script>
