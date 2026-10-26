<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface FaviconSearchResult {
  /** Secondary line under the title. */
  description?: string
  /** Explicit icon URL. Falls back to the site's favicon, then to a globe. */
  favicon?: string
  /** Stable identity for the row. */
  id: string
  /** Primary line, also the part that is matched and highlighted. */
  title: string
  /** Destination URL. Its hostname resolves the default favicon. */
  url: string
}

export interface FaviconSearchProps {
  /** Extra classes for the root element. */
  class?: string
  /** Query used while the component controls its own value. */
  defaultValue?: string
  /** Start with the panel open. Only read on first render. */
  defaultOpen?: boolean
  /** Message shown when a search returns nothing. */
  emptyMessage?: string
  /** Accessible name for the result list. */
  groupLabel?: string
  /** Character pressed with `Ctrl` or `Cmd` to focus the field. */
  hotkey?: string
  /** Accessible name for the search field. */
  label?: string
  /** Render skeleton rows instead of results. */
  loading?: boolean
  /** Trim the list to this many results before rendering. */
  maxResults?: number
  /** Current query. Leave it out to let the component keep its own. */
  modelValue?: string
  /** Controlled panel state. Leave it out to let the component keep its own. */
  open?: boolean
  /** Search field placeholder. */
  placeholder?: string
  /** Results to list. The component does not fetch or filter them. */
  results: FaviconSearchResult[]
  /** Show the keyboard shortcut hint and bind the global hotkey. */
  showShortcut?: boolean
}

const props = withDefaults(defineProps<FaviconSearchProps>(), {
  class: undefined,
  defaultValue: '',
  defaultOpen: false,
  emptyMessage: 'No results found',
  groupLabel: 'Search results',
  hotkey: 'k',
  label: 'Search',
  loading: false,
  maxResults: undefined,
  modelValue: undefined,
  open: undefined,
  placeholder: 'Search…',
  showShortcut: false,
})

const emit = defineEmits<{
  'select': [result: FaviconSearchResult]
  'update:modelValue': [value: string]
  'update:open': [open: boolean]
}>()

const SKELETON_ROW_IDS = ['skeleton-0', 'skeleton-1', 'skeleton-2', 'skeleton-3']
const STAGGER_DELAY_S = 0.03

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const uid = useId().replace(/:/g, '')
const listboxId = `favicon-search-listbox-${uid}`
const optionId = (index: number) => `favicon-search-option-${uid}-${index}`

const rootRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const activeIndex = ref(-1)
const failedFavicons = ref<Set<string>>(new Set())

const isControlledValue = computed(() => props.modelValue !== undefined)
const internalValue = ref(props.defaultValue)
const value = computed(() => (isControlledValue.value ? (props.modelValue ?? '') : internalValue.value))

const isControlledOpen = computed(() => props.open !== undefined)
const internalOpen = ref(props.defaultOpen)
const isOpen = computed(() => (isControlledOpen.value ? Boolean(props.open) : internalOpen.value))

function setValue(next: string) {
  if (!isControlledValue.value) {
    internalValue.value = next
  }

  emit('update:modelValue', next)
}

function setOpen(next: boolean) {
  if (!isControlledOpen.value) {
    internalOpen.value = next
  }

  emit('update:open', next)
}

const displayedResults = computed(() =>
  typeof props.maxResults === 'number'
    ? props.results.slice(0, Math.max(0, props.maxResults))
    : props.results,
)

const activeOptionId = computed(() => {
  if (activeIndex.value < 0) {
    return undefined
  }

  return displayedResults.value[activeIndex.value] ? optionId(activeIndex.value) : undefined
})

const showPanel = computed(() =>
  isOpen.value && (props.loading || displayedResults.value.length > 0 || value.value.length > 0),
)

/**
 * A result can fail to load and still be selected, so the failure is tracked by
 * id rather than by URL: two rows can legitimately point at the same host.
 */
function markFaviconFailed(id: string) {
  const next = new Set(failedFavicons.value)
  next.add(id)
  failedFavicons.value = next
}

