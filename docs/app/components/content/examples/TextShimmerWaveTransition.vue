<template>
  <div class="flex flex-col items-center gap-3 p-8">
    <MTextShimmerWave
      text="SPRINGY"
      :spread="3"
      :transition="{ ease: 'backOut' }"
      class="text-3xl font-bold"
    />
    <p class="text-sm text-muted">
      A custom easing and a wider spread give the wave a bouncier character.
    </p>
  </div>
</template>
