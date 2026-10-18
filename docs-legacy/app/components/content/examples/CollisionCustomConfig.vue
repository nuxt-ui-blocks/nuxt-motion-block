<template>
  <MCollisionBackgroundBeams
    :beams="[
      {
        initialX: 150,
        translateX: 150,
        duration: 3,
        delay: 1,
        repeatDelay: 2,
      },
      {
        initialX: 400,
        translateX: 400,
        duration: 6,
        delay: 2,
        repeatDelay: 4,
        className: 'h-8',
      },
      {
        initialX: 650,
        translateX: 650,
        duration: 4,
        delay: 0,
        repeatDelay: 3,
        rotate: 15,
      },
    ]"
    class="h-64 w-full rounded-lg overflow-hidden"
  >
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-lg mb-2">
          Custom Timing
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Beams with custom timing and rotation
        </p>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
