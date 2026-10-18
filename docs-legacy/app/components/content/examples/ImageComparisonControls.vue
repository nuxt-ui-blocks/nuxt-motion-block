<template>
  <div class="flex justify-center">
    <MImageComparison
      show-controls
      class="h-64 w-96 rounded-lg overflow-hidden"
    >
      <MImageComparisonImage
        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="Before"
        position="left"
      />
      <MImageComparisonImage
        src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="After"
        position="right"
      />
      <MImageComparisonSlider />
    </MImageComparison>
  </div>
</template>
