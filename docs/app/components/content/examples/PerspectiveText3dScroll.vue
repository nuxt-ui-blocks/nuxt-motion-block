<template>
  <div
    ref="scrollContainer"
    class="relative h-44 overflow-y-auto rounded-xl border border-default p-6"
  >
    <div class="flex min-h-80 flex-col justify-between">
      <p class="text-sm text-muted">
        Scroll inside this box
      </p>
      <MPerspectiveText3D
        :container="() => scrollContainer"
        class="text-center text-3xl font-bold"
        driver="scroll"
        text="Scroll drives the tilt"
      />
      <p class="text-sm text-muted">
        The plane rotates from one edge of the range to the other, sprung so it
        trails the scroll instead of snapping to it.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// `container` is passed as a getter. A bare `:container="scrollContainer"` is
// unwrapped by the template to `null` during `setup`, so it would be captured
// and never re-read, and `useScroll` would silently fall back to the window.
//
// The container also carries `relative` above. Motion finds the headline by
// walking `offsetParent` from it up to the container, and a static container is
// skipped by that walk, leaving the offsets measured in page space where
// scrolling the box cannot move them.
const scrollContainer = ref<HTMLElement | null>(null)
</script>
