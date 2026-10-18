<template>
  <div class="text-center">
    <MBottomUpLetters
      class="text-3xl font-bold"
      :delay="200"
      text="Rises in on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      200ms after the headline enters view, then 88ms per letter.
    </p>
  </div>
</template>
