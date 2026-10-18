<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTextGlitch
      text="HOVER ME"
      trigger="hover"
      intensity="high"
      :speed="400"
      class="text-5xl font-black"
    />
    <p class="text-sm text-muted">
      The glitch runs only while the pointer is over the text.
    </p>
  </div>
</template>
