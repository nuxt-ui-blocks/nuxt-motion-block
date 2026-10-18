<template>
  <div class="text-center">
    <MPerspectiveText3D
      class="text-4xl font-bold"
      driver="pointer"
      text="Tilt with the pointer"
    />
    <p class="mt-4 text-sm text-muted">
      The plane follows the cursor at twice the tilt angle and springs back to flat
      when the pointer leaves.
    </p>
  </div>
</template>
