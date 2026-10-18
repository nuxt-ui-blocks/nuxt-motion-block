<template>
  <div class="flex flex-col items-center p-8">
    <div class="relative">
      <MGlowEffect
        mode="rotate"
        :colors="['#F59E0B', '#F97316', '#EF4444']"
        blur="strong"
        :scale="1.1"
        :duration="8"
      />
      <div class="relative z-10 p-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-2xl w-80">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-2">
            Premium Plan
          </h3>
          <div class="mb-6">
            <span class="text-5xl font-bold text-white">$49</span>
            <span class="text-white/80">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center text-white/90">
              <UIcon
                name="i-heroicons-check-circle-solid"
                class="w-5 h-5 mr-2 text-white"
              />
              Unlimited projects
            </li>
            <li class="flex items-center text-white/90">
              <UIcon
                name="i-heroicons-check-circle-solid"
                class="w-5 h-5 mr-2 text-white"
              />
              Priority support
            </li>
            <li class="flex items-center text-white/90">
              <UIcon
                name="i-heroicons-check-circle-solid"
                class="w-5 h-5 mr-2 text-white"
              />
              Advanced analytics
            </li>
          </ul>
          <UButton
            size="lg"
            class="w-full bg-white text-amber-600 hover:bg-gray-100 font-bold py-3 rounded-lg transition duration-300"
          >
            Get Started
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
