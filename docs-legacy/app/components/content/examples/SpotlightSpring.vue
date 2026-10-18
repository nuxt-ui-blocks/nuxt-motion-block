<template>
  <div class="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
    <MSpotlight :spring-options="{ bounce: 0.5, stiffness: 300 }" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h3 class="text-2xl font-bold">
        Bouncy Spotlight
      </h3>
    </div>
  </div>
</template>
