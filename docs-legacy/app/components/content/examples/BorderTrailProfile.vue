<template>
  <UCard
    class="relative overflow-hidden max-w-sm"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-cyan-500 to-blue-500"
      :size="50"
      :transition="{ duration: 4, ease: 'easeInOut' }"
    />
    <template #header>
      <div class="flex flex-col items-center">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt="Profile"
          size="xl"
          class="mb-4 ring-2 ring-cyan-500"
        />
        <h3 class="text-xl font-bold">
          John Doe
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Senior Developer
        </p>
      </div>
    </template>
    <div class="flex gap-2 justify-center">
      <UButton color="neutral">
        Message
      </UButton>
      <UButton color="primary">
        Connect
      </UButton>
    </div>
  </UCard>
</template>
