<template>
  <div class="flex flex-col items-center gap-6 p-8">
    <MTextGradient
      text="Announced once"
      aria-label="A headline that is announced once"
      class="text-3xl font-bold"
    />
    <MTextGradient
      text="★★★★★"
      hide-from-screen-reader
      :colors="['#fbbf24', '#f59e0b', '#fbbf24']"
      class="text-3xl"
    />
    <p class="text-sm text-muted">
      The headline carries a custom label; the stars are decorative and hidden from screen readers.
    </p>
  </div>
</template>