function resolveFavicon(result: FaviconSearchResult) {
  if (result.favicon) {
    return result.favicon
  }

  try {
    const host = new URL(result.url).hostname
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`
  }
  catch {
    return undefined
  }
}

const faviconSources = computed<Record<string, string | undefined>>(() =>
  Object.fromEntries(displayedResults.value.map(result => [result.id, resolveFavicon(result)])),
)

interface HighlightSegment {
  match: boolean
  text: string
}

/**
 * Returning segments instead of an HTML string keeps the title as text nodes,
 * so a result title that contains markup is rendered rather than parsed.
 */
function highlightSegments(text: string, query: string): HighlightSegment[] {
  const trimmed = query.trim()

  if (!trimmed) {
    return [{ match: false, text }]
  }

  const index = text.toLowerCase().indexOf(trimmed.toLowerCase())

  if (index === -1) {
    return [{ match: false, text }]
  }

  return [
    { match: false, text: text.slice(0, index) },
    { match: true, text: text.slice(index, index + trimmed.length) },
    { match: false, text: text.slice(index + trimmed.length) },
  ].filter(segment => segment.text.length > 0)
}

const panelInitial = { opacity: 0, y: -4 }
const panelAnimate = { opacity: 1, y: 0 }
const panelExit = computed(() => ({
  opacity: 0,
  transition: isReduced.value ? { duration: 0 } : { duration: 0.15 },
  y: isReduced.value ? 0 : -4,
}))
const panelTransition = computed(() => (isReduced.value ? { duration: 0 } : SPRING_DEFAULT))

const rowInitial = { opacity: 0, y: 6 }
const rowAnimate = { opacity: 1, y: 0 }
const rowExit = computed(() => ({
  opacity: 0,
  transition: isReduced.value ? { duration: 0 } : { duration: 0.15 },
}))

const rowTransitions = computed(() =>
  displayedResults.value.map((_, index) =>
    isReduced.value
      ? { duration: 0 }
      : { ...SPRING_DEFAULT, delay: index * STAGGER_DELAY_S },
  ),
)

function handleInput(event: Event) {
  setValue((event.target as HTMLInputElement).value)
  setOpen(true)
}

function handleSelect(result: FaviconSearchResult) {
  emit('select', result)
  setOpen(false)
  activeIndex.value = -1
}

function moveActive(delta: number) {
  const count = displayedResults.value.length

  if (count === 0) {
    return
  }

  activeIndex.value = (activeIndex.value + delta + count) % count
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    setOpen(false)
    activeIndex.value = -1
    return
  }

  if (!isOpen.value && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    setOpen(true)
    return
  }

  if (displayedResults.value.length === 0) {
    return
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveActive(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveActive(-1)
      break
    case 'Home':
      event.preventDefault()
      activeIndex.value = 0
      break
    case 'End':
      event.preventDefault()
      activeIndex.value = displayedResults.value.length - 1
      break
    case 'Enter': {
      event.preventDefault()
      const result = displayedResults.value[activeIndex.value]

      if (result) {
        handleSelect(result)
      }
      break
    }
  }
}

watch([value, () => props.loading], () => {
  activeIndex.value = -1
})

watch(isOpen, (open) => {
  if (!open) {
    activeIndex.value = -1
  }
})

onClickOutside(rootRef, () => {
  if (isOpen.value) {
    setOpen(false)
  }
})

/**
 * The shortcut is global on purpose: it is the reason the hint is on screen.
 * It focuses the field instead of selecting text, so the next keystroke is a
 * normal edit.
 */
useEventListener('keydown', (event: KeyboardEvent) => {
  if (!props.showShortcut) {
    return
  }

  const isMeta = event.metaKey || event.ctrlKey

  if (isMeta && event.key.toLowerCase() === props.hotkey.toLowerCase()) {
    event.preventDefault()
    setOpen(true)
    inputRef.value?.focus()
  }
})

const shortcutLabel = computed(() => `⌘${props.hotkey.toUpperCase()}`)
</script>

<template>
  <div
    ref="rootRef"
    :class="props.class"
    class="relative w-full"
  >
    <div class="relative">
      <UIcon
        aria-hidden="true"
        class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
        name="i-lucide-search"
      />

      <input
        ref="inputRef"
        :aria-activedescendant="activeOptionId"
        :aria-controls="listboxId"
        :aria-expanded="isOpen"
        :aria-label="props.label"
        :placeholder="props.placeholder"
        :value="value"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        class="min-h-11 w-full rounded-lg border border-default bg-default py-2 pr-16 pl-9 text-sm text-highlighted outline-none transition-colors placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
        role="combobox"
        type="text"
        @focus="setOpen(true)"
        @input="handleInput"
        @keydown="handleKeydown"
      >

      <kbd
        v-if="props.showShortcut && value.length === 0"
        class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded border border-default bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-muted"
      >
        {{ shortcutLabel }}
      </kbd>
    </div>

    <p
      aria-live="polite"
      class="sr-only"
      role="status"
    >
      {{ props.loading ? 'Loading results…' : '' }}
    </p>

    <AnimatePresence>
      <motion.div
        v-if="showPanel"
        key="panel"
        :animate="panelAnimate"
        :exit="panelExit"
        :initial="panelInitial"
        :transition="panelTransition"
        class="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-default bg-elevated shadow-lg"
      >
        <div
          :id="listboxId"
          :aria-busy="props.loading"
          :aria-label="props.groupLabel"
          class="max-h-80 overflow-y-auto py-2"
          role="listbox"
        >
          <template v-if="props.loading">
            <div
              v-for="rowId in SKELETON_ROW_IDS"
              :key="rowId"
              aria-hidden="true"
              class="flex items-center gap-3 px-4 py-2"
            >
              <span
                :class="['size-6 shrink-0 rounded bg-muted', !isReduced ? 'animate-pulse' : '']"
              />
              <span class="flex-1 space-y-1.5">
                <span
                  :class="['block h-3 w-2/3 rounded bg-muted', !isReduced ? 'animate-pulse' : '']"
                />
                <span
                  :class="['block h-2.5 w-1/3 rounded bg-muted', !isReduced ? 'animate-pulse' : '']"
                />
              </span>
            </div>
          </template>

          <AnimatePresence
            v-else-if="displayedResults.length > 0"
            mode="popLayout"
          >
            <motion.button
              v-for="(result, index) in displayedResults"
              :id="optionId(index)"
              :key="result.id"
              :aria-selected="index === activeIndex"
              :animate="rowAnimate"
              :class="[
                'relative flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm',
                isReduced && index === activeIndex ? 'bg-default' : '',
                index === activeIndex ? 'text-highlighted' : 'text-default',
              ]"
              :exit="rowExit"
              :initial="rowInitial"
              :transition="rowTransitions[index]"
              role="option"
              tabindex="-1"
              type="button"
              @click="handleSelect(result)"
              @mousedown.prevent
              @mouseenter="activeIndex = index"
            >
              <motion.span
                v-if="index === activeIndex && !isReduced"
                :layout-id="`favicon-search-highlight-${uid}`"
                :transition="SPRING_DEFAULT"
                class="absolute inset-0 rounded-md bg-default"
              />

              <span class="relative z-10">
                <img
                  v-if="faviconSources[result.id] && !failedFavicons.has(result.id)"
                  :src="faviconSources[result.id]"
                  alt=""
                  aria-hidden="true"
                  class="size-6 shrink-0 rounded"
                  loading="lazy"
                  @error="markFaviconFailed(result.id)"
                >
                <UIcon
                  v-else
                  aria-hidden="true"
                  class="size-6 shrink-0 rounded bg-default p-0.5 text-muted"
                  name="i-lucide-globe"
                />
              </span>

              <span class="relative z-10 min-w-0 flex-1">
                <span class="block truncate font-medium">
                  <template
                    v-for="(segment, segmentIndex) in highlightSegments(result.title, value)"
                    :key="segmentIndex"
                  >
                    <mark
                      v-if="segment.match"
                      class="rounded-sm bg-primary/20 text-highlighted"
                    >{{ segment.text }}</mark>
                    <template v-else>
                      {{ segment.text }}
                    </template>
                  </template>
                </span>

                <span
                  v-if="result.description"
                  class="block truncate text-xs text-muted"
                >
                  <template
                    v-for="(segment, segmentIndex) in highlightSegments(result.description, value)"
                    :key="segmentIndex"
                  >
                    <mark
                      v-if="segment.match"
                      class="rounded-sm bg-primary/20 text-highlighted"
                    >{{ segment.text }}</mark>
                    <template v-else>
                      {{ segment.text }}
                    </template>
                  </template>
                </span>
              </span>
            </motion.button>
          </AnimatePresence>

          <div
            v-else
            class="px-4 py-8 text-center text-sm text-muted"
          >
            {{ props.emptyMessage }}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
