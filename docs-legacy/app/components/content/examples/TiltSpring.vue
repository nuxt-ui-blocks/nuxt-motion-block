<template>
  <MTilt
    :rotation-factor="15"
    :spring-options="{ stiffness: 200, damping: 15 }"
  >
    <div class="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-2">
        Custom Spring
      </h3>
      <p>This card has custom spring animation properties.</p>
    </div>
  </MTilt>
</template>
