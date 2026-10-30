<template>
  <div class="w-full py-6">
    <div class="relative h-72 w-full overflow-hidden rounded-xl border border-default bg-neutral-950">
      <MLightRays
        color="#7dd3fc"
        :count="22"
        :spread="0.9"
        :speed="0.8"
      >
        <div class="flex h-full flex-col items-center justify-center gap-2 text-center">
          <p class="text-xs uppercase tracking-[0.3em] text-white/50">
            Stage light
          </p>
          <p class="text-3xl font-semibold text-white">
            Shine from above
          </p>
        </div>
      </MLightRays>
    </div>
  </div>
</template>
