<template>
  <div class="flex justify-center">
    <M3DCard :intensity="15">
      <template #header>
        <M3DItem
          :translate-z="60"
          :rotate-x="5"
        >
          <h2 class="text-2xl font-bold text-primary">
            3D Header
          </h2>
        </M3DItem>
      </template>

      <M3DItem :translate-z="30">
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          This card demonstrates multiple 3D items with different transformations.
        </p>
      </M3DItem>

      <M3DItem
        :translate-z="20"
        :rotate-y="3"
      >
        <UButton
          color="primary"
          class="mr-2"
        >
          Primary
        </UButton>
        <UButton color="secondary">
          Secondary
        </UButton>
      </M3DItem>
    </M3DCard>
  </div>
</template>
