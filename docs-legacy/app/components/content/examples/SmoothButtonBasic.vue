<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <MSmoothButton
        label="Hover me"
        color="primary"
      />
      <MSmoothButton
        label="And me"
        color="neutral"
        variant="outline"
      />
      <MSmoothButton
        icon="i-lucide-zap"
        color="neutral"
        variant="soft"
        aria-label="Ship it"
      />
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      The sheen is a sibling overlay clipped to the button's own radius, so it follows the rounding
      of whatever you pass. It is pointer-events-none: hover states, focus rings and clicks all pass
      straight through to the button underneath.
    </p>
  </div>
</template>
