<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { DEFAULT_COUNTRIES, type Country } from '../utils/countries'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export type { Country }

export interface CountryPickerProps {
  /** Extra classes for the trigger wrapper. */
  class?: string
  /** Countries to list. Defaults to a built-in set of 33 common countries. */
  countries?: Country[]
  /** Value used when the component controls its own selection. */
  defaultValue?: string
  /** Start with the dialog open. Only read on first render. */
  defaultOpen?: boolean
  /** Disables the trigger. */
  disabled?: boolean
  /** Message shown when the search matches nothing. */
  emptyMessage?: string
  /** Group the list under each country's `group`. */
  groupBy?: boolean
  /** Accessible name for the trigger and the dialog. */
  label?: string
  /** Selected country code. Leave it out to let the component keep its own. */
  modelValue?: string
  /** Controlled dialog state. Leave it out to let the component keep its own. */
  open?: boolean
  /** Search field placeholder. */
  placeholder?: string
  /** Codes shown under a "Recent" heading while the search field is empty. */
  recent?: string[]
  /** Show the dialling prefix at the end of each row. */
  showDialCode?: boolean
}

const ROW_HEIGHT = 40
const LIST_MAX_HEIGHT = 288
const OVERSCAN_ROWS = 4
const VIRTUALIZE_THRESHOLD = 50
const LISTBOX_LABEL = 'Countries'
const RECENT_LABEL = 'Recent'
const ALL_COUNTRIES_LABEL = 'All countries'
const FALLBACK_GROUP = 'Other'
const ISO_CODE_REGEX = /^[a-z]{2}$/i
const DIACRITIC_REGEX = /[\u0300-\u036F]/g
const REGIONAL_INDICATOR_OFFSET = 0x1F1E6
const CHAR_CODE_A = 'A'.charCodeAt(0)

const props = withDefaults(defineProps<CountryPickerProps>(), {
  class: undefined,
  countries: () => DEFAULT_COUNTRIES.map(country => ({ ...country })),
  defaultValue: '',
  defaultOpen: false,
  disabled: false,
  emptyMessage: 'No countries found',
  groupBy: false,
  label: 'Select country',
  modelValue: undefined,
  open: undefined,
  placeholder: 'Search countries…',
  recent: () => [],
  showDialCode: true,
})

const emit = defineEmits<{
  'select': [country: Country]
  'update:modelValue': [code: string]
  'update:open': [open: boolean]
}>()

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const uid = useId().replace(/:/g, '')
const dialogTitleId = `country-picker-title-${uid}`
const listboxId = `country-picker-listbox-${uid}`

const isControlledValue = computed(() => props.modelValue !== undefined)
const internalValue = ref(props.defaultValue)
const selectedCode = computed(() =>
  isControlledValue.value ? props.modelValue : internalValue.value,
)

const isControlledOpen = computed(() => props.open !== undefined)
const internalOpen = ref(props.defaultOpen)
const isOpen = computed(() => (isControlledOpen.value ? Boolean(props.open) : internalOpen.value))

function setOpen(next: boolean) {
  if (!isControlledOpen.value) {
    internalOpen.value = next
  }

  emit('update:open', next)
}

function setValue(code: string) {
  if (!isControlledValue.value) {
    internalValue.value = code
  }

  emit('update:modelValue', code)
}

const query = ref('')
const highlightedIndex = ref(0)
const scrollTop = ref(0)
const mounted = ref(false)

const triggerRef = ref<HTMLButtonElement | null>(null)
const dialogRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
let previousActiveElement: HTMLElement | null = null

onMounted(() => {
  mounted.value = true
})

function normalize(input: string) {
  return input.normalize('NFD').replace(DIACRITIC_REGEX, '').toLowerCase()
}

function getFlagEmoji(code: string) {
  if (!ISO_CODE_REGEX.test(code)) {
    return null
  }

  const upper = code.toUpperCase()
  const first = REGIONAL_INDICATOR_OFFSET + (upper.charCodeAt(0) - CHAR_CODE_A)
  const second = REGIONAL_INDICATOR_OFFSET + (upper.charCodeAt(1) - CHAR_CODE_A)

  return String.fromCodePoint(first, second)
}

function flagFor(country: Country) {
  return country.flag ?? getFlagEmoji(country.code) ?? country.code
}

function matchesQuery(country: Country, normalizedQuery: string) {
  return normalize(country.name).includes(normalizedQuery)
    || normalize(country.code).includes(normalizedQuery)
    || (country.dialCode ? normalize(country.dialCode).includes(normalizedQuery) : false)
}

