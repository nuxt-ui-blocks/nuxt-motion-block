<template>
  <div class="flex w-full flex-col items-center gap-3 py-10">
    <MCoolMode
      emoji="🎉"
      :particle-count="16"
    >
      <UButton
        size="lg"
        color="primary"
        variant="solid"
      >
        Click me
      </UButton>
    </MCoolMode>
    <p class="text-xs text-muted">
      Every press throws a fresh burst.
    </p>
  </div>
</template>
