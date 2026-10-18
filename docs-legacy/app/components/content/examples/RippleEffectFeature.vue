<template>
  <section class="relative py-20 bg-gray-900 text-white overflow-hidden">
    <MBackgroundRippleEffect
      class="absolute inset-0 z-0"
      :colors="['#93c5fd', '#60a5fa', '#a5b4fc']"
    />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <MAnimatedGroup
        preset="slide"
        :stagger-children="0.1"
      >
        <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm">
          <UIcon
            name="i-heroicons-waveform"
            class="w-4 h-4"
          />
          Featured Effect
        </div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ripple Background Effect
        </h2>
        <p class="text-lg text-gray-300 mb-8">
          Add depth and movement to your backgrounds with our ripple effect component.
        </p>
        <UCard class="bg-white/10 backdrop-blur-sm border border-white/20 max-w-2xl mx-auto">
          <div class="p-6">
            <p class="mb-4">
              This card is placed over our ripple background effect. The gentle waves create a soothing visual experience that adds sophistication to any design.
            </p>
            <UButton
              to="#"
              color="white"
              variant="solid"
            >
              Learn More
            </UButton>
          </div>
        </UCard>
      </MAnimatedGroup>
    </div>
  </section>
</template>

<script setup>
// No need to import motion directly since we're using MAnimatedGroup
</script>
