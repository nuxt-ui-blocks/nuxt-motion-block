<template>
  <UCard
    class="relative overflow-hidden max-w-md mx-auto"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-blue-500 to-purple-600"
      :size="40"
      :transition="{ duration: 3, ease: 'easeInOut' }"
    />
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold text-highlighted">
          New Message
        </h3>
        <UBadge color="primary">
          3
        </UBadge>
      </div>
    </template>
    <div class="space-y-3">
      <div class="flex items-start space-x-3">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt="User"
          size="md"
        />
        <div>
          <h4 class="font-medium text-highlighted">
            Alex Johnson
          </h4>
          <p class="text-sm text-muted">
            Hey, are we still meeting tomorrow?
          </p>
          <p class="text-xs text-muted mt-1">
            2 min ago
          </p>
        </div>
      </div>

      <div class="flex items-start space-x-3">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/2?v=4"
          alt="User"
          size="md"
        />
        <div>
          <h4 class="font-medium text-highlighted">
            Sam Wilson
          </h4>
          <p class="text-sm text-muted">
            Check out this new design I made
          </p>
          <p class="text-xs text-muted mt-1">
            15 min ago
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <UButton
        color="primary"
        variant="solid"
        size="sm"
        class="w-full"
      >
        View All Messages
      </UButton>
    </template>
  </UCard>
</template>
