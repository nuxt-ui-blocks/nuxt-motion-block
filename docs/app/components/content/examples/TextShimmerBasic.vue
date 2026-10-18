<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center max-w-2xl">
      <MTextShimmer
        text="Transform Your Digital Experience"
        :duration="2.5"
        :spread="2"
        class="text-4xl font-bold mb-4"
      />
      <MTextShimmer
        text="Create stunning interfaces with our collection of animated components"
        :duration="3"
        :spread="1.5"
        class="text-xl text-muted"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      <UCard class="text-center">
        <UIcon
          name="i-lucide-zap"
          class="w-12 h-12 text-primary mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">
          Blazing quick
        </h3>
        <p class="text-muted text-sm">
          Tuned for speed
        </p>
      </UCard>

      <UCard class="text-center">
        <UIcon
          name="i-lucide-sparkles"
          class="w-12 h-12 text-purple-500 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">
          Beautiful Effects
        </h3>
        <p class="text-muted text-sm">
          Stunning animations
        </p>
      </UCard>

      <UCard class="text-center">
        <UIcon
          name="i-lucide-code"
          class="w-12 h-12 text-green-500 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">
          Plug-in ready
        </h3>
        <p class="text-muted text-sm">
          Quick to add
        </p>
      </UCard>
    </div>
  </div>
</template>
