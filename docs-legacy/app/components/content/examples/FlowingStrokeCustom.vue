<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Custom Flowing Stroke
    </h3>
    <MFlowingStroke
      :width="500"
      :height="200"
      :ribbon="25"
      :stripe-inset="6"
      :dash="50"
      :gap="30"
      :speed="2"
    />
  </div>
</template>
