<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        True Focus
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Highlight specific words in a sentence with dynamic focus effects for emphasis
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <MTrueFocus
        sentence="Create stunning interfaces with our animated components"
        :manual-mode="true"
        :blur-amount="4"
        border-color="blue"
        class="text-xl text-center"
      />
    </div>

    <div class="mt-6 flex justify-center gap-3">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-play"
          class="w-4 h-4 mr-2"
        />
        Animate Focus
      </UButton>
      <UButton
        color="gray"
        variant="outline"
        size="sm"
      >
        <UIcon
          name="i-lucide-settings"
          class="w-4 h-4 mr-2"
        />
        Customize
      </UButton>
    </div>
  </div>
</template>
