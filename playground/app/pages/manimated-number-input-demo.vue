<script setup lang="ts">
const qty = ref(0)
const price = ref(42.5)
</script>

<template>
  <div>
    <UPageHeader
      title="AnimatedNumberInput"
      description="Number input built on Nuxt UI's UInputNumber with a rolling-digit dial animation on value change."
    />

    <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-8">
      <UAlert
        color="info"
        variant="subtle"
        title="Step presets"
        description="The step prop controls how much each click changes the value — for example :step=&quot;0.5&quot; for money or :step=&quot;10&quot; for coarse counters."
      />

      <UCard>
        <MAnimatedNumberInput
          v-model="qty"
          label="Quantity"
          :min="0"
          :max="99"
          :step="10"
        />
      </UCard>

      <UCard>
        <MAnimatedNumberInput
          v-model="price"
          label="Price"
          :min="0"
          :max="500"
          :step="0.5"
          :format-options="{ style: 'currency', currency: 'USD', maximumFractionDigits: 2 }"
        />
      </UCard>

      <UCard>
        <MAnimatedNumberInput
          label="Volume"
          :default-value="68"
          :min="0"
          :max="100"
          :step="1"
          :format-options="{ style: 'unit', unit: 'percent', maximumFractionDigits: 0 }"
        />
      </UCard>
    </div>
  </div>
</template>
