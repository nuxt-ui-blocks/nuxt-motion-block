<template>
  <MInView
    :transition="{ duration: 0.8, ease: 'easeInOut' }"
    :variants="{
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    }"
  >
    <div class="p-4 bg-primary rounded">
      <p>This content has a custom animation.</p>
    </div>
  </MInView>
</template>
