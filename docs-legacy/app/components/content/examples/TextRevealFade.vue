<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          <MTextReveal
            effect="fade"
            text="Transform Your Digital Experience"
            class="block"
          />
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          <MTextReveal
            effect="fade"
            text="Create stunning interfaces with our collection of animated components that enhance user engagement and drive results."
            :stagger="0.03"
          />
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            <MTextReveal
              effect="fade"
              text="Key Features"
            />
          </h2>

          <ul class="space-y-4">
            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  />
                </div>
              </div>
              <span class="ml-3 text-gray-700 dark:text-gray-300">
                <MTextReveal
                  effect="fade"
                  text="Lightning fast performance with optimized load times"
                  :stagger="0.02"
                />
              </span>
            </li>

            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-purple-600 dark:text-purple-400"
                  />
                </div>
              </div>
              <span class="ml-3 text-gray-700 dark:text-gray-300">
                <MTextReveal
                  effect="fade"
                  text="Beautiful animations that captivate your audience"
                  :stagger="0.02"
                />
              </span>
            </li>

            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-green-600 dark:text-green-400"
                  />
                </div>
              </div>
              <span class="ml-3 text-gray-700 dark:text-gray-300">
                <MTextReveal
                  effect="fade"
                  text="Easy integration with clean, well-documented code"
                  :stagger="0.02"
                />
              </span>
            </li>
          </ul>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            <MTextReveal
              effect="fade"
              text="Why Choose Us?"
            />
          </h3>

          <div class="space-y-4">
            <p class="text-gray-600 dark:text-gray-400">
              <MTextReveal
                effect="fade"
                text="Our platform offers cutting-edge solutions that help you achieve your goals faster."
                :stagger="0.02"
              />
            </p>

            <p class="text-gray-600 dark:text-gray-400">
              <MTextReveal
                effect="fade"
                text="With 99.9% uptime and 24/7 support, you can trust us to deliver."
                :stagger="0.02"
              />
            </p>
          </div>

          <div class="mt-6">
            <UButton
              size="lg"
              color="primary"
            >
              <MTextReveal
                effect="fade"
                text="Get Started Today"
              />
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
