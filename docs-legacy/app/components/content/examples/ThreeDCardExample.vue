<template>
  <div class="flex justify-center">
    <M3DCard :intensity="25">
      <template #header>
        <M3DItem :translate-z="40">
          <h2 class="text-xl font-semibold">
            3D Card
          </h2>
        </M3DItem>
      </template>

      <M3DItem :translate-z="20">
        <p class="text-gray-600 dark:text-gray-400">
          This is a 3D card that responds to mouse movement.
        </p>
        <div class="mt-4">
          <UButton color="primary">
            Interact
          </UButton>
        </div>
      </M3DItem>
    </M3DCard>
  </div>
</template>
