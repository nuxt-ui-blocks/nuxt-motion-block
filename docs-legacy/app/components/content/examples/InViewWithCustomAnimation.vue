<template>
  <div class="p-4 space-y-8 min-h-screen">
    <div class="h-64" />

    <MInView
      :threshold="0.3"
      :variants="{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }"
      :transition="{
        duration: 0.5,
        ease: 'easeOut',
      }"
    >
      <div class="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg">
        <h3 class="text-lg font-medium mb-2">
          Custom Animation
        </h3>
        <p>This element uses custom variants for animation.</p>
      </div>
    </MInView>
  </div>
</template>
