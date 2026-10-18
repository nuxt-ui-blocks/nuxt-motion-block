<template>
  <section class="relative py-20 min-h-[400px]">
    <MBackgroundGradientAnimation
      gradient-background-start="rgb(106, 182, 245)"
      gradient-background-end="rgb(139, 92, 246)"
      first-color="106, 182, 245"
      second-color="139, 92, 246"
      third-color="236, 72, 153"
      fourth-color="245, 140, 85"
      pointer-color="106, 182, 245"
      size="80%"
      blending-value="hard-light"
      class="h-full w-full blur-md"
      container-class="absolute inset-0 z-0"
    />

    <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <MAnimatedGroup
        preset="slide"
        :stagger-children="0.1"
      >
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Animated Gradient Background
        </h2>
        <p class="text-lg text-gray-200 mb-8">
          Create stunning animated backgrounds with our gradient animation component.
        </p>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p class="text-white">
            This section features our animated gradient background component. The colors smoothly transition to create a dynamic visual effect.
          </p>
        </div>
      </MAnimatedGroup>
    </div>
  </section>
</template>
