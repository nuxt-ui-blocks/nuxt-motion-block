<template>
  <div class="flex w-full justify-center p-6">
    <MSwapPanel
      v-model:amount="amount"
      :from="from"
      :to="to"
      :quote="quote"
      :status="status"
      @flip="flip"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const amount = ref('1')
const isEth = ref(true)

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

const from = computed(() => (isEth.value ? eth : usdc))
const to = computed(() => (isEth.value ? usdc : eth))

const rate = computed(() => (isEth.value ? 3240 : 1 / 3240))

const expiresAt = Date.now() + 45_000

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
    expiresAt,
  }
})

const status = computed(() => (amount.value ? 'ready' : 'idle'))

function flip() {
  isEth.value = !isEth.value
}
</script>
