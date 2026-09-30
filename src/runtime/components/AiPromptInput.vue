<template>
  <UChatPrompt
    v-model="draft"
    :aria-label="props.ariaLabel"
    :autofocus="props.autofocus"
    :class="props.class"
    :disabled="props.disabled"
    :error="props.error"
    :maxrows="MAX_ROWS"
    :placeholder="props.placeholder"
    :submit-on-enter="props.submitOnEnter"
    :ui="ui"
    @submit="onSubmit"
    @close="emit('close')"
  >
    <!--
      Attachments go in `header` because they belong to the draft, not the
      message. `root` runs at `gap-0` so the list sits flush against the field
      and its height animation is the only thing that moves — the same
      relationship the reference composer had.
    -->
    <template #header>
      <AnimatePresence
        :initial="false"
      >
        <motion.ul
          v-if="attachments.length > 0"
          key="attachments"
          class="flex list-none flex-wrap gap-1.5 overflow-hidden py-1.5"
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
              v-if="props.removable"
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
    </template>

    <template #footer>
      <div class="flex min-w-0 items-center gap-1">
        <button
          v-if="props.attachable"
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

      <!-- `relative` so the exiting button in the popLayout swap leaves flow
           without escaping to the page's initial containing block. -->
      <div class="relative flex items-center gap-2">
        <AnimatePresence
          :initial="false"
          mode="popLayout"
        >
          <motion.span
            :key="chatStatus"
            class="flex"
            :animate="swapShown"
            :exit="shouldReduceMotion ? swapGoneInstant : swapGone"
            :initial="shouldReduceMotion ? swapInstant : swapHidden"
            :transition="swapTransition"
            :while-hover="submitHover"
            :while-tap="submitTap"
          >
            <UChatPromptSubmit
              :status="chatStatus"
              :disabled="submitDisabled"
              color="neutral"
              variant="solid"
              square
              streaming-color="neutral"
              streaming-variant="solid"
              submitted-color="neutral"
              submitted-variant="solid"
              error-variant="solid"
              @stop="emit('stop')"
              @reload="emit('reload')"
            />
          </motion.span>
        </AnimatePresence>

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
      </div>
    </template>
  </UChatPrompt>
</template>

<script setup lang="ts">
import type { ChatPromptProps } from '@nuxt/ui/components/ChatPrompt.vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'
import type { AIState } from '../composables/useAiState'
import { getAIChatStatus, getAIStateAccent, getAIStateMotion } from '../composables/useAiState'

/**
 * The prompt composer.
 *
 * Ported from `ai-prompt-input`, then re-based onto `ChatPrompt` and
 * `ChatPromptSubmit` so the box, the field and the button belong to the design
 * system instead of to this module. The state contract and the sizing constants
 * are the reference's; see `src/runtime/composables/useAiState.ts` for the
 * twelve-field `AIStateMotion`.
 *
 * What the underlying components took over, and why that is a gain rather than
 * a loss: autoresize, the Enter/Shift+Enter and Escape keys, the IME guard on
 * Enter (the reference had none, so accepting a Japanese candidate both
 * submitted and swallowed the character), focus rings, and the send/stop/reload
 * glyph set. `ChatPrompt` also drops `Enter` submissions while the field is
 * disabled, and `ChatPromptSubmit` only honours `disabled` in the `ready`
 * state — which is exactly the "cannot send an empty draft, but can always
 * stop" rule the reference hand-rolled.
 *
 * Vue adaptations, all of them mechanical:
 * - `value` / `onValueChange` become `v-model` (`modelValue` + `update:modelValue`).
 * - `children` becomes the default slot.
 * - `onSubmit` / `onStop` become emits. `onAttach` / `onRemoveAttachment` become the
 *   `attachable` / `removable` props plus emits, because a Vue prop cannot be a
 *   callback without giving up the template call site.
 * - `useReducedMotion()` already returns a ref in motion-v.
 *
 * The module keeps the motion it owns: the attachment chips, the character
 * counter, and the press physics plus crossfade on the submit button. The box's
 * own chrome — border, background, focus outline — is the theme's, and the only
 * status it carries is the accent ring on `error` and `done`.
 */
export interface AIPromptAttachment {
  id: string
  /** Bytes. Rendered as a human-readable size when present. */
  size?: number
  name: string
}

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
const ATTACHMENT_STAGGER = 0.035
const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** `danger` has no Nuxt UI color of its own, so it borrows the error one. */
const ACCENT_RINGS: Record<'danger' | 'success', string> = {
  danger: 'ring-error/25',
  success: 'ring-success/25',
}

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

