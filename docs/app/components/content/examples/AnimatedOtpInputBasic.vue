<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium text-highlighted">
        Verification code
      </p>
      <MAnimatedOTPInput
        v-model="code"
        :length="6"
        @complete="onComplete"
      />
    </div>

    <div class="flex items-center gap-3">
      <UButton
        size="sm"
        label="Autofill"
        icon="i-lucide-wand-sparkles"
        @click="code = '424242'"
      />
      <UButton
        size="sm"
        label="Clear"
        variant="outline"
        color="neutral"
        @click="code = ''"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const code = ref('')
const status = ref('Waiting for 6 digits')

function onComplete(value: string) {
  status.value = `Complete: ${value}`
}
</script>
