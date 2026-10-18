<template>
  <MCollisionBackgroundBeams
    :beams="[
      {
        initialX: 100,
        translateX: 100,
        duration: 5,
        fromColor: 'from-red-500',
        viaColor: 'via-orange-500',
        toColor: 'to-transparent',
      },
      {
        initialX: 300,
        translateX: 300,
        duration: 7,
        fromColor: 'from-blue-500',
        viaColor: 'via-cyan-500',
        toColor: 'to-transparent',
      },
      {
        initialX: 500,
        translateX: 500,
        duration: 4,
        fromColor: 'from-green-500',
        viaColor: 'via-emerald-500',
        toColor: 'to-transparent',
      },
    ]"
    class="h-64 w-full rounded-lg overflow-hidden"
  >
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-lg mb-2">
          Custom Colors
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Beams with custom gradients
        </p>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
