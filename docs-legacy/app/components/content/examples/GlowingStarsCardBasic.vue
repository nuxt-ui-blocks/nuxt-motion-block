<template>
  <MGlowingStarsCard class="max-w-md mx-auto">
    <template #header>
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-bold text-3xl text-[#eaeaea]">
          Premium Features
        </h2>
        <UBadge
          color="primary"
          variant="soft"
        >
          PRO
        </UBadge>
      </div>
    </template>
    <div class="py-6 space-y-6">
      <div class="flex items-start p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-zap"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <h3 class="font-semibold text-white mb-1">
            Lightning Fast
          </h3>
          <p class="text-gray-300 text-sm">
            Optimized performance with instant loading and minimal resource usage
          </p>
        </div>
      </div>
      <div class="flex items-start p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-shield"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <h3 class="font-semibold text-white mb-1">
            Secure & Private
          </h3>
          <p class="text-gray-300 text-sm">
            Enterprise-grade security for your data with end-to-end encryption
          </p>
        </div>
      </div>
      <div class="flex items-start p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-sparkles"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <h3 class="font-semibold text-white mb-1">
            Beautiful Effects
          </h3>
          <p class="text-gray-300 text-sm">
            Stunning animations and visual experiences that captivate users
          </p>
        </div>
      </div>
      <div class="flex items-start p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-globe"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <h3 class="font-semibold text-white mb-1">
            Global Access
          </h3>
          <p class="text-gray-300 text-sm">
            Access your data from anywhere with our worldwide CDN network
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-col sm:flex-row gap-3 mt-6">
        <UButton
          color="primary"
          variant="solid"
          block
          class="flex-1"
        >
          Upgrade Now
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          block
          class="flex-1"
        >
          View Plans
        </UButton>
      </div>
    </template>
  </MGlowingStarsCard>
</template>
