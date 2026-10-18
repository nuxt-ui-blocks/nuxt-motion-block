<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-4 text-highlighted">
        Security Verification
      </h2>
      <MTextScramble
        text="Generating secure token..."
        class="text-xl text-muted mb-6"
        :duration="1.5"
      />

      <div class="bg-default rounded-xl shadow-lg p-6 max-w-md w-full border border-default">
        <div class="flex items-center justify-between mb-6">
          <span class="text-highlighted font-semibold">Verification Status</span>
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
          <div class="flex justify-between items-center p-3 bg-elevated rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-lock"
                class="w-5 h-5 text-primary mr-3"
              />
              <span class="text-default">Encryption</span>
            </div>
            <MTextScramble
              text="AES-256"
              class="font-mono text-sm font-medium"
              :duration="1"
            />
          </div>

          <div class="flex justify-between items-center p-3 bg-elevated rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-shield"
                class="w-5 h-5 text-purple-500 mr-3"
              />
              <span class="text-default">Protocol</span>
            </div>
            <MTextScramble
              text="TLS 1.3"
              class="font-mono text-sm font-medium"
              :duration="1.2"
            />
          </div>

          <div class="flex justify-between items-center p-3 bg-elevated rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-key"
                class="w-5 h-5 text-green-500 mr-3"
              />
              <span class="text-default">Token</span>
            </div>
            <MTextScramble
              text="X9K2-PQ4R-7M8N"
              class="font-mono text-sm font-medium"
              :duration="1.4"
            />
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-default">
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
