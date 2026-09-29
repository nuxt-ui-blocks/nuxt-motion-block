<template>
  <motion.div
    :class="rootClass"
    :layout="shouldReduceMotion ? false : 'position'"
    :style="{ boxShadow: accentRing }"
    :transition="rootTransition"
  >
    <AnimatePresence
      :initial="false"
    >
      <motion.ul
        v-if="attachments.length > 0"
        key="attachments"
        class="flex list-none flex-wrap gap-2 overflow-hidden px-3 pt-3"
        :animate="listShown"
        :exit="shouldReduceMotion ? listGoneInstant : listGone"
        :initial="shouldReduceMotion ? listShown : listHidden"
        :transition="rootTransition"
      >
        <motion.li
          v-for="(attachment, index) in attachments"
          :key="attachment.id"
          class="flex items-center gap-1.5 rounded-lg border border-default bg-muted/50 py-1 pr-1 pl-2 text-xs"
          :animate="chipShown"
          :exit="shouldReduceMotion ? chipGoneInstant : chipGone"
          :initial="shouldReduceMotion ? chipShown : chipHidden"
          :layout="!shouldReduceMotion"
          :transition="shouldReduceMotion
            ? instant
            : { ...SPRING_DEFAULT, delay: index * ATTACHMENT_STAGGER }"
        >
          <span class="max-w-40 truncate">{{ attachment.name }}</span>
          <span
            v-if="attachment.size !== undefined"
            class="text-muted"
          >{{ formatSize(attachment.size) }}</span>
          <button
            v-if="removable"
            :aria-label="`Remove ${attachment.name}`"
            class="cursor-pointer rounded-md p-0.5 text-muted transition-colors hover:bg-muted hover:text-highlighted"
            type="button"
            @click="emit('removeAttachment', attachment.id)"
          >
            <UIcon
              aria-hidden="true"
              name="i-lucide-x"
              class="size-3"
            />
          </button>
        </motion.li>
      </motion.ul>
    </AnimatePresence>

    <textarea
      :ref="setTextareaEl"
      :aria-label="ariaLabel"
      class="max-h-64 w-full resize-none bg-transparent px-4 pt-3 pb-2 text-sm outline-none placeholder:text-muted"
      :disabled="props.disabled"
      :placeholder="placeholder"
      :rows="MIN_ROWS"
      :value="draft"
      @blur="isFocused = false"
      @focus="isFocused = true"
      @input="onInput"
      @keydown="onKeyDown"
    />

    <div class="flex items-center justify-between gap-2 px-2 pb-2">
      <div class="flex min-w-0 items-center gap-1">
        <button
          v-if="attachable"
          aria-label="Attach a file"
          class="cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-muted hover:text-highlighted"
          :disabled="props.disabled"
          type="button"
          @click="emit('attach')"
        >
          <UIcon
            aria-hidden="true"
            name="i-lucide-paperclip"
            class="size-4"
          />
        </button>
        <slot />
      </div>

      <div class="flex items-center gap-2">
        <AnimatePresence
          :initial="false"
        >
          <motion.span
            v-if="counterVisible"
            key="counter"
            class="text-xs tabular-nums"
            :class="overLimit ? 'text-error' : 'text-muted'"
            :animate="counterShown"
            :exit="shouldReduceMotion ? counterGoneInstant : counterGone"
            :initial="shouldReduceMotion ? counterShown : counterHidden"
            :transition="shouldReduceMotion ? instant : SPRING_SNAPPY"
          >
            {{ draft.length }}/{{ props.maxLength }}
          </motion.span>
        </AnimatePresence>

        <motion.button
          :aria-label="isStreaming ? 'Stop generating' : 'Send message'"
          class="flex size-9 cursor-pointer items-center justify-center rounded-xl"
          :class="submitClass"
          :disabled="submitDisabled"
          type="button"
          :transition="rootTransition"
          :while-hover="submitHover"
          :while-tap="submitTap"
          @click="submit"
        >
          <!-- Real lucide glyphs, swapped rather than morphed.
               An earlier version interpolated one hand-authored `d` into another, which
               bought a nice fold at the cost of not being a lucide icon at all — and a
               filled wedge reads as "play", not "send". A thin stroked arrow is the
               convention, and lucide's own geometry is what the rest of the library
               uses. The swap is scale-and-fade so it still reads as one control. -->
          <AnimatePresence
            :initial="false"
            mode="popLayout"
          >
            <motion.span
              :key="isStreaming ? 'stop' : 'send'"
              class="flex items-center justify-center"
              :animate="glyphShown"
              :exit="shouldReduceMotion ? glyphGoneInstant : glyphGone"
              :initial="shouldReduceMotion ? glyphInstant : glyphHidden"
              :transition="shouldReduceMotion
                ? instant
                : { duration: 0.18 / stateMotion.speed, ease: EASE_OUT }"
            >
              <svg
                v-if="isStreaming"
                aria-hidden="true"
                :width="STOP_ICON_SIZE"
                :height="STOP_ICON_SIZE"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                />
              </svg>
              <UIcon
                v-else
                aria-hidden="true"
                name="i-lucide-arrow-up"
                :size="SUBMIT_ICON_SIZE"
              />
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import type { AIState } from '../composables/useAiState'
import { getAIStateAccentColor, getAIStateMotion } from '../composables/useAiState'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { computed, nextTick, onMounted, ref, shallowRef, watch } from 'vue'

