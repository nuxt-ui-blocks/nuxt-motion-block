<template>
  <div class="relative min-h-screen">
    <MBackgroundRippleEffect
      :rows="10"
      :cols="20"
      :cell-size="44"
    />

    <div class="relative z-10 p-8">
      <UContainer>
        <UCard class="backdrop-blur-sm bg-white/85 dark:bg-gray-900/85 border">
          <template #header>
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Tailwind CSS 4 Ripple
              </h1>
              <UColorModeButton />
            </div>
          </template>

          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Click the background to see the new Tailwind 4 ripple effect!
          </p>
        </UCard>
      </UContainer>
    </div>
  </div>
</template>
