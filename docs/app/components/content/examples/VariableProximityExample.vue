<template>
  <div class="p-6 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      Variable Proximity
    </h3>
    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <div
      class="relative"
      style="font-family: 'Inter var', 'Inter', sans-serif;"
    >
      <MVariableProximity
        label="Hover me! Nuxt Motion Block"
        class="text-4xl"
        from-font-variation-settings="'wght' 400, 'opsz' 9"
        to-font-variation-settings="'wght' 1000, 'opsz' 40"
        :radius="120"
        falloff="linear"
      />
    </div>
  </div>
</template>
