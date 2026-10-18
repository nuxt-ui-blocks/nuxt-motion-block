<template>
  <div class="relative h-64 overflow-y-auto overscroll-contain rounded-2xl border border-default bg-default">
    <div class="h-40" />

    <MSvgDrawOnScroll
      path="M10 80 C 30 20, 70 20, 90 80 S 110 20, 130 80"
      view-box="0 0 140 100"
      :stroke-width="2"
      class="mx-auto h-36 w-56 text-primary"
    />

    <div class="h-40" />
  </div>
</template>
