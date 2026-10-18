<template>
  <MWobbleCard
    class="h-56"
    :ui="{ wrapper: 'mx-auto max-w-sm' }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <UIcon
            name="i-lucide-sparkles"
            class="h-5 w-5 text-primary"
          />
        </div>
        <div>
          <h3 class="font-semibold text-highlighted">
            Motion Primitives
          </h3>
          <p class="text-xs text-muted">
            Hover to tilt the card
          </p>
        </div>
      </div>
    </template>

    <p class="text-sm text-muted">
      The surface leans toward your cursor in 3D, then eases back to rest when the pointer leaves.
    </p>

    <template #footer>
      <UButton
        size="sm"
        color="primary"
        trailing-icon="i-lucide-arrow-right"
      >
        Get started
      </UButton>
    </template>
  </MWobbleCard>
</template>
