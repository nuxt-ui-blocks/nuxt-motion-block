<template>
  <div class="flex w-full flex-wrap items-start justify-center gap-4">
    <MWalletCard
      class="max-w-sm"
      label="Savings"
      balance="$18,204.10"
      card-number="5500005555555559"
      holder="Ava Chen"
      expiry="03/27"
      network="mastercard"
    />
    <MWalletCard
      class="max-w-sm"
      label="Studio"
      balance="$640.00"
      card-number="371449635398431"
      holder="Ava Chen"
      expiry="11/28"
      network="amex"
      :ui="{ card: 'bg-[linear-gradient(145deg,oklch(0.55_0.16_300),oklch(0.3_0.12_295))]' }"
    />
  </div>
</template>
