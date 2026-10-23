<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

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
}

const props = withDefaults(defineProps<SwapPanelProps>(), {
  amount: undefined,
  class: undefined,
  error: undefined,
  quote: undefined,
  slippage: undefined,
  status: 'idle',
})

const emit = defineEmits<{
  'flip': []
  'select-token': [side: 'from' | 'to']
  'submit': []
  'update:amount': [value: string]
}>()

const RING_SIZE = 20
const RING_RADIUS = 8
const RING_STROKE = 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const RING_TICK_MS = 100

const decimalFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 6,
})
const percentFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  style: 'percent',
})

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
      <div class="relative">
        <label
          :for="inputId"
          class="mb-1 block px-1 text-xs text-muted"
        >
          You pay
        </label>

        <div
          class="flex items-center justify-between gap-2 rounded-xl border border-default bg-elevated/40 px-3 py-2"
        >
          <input
            :id="inputId"
            :value="currentAmount"
            type="text"
            inputmode="decimal"
            placeholder="0.0"
            class="w-full min-w-0 bg-transparent text-2xl font-semibold text-highlighted outline-none placeholder:text-muted/40"
            @input="onInput"
          >

          <UButton
            variant="soft"
            color="neutral"
            size="sm"
            class="shrink-0 gap-1.5 rounded-full"
            :aria-label="`Change pay token, currently ${props.from.symbol}`"
            @click="emit('select-token', 'from')"
          >
            <UIcon
              v-if="props.from.icon"
              :name="props.from.icon"
              class="size-4"
              aria-hidden="true"
            />
            <span
              v-else
              aria-hidden="true"
              class="flex size-5 items-center justify-center rounded-full bg-inverted/10 text-[10px] font-semibold"
            >
              {{ props.from.symbol.charAt(0) }}
            </span>
            <span>{{ props.from.symbol }}</span>
            <UIcon
              name="i-lucide-chevron-down"
              class="size-4 text-muted"
              aria-hidden="true"
            />
          </UButton>
        </div>

        <div
          v-if="typeof props.from.balance === 'number'"
          class="mt-1 flex items-center gap-2 px-1 text-xs text-muted"
        >
          <span>Balance {{ decimalFormatter.format(props.from.balance) }}</span>
          <UButton
            variant="link"
            color="neutral"
            size="xs"
            class="h-auto p-0 text-xs font-medium underline decoration-default underline-offset-2"
            @click="fillMax"
          >
            Max
          </UButton>
        </div>
      </div>

      <div class="relative">
        <span
          :id="receiveLabelId"
          class="mb-1 block px-1 text-xs text-muted"
        >
          You receive
        </span>

        <div
          class="relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border border-default bg-elevated/40 px-3 py-2"
        >
          <div
            v-if="props.status === 'quoting'"
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div class="quote-static absolute inset-0 bg-muted/40" />
            <div
              class="quote-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-inverted/10 to-transparent"
            />
          </div>

          <div
            :aria-labelledby="receiveLabelId"
            aria-live="polite"
            class="relative min-h-8 flex-1 text-2xl font-semibold text-highlighted"
          >
            <span class="relative inline-flex overflow-hidden">
              <span
                :key="outputFormatted"
                class="roll-figure"
              >{{ outputFormatted }}</span>
            </span>
          </div>

          <UButton
            variant="soft"
            color="neutral"
            size="sm"
            class="shrink-0 gap-1.5 rounded-full"
            :aria-label="`Change receive token, currently ${props.to.symbol}`"
            @click="emit('select-token', 'to')"
          >
            <UIcon
              v-if="props.to.icon"
              :name="props.to.icon"
              class="size-4"
              aria-hidden="true"
            />
            <span
              v-else
              aria-hidden="true"
              class="flex size-5 items-center justify-center rounded-full bg-inverted/10 text-[10px] font-semibold"
            >
              {{ props.to.symbol.charAt(0) }}
            </span>
            <span>{{ props.to.symbol }}</span>
            <UIcon
              name="i-lucide-chevron-down"
              class="size-4 text-muted"
              aria-hidden="true"
            />
          </UButton>
        </div>
      </div>

      <div class="flex justify-center">
        <UButton
          variant="outline"
          color="neutral"
          size="sm"
          class="z-10 -my-4 size-8 rounded-full p-0"
          aria-label="Flip pay and receive tokens"
          @click="handleFlip"
        >
          <UIcon
            name="i-lucide-arrow-left-right"
            :class="[
              'flip-icon size-4 transition-transform duration-300',
              flipped ? 'rotate-180' : '',
            ]"
            aria-hidden="true"
          />
        </UButton>
      </div>
    </div>

    <div
      v-if="props.quote"
      class="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs text-muted"
    >
      <template v-if="isMounted && props.quote.expiresAt">
        <svg
          class="countdown-ring shrink-0"
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
            class="text-muted/30"
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
            class="countdown-progress text-primary"
          />
        </svg>
        <span class="sr-only">
          Quote expires in {{ secondsLeft }} seconds
        </span>
      </template>

      <span>
        1 {{ props.from.symbol }} =
        {{ decimalFormatter.format(props.quote.rate) }} {{ props.to.symbol }}
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
      class="mt-2 px-1 text-xs text-error"
    >
      {{ props.error }}
    </p>

    <UButton
      block
      class="mt-3 w-full rounded-xl font-semibold"
      :disabled="isBusy"
      :loading="props.status === 'submitting'"
      @click="emit('submit')"
    >
      {{ actionLabel }}
    </UButton>
  </div>
</template>

<style scoped>
.roll-figure {
  animation: roll-in 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

.quote-static {
  display: none;
}

.quote-shimmer {
  animation: shimmer-sweep 1.4s linear infinite;
}

.countdown-progress {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 100ms linear;
}

@keyframes roll-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

@keyframes shimmer-sweep {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(220%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .roll-figure {
    animation: none;
  }

  .quote-shimmer {
    display: none;
  }

  .quote-static {
    display: block;
  }

  .flip-icon {
    transition: none;
  }

  .countdown-progress {
    transition: none;
  }
}
</style>
