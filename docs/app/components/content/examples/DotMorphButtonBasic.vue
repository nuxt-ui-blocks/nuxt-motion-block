<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <MDotMorphButton label="Run deploy" />
      <MDotMorphButton
        label="Destroy"
        color="error"
        variant="soft"
        dot-color="error"
      />
      <MDotMorphButton
        label="Docs"
        color="neutral"
        variant="outline"
        dot-color="neutral"
        trailing-icon="i-lucide-arrow-up-right"
      />
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      On hover the leading dot turns from a 16px circle into a 12px pill. Its height is measured off
      the button itself and capped at 28px, so the dot never outgrows a small or an extra large
      button.
    </p>
  </div>
</template>
