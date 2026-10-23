<template>
  <div class="flex w-full flex-col items-center gap-3 p-6">
    <MSwapPanel
      v-model:amount="amount"
      :error="error"
      :from="from"
      :quote="quote"
      :slippage="0.005"
      :status="status"
      :to="to"
      @flip="flip"
      @select-token="note = $event === 'from' ? 'Choose a pay token' : 'Choose a receive token'"
      @submit="submit"
    />

    <p class="text-sm text-muted">
      {{ note }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

type Status = 'idle' | 'quoting' | 'ready' | 'submitting' | 'error'

const amount = ref('500')
const status = ref<Status>('ready')
const note = ref('Balance, slippage and errors update as you type.')
const isUsdc = ref(true)

const eth = {
  name: 'Ether',
  symbol: 'ETH',
  balance: 4.28,
  icon: 'i-lucide-gem',
}
const usdc = {
  name: 'USD Coin',
  symbol: 'USDC',
  balance: 1240.5,
  icon: 'i-lucide-circle-dollar-sign',
}

const from = computed(() => (isUsdc.value ? usdc : eth))
const to = computed(() => (isUsdc.value ? eth : usdc))

const error = computed(() => {
  const value = Number(amount.value)

  if (!amount.value) {
    return undefined
  }

  if (Number.isNaN(value)) {
    return 'Enter a valid amount.'
  }

  return value > from.value.balance
    ? `Amount exceeds your ${from.value.symbol} balance.`
    : undefined
})

const rate = computed(() => (isUsdc.value ? 1 / 3240 : 3240))
const expiresAt = Date.now() + 30_000

const quote = computed(() => {
  const value = Number(amount.value)

  if (!amount.value || Number.isNaN(value)) {
    return undefined
  }

  return {
    output: value * rate.value,
    rate: rate.value,
    fee: value * 0.0004,
    priceImpact: 0.004,
    expiresAt,
  }
})

watch(error, (message) => {
  if (message) {
    status.value = 'error'
  }
  else if (status.value === 'error') {
    status.value = 'ready'
  }
})

let timer: ReturnType<typeof setTimeout> | undefined

function submit() {
  if (error.value) {
    return
  }

  status.value = 'quoting'
  note.value = 'Fetching a fresh quote…'

  timer = setTimeout(() => {
    status.value = 'submitting'
    note.value = 'Submitting the swap…'

    timer = setTimeout(() => {
      status.value = 'ready'
      note.value = 'Swap submitted. Quote refreshed.'
    }, 1000)
  }, 600)
}

function flip() {
  isUsdc.value = !isUsdc.value
  note.value = 'Tokens flipped.'
}

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>
