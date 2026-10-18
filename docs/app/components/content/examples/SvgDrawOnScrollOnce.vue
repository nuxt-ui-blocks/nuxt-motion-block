<template>
  <div class="relative h-64 overflow-y-auto rounded-2xl border border-default">
    <div class="h-40" />

    <MSvgDrawOnScroll
      once
      :paths="['M10 50 C 30 10, 70 90, 90 50']"
      view-box="0 0 100 100"
      stroke="var(--ui-primary)"
      class="mx-auto h-32 w-40"
    />

    <div class="h-40" />
  </div>
</template>