// The button swaps wholesale on a status change, so this replaces the
// reference's glyph crossfade. `popLayout` takes the outgoing button out of
// flow immediately, which is what keeps the row from jumping mid-swap.
const swapShown = { opacity: 1, scale: 1 }
const swapHidden = { opacity: 0, scale: 0.6 }
const swapGone = { opacity: 0, scale: 0.6 }
const swapGoneInstant = { opacity: 0, transition: instant }
const swapInstant = { opacity: 1 }

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
   *
   * `@nuxt/ui` forwards it to the textarea rather than the box, which is where
   * it belongs.
   */
  ariaLabel?: string
  /** Files already attached to the draft. */
  attachments?: AIPromptAttachment[]
  /**
   * Focus the field on mount.
   *
   * Off by default, unlike `ChatPrompt`: a composer that grabs focus the moment
   * it renders is hostile inside a page that also has something to say.
   */
  autofocus?: boolean
  /** Shows the attach control, and emits `attach` when it is pressed. */
  attachable?: boolean
  class?: string
  disabled?: boolean
  /** Disables the field and lets the underlying component render the error. */
  error?: Error
  /** Shows a counter once the draft passes 80% of the limit. */
  maxLength?: number
  placeholder?: string
  /** Shows a remove control per attachment, and emits `removeAttachment`. */
  removable?: boolean
  /** Shared AI state. A turn in flight turns submit into stop. */
  state?: AIState
  /**
   * `false` makes `Enter` insert a newline and `Ctrl`/`Cmd` + `Enter` submit —
   * the inverted default, for composers that hold multi-line prompts.
   */
  submitOnEnter?: boolean
  /** Themed slot overrides, merged over this module's own spacing. */
  ui?: ChatPromptProps['ui']
  /** Controlled draft. Leave undefined to let the component own it. */
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  attachments: () => [],
  autofocus: false,
  disabled: false,
  placeholder: 'Ask anything…',
  state: 'idle',
  submitOnEnter: true,
  ui: () => ({}),
})

const emit = defineEmits<{
  'attach': []
  'close': []
  'reload': []
  'removeAttachment': [id: string]
  'stop': []
  'submit': [value: string]
  'update:modelValue': [value: string]
}>()

const shouldReduceMotion = useReducedMotion()
const stateMotion = computed(() => getAIStateMotion(props.state))

const rootTransition = computed(() => (shouldReduceMotion.value ? instant : SPRING_DEFAULT))

/** The submit swap, paced by the state so a `thinking` composer is not sluggish. */
const swapTransition = computed(() =>
  shouldReduceMotion.value ? instant : { duration: 0.18 / stateMotion.value.speed, ease: EASE_OUT },
)

const isControlled = computed(() => props.modelValue !== undefined)
const internalValue = ref('')
const draft = computed({
  get: () => (isControlled.value ? props.modelValue! : internalValue.value),
  set: (next: string) => {
    if (!isControlled.value) {
      internalValue.value = next
    }
    emit('update:modelValue', next)
  },
})

const chatStatus = computed(() => getAIChatStatus(props.state))
const submitDisabled = computed(() => props.disabled || draft.value.trim().length === 0)

const submitHover = computed(() =>
  submitDisabled.value || shouldReduceMotion.value ? undefined : { scale: 1.05 },
)
const submitTap = computed(() =>
  submitDisabled.value || shouldReduceMotion.value ? undefined : { scale: 0.95 },
)

const counterVisible = computed(
  () =>
    props.maxLength !== undefined
    && draft.value.length >= props.maxLength * COUNTER_VISIBLE_RATIO,
)
const overLimit = computed(
  () => props.maxLength !== undefined && draft.value.length > props.maxLength,
)

/**
 * The accent ring is the only place status shows on the box: a composer that
 * changes shape per state would fight the text the user is writing. It rides the
 * theme's own ring, so it costs no extra element and no inline style — which
 * matters because `ChatPrompt` routes unclaimed attributes to the textarea.
 */
const accentRing = computed(() => {
  const accent = getAIStateAccent(props.state)
  return accent ? ACCENT_RINGS[accent] : undefined
})

const ui = computed(() => ({
  ...props.ui,
  footer: [props.ui?.footer, 'pt-2'],
  root: [props.ui?.root, 'gap-0', accentRing.value].filter(Boolean),
})) as unknown as ComputedRef<ChatPromptProps['ui']>

function onSubmit() {
  if (props.disabled) {
    return
  }
  emit('submit', draft.value.trim())
  // Only an uncontrolled draft is cleared. A controlled one belongs to whoever
  // is bound to it, and wiping it here would fight them.
  if (!isControlled.value) {
    internalValue.value = ''
  }
}
</script>
