<template>
  <div class="space-y-12">
    <UPageHeader
      title="WalletCard"
      description="UCard with slide-up entrance animation and optional shine sweep on hover."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Wallet Cards
        </p>
      </template>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MWalletCard
          v-for="card in walletCards"
          :key="card.number"
          :balance="card.balance"
          :card-number="card.number"
          :shine="true"
        >
          <div class="flex items-center justify-between text-xs text-muted pt-2">
            <span>{{ card.holder }}</span>
            <span>{{ card.expiry }}</span>
          </div>
        </MWalletCard>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Without Shine
        </p>
      </template>
      <div class="max-w-sm">
        <MWalletCard
          balance="$12,450.00"
          card-number="4532015112830366"
          :shine="false"
        >
          <div class="flex items-center justify-between text-xs text-muted pt-2">
            <span>John Doe</span>
            <span>12/28</span>
          </div>
        </MWalletCard>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const walletCards = [
  { balance: '$12,450.00', number: '4532015112830366', holder: 'John Doe', expiry: '12/28' },
  { balance: '$3,200.50', number: '4916225112783456', holder: 'Jane Smith', expiry: '08/27' },
  { balance: '$890.00', number: '5425233430109903', holder: 'Bob Wilson', expiry: '03/26' },
]
</script>
