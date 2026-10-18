<template>
  <UCard class="relative overflow-hidden">
    <template #header>
      <h2 class="text-xl font-semibold">
        Background Beams
      </h2>
    </template>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Animated background beams effect
    </p>
    <MBackgroundBeams
      class="h-64 w-full"
      :num-paths="25"
      :stroke-opacity="1"
    />
  </UCard>
</template>
