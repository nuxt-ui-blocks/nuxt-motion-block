<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface SwapToken {
  /** Available balance shown under the pay field. */
  balance?: number
  /** Optional icon name for the token chip. */
  icon?: string
  /** Full token name. */
  name: string
  /** Short symbol shown on the chip. */
  symbol: string
}

export interface SwapQuote {
  /** Epoch milliseconds when the quote expires. */
  expiresAt?: number
  /** Network or provider fee in the receive token. */
  fee?: number
  /** Expected output amount. */
  output: number
  /** Price impact as a fraction, for example `0.005` for 0.5%. */
  priceImpact?: number
  /** Exchange rate for one pay token in receive tokens. */
  rate: number
}

export type SwapStatus = 'idle' | 'quoting' | 'ready' | 'submitting' | 'error'

export interface SwapPanelProps {
  /** Controlled pay amount. Leave it out to let the component hold it. */
  amount?: string
  /** Extra classes for the root. */
  class?: string
  /** Error copy shown under the panel. */
  error?: string
  /** Token being paid. */
  from: SwapToken
  /** Quote for the current pair and amount. */
  quote?: SwapQuote
  /** Maximum slippage as a fraction. */
  slippage?: number
  /** Current quote or submission state. */
  status?: SwapStatus
  /** Token being received. */
  to: SwapToken
  /**
   * Tokens offered by the chip menus. Leave it out to handle the choice
   * yourself from the `select-token` event.
   */
  tokens?: SwapToken[]
}

const props = withDefaults(defineProps<SwapPanelProps>(), {
  amount: undefined,
  class: undefined,
  error: undefined,
  quote: undefined,
  slippage: undefined,
  status: 'idle',
  tokens: undefined,
})

const emit = defineEmits<{
  'flip': []
  'select-token': [side: 'from' | 'to', token?: SwapToken]
  'submit': []
  'update:amount': [value: string]
}>()

const SHIMMER_DURATION = 1.4
const SHIMMER_EASE: [number, number, number, number] = [0, 0, 1, 1]
const RING_SIZE = 20
const RING_RADIUS = 8
const RING_STROKE = 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const RING_TICK_MS = 100

const CHIP_CLASS
  = 'inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-muted px-3 font-medium text-highlighted text-sm shadow-xs transition-[transform,background-color] duration-150 ease-out hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100'
const CHIP_AVATAR_CLASS
  = 'flex size-5 items-center justify-center rounded-full bg-inverted/10 font-semibold text-[10px] text-highlighted'

const decimalFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 6,
})
const percentFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  style: 'percent',
})

const reducedMotion = useReducedMotion()

const inputId = useId()
const receiveLabelId = useId()

const flipped = ref(false)
const internalAmount = ref('')

const isControlled = computed(() => props.amount !== undefined)
const currentAmount = computed(() => props.amount ?? internalAmount.value)

const isBusy = computed(
  () => props.status === 'quoting' || props.status === 'submitting',
)

const outputFormatted = computed(() =>
  decimalFormatter.format(props.quote?.output ?? 0),
)

const actionLabel = computed(() => {
  if (props.status === 'submitting') {
    return 'Swapping…'
  }

  if (props.status === 'error') {
    return 'Try again'
  }

  return 'Review swap'
})

/**
 * The two rows are keyed by token symbol so flipping the pair reorders the
 * existing boxes instead of remounting them. Layout animation then reads as the
 * two rows physically trading places, which is the whole point of the control.
 */
const rows = computed(() => [
  { side: 'from' as const, token: props.from },
  { side: 'to' as const, token: props.to },
])

const hasTokenPicker = computed(() => (props.tokens?.length ?? 0) > 0)

/**
 * Built on `UDropdownMenu` so the picker inherits Nuxt UI's keyboard handling,
 * positioning and focus management instead of reimplementing a listbox.
 */
function tokenMenuItems(side: 'from' | 'to') {
  const current = side === 'from' ? props.from : props.to

  return (props.tokens ?? []).map(token => ({
    label: token.symbol,
    description: token.symbol === current.symbol
      ? `${token.name} · Selected`
      : token.name,
    icon: token.icon ?? 'i-lucide-coins',
    checked: token.symbol === current.symbol,
    onSelect: () => emit('select-token', side, token),
  }))
}

const rowTransition = computed(() =>
  reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT,
)

const figureInitial = computed(() =>
  reducedMotion.value === true ? { opacity: 1 } : { opacity: 0, y: 12 },
)

const figureExit = computed(() =>
  reducedMotion.value === true
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, y: -12 },
)

const figureTransition = computed(() =>
  reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT,
)

function updateAmount(value: string) {
  if (!isControlled.value) {
    internalAmount.value = value
  }

  emit('update:amount', value)
}

