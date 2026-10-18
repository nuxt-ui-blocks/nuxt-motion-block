<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-3">
    <MHolographicFoil
      class="h-56 w-full"
      pattern="oil"
      use-device-orientation
    >
      <div class="flex h-full flex-col items-center justify-center gap-1 p-6 text-center">
        <p class="text-lg font-semibold text-white">
          Tilt your device
        </p>
        <p class="text-sm text-white/60">
          On iOS a permission button appears on the card.
        </p>
      </div>
    </MHolographicFoil>
    <p class="text-center text-xs text-muted">
      On desktop there is no prompt to answer: orientation events already
      arrive, so the card responds as soon as it mounts.
    </p>
  </div>
</template>
