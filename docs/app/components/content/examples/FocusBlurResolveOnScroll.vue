<template>
  <div class="max-w-md text-center">
    <MFocusBlurResolve
      class="text-3xl font-bold"
      text="Resolves when seen"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Scroll this block out of view and back: the resolve runs once per mount,
      so the second pass replays it.
    </p>
  </div>
</template>
