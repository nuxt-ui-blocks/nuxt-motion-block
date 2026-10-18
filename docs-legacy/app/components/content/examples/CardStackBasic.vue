<template>
  <div class="flex justify-center h-96">
    <MCardStack
      :items="[
        {
          id: 1,
          title: 'Project Alpha',
          content: 'A revolutionary new product that changes everything.',
          name: 'Alex Developer',
          designation: 'Lead Developer',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 2,
          title: 'Project Beta',
          content: 'An innovative solution for modern businesses.',
          name: 'Sam Designer',
          designation: 'Senior Designer',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 3,
          title: 'Project Gamma',
          content: 'A cutting-edge platform for the future.',
          name: 'Jordan Manager',
          designation: 'Project Manager',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 4,
          title: 'Project Delta',
          content: 'A breakthrough technology that transforms industries.',
          name: 'Taylor Innovator',
          designation: 'Chief Innovation Officer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        },
      ]"
      class="w-full max-w-md"
    >
      <template #card="{ item }">
        <UCard class="bg-white dark:bg-gray-800 shadow-xl rounded-xl border-0">
          <div class="p-6">
            <div class="flex items-start mb-4">
              <img
                :src="item.avatar"
                :alt="item.name"
                class="w-14 h-14 rounded-full mr-4 border-2 border-primary-500"
              >
              <div>
                <h3 class="font-bold text-lg text-gray-900 dark:text-white">
                  {{ item.name }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  {{ item.designation }}
                </p>
              </div>
            </div>
            <h4 class="font-bold text-xl mb-2 text-gray-900 dark:text-white">
              {{ item.title }}
            </h4>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              {{ item.content }}
            </p>
            <div class="flex justify-between items-center">
              <UButton
                color="primary"
                variant="solid"
                size="sm"
              >
                View Project
              </UButton>
              <div class="flex space-x-2">
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                >
                  <UIcon
                    name="i-lucide-heart"
                    class="w-4 h-4"
                  />
                </UButton>
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                >
                  <UIcon
                    name="i-lucide-share"
                    class="w-4 h-4"
                  />
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </MCardStack>
  </div>
</template>
