<template>
  <div class="flex w-full justify-center py-6">
    <MDigitRoll
      class="w-52"
      :default-value="12"
      label="Tip"
      :max="100"
      :min="0"
      :precision="2"
      prefix="$"
      :step="0.5"
      stepper
    />
  </div>
</template>
