<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MInteractiveGridPattern
      :width="48"
      :height="48"
      :squares-x="30"
      :squares-y="30"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Hover the grid
      </h3>
      <p class="max-w-xs text-sm text-muted">
        Every cell lights up under the pointer
      </p>
    </div>
  </div>
</template>
