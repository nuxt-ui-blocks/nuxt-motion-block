<template>
  <div class="flex justify-center">
    <M3DCard
      :intensity="20"
      class="bg-gradient-to-br from-purple-500 to-indigo-600 text-white divide-0"
      :ui="{ body: { background: 'none' } }"
    >
      <template #header>
        <M3DItem :translate-z="40">
          <h2 class="text-2xl font-bold">
            Custom Styled
          </h2>
        </M3DItem>
      </template>

      <M3DItem :translate-z="20">
        <p class="mb-4 opacity-90">
          This 3D card has custom gradient styling.
        </p>
        <UButton
          color="neutral"
          variant="solid"
          size="sm"
        >
          Action
        </UButton>
      </M3DItem>
    </M3DCard>
  </div>
</template>
