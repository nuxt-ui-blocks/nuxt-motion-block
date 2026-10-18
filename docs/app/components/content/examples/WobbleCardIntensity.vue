<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <MWobbleCard
      class="h-44"
      :intensity="4"
      :speed="400"
    >
      <template #header>
        <p class="text-xs font-medium uppercase tracking-wide text-muted">
          intensity=4
        </p>
      </template>

      <h3 class="font-semibold text-highlighted">
        Subtle
      </h3>
      <p class="mt-1 text-sm text-muted">
        A gentle tilt that suits dense layouts and lists of cards.
      </p>
    </MWobbleCard>

    <MWobbleCard
      class="h-44"
      :intensity="16"
      :speed="600"
    >
      <template #header>
        <p class="text-xs font-medium uppercase tracking-wide text-muted">
          intensity=16
        </p>
      </template>

      <h3 class="font-semibold text-highlighted">
        Playful
      </h3>
      <p class="mt-1 text-sm text-muted">
        A pronounced lean that spotlights a single hero card.
      </p>
    </MWobbleCard>
  </div>
</template>
