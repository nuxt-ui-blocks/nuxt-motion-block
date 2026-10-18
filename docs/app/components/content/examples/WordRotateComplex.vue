<template>
  <div class="flex flex-col items-center gap-4 p-6 text-center">
    <UBadge
      color="primary"
      variant="subtle"
    >
      New
    </UBadge>
    <h2 class="text-3xl font-semibold text-highlighted sm:text-4xl">
      Ship your ideas
      <MWordRotate
        class="text-primary"
        :words="['faster', 'cleaner', 'together']"
        animation-style="slide-up"
        :duration="2000"
      />
    </h2>
    <p class="max-w-md text-sm text-muted">
      One workflow for the whole team, from first sketch to production.
    </p>
  </div>
</template>
