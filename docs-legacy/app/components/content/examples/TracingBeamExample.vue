<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-12">
    <MTracingBeam>
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          The Future of Web Development
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Exploring the latest trends and technologies shaping the web development landscape
        </p>
      </div>

      <div class="space-y-12">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Introduction to Modern Frameworks
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            The web development landscape has evolved dramatically over the past decade. With the rise of modern frameworks like Vue.js, React, and Angular,
            developers now have powerful tools at their disposal to build complex, interactive applications.
          </p>
          <div class="flex items-center mt-6">
            <UAvatar
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Author"
              size="md"
              class="mr-4"
            />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">
                Alex Johnson
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Senior Developer
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 class="text-2xl font-bold mb-4">
            Why Vue 3 is Leading the Pack
          </h2>
          <p class="mb-4">
            Vue 3's Composition API has revolutionized how developers approach component architecture. Its flexibility and ease of use make it an excellent
            choice for both beginners and experienced developers.
          </p>
          <div class="flex items-center justify-between mt-6">
            <div class="flex items-center">
              <UIcon
                name="i-heroicons-lightning-bolt"
                class="w-5 h-5 mr-2"
              />
              <span>Performance Focused</span>
            </div>
            <UButton
              color="neutral"
              variant="solid"
              size="sm"
            >
              Learn More
            </UButton>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            The Rise of Server-Side Rendering
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Server-side rendering (SSR) has become increasingly popular due to its SEO benefits and improved initial load performance.
                Frameworks like Nuxt.js and Next.js have made SSR more accessible than ever.
              </p>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 text-green-500 mr-2"
                  />
                  <span>Faster initial page loads</span>
                </li>
                <li class="flex items-center">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 text-green-500 mr-2"
                  />
                  <span>Better SEO performance</span>
                </li>
                <li class="flex items-center">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 text-green-500 mr-2"
                  />
                  <span>Improved accessibility</span>
                </li>
              </ul>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center">
              <div class="text-center">
                <UIcon
                  name="i-heroicons-server"
                  class="w-12 h-12 text-gray-500 dark:text-gray-400 mx-auto mb-2"
                />
                <p class="text-gray-500 dark:text-gray-400">
                  SSR Architecture
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conclusion
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            As we look toward the future, it's clear that web development will continue to evolve rapidly. Staying current with these trends and
            technologies will be crucial for developers who want to build cutting-edge applications.
          </p>
          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p class="text-blue-800 dark:text-blue-200">
              <span class="font-semibold">Tip:</span> Consider experimenting with these technologies in your next project to see the benefits firsthand.
            </p>
          </div>
        </div>
      </div>
    </MTracingBeam>
  </div>
</template>
