<template>
  <UCard
    class="relative overflow-hidden max-w-sm"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-red-500 to-orange-500"
      :size="30"
      :transition="{ duration: 2, ease: 'easeInOut' }"
    />
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
          Alert
        </h3>
        <UBadge
          variant="solid"
          color="error"
        >
          !
        </UBadge>
      </div>
    </template>
    <p class="text-gray-600 dark:text-gray-400">
      System maintenance scheduled
    </p>
  </UCard>
</template>
