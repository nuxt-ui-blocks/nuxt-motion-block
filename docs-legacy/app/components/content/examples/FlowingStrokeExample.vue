<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Flowing Stroke
    </h3>
    <MFlowingStroke
      :width="400"
      :height="150"
      :ribbon="20"
      :dash="40"
      :gap="25"
      :speed="1.5"
    />
  </div>
</template>
