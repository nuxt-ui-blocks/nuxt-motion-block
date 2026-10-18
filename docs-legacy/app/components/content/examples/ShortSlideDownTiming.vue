<template>
  <div class="flex flex-col gap-10">
    <div class="text-center">
      <p class="mb-3 text-xs tracking-widest text-muted uppercase">
        Brisk · 1400ms
      </p>
      <MShortSlideDown
        class="text-xl font-bold"
        :phrases="phrases"
        :interval="1400"
      />
    </div>
    <div class="text-center">
      <p class="mb-3 text-xs tracking-widest text-muted uppercase">
        Unhurried · 4500ms
      </p>
      <MShortSlideDown
        class="text-xl font-bold"
        :phrases="phrases"
        :interval="4500"
      />
    </div>
    <p class="max-w-sm text-center text-sm text-muted">
      The build is identical. Only the pause between the finished stack and its
      exit changes, so a short interval reads as a ticker and a long one reads
      as a quote.
    </p>
  </div>
</template>

<script setup>
const phrases = ['Same build', 'Different dwell time']
</script>
