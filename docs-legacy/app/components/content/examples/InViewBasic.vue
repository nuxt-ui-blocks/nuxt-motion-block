<template>
  <div class="space-y-8 p-6 max-w-3xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Scroll to Reveal
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-lg">
        Content that fades in beautifully when it comes into view
      </p>
    </div>

    <MInView>
      <div class="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
        <div class="flex items-start">
          <div class="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-5 flex-shrink-0">
            <UIcon
              name="i-lucide-eye"
              class="w-7 h-7 text-blue-600 dark:text-blue-400"
            />
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              InView Animation
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              This content smoothly fades in when it enters your viewport, creating a polished
              scrolling experience that draws attention to important elements.
            </p>
          </div>
        </div>
      </div>
    </MInView>

    <MInView>
      <div class="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow mt-8">
        <div class="flex items-start">
          <div class="w-14 h-14 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-5 flex-shrink-0">
            <UIcon
              name="i-lucide-sparkles"
              class="w-7 h-7 text-purple-600 dark:text-purple-400"
            />
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Enhanced Visibility
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Perfect for showcasing features, testimonials, or important information
              that you want to highlight as users scroll through your content.
            </p>
          </div>
        </div>
      </div>
    </MInView>

    <MInView>
      <div class="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow mt-8">
        <div class="flex items-start">
          <div class="w-14 h-14 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mr-5 flex-shrink-0">
            <UIcon
              name="i-lucide-zap"
              class="w-7 h-7 text-green-600 dark:text-green-400"
            />
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Performance Focused
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Optimized for smooth performance with minimal impact on your page load times,
              ensuring a seamless user experience across all devices.
            </p>
          </div>
        </div>
      </div>
    </MInView>
  </div>
</template>
