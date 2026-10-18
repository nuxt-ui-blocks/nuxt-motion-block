<template>
  <div class="flex flex-col items-center gap-4">
    <MWaveText
      class="text-2xl font-semibold"
      :amplitude="4"
      text="Subtle"
    />
    <MWaveText
      class="text-2xl font-semibold"
      text="Default"
    />
    <MWaveText
      class="text-2xl font-semibold"
      :amplitude="16"
      text="Exaggerated"
    />
  </div>
</template>
