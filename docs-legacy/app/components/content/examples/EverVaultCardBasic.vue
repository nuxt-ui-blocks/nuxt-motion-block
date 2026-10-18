<template>
  <MEverVaultCard class="max-w-md mx-auto">
    <div class="space-y-8 p-8">
      <div class="flex justify-center">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
          <UIcon
            name="i-lucide-lock"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <div class="text-center">
        <h3 class="text-3xl font-bold text-white mb-4">
          Secure Vault
        </h3>
        <p class="text-gray-300 mb-8">
          Enterprise-grade encryption and security protection for your most sensitive data
        </p>
      </div>
      <div class="space-y-4">
        <div class="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
          <UIcon
            name="i-lucide-shield-check"
            class="w-6 h-6 text-green-400 mr-4"
          />
          <div>
            <h4 class="font-semibold text-white">
              256-bit AES Encryption
            </h4>
            <p class="text-gray-300 text-sm">
              Military-grade security for your data
            </p>
          </div>
        </div>
        <div class="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
          <UIcon
            name="i-lucide-key"
            class="w-6 h-6 text-blue-400 mr-4"
          />
          <div>
            <h4 class="font-semibold text-white">
              Zero-Knowledge Architecture
            </h4>
            <p class="text-gray-300 text-sm">
              We can't see your data, ever
            </p>
          </div>
        </div>
        <div class="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
          <UIcon
            name="i-lucide-globe"
            class="w-6 h-6 text-purple-400 mr-4"
          />
          <div>
            <h4 class="font-semibold text-white">
              Global Compliance
            </h4>
            <p class="text-gray-300 text-sm">
              GDPR, HIPAA, and SOC2 compliant
            </p>
          </div>
        </div>
      </div>
      <div class="pt-4 flex flex-col sm:flex-row gap-3">
        <UButton
          color="primary"
          variant="solid"
          block
        >
          Access Vault
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          block
        >
          Learn More
        </UButton>
      </div>
    </div>
  </MEverVaultCard>
</template>
