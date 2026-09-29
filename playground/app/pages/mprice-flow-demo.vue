<template>
  <div class="space-y-12">
    <UPageHeader
      title="PriceFlow"
      description="Animated price counter with spring transitions between values."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Interactive Price Counter
        </p>
      </template>
      <div class="flex flex-col items-center gap-6">
        <MPriceFlow
          :value="currentPrice"
          currency="$"
        />
        <div class="flex gap-2">
          <UButton
            label="Free"
            size="sm"
            color="neutral"
            variant="outline"
            @click="currentPrice = 0"
          />
          <UButton
            label="Starter $29"
            size="sm"
            color="neutral"
            variant="outline"
            @click="currentPrice = 29"
          />
          <UButton
            label="Pro $99"
            size="sm"
            color="primary"
            @click="currentPrice = 99"
          />
          <UButton
            label="Enterprise $499"
            size="sm"
            color="warning"
            @click="currentPrice = 499"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          With Prefix
        </p>
      </template>
      <div class="flex flex-col items-center gap-6">
        <MPriceFlow
          :value="revenue"
          currency="$"
          prefix="~"
        />
        <p class="text-sm text-muted">
          Approximate monthly revenue
        </p>
        <UButton
          label="Simulate Growth"
          size="sm"
          color="primary"
          @click="simulateGrowth"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Currency Euro
        </p>
      </template>
      <div class="flex flex-col items-center gap-6">
        <MPriceFlow
          :value="euroPrice"
          currency="€"
        />
        <div class="flex gap-2">
          <UButton
            label="€49"
            size="sm"
            color="neutral"
            variant="outline"
            @click="euroPrice = 49"
          />
          <UButton
            label="€199"
            size="sm"
            color="primary"
            @click="euroPrice = 199"
          />
          <UButton
            label="€899"
            size="sm"
            color="warning"
            @click="euroPrice = 899"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const currentPrice = ref(99)
const revenue = ref(12400)
const euroPrice = ref(199)

function simulateGrowth() {
  revenue.value = Math.floor(Math.random() * 50000) + 5000
}
</script>