type Row
  = | { id: string, kind: 'header', label: string }
    | { country: Country, id: string, kind: 'option' }

/**
 * Headers are rows rather than nested lists: one flat array keeps the keyboard
 * index, the scroll maths and the virtual window addressing the same value.
 */
const rows = computed<Row[]>(() => {
  const trimmedQuery = query.value.trim()
  const normalizedQuery = normalize(trimmedQuery)
  const filtered = trimmedQuery
    ? props.countries.filter(country => matchesQuery(country, normalizedQuery))
    : props.countries

  const next: Row[] = []

  if (!trimmedQuery && props.recent.length > 0) {
    const recentCountries = props.recent
      .map(code => props.countries.find(country => country.code === code))
      .filter((country): country is Country => Boolean(country))

    if (recentCountries.length > 0) {
      next.push({ id: 'header-recent', kind: 'header', label: RECENT_LABEL })

      for (const country of recentCountries) {
        next.push({ country, id: `option-recent-${country.code}`, kind: 'option' })
      }
    }
  }

  if (props.groupBy) {
    const groups = new Map<string, Country[]>()

    for (const country of filtered) {
      const group = country.group ?? FALLBACK_GROUP
      const bucket = groups.get(group)

      if (bucket) {
        bucket.push(country)
      }
      else {
        groups.set(group, [country])
      }
    }

    for (const [group, groupCountries] of groups) {
      next.push({ id: `header-group-${group}`, kind: 'header', label: group })

      for (const country of groupCountries) {
        next.push({ country, id: `option-group-${group}-${country.code}`, kind: 'option' })
      }
    }

    return next
  }

  if (next.length > 0) {
    next.push({ id: 'header-all', kind: 'header', label: ALL_COUNTRIES_LABEL })
  }

  for (const country of filtered) {
    next.push({ country, id: `option-all-${country.code}`, kind: 'option' })
  }

  return next
})

const optionRows = computed(() =>
  rows.value.filter((row): row is Row & { kind: 'option' } => row.kind === 'option'),
)

const clampedHighlightedIndex = computed(() =>
  optionRows.value.length === 0
    ? -1
    : Math.min(highlightedIndex.value, optionRows.value.length - 1),
)

const activeOptionId = computed(() =>
  clampedHighlightedIndex.value >= 0
    ? optionRows.value[clampedHighlightedIndex.value]?.id
    : undefined,
)

watch(query, () => {
  highlightedIndex.value = 0
})

/**
 * Grouped lists carry headers inside the flat row array, so slice-window maths
 * would cut through a section. Grouped lists are expected to be short; only the
 * flat list is windowed.
 */
const shouldVirtualize = computed(() => !props.groupBy && rows.value.length > VIRTUALIZE_THRESHOLD)
const visibleRowCount = Math.ceil(LIST_MAX_HEIGHT / ROW_HEIGHT) + OVERSCAN_ROWS * 2

const startIndex = computed(() =>
  shouldVirtualize.value
    ? Math.max(0, Math.floor(scrollTop.value / ROW_HEIGHT) - OVERSCAN_ROWS)
    : 0,
)

const endIndex = computed(() =>
  shouldVirtualize.value
    ? Math.min(rows.value.length, startIndex.value + visibleRowCount)
    : rows.value.length,
)

const visibleRows = computed(() => rows.value.slice(startIndex.value, endIndex.value))
const topPadding = computed(() => (shouldVirtualize.value ? startIndex.value * ROW_HEIGHT : 0))
const bottomPadding = computed(() =>
  shouldVirtualize.value ? (rows.value.length - endIndex.value) * ROW_HEIGHT : 0,
)

watch(clampedHighlightedIndex, (index) => {
  const list = listRef.value
  const option = optionRows.value[index]

  if (!list || !option) {
    return
  }

  const rowIndex = rows.value.findIndex(row => row.id === option.id)

  if (rowIndex === -1) {
    return
  }

  const top = rowIndex * ROW_HEIGHT
  const bottom = top + ROW_HEIGHT

  if (top < list.scrollTop) {
    list.scrollTop = top
  }
  else if (bottom > list.scrollTop + list.clientHeight) {
    list.scrollTop = bottom - list.clientHeight
  }
})

const selectedCountry = computed(() =>
  props.countries.find(country => country.code === selectedCode.value) ?? null,
)

const triggerText = computed(() => selectedCountry.value?.name ?? props.label)

function openDialog() {
  if (props.disabled) {
    return
  }

  setOpen(true)
}

function closeDialog() {
  setOpen(false)
}

function toggleDialog() {
  if (isOpen.value) {
    closeDialog()
  }
  else {
    openDialog()
  }
}

