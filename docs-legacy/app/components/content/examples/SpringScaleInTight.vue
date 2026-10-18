<template>
  <div class="text-center">
    <MSpringScaleIn
      class="text-2xl font-bold"
      :stagger="40"
      text="Tighter stagger"
    />
    <p class="mt-3 text-sm text-muted">
      40ms apart, so the overshoot reads as one bouncing line.
    </p>
  </div>
</template>
