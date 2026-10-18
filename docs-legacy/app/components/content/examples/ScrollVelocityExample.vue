<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Scroll Velocity
    </h3>
    <MScrollVelocity
      :texts="['Nuxt Motion Block', 'Scroll Down']"
      :velocity="100"
      :damping="50"
      :stiffness="400"
      :num-copies="6"
    />
  </div>
</template>
