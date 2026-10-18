<template>
  <div class="relative h-64 rounded-xl overflow-hidden border border-default">
    <MBoxesCore
      class="h-full w-full"
      :rows="50"
      :cols="30"
      :skew="true"
      :colors="['#93c5fd', '#f9a8d4', '#86efac', '#fde047', '#fca5a5', '#d8b4fe']"
      :show-plus-signs="true"
      border-color="border-primary/20 dark:border-primary/80"
    />
    <div
      class="relative z-10 flex flex-col items-center justify-center p-4"
      style="height: 100%;"
    >
      <div class="bg-default/90 backdrop-blur-sm rounded-lg p-4 shadow-lg text-center">
        <h3 class="text-lg font-bold text-highlighted">
          Boxes Core Test
        </h3>
        <p class="text-muted mt-1 text-sm">
          Hover over the grid to see animations
        </p>
      </div>
    </div>
  </div>
</template>