function onInput(event: Event) {
  updateAmount((event.target as HTMLInputElement).value)
}

function fillMax() {
  if (typeof props.from.balance === 'number') {
    updateAmount(String(props.from.balance))
  }
}

function handleFlip() {
  flipped.value = !flipped.value
  emit('flip')
}

const isMounted = ref(false)
const now = ref(0)
let startedAt = 0
let timer: ReturnType<typeof setInterval> | undefined

const ringFraction = computed(() => {
  const expiresAt = props.quote?.expiresAt

  if (!expiresAt || !now.value) {
    return 1
  }

  const total = expiresAt - startedAt

  if (total <= 0) {
    return 0
  }

  return Math.max(0, Math.min(1, (expiresAt - now.value) / total))
})

const dashOffset = computed(
  () => RING_CIRCUMFERENCE * (1 - ringFraction.value),
)

const secondsLeft = computed(() => {
  const expiresAt = props.quote?.expiresAt

  if (!expiresAt) {
    return 0
  }

  return Math.max(0, Math.ceil((expiresAt - now.value) / 1000))
})

const ringStyle = computed(() => ({
  transform: 'rotate(-90deg)',
  transformOrigin: '50% 50%',
  transition: reducedMotion.value === true
    ? 'none'
    : `stroke-dashoffset ${RING_TICK_MS}ms linear`,
}))

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

function startTimer() {
  stopTimer()

  const expiresAt = props.quote?.expiresAt

  if (!isMounted.value || !expiresAt) {
    return
  }

  startedAt = Date.now()
  now.value = startedAt

  timer = setInterval(() => {
    now.value = Date.now()

    if (now.value >= expiresAt) {
      stopTimer()
    }
  }, RING_TICK_MS)
}

watch(() => props.quote?.expiresAt, startTimer)

onMounted(() => {
  isMounted.value = true
  startTimer()
})

onBeforeUnmount(stopTimer)
</script>

