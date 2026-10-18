<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
    <div class="max-w-4xl mx-auto text-center mb-8">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
        <UIcon
          name="i-lucide-sun"
          class="w-5 h-5 text-blue-600 dark:text-blue-400"
        />
        <span class="text-blue-700 dark:text-blue-300 font-medium">Lighting Effects</span>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Directional Light Showcase
      </h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Create realistic lighting effects with directional light sources that illuminate your content and add depth to your UI
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="relative h-80 w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 border border-gray-200 dark:border-gray-700">
          <MDirectionalLight class="absolute inset-0" />
          <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
            <div class="mb-6">
              <div class="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mx-auto shadow-lg">
                <UIcon
                  name="i-lucide-sun"
                  class="w-10 h-10 text-white"
                />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Dynamic Lighting
            </h3>
            <p class="text-gray-700 dark:text-gray-300 max-w-md mb-6">
              Realistic lighting effects that respond to user interactions and create immersive experiences
            </p>
            <UButton
              color="primary"
              variant="solid"
              size="md"
            >
              <UIcon
                name="i-lucide-sliders"
                class="w-4 h-4 mr-2"
              />
              Adjust Lighting
            </UButton>
          </div>
        </div>

        <div class="space-y-6">
          <UCard>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Lighting Controls
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-700 dark:text-gray-300">Intensity</span>
                  <span class="text-gray-900 dark:text-white font-medium">75%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="75"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-700 dark:text-gray-300">Angle</span>
                  <span class="text-gray-900 dark:text-white font-medium">45°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value="45"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-700 dark:text-gray-300">Color Temperature</span>
                  <span class="text-gray-900 dark:text-white font-medium">Warm</span>
                </div>
                <div class="flex gap-2">
                  <div class="w-8 h-8 rounded-full bg-blue-400 cursor-pointer border-2 border-transparent hover:border-blue-600" />
                  <div class="w-8 h-8 rounded-full bg-yellow-400 cursor-pointer border-2 border-yellow-600" />
                  <div class="w-8 h-8 rounded-full bg-orange-400 cursor-pointer border-2 border-transparent hover:border-orange-600" />
                  <div class="w-8 h-8 rounded-full bg-red-400 cursor-pointer border-2 border-transparent hover:border-red-600" />
                </div>
              </div>
            </div>
          </UCard>

          <UCard>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Use Cases
            </h3>
            <div class="space-y-3">
              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    Product Showcases
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Highlight products with realistic lighting
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    Interactive Elements
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Create depth and focus for UI components
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    Visual Storytelling
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Enhance narratives with dynamic lighting effects
                  </p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
