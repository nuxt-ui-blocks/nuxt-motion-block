<template>
  <div class="relative h-48 rounded-xl overflow-hidden border border-default">
    <MBoxesCore
      class="h-full w-full opacity-10"
      :rows="20"
      :cols="15"
      :colors="['#93c5fd', '#f9a8d4']"
      :skew="false"
      :show-plus-signs="false"
      border-color="border-default"
    />
    <div
      class="flex items-center justify-center"
    >
      <div class="text-center bg-default/80 backdrop-blur-sm rounded-lg p-4 shadow-lg relative z-10">
        <h3 class="text-lg font-semibold text-highlighted">
          Minimal Setup
        </h3>
        <p class="text-muted text-sm mt-1">
          Simple configuration with default styling
        </p>
      </div>
    </div>
  </div>
</template>
