<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-12">
    <MTracingBeam :beam-color="['#FF0000', '#00FF00', '#0000FF']">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Custom Tracing Beam
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Showcasing custom beam colors with vibrant red, green, and blue gradients
        </p>
      </div>

      <div class="space-y-12">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Red Section
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            This section is highlighted with a vibrant red beam color. Red is often associated with energy, passion, and urgency,
            making it perfect for drawing attention to important content.
          </p>
          <div class="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <UIcon
              name="i-heroicons-fire"
              class="w-8 h-8 text-red-500 mr-3"
            />
            <span class="text-red-700 dark:text-red-300 font-medium">High Energy Content</span>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Green Section
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            The green beam color represents growth, harmony, and balance. It's often used to indicate positive progress or
            successful outcomes in user interfaces.
          </p>
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-arrow-trending-up"
                class="w-6 h-6 text-green-500 mx-auto mb-2"
              />
              <span class="text-sm text-green-700 dark:text-green-300">Growth</span>
            </div>
            <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-check-badge"
                class="w-6 h-6 text-green-500 mx-auto mb-2"
              />
              <span class="text-sm text-green-700 dark:text-green-300">Success</span>
            </div>
            <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-heart"
                class="w-6 h-6 text-green-500 mx-auto mb-2"
              />
              <span class="text-sm text-green-700 dark:text-green-300">Harmony</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Blue Section
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Blue is associated with trust, stability, and professionalism. The blue beam color provides a sense of reliability
            and calmness to the content it highlights.
          </p>
          <div class="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <UIcon
              name="i-heroicons-shield-check"
              class="w-8 h-8 text-blue-500 mr-3"
            />
            <div>
              <p class="font-medium text-blue-800 dark:text-blue-200">
                Trusted Content
              </p>
              <p class="text-sm text-blue-600 dark:text-blue-400">
                Verified and secure information
              </p>
            </div>
          </div>
        </div>
      </div>
    </MTracingBeam>
  </div>
</template>
