<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MStripedPattern
      :angle="45"
      :width="1"
      :gap="12"
    >
      <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
        <h3 class="text-2xl font-bold text-highlighted">
          Striped Pattern
        </h3>
        <p class="max-w-xs text-sm text-muted">
          A single repeating gradient, so the whole backdrop costs one paint
        </p>
      </div>
    </MStripedPattern>
  </div>
</template>
