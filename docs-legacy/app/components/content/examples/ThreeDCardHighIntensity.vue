<template>
  <div class="flex justify-center">
    <M3DCard :intensity="10">
      <template #header>
        <M3DItem :translate-z="50">
          <h2 class="text-xl font-semibold">
            High Intensity
          </h2>
        </M3DItem>
      </template>

      <M3DItem :translate-z="25">
        <p class="text-gray-600 dark:text-gray-400">
          This card has a more pronounced 3D effect.
        </p>
      </M3DItem>
    </M3DCard>
  </div>
</template>
