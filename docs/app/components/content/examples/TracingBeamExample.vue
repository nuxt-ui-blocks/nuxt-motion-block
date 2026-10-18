<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-12">
    <MTracingBeam>
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-highlighted mb-4">
          The Future of Web Development
        </h1>
        <p class="text-xl text-muted">
          Exploring the latest trends and technologies shaping the web development landscape
        </p>
      </div>

      <div class="space-y-12">
        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <h2 class="text-2xl font-bold text-highlighted mb-4">
            Introduction to Modern Frameworks
          </h2>
          <p class="text-muted mb-4">
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
              <p class="font-medium text-highlighted">
                Alex Johnson
              </p>
              <p class="text-sm text-muted">
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

        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <h2 class="text-2xl font-bold text-highlighted mb-4">
            The Rise of Server-Side Rendering
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-muted mb-4">
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
            <div class="bg-muted rounded-lg p-4 flex items-center justify-center">
              <div class="text-center">
                <UIcon
                  name="i-heroicons-server"
                  class="w-12 h-12 text-muted mx-auto mb-2"
                />
                <p class="text-muted">
                  SSR Architecture
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <h2 class="text-2xl font-bold text-highlighted mb-4">
            Conclusion
          </h2>
          <p class="text-muted mb-4">
            As we look toward the future, it's clear that web development will continue to evolve rapidly. Staying current with these trends and
            technologies will be crucial for developers who want to build cutting-edge applications.
          </p>
          <div class="mt-6 p-4 bg-primary/5 dark:bg-primary/20 rounded-lg border border-primary/20 dark:border-primary/80">
            <p class="text-primary">
              <span class="font-semibold">Tip:</span> Consider experimenting with these technologies in your next project to see the benefits firsthand.
            </p>
          </div>
        </div>
      </div>
    </MTracingBeam>
  </div>
</template>
