<template>
  <div class="max-w-md text-center">
    <MStaggerFromEdges
      class="text-3xl font-bold"
      text="Appears on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Each character resolves once, inward from the nearest edge of the string.
    </p>
  </div>
</template>
