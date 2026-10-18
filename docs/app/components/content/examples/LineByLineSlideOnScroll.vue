<template>
  <div class="text-center">
    <MLineByLineSlide
      class="text-xl font-bold"
      :delay="150"
      :stagger="200"
      :text="'A statement that waits\nuntil you reach it\nbefore sliding in'"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Waits 150ms after the block enters view, then 200ms per line.
    </p>
  </div>
</template>
