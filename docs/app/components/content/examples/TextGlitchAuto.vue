<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTextGlitch
      text="AUTO GLITCH"
      trigger="auto"
      :interval="2"
      :duration="1"
      class="text-5xl font-black"
    />
    <p class="text-sm text-muted">
      Glitches for one second, every two seconds.
    </p>
  </div>
</template>
