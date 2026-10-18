<template>
  <div class="min-h-screen space-y-8 p-4">
    <div class="h-64" />

    <MInView
      :view-options="{ threshold: 0.3 }"
      :variants="{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }"
      :transition="{
        duration: 0.5,
        ease: 'easeOut',
      }"
    >
      <div class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
        <h3 class="mb-2 text-lg font-medium">
          Tailored motion
        </h3>
        <p>This element uses custom variants for its animation.</p>
      </div>
    </MInView>
  </div>
</template>
