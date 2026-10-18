<template>
  <div class="space-y-4">
    <MScrollVelocity
      :texts="['Velocity mapping']"
      :velocity="120"
      :num-copies="4"
      :velocity-mapping="{ input: [0, 500], output: [0, 8] }"
      :damping="40"
      :stiffness="500"
      scroller-class="text-3xl font-semibold"
    />
  </div>
</template>