/**
 * The prompt composer.
 *
 * Ported from `ai-prompt-input`. The state contract, the sizing constants and the
 * whole "one accent ring, nothing else" stance are the reference's; see
 * `src/runtime/composables/useAiState.ts` for the twelve-field `AIStateMotion`.
 *
 * Vue adaptations, all of them mechanical:
 * - `value` / `onValueChange` become `v-model` (`modelValue` + `update:modelValue`).
 * - `children` becomes the default slot.
 * - `onSubmit` / `onStop` become emits. `onAttach` / `onRemoveAttachment` become the
 *   `attachable` / `removable` props plus emits, because a Vue prop cannot be a
 *   callback without giving up the template call site.
 * - `useReducedMotion()` already returns a ref in motion-v.
 *
 * One deliberate improvement over the reference: the keydown handler also checks
 * `isComposing`. The reference has no IME guard, so pressing Enter to accept a
 * candidate in a Japanese or Chinese IME both submits and swallows the character.
 */
export interface AIPromptAttachment {
  id: string
  /** Bytes. Rendered as a human-readable size when present. */
  size?: number
  name: string
}

const SUBMIT_ICON_SIZE = 17
const STOP_ICON_SIZE = 13

const MIN_ROWS = 1
const MAX_ROWS = 8
const COUNTER_VISIBLE_RATIO = 0.8
const SPRING_DEFAULT = {
  bounce: 0.1,
  duration: 0.25,
  type: 'spring' as const,
}
const SPRING_SNAPPY = {
  bounce: 0,
  duration: 0.2,
  type: 'spring' as const,
}
const EASE_OUT = [0.23, 1, 0.32, 1] as const
const ATTACHMENT_STAGGER = 0.035

// Variants are hoisted so a re-render on every keystroke cannot allocate them.
// Reduced motion collapses the travel to a plain fade-out with no duration.
const instant = { duration: 0 }

const listShown = { height: 'auto', opacity: 1 }
const listHidden = { height: 0, opacity: 0 }
const listGone = { height: 0, opacity: 0 }
const listGoneInstant = { opacity: 0, transition: instant }

const chipShown = { opacity: 1, scale: 1, y: 0 }
const chipHidden = { opacity: 0, scale: 0.9, y: 4 }
const chipGone = { opacity: 0, scale: 0.9 }
const chipGoneInstant = { opacity: 0, transition: instant }

const counterShown = { opacity: 1, y: 0 }
const counterHidden = { opacity: 0, y: 4 }
const counterGone = { opacity: 0, y: 4 }
const counterGoneInstant = { opacity: 0, transition: instant }

const glyphShown = { opacity: 1, scale: 1 }
const glyphHidden = { opacity: 0, scale: 0.6 }
const glyphGone = { opacity: 0, scale: 0.6 }
const glyphGoneInstant = { opacity: 0, transition: instant }
const glyphInstant = { opacity: 1 }

const formatSize = (bytes: number): string => {
  const kilobyte = 1024
  if (bytes < kilobyte) {
    return `${bytes} B`
  }
  const megabyte = kilobyte * kilobyte
  if (bytes < megabyte) {
    return `${Math.round(bytes / kilobyte)} KB`
  }
  return `${(bytes / megabyte).toFixed(1)} MB`
}

interface Props {
  /**
   * Accessible name for the field. Without it the placeholder is the only thing
   * naming the textarea, which is fine on its own but not when the composer is
   * embedded in a larger surface that needs to say what the prompt is *for*.
   */
  ariaLabel?: string
  /** Files already attached to the draft. */
  attachments?: AIPromptAttachment[]
  /** Shows the attach control, and emits `attach` when it is pressed. */
  attachable?: boolean
  class?: string
  disabled?: boolean
  /** Shows a counter once the draft passes 80% of the limit. */
  maxLength?: number
  placeholder?: string
  /** Shows a remove control per attachment, and emits `removeAttachment`. */
  removable?: boolean
  /** Shared AI state. `streaming` turns submit into stop. */
  state?: AIState
  /** Controlled draft. Leave undefined to let the component own it. */
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  attachments: () => [],
  disabled: false,
  placeholder: 'Ask anything…',
  state: 'idle',
})

