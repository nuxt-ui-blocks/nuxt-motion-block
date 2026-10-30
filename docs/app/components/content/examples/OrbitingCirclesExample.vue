<template>
  <div class="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-xl border border-default bg-default">
    <div class="z-10 flex size-16 items-center justify-center rounded-full border border-default bg-elevated shadow-sm">
      <UIcon
        name="i-lucide-sparkles"
        class="size-6 text-primary"
      />
    </div>

    <MOrbitingCircles
      :radius="110"
      :duration="20"
    >
      <div class="flex size-10 items-center justify-center rounded-full border border-default bg-elevated">
        <UIcon
          name="i-lucide-github"
          class="size-4"
        />
      </div>
    </MOrbitingCircles>

    <MOrbitingCircles
      :radius="110"
      :duration="20"
      :start-angle="180"
    >
      <div class="flex size-10 items-center justify-center rounded-full border border-default bg-elevated">
        <UIcon
          name="i-lucide-twitter"
          class="size-4"
        />
      </div>
    </MOrbitingCircles>

    <MOrbitingCircles
      :radius="170"
      :duration="30"
      :reverse="true"
      :start-angle="90"
    >
      <div class="flex size-10 items-center justify-center rounded-full border border-default bg-elevated">
        <UIcon
          name="i-lucide-figma"
          class="size-4"
        />
      </div>
    </MOrbitingCircles>
  </div>
</template>
