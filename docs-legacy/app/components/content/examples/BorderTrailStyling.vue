<template>
  <UCard
    class="relative overflow-hidden max-w-sm"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg"
      :size="30"
      :transition="{ duration: 2, ease: 'easeInOut' }"
    />
    <template #header>
      <h3 class="text-lg font-bold">
        Custom Gradient
      </h3>
    </template>
    <p class="text-gray-600 dark:text-gray-400 text-sm">
      Custom color gradient with rounded corners
    </p>
  </UCard>
</template>
