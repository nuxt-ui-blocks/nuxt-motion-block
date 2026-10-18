<template>
  <div class="p-6 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
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
