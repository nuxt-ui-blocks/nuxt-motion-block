<template>
  <div class="text-center">
    <MMaskRevealUp
      class="text-3xl font-bold"
      :stagger="60"
      :text="'Masked reveal\non scroll'"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      60ms between lines, once the block is on screen.
    </p>
  </div>
</template>
