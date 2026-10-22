<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <motion.div
      :class="ui.surface({ class: uiProps.ui?.surface })"
      :layout="reducedMotion !== true"
      :animate="{ borderRadius: open ? 16 : 999 }"
      :transition="surfaceTransition"
    >
      <div
        v-if="!open"
        :class="ui.dock({ class: uiProps.ui?.dock })"
      >
        <span
          aria-hidden="true"
          :class="ui.orb({ class: uiProps.ui?.orb })"
        />
        <button
          ref="triggerRef"
          type="button"
          :class="ui.trigger({ class: uiProps.ui?.trigger })"
          @click="openSurface"
        >
          {{ label }}
        </button>
      </div>

      <form
        v-else
        :class="ui.panel({ class: uiProps.ui?.panel })"
        @submit.prevent="submit"
      >
        <div :class="ui.header({ class: uiProps.ui?.header })">
          <p :class="ui.title({ class: uiProps.ui?.title })">
            <span
              aria-hidden="true"
              :class="ui.orb({ class: uiProps.ui?.orb })"
            />
            {{ heading }}
          </p>
          <span
            aria-hidden="true"
            :class="ui.hint({ class: uiProps.ui?.hint })"
          >
            <kbd :class="ui.kbd({ class: uiProps.ui?.kbd })">⌘</kbd>
            <kbd :class="ui.kbd({ class: uiProps.ui?.kbd })">↵</kbd>
          </span>
        </div>

        <textarea
          ref="inputRef"
          v-model="draft"
          :aria-label="placeholder"
          :class="ui.textarea({ class: uiProps.ui?.textarea })"
          :placeholder="placeholder"
          spellcheck="false"
          @keydown="onKeydown"
        />

        <div :class="ui.actions({ class: uiProps.ui?.actions })">
          <span :class="ui.count({ class: uiProps.ui?.count })">Esc to close</span>
          <UButton
            type="submit"
            size="xs"
            :disabled="!draft.trim()"
            :label="submitLabel"
          />
        </div>
      </form>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import morphSurface from '../theme/morph-surface'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface MorphSurfaceProps {
  /** The collapsed dock's label, and the trigger's accessible name. */
  label?: string
  /** Shown in the panel header. */
  heading?: string
  placeholder?: string
  submitLabel?: string
  /** Start open. Ignored once `open` is bound. */
  defaultOpen?: boolean
  /** Controlled open state. Leave undefined to let the component own it. */
  open?: boolean
  class?: string
  ui?: Record<string, any>
}

/**
 * A dock that becomes the thing it opens.
 *
 * The pill does not summon a modal; it grows into the surface, so the control
 * and its content stay one object. That is the whole point of the morph - the
 * place you clicked is the place you type.
 *
 * A fixed footprint is reserved behind the surface so opening it grows upward
 * instead of pushing everything below it down the page.
 */
const props = withDefaults(defineProps<MorphSurfaceProps>(), {
  label: 'Ask AI',
  heading: 'AI Input',
  placeholder: 'Ask me anything…',
  submitLabel: 'Send',
  defaultOpen: false,
  open: undefined,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  'submit': [value: string]
  'update:open': [open: boolean]
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'morphSurface', props, theme: morphSurface })

const reducedMotion = useReducedMotion()
const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const inputRef = ref<HTMLTextAreaElement | null>(null)

const isControlled = computed(() => props.open !== undefined)
const internalOpen = ref(props.defaultOpen)

const open = computed<boolean>({
  get: () => props.open ?? internalOpen.value,
  set: (next) => {
    if (!isControlled.value) internalOpen.value = next
    emit('update:open', next)
  },
})

const draft = ref('')

const surfaceTransition = computed(() => (reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT))

const openSurface = (): void => {
  open.value = true
}

const close = (restoreFocus = true): void => {
  if (!open.value) return
  open.value = false
  if (restoreFocus) {
    // Return focus to where the surface came from, or the keyboard user is left
    // on an element that no longer exists.
    nextTick(() => triggerRef.value?.focus())
  }
}

const submit = (): void => {
  const value = draft.value.trim()
  if (!value) return
  emit('submit', value)
  draft.value = ''
  close()
}

/**
 * Escape leaves; the platform shortcut sends. Both are expected in a composer,
 * and neither should require reaching for the pointer.
 */
const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    close()
    return
  }
  if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    submit()
  }
}

// `flush: 'post'` so the textarea exists by the time the callback runs; the
// dock's button is removed by the same render, which would otherwise drop focus
// to the document body.
watch(open, (isOpen) => {
  if (!isOpen) return
  inputRef.value?.focus()
}, { flush: 'post' })

const onPointerDown = (event: PointerEvent): void => {
  const target = event.target
  if (!open.value || !(target instanceof Node)) return
  if (rootRef.value?.contains(target)) return
  close(false)
}

// Capture phase: a click outside should collapse the surface even when the
// element it lands on stops propagation.
onMounted(() => document.addEventListener('pointerdown', onPointerDown, true))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown, true))
</script>
