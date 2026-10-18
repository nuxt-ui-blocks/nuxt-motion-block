<template>
  <div class="flex justify-center">
    <M3DCard
      :intensity="30"
      class="max-w-md"
    >
      <template #header>
        <M3DItem :translate-z="50">
          <h2 class="text-xl font-semibold">
            Nuxt UI Integration
          </h2>
        </M3DItem>
      </template>

      <M3DItem :translate-z="25">
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          3D Card works seamlessly with Nuxt UI components.
        </p>
      </M3DItem>

      <M3DItem :translate-z="15">
        <div class="flex items-center gap-3 mb-4">
          <UAvatar
            src="https://picsum.photos/200/200"
            alt="User"
          />
          <div>
            <p class="font-medium">
              John Doe
            </p>
            <p class="text-sm text-gray-500">
              Software Engineer
            </p>
          </div>
        </div>
      </M3DItem>

      <M3DItem :translate-z="10">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-heroicons-heart"
          >
            Like
          </UButton>
          <UButton
            color="neutral"
            icon="i-heroicons-chat-bubble-left-right"
          >
            Comment
          </UButton>
        </div>
      </M3DItem>
    </M3DCard>
  </div>
</template>
