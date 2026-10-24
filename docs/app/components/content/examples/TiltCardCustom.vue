<template>
  <div class="flex min-h-[380px] w-full items-center justify-center p-6">
    <MTiltCard
      :glare-opacity="0.35"
      :max-tilt="16"
      :parallax="true"
      class="w-72 overflow-hidden rounded-3xl border border-default bg-black shadow-xl"
    >
      <div class="relative h-80">
        <img
          alt="A road at night"
          class="absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] object-cover opacity-80"
          data-tilt-depth="0.15"
          draggable="false"
          src="https://picsum.photos/seed/tilt-night/640/640"
        >

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div
          class="absolute inset-x-5 bottom-5"
          data-tilt-depth="0.55"
        >
          <p class="text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
            Field notes
          </p>
          <p class="mt-1 text-lg font-semibold text-white">
            Night drive
          </p>
          <p class="mt-2 text-sm text-white/70">
            Each layer moves at its own depth, so the photo, the copy and the
            badge separate as the card tilts.
          </p>
        </div>

        <span
          class="absolute top-4 right-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur"
          data-tilt-depth="0.9"
        >03</span>
      </div>
    </MTiltCard>
  </div>
</template>
