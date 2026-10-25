<template>
  <div class="flex w-full justify-center p-6">
    <MSwapPanel
      v-model:amount="amount"
      :from="from"
      :to="to"
      :quote="quote"
      :status="status"
      :tokens="tokens"
      @flip="flip"
      @select-token="selectToken"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Token {
  balance: number
  icon: string
  name: string
  symbol: string
}

const amount = ref('1')
const pair = ref<[string, string]>(['ETH', 'USDC'])
const expiresAt = ref(Date.now() + 45_000)

const tokens: Token[] = [
  { name: 'Ether', symbol: 'ETH', balance: 4.28, icon: 'i-lucide-gem' },
  { name: 'USD Coin', symbol: 'USDC', balance: 1240.5, icon: 'i-lucide-circle-dollar-sign' },
  { name: 'Dai', symbol: 'DAI', balance: 860, icon: 'i-lucide-landmark' },
  { name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: 0.42, icon: 'i-lucide-bitcoin' },
]

const prices: Record<string, number> = {
  ETH: 3240,
  USDC: 1,
  DAI: 1,
  WBTC: 68_000,
}

function tokenFor(symbol: string) {
  return tokens.find(token => token.symbol === symbol) ?? tokens[0]!
}

const from = computed(() => tokenFor(pair.value[0]))
const to = computed(() => tokenFor(pair.value[1]))
const rate = computed(() => (prices[from.value.symbol] ?? 1) / (prices[to.value.symbol] ?? 1))

const quote = computed(() => {
  const value = Number(amount.value)

  if (!amount.value || Number.isNaN(value)) {
    return undefined
  }

  return {
    output: value * rate.value,
    rate: rate.value,
    fee: value * 0.0008,
    priceImpact: 0.0012,
    expiresAt: expiresAt.value,
  }
})

const status = computed(() => (amount.value ? 'ready' : 'idle'))

watch(amount, () => {
  expiresAt.value = Date.now() + 45_000
})

function flip() {
  pair.value = [pair.value[1], pair.value[0]]
}

function selectToken(side: 'from' | 'to', token?: Token) {
  if (!token) {
    return
  }

  const next: [string, string] = [pair.value[0], pair.value[1]]

  if (side === 'from') {
    if (token.symbol === next[1]) {
      next[1] = next[0]
    }
    next[0] = token.symbol
  }
  else {
    if (token.symbol === next[0]) {
      next[0] = next[1]
    }
    next[1] = token.symbol
  }

  pair.value = next
  expiresAt.value = Date.now() + 45_000
}
</script>
