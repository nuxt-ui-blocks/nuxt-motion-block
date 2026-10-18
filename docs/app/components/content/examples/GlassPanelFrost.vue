<template>
  <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-orange-400 p-6">
    <div class="absolute -left-6 top-2 size-28 rounded-full bg-amber-300/80 blur-2xl" />
    <div class="absolute -right-4 bottom-0 size-32 rounded-full bg-sky-300/80 blur-2xl" />

    <MGlassPanel class="rounded-3xl">
      <div class="space-y-4 text-white">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-hard-drive"
            class="size-5"
          />
          <p class="text-xs font-medium uppercase tracking-widest text-white/75">
            Storage
          </p>
        </div>

        <div>
          <p class="text-3xl font-semibold">
            82 GB
            <span class="text-base font-normal text-white/70">of 100 GB</span>
          </p>
          <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div class="h-full w-4/5 rounded-full bg-white" />
          </div>
        </div>

        <p class="text-sm text-white/85">
          No image here — just the page behind, blurred and tinted by the frost.
        </p>

        <UButton
          label="Manage plan"
          color="neutral"
          variant="solid"
        />
      </div>
    </MGlassPanel>
  </div>
</template>
