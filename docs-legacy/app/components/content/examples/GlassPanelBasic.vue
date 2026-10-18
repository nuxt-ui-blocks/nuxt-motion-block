<template>
  <div class="w-full max-w-md">
    <MGlassPanel
      background-image="https://picsum.photos/seed/ridgeline-pass/1200/800"
      class="rounded-2xl"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-mountain-snow"
            class="size-6 text-primary"
          />
          <div>
            <p class="font-semibold text-highlighted">
              Ridgeline Pass
            </p>
            <p class="text-xs text-muted">
              Conditions updated 4 min ago
            </p>
          </div>
        </div>
      </template>

      <p class="text-sm leading-relaxed text-highlighted/90">
        18 cm of new snow above treeline. The north face stays firm until the sun
        hits it, so the north ridge is the better line before midday.
      </p>

      <template #footer>
        <div class="flex w-full items-center justify-between text-xs">
          <span class="text-muted">Avalanche risk: moderate</span>
          <UButton
            label="Open report"
            size="xs"
            variant="soft"
            icon="i-lucide-arrow-up-right"
          />
        </div>
      </template>
    </MGlassPanel>
  </div>
</template>
