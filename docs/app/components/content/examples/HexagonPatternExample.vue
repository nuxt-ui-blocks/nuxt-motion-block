<template>
  <div class="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-xl border border-default bg-default">
    <MHexagonPattern
      :radius="26"
      :gap="4"
      :hexagons="[[1, 1], [4, 4], [2, 2], [3, 4], [5, 4], [8, 2], [6, 3], [8, 5], [10, 10]]"
      class="[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
    />
    <div class="relative z-10 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Hexagon Pattern
      </h3>
      <p class="max-w-xs text-sm text-muted">
        A honeycomb tile, with a handful of cells filled in
      </p>
    </div>
  </div>
</template>
