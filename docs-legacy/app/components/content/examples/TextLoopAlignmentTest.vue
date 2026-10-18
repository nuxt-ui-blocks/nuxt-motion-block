<template>
  <ClientOnly>
    <div class="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-center">
          Text Alignment Test
        </h1>

        <div class="space-y-6">
          <!-- Test 1: Basic inline alignment -->
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p class="text-lg">
              This is a sentence with a
              <MTextLoop
                :items="['small', 'medium', 'large']"
                class="text-blue-600 dark:text-blue-400 font-semibold"
              />
              word in the middle of the text flow.
            </p>
          </div>

          <!-- Test 2: Alignment with different font sizes -->
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p class="text-sm">
              Small text with
              <MTextLoop
                :items="['dynamic', 'changing', 'rotating']"
                class="text-purple-600 dark:text-purple-400 font-medium"
              />
              content.
            </p>
          </div>

          <!-- Test 3: Alignment in a heading -->
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 class="text-2xl font-bold">
              Heading with
              <MTextLoop
                :items="['awesome', 'amazing', 'incredible']"
                class="text-green-600 dark:text-green-400"
              />
              text
            </h2>
          </div>

          <!-- Test 4: Multiple loops in same line -->
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p class="text-base">
              Multiple
              <MTextLoop
                :items="['loops', 'cycles', 'rotations']"
                class="text-red-600 dark:text-red-400 font-semibold"
              />
              in the same
              <MTextLoop
                :items="['sentence', 'line', 'paragraph']"
                class="text-indigo-600 dark:text-indigo-400 font-semibold"
              />
              should align properly.
            </p>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
