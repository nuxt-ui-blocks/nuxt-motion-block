<template>
  <div class="mx-auto max-w-2xl space-y-8 p-6">
    <div class="h-40" />

    <MInView
      :once="false"
      :variants="{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }"
      class="rounded-2xl bg-primary/10 p-6 text-center"
    >
      <p class="text-lg font-medium text-highlighted">
        I animate every time I enter the viewport
      </p>
      <p class="mt-1 text-sm text-muted">
        <code>:once="false"</code> — scroll away and back to replay.
      </p>
    </MInView>

    <div class="h-40" />
  </div>
</template>
