<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MParticles
      class="absolute inset-0"
      :quantity="120"
      :size="0.8"
      :staticity="40"
      :ease="60"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Particles
      </h3>
      <p class="max-w-xs text-sm text-muted">
        Move your pointer across the field and the dots scatter
      </p>
    </div>
  </div>
</template>
