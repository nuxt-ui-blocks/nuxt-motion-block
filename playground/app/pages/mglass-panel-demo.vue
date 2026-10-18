<template>
  <div class="space-y-12">
    <UPageHeader
      title="GlassPanel"
      description="UCard with glassmorphism styling and optional parallax on mousemove."
    />

    <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <UCard>
        <template #header>
          <p class="text-2xl font-bold text-highlighted">
            Glass Card on Gradient
          </p>
        </template>
        <p class="text-muted">
          This card uses backdrop-blur and semi-transparent background for a glassmorphism effect.
        </p>
      </UCard>

      <MGlassPanel
        class="mt-6"
        background-image="https://picsum.photos/seed/glass-bg/800/400"
      >
        <div class="space-y-2">
          <h3 class="text-xl font-bold text-highlighted">
            Parallax Background
          </h3>
          <p class="text-muted">
            Move your cursor to see the background parallax effect.
          </p>
        </div>
      </MGlassPanel>
    </div>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Static Glass (No Parallax)
        </p>
      </template>
      <MGlassPanel :parallax="false">
        <div class="space-y-2">
          <h3 class="text-xl font-bold text-highlighted">
            Static Glass Panel
          </h3>
          <p class="text-muted">
            This glass panel has parallax disabled.
          </p>
        </div>
      </MGlassPanel>
    </UCard>
  </div>
</template>
