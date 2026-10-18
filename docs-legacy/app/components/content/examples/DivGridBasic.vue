<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
    <div class="max-w-4xl mx-auto text-center mb-8">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
        <UIcon
          name="i-lucide-grid"
          class="w-5 h-5 text-blue-600 dark:text-blue-400"
        />
        <span class="text-blue-700 dark:text-blue-300 font-medium">Interactive Patterns</span>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Dynamic Grid System
      </h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Experience our dynamic grid layout with interactive cells that respond to user interactions with beautiful ripple effects
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Grid Demo
            </h3>
            <div class="flex justify-center">
              <MDivGrid
                :rows="8"
                :cols="12"
                :cell-size="20"
                class="mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
                :clicked-cell="{ row: 4, col: 6 }"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <UCard class="text-center">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3"
              />
              <h4 class="font-semibold mb-1">
                Click Interaction
              </h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Click any cell to trigger ripple effects
              </p>
            </UCard>

            <UCard class="text-center">
              <UIcon
                name="i-lucide-settings"
                class="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3"
              />
              <h4 class="font-semibold mb-1">
                Customizable
              </h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Adjust rows, columns, and cell sizes
              </p>
            </UCard>
          </div>
        </div>

        <div class="space-y-6">
          <UCard>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Grid Controls
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">Rows: <span class="font-medium">8</span></label>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value="8"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">Columns: <span class="font-medium">12</span></label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value="12"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">Cell Size: <span class="font-medium">20px</span></label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value="20"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div class="pt-2">
                <UButton
                  color="primary"
                  variant="solid"
                  block
                >
                  <UIcon
                    name="i-lucide-refresh-cw"
                    class="w-4 h-4 mr-2"
                  />
                  Reset Grid
                </UButton>
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
                    Game Boards
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Perfect for puzzle and strategy games
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
                    Data Visualization
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Visualize data in grid format
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
                    Interactive Art
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Create dynamic digital art experiences
                  </p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center max-w-2xl mx-auto">
      <p class="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
        <UIcon
          name="i-lucide-mouse-pointer"
          class="w-4 h-4"
        />
        Click on any cell in the grid above to see the ripple effect animation
      </p>
    </div>
  </div>
</template>
