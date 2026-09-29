<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedOTPInput"
      description="Animated OTP input with per-digit flip, staggered entrance, blinking caret and success glow, built on Nuxt UI's UPinInput."
    />
    <div class="flex min-h-[400px] flex-col items-center justify-center p-6">
      <UCard class="w-full max-w-md">
        <template #header>
          <div class="text-center">
            <p class="text-2xl font-bold text-highlighted">
              Verify Your Code
            </p>
            <p class="text-muted">
              Enter the 6-digit code sent to your device
            </p>
          </div>
        </template>

        <div class="space-y-6">
          <div class="flex justify-center">
            <MAnimatedOTPInput
              v-model="value"
              :length="6"
              @complete="handleComplete"
            />
          </div>

          <motion.div
            v-if="isComplete"
            class="space-y-4 text-center"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }"
          >
            <div
              v-if="isLoading"
              class="flex items-center justify-center space-x-2 text-muted"
            >
              <UIcon
                name="i-lucide-refresh-cw"
                class="h-4 w-4 animate-spin"
              />
              <span>Verifying code...</span>
            </div>
            <div
              v-else
              class="flex items-center justify-center space-x-2 text-success"
            >
              <UIcon
                name="i-lucide-circle-check"
                class="h-4 w-4"
              />
              <span class="font-medium">Code verified successfully!</span>
            </div>
          </motion.div>

          <div class="flex justify-center">
            <UButton
              class="w-full"
              variant="outline"
              @click="handleReset"
            >
              Reset Code
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { ref } from 'vue'

const value = ref('')
const isComplete = ref(false)
const isLoading = ref(false)

function handleComplete(otp: string) {
  value.value = otp
  isComplete.value = true
  isLoading.value = true
  window.setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

function handleReset() {
  value.value = ''
  isComplete.value = false
  isLoading.value = false
}
</script>
