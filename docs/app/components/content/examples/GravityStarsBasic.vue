<template>
  <div class="flex w-full items-center justify-center px-6 py-10">
    <MGravityStars
      class="h-[380px] w-full max-w-2xl rounded-2xl bg-[#070b16] ring-1 ring-white/10"
      color="#e8eaf0"
    >
      <div class="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <span class="rounded-full border border-white/15 px-3 py-1 text-[11px] tracking-[0.2em] text-white/50 uppercase">
          Interactive
        </span>
        <h2 class="text-2xl font-semibold text-white">
          Move your cursor
        </h2>
        <p class="max-w-xs text-sm leading-relaxed text-white/60">
          Stars fall towards the pointer, swirl past it and settle back into
          their drift.
        </p>
      </div>
    </MGravityStars>
  </div>
</template>
