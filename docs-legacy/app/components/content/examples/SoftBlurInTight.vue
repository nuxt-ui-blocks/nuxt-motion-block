<template>
  <div class="text-center">
    <MSoftBlurIn
      class="text-2xl font-semibold"
      :stagger="6"
      text="Tight stagger"
    />
    <p class="mt-3 text-sm text-muted">
      6ms between letters, so the sentence resolves almost as one object.
    </p>
  </div>
</template>
