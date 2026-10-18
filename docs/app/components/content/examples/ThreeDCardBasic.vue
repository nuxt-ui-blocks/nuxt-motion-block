<template>
  <div class="flex justify-center">
    <M3DCard class="w-96">
      <template #header>
        <M3DItem :translate-z="40">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-lg bg-primary/70 flex items-center justify-center mr-4">
              <UIcon
                name="i-lucide-cube"
                class="w-6 h-6 text-white"
              />
            </div>
            <h2 class="text-2xl font-bold">
              3D Card
            </h2>
          </div>
        </M3DItem>
      </template>

      <M3DItem
        :translate-z="20"
        class="space-y-6"
      >
        <p class="text-muted text-lg">
          Experience interactive 3D effects that respond to your cursor movements for an engaging user interface.
        </p>

        <div class="flex items-center p-5 bg-primary/5 dark:bg-primary/30 rounded-lg">
          <UIcon
            name="i-lucide-info"
            class="w-6 h-6 text-primary mr-4"
          />
          <span class="text-primary">Move your cursor over the card to see the 3D effect</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-muted rounded-lg">
            <div class="text-sm text-muted">
              Rotation
            </div>
            <div class="font-bold text-highlighted">
              Interactive
            </div>
          </div>
          <div class="p-4 bg-muted rounded-lg">
            <div class="text-sm text-muted">
              Perspective
            </div>
            <div class="font-bold text-highlighted">
              Realistic
            </div>
          </div>
        </div>
      </M3DItem>

      <template #footer>
        <M3DItem
          :translate-z="30"
          class="flex justify-between pt-4"
        >
          <UButton
            color="neutral"
            variant="ghost"
            size="lg"
          >
            <UIcon
              name="i-lucide-heart"
              class="w-5 h-5 mr-2"
            />
            Like
          </UButton>
          <UButton
            color="primary"
            variant="solid"
            size="lg"
          >
            Get Started
          </UButton>
        </M3DItem>
      </template>
    </M3DCard>
  </div>
</template>
