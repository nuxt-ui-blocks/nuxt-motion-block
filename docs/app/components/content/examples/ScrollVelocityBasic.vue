<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-highlighted">
        Scroll Velocity
      </h3>
      <p class="text-muted">
        Dynamic text effects that respond to scroll speed for engaging parallax experiences
      </p>
    </div>

    <div class="bg-default rounded-lg p-6 shadow">
      <MScrollVelocity
        :texts="['Fast Scroll', 'Medium Speed', 'Slow Motion']"
        :velocity="75"
        class="text-3xl font-bold text-center"
      />
    </div>

    <div class="mt-6 flex justify-center">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-mouse"
          class="w-4 h-4 mr-2"
        />
        Try Scrolling
      </UButton>
    </div>
  </div>
</template>
