<template>
  <MCollisionBackgroundBeams class="h-96 w-full rounded-xl overflow-hidden">
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-xl text-center max-w-md mx-4">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
          <UIcon
            name="i-lucide-zap"
            class="w-10 h-10 text-white"
          />
        </div>
        <h3 class="font-bold text-3xl mb-4 text-gray-900 dark:text-white">
          Collision Effect
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Experience dynamic beam collisions that create stunning visual interactions as they intersect
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
          >
            Watch Beams Collide
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
          >
            Learn More
          </UButton>
        </div>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
