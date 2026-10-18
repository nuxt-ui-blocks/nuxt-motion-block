<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          <MTextReveal
            effect="slide"
            direction="up"
            :duration="0.8"
            text="Welcome to Our Platform"
            class="block"
          />
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          <MTextReveal
            effect="slide"
            direction="up"
            :duration="0.8"
            text="Discover amazing features and boost your productivity with our cutting-edge solutions."
            :stagger="0.03"
          />
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <UIcon
                name="i-lucide-zap"
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextReveal
              effect="slide"
              direction="up"
              :duration="0.8"
              text="Lightning Fast"
            />
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            <MTextReveal
              effect="slide"
              direction="up"
              :duration="0.8"
              text="Optimized for performance"
              :stagger="0.02"
            />
          </p>
        </UCard>

        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <UIcon
                name="i-lucide-sparkles"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextReveal
              effect="slide"
              direction="up"
              :duration="0.8"
              text="Beautiful Effects"
            />
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            <MTextReveal
              effect="slide"
              direction="up"
              :duration="0.8"
              text="Stunning animations"
              :stagger="0.02"
            />
          </p>
        </UCard>

        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <UIcon
                name="i-lucide-code"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextReveal
              effect="slide"
              direction="up"
              :duration="0.8"
              text="Easy Integration"
            />
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            <MTextReveal
              effect="slide"
              direction="up"
              :duration="0.8"
              text="Simple to implement"
              :stagger="0.02"
            />
          </p>
        </UCard>
      </div>

      <div class="mt-12 text-center">
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3"
        >
          <MTextReveal
            effect="slide"
            direction="up"
            :duration="0.8"
            text="Get Started Now"
          />
        </UButton>
      </div>
    </div>
  </div>
</template>
