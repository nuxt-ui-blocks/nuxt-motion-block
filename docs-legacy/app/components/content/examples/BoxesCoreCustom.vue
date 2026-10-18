<template>
  <div class="relative h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
    <MBoxesCore
      class="h-full w-full opacity-15"
      :rows="40"
      :cols="30"
      :colors="['#fca5a5', '#f97316', '#fde047']"
      :skew="true"
      :show-plus-signs="true"
      border-color="border-rose-200 dark:border-rose-800"
    />
    <div
      class="flex flex-col items-center justify-center text-center p-6"
    >
      <div class="p-6 max-w-md relative z-10">
        <div class="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Special Offer
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Limited time discount on all premium features. Hover over the background to see the animation effect.
        </p>
        <UButton
          color="primary"
          size="lg"
        >
          Claim Offer
        </UButton>
      </div>
    </div>
  </div>
</template>
