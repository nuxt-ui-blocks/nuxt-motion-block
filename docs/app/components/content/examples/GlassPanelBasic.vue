<template>
  <MGlassPanel
    background-image="https://picsum.photos/seed/alpine-lake/1200/800"
    class="w-full max-w-md rounded-3xl"
  >
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-mountain"
            class="size-6 text-primary"
          />
          <div>
            <p class="font-semibold text-highlighted">
              Lake Brienz
            </p>
            <p class="text-xs text-muted">
              Interlaken, Switzerland
            </p>
          </div>
        </div>
        <UBadge
          label="Featured"
          color="primary"
          variant="soft"
        />
      </div>
    </template>

    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-highlighted">
        Morning on the water
      </h3>
      <p class="text-sm leading-relaxed text-highlighted/90">
        Move the pointer across the panel — the photo drifts a few pixels behind the
        frost, so the card reads as a window onto something rather than a flat tile.
      </p>
      <div class="flex items-center gap-1">
        <UIcon
          v-for="n in 5"
          :key="n"
          name="i-lucide-star"
          class="size-4"
          :class="n <= 4 ? 'text-amber-400' : 'text-muted/40'"
        />
        <span class="ml-2 text-xs text-muted">4.8 · 312 reviews</span>
      </div>
    </div>

    <template #footer>
      <div class="flex w-full items-center justify-between">
        <span class="text-xs text-muted">From $180 / night</span>
        <UButton
          label="View trip"
          icon="i-lucide-arrow-up-right"
          size="xs"
          variant="soft"
        />
      </div>
    </template>
  </MGlassPanel>
</template>
