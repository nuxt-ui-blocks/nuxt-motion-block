<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        Glowing Effect
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Add subtle glowing effects to elements for enhanced visual appeal and depth
      </p>
    </div>

    <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-56 w-full max-w-md mx-auto">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        class="rounded-xl"
      />
      <div class="relative z-10 h-full flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-bold text-white mb-2">
            Glowing Card
          </h3>
          <p class="text-slate-400 text-sm">
            Subtle glow effect that enhances visual hierarchy
          </p>
        </div>

        <div class="flex gap-3">
          <UButton
            color="white"
            variant="solid"
            size="sm"
          >
            Action
          </UButton>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
          >
            Learn More
          </UButton>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-sliders"
          class="w-4 h-4 mr-2"
        />
        Customize Glow
      </UButton>
    </div>
  </div>
</template>
