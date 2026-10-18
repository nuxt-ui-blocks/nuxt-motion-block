<template>
  <div class="text-center">
    <MMaskRevealUp
      class="text-2xl font-bold"
      :delay="200"
      :lines="['Copy that already', 'lives as an array', 'rises line by line']"
      text="Copy that already lives as an array rises line by line"
    />
    <p class="mt-3 text-sm text-muted">
      Lines passed as an array, starting 200ms after mount.
    </p>
  </div>
</template>
