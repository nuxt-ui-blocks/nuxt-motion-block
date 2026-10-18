<template>
  <MGlareCard class="w-80 h-96">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">
          Product Card
        </h2>
        <UBadge
          variant="subtle"
          color="primary"
        >
          New
        </UBadge>
      </div>
    </template>

    <div class="text-center space-y-4">
      <div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
      <h3 class="text-xl font-bold text-white">
        Premium Widget
      </h3>
      <p class="text-slate-400">
        High-quality widget with advanced features and durable construction.
      </p>
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-white">$29.99</span>
        <UButton
          color="primary"
          size="sm"
        >
          Add to Cart
        </UButton>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between text-sm text-slate-400">
        <span>4.8 ★</span>
        <span>128 reviews</span>
      </div>
    </template>
  </MGlareCard>
</template>
