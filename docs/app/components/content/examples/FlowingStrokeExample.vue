<template>
  <div class="p-6 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
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
