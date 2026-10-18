<template>
  <MScrollProgress class="bg-primary fixed top-0 z-50" />
  <div class="space-y-8 p-8 max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Scroll Progress Indicator
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-lg">
        Track your reading progress with this visual indicator that updates as you scroll
      </p>
    </div>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          Introduction
        </h3>
      </template>
      <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
        The scroll progress indicator is a subtle yet effective way to show users how much of a page
        they've read and how much remains. This can be particularly useful for long articles,
        documentation, or any content where users need to track their progress.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          Benefits
        </h3>
      </template>
      <ul class="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400 text-lg">
        <li class="pl-2">
          Improves user experience by providing visual feedback
        </li>
        <li class="pl-2">
          Helps users track their progress through long content
        </li>
        <li class="pl-2">
          Encourages completion of articles or forms
        </li>
        <li class="pl-2">
          Subtle animation that doesn't distract from content
        </li>
        <li class="pl-2">
          Works seamlessly across all device sizes
        </li>
      </ul>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          Implementation
        </h3>
      </template>
      <p class="text-gray-600 dark:text-gray-400 mb-6 text-lg">
        The scroll progress indicator is easy to implement and customize:
      </p>
      <div class="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
        <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">&lt;MScrollProgress class="bg-primary fixed top-0 z-50" /&gt;</pre>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          Advanced Features
        </h3>
      </template>
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          Customize the appearance and behavior to match your design system:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-2">
              Colors
            </h4>
            <p class="text-sm text-blue-600 dark:text-blue-400">
              Match your brand colors
            </p>
          </div>
          <div class="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">
              Height
            </h4>
            <p class="text-sm text-purple-600 dark:text-purple-400">
              Adjust thickness
            </p>
          </div>
          <div class="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">
              Position
            </h4>
            <p class="text-sm text-green-600 dark:text-green-400">
              Top or bottom
            </p>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          Conclusion
        </h3>
      </template>
      <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
        Adding a scroll progress indicator to your website or application is a simple way to
        enhance the user experience. It provides valuable feedback and helps users navigate
        through your content more effectively. Try implementing it today to see the difference!
      </p>
    </UCard>

    <div class="text-center py-8">
      <UButton
        color="primary"
        variant="solid"
        size="lg"
      >
        <UIcon
          name="i-lucide-download"
          class="w-5 h-5 mr-2"
        />
        Download Component
      </UButton>
    </div>
  </div>
</template>
