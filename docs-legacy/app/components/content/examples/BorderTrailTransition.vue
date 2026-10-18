<template>
  <UCard
    class="relative overflow-hidden max-w-sm"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-purple-500 to-pink-500"
      :size="35"
      :transition="{ duration: 6, ease: 'easeInOut' }"
    />
    <template #header>
      <h3 class="text-lg font-bold">
        Slow Animation
      </h3>
    </template>
    <p class="text-gray-600 dark:text-gray-400 text-sm">
      Slower, smoother transition effect
    </p>
  </UCard>
</template>
