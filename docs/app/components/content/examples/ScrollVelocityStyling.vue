<template>
  <div class="space-y-6">
    <MScrollVelocity
      :texts="['Styled with the theme hooks']"
      :velocity="80"
      class="rounded-xl bg-default"
      parallax-class="py-4"
      scroller-class="text-3xl tracking-tight"
      :parallax-style="{ background: 'linear-gradient(90deg, transparent, var(--ui-bg-muted), transparent)' }"
      :scroller-style="{ opacity: 0.85 }"
    />
  </div>
</template>
