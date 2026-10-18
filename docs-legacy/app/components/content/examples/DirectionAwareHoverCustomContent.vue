<template>
  <div class="flex justify-center">
    <MDirectionAwareHover
      image-url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      children-class="text-center"
    >
      <template #content>
        <UIcon
          name="i-heroicons-camera"
          class="w-10 h-10 text-white mx-auto"
        />
        <h3 class="text-2xl font-bold">
          Ocean Photography
        </h3>
        <p class="text-white/80">
          Professional underwater photography
        </p>
      </template>
    </MDirectionAwareHover>
  </div>
</template>
