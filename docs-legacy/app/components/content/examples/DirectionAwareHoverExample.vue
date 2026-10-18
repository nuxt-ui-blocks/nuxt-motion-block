<template>
  <div class="flex justify-center">
    <MDirectionAwareHover image-url="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80">
      <template #content>
        <div class="space-y-3">
          <UIcon
            name="i-heroicons-computer-desktop"
            class="w-8 h-8 text-blue-400"
          />
          <h3 class="text-2xl font-bold">
            Web Development
          </h3>
          <p class="text-white/80">
            Modern responsive websites and applications
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
    </MDirectionAwareHover>
  </div>
</template>
