<script setup lang="ts">
const aurora = {
  background:
    'radial-gradient(55% 50% at 18% 0%, color-mix(in oklab, var(--ui-primary) 32%, transparent), transparent 70%), radial-gradient(45% 45% at 82% 4%, color-mix(in oklab, #d946ef 26%, transparent), transparent 72%), radial-gradient(50% 45% at 58% 10%, color-mix(in oklab, #22d3ee 16%, transparent), transparent 72%)',
}

const grid = {
  backgroundImage:
    'linear-gradient(to right, color-mix(in oklab, var(--ui-border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--ui-border) 70%, transparent) 1px, transparent 1px)',
  backgroundSize: '56px 56px',
}

const horizon = {
  background:
    'radial-gradient(60% 100% at 50% 100%, color-mix(in oklab, var(--ui-primary) 30%, transparent), transparent 72%)',
}
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute inset-0 opacity-90"
      :style="aurora"
    />
    <div class="aurora-blob aurora-blob--a" />
    <div class="aurora-blob aurora-blob--b" />
    <div
      class="absolute inset-0 opacity-40 dark:opacity-25"
      :style="grid"
      :class="'[mask-image:radial-gradient(70%_55%_at_50%_0%,black,transparent)]'"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-48 opacity-60"
      :style="horizon"
    />
  </div>
</template>

<style scoped>
.aurora-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(72px);
  will-change: transform;
}
.aurora-blob--a {
  top: -22%;
  left: 6%;
  height: 460px;
  width: 560px;
  background: radial-gradient(circle, color-mix(in oklab, var(--ui-primary) 55%, transparent), transparent 68%);
  animation: auroraDrift 18s ease-in-out infinite alternate;
}
.aurora-blob--b {
  top: -14%;
  right: 4%;
  height: 420px;
  width: 520px;
  background: radial-gradient(circle, color-mix(in oklab, #d946ef 50%, transparent), transparent 68%);
  animation: auroraDrift 22s ease-in-out infinite alternate-reverse;
}
@keyframes auroraDrift {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(4%, 6%, 0) scale(1.12);
  }
}
@media (prefers-reduced-motion: reduce) {
  .aurora-blob {
    animation: none;
  }
}
</style>
