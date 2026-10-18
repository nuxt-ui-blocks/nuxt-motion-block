<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Security Verification
      </h2>
      <MTextScramble
        text="Generating secure token..."
        class="text-xl text-gray-600 dark:text-gray-300 mb-6"
        :duration="1.5"
      />

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <span class="text-gray-900 dark:text-white font-semibold">Verification Status</span>
          <UBadge
            color="success"
            variant="soft"
          >
            <UIcon
              name="i-lucide-shield-check"
              class="w-4 h-4 mr-1"
            />
            Secure
          </UBadge>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-lock"
                class="w-5 h-5 text-blue-500 mr-3"
              />
              <span class="text-gray-700 dark:text-gray-300">Encryption</span>
            </div>
            <MTextScramble
              text="AES-256"
              class="font-mono text-sm font-medium"
              :duration="1"
            />
          </div>

          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-shield"
                class="w-5 h-5 text-purple-500 mr-3"
              />
              <span class="text-gray-700 dark:text-gray-300">Protocol</span>
            </div>
            <MTextScramble
              text="TLS 1.3"
              class="font-mono text-sm font-medium"
              :duration="1.2"
            />
          </div>

          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-key"
                class="w-5 h-5 text-green-500 mr-3"
              />
              <span class="text-gray-700 dark:text-gray-300">Token</span>
            </div>
            <MTextScramble
              text="X9K2-PQ4R-7M8N"
              class="font-mono text-sm font-medium"
              :duration="1.4"
            />
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <UButton
            color="primary"
            variant="solid"
            block
            @click="regenerateToken"
          >
            <UIcon
              name="i-lucide-refresh-cw"
              class="w-4 h-4 mr-2"
            />
            Regenerate Token
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const regenerateToken = () => {
  // In a real implementation, this would trigger token regeneration
  window.location.reload()
}
</script>
