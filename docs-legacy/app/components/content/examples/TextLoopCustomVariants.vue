<template>
  <div class="p-4">
    <MTextLoop
      :items="['Fade', 'In', 'Out']"
      :variants="{
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
      }"
    />
  </div>
</template>
