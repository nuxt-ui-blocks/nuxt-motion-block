<template>
  <UContainer class="min-h-screen relative">
    <MDottedGlowBackground
      :gap="16"
      :radius="2"
      color-light-var="--color-gray-900"
      color-dark-var="--color-gray-100"
      glow-color-light-var="--color-primary-500"
      glow-color-dark-var="--color-primary-400"
      class="background"
    />

    <div class="relative z-10 py-12">
      <UCard class="max-w-2xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
        <template #header>
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to Nuxt UI
            </h1>
            <UColorModeButton />
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
