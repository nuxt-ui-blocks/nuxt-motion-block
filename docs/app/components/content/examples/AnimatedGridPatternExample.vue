<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MAnimatedGridPattern
      :num-squares="40"
      :duration="4"
      class="[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Animated Grid
      </h3>
      <p class="max-w-xs text-sm text-muted">
        Squares light up at random across a faint lattice
      </p>
    </div>
  </div>
</template>
