<template>
  <div class="relative h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <MBoxesCore
      class="h-full w-full opacity-20"
      :rows="30"
      :cols="25"
      :colors="['#93c5fd', '#60a5fa', '#a5b4fc']"
      :skew="true"
      :show-plus-signs="false"
      border-color="border-default"
    />
    <div
      class="flex flex-col items-center justify-center text-center p-8"
    >
      <div class="p-8 max-w-2xl relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Modern Web Experiences
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Create stunning interfaces with our collection of animated components
        </p>
        <div class="flex gap-4 justify-center">
          <UButton
            size="lg"
            color="primary"
          >
            Start Building
          </UButton>
          <UButton
            size="lg"
            color="neutral"
          >
            View Demo
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
