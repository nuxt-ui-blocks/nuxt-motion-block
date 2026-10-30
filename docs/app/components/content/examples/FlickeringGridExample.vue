<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MFlickeringGrid
      class="absolute inset-0"
      :square-size="4"
      :grid-gap="6"
      :flicker-chance="0.3"
      color="#6b7280"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Flickering Grid
      </h3>
      <p class="max-w-xs text-sm text-muted">
        A canvas of squares that keeps re-rolling its own opacity
      </p>
    </div>
  </div>
</template>
