<template>
  <div class="text-center">
    <MMicroScaleFade
      class="text-3xl font-bold"
      :delay="200"
      text="Settles in on scroll"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      200ms after the line enters view, then a single 600ms settle.
    </p>
  </div>
</template>
