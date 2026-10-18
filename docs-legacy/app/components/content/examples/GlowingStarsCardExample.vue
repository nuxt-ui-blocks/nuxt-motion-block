<template>
  <MGlowingStarsCard>
    <template #header>
      <h2 class="font-bold text-2xl text-[#eaeaea]">
        ✨ Cosmic Dashboard
      </h2>
    </template>
    <div class="text-center space-y-3">
      <p class="text-white/80 text-sm">
        Interactive starfield visualization
      </p>
      <UBadge
        color="primary"
        variant="soft"
      >
        Active
      </UBadge>
    </div>
    <template #footer>
      <UButton
        icon="i-heroicons-rocket-launch"
        color="neutral"
        variant="solid"
        class="w-full"
      >
        Launch Experience
      </UButton>
    </template>
  </MGlowingStarsCard>
</template>
