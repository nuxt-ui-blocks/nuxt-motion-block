<template>
  <div class="flex justify-center">
    <MDirectionAwareHoverNew image-url="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80">
      <template #content>
        <div class="space-y-3">
          <UIcon
            name="i-heroicons-light-bulb"
            class="w-8 h-8 text-amber-400"
          />
          <h3 class="text-2xl font-bold">
            Creative Design
          </h3>
          <p class="text-white/80">
            Innovative solutions for modern challenges
          </p>
          <UButton
            color="neutral"
            variant="solid"
            size="sm"
            class="mt-2"
          >
            View Project
          </UButton>
        </div>
      </template>
    </MDirectionAwareHoverNew>
  </div>
</template>
