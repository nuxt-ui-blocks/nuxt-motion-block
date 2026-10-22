<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div :class="ui.header({ class: uiProps.ui?.header })">
      <span :class="ui.title({ class: uiProps.ui?.title })">{{ title }}</span>

      <!--
        No tablist for a single pane: one link is not a choice, and a `tablist`
        with one tab announces a decision that does not exist.
      -->
      <div
        v-if="available.length > 1"
        :class="ui.tabs({ class: uiProps.ui?.tabs })"
        aria-label="Artifact view"
        role="tablist"
      >
        <button
          v-for="candidate in available"
          :id="tabId(candidate)"
          :key="candidate"
          type="button"
          role="tab"
          :aria-controls="panelId(candidate)"
          :aria-selected="pane === candidate"
          :class="ui.tab({ active: pane === candidate, class: uiProps.ui?.tab })"
          :tabindex="pane === candidate ? 0 : -1"
          @click="pane = candidate"
          @keydown="onTabKeydown($event, candidate)"
        >
          <motion.span
            v-if="pane === candidate"
            :class="ui.indicator({ class: uiProps.ui?.indicator })"
            :layout-id="indicatorLayoutId"
            :transition="indicatorTransition"
          />
          <span :class="ui.tabLabel({ class: uiProps.ui?.tabLabel })">{{ candidate }}</span>
        </button>
      </div>

      <UButton
        v-if="copyText"
        square
        color="neutral"
        size="xs"
        variant="ghost"
        :aria-label="copied ? 'Copied to clipboard' : 'Copy to clipboard'"
        :class="ui.copy({ copied, lonely: available.length <= 1, class: uiProps.ui?.copy })"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        @click="copy"
      />

      <!-- The label swap is decorative; this is what a screen reader hears. -->
      <span
        class="sr-only"
        role="status"
      >{{ copied ? 'Copied to clipboard' : '' }}</span>
    </div>

    <div :class="ui.body({ class: uiProps.ui?.body })">
      <AnimatePresence
        :initial="false"
        mode="wait"
      >
        <motion.div
          :id="panelId(pane)"
          :key="pane"
          :class="ui.pane({ class: uiProps.ui?.pane })"
          :role="available.length > 1 ? 'tabpanel' : undefined"
          :aria-labelledby="available.length > 1 ? tabId(pane) : undefined"
          :initial="paneFrom"
          :animate="paneTo"
          :exit="paneExit"
          :transition="paneTransition"
        >
          <div
            v-if="pane === 'preview'"
            :class="ui.preview({ class: uiProps.ui?.preview })"
          >
            <slot name="preview" />
          </div>
          <pre
            v-else
            :class="ui.code({ class: uiProps.ui?.code })"
          ><slot name="code" /></pre>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiArtifact from '../theme/ai-artifact'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export type AiArtifactPane = 'preview' | 'code'

export interface AiArtifactProps {
  /** Names the artifact so it can be referred to in conversation. */
  title: string
  /** Which pane to start on. Ignored once `pane` is bound. */
  defaultPane?: AiArtifactPane
  /** Controlled pane. Leave undefined to let the component own it. */
  pane?: AiArtifactPane
  /** Plain text handed to the clipboard. Omit to hide the copy action. */
  copyText?: string
  class?: string
  ui?: Record<string, any>
}

/**
 * A generated artifact: the rendered form on one side, the source on the other.
 *
 * The two panes swap along a shared axis instead of cross-fading. A cross-fade
 * reads as a different artifact appearing in the same frame; a horizontal slide
 * keeps the identity - this is the same thing, seen from the other side.
 */
const props = withDefaults(defineProps<AiArtifactProps>(), {
  copyText: undefined,
  defaultPane: 'preview',
  pane: undefined,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  copy: [text: string]
  'update:pane': [pane: AiArtifactPane]
}>()

const slots = defineSlots<{
  code?: () => unknown
  preview?: () => unknown
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiArtifact', props, theme: aiArtifact })

const reducedMotion = useReducedMotion()

const PANE_ORDER: AiArtifactPane[] = ['preview', 'code']
/** One pane's width of travel, in pixels. */
const TRAVEL_PX = 24
const COPIED_RESET_MS = 1600

const isControlled = computed(() => props.pane !== undefined)
const internalPane = ref<AiArtifactPane>(props.defaultPane)

const pane = computed<AiArtifactPane>({
  get: () => props.pane ?? internalPane.value,
  set: (next) => {
    if (!isControlled.value) internalPane.value = next
    emit('update:pane', next)
  },
})

/**
 * Slot presence is fixed by the parent's template, so this list does not need
 * to be reactive to a slot appearing later - only to which slots were passed.
 */
const available = computed<AiArtifactPane[]>(() => PANE_ORDER.filter(candidate => Boolean(slots[candidate])))

/** A pane that was chosen but is not mounted falls back to one that is. */
watch(
  available,
  (panes) => {
    const first = panes[0]
    if (first && !panes.includes(pane.value)) pane.value = first
  },
  { immediate: true },
)

/**
 * The direction is latched when the pane changes, before the DOM updates, so the
 * entering and exiting panes both read the same sign for the whole swap.
 */
const direction = ref(1)
watch(pane, (next, previous) => {
  direction.value = PANE_ORDER.indexOf(next) >= PANE_ORDER.indexOf(previous) ? 1 : -1
})

const uid = useId().replace(/[^\w-]/g, '')
const tabId = (candidate: AiArtifactPane): string => `${uid}-tab-${candidate}`
const panelId = (candidate: AiArtifactPane): string => `${uid}-panel-${candidate}`
const indicatorLayoutId = `${uid}-indicator`

const paneFrom = computed(() =>
  reducedMotion.value === true
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: direction.value * TRAVEL_PX },
)

const paneTo = { opacity: 1, x: 0 }

const paneExit = computed(() =>
  reducedMotion.value === true
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, x: direction.value * -TRAVEL_PX },
)

const paneTransition = computed(() => (reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT))
const indicatorTransition = paneTransition

/**
 * Arrow keys move along the tablist rather than between DOM neighbours, and
 * Home/End jump to the ends - the WAI-ARIA tabs pattern, which keyboard users
 * already have in their hands.
 */
const onTabKeydown = (event: KeyboardEvent, candidate: AiArtifactPane): void => {
  const panes = available.value
  const index = panes.indexOf(candidate)
  if (index < 0) return

  let next = index
  if (event.key === 'ArrowRight') next = (index + 1) % panes.length
  else if (event.key === 'ArrowLeft') next = (index - 1 + panes.length) % panes.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = panes.length - 1
  else return

  const target = panes[next]
  if (!target) return

  event.preventDefault()
  pane.value = target
  requestAnimationFrame(() => {
    document.getElementById(tabId(target))?.focus()
  })
}

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

const copy = async (): Promise<void> => {
  if (!props.copyText) return
  try {
    await navigator.clipboard?.writeText(props.copyText)
    copied.value = true
    emit('copy', props.copyText)
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = false
    }, COPIED_RESET_MS)
  } catch {
    // A blocked clipboard is not worth an error state: the text is already on
    // screen, and shouting about permissions is louder than the failure.
  }
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>
