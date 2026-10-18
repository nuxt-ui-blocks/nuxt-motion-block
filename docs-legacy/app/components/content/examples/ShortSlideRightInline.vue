<template>
  <p class="max-w-md text-center text-lg leading-relaxed">
    Our current status is
    <MShortSlideRight
      class="font-bold"
      :phrases="phrases"
      :interval="3200"
    />
    and has been for three weeks running.
  </p>
</template>

<script setup>
const phrases = ['all green', 'mostly green', 'green enough']
</script>
