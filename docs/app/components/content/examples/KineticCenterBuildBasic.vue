<template>
  <div class="flex w-full items-center justify-center py-12">
    <MKineticCenterBuild
      class="max-w-lg text-center text-2xl font-semibold text-highlighted"
      :phrases="phrases"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * The line is built word by word from the right, and the words already on
 * screen slide left to make room. Centring the row is what makes the growth
 * read as the sentence assembling itself.
 */
const phrases = [
  'Built one word at a time.',
  'Centred, then locked.',
  'Never a layout jump.',
]
</script>
