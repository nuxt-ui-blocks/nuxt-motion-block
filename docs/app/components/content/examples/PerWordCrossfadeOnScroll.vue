<template>
  <div class="max-w-sm text-center">
    <MPerWordCrossfade
      class="text-lg leading-relaxed"
      :delay="200"
      text="A sentence that assembles itself once the paragraph is on screen."
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      200ms after the paragraph enters view, then 70ms per word.
    </p>
  </div>
</template>