<template>
  <div
    :class="[
      'w-full max-w-sm rounded-2xl border border-default bg-default p-4',
      props.class,
    ]"
  >
    <div class="flex flex-col gap-2">
      <motion.div
        v-for="row in rows"
        :key="row.token.symbol"
        class="relative"
        :layout="reducedMotion !== true"
        :transition="rowTransition"
      >
        <template v-if="row.side === 'from'">
          <label
            :for="inputId"
            class="mb-1 block px-1 text-muted text-xs"
          >
            You pay
          </label>
        </template>
        <span
          v-else
          :id="receiveLabelId"
          class="mb-1 block px-1 text-muted text-xs"
        >
          You receive
        </span>

        <div
          class="relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border border-default bg-muted/40 px-3 py-2"
        >
          <input
            v-if="row.side === 'from'"
            :id="inputId"
            :value="currentAmount"
            type="text"
            inputmode="decimal"
            placeholder="0.0"
            class="w-full min-w-0 bg-transparent font-semibold text-2xl text-highlighted outline-none placeholder:text-muted/40"
            @input="onInput"
          >

          <template v-else>
            <div
              v-if="props.status === 'quoting'"
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div
                v-if="reducedMotion === true"
                class="absolute inset-0 bg-inverted/10"
              />
              <motion.div
                v-else
                class="h-full w-1/3 bg-gradient-to-r from-transparent via-inverted/10 to-transparent"
                :animate="{ x: ['-100%', '220%'] }"
                :transition="{
                  duration: SHIMMER_DURATION,
                  ease: SHIMMER_EASE,
                  repeat: Number.POSITIVE_INFINITY,
                }"
              />
            </div>

            <div
              :aria-labelledby="receiveLabelId"
              aria-live="polite"
              class="relative min-h-8 flex-1 font-semibold text-2xl"
            >
              <span class="relative inline-flex overflow-hidden">
                <AnimatePresence
                  :initial="false"
                  mode="popLayout"
                >
                  <motion.span
                    :key="outputFormatted"
                    :initial="figureInitial"
                    :animate="{ opacity: 1, y: 0 }"
                    :exit="figureExit"
                    :transition="figureTransition"
                  >
                    {{ outputFormatted }}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </template>

          <UDropdownMenu
            v-if="hasTokenPicker"
            :items="tokenMenuItems(row.side)"
            :content="{ align: 'end', sideOffset: 6 }"
            :ui="{ content: 'w-56' }"
          >
            <button
              type="button"
              :class="CHIP_CLASS"
              :aria-label="`Change ${row.side === 'from' ? 'pay' : 'receive'} token, currently ${row.token.symbol}`"
            >
              <UIcon
                v-if="row.token.icon"
                :name="row.token.icon"
                class="size-4"
                aria-hidden="true"
              />
              <span
                v-else
                aria-hidden="true"
                :class="CHIP_AVATAR_CLASS"
              >
                {{ row.token.symbol.charAt(0) }}
              </span>
              <span>{{ row.token.symbol }}</span>
              <UIcon
                name="i-lucide-chevron-down"
                class="size-4 text-muted"
                aria-hidden="true"
              />
            </button>

            <template #item-trailing="{ item }">
              <UIcon
                v-if="item.checked"
                name="i-lucide-check"
                class="size-4 text-primary"
                aria-hidden="true"
              />
            </template>
          </UDropdownMenu>

          <button
            v-else
            type="button"
            :class="CHIP_CLASS"
            :aria-label="`Change ${row.side === 'from' ? 'pay' : 'receive'} token, currently ${row.token.symbol}`"
            @click="emit('select-token', row.side)"
          >
            <UIcon
              v-if="row.token.icon"
              :name="row.token.icon"
              class="size-4"
              aria-hidden="true"
            />
            <span
              v-else
              aria-hidden="true"
              :class="CHIP_AVATAR_CLASS"
            >
              {{ row.token.symbol.charAt(0) }}
            </span>
            <span>{{ row.token.symbol }}</span>
            <UIcon
              name="i-lucide-chevron-down"
              class="size-4 text-muted"
              aria-hidden="true"
            />
          </button>
        </div>

        <div
          v-if="row.side === 'from' && typeof props.from.balance === 'number'"
          class="mt-1 flex items-center gap-2 px-1 text-muted text-xs"
        >
          <span>Balance {{ decimalFormatter.format(props.from.balance) }}</span>
          <button
            type="button"
            class="cursor-pointer rounded font-medium text-xs underline decoration-muted/50 underline-offset-2 transition-colors hover:text-highlighted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default"
            @click="fillMax"
          >
            Max
          </button>
        </div>
      </motion.div>

      <div class="flex justify-center">
        <button
          type="button"
          class="relative z-10 -my-4 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-default bg-default text-highlighted shadow-sm transition-[transform,background-color] duration-150 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
          aria-label="Flip pay and receive tokens"
          @click="handleFlip"
        >
          <!-- The rotation rides the icon, not the button: the frame is a
               circle, so spinning it only ever moved its shadow. -->
          <motion.span
            class="flex"
            :animate="{ rotate: flipped ? 180 : 0 }"
            :transition="rowTransition"
          >
            <UIcon
              name="i-lucide-arrow-left-right"
              class="size-4"
              aria-hidden="true"
            />
          </motion.span>
        </button>
      </div>
    </div>

    <div
      v-if="props.quote"
      class="mt-3 flex flex-wrap items-center gap-2 px-1 text-muted text-xs"
    >
      <span
        v-if="isMounted && props.quote.expiresAt"
        class="sr-only"
      >
        Quote expires in {{ secondsLeft }} seconds
      </span>

      <svg
        v-if="isMounted && props.quote.expiresAt"
        class="shrink-0"
        :height="RING_SIZE"
        :viewBox="`0 0 ${RING_SIZE} ${RING_SIZE}`"
        :width="RING_SIZE"
        aria-hidden="true"
      >
        <circle
          :cx="RING_SIZE / 2"
          :cy="RING_SIZE / 2"
          :r="RING_RADIUS"
          fill="none"
          stroke="currentColor"
          :stroke-width="RING_STROKE"
          class="text-muted/20"
        />
        <circle
          :cx="RING_SIZE / 2"
          :cy="RING_SIZE / 2"
          :r="RING_RADIUS"
          fill="none"
          stroke="currentColor"
          :stroke-width="RING_STROKE"
          :stroke-dasharray="RING_CIRCUMFERENCE"
          :stroke-dashoffset="dashOffset"
          stroke-linecap="round"
          class="text-primary"
          :style="ringStyle"
        />
      </svg>

      <span>
        1 {{ props.from.symbol }} = {{ decimalFormatter.format(props.quote.rate) }} {{ props.to.symbol }}
      </span>

      <span v-if="typeof props.quote.fee === 'number'">
        Fee {{ decimalFormatter.format(props.quote.fee) }} {{ props.to.symbol }}
      </span>

      <span v-if="typeof props.quote.priceImpact === 'number'">
        Impact {{ percentFormatter.format(props.quote.priceImpact) }}
      </span>

      <span v-if="typeof props.slippage === 'number'">
        Max slippage {{ percentFormatter.format(props.slippage) }}
      </span>
    </div>

    <p
      v-if="props.error"
      role="alert"
      class="mt-2 px-1 text-error text-xs"
    >
      {{ props.error }}
    </p>

    <UButton
      block
      color="primary"
      class="mt-3 h-10 w-full rounded-xl font-semibold"
      :disabled="isBusy"
      :loading="props.status === 'submitting'"
      @click="emit('submit')"
    >
      {{ actionLabel }}
    </UButton>
  </div>
</template>