function selectCountry(country: Country) {
  setValue(country.code)
  emit('select', country)
  closeDialog()
}

function isSelected(country: Country) {
  return country.code === selectedCode.value
}

function highlightRow(id: string) {
  const index = optionRows.value.findIndex(row => row.id === id)

  if (index >= 0) {
    highlightedIndex.value = index
  }
}

function handleSearchInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value
}

function clearSearch() {
  query.value = ''
  highlightedIndex.value = 0
  searchInputRef.value?.focus()
}

function handleSearchKeydown(event: KeyboardEvent) {
  if (optionRows.value.length === 0) {
    return
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(
        clampedHighlightedIndex.value + 1,
        optionRows.value.length - 1,
      )
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(clampedHighlightedIndex.value - 1, 0)
      break
    case 'Home':
      event.preventDefault()
      highlightedIndex.value = 0
      break
    case 'End':
      event.preventDefault()
      highlightedIndex.value = optionRows.value.length - 1
      break
    case 'Enter': {
      event.preventDefault()
      const option = optionRows.value[clampedHighlightedIndex.value]

      if (option) {
        selectCountry(option.country)
      }
      break
    }
  }
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (!isOpen.value) {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    closeDialog()
    return
  }

  if (event.key !== 'Tab' || !dialogRef.value) {
    return
  }

  const focusable = Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    ),
  )

  if (focusable.length === 0) {
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

/**
 * Focus moves into the dialog on open and back to whatever opened it on close.
 * `nextTick` runs after the teleported panel exists, so the search field is
 * focusable by the time it is addressed.
 */
watch(isOpen, async (open) => {
  if (!import.meta.client) {
    return
  }

  if (open) {
    previousActiveElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    await nextTick()
    searchInputRef.value?.focus()
    return
  }

  query.value = ''
  highlightedIndex.value = 0
  scrollTop.value = 0

  if (previousActiveElement) {
    previousActiveElement.focus()
    previousActiveElement = null
  }
  else {
    triggerRef.value?.focus()
  }
}, { immediate: true })

/**
 * The page behind a modal dialog should not scroll while it is open. The
 * previous value is put back rather than an empty string, so nesting this
 * dialog inside a page that already locked scrolling does not unlock it.
 */
let previousBodyOverflow: string | null = null

watch(isOpen, (open) => {
  if (!import.meta.client) {
    return
  }

  if (open) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return
  }

  if (previousBodyOverflow !== null) {
    document.body.style.overflow = previousBodyOverflow
    previousBodyOverflow = null
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('keydown', handleDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleDocumentKeydown)

  if (previousBodyOverflow !== null) {
    document.body.style.overflow = previousBodyOverflow
  }
})

const backdropInitial = { opacity: 0 }
const backdropAnimate = { opacity: 1 }
const backdropExit = computed(() => ({
  opacity: 0,
  transition: { duration: isReduced.value ? 0 : 0.15 },
}))

const cardInitial = { opacity: 0, scale: 0.97, y: 8 }
const cardAnimate = { opacity: 1, scale: 1, y: 0 }

const overlayTransition = computed(() =>
  isReduced.value ? { duration: 0 } : { duration: 0.2 },
)

const cardTransition = computed(() =>
  isReduced.value ? { duration: 0 } : SPRING_DEFAULT,
)
</script>

<template>
  <div
    :class="props.class"
    class="relative inline-block"
  >
    <button
      ref="triggerRef"
      :aria-expanded="isOpen"
      :aria-label="selectedCountry ? `${props.label}: ${selectedCountry.name}` : props.label"
      :class="[
        'flex min-h-11 w-full items-center gap-2 rounded-lg border border-default bg-default px-3 text-left text-sm text-highlighted transition-colors',
        'hover:bg-elevated focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
        props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      ]"
      :disabled="props.disabled"
      aria-haspopup="dialog"
      type="button"
      @click="toggleDialog"
    >
      <span
        v-if="selectedCountry"
        aria-hidden="true"
        class="shrink-0 text-base"
      >{{ flagFor(selectedCountry) }}</span>
      <span class="min-w-0 flex-1 truncate">{{ triggerText }}</span>
      <UIcon
        aria-hidden="true"
        class="size-4 shrink-0 text-muted"
        name="i-lucide-chevron-down"
      />
    </button>

    <Teleport
      v-if="mounted"
      to="body"
    >
      <AnimatePresence>
        <motion.div
          v-if="isOpen"
          key="backdrop"
          :animate="backdropAnimate"
          :exit="backdropExit"
          :initial="backdropInitial"
          :transition="overlayTransition"
          class="fixed inset-0 z-[80] bg-default/70 backdrop-blur-sm"
          @click="closeDialog"
        />

        <motion.div
          v-if="isOpen"
          key="shell"
          :animate="backdropAnimate"
          :exit="backdropExit"
          :initial="backdropInitial"
          :transition="overlayTransition"
          class="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto px-4 py-16 sm:p-16"
          @click.self="closeDialog"
        >
          <motion.div
            ref="dialogRef"
            :animate="cardAnimate"
            :aria-labelledby="dialogTitleId"
            :initial="cardInitial"
            :transition="cardTransition"
            aria-modal="true"
            class="relative w-full max-w-sm overflow-hidden rounded-xl border border-default bg-elevated shadow-xl"
            role="dialog"
          >
            <h2
              :id="dialogTitleId"
              class="sr-only"
            >
              {{ props.label }}
            </h2>

            <div class="flex items-center gap-2 border-b border-default p-3">
              <UIcon
                aria-hidden="true"
                class="size-4 shrink-0 text-muted"
                name="i-lucide-search"
              />

              <input
                ref="searchInputRef"
                :aria-activedescendant="activeOptionId"
                :aria-controls="listboxId"
                :aria-expanded="isOpen"
                :aria-label="`Search ${props.label.toLowerCase()}`"
                :placeholder="props.placeholder"
                :value="query"
                aria-autocomplete="list"
                class="w-full bg-transparent text-sm text-highlighted outline-none placeholder:text-muted"
                role="combobox"
                type="text"
                @input="handleSearchInput"
                @keydown="handleSearchKeydown"
              >

              <button
                v-if="query"
                aria-label="Clear search"
                class="shrink-0 rounded-md p-1 text-muted transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                type="button"
                @click="clearSearch"
              >
                <UIcon
                  aria-hidden="true"
                  class="size-3.5"
                  name="i-lucide-x"
                />
              </button>

              <button
                aria-label="Close dialog"
                class="shrink-0 rounded-md p-1 text-muted transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                type="button"
                @click="closeDialog"
              >
                <UIcon
                  aria-hidden="true"
                  class="size-4"
                  name="i-lucide-x"
                />
              </button>
            </div>

            <div
              :id="listboxId"
              ref="listRef"
              :aria-label="LISTBOX_LABEL"
              :style="{ maxHeight: `${LIST_MAX_HEIGHT}px` }"
              class="overflow-y-auto py-1"
              role="listbox"
              @scroll="scrollTop = ($event.target as HTMLElement).scrollTop"
            >
              <p
                v-if="optionRows.length === 0"
                class="px-4 py-8 text-center text-sm text-muted"
              >
                {{ props.emptyMessage }}
              </p>

              <template v-else>
                <div
                  v-if="topPadding > 0"
                  aria-hidden="true"
                  :style="{ height: `${topPadding}px` }"
                />

                <template
                  v-for="row in visibleRows"
                  :key="row.id"
                >
                  <div
                    v-if="row.kind === 'header'"
                    class="px-3 pt-3 pb-1 text-xs font-medium tracking-wide text-muted uppercase"
                    role="presentation"
                  >
                    {{ row.label }}
                  </div>

                  <button
                    v-else
                    :id="row.id"
                    :aria-selected="isSelected(row.country)"
                    :class="[
                      'flex min-h-10 w-full cursor-pointer items-center gap-3 px-3 text-left text-sm transition-colors',
                      row.id === activeOptionId ? 'bg-default' : '',
                      isSelected(row.country) ? 'font-medium text-primary' : 'text-highlighted',
                    ]"
                    role="option"
                    tabindex="-1"
                    type="button"
                    @click="selectCountry(row.country)"
                    @mousedown.prevent
                    @mouseenter="highlightRow(row.id)"
                  >
                    <span
                      aria-hidden="true"
                      class="w-6 shrink-0 text-center text-base"
                    >{{ flagFor(row.country) }}</span>
                    <span class="min-w-0 flex-1 truncate">{{ row.country.name }}</span>
                    <span
                      v-if="props.showDialCode && row.country.dialCode"
                      class="shrink-0 text-xs text-muted"
                    >{{ row.country.dialCode }}</span>
                    <UIcon
                      v-if="isSelected(row.country)"
                      aria-hidden="true"
                      class="size-4 shrink-0 text-primary"
                      name="i-lucide-check"
                    />
                  </button>
                </template>

                <div
                  v-if="bottomPadding > 0"
                  aria-hidden="true"
                  :style="{ height: `${bottomPadding}px` }"
                />
              </template>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Teleport>
  </div>
</template>
