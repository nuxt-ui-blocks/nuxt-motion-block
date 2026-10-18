<template>
  <div class="flex flex-col items-center p-8">
    <div class="relative">
      <MGlowEffect />
      <div class="relative z-10 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl">
        <h3 class="text-2xl font-bold text-white mb-3">
          Basic Glow Effect
        </h3>
        <p class="text-primary mb-4">
          This element has a beautiful glow effect
        </p>
        <UButton
          variant="solid"
          size="sm"
          class="bg-default text-primary hover:bg-muted"
        >
          Get Started
        </UButton>
      </div>
    </div>
  </div>
</template>
