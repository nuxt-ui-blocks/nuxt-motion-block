<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Custom Scroll Velocity
    </h3>
    <MScrollVelocity
      :texts="['Fast Scroll', 'Effect']"
      :velocity="200"
      :damping="30"
      :stiffness="600"
      :num-copies="8"
      class="text-5xl font-bold text-purple-600 dark:text-purple-400"
    />
  </div>
</template>
