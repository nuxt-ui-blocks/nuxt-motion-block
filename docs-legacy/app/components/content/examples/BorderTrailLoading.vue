<template>
  <UCard
    class="relative overflow-hidden max-w-sm"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-amber-500 to-orange-500"
      :size="35"
      :transition="{ duration: 2.5, ease: 'easeInOut' }"
    />
    <div class="flex flex-col items-center text-center">
      <div class="mb-4">
        <UIcon
          name="i-lucide-loader"
          class="w-12 h-12 text-amber-500 animate-spin"
        />
      </div>
      <h3 class="text-lg font-bold">
        Processing
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Your request is being processed. This usually takes a few seconds.
      </p>
    </div>
  </UCard>
</template>