const emit = defineEmits<{
  'attach': []
  'removeAttachment': [id: string]
  'stop': []
  'submit': [value: string]
  'update:modelValue': [value: string]
}>()

const shouldReduceMotion = useReducedMotion()
const stateMotion = computed(() => getAIStateMotion(props.state))

// The accent ring is the only place status shows here: a composer that changes
// shape per state would fight the text the user is writing.
const accentRing = computed(() =>
  props.state === 'error' || props.state === 'done'
    ? `0 0 0 1px ${getAIStateAccentColor(props.state, 'transparent')}`
    : undefined,
)

const rootClass = computed(() => [
  'relative w-full rounded-2xl border bg-default',
  isFocused.value ? 'border-accented/40' : 'border-default',
  props.disabled && 'opacity-60',
  props.class,
])

const rootTransition = computed(() => (shouldReduceMotion.value ? instant : SPRING_DEFAULT))

const isFocused = ref(false)
const internalValue = ref('')
// A ref, not a `let`: a plain variable would be narrowed to `null` by
// control-flow analysis, which cannot see a template ref assignment.
const textareaEl = shallowRef<HTMLTextAreaElement | null>(null)

const isControlled = computed(() => props.modelValue !== undefined)
const draft = computed(() => (isControlled.value ? props.modelValue! : internalValue.value))
const isStreaming = computed(() => props.state === 'streaming')
const canSubmit = computed(() => draft.value.trim().length > 0 && !props.disabled)
const submitDisabled = computed(() => props.disabled || !(canSubmit.value || isStreaming.value))

const counterVisible = computed(
  () =>
    props.maxLength !== undefined
    && draft.value.length >= props.maxLength * COUNTER_VISIBLE_RATIO,
)
const overLimit = computed(
  () => props.maxLength !== undefined && draft.value.length > props.maxLength,
)

const submitClass = computed(() =>
  submitDisabled.value ? 'bg-muted text-muted' : 'bg-inverted text-default',
)
const submitHover = computed(() =>
  submitDisabled.value || shouldReduceMotion.value ? undefined : { scale: 1.05 },
)
const submitTap = computed(() =>
  submitDisabled.value || shouldReduceMotion.value ? undefined : { scale: 0.95 },
)

// A named function ref rather than an inline arrow: `<script setup>` unwraps
// refs in the template, so writing `textareaEl.value = el` there would resolve
// to `HTMLTextAreaElement.value` (a string) instead of the ref.
function setTextareaEl(el: unknown) {
  textareaEl.value = (el as HTMLTextAreaElement | null) ?? null
}

function resize() {
  const textarea = textareaEl.value
  if (!textarea) {
    return
  }
  // Collapse first, otherwise scrollHeight only ever grows.
  textarea.style.height = 'auto'
  const lineHeight = Number.parseFloat(getComputedStyle(textarea).lineHeight || '20')
  const maxHeight = lineHeight * MAX_ROWS
  textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
}

function onInput(event: Event) {
  const next = (event.target as HTMLTextAreaElement).value
  if (!isControlled.value) {
    internalValue.value = next
  }
  emit('update:modelValue', next)
}

function submit() {
  if (isStreaming.value) {
    emit('stop')
    return
  }
  if (!canSubmit.value) {
    return
  }
  emit('submit', draft.value.trim())
  // Only an uncontrolled draft is cleared. A controlled one belongs to whoever
  // is bound to it, and wiping it here would fight them.
  if (!isControlled.value) {
    internalValue.value = ''
  }
}

function onKeyDown(event: KeyboardEvent) {
  // Enter sends, Shift+Enter breaks the line — the convention every chat UI
  // has trained users on. `isComposing` is the addition over the reference: while
  // an IME candidate window is open, Enter belongs to the IME.
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault()
    submit()
  }
}

onMounted(() => {
  // Collapsing on an empty draft matters after submit: the box has to return
  // to one row instead of holding the height of the message just sent.
  if (draft.value.length === 0 && textareaEl.value) {
    textareaEl.value.style.height = ''
  }
  resize()
})

watch(
  () => draft.value,
  async () => {
    if (draft.value.length === 0 && textareaEl.value) {
      textareaEl.value.style.height = ''
    }
    await nextTick()
    resize()
  },
)
</script>
