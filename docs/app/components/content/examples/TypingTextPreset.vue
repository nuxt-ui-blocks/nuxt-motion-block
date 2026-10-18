<template>
  <div class="flex flex-col items-center gap-4 p-8 text-center">
    <h3 class="text-2xl font-bold text-highlighted">
      <MTypingText
        text="Meet the new release"
        animation="blurInUp"
        :delay="400"
        :speed="80"
        :show-cursor="false"
      />
    </h3>
    <p class="max-w-sm text-sm text-muted">
      The `blurInUp` preset arrives from below through a 10px blur, starting
      400ms after mount. With the cursor hidden the line reads as a headline
      rather than as input.
    </p>
  </div>
</template>
