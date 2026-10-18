<template>
  <UCard
    class="relative overflow-hidden max-w-sm"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-emerald-500 to-teal-500"
      :size="25"
      :transition="{ duration: 1.5, ease: 'easeInOut' }"
    />
    <template #header>
      <h3 class="text-lg font-bold">
        Compact Badge
      </h3>
    </template>
    <p class="text-gray-600 dark:text-gray-400 text-sm">
      Smaller border trail effect
    </p>
  </UCard>
</template>
