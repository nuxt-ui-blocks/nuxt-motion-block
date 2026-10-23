<template>
  <div class="flex min-h-[360px] w-full items-center justify-center p-6">
    <MTiltCard class="w-72 rounded-2xl border border-default bg-elevated p-6 shadow-lg">
      <div class="flex flex-col gap-5">
        <span class="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <UIcon
            class="size-5"
            name="i-lucide-layers"
          />
        </span>

        <div>
          <p class="text-base font-semibold text-highlighted">
            Depth on demand
          </p>
          <p class="mt-1 text-sm text-muted">
            Move the pointer across the surface and the card leans with it. Tab
            to the button to see the focus tilt.
          </p>
        </div>

        <UButton
          class="w-fit"
          color="neutral"
          label="View project"
          size="sm"
          variant="outline"
        />
      </div>
    </MTiltCard>
  </div>
</template>
