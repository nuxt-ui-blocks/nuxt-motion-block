<template>
  <div class="flex flex-col items-center gap-4">
    <MPerspectiveText3D
      class="text-4xl font-bold"
      driver="pointer"
      text="Move your cursor"
    />
    <p class="max-w-sm text-center text-sm text-muted">
      The plane follows the pointer across the wrapper and springs back to flat
      when the cursor leaves.
    </p>
  </div>
</template>
