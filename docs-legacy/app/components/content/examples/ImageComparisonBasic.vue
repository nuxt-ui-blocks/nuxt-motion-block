<template>
  <div class="flex justify-center">
    <div class="w-full max-w-3xl">
      <h3 class="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Before & After Comparison
      </h3>
      <MImageComparison class="h-96 w-full rounded-xl overflow-hidden shadow-xl">
        <MImageComparisonImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mountain before editing"
          position="left"
          class="object-cover"
        />
        <MImageComparisonImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mountain after editing"
          position="right"
          class="object-cover"
        />
        <MImageComparisonSlider>
          <template #default>
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
              <UIcon
                name="i-lucide-move-horizontal"
                class="w-5 h-5 text-gray-700"
              />
            </div>
          </template>
        </MImageComparisonSlider>
      </MImageComparison>
      <div class="flex justify-between mt-6 text-sm text-gray-600 dark:text-gray-400">
        <span>Original</span>
        <span>Enhanced</span>
      </div>
      <div class="mt-6 text-center">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Try It Yourself
        </UButton>
      </div>
    </div>
  </div>
</template>
