<template>
  <MGlareCard
    class="w-96 h-80 bg-gray-800"
    glare-color="rgba(59,130,246,0.8)"
    glare-color-inner="rgba(59,130,246,0.65)"
    glare-color-outer="rgba(59,130,246,0)"
  >
    <template #header>
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center space-x-3">
          <UAvatar
            src="https://picsum.photos/200/200?random=1"
            size="md"
            alt="Author"
          />
          <div>
            <p class="font-semibold text-white">
              Sarah Williams
            </p>
            <p class="text-xs text-slate-400">
              Posted 2 hours ago
            </p>
          </div>
        </div>
        <UButton
          icon="i-heroicons-ellipsis-horizontal"
          color="neutral"
          variant="ghost"
          size="xs"
        />
      </div>
    </template>

    <div class="p-4">
      <h3 class="text-xl font-bold text-white mb-2">
        Exploring New Design Trends
      </h3>
      <p class="text-slate-400 mb-4">
        Just discovered some amazing design trends for 2023. The use of glass morphism and 3D elements
        is really pushing the boundaries of what's possible in modern UI design.
      </p>

      <div class="bg-gray-800 rounded-xl p-4 mb-4">
        <div class="flex items-center space-x-2 mb-2">
          <UIcon
            name="i-heroicons-light-bulb"
            class="w-5 h-5 text-yellow-400"
          />
          <span class="text-sm font-medium text-white">Design Insight</span>
        </div>
        <p class="text-sm text-slate-300">
          "The key to great design is understanding how light and shadow interact with surfaces."
        </p>
      </div>

      <div class="flex justify-between text-sm text-slate-400">
        <span>✨ 24 reactions</span>
        <span>💬 8 comments</span>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between p-4 border-t border-slate-700/50">
        <UButton
          icon="i-heroicons-heart"
          color="neutral"
          variant="ghost"
          size="sm"
          class="flex-1 mr-1"
        >
          Like
        </UButton>
        <UButton
          icon="i-heroicons-chat-bubble-left-right"
          color="neutral"
          variant="ghost"
          size="sm"
          class="flex-1 mx-1"
        >
          Comment
        </UButton>
        <UButton
          icon="i-heroicons-arrow-up-tray"
          color="neutral"
          variant="ghost"
          size="sm"
          class="flex-1 ml-1"
        >
          Share
        </UButton>
      </div>
    </template>
  </MGlareCard>
</template>
